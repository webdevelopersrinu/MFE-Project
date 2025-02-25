import React, { useState } from 'react'
import Login from './components/Login.jsx'

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  function callBack(mag) {
    console.log(mag)
  }
  return (
    <div>
      <Login formData={formData} setFormData={setFormData} callBack={callBack} />
    </div>
  )
}

export default App