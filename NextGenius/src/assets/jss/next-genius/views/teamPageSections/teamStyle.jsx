import { cardTitle, title, grayColor } from "assets/jss/next-genius.jsx";
import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const teamStyle = {
  section: {
      padding: "10px 0",
      textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "40px",
    minHeight: "32px",
    textDecoration: "none"
  },
  ...imagesStyle,
  avatar:{
    // height: "100px",
    maxHeight: "200px"
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle:{
      ...cardTitle,
    marginBottom: "0"
  },
  smallTitle: {
    color: grayColor
  },
  socialGroup:{
    height: '51px'
  },
  cardBody:{
    flex: "1 1 auto",
    padding: "0",
    height: "100px"
  },
  description: {
    color: grayColor,
    fontSize: ".8rem",
    lineHeight: "1.2rem"
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
  },
  titleBlack: {
      ...title,
      display: "inline-block",
      position: "relative",
      marginTop: "50px",
      minHeight: "32px",
      textDecoration: "none"
  },
  subtitle: {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
  },
  subTitleBlack: {
      color: grayColor,
  },

  facebook: {
      color: "#3b5998"
  },
  linkedIn: {
      color: "#0976b4"
  },
  twitter:{
      color: "#55acee"
  },
  instagram:{
      color: "#8a3ab9"
  }
};

export default teamStyle;
