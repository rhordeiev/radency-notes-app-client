import { Dispatch, SetStateAction } from "react";

export type OverlayProps = {
  createButtonClicked: boolean;
  setCreateButtonClicked: Dispatch<SetStateAction<boolean>>;
};
