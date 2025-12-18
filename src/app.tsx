import MainFrame, { INavProps, IPaneProps } from "./layout";
import { NAV_NODES } from "./pages/index";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router";
import React, { Suspense } from "react";
import { deepTraverse } from "./commons";

function PaneLoader(paneProps: IPaneProps): JSX.Element {
  console.info("PaneLoader", paneProps);
  const { pane: Pane } = paneProps;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Pane />{" "}
    </Suspense>
  );
}

export default function App() {
  return (
    <div className="app w-full h-full gap-2">
      <BrowserRouter>
        <MainFrame navProps={{ rootNodes: NAV_NODES }}>
          <Routes>
            {deepTraverse(NAV_NODES).map((node, i) => {
              return (
                <Route
                  key={i}
                  path={node.paths.join("/")}
                  element={<PaneLoader {...node} />}
                ></Route>
              );
            })}
          </Routes>
        </MainFrame>
      </BrowserRouter>
    </div>
  );
}
