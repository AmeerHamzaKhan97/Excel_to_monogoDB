import React from 'react'
import FontAwesome from "react-fontawesome";

function Result() {
    return (
      <div className="top-class">
        <h4>Thank you!</h4>

        <div className="result_sucess">
          <FontAwesome
            className="fas fa-check"
            name="check"
            size="1x"
            // spin
            style={{ color: "green" }}
          />
          <p>Flie Successfully Uploaded</p>
        </div>
        <p>You records will be processed shortly</p>
      </div>
    );
}

export default Result
