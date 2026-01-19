import { useCallback, useEffect, useState } from "react";
import type { InvitationDetailsResponse } from "../shared/types";
import { getAllInvitations } from "../api/service/InvitationService";

export const useInvitations = (autoFetch = true) => {
  const [invitations, setInvitations] = useState<InvitationDetailsResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const result = await getAllInvitations();
    setInvitations(Array.isArray(result) ? result : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!autoFetch) return;
    void refresh();
  }, [autoFetch, refresh]);

  return { invitations, loading, refresh, setInvitations };
};
