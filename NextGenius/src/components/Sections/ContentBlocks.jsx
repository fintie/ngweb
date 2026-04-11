import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const isExternalLink = url => /^https?:\/\//.test(url);
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

export function SectionHeader({ eyebrow, title, description, align }) {
  return (
    <div style={{ marginBottom: 26, textAlign: align || "left" }}>
      {eyebrow ? (
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#144f8f", marginBottom: 8 }}>
          {eyebrow}
        </div>
      ) : null}
      <h2 style={{ margin: "0 0 10px", color: "#111827" }}>{title}</h2>
      {description ? <p style={{ margin: 0, color: "#516076", lineHeight: 1.8 }}>{description}</p> : null}
    </div>
  );
}

export function ContentCard({ title, description, bullets, ctaLabel, ctaTo }) {
  return (
    <div style={{ height: "100%", background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 22, boxShadow: "0 10px 28px rgba(28,49,88,0.05)" }}>
      <h3 style={{ marginTop: 0, marginBottom: 8, color: "#111827" }}>{title}</h3>
      <p style={{ color: "#516076", lineHeight: 1.8 }}>{description}</p>
      {bullets && bullets.length ? (
        <ul style={{ paddingLeft: 18, marginBottom: 18, color: "#516076", lineHeight: 1.8 }}>
          {bullets.map(item => <li key={item}>{item}</li>)}
        </ul>
      ) : null}
      {ctaLabel && ctaTo ? (
        isExternalLink(ctaTo) ? (
          <Button color="primary" href={ctaTo} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </Button>
        ) : (
          <Button color="primary" component={Link} to={ctaTo}>
            {ctaLabel}
          </Button>
        )
      ) : null}
    </div>
  );
}

export function CtaBlock({ title, description, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #0d1f36 0%, #144f8f 100%)", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
      <GridContainer alignItems="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 style={{ marginTop: 0, color: "#fff" }}>{title}</h2>
          <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.93 }}>{description}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} style={{ textAlign: "right" }}>
          {primaryLabel && primaryTo ? (
            isExternalLink(primaryTo) ? (
              <Button color="primary" size="lg" href={primaryTo} target="_blank" rel="noopener noreferrer" style={{ marginRight: secondaryLabel ? 10 : 0 }}>
                {primaryLabel}
              </Button>
            ) : (
              <Button color="primary" size="lg" component={Link} to={primaryTo} style={{ marginRight: secondaryLabel ? 10 : 0 }}>
                {primaryLabel}
              </Button>
            )
          ) : null}
          {secondaryLabel && secondaryTo ? (
            isExternalLink(secondaryTo) ? (
              <Button color="white" size="lg" href={secondaryTo} target="_blank" rel="noopener noreferrer">
                {secondaryLabel}
              </Button>
            ) : (
              <Button color="white" size="lg" component={Link} to={secondaryTo}>
                {secondaryLabel}
              </Button>
            )
          ) : null}
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  align: PropTypes.string
};

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bullets: PropTypes.array,
  ctaLabel: PropTypes.string,
  ctaTo: PropTypes.string
};

CtaBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  primaryLabel: PropTypes.string,
  primaryTo: PropTypes.string,
  secondaryLabel: PropTypes.string,
  secondaryTo: PropTypes.string
};
