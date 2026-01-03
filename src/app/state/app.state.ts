import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {DownloadCV, SetAppLanguage, SetAppTheme} from "@app/state/app.action";
import {produce} from "immer";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {SnackBarService} from "@app/services/snack-bar.service";

interface AppStateModel {
  lang: string;
  theme: string;
  themeClass: string;
  downloadProgress: number;
}

const defaults: AppStateModel = {
  lang: '',
  theme: '',
  themeClass: '',
  downloadProgress: -1,
}

@State({
  name: "appState",
  defaults
})
@Injectable()
export class AppState {
  themeColorMeta: HTMLElement = document.getElementById('theme-color-meta');

  constructor(private httpClient: HttpClient,
              private translateService: TranslateService,
              private snackBarService: SnackBarService) {
  }

  @Selector()
  static lang(state: AppStateModel) {
    return state.lang;
  }

  @Selector()
  static theme(state: AppStateModel) {
    return state.theme;
  }

  @Selector()
  static themeClass(state: AppStateModel) {
    return state.themeClass;
  }

  @Selector()
  static downloadProgress(state: AppStateModel) {
    return state.downloadProgress;
  }

  @Action(SetAppLanguage)
  setAppLanguage({setState, getState}: StateContext<AppStateModel>, {lang}: SetAppLanguage) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    setState(produce(getState(), (state) => {
      state.lang = lang;
    }));
    return this.translateService.use(lang).pipe(
      catchError((err) => {
        this.snackBarService.openSnackBar('snackBar.changeLangFailed', 'snackBar.close');
        return throwError(err);
      })
    );
  }

  @Action(SetAppTheme)
  setAppTheme({setState, getState}: StateContext<AppStateModel>, {theme}: SetAppTheme) {
    setState(produce(getState(), (state) => {
      let themeClass: string = theme;
      if (theme === 'auto') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          themeClass = 'dark';
        } else {
          themeClass = 'light';
        }
      }
      document.body.classList.add(themeClass);
      if (themeClass === 'dark') {
        this.themeColorMeta.setAttribute('content', '#030712');
        document.body.classList.remove('light');
      } else {
        this.themeColorMeta.setAttribute('content', '#F0F3F5');
        document.body.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);

      state.theme = theme;
      state.themeClass = themeClass;
    }));
  }

  @Action(DownloadCV)
  downloadCV({setState, getState}: StateContext<AppStateModel>) {
    setState(produce(getState(), (state) => {
      state.downloadProgress = 0;
    }));
    // setTimeout(() => {
    //   setState(produce(getState(), (state) => {
    //     state.downloadProgress = 10;
    //     console.log("Progress: ", state.downloadProgress);
    //   }));
    // }, 100);
    // setTimeout(() => {
    //   setState(produce(getState(), (state) => {
    //     state.downloadProgress = 45;
    //     console.log("Progress: ", state.downloadProgress);
    //   }));
    // }, 1000);
    // setTimeout(() => {
    //   setState(produce(getState(), (state) => {
    //     state.downloadProgress = 75;
    //     console.log("Progress: ", state.downloadProgress);
    //   }));
    // }, 2000);
    // setTimeout(() => {
    //   setState(produce(getState(), (state) => {
    //     state.downloadProgress = 99;
    //     console.log("Progress: ", state.downloadProgress);
    //   }));
    // }, 2500);
    // setTimeout(() => {
    //   setState(produce(getState(), (state) => {
    //     state.downloadProgress = 100;
    //     console.log("Progress: ", state.downloadProgress);
    //   }));
    // }, 3000);
    // return null;
    const fileName = `Yazan_${getState().lang === 'en' ? 'CV' : 'Lebenslauf'}.pdf`;
    const fileUrl = `assets/docs/${fileName}`;
    return this.httpClient.get(fileUrl, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    }).pipe(
      tap((event: HttpEvent<Blob>) => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            if (event.total) {
              setState(produce(getState(), (state) => {
                state.downloadProgress = Math.round((event.loaded / event.total) * 100);
                console.log("Progress: ", state.downloadProgress);
              }));
            }
            break;
          case HttpEventType.Response:
            const blob = new Blob([event.body!], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            setState(produce(getState(), (state) => {
              state.downloadProgress = -1;
              console.log("Progress: ", state.downloadProgress);
            }));
            break;
        }
      }, () => {
        setState(produce(getState(), (state) => {
          state.downloadProgress = -1;
          this.snackBarService.openSnackBar('snackBar.downloadCVFailed', 'Ok');
        }));
      })
    );
  }
}
