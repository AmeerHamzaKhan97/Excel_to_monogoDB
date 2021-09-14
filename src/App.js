
import './App.css';
import FontAwesome from "react-fontawesome";
import { useState } from 'react';







function App() {

  const [file, setFile] = useState(null)
  const [name,setName] = useState('')

  function checkFile(e) {
    setFile(e.target.files[0]);
    setName(e.target.files[0].name)
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name)
  }

  function sendFile(){
    let formData = new FormData()
    formData.append(
      "file",
      file,
      
    );
    console.log(formData)
    // const extension = name.split('.').pop();
    // console.log(extension)
    // if(extension!=='jpeg'){
    //   console.log("oops,ivalid data type")
    // }else{
    //   console.log('readdy')
      fetch("http://localhost:8000",{
        method:"POST",
       
        body:formData
      })
      .then(res=>{
        console.log(res.statusText)
      })
    // }
  
  }

  return (
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
      <div>
        <input type='file' name="file"   onChange={checkFile} />
          
        
        <button type="button" onClick={sendFile}>submit</button>
      </div>
    </div>
  );
}

export default App;
