import React from "react";
import "./styles/companyName.css";
import { calculateDate } from "../utilities/calculateDate";
const CompanyName = ({ data, getCompany, selectedCompany }) => {
  if (!data || !selectedCompany)
    return (
      <aside className="company-lists">
        <div className="company-lists__box company-lists__box--no-data">
          <p>No data has found</p>
          <p>Add your first application form</p>
        </div>
      </aside>
    );
  const counting = {
    pending: 0,
    started: 0,
    passed: 0,
    rejected: 0,
  };
  for (let { status } of data) {
    counting[status] = counting[status] + 1;
  }

  return (
    <aside className="company-lists">
      <div className="company-lists__box">
        {data.map((item) => {
          const dateStr = calculateDate(item.id);
          return (
            <div
              className={`company company--${item.status} ${
                selectedCompany.id === item.id && "company--active"
              }`}
              key={item.id}
              onClick={() => getCompany(item)}
            >
              <div className="company__text">
                <p>{item.company}</p>
                <p>{dateStr}</p>
              </div>
              <div className="company__bg"></div>
            </div>
          );
        })}
      </div>
      <div className="company-total">
        <p className="company--pending">
          <span>Pending</span> {counting.pending}
        </p>
        <p className="company--started">
          <span>Started</span> {counting.started}
        </p>
        <p className="company--passed">
          <span>Passed</span> {counting.passed}
        </p>
        <p className="company--rejected">
          <span>Rejected</span> {counting.rejected}
        </p>
        <p>
          <span>Total Applied</span>{" "}
          {counting.pending +
            counting.started +
            counting.passed +
            counting.rejected}
        </p>
      </div>
    </aside>
  );
};

export default CompanyName;
