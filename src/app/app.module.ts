import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "@app/app-routing.module";
import {NgxsModule, Store} from "@ngxs/store";
import {HttpClientModule} from "@angular/common/http";
import {provideTranslateService, TranslateModule} from "@ngx-translate/core";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatTooltip} from "@angular/material/tooltip";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppState} from "@app/state/app.state";
import {AppComponent} from "@app/app.component";
import {HeroComponent} from "@app/pages/hero/hero.component";
import {AboutComponent} from "@app/pages/about/about.component";
import {SkillsComponent} from "@app/pages/skills/skills.component";
import {ExperiencesComponent} from "@app/pages/experiences/experiences.component";
import {ProjectsComponent} from "@app/pages/projects/projects.component";
import {ContactMeComponent} from "@app/pages/contact-me/contact-me.component";
import {CustomSnackbarComponent} from "@app/components/custom-snackbar/custom-snackbar.component";
import {appDefaultLang} from "@app/config/app.config";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SetAppTheme} from "@app/state/app.action";
import {iconList} from "@app/config/icons-list";
import {ImageComponent} from './components/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperiencesComponent,
    ProjectsComponent,
    ContactMeComponent,
    CustomSnackbarComponent,
    ToolbarComponent,
    SidebarComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState]),
    HttpClientModule,
    TranslateModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatToolbar,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatMenu,
    MatMenuItem,
    MatLabel,
    MatMenuTrigger,
    MatTooltip,
    MatFormField,
    MatError,
    MatInput,
    MatSelect,
    MatOption
  ],
  providers: [
    provideAnimationsAsync(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: appDefaultLang,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(store: Store, matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {

    store.dispatch(new SetAppTheme(localStorage.getItem('theme') || 'auto'));

    iconList.app.forEach(icon => {
      matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/app/${icon}.svg`)
      );
    });
    iconList.skills.forEach(icon => {
      matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/skills/${icon}.svg`)
      );
    });
  }
}
