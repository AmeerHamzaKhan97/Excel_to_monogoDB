import "./App.css";
import FontAwesome from "react-fontawesome";
import { useState } from "react";
import Result from "./Result";


function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [event, setEvent] = useState("normal");
  const [msg, setMsg] = useState(null);

  function fileHandler(e) {
    setFile(e.target.files[0]);
    setName(e.target.files[0].name);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    setMsg(null);
  }

  function sendFile() {
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const extension = name.split(".").pop();
    if (extension === "xlsx" || extension === "xls") {
      console.log("readdy");
      fetch("http://localhost:8000", {
        method: "POST",

        body: formData,
      }).then((res) => {
        if (res.ok) {
          setEvent("thanks");
        }
      });
    } else {
      setMsg("Oops! Invalid File Format");
    }
  }

  return (
    <>
      <div className="App">
        <nav>
          <h3>Add from Excel</h3>

          <FontAwesome
            className="fas fa-times"
            name="times"
            size="2x"
            // spin
            // style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
          />
        </nav>
        <h5>Add Candidate to Database</h5>
        {event === "normal" && (
          <div className="image-upload">
            <label for="file-input">
              <FontAwesome
                className="fas fa-arrow-circle-up"
                name="arrow-circle-up"
                size="3x"
              />
            </label>
            <input id="file-input" type="file" onChange={fileHandler} />
            {msg ? <p style={{ color: "red" }}>{msg}</p> : <p>{name}</p>}

            {name === "" ? <div>Upload a .xlsx or .xls file here</div> : null}
            <div>
              {name !== "" ? (
                <div>
                  <button type="button" onClick={sendFile}>
                    Submit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
        {event === "thanks" && <Result />}
      </div>
    </>
  );
}

export default App;
