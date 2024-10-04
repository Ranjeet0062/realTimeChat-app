/* eslint-disable react/react-in-jsx-scope */
// import { Button } from "./components/ui/button"
import { Route, Routes } from "react-router-dom"
import {LoginForm} from "./pages/signin.jsx"
import {Signup} from "./pages/signup.jsx"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <LoginForm/>}/>
        <Route path="/signup" element={ <Signup/>}/>
      </Routes>
    </>
  )
}

export default App
