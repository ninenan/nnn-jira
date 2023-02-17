import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string, isKeep = false) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!isKeep) {
        document.title = oldTitle;
      }
    };
  }, [isKeep, oldTitle]);
};

export default useDocumentTitle;
