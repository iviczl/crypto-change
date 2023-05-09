import { MutableRefObject, useRef, useState } from "react";
import ChangeForm from "./ChangeForm";
import NewChange from "./NewChange";
import type { Currency } from "../types/currency";
import ITab from "../types/ITab";

function Home({ tabs }: { tabs: ITab[] }) {
  const [activeTabId, setActiveTabId] = useState("0");
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
      return <ChangeForm sourceCurrency={usd} targetCurrency={tab.currency} />;
    }
  };
  return (
    <>
      {/* className="modal-dialog modal-dialog-centered" */}
      <dialog ref={deleteDialog}>
        <h4>Do you really want to drop this currency?</h4>
        <form>
          <button
            type="submit"
            formMethod="dialog"
            onClick={() => {
              deleteTab(activeTabId);
              deleteDialog.current?.close();
            }}
          >
            Yes
          </button>
        </form>
        <button
          type="submit"
          formMethod="dialog"
          onClick={() => deleteDialog.current?.close()}
        >
          Cancel
        </button>
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
      <div className="tab-content" id="myTabContent">
        {tabStates.map((tab) => {
          return (
            <div
              className={"tab-pane fade " + (tab.active ? " show active" : "")}
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex={tab.tabIndex}
              key={tab.id}
            >
              {tabContent(tab)}
              {tab.id !== "+" ? (
                <button onClick={() => deleteDialog.current?.showModal()}>
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
