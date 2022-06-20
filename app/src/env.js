/* eslint-disable no-undef */

const env = process.env.REACT_APP_ENVIRONMENT || "local";

let envApiUrl = "";

if (env === "prod") {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v1`;
} else if (env === "stage") {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAGE}/api/v1`;
} else if (env === "dev") {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v1`;
} else {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v1`;
}

const apiUrl = envApiUrl;
export default apiUrl;
