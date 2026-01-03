import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {Observable} from "rxjs";
import {AppState} from "@app/state/app.state";
import {Store} from "@ngxs/store";
import {DownloadCV, SetAppTheme} from "@app/state/app.action";
import {ActivatedRoute, Router} from "@angular/router";
import {NavItem, navItems} from "@app/config/nav-items";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() appDrawer: MatDrawer;
  @Output() onSectionChange: EventEmitter<string> = new EventEmitter<string>();

  theme$: Observable<string> = this.store.select(AppState.theme);
  lang$: Observable<string> = this.store.select(AppState.lang);
  progress$: Observable<number> = this.store.select(AppState.downloadProgress);
  navItems: NavItem[] = navItems;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
  }

  protected switchLang(lang: string) {
    if (lang === this.store.selectSnapshot(AppState.lang)) return;
    document.body.classList.add('lang-change');
    this.router.navigate([`/${lang}/portfolio`], {fragment: this.activatedRoute.snapshot.fragment})
  }

  protected toggleTheme(theme: string) {
    this.store.dispatch(new SetAppTheme(theme));
  }

  protected downloadCV() {
    this.store.dispatch(new DownloadCV());
  }

  protected goTo(fragment: string) {
    this.onSectionChange.emit(fragment);
  }
}
