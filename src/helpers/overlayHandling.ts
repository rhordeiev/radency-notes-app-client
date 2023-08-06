export const showOverlay = (overlay: HTMLDivElement) => {
  overlay.classList.remove("overlay-appearance-down");
  overlay.classList.add("overlay-appearance-up");
};
export const hideOverlay = (overlay: HTMLDivElement) => {
  overlay.classList.remove("overlay-appearance-up");
  overlay.classList.add("overlay-appearance-down");
};
