import {Component} from '@angular/core';
import {Skill, skills} from "@app/config/skills";

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  skills: Skill[] = skills;

}
