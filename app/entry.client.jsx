import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);

// if the browser supports SW (all modern browsers do it)
if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    () => {
      console.log("Service worker registered");
      // we will register it after the page complete the load
      navigator.serviceWorker.register("/sw.js");
    },
    function (err) {
      console.log("service worker failed", err);
    }
  );
} else {
  console.log("service worker not in navigator");
}
