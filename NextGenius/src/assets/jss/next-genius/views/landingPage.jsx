import { container, title, primaryColor } from "assets/jss/next-genius.jsx";

const landingPageStyle = {
  container: {
    zIndex: "2",
    color: "#FFFFFF",
    ...container,
    paddingLeft: "25px"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    paddingBottom: "20px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
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
  playVideo:{
    zIndex:"1"
  },
  icons:{
    fontSize:"4rem",
    color: primaryColor,
    marginTop: "-10px"
  },
  arrowGrid: {
    textAlign: "center"
  }
};

export default landingPageStyle;
