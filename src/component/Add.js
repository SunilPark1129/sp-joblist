import React, { useEffect, useRef, useState } from "react";
import "./styles/add.css";

const initValue = {
  description: [],
  responsibilities: [],
  requirements: [],
  desired: [],
  benefit: [],
};

const Add = ({ renderForm }) => {
  const [hasOpened, setOpened] = useState(false);
  const descriptionRef = useRef(null);
  const responsibilitiesRef = useRef(null);
  const requirementsRef = useRef(null);
  const desiredRef = useRef(null);
  const benefitRef = useRef(null);

  const [arr, setArr] = useState(initValue);

  function submitHandler(e) {
    e.preventDefault();
    const { company, title, salaries, date, link } = e.target;

    if (company.value.length === 0) return;

    const payload = {
      id: Date.now(),
      company: company.value,
      title: title.value,
      description: arr.description,
      responsibilities: arr.responsibilities,
      requirements: arr.requirements,
      desired: arr.desired,
      benefit: arr.benefit,
      salaries: salaries.value,
      date: date.value,
      link: link.value,
      status: "pending",
    };

    const data = JSON.parse(localStorage.getItem("job-list"));
    data.result.push(payload);
    localStorage.setItem("job-list", JSON.stringify(data));
    renderForm();
    setOpened(false);
  }

  function addHandler(category, val) {
    if (val.trim().length === 0) return;
    setArr((prev) => ({ ...prev, [category]: [...prev[category], val] }));
  }

  function removeHandler(category, idx) {
    setArr((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== idx),
    }));
  }

  useEffect(() => {
    return () => {
      setArr(initValue);
    };
  }, [hasOpened]);

  function AddModal() {
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
              <form onSubmit={submitHandler}>
                <label>
                  Company: <input type="text" id="company" autoComplete="off" />
                </label>
                <label>
                  Title: <input type="text" id="title" autoComplete="off" />
                </label>
                <div>
                  <label htmlFor="description">Description:</label>
                  <div className="modal__group">
                    <input
                      type="text"
                      id="description"
                      autoComplete="off"
                      ref={descriptionRef}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addHandler("description", descriptionRef.current.value)
                      }
                    >
                      +
                    </button>
                  </div>
                  {arr.description.length !== 0 && (
                    <div className="modal__list-preview">
                      {arr.description.map((item, idx) => (
                        <div className="modal__list-preview__item" key={idx}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() => removeHandler("description", idx)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="responsibilities">Responsibilities:</label>
                  <div className="modal__group">
                    <input
                      type="text"
                      id="responsibilities"
                      autoComplete="off"
                      ref={responsibilitiesRef}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addHandler(
                          "responsibilities",
                          responsibilitiesRef.current.value
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {arr.responsibilities.length !== 0 && (
                    <div className="modal__list-preview">
                      {arr.responsibilities.map((item, idx) => (
                        <div className="modal__list-preview__item" key={idx}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() =>
                              removeHandler("responsibilities", idx)
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="requirements">requirements:</label>
                  <div className="modal__group">
                    <input
                      type="text"
                      id="requirements"
                      autoComplete="off"
                      ref={requirementsRef}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addHandler(
                          "requirements",
                          requirementsRef.current.value
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {arr.requirements.length !== 0 && (
                    <div className="modal__list-preview">
                      {arr.requirements.map((item, idx) => (
                        <div className="modal__list-preview__item" key={idx}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() => removeHandler("requirements", idx)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="desired">Desired:</label>
                  <div className="modal__group">
                    <input
                      type="text"
                      id="desired"
                      ref={desiredRef}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addHandler("desired", desiredRef.current.value)
                      }
                    >
                      +
                    </button>
                  </div>
                  {arr.desired.length !== 0 && (
                    <div className="modal__list-preview">
                      {arr.desired.map((item, idx) => (
                        <div className="modal__list-preview__item" key={idx}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() => removeHandler("desired", idx)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="benefit">Benefit:</label>
                  <div className="modal__group">
                    <input
                      type="text"
                      id="benefit"
                      ref={benefitRef}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addHandler("benefit", benefitRef.current.value)
                      }
                    >
                      +
                    </button>
                  </div>
                  {arr.benefit.length !== 0 && (
                    <div className="modal__list-preview">
                      {arr.benefit.map((item, idx) => (
                        <div className="modal__list-preview__item" key={idx}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() => removeHandler("benefit", idx)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <label>
                  Salaries:{" "}
                  <input type="text" id="salaries" autoComplete="off" />
                </label>
                <label>
                  Date: <input type="text" id="date" autoComplete="off" />
                </label>
                <label>
                  Link: <input type="text" id="link" autoComplete="off" />
                </label>
                <button className="modal__submit" type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </section>
          <div className="bg-cover" onClick={() => setOpened(false)}></div>
        </>
      );
  }
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
      <AddModal />
    </div>
  );
};

export default Add;
