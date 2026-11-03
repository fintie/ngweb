// All shared wording. Every entry traces to a unit in knowledge-base/migration/units.csv.
// One tree for the top menu, the phone menu and the footer, so they cannot drift apart.
export const MENU = [
  { label: 'Services', href: '/solutions/', id: 'dd-sol', blurb: 'We help small and medium businesses turn AI, automation and software into practical changes your team can use.',
    links: [{ label: 'Business process automation', href: '/solutions/ai-automation-sydney/' }, { label: 'Software & Digital Products', href: '/solutions/software-digital-products/' }, { label: 'AI Strategy & Governance', href: '/solutions/ai-strategy-governance/' }, { label: 'Training & Team Enablement', href: '/workshops/' }],
    card: { eyebrow: 'Ideas and practical guides', title: 'Blog', href: '/blog/', img: '/img/cover-1.jpg' } },
  { label: 'About', href: '/about/' },
  { label: 'Partners', href: '/partners/' },
  { label: 'Blog', href: '/blog/', id: 'dd-blog', blurb: 'Practical guides on learning AI, connecting with the community and putting ideas to work.',
    links: [{ label: 'All articles', href: '/blog/' }, { label: 'AI networking at Novotel', href: '/blog/ai-networking-novotel-darling-harbour-august-2026/' }, { label: 'OpenAI Select partnership', href: '/blog/nextgenius-openai-select-partner/' }],
    card: { eyebrow: 'Read and explore', title: 'Latest articles', href: '/blog/', img: '/img/workshop-01.jpg' } },
  { label: 'Community', href: '/community/', id: 'dd-com', blurb: 'Build independently. Learn together. Meet people turning AI and professional expertise into practical products, services and businesses.', group: ['/community/', '/events/', '/workshops/', '/faq/'],
    links: [{ label: 'Community and network', href: '/community/' }, { label: 'Events', href: '/events/' }, { label: 'Workshops', href: '/workshops/' }, { label: 'Questions', href: '/faq/' }],
    card: { eyebrow: 'Learn and connect', title: 'Our partner network', href: '/partners/', img: '/img/workshop-01.jpg' } },
];
export const inGroup = (path, m) => (m.group ?? [m.href]).some((p) => path.startsWith(p));
export const FOOTER = [
  { label: 'Work with us', links: [{ label: 'Services', href: '/solutions/' }, { label: 'Getting started', href: '/getting-started/' }, { label: 'Partners', href: '/partners/' }, { label: 'About', href: '/about/' }, { label: 'Contact', href: '/contact/' }] },
  { label: 'Learn and build', links: [{ label: 'Community', href: '/community/' }, { label: 'Events', href: '/events/' }, { label: 'Workshops', href: '/workshops/' }, { label: 'Blog', href: '/blog/' }, { label: 'Questions', href: '/faq/' }] },
];
const LABEL = { solutions: 'Services', blog: 'Blog', faq: 'Questions' };
const nice = (s) => LABEL[s] ?? s.charAt(0).toUpperCase() + s.slice(1);
// Breadcrumbs follow the address, so they stay right when a page moves
export const crumbsFor = (path, last) => { const seg = path.split('/').filter(Boolean); if (!seg.length) return []; return [{ label: 'Home', href: '/' }, ...seg.map((s, i) => ({ label: i === seg.length - 1 && last ? last : nice(s), href: '/' + seg.slice(0, i + 1).join('/') + '/' }))]; };

