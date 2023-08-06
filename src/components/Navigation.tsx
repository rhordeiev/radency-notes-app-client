import { useRef } from "react";
import { NavigationProps } from "../types/props/NavigationProps";
import "../styles/navigation.css";

export default function Navigation({
  tablesSectionWidth,
  tablesBlockRef,
}: NavigationProps) {
  const navRef = useRef<HTMLUListElement>(null);

  function getNavElements(): Element[] {
    if (navRef.current?.children) {
      return [...navRef.current?.children];
    }
    return [];
  }

  function setNavElementUnderlineWidth(
    navElement: HTMLElement,
    width: string,
  ): void {
    navElement.style.setProperty("--nav-underline-width", width);
  }

  getNavElements().forEach((navElement: Element) => {
    navElement.addEventListener("click", (e: Event) => {
      getNavElements().forEach((navElement: Element) => {
        setNavElementUnderlineWidth(navElement as HTMLElement, "0%");
      });
      const navElement = e.target;
      setNavElementUnderlineWidth(navElement as HTMLElement, "100%");
    });
  });

  function setTableMargin(margin: string): void {
    if (tablesBlockRef.current?.children) {
      [...tablesBlockRef.current.children].forEach((table: Element) =>
        (table as HTMLTableElement).style.setProperty("--table-margin", margin),
      );
    }
  }
  function onMainTabRefClick(): void {
    setTableMargin("0px");
  }
  function onSummaryTabRefClick(): void {
    setTableMargin(`${-tablesSectionWidth}px`);
  }
  function onArchivedTabRefClick(): void {
    setTableMargin(`${-2 * tablesSectionWidth}px`);
  }

  return (
    <nav>
      <ul ref={navRef}>
        <li id="main-tab" onClick={onMainTabRefClick}>
          Main
        </li>
        <li id="summary-tab" onClick={onSummaryTabRefClick}>
          Summary
        </li>
        <li id="archived-tab" onClick={onArchivedTabRefClick}>
          Archived
        </li>
      </ul>
    </nav>
  );
}
