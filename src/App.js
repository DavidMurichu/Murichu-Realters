import { useContext } from "react"
import "./App.css"
import Pages from "./components/pages/Pages"
import { LoadingContext, useLoading } from "./components/appService/Loading"
import LoadingSpinner from "./components/Loader";



function App() {
 

      // const {loading}=useLoading();
    // if(loading){
    //   return(
    //     <LoadingSpinner/>
    //   )
    // }
  return <Pages />
}

export default App
