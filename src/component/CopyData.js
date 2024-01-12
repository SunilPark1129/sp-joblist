import React, { useRef, useState } from "react";
import "./styles/copydata.css";
const CopyData = ({ renderForm }) => {
  const [hasPasteModalOpened, setHasPasteModalOpened] = useState(false);
  const [hasClearModalOpened, setClearModalOpened] = useState(false);
  const ref = useRef(null);

  function copyClickHandler() {
    if (localStorage.getItem("job-list")) {
      const json = localStorage.getItem("job-list");
      navigator.clipboard.writeText(json);
    }
  }

  function pasteClickHandler() {
    setHasPasteModalOpened(true);
  }

  function PasteModal() {
    if (!hasPasteModalOpened) return;
    function submitHandler() {
      if (ref.current.value.trim().length === 0) {
        setHasPasteModalOpened(false);
        return;
      }
      try {
        const temp = JSON.parse(ref.current.value);
        localStorage.setItem("job-list", JSON.stringify(temp));
        renderForm();
        setHasPasteModalOpened(false);
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <>
        <section className="modal modal--paste">
          <div className="modal__container">
            <div className="modal__text">
              <h4>Warning</h4>
              <p>
                If you enter JSON code, the existing records will{" "}
                <span>disappear</span>, and the information you are currently
                entering will be <span>updated</span>.
              </p>
            </div>
            <textarea type="text" placeholder="json code here..." ref={ref} />
            <div className="modal__button">
              <button onClick={submitHandler}>Submit</button>
              <button onClick={() => setHasPasteModalOpened(false)}>
                Cancel
              </button>
            </div>
          </div>
        </section>
        <div
          className="bg-cover"
          onClick={() => setHasPasteModalOpened(false)}
        ></div>
      </>
    );
  }

  function clearClickHandler() {
    setClearModalOpened(true);
  }

  function ClearModal() {
    if (!hasClearModalOpened) return;
    function submitHandler() {
      localStorage.removeItem("job-list");
      renderForm();
      setClearModalOpened(false);
    }
    return (
      <>
        <section className="modal modal--paste">
          <div className="modal__container">
            <div className="modal__text">
              <h4>Warning</h4>
              <p>
                <span>Deletes</span> all cached files recorded on the device.
                This decision is <span>irreversible</span>, and all information
                will be lost.
              </p>
            </div>
            <div className="modal__button">
              <button className="modal__button__delete" onClick={submitHandler}>
                Delete
              </button>
              <button onClick={() => setClearModalOpened(false)}>Cancel</button>
            </div>
          </div>
        </section>
        <div
          className="bg-cover"
          onClick={() => setClearModalOpened(false)}
        ></div>
      </>
    );
  }

  return (
    <div className="copy-paste">
      <button className="copy-paste__btn" onClick={copyClickHandler}>
        COPY JSON
      </button>
      <button className="copy-paste__btn" onClick={pasteClickHandler}>
        PASTE JSON
      </button>
      <button className="copy-paste__btn" onClick={clearClickHandler}>
        CLEAR CACHE
      </button>
      <PasteModal />
      <ClearModal />
    </div>
  );
};

export default CopyData;
