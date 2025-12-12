// src/app/services/seo.service.ts
import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class SeoService {
  baseUrl = 'https://yazan-manaldeen.github.io/portfolio';

  constructor(private meta: Meta, private title: Title) {
  }

  update(lang: 'en' | 'de') {
    const data = {
      en: {
        title: 'Yazan Man Aldeen – Senior Frontend Developer',
        description: 'Frontend Developer specializing in Angular, TypeScript & responsive web apps. Explore my portfolio projects and experience. Based in Berlin.',
        url: `${this.baseUrl}/en`
      },
      de: {
        title: 'Yazan Man Aldeen – Senior Frontend Entwickler',
        description: 'Frontend-Entwickler spezialisiert auf Angular, TypeScript und responsive Webanwendungen. Entdecken Sie meine Portfolio-Projekte und Erfahrung. Basierend in Berlin.',
        url: `${this.baseUrl}/de`
      }
    }[lang];

    // Title
    this.title.setTitle(data.title);

    // Meta tags
    this.meta.updateTag({name: 'description', content: data.description});
    this.meta.updateTag({name: 'title', content: data.title});

    // Open Graph
    this.meta.updateTag({property: 'og:title', content: data.title});
    this.meta.updateTag({property: 'og:description', content: data.description});
    this.meta.updateTag({property: 'og:url', content: data.url});
    this.meta.updateTag({property: 'og:image', content: `${this.baseUrl}/assets/images/og-preview.jpg`});

    // Twitter
    this.meta.updateTag({name: 'twitter:title', content: data.title});
    this.meta.updateTag({name: 'twitter:description', content: data.description});
    this.meta.updateTag({name: 'twitter:image', content: `${this.baseUrl}/assets/images/og-preview.jpg`});
  }
}
