import { useState, useEffect } from "react";

const useBreakPointChange = <T extends number | string>(options: {
  initialValue: T;
  defaultValue: T;
  mobMdValue: T;
  mdValue: T;
  blogLgValue: T;
}) => {
  const [matchesValue, setMatchesValue] = useState<T>(options.initialValue);

  useEffect(() => {
    const defaultMediaQuery = window.matchMedia(
      "(min-width: 0px) and (max-width: 544px)"
    );
    const mobMdMediaQuery = window.matchMedia(
      "(min-width: 545px) and (max-width: 767px)"
    );
    const mdMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 991px)"
    );
    const blogLgMediaQuery = window.matchMedia("(min-width: 992px)");
    if (blogLgMediaQuery.matches) {
      setMatchesValue(options.blogLgValue);
    } else if (mdMediaQuery.matches) {
      setMatchesValue(options.mdValue);
    } else if (mobMdMediaQuery.matches) {
      setMatchesValue(options.mobMdValue);
    } else if (defaultMediaQuery.matches) {
      setMatchesValue(options.defaultValue);
    }

    const listener = (ev: any, value: T) => {
      if (ev.matches) {
        setMatchesValue(value);
      }
    };
    defaultMediaQuery.addEventListener("change", (ev) =>
      listener(ev, options.defaultValue)
    );
    mobMdMediaQuery.addEventListener("change", (ev) =>
      listener(ev, options.mobMdValue)
    );
    mdMediaQuery.addEventListener("change", (ev) =>
      listener(ev, options.mdValue)
    );
    blogLgMediaQuery.addEventListener("change", (ev) =>
      listener(ev, options.blogLgValue)
    );

    return () => {
      defaultMediaQuery.removeEventListener("change", (ev) =>
        listener(ev, options.defaultValue)
      );
      mobMdMediaQuery.removeEventListener("change", (ev) =>
        listener(ev, options.mobMdValue)
      );
      mdMediaQuery.removeEventListener("change", (ev) =>
        listener(ev, options.mdValue)
      );
      blogLgMediaQuery.removeEventListener("change", (ev) =>
        listener(ev, options.blogLgValue)
      );
    };
  }, [options, setMatchesValue]);

  return matchesValue;
};

export default useBreakPointChange;