const P = {
  solutions: { title: 'Services', text: 'AI consulting, automation, connected tools and custom software.', href: '/solutions/' },
  usecases: { title: 'Use cases', text: 'Knowledge search, admin automation and enquiry support.', href: '/solutions/ai-automation-sydney/' },
  workshops: { title: 'Workshops', text: 'Practical, hands-on workshops for teams.', href: '/workshops/' },
  events: { title: 'Events', text: 'Practical AI events and a meetup community in Sydney.', href: '/events/' },
  community: { title: 'Community', text: 'Meet people building with AI and professional expertise.', href: '/community/' },
  blog: { title: 'Blog', text: 'Practical guides on learning and using AI.', href: '/blog/' },
  faq: { title: 'Questions', text: 'Direct answers about meetups, learning and workshops.', href: '/faq/' },
  about: { title: 'About', text: 'Meet the team behind the projects and community.', href: '/about/' },
};
export const RELATED = {
  '/solutions/': [P.usecases, P.workshops, P.about], '/workshops/': [P.events, P.solutions, P.blog], '/events/': [P.workshops, P.community, P.faq],
  '/community/': [P.about, P.faq, P.solutions], '/about/': [P.solutions, P.workshops, P.community], '/contact/': [P.solutions, P.about, P.faq], '/faq/': [P.events, P.workshops, P.blog],
  '/blog/': [P.events, P.workshops, P.faq], '/partners/': [P.solutions, P.community, P.workshops],
};
export const ARTICLE_RELATED = [P.blog, P.faq, P.solutions];
export const CONNECT = [{ label: 'YouTube', href: 'https://www.youtube.com/@nextgenius14' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nextgen14' }, { label: 'Meetup', href: 'https://www.meetup.com/ailearnersclub/' }, { label: 'X', href: 'https://x.com/nextgeniusau' }];
export const SERVICES = [
  { unit: 'u172 u023 u022 u021', id: 'ai-automation', aliases: ['openai', 'assistant', 'customer-service', 'bookings', 'connected-tools', 'knowledge'], title: 'AI & Automation', text: 'Connect your inbox, customer records and internal information. We build assistants that answer questions, prepare drafts and pass work between systems, with staff approval where the task needs it.', items: ['Customer service assistants for website enquiries, product questions and staff handover', 'Bookings, reminders and lead follow-up through connected calendars and customer systems', 'Internal knowledge search with sources from approved documents', 'Workflow integrations, email drafts, order updates and feedback collection'], links: [{ href: '/solutions/ai-automation-sydney/', label: 'Explore business process automation' }, { href: '/solutions/openai-integration/', label: 'OpenAI integration' }, { href: '/solutions/customer-service-assistants/', label: 'Customer service assistants' }, { href: '/solutions/bookings-lead-follow-up/', label: 'Bookings and follow-up' }] },
  { unit: 'u024 u170', id: 'software-digital-products', aliases: ['custom-software', 'web-apps', 'mobile-apps', 'websites'], title: 'Software & Digital Products', text: 'Build the interface your team or customers need: a website, mobile app, portal or internal tool. Our work covers design, development, system connections, testing and handover.', items: ['Web and mobile apps, customer portals and booking platforms', 'Dashboards and internal tools connected to your business systems', 'Business websites and landing pages with clear enquiry paths', 'Prototypes, testing, hosting, analytics and maintenance agreed for your project'], links: [{ href: '/contact/', label: 'Discuss a digital product' }] },
  { unit: 'u020 u168', id: 'strategy-governance', aliases: ['planning', 'governance-services'], title: 'AI Strategy & Governance', text: 'Identify where AI fits, check feasibility and establish who owns the decisions. Strategy and implementation support from Schnellstart can sit alongside specialist governance advice from Altamir.', items: ['Opportunity assessment, workflow reviews and prioritised next steps', 'Feasibility checks and focused prototypes before a larger investment', 'AI readiness, policies, ownership and use-case review pathways', 'Leadership reporting and ongoing governance advice'], links: [{ href: '/solutions/ai-strategy-governance/', label: 'Explore governance support' }, { href: '/getting-started/', label: 'How engagements start' }] },
  { unit: 'u169 u171', id: 'team-enablement', aliases: ['training', 'copilot'], title: 'Training & Team Enablement', text: 'Help staff use AI in the work they already do. Workshops and coaching cover tools, task design and reviewing results, with Microsoft 365 and Copilot expertise available through Schnellstart.', items: ['Hands-on AI workshops using real tasks and agreed data rules', 'Team coaching, reusable materials and leadership sessions', 'Microsoft 365 and Copilot readiness, permissions and staged adoption', 'Handover, follow-up support and reviews of how tools are being used'], links: [{ href: '/workshops/', label: 'Explore team workshops' }, { href: '/contact/', label: 'Discuss team enablement' }] },
];
export const INTERESTS = [...SERVICES.map(service => service.title), 'Partnership', 'Something else'];

export const OFFERS = [
  { unit: 'u003', href: '/solutions/ai-automation-sydney/', cta: 'Explore connected tools', title: 'Automate everyday admin', text: 'Move enquiry details into customer records, trigger follow-up tasks and keep routine updates moving.' },
  { unit: 'u004', href: '/solutions/knowledge-assistants/', cta: 'Explore company knowledge', title: 'Put your business knowledge to work', text: 'Help staff find answers in policies, procedures and internal documents, with references to the source.' },
  { unit: 'u005', href: '/solutions/software-digital-products/', cta: 'Explore web & mobile app development', title: 'Connect the systems you already use', text: 'Link the software used by sales, operations and service. Add portals or internal tools where the existing interfaces fall short.' },
];

export const PATH = [
  { unit: 'u011', title: 'Discover', text: 'Map the task, people, tools and points where work gets stuck.' },
  { unit: 'u012', title: 'Plan', text: 'Define the deliverables and how your team will assess the result.' },
  { unit: 'u013', title: 'Test', text: 'Build and test with representative tasks, including the exceptions.' },
  { unit: 'u014', title: 'Support', text: 'Hand over the system, train your team and plan ongoing maintenance.' },
];

export const FAQ = [
  { unit: 'u097 u155', link: { href: '/events/', label: 'Explore events' }, title: 'What happens at a NextGenius meetup?', text: 'Meet people working with AI, discuss tools and projects, and explore topics such as agents and workflow automation. Check the event listing for the format, audience and any preparation.' },
  { unit: 'u098 u156', link: { href: '/community/', label: 'Explore AI Learners Club' }, title: 'Can I join if I am new to AI?', text: 'AI Learners Club welcomes beginners in Sydney and online. Bring questions and start with a session that matches your experience. Technical workshops may need prior knowledge; check the session details.' },
  { unit: 'u099 u157', link: { href: '/events/', label: 'Find event calendars' }, title: 'Where do I find dates and register?', text: 'Follow the calendar links on our Events page. Each listing provides the date, location or online link, registration instructions and any attendance fee.' },
  { unit: 'u100 u158', link: { href: '/community/', label: 'Meet the community' }, title: 'Who is the community for?', text: 'Founders, engineers, business owners, operators and students interested in building with AI. You can come to learn, share a project or meet people with complementary experience.' },
  { unit: 'u101 u159', link: { href: '/workshops/', label: 'View workshop topics' }, title: 'Can you run a workshop for our team?', text: 'Yes. Tell us your team’s roles, current experience and what they want to learn. We discuss the topics, format and preparation with you.' },
  { unit: 'u102 u160', link: { href: '/getting-started/', label: 'Plan a business project' }, title: 'Can you help us implement an idea after a session?', text: 'Yes. NextGenius also provides AI integration, automation and software development. Use the Getting Started guide to prepare for a project conversation.' },
];
