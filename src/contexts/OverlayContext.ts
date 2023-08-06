import { Context, createContext } from "react";
import { Overlays } from "../types/entites/Overlays";

export const OverlayContext: Context<Overlays> = createContext({} as Overlays);
