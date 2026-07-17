import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "../types/content";
import { defaultSiteContent } from "../data/siteContent";
import { fetchSiteContent, isContentfulConfigured } from "./contentful";

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  source: "default" | "contentful";
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultSiteContent,
  loading: false,
  source: "default",
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState<boolean>(isContentfulConfigured);
  const [source, setSource] = useState<"default" | "contentful">("default");

  useEffect(() => {
    if (!isContentfulConfigured) return;
    let mounted = true;
    fetchSiteContent()
      .then((data) => {
        if (!mounted) return;
        setContent(data);
        setSource("contentful");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ content, loading, source }),
    [content, loading, source],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  return useContext(ContentContext).content;
}

export function useContentMeta() {
  const { loading, source } = useContext(ContentContext);
  return { loading, source };
}
