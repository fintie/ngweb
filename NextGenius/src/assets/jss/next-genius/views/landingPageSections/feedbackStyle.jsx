import { container, cardTitle, title, primaryColor, grayColor, bgColor, lightColor,lightColor2 } from "assets/jss/next-genius.jsx";
import image from "assets/img/feedback.jpg";

const feedbackStyle = {
  section: {
    padding: "40px 0",
    textAlign: "center"
  },
  container: {
    zIndex: "2",
    color: "#FFFFFF",
    ...container,
    paddingLeft: "25px"
  },
  containImage:{
    backgroundPosition: "top center",
    backgroundSize: "cover",
    margin: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
    backgroundImage: "url(" + image + ")",
    height: "500px",
    position: "relative"
  },
  marginAuto: {
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: "100%"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "0",
    minHeight: "32px",
    textDecoration: "none"
  },
  titleDescription: {
    color: grayColor,
    fontSize: "1rem",
    paddingBottom: "20px"
  },
  description: {
    color: bgColor,
    fontSize: "1.2rem",
    fontStyle: "italic"
  },
  cardCarousel: {
    overflow: "hidden",
    height: "100%",
    margin: "0",
    background: "transparent"
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle:{
    ...cardTitle,
    color: lightColor2
  },
  smallTitle: {
    color: grayColor
  },
  cardBody: {
    flex: "1 1 auto",
    padding: "100px",
    "@media (max-width: 576px)": {
      padding: "60px",
    },
  },
  star:{
    color: primaryColor
  }
};

export default feedbackStyle;
