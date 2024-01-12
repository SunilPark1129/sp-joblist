import React, { useEffect, useRef, useState } from "react";
import "./styles/list.css";
import { calculateDate } from "../utilities/calculateDate";

/**
  {
    company: "",
    title: "",
    description: [],
    responsibilities: [],
    requirements: [],
    desired: [],
    salaries: "",
    benefit: [],
    link: "",
    status: "pending",
  },
  */

const ListItems = ({ data, getStatus, removeForm }) => {
  const ref = useRef(null);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [data?.id]);

  if (!data)
    return (
      <div className="list">
        <article className="card card--no-data">No Item has found</article>
      </div>
    );

  const {
    id,
    company,
    title,
    description,
    responsibilities,
    requirements,
    desired,
    salaries,
    benefit,
    link,
    status,
  } = data;

  function RemoveModal() {
    if (!hasOpened) return;

    function removeHandler() {
      removeForm(id);
      setHasOpened(false);
    }
    return (
      <>
        <section className="modal modal--paste">
          <div className="modal__container">
            <div className="modal__text">
              <h4>Warning</h4>
              <p>
                Are you sure you want to <span>delete</span> the current
                information? This action is <span>irreversible</span>.
              </p>
            </div>
            <div className="modal__button">
              <button onClick={removeHandler}>YES</button>
              <button onClick={() => setHasOpened(false)}>NO</button>
            </div>
          </div>
        </section>
        <div className="bg-cover" onClick={() => setHasOpened(false)}></div>
      </>
    );
  }

  function submitHandler() {
    setHasOpened(true);
  }

  const strDate = calculateDate(id);

  return (
    <div className="list" ref={ref}>
      <RemoveModal />
      <article className="card">
        <div className="card__button">
          <button className={`card__button__remove`} onClick={submitHandler}>
            Remove Article
          </button>
        </div>
        <div>
          <h3>
            <span>Company:</span> {company}
          </h3>
        </div>
        <div>
          <p className="card__time">{strDate}</p>
        </div>
        <div className="card__button">
          <p>
            <span>Update Status -</span>
          </p>
          <button
            className={`card__button__${status === "pending" && "active"}`}
            onClick={() => getStatus("pending", id)}
          >
            Pending
          </button>
          <button
            className={`card__button__${status === "started" && "active"}`}
            onClick={() => getStatus("started", id)}
          >
            Started
          </button>
          <button
            className={`card__button__${status === "passed" && "active"}`}
            onClick={() => getStatus("passed", id)}
          >
            Passed
          </button>
          <button
            className={`card__button__${status === "rejected" && "active"}`}
            onClick={() => getStatus("rejected", id)}
          >
            Rejected
          </button>
        </div>
        {title.trim().length !== 0 && (
          <p>
            <span>Title:</span> {title}
          </p>
        )}
        {description.length !== 0 && (
          <div>
            <p>
              <span>Description:</span>{" "}
            </p>
            <ul className="card__array card__array--description">
              {description.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>
        )}
        {responsibilities.length !== 0 && (
          <div>
            <p>
              <span>Responsibilities:</span>{" "}
            </p>
            <ul className="card__array">
              {responsibilities.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>
        )}
        {requirements.length !== 0 && (
          <div>
            <p>
              <span>Requirements:</span>{" "}
            </p>
            <ul className="card__array">
              {requirements.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>
        )}
        {desired.length !== 0 && (
          <div>
            <p>
              <span>Desired:</span>{" "}
            </p>
            <ul className="card__array">
              {desired.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>
        )}
        {salaries.trim().length !== 0 && (
          <div>
            <p>
              <span>Salaries:</span> {salaries}
            </p>
          </div>
        )}
        {benefit.length !== 0 && (
          <div>
            <p>
              <span>Benefits:</span>{" "}
            </p>
            <ul className="card__array card__array--benefit">
              {benefit.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>
        )}
        {link.trim().length !== 0 && (
          <div>
            <p className="card__link">
              <span>Link:</span>{" "}
              <a href={link} target="_blank">
                Go to the page
              </a>
            </p>
          </div>
        )}
        <div>
          <p className={`status status--${status}`}>{status}</p>
        </div>
      </article>
    </div>
  );
};

export default ListItems;
