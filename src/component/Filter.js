import React from "react";
import "./styles/filter.css";

const Filter = ({ filterData, setFilterData }) => {
  if (!filterData) return;
  function checkboxChangeHandler(e) {
    const { id } = e.target;
    setFilterData((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function inputChangeHandler(e) {
    const { value } = e.target;
    setFilterData((prev) => ({ ...prev, search: value }));
  }

  return (
    <section className="filter">
      <h2>Filter</h2>
      <div className="filter__status">
        <label
          className={`${
            filterData.pending ? "filter__status__pending" : "not-selected"
          }`}
        >
          Pending
          <input
            type="checkbox"
            onChange={checkboxChangeHandler}
            id="pending"
            checked={filterData.pending}
          />
        </label>
        <label
          className={`${
            filterData.started ? "filter__status__started" : "not-selected"
          }`}
        >
          Started
          <input
            type="checkbox"
            onChange={checkboxChangeHandler}
            id="started"
            checked={filterData.started}
          />
        </label>
        <label
          className={`${
            filterData.passed ? "filter__status__passed" : "not-selected"
          }`}
        >
          Passed
          <input
            type="checkbox"
            onChange={checkboxChangeHandler}
            id="passed"
            checked={filterData.passed}
          />
        </label>
        <label
          className={`${
            filterData.rejected ? "filter__status__rejected" : "not-selected"
          }`}
        >
          Rejected
          <input
            type="checkbox"
            onChange={checkboxChangeHandler}
            id="rejected"
            checked={filterData.rejected}
          />
        </label>
      </div>
      <div className="filter__search">
        <input
          type="text"
          placeholder="company name"
          value={filterData.search}
          autoComplete="off"
          onChange={inputChangeHandler}
        />
      </div>
    </section>
  );
};

export default Filter;
