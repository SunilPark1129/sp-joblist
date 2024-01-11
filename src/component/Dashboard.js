import React, { useEffect, useState } from "react";
import ListItems from "./ListItems";
import CompanyName from "./CompanyName";
import "./styles/dashboard.css";

const Dashboard = ({ updatedForm, filterData }) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  function getStatus(status, id) {
    const temp = data.result.map((item) => {
      if (item.id === id) {
        return { ...item, status: status };
      } else {
        return item;
      }
    });
    localStorage.setItem("job-list", JSON.stringify({ result: temp }));
    setData({ result: temp });
  }

  function getCompany(item) {
    setSelectedCompany(item);
  }

  function removeForm(id) {
    const temp = data.result.filter((item) => item.id !== id);
    localStorage.setItem("job-list", JSON.stringify({ result: temp }));
    setData({ result: temp });
    setSelectedCompany(temp[0]);
  }

  useEffect(() => {
    if (data) {
      const reg = new RegExp(`${filterData.search}`, "igm");

      try {
        const temp = data.result.filter(({ status, company }) => {
          if (
            ((filterData.pending && status === "pending") ||
              (filterData.passed && status === "passed") ||
              (filterData.rejected && status === "rejected") ||
              (filterData.started && status === "started")) &&
            company.match(reg)
          ) {
            return true;
          }
        });
        setFilteredData(temp);
        setSelectedCompany(temp[0]);
      } catch (err) {
        localStorage.removeItem("job-list");
        console.log(err);
      }
    }
  }, [data, filterData]);

  useEffect(() => {
    if (localStorage.getItem("job-list")) {
      setData(JSON.parse(localStorage.getItem("job-list")));
    }
  }, [updatedForm]);

  return (
    <div className="dashboard">
      <ListItems
        data={selectedCompany}
        getStatus={getStatus}
        removeForm={removeForm}
      />
      <CompanyName
        data={filteredData}
        selectedCompany={selectedCompany}
        getCompany={getCompany}
      />
    </div>
  );
};

export default Dashboard;
