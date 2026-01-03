import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {appDefaultLang, appLangs} from "@app/config/app.config";
import {Subscription} from "rxjs";
import {SetAppLanguage} from "@app/state/app.action";
import {SeoService} from "@app/services/seo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Yazan Man Aldeen – Frontend Developer';

  availableLangs: string[] = appLangs;
  defaultLang: string = appDefaultLang;
  subs: Subscription = new Subscription();
  elementsMap: { [key: string]: any };

  constructor(private store: Store,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private seo: SeoService) {
    this.translateService.reloadLang('de');

    this.subs.add(
      this.translateService.onLangChange.subscribe(() => {
        document.body.classList.add('splash-screen-hidden');
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');
      })
    );

    this.subs.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          const url = event.url.split('?')[0];
          const segments = url.split('/').filter(Boolean);
          if (!this.availableLangs.includes(segments[0])) {
            this.router.navigate(['/', this.defaultLang, ...segments]);
          }
        } else if (event instanceof NavigationEnd) {
          const lang = this.activatedRoute.snapshot.firstChild.params['lang'];
          if (document.body.classList.contains('lang-change')) {
            document.body.classList.add('fade-out');
            document.body.classList.remove('fade-in');
            document.body.classList.remove('lang-change');
            document.body.classList.remove('splash-screen-hidden');
          }
          setTimeout(() => {
            this.store.dispatch(new SetAppLanguage(lang));
            this.seo.update(lang);
          }, 300);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.elementsMap = {
      about: document.getElementById('about'),
      experience: document.getElementById('experience'),
      projects: document.getElementById('projects'),
      contact: document.getElementById('contact')
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  protected goTo($event: string) {
    if (!$event) return;
    this.elementsMap[$event]?.scrollIntoView({behavior: 'smooth'});
  }
}
