import { useState } from "react";
import Currency from "./Currency";
import NewCurrency from "./NewCurrency";
interface ITab {
  id: string;
  tabIndex: number;
  active: boolean;
  title: string;
}

function Home({ tabs }: { tabs: ITab[] }) {
  const setActiveTab = (id: string) => {
    const newState = [...tabStates];
    newState.forEach((v) => {
      v.active = v.id === id;
    });
    setTabStates(newState);
  };
  const [tabStates, setTabStates] = useState([
    ...tabs,
    { id: "+", tabIndex: 0, active: false, title: "+" },
  ]);
  const tabContent = (tab: ITab) => {
    if (tab.id === "+") {
      return <NewCurrency />;
    } else {
      return <Currency />;
    }
  };
  return (
    <>
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
