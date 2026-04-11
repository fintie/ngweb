import { siteConfig } from "content/siteContent";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 Broadway",
      addressLocality: "Ultimo",
      addressRegion: "NSW",
      postalCode: "2007",
      addressCountry: "AU"
    },
    sameAs: [siteConfig.meetupUrl, siteConfig.linkedinUrl, siteConfig.xUrl]
  };
}

export function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildEventSchema(events) {
  return events.map(event => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "NextGenius Sydney",
      address: siteConfig.address
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl
    },
    description: event.description,
    url: `${siteConfig.siteUrl}${event.ctaTo}`
  }));
}

export function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${post.slug}`
  };
}
