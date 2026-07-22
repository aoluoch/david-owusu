import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "../types/content";
import { defaultSiteContent } from "../data/siteContent";
import { fetchSiteContent } from "./api";
import {
  appwriteConfig,
  collectionChannel,
  isAppwriteConfigured,
  subscribe,
} from "./appwrite";

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  source: "default" | "appwrite";
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultSiteContent,
  loading: false,
  source: "default",
  refresh: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState<boolean>(isAppwriteConfigured);
  const [source, setSource] = useState<"default" | "appwrite">("default");

  /** Re-fetch content without toggling the loading flag (for live updates). */
  const applyLatest = useCallback(async () => {
    const data = await fetchSiteContent();
    setContent(data);
    setSource("appwrite");
  }, []);

  const refresh = useCallback(async () => {
    if (!isAppwriteConfigured) return;
    setLoading(true);
    try {
      await applyLatest();
    } finally {
      setLoading(false);
    }
  }, [applyLatest]);

  useEffect(() => {
    let mounted = true;
    if (!isAppwriteConfigured) return;
    fetchSiteContent()
      .then((data) => {
        if (!mounted) return;
        setContent(data);
        setSource("appwrite");
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Live updates: whenever the site-content document or an event changes in
  // Appwrite, re-fetch so the public site reflects admin edits without a manual
  // page refresh.
  useEffect(() => {
    if (!isAppwriteConfigured) return;
    const unsubscribe = subscribe(
      [
        collectionChannel(appwriteConfig.siteContentCollectionId),
        collectionChannel(appwriteConfig.eventsCollectionId),
      ],
      () => {
        applyLatest().catch(() => {});
      },
    );
    return unsubscribe;
  }, [applyLatest]);

  const value = useMemo(
    () => ({ content, loading, source, refresh }),
    [content, loading, source, refresh],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  return useContext(ContentContext).content;
}

export function useContentMeta() {
  const { loading, source, refresh } = useContext(ContentContext);
  return { loading, source, refresh };
}
