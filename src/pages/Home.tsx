import { useEffect, useState } from "react";
import ChangeForm from "../components/ChangeForm";
import NewChange from "../components/NewChange";
import type { Currency } from "../types/currency";
import ITab from "../types/tab";
import type { AppStoreState } from "../stores/store";
import { useSelector } from "react-redux";
import store from "../stores/store";
import SideBar from "../components/SideBar";

function Home() {
  const user = useSelector((state: AppStoreState) => state.user.user);
  const allCurrencies = store.getState().currency.currencies;
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
  // const deleteTab = async (id: string) => {
  //   const currency = allCurrencies.find((c) => c.code === id);
  //   if (!currency) {
  //     return;
  //   }
  //   console.log("before dispatching delete " + currency.code);
  //   await dispatch(removeUserCurrency(currency.code));
  //   const newState = tabStates.filter((s) => s.id !== id);
  //   newState[0].active = true;
  //   setActiveTabId(newState[0].id);
  //   setTabStates(newState);
  // };
  const usd: Currency = { name: "US Dollar", code: "USD" };
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
    <div className="d-flex">
      <SideBar />
      <div className="mx-4">
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
                  "tab-pane fade  flex-column flex-fill" +
                  (tab.active ? " d-flex show active" : "")
                }
                id="home-tab-pane"
                role="tabpanel"
                tabIndex={tab.tabIndex}
                key={tab.id}
              >
                {tabContent(tab)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
