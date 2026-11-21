import { useEffect } from "react";

export const APP_NAME = "FeastFly";

/** Sets `document.title` to "<title> | FeastFly" (or just the app name). */
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [title]);
};

export default useDocumentTitle;
