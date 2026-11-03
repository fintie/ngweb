// Current stories and original practical guides. Retired guides redirect to events/workshops.
import { practicalArticles } from './practicalArticles.js';
export const ARTICLES = [];

// Event details: Meetup event 315841379. Event date differs from story publication date.
ARTICLES.unshift({
  "slug": "ai-networking-novotel-darling-harbour-august-2026",
  "title": "AI Networking at Novotel Darling Harbour",
  "date": "2026-11-02",
  "eventDate": "2026-08-29",
  "category": "Event showcase",
  "lead": "A look back at the AI Learners Club networking event at Novotel Darling Harbour on 29 August 2026, with photos from the gathering.",
  "cover": "/img/blog/ai-networking-august-2026/group-1.webp",
  "sections": [
    {
      "h": "An afternoon for the AI community",
      "html": [
        "The event took place on Saturday 29 August 2026, from 1–4 pm AEST, at Novotel Darling Harbour, 100 Murray Street, Sydney.",
        "AI Learners Club and Altamir invited people interested in AI to meet, exchange ideas and make connections. The event welcomed beginners alongside people already working with AI."
      ]
    },
    {
      "h": "People behind the gathering",
      "html": [
        "The event was hosted by Dev Roy, President of AI Learners Club; Dennis Devendra Singh, CEO of Altamir; and Lukas Huber, community manager.",
        "<a href=\"https://www.meetup.com/ailearnersclub/events/315841379/\" target=\"_blank\" rel=\"noopener\">View the original event listing on Meetup</a>"
      ]
    }
  ],
  "faq": []
});

// Partnership status and milestone date confirmed directly by the user.
ARTICLES.unshift({
  "slug": "nextgenius-openai-select-partner",
  "title": "NextGenius becomes an OpenAI Select Partner",
  "date": "2026-11-02",
  "milestoneDate": "2026-07-18",
  "category": "Partnership news",
  "cover": "/img/blog/openai-select-partnership.webp",
  "coverAlt": "OpenAI wordmark and emblem on a light background",
  "coverWidth": 1120,
  "coverHeight": 560,
  "caption": "NextGenius became an OpenAI Select Partner on 18 July 2026",
  "lead": "On 18 July 2026, NextGenius became an OpenAI Select Partner, marking a milestone in our work helping Australian businesses put AI to practical use.",
  "sections": [
    {
      "h": "A milestone for NextGenius",
      "html": [
        "NextGenius became an OpenAI Select Partner on 18 July 2026. Our integration work connects AI with business documents, customer enquiries and the tools staff use.",
        "Typical tasks include finding a policy, preparing a reply or extracting information from a document. Each needs the right sources and a defined place in the existing process."
      ]
    },
    {
      "h": "Turning capabilities into useful workflows",
      "html": [
        "We design how information reaches the model, how outputs are checked and which actions require staff review. A prototype lets the team test those choices before rollout.",
        "Internal knowledge assistants, customer service support and document workflows each have different requirements for access, answer quality and handover."
      ]
    },
    {
      "h": "Test the integration against the task",
      "html": [
        "Review representative examples and exceptions with the people doing the work. Measure answer quality, review effort or completed handovers to assess the integration.",
        "<a href=\"/solutions/openai-integration/\">Explore OpenAI integration and AI assistants</a>, or <a href=\"/contact/\">talk to NextGenius</a> about a workflow you would like to improve."
      ]
    }
  ],
  "faq": [],
  "ctaTitle": "Put AI to work in your business",
  "ctaHref": "/solutions/openai-integration/",
  "ctaLabel": "Explore OpenAI integration"
});

// Retired guide posts removed at user request; newest milestone first.
ARTICLES.splice(0, ARTICLES.length, ...ARTICLES.filter(a => a.cover).sort((a,b) => (b.eventDate ?? b.milestoneDate ?? b.date).localeCompare(a.eventDate ?? a.milestoneDate ?? a.date)));

// Partnership and milestone date confirmed directly by the user.
ARTICLES.push({
  "slug": "nextgenius-altamir-partnership",
  "title": "NextGenius partners with Altamir",
  "date": "2026-11-02",
  "milestoneDate": "2026-07-27",
  "category": "Partnership news",
  "cover": "/img/blog/altamir-partnership.webp",
  "coverAlt": "Altamir.ai branding highlighting AI governance, risk management and responsible AI",
  "coverWidth": 1120,
  "coverHeight": 560,
  "caption": "NextGenius partnered with Altamir on 27 July 2026",
  "lead": "On 27 July 2026, NextGenius partnered with Altamir, bringing AI strategy and governance expertise into our delivery network for Australian businesses.",
  "sections": [
    {
      "h": "Bringing delivery and governance together",
      "html": [
        "NextGenius partnered with Altamir on 27 July 2026. The relationship connects our implementation work with Altamir’s AI strategy and governance expertise.",
        "Altamir can contribute when an organisation needs to understand its AI use, assign decision ownership or establish oversight alongside implementation."
      ]
    },
    {
      "h": "A clear approach to AI adoption",
      "html": [
        "Our work with Altamir can support organisations in understanding current AI use, identifying governance priorities and establishing responsibilities for adoption.",
        "This can include readiness reviews, policies, use-case review processes and continuing leadership advice, according to the organisation’s needs."
      ]
    },
    {
      "h": "Find the right starting point",
      "html": [
        "A readiness review can help identify priorities before a build. Governance work can also run alongside a prototype when responsibilities and review processes need to develop together.",
        "<a href=\"/blog/nextgenius-altamir-partnership/\">Meet Altamir in our partner network</a>, explore <a href=\"/solutions/ai-strategy-governance/\">AI governance services</a>, or <a href=\"/contact/\">discuss your organisation’s needs with NextGenius</a>."
      ]
    }
  ],
  "faq": [],
  "ctaTitle": "Plan your next step with AI",
  "ctaHref": "/solutions/ai-strategy-governance/",
  "ctaLabel": "Explore AI governance"
});
ARTICLES.sort((a,b) => (b.eventDate ?? b.milestoneDate ?? b.date).localeCompare(a.eventDate ?? a.milestoneDate ?? a.date));

