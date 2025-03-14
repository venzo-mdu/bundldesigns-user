import React,{useEffect} from "react";
import AppRouter from "./Approutes";
function App() {
  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  },[])
  
  return (
   <AppRouter/>
  );
}

export default App;
