import { container,title, grayColor } from "assets/jss/next-genius.jsx";
import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const officeStyle = {
  container,
  section: {
    padding: "10px 0",
    textAlign: "center"
  },
  ...imagesStyle,
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "20px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor,
    paddingBottom: '20px'
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  }
};

export default officeStyle;
