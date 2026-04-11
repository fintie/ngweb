import React from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { SectionHeader } from "components/Sections/ContentBlocks.jsx";

function FaqSection({ title, description, items, limit }) {
  const faqs = limit ? items.slice(0, limit) : items;

  return (
    <div>
      <SectionHeader title={title} description={description} />
      <GridContainer>
        {faqs.map(item => (
          <GridItem xs={12} sm={12} md={6} key={item.question}>
            <div style={{ height: "100%", background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <h3 style={{ marginTop: 0, color: "#111827", fontSize: 20 }}>{item.question}</h3>
              <p style={{ marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>{item.answer}</p>
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}

FaqSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  items: PropTypes.array.isRequired,
  limit: PropTypes.number
};

export default FaqSection;
