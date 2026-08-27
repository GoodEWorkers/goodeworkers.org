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
      title: 'GoodEWorkers: Promote remote work in nonprofits',
      // Kept under 160 chars so Google renders the whole snippet.
      description:
        "A community of remote workers building for nonprofits and releasing it as open source. We run fully remote to prove it's a competitive advantage.",
    },
    legal: {
      title: 'Legal Notice | GoodEWorkers',
      description:
        'Legal notice for GoodEWorkers: publisher, hosting provider, intellectual property, personal data and applicable law.',
    },
    contributors: {
      title: 'Contributors | GoodEWorkers',
      description:
        'The people behind GoodEWorkers: volunteers who build websites, content and open source for nonprofits, fully remote.',
    },
    projects: {
      title: 'Projects | GoodEWorkers',
      description:
        'The work GoodEWorkers does: websites for nonprofits and open-source initiatives of its own, all remote, all public.',
    },
    notFound: {
      title: 'Page not found | GoodEWorkers',
      description: 'The page you are looking for does not exist.',
    },
    thanks: {
      title: 'Thanks | GoodEWorkers',
      description: 'Your message has been sent.',
    },
  },

  org: {
    description:
      'GoodEWorkers is a community of remote workers helping nonprofits go digital: websites, content marketing, SEO, design and audits — released as open source.',
    logoAlt: 'GoodEWorkers',
    homeAriaLabel: 'GoodEWorkers home',
  },

  nav: {
    contact: 'Contact',
    contributors: 'Contributors',
    projects: 'Projects',
    menu: 'Menu',
    skipToContent: 'Skip to content',
  },

  langSwitch: {
    label: 'Change language',
    /** Announced to screen readers as e.g. "Switch to Français". */
    switchTo: 'Switch to',
  },

  footer: {
    contactTitle: 'Tell us about your project',
    mailSubject: 'Project enquiry',
    legalLink: 'Legal Notice',
    openSource: 'Our work is open source on',
    poweredBy: 'This site is powered by',
    copyright: (year: number) => `GoodEWorkers © ${year}`,
  },

  form: {
    name: 'Your name',
    email: 'Your email address',
    message: 'Your message',
    send: 'Send',
    gdprNotice: 'We use your name and email only to reply to you. See our',
    gdprLinkLabel: 'legal notice',
    replyNote: 'Alice or Richard replies personally, usually within 3 working days.',
  },

  thanks: {
    title: 'Thanks — we have your message',
    lead: "Your message is in. Here's what happens next.",
    steps: [
      'You get a reply within 3 working days, whichever side you wrote from.',
      'If it looks like a fit, we scope the work in writing before anyone starts building.',
    ],
    whileWaiting: 'While you wait, the code we write is public — including this site.',
    githubCta: 'Browse our repositories on GitHub',
    backHome: 'Back to the homepage',
  },

  contributors: {
    titlePart1: 'The',
    titleEncircled: 'people',
    titlePart2: 'behind the work',
    intro:
      'GoodEWorkers is its volunteers: developers, designers, writers and translators who give nonprofits a hand, remotely.',
    lastContributionLabel: 'Last contribution',
    currentSituationLabel: 'Current situation',
    aboutLabel: 'About',
    contributionsTitle: (name: string) => `What ${name} has done for GoodEWorkers`,
    socialsTitle: 'Elsewhere online',
    socialLabels: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      x: 'X',
      website: 'Website',
    },
    backToContributors: 'All contributors',
    profileLabel: (name: string) => `See ${name}'s page`,
    profileMetaDescription: (name: string, role: string) =>
      `${name}, ${role} at GoodEWorkers. What they have done and where to find them online.`,
  },

  projects: {
    titlePart1: 'The',
    titleEncircled: 'work',
    titlePart2: 'in progress',
    intro:
      'Websites for nonprofits and our own open-source initiatives. Remote, specification-led, released in the open.',
    startedOnLabel: 'Started on',
    descriptionLabel: 'Description',
    whyLabel: 'Why',
    contributorsLabel: 'Contributors',
    statusLabel: 'Status',
    linkLabel: 'Link',
    visitProject: 'Visit project',
    backToProjects: 'All projects',
    noContributors: 'No contributors recorded yet.',
    statusLabels: {
      ongoing: 'Ongoing',
      completed: 'Completed',
    },
    projectLabel: (name: string) => `See the ${name} project`,
    projectMetaDescription: (name: string) =>
      `${name}, a GoodEWorkers project: what it is, why we did it, and who built it.`,
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: "Sorry, we couldn't find the page you're looking for.",
    cta: 'Go back home',
  },
};

/**
 * `fr` is typed against `en`, so every key must be present in both — except
 * `replyNote`, which is deliberately English-only: the French form omits it.
 */
type Dictionary = Omit<typeof en, 'form'> & {
  form: Omit<(typeof en)['form'], 'replyNote'> & { replyNote?: string };
};

