import { cardTitle, title, primaryColor, bgColor, grayColor, dangerColor } from "assets/jss/next-genius.jsx";
import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const addressStyle = {
  section: {
      padding: "10px 0",
      textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "left"
  },
  formTitle:{
    textAlign: "center"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "20px"
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d"
  },
  description: {
    color: grayColor,
    textAlign:"left"
  },
  justifyCenter: {
    justifyContent: "center !important"
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
      color: "#3C4858",
      textDecoration: "none"
  },
  subtitle: {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
  },
  container: {
    "@media (max-width: 576px)": {
      padding: "0 20px"
    }
  },
  contactType:{
    marginTop: "28px",
    textAlign: "right",
    color: primaryColor,
    paddingRight: "0",
    "@media (max-width: 576px)": {
      marginLeft: '-50px'
    },
  },
  contactInfo:{
    marginTop: "30px",
    textAlign: "left"
  },
  icons:{
    fontSize:"30px"
  },
  checkboxAndRadio: {
    position: "relative",
    display: "block",
    marginBottom: "10px",
    display: "flex",
    alignItems: "start"

  },
  checked: {
    color: primaryColor + "!important"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  disabledCheckboxAndRadio: {
    opacity: "0.45"
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: grayColor,
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
    transition: "0.3s ease all",
    textAlign: "left",
    "@media (max-width: 576px)": {
      fontSize: "12px"
    },
  },
  labelHorizontal: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right"
    }
  },
  navLink: {
    color: "inherit",
    position: "relative",
    //padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    marginTop: "15px",
    backgroundColor:bgColor,
    boxShadow: "none",
    width:"100%",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)",
      boxShadow: "none",
    },
    "@media (max-width: 576px)": {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start"
      }
    }
  },
  mandatory:{
    color: dangerColor
  },
  note:{
    fontSize: ".8rem",
    textAlign: "right"
  },
  submitBtnGrid: {
    padding: "20px 0"
  },
  submitButton:{
    width:"300px",
    "@media (max-width: 576px)": {
      width:"200px",
    }
  }
};

export default addressStyle;
