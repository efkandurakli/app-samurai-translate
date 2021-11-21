import { setConfig } from "react-google-translate";

export const setGoogleTranslateConfig = () => {
  setConfig({
    clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL,
    privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY,
    projectId: process.env.REACT_APP_GCP_PROJECT_ID,
  });
};
