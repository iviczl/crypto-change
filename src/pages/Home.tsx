import { MutableRefObject, useEffect, useRef, useState } from "react";
import ChangeForm from "../components/ChangeForm";
import NewChange from "../components/NewChange";
import type { Currency } from "../types/currency";
import ITab from "../types/tab";
import type { AppStoreState } from "../store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useTypeSelector";
import { removeUserCurrency } from "../userSlice";

const allCurrencies: Currency[] = [
  { name: "A curr", code: "A" },
  { name: "B curr", code: "B" },
  { name: "C curr", code: "C" },
];

function Home() {
  const user = useSelector((state: AppStoreState) => state.user.user);
  const dispatch = useAppDispatch();
  const currentTabStates = () => {
    const tabs = [] as ITab[];
    let i = 0;
    if (user) {
      for (let c of user.activeCurrencies) {
        tabs.push({
          id: c.code,
          tabIndex: i,
          active: i === 0,
          title: c.name,
          currency: { name: c.name, code: c.code },
        });
        i++;
      }
    }
    tabs.push({
      id: "+",
      tabIndex: i + 1,
      active: i === 0,
      title: "+",
      currency: undefined,
    });
    return tabs;
  };

  useEffect(() => {
    const newState = currentTabStates();
    setActiveTabId(newState[0].id);
    setTabStates(newState);
  }, [user, user?.activeCurrencies]);

  const setActiveTab = (id: string) => {
    const newState = [...tabStates];
    newState.forEach((v) => {
      v.active = v.id === id;
    });
    setActiveTabId(id);
    setTabStates(newState);
  };
  const deleteTab = async (id: string) => {
    const currency = allCurrencies.find((c) => c.code === id);
    if (!currency) {
      return;
    }
    console.log("before dispatching delete " + currency.code);
    await dispatch(removeUserCurrency(currency.code));
    const newState = tabStates.filter((s) => s.id !== id);
    newState[0].active = true;
    setActiveTabId(newState[0].id);
    setTabStates(newState);
  };
  const usd: Currency = { name: "US Dollar", code: "USD" };
  const deleteDialog: MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const [tabStates, setTabStates] = useState(currentTabStates());

  const [activeTabId, setActiveTabId] = useState(tabStates[0].id);

  const availableCurrencies = () => {
    return allCurrencies.filter(
      (c) => !tabStates.some((t) => t.currency?.code === c.code)
    );
  };

  const tabContent = (tab: ITab) => {
    if (tab.id === "+") {
      return <NewChange currencies={availableCurrencies()} />;
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
            onClick={async () => {
              console.log("deletable tab:" + activeTabId);
              await deleteTab(activeTabId);
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
      <div className="tab-content h-100 p-2" id="myTabContent">
        {tabStates.map((tab) => {
          return (
            <div
              className={
                "tab-pane fade d-flex flex-column flex-fill" +
                (tab.active ? " show active" : "")
              }
              id="home-tab-pane"
              role="tabpanel"
              tabIndex={tab.tabIndex}
              key={tab.id}
            >
              {tabContent(tab)}
              {tab.id !== "+" ? (
                <button
                  className="btn btn-primary mt-4 me-auto ms-4"
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
