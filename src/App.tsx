import { useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { ContentProvider, useContentMeta } from "./lib/ContentContext";
import { AuthProvider } from "./lib/AuthContext";
import { router } from "./router";

const MIN_SPLASH_MS = 700;

function BootSplash() {
  const { loading } = useContentMeta();
  const shownAt = useRef(Date.now());

  useEffect(() => {
    const el = document.getElementById("boot-loader");
    if (!el) return;

    let hideTimer: number | undefined;
    let removeTimer: number | undefined;

    const hide = () => {
      const wait = Math.max(0, MIN_SPLASH_MS - (Date.now() - shownAt.current));
      hideTimer = window.setTimeout(() => {
        if (!el.isConnected) return;
        el.classList.add("is-done");
        removeTimer = window.setTimeout(() => el.remove(), 500);
      }, wait);
    };

    if (!loading) hide();

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, [loading]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BootSplash />
        <RouterProvider router={router} />
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
