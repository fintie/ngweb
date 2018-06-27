
export const isAlphaNumeric = ch => {
  return ch.match(/^[a-z0-9]+$/i) !== null;
}

export const isNumeric = ch => {
  return (''+ch).match(/^[0-9]+$/i) !== null;
}

export const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}