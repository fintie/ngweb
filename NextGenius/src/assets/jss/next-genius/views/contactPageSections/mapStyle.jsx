import { container, title, grayColor } from "assets/jss/next-genius.jsx";

import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const mapPageStyle = {
  container,
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: grayColor,
    textAlign: "center !important"
  },
  name: {
    marginTop: "-80px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  map: {
    height: "350px!important",
    marginTop: "-322px",
    backgroundColor: "#00000040",

  }
};

export default mapPageStyle;
