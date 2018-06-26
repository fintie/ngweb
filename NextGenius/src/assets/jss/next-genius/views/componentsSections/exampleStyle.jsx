import { conatinerFluid } from "assets/jss/next-genius.jsx";

import imagesStyle from "assets/jss/next-genius/imagesStyles.jsx";

const exampleStyle = {
  section: {
    padding: "70px 0"
  },
  container: {
    ...conatinerFluid,
    textAlign: "center !important"
  },
  ...imagesStyle,
  link: {
    textDecoration: "none"
  }
};

export default exampleStyle;
