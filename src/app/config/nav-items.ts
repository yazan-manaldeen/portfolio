export interface NavItem {
  title: string;
  fragment: string;
}

export const navItems: NavItem[] = [
  {title: 'about.about', fragment: 'about'},
  {title: 'experience.experience', fragment: 'experience'},
  {title: 'projects.projects', fragment: 'projects'},
  {title: 'contact.contact', fragment: 'contact'},
];
