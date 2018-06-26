import { title, grayColor } from "assets/jss/next-genius.jsx";

const serviceStyle = {
  section: {
    padding: "40px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "0",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor,
    fontSize: "1rem"
  },
  descriptionItems: {
    color: grayColor,
    textAlign: "left",
    paddingLeft: "80px"
  }
};

export default serviceStyle;
