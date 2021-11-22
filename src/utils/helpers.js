import { setConfig } from "react-google-translate";

console.log("REACT_APP_GCP_CLIENT_EMAIL : ", process.env.REACT_APP_GCP_CLIENT_EMAIL);
console.log("REACT_APP_GCP_PRIVATE_KEY : ", process.env.REACT_APP_GCP_PRIVATE_KEY);
console.log("REACT_APP_GCP_PROJECT_ID : ", process.env.REACT_APP_GCP_PROJECT_ID);

export const setGoogleTranslateConfig = () => {
  setConfig({
    clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL,
    privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY,
    projectId: process.env.REACT_APP_GCP_PROJECT_ID,
  });
};
