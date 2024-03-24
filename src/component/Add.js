import React, { useEffect, useRef, useState } from "react";
import "./styles/add.css";

const arrInitVal = {
  description: [],
  responsibilities: [],
  requirements: [],
  desired: [],
  benefit: [],
};

const strInitVal = {
  company: "",
  title: "",
  salaries: "",
  link: "",
  location: "",
};

function AddBox({ arr, setArr, propertyKey }) {
  const ref = useRef(null);

  // push string into array
  function addHandler() {
    const { value } = ref.current;
    if (value.trim().length === 0) return;
    setArr((prev) => ({
      ...prev,
      [propertyKey]: [...prev[propertyKey], value],
    }));
    ref.current.value = "";
    ref.current.focus();
  }

  function keyDownHandler(e) {
    const { key } = e;
    if (key === "Enter") {
      addHandler();
    }
  }

  function removeHandler(idx) {
    setArr((prev) => ({
      ...prev,
      [propertyKey]: prev[propertyKey].filter((_, i) => i !== idx),
    }));
  }

  return (
    <div>
      <label htmlFor={propertyKey}>
        {propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1)}:
      </label>
      <div className="modal__group">
        <input
          type="text"
          id={propertyKey}
          autoComplete="off"
          ref={ref}
          onKeyDown={keyDownHandler}
        />
        <button type="button" onClick={addHandler}>
          +
        </button>
      </div>
      {arr[propertyKey].length !== 0 && (
        <div className="modal__list-preview">
          {arr[propertyKey].map((item, idx) => (
            <div className="modal__list-preview__item" key={idx}>
              <p>{item}</p>
              <button type="button" onClick={() => removeHandler(idx)}>
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddModal({ setOpened, hasOpened, renderForm }) {
  const [arr, setArr] = useState(arrInitVal);
  const [str, setStr] = useState(strInitVal);

  function submitKeyDownHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (str.company.length === 0) return;

    const payload = {
      id: Date.now(),
      company: str.company,
      title: str.title,
      description: arr.description,
      responsibilities: arr.responsibilities,
      requirements: arr.requirements,
      desired: arr.desired,
      benefit: arr.benefit,
      salaries: str.salaries,
      link: str.link,
      location: str.location,
      status: "pending",
    };

    const data = JSON.parse(localStorage.getItem("job-list"));
    data.result.push(payload);
    localStorage.setItem("job-list", JSON.stringify(data));
    renderForm();
    setOpened(false);
  }

  // update string values
  function stringChangeHandler(e) {
    const { id, value } = e.target;

    setStr((prev) => ({ ...prev, [id]: value }));
  }

  // cleanup phase
  useEffect(() => {
    return () => {
      setArr(arrInitVal);
      setStr(strInitVal);
    };
  }, [hasOpened]);

  if (hasOpened)
    return (
      <>
        <section className={`modal`}>
          <div className="modal__container">
            <button
              className="plus-svg plus-svg--exit mg-left"
              onClick={() => setOpened(false)}
              title="closing the form"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="6" width="6" height="18" rx="1" fill="#1E1E1E" />
                <rect
                  x="18"
                  y="6"
                  width="6"
                  height="18"
                  rx="1"
                  transform="rotate(90 18 6)"
                  fill="#1E1E1E"
                />
              </svg>
            </button>
            <h2>Application Form</h2>
            <form onSubmit={submitHandler} onKeyDown={submitKeyDownHandler}>
              <label>
                Company:{" "}
                <input
                  type="text"
                  id="company"
                  onChange={stringChangeHandler}
                  autoComplete="off"
                />
              </label>
              <label>
                Title:{" "}
                <input
                  type="text"
                  id="title"
                  onChange={stringChangeHandler}
                  autoComplete="off"
                />
              </label>
              <label>
                Location:{" "}
                <input
                  type="text"
                  id="location"
                  onChange={stringChangeHandler}
                  autoComplete="off"
                />
              </label>

              {/* adding array field */}
              <AddBox
                arr={arr}
                setArr={(obj) => setArr(obj)}
                propertyKey={"description"}
              />
              <AddBox
                arr={arr}
                setArr={(obj) => setArr(obj)}
                propertyKey={"responsibilities"}
              />
              <AddBox
                arr={arr}
                setArr={(obj) => setArr(obj)}
                propertyKey={"requirements"}
              />
              <AddBox
                arr={arr}
                setArr={(obj) => setArr(obj)}
                propertyKey={"desired"}
              />
              <AddBox
                arr={arr}
                setArr={(obj) => setArr(obj)}
                propertyKey={"benefit"}
              />

              <label>
                Salaries:{" "}
                <input
                  type="text"
                  id="salaries"
                  onChange={stringChangeHandler}
                  autoComplete="off"
                />
              </label>
              <label>
                Link:{" "}
                <input
                  type="text"
                  id="link"
                  onChange={stringChangeHandler}
                  autoComplete="off"
                />
              </label>
              <button className="modal__submit" type="submit">
                SUBMIT
              </button>
            </form>
          </div>
        </section>
        <div className="bg-cover"></div>
      </>
    );
}

const Add = ({ renderForm }) => {
  const [hasOpened, setOpened] = useState(false);

  return (
    <div className="add">
      <button
        className="plus-svg"
        onClick={() => setOpened(true)}
        title="adding new form"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" width="6" height="18" rx="1" fill="#1E1E1E" />
          <rect
            x="18"
            y="6"
            width="6"
            height="18"
            rx="1"
            transform="rotate(90 18 6)"
            fill="#1E1E1E"
          />
        </svg>
      </button>
      <AddModal
        setOpened={(bool) => setOpened(bool)}
        hasOpened={hasOpened}
        renderForm={renderForm}
      />
    </div>
  );
};

export default Add;
