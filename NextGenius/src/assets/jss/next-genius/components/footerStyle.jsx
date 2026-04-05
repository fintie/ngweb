// ##############################
// // // Footer styles
// #############################

import { container, primaryColor } from "assets/jss/next-genius.jsx";

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
    float: "right!important",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  center: {
    padding: "15px 0",
    margin: "0",
    fontSize: "0.9rem"
  },
  footer: {
    padding: "1.5rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
    marginTop: "48px",
    borderTop: "1px solid #e7ecf3",
    background: "#f8fafc"
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
  socialRow: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
    whiteSpace: "nowrap"
  },
  rightText: {
    textAlign: "right"
  },
  socialIconsButton:{
    minWidth: "40px",
    width: "40px",
    height: "40px",
    padding: "8px",
    margin: "0",
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
