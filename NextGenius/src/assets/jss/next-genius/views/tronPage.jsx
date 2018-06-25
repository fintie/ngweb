import { container, title, grayColor, grayColor2, lightColor, cardTitle } from "assets/jss/next-genius.jsx";

import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const tronPageStyle = {
  container: {
    zIndex: "1",
    color: "#FFFFFF",
    ...container
  },
  parallax:{
    "&:before": {
      background: "rgba(0, 0, 0, 0.7)"
    }
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "0",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "5px",
    boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 576px)": {
      margin: "-60px 15px 0px",
    },
  },
  section: {
    padding: "40px 0",
    textAlign: "center"
  },
  // title: {
  //     ...title,
  //     marginBottom: "1rem",
  //     marginTop: "30px",
  //     minHeight: "32px",
  //     textDecoration: "none"
  // },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: grayColor2
  },
  description: {
    color: lightColor,
    fontWeight: "400"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: grayColor
  },
  margin5: {
    margin: "5px"
  }
};

export default tronPageStyle;
