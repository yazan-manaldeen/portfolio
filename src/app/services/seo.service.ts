import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class SeoService {
  // Base URL of the website
  baseUrl = 'https://yazan-manaldeen.dev';

  constructor(private meta: Meta, private title: Title) {
  }

  /**
   * Update SEO metadata dynamically based on the language
   * This includes:
   * - Title
   * - Description
   * - Open Graph (og:*)
   * - Twitter Card (twitter:*)
   * - Canonical tag
   * @param lang Current language ('en' | 'de')
   */
  update(lang: 'en' | 'de') {
    // -----------------------------
    // Prepare language-specific data
    // -----------------------------
    const data = {
      en: {
        title: 'Yazan Man Aldeen – Frontend Developer',
        description: 'Frontend Developer specializing in Angular, TypeScript & responsive web apps. Explore my portfolio projects and experience. Based in Berlin.',
        url: `${this.baseUrl}/en`
      },
      de: {
        title: 'Yazan Man Aldeen – Frontend Entwickler',
        description: 'Frontend-Entwickler spezialisiert auf Angular, TypeScript und responsive Webanwendungen. Entdecken Sie meine Portfolio-Projekte und Erfahrung. Basierend in Berlin.',
        url: `${this.baseUrl}/de`
      }
    }[lang];

    // -----------------------------
    // Set the page title and meta tags
    // -----------------------------
    this.title.setTitle(data.title);
    this.meta.updateTag({name: 'description', content: data.description});
    this.meta.updateTag({name: 'title', content: data.title});

    // -----------------------------
    // Open Graph metadata (for social sharing)
    // -----------------------------
    this.meta.updateTag({property: 'og:title', content: data.title});
    this.meta.updateTag({property: 'og:description', content: data.description});
    this.meta.updateTag({property: 'og:url', content: data.url});
    this.meta.updateTag({property: 'og:image', content: `${this.baseUrl}/assets/images/og-preview.jpg`});

    // -----------------------------
    // Twitter Card metadata
    // -----------------------------
    this.meta.updateTag({name: 'twitter:title', content: data.title});
    this.meta.updateTag({name: 'twitter:description', content: data.description});
    this.meta.updateTag({name: 'twitter:image', content: `${this.baseUrl}/assets/images/og-preview.jpg`});

    // -----------------------------
    // Canonical tag (tells search engines the main URL of the page)
    // -----------------------------
    let canonical: HTMLLinkElement = document.querySelector("link[rel='canonical']") || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', data.url);
    if (!canonical.parentElement) document.head.appendChild(canonical);
  }
}
