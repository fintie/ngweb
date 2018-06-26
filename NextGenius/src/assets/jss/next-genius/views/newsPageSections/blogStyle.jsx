import { title, container, grayColor } from "assets/jss/next-genius.jsx";
import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const blogStyle = {
  container: {
      zIndex: "1",
      color: "#FFFFFF",
      width: "100%",
      ...container,
    padding: "30px 0",
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
    textAlign: "center",
    paddingBottom: '20px',
    marginTop: '0'
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  imgWidth: {
    maxWidth: "100%"
  },
  ...imagesStyle,
  // title: {
  //   ...title,
  //   marginBottom: "1rem",
  //   marginTop: "20px",
  //   minHeight: "32px",
  //   textDecoration: "none"
  // },
  // description: {
  //   color: "#999",
  //   paddingBottom: '10px',
  //   paddingBottom: '20px'
  // },
  // navWrapper: {
  //   margin: "20px auto 50px auto",
  //   textAlign: "center"
  // }
};

export default blogStyle;
