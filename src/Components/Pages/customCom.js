// useDynamicMargin.js
import { useState, useEffect } from "react";

const useDynamicMargin = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let dynamicMargin = "";
 
  if (width <= 1312 && width <= 1399) {
    dynamicMargin = "ml-[10%]";
  } else if (width <= 1280) {
    dynamicMargin = "ml-[14%]";
  }

  return dynamicMargin;
};

export default useDynamicMargin;
