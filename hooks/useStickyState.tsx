import React, { useEffect, useRef, useState } from "react";

function useStickyState(defaultValue: any, key: string) {
  const [value, setValue] = useState(defaultValue);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStickyState;
