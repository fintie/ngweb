import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { siteConfig } from "content/siteContent";

function Seo({ title, description, path, keywords, image, schema }) {
  const canonical = `${siteConfig.siteUrl}${path || ""}`;
  const imageUrl = image || `${siteConfig.siteUrl}/favicon.ico`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={(keywords || []).join(", ")} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  keywords: PropTypes.array,
  image: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Seo;
