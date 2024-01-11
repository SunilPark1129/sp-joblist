import { useState } from "react";
import "./App.css";
import Add from "./component/Add";
import Dashboard from "./component/Dashboard";
import Filter from "./component/Filter";
import CopyData from "./component/CopyData";

function App() {
  const initValue = {
    pending: true,
    started: true,
    passed: true,
    rejected: true,
    search: "",
  };
  const [updatedForm, setUpdatedForm] = useState(false);
  const [filterData, setFilterData] = useState(initValue);

  function renderForm() {
    setUpdatedForm((prev) => !prev);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Filter
          filterData={filterData}
          setFilterData={(obj) => setFilterData(obj)}
        />
        <Dashboard updatedForm={updatedForm} filterData={filterData} />
        <Add renderForm={renderForm} />
        <CopyData renderForm={renderForm} />
      </div>
    </div>
  );
}

export default App;