// Partnership date supplied by user; FI description verified at https://fi.co/s/sydney.
ARTICLES.push({
  "slug": "nextgenius-founder-institute-partnership",
  "title": "NextGenius partners with Founder Institute",
  "date": "2026-11-02",
  "milestoneDate": "2026-10-11",
  "category": "Local partnership",
  "cover": "/img/blog/founder-institute-partnership.webp",
  "coverAlt": "Founder Institute branding with its green emblem and global community message",
  "coverWidth": 1120,
  "coverHeight": 560,
  "caption": "NextGenius partnered with Founder Institute on 11 October 2026",
  "lead": "On 11 October 2026, NextGenius formed a local partnership with Founder Institute, the world’s largest AI-native company builder, adding a new connection to our founder and business community.",
  "sections": [
    {
      "h": "A new connection for founders",
      "html": [
        "NextGenius formed a local partnership with Founder Institute on 11 October 2026, connecting our founder community with an organisation focused on developing early-stage businesses.",
        "The relationship sits alongside our AI learning and business community activities."
      ]
    },
    {
      "h": "About Founder Institute",
      "html": [
        "<a href=\"https://fi.co/s/sydney\" target=\"_blank\" rel=\"noopener\">Founder Institute, the world’s largest AI-native company builder,</a> helps early-stage founders develop businesses through AI tools, structured programmes, mentorship and a global network.",
        "For founders exploring AI, structured programmes and mentorship offer another setting in which to develop and test an idea."
      ]
    },
    {
      "h": "Learning, building and connecting",
      "html": [
        "Visit Founder Institute for programme details and our community pages for NextGenius gatherings and learning opportunities.",
        "<a href=\"/blog/nextgenius-founder-institute-partnership/\">Explore our Founder Institute partnership</a>, <a href=\"/community/\">meet the NextGenius community</a>, or <a href=\"/contact/\">get in touch</a> about working together."
      ]
    }
  ],
  "faq": [],
  "ctaTitle": "Connect with our founder community",
  "ctaHref": "/community/",
  "ctaLabel": "Explore the community"
});
ARTICLES.sort((a,b) => (b.eventDate ?? b.milestoneDate ?? b.date).localeCompare(a.eventDate ?? a.milestoneDate ?? a.date));

// Partnership date supplied by user; Meetup link from existing partner data.
ARTICLES.push({
  "slug": "nextgenius-lassie-eds-business-community-partnership",
  "title": "NextGenius partners with Lassie & Ed’s Business Community",
  "date": "2026-11-02",
  "milestoneDate": "2026-10-14",
  "category": "Local partnership",
  "cover": "/img/blog/lassie-ed-partnership.webp",
  "coverAlt": "Lassie & Ed’s Business Community banner with photographs of community gatherings and Sydney Harbour",
  "coverWidth": 1120,
  "coverHeight": 560,
  "caption": "NextGenius partnered with Lassie & Ed’s Business Community on 14 October 2026",
  "lead": "On 14 October 2026, NextGenius formed a local partnership with Lassie & Ed’s Business Community, connecting our community of AI learners and builders with a wider network of business people.",
  "sections": [
    {
      "h": "Building connections beyond technology",
      "html": [
        "NextGenius formed a local partnership with Lassie & Ed’s Business Community on 14 October 2026. The relationship connects our AI and technology community with a wider business network.",
        "It creates a connection between people exploring technology and those bringing experience from other parts of business."
      ]
    },
    {
      "h": "Meet Lassie & Ed’s Business Community",
      "html": [
        "Lassie & Ed’s Business Community brings people together through business networking in Australia and online meetups connecting people around the world.",
        "<a href=\"https://www.meetup.com/business-networking-lassie-edwardzia/\" target=\"_blank\" rel=\"noopener\">Visit Lassie & Ed’s Business Community on Meetup</a> to explore the group and its event listings."
      ]
    },
    {
      "h": "A wider community for people building businesses",
      "html": [
        "Browse the group’s listings for business networking events and online gatherings. Check each listing for its audience, format and registration details.",
        "<a href=\"/blog/nextgenius-lassie-eds-business-community-partnership/\">Meet our local partners</a>, <a href=\"/community/\">explore the NextGenius community</a>, or <a href=\"/contact/\">get in touch about a partnership</a>."
      ]
    }
  ],
  "faq": [],
  "ctaTitle": "Meet the business community",
  "ctaHref": "https://www.meetup.com/business-networking-lassie-edwardzia/",
  "ctaLabel": "Visit the Meetup group"
});
ARTICLES.sort((a,b) => (b.eventDate ?? b.milestoneDate ?? b.date).localeCompare(a.eventDate ?? a.milestoneDate ?? a.date));

ARTICLES.unshift(...practicalArticles);
