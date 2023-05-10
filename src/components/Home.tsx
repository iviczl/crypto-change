import { MutableRefObject, useRef, useState } from "react";
import ChangeForm from "./ChangeForm";
import NewChange from "./NewChange";
import type { Currency } from "../types/currency";
import ITab from "../types/ITab";

function Home({ tabs }: { tabs: ITab[] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const setActiveTab = (id: string) => {
    const newState = [...tabStates];
    newState.forEach((v) => {
      v.active = v.id === id;
    });
    setActiveTabId(id);
    setTabStates(newState);
  };
  const deleteTab = (id: string) => {
    const newState = tabStates.filter((s) => s.id !== id);
    newState[0].active = true;
    setActiveTabId(newState[0].id);
    setTabStates(newState);
  };
  const usd: Currency = { name: "US Dollar", code: "USD" };
  const deleteDialog: MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const [tabStates, setTabStates] = useState([
    ...tabs,
    { id: "+", tabIndex: 0, active: false, title: "+", currency: undefined },
  ]);
  const tabContent = (tab: ITab) => {
    if (tab.id === "+") {
      return <NewChange />;
    } else {
      return (
        <ChangeForm
          sourceCurrency={usd}
          targetCurrency={tab.currency || { name: "", code: "" }}
          rate={11}
        />
      );
    }
  };
  return (
    <>
      {/* className="modal-dialog modal-dialog-centered" */}
      <dialog
        ref={deleteDialog}
        style={{
          padding: "1rem",
          border: "1px solid ",
          borderRadius: ".5rem",
          borderColor: "light-grey",
          // display: "flex",
          // flexDirection: "column",
          // rowGap: "1rem",
        }}
      >
        <div className="modal-header" style={{ gap: "1rem" }}>
          <h5 className="modal-title">Delete currency</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => deleteDialog.current?.close()}
          ></button>
        </div>
        <div className="modal-body">
          Do you really want to drop this currency?
        </div>
        <div
          className="modal-footer"
          style={{ gap: ".5rem", marginTop: "1rem" }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              deleteTab(activeTabId);
              deleteDialog.current?.close();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => deleteDialog.current?.close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tabStates.map((tab) => {
          return (
            <li className="nav-item" role="presentation" key={tab.id}>
              <button
                className={"nav-link " + (tab.active ? "active" : "")}
                id="home-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tab-content h-100" id="myTabContent">
        {tabStates.map((tab) => {
          return (
            <div
              className={
                "tab-pane fade h-100" + (tab.active ? " show active" : "")
              }
              id="home-tab-pane"
              role="tabpanel"
              tabIndex={tab.tabIndex}
              key={tab.id}
            >
              {tabContent(tab)}
              {tab.id !== "+" ? (
                <button
                  className="btn btn-primary mt-4 ms-4"
                  onClick={() => deleteDialog.current?.showModal()}
                >
                  Delete Currency
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
