import _ from "lodash";
import React, { ReactNode, ExoticComponent } from "react";
import { NavLink } from "react-router-dom";
import { Compare, INode } from "./commons";

export interface IChildrenProps {
  children: ReactNode;
}

export function NavNode(props: IPaneProps): JSX.Element {
  const { level, value, children, paths, label } = props;
  if (_.isEmpty(children))
    return (
      <li>
        <NavLink to={paths.join("/")}>{label}</NavLink>
      </li>
    );

  return (
    <li>
      <details open={true} className="w-full">
        <summary>{label}</summary>
        <ol type="1" className="w-full list-decimal box-border ps-4 ">
          {children.map((child, i) => {
            return <NavNode key={i} {...child} />;
          })}
        </ol>
      </details>
    </li>
  );
}

/**
 * Toggles a smooth collapse effect by switching between max-h-0 (collapsed)
 * and a large max-height value (expanded).
 * @param elementId The ID of the HTML element to toggle (e.g., 'mobile-menu').
 */
function toggleSmoothCollapse(elementId: string): void {
  const element: HTMLElement = document.getElementById(elementId);
  const extendedClz: string[] = [
    "portrait:h-[10rem]",
    "portrait:overflow-auto",
  ]; // Use a value larger than your max content height
  const collapsedClz: string[] = [
    "portrait:h-[3rem]",
    "portrait:overflow-hidden",
  ];

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  // 1. Check the current state by looking for the collapsed class
  const isCollapsed: boolean = element.classList.contains(collapsedClz[0]);

  if (isCollapsed) {
    // 2. Expand: Remove max-h-0 and add the large max-height class
    element.classList.remove(...collapsedClz);
    element.classList.add(...extendedClz);

    // Optional: Update ARIA
    // const toggleButton = document.querySelector(
    //   `[aria-controls="${elementId}"]`
    // );
    // if (toggleButton) {
    //   toggleButton.setAttribute("aria-expanded", "true");
    // }
  } else {
    // 3. Collapse: Remove the large max-height class and add max-h-0
    element.classList.remove(...extendedClz);
    element.classList.add(...collapsedClz);

    // Optional: Update ARIA
    // const toggleButton = document.querySelector(
    //   `[aria-controls="${elementId}"]`
    // );
    // if (toggleButton) {
    //   toggleButton.setAttribute("aria-expanded", "false");
    // }
  }
}

export function NavBar({ rootNodes }: INavProps): JSX.Element {
  return (
    <nav
      className="navbar relative cf-collapose box-content portrait:h-[3rem]"
      id="menu_tree"
    >
      <div
        className=" bg-slate-200 
        landscape:rounded-lg absolute w-full
      inset-0 overflow-auto p-2 
      flex 
      landscape:flex-col portrait:flex-row portrait:item-start portrait:overflow-hidden portrait:min-h-[3rem]"
      >
        <h1
          className="text-center 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
          rounded-md portrait:hidden landscape:w-full        "
        >
          React-Study-Lab
        </h1>
        <h1
          className="text-center 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
         rounded-md landscape:hidden w-[2rem] h-[2rem]"
        >
          R
        </h1>
        <ol type="l" className="w-full list-decimal box-border ps-6 ">
          {!_.isEmpty(rootNodes) &&
            rootNodes.map((rootNode, i) => <NavNode key={i} {...rootNode} />)}
        </ol>
        <button
          className="landscape:hidden 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
           w-[2rem] h-[2rem] rounded-md"
          onClick={() => toggleSmoothCollapse("menu_tree")}
        >
          ...
        </button>
      </div>

      <div
        className="resizer 
                relative 
                bg-black 
                z-50
                left-0 top-2/4
                overflow-hidden"
      ></div>
    </nav>
  );
}

export function TopBar({ children }: IChildrenProps): JSX.Element {
  return (
    <header className="topbar bg-slate-100 landscape:rounded-lg p-1">
      topbar
    </header>
  );
}

export function MiscBar({ children }: IChildrenProps): JSX.Element {
  return (
    <aside className="miscbar landscape:rounded-lg bg-slate-200 p-2">
      miscbar
    </aside>
  );
}

export function MainPane({ children }: IChildrenProps): JSX.Element {
  return (
    <main className="main_pane landscape:rounded-lg bg-slate-50 p-2">
      {children}
    </main>
  );
}

export default function MainFrame({
  children,
  navProps,
}: IMainFrameProps): JSX.Element {
  return (
    <>
      <NavBar {...navProps} />
      <TopBar></TopBar>
      <MainPane>{children}</MainPane>
      <MiscBar></MiscBar>
    </>
  );
}

export interface IPaneProps extends INode<IPaneProps> {
  value: string;
  label: string;
  pane?: ExoticComponent;
  level: number;
  paths?: string[];
  children: IPaneProps[] | null;
}
export interface INavProps {
  rootNodes: IPaneProps[];
}
export interface IMainFrameProps extends IChildrenProps {
  navProps: INavProps;
}
