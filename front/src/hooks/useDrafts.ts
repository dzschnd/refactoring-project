import { useCallback, useEffect, useState } from "react";
import type { CardInfo } from "../types";
import { getAllDrafts } from "../api/service/DraftService";

export const useDrafts = (autoFetch = true) => {
  const [drafts, setDrafts] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const result = await getAllDrafts();
    setDrafts(Array.isArray(result) ? result : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!autoFetch) return;
    void refresh();
  }, [autoFetch, refresh]);

  return { drafts, loading, refresh, setDrafts };
};
