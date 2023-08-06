import { RefObject } from "react";

export type Overlays = {
  createOverlay: RefObject<HTMLDivElement>;
  editOverlay: RefObject<HTMLDivElement>;
  deleteOverlay: RefObject<HTMLDivElement>;
};
