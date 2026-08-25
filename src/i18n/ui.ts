import type { Lang } from './routes';

/**
 * Site-chrome copy, per language: meta tags, nav, footer, forms, 404.
 * Homepage section copy lives in markdown files under `src/content/home/`.
 *
 * `en` is the reference shape — `fr` is typed against it, so a missing or
 * misspelled key is a build-time type error rather than a blank spot on the
 * page. Presentation concerns (icons, colours) stay in the components; only
 * text lives here.
 */
const en = {
  meta: {
    home: {
      title: 'Remote Volunteers for Nonprofits | GoodEWorkers',
      description:
        'GoodEWorkers connects nonprofits with expert remote volunteers for websites, content marketing, SEO and design — free support, anywhere in the world.',
      keywords:
        'remote work, nonprofits, volunteering, digital volunteers, web development, content marketing, SEO, charity website',
    },
    legal: {
      title: 'Legal Notice | GoodEWorkers',
      description:
        'Legal notice for GoodEWorkers: publisher, hosting provider, intellectual property, personal data and applicable law.',
      keywords: 'legal notice, GoodEWorkers, publisher, hosting, personal data',
    },
    notFound: {
      title: 'Page not found | GoodEWorkers',
      description: 'The page you are looking for does not exist.',
      keywords: '',
    },
  },

  org: {
    description:
      'GoodEWorkers is a nonprofit network of remote volunteers helping other nonprofits go digital: websites, content marketing, SEO, design and audits.',
    logoAlt: 'GoodEWorkers',
    homeAriaLabel: 'GoodEWorkers home',
  },

  nav: {
    contact: 'Contact',
    menu: 'Menu',
    skipToContent: 'Skip to content',
  },

  langSwitch: {
    label: 'Change language',
    /** Announced to screen readers as e.g. "Switch to Français". */
    switchTo: 'Switch to',
  },

  footer: {
    contactTitle: 'Contact-us !',
    legalLink: 'Legal Notice',
    poweredBy: 'This site is powered by',
    copyright: (year: number) => `GoodEWorkers © ${year}`,
  },

  form: {
    name: 'Your name',
    email: 'Your email address',
    message: 'Your message',
    send: 'Send',
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: "Sorry, we couldn't find the page you're looking for.",
    cta: 'Go back home',
  },
};

type Dictionary = typeof en;

const fr: Dictionary = {
  meta: {
    home: {
      title: 'Bénévoles à distance pour associations | GoodEWorkers',
      description:
        "GoodEWorkers met des bénévoles experts à distance au service des associations : site web, marketing de contenu, SEO et design. Un accompagnement gratuit.",
      keywords:
        "bénévolat à distance, associations, télétravail, site web association, marketing de contenu, référencement SEO, bénévolat en ligne",
    },
    legal: {
      title: 'Mentions légales | GoodEWorkers',
      description:
        "Mentions légales de GoodEWorkers : éditeur, hébergeur, propriété intellectuelle, données personnelles et droit applicable.",
      keywords: 'mentions légales, GoodEWorkers, éditeur, hébergeur, données personnelles',
    },
    notFound: {
      title: 'Page introuvable | GoodEWorkers',
      description: "La page que vous cherchez n'existe pas.",
      keywords: '',
    },
  },

  org: {
    description:
      "GoodEWorkers est une association de bénévoles à distance qui aide les autres associations à passer au numérique : site web, marketing de contenu, SEO, design et audits.",
    logoAlt: 'GoodEWorkers',
    homeAriaLabel: "GoodEWorkers, retour à l'accueil",
  },

  nav: {
    contact: 'Contact',
    menu: 'Menu',
    skipToContent: 'Aller au contenu',
  },

  langSwitch: {
    label: 'Changer de langue',
    switchTo: 'Passer en',
  },

  footer: {
    contactTitle: 'Contactez-nous !',
    legalLink: 'Mentions légales',
    poweredBy: 'Ce site est propulsé par',
    copyright: (year: number) => `GoodEWorkers © ${year}`,
  },

  form: {
    name: 'Votre nom',
    email: 'Votre adresse e-mail',
    message: 'Votre message',
    send: 'Envoyer',
  },

  notFound: {
    code: '404',
    title: 'Page introuvable',
    text: "Désolé, nous n'avons pas trouvé la page que vous cherchez.",
    cta: "Retour à l'accueil",
  },
};

export const ui: Record<Lang, Dictionary> = { en, fr };

export function t(lang: Lang): Dictionary {
  return ui[lang];
}
