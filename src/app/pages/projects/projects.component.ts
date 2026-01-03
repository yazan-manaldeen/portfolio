import {Component, OnDestroy} from '@angular/core';
import {Project} from "@app/config/projects";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnDestroy {

  projects: Project[] = [];
  subs: Subscription = new Subscription();

  constructor(private translateService: TranslateService) {
    this.subs = this.translateService.onLangChange.subscribe(() => {
      this.projects = this.translateService.instant('projects.projectsList');
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