const fr: Dictionary = {
  meta: {
    home: {
      title: 'GoodEWorkers : Promouvoir le travail à distance dans les associations',
      description:
        "Une communauté de télétravailleurs qui construit pour les associations et publie son travail en open source. Entièrement à distance, et c'est un atout.",
    },
    legal: {
      title: 'Mentions légales | GoodEWorkers',
      description:
        "Mentions légales de GoodEWorkers : éditeur, hébergeur, propriété intellectuelle, données personnelles et droit applicable.",
    },
    contributors: {
      title: 'Contributeurs | GoodEWorkers',
      description:
        "Les personnes derrière GoodEWorkers : des bénévoles qui construisent sites, contenus et open source pour les associations, entièrement à distance.",
    },
    projects: {
      title: 'Projets | GoodEWorkers',
      description:
        "Le travail de GoodEWorkers : des sites pour des associations et des initiatives open source, tout à distance, tout en public.",
    },
    notFound: {
      title: 'Page introuvable | GoodEWorkers',
      description: "La page que vous cherchez n'existe pas.",
    },
    thanks: {
      title: 'Merci | GoodEWorkers',
      description: 'Votre message a bien été envoyé.',
    },
  },

  org: {
    description:
      "GoodEWorkers est une communauté de télétravailleurs qui aide les associations à passer au numérique : site web, marketing de contenu, SEO, design et audits — publiés en open source.",
    logoAlt: 'GoodEWorkers',
    homeAriaLabel: "GoodEWorkers, retour à l'accueil",
  },

  nav: {
    contact: 'Contact',
    contributors: 'Contributeurs',
    projects: 'Projets',
    menu: 'Menu',
    skipToContent: 'Aller au contenu',
  },

  langSwitch: {
    label: 'Changer de langue',
    switchTo: 'Passer en',
  },

  footer: {
    contactTitle: 'Parlez-nous de votre projet',
    mailSubject: 'Demande de projet',
    legalLink: 'Mentions légales',
    openSource: 'Notre travail est open source sur',
    poweredBy: 'Ce site est propulsé par',
    copyright: (year: number) => `GoodEWorkers © ${year}`,
  },

  form: {
    name: 'Votre nom',
    email: 'Votre adresse e-mail',
    message: 'Votre message',
    send: 'Envoyer',
    gdprNotice:
      'Nous utilisons votre nom et votre e-mail uniquement pour vous répondre. Consultez nos',
    gdprLinkLabel: 'mentions légales',
  },

  thanks: {
    title: 'Merci — nous avons bien reçu votre message',
    lead: 'Votre message est arrivé. Voici la suite.',
    steps: [
      'Vous recevez une réponse sous 3 jours ouvrés, quel que soit le formulaire utilisé.',
      "Si le projet correspond, nous cadrons le travail par écrit avant de commencer quoi que ce soit.",
    ],
    whileWaiting:
      'En attendant, le code que nous écrivons est public — y compris celui de ce site.',
    githubCta: 'Parcourir nos dépôts sur GitHub',
    backHome: "Retour à l'accueil",
  },

  contributors: {
    titlePart1: 'Les',
    titleEncircled: 'personnes',
    titlePart2: 'derrière le travail',
    intro:
      "GoodEWorkers, c'est ses bénévoles : développeurs, designers, rédacteurs et traducteurs qui donnent un coup de main aux associations, à distance.",
    lastContributionLabel: 'Dernière contribution',
    currentSituationLabel: 'Situation actuelle',
    aboutLabel: 'À propos',
    contributionsTitle: (name: string) => `Ce que ${name} a fait pour GoodEWorkers`,
    socialsTitle: 'Ailleurs sur le web',
    socialLabels: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      x: 'X',
      website: 'Site web',
    },
    backToContributors: 'Tous les contributeurs',
    profileLabel: (name: string) => `Voir la page de ${name}`,
    profileMetaDescription: (name: string, role: string) =>
      `${name} — ${role}. Son apport à GoodEWorkers et où le retrouver en ligne.`,
  },

  projects: {
    titlePart1: 'Les',
    titleEncircled: 'projets',
    titlePart2: 'en cours',
    intro:
      "Des sites pour des associations et nos propres initiatives open source. À distance, cadré par écrit, publié en open source.",
    startedOnLabel: 'Démarré en',
    descriptionLabel: 'Description',
    whyLabel: 'Pourquoi',
    contributorsLabel: 'Contributeurs',
    statusLabel: 'Statut',
    linkLabel: 'Lien',
    visitProject: 'Voir le projet',
    backToProjects: 'Tous les projets',
    noContributors: 'Aucun contributeur enregistré pour le moment.',
    statusLabels: {
      ongoing: 'En cours',
      completed: 'Terminé',
    },
    projectLabel: (name: string) => `Voir le projet ${name}`,
    projectMetaDescription: (name: string) =>
      `${name}, un projet GoodEWorkers : ce que c'est, pourquoi on l'a fait, et qui l'a construit.`,
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
