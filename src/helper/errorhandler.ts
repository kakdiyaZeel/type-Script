export const sqlErrorHandler = (code: any) => {
  var errMsg = "";
  switch (code) {
    case "jwt must be provided":
      errMsg = "Recent sign in required!";
      break;
  }
  return errMsg;
};
