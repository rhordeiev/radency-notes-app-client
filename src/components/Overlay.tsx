import NotesForm from "./NotesForm";
import { NotesFormType } from "../types/enums/NotesFormType";
import { hideOverlay } from "../helpers/overlayHandling";
import { useContext } from "react";
import { OverlayContext } from "../contexts/OverlayContext";

export default function Overlay() {
  const overlays = useContext(OverlayContext);
  const overlaysArray = [
    overlays.createOverlay,
    overlays.editOverlay,
    overlays.deleteOverlay,
  ];

  overlaysArray.forEach((overlay) => {
    if (overlay.current) {
      overlay.current.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          hideOverlay(e.target as HTMLDivElement);
        }
      });
    }
  });

  return (
    <>
      <NotesForm
        formType={NotesFormType.Create}
        formRef={overlays.createOverlay}
      />
      <NotesForm formType={NotesFormType.Edit} formRef={overlays.editOverlay} />
      <NotesForm
        formType={NotesFormType.Delete}
        formRef={overlays.deleteOverlay}
      />
    </>
  );
}
