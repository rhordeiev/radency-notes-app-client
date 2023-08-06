import { useRef, useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import NotesTable from "./components/NotesTable";
import Overlay from "./components/Overlay";
import "./styles/style.css";
import "./styles/overlay.css";
import "./styles/responsive.css";
import { TableType } from "./types/enums/TableType";
import { Overlays } from "./types/entites/Overlays";
import { OverlayContext } from "./contexts/OverlayContext";
import { showOverlay } from "./helpers/overlayHandling";

function App() {
  const tablesSectionRef = useRef<HTMLElement>(null);
  const tablesBlockRef = useRef<HTMLDivElement>(null);
  const createOverlay = useRef<HTMLDivElement>(null);
  const editOverlay = useRef<HTMLDivElement>(null);
  const deleteOverlay = useRef<HTMLDivElement>(null);
  const overlays: Overlays = {
    createOverlay,
    editOverlay,
    deleteOverlay,
  };

  const [tablesSectionWidth, setTablesSectionWidth] = useState<number>(0);

  function updateTablesSectionWidth(): void {
    if (tablesSectionRef.current) {
      setTablesSectionWidth(
        tablesSectionRef.current.getBoundingClientRect().width,
      );
    }
  }

  function onCreateClick() {
    if (createOverlay.current) showOverlay(createOverlay.current);
  }

  useEffect(() => {
    updateTablesSectionWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", updateTablesSectionWidth);

    return () => {
      window.removeEventListener("resize", updateTablesSectionWidth);
    };
  }, [tablesSectionWidth]);

  return (
    <>
      <header>
        <Navigation
          tablesSectionWidth={tablesSectionWidth}
          tablesBlockRef={tablesBlockRef}
        />
      </header>
      <OverlayContext.Provider value={overlays}>
        <main>
          <div>
            <button
              className="default-button create-button"
              onClick={onCreateClick}
            >
              Create
            </button>
            <section ref={tablesSectionRef}>
              <div ref={tablesBlockRef}>
                <NotesTable tableType={TableType.Main} />
                <NotesTable tableType={TableType.Summary} />
                <NotesTable tableType={TableType.Archived} />
              </div>
            </section>
          </div>
        </main>
        <Overlay />
      </OverlayContext.Provider>
    </>
  );
}

export default App;
