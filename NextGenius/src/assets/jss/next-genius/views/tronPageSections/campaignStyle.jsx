import { title, grayColor, grayColor2, lightColor2, cardTitle } from "assets/jss/next-genius.jsx";

import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";
const campaignStyle = {
  section: {
    padding: "10px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "50px",
    minHeight: "32px",
    textDecoration: "none"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle:{
    ...cardTitle,
    marginBottom: "0"
  },
  smallTitle: {
    color: lightColor2
  },
  subTitle:{
    color: grayColor2,
    fontSize: ".9rem",
    fontWeight: "400"
  },
  socialGroup:{
    height: '51px'
  },
  cardBody:{
    flex: "1 1 auto",
    padding: "0",
    height: "100px"
  },
  imgElection:{
    marginBottom: "0!important"
  },
  description: {
    color: grayColor,
  },
  note:{
    // fontSize: ".75rem",
    color: grayColor,
    textAlign: "left"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },

  margin5: {
    margin: "5px"
  }
};

export default campaignStyle;
