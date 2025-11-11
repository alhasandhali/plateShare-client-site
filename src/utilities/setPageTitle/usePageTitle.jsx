import React, { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `PlateShare - ${title}`;
  }, [title]);
};

export default usePageTitle;
