export const openAuthModal = (): void => {
  window.dispatchEvent(new CustomEvent("auth:open"));
};
