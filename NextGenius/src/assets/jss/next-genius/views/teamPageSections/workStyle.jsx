import { title, container, grayColor } from "assets/jss/next-genius.jsx";

const workStyle = {
    container: {
        zIndex: "1",
        color: "#FFFFFF",
        width: "100%",
        ...container
    },
  section: {
      padding: "20px 0",
      textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: grayColor,
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  },
  sendBtnGrid: {
      width: "100%"
  },
  sendBtn:{
      color: "inherit!important"
  }
};

export default workStyle;
