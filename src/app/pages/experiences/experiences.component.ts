import {Component, OnDestroy} from '@angular/core';
import {Experience} from "@app/config/experience";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
  selector: 'experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent implements OnDestroy {

  experiences: Experience[] = [];
  subs: Subscription = new Subscription();

  constructor(private translateService: TranslateService) {
    this.subs = this.translateService.onLangChange.subscribe(() => {
      this.experiences = this.translateService.instant('experience.experiences');
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
