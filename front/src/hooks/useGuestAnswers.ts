import { useCallback, useEffect, useState } from "react";
import type { GuestAnswerResponse } from "../shared/types";
import { getAllGuestAnswers } from "../api/service/InvitationService";

export const useGuestAnswers = (autoFetch = true) => {
  const [guestAnswers, setGuestAnswers] = useState<GuestAnswerResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const result = await getAllGuestAnswers();
    setGuestAnswers(Array.isArray(result) ? result : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!autoFetch) return;
    void refresh();
  }, [autoFetch, refresh]);

  return { guestAnswers, loading, refresh, setGuestAnswers };
};
