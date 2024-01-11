import React, { useRef, useState } from "react";
import "./styles/copydata.css";
const CopyData = ({ renderForm }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const ref = useRef(null);

  function copyClickHandler() {
    if (localStorage.getItem("job-list")) {
      const json = localStorage.getItem("job-list");
      navigator.clipboard.writeText(json);
    }
  }

  function pasteClickHandler() {
    setHasOpened(true);
  }

  function submitHandler() {
    if (ref.current.value.trim().length === 0) {
      setHasOpened(false);
      return;
    }
    try {
      const temp = JSON.parse(ref.current.value);
      localStorage.setItem("job-list", JSON.stringify(temp));
      renderForm();
      setHasOpened(false);
    } catch (err) {
      console.log(err);
    }
  }

  function PasteModal() {
    if (!hasOpened) return;
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
              <button onClick={() => setHasOpened(false)}>Cancel</button>
            </div>
          </div>
        </section>
        <div className="bg-cover" onClick={() => setHasOpened(false)}></div>
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
      <PasteModal />
    </div>
  );
};

export default CopyData;
