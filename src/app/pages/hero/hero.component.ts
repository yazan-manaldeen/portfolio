import {Component} from '@angular/core';
import {ContactItem, heroContactItems} from "@app/config/contact";

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  contactItems: ContactItem[] = heroContactItems;
}
