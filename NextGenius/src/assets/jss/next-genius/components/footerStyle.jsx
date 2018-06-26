// ##############################
// // // Footer styles
// #############################

import { container, primaryColor, grayColor } from "assets/jss/next-genius.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    // textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right!important"
  },
  center: {
    padding: "15px 0",
    margin: "0",
    fontSize: "0.9rem"
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative"
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:active": {
      backgroundColor: "transparent",
    }

  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container,
  gridContainer:{
    alignItems: "center"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"

  },
  socialIconsButton:{
    "&:hover, &:focus":{
      backgroundColor: "transparent",
      color: "inherit"
    }
  },
  facebook: {
    color: "#3b5998"
  },
  medium: {
    color: "#292929"
  },
  twitter:{
    color: "#55acee"
  },
  telegram:{
    color: "#3cacde"
  }
};
export default footerStyle;
