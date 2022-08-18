
import './App.css';
import {Ads} from "./components/ads"
import React,{useState,useEffect} from "react"
function App() {
  const [value,setValue]=useState("")
  const [ads,setAds]=useState([])
  const handler= (e)=>{
    //console.log(e)
    setValue(e.target.value)
    
    
  }
  useEffect(()=>{
    //console.log(value)
    const apiCall=async()=>{
      if(value==="")return
      //console.log("api called")
      const data=await fetch(`http://127.0.0.1:8000/${value}`)
      const result=await data.json()
      //console.log(result)
      setAds(result.data)
      
    }
    apiCall();
  },[value])
  useEffect(()=>{
    //console.log(ads)
  },[ads])
  
  
  
  return (

    <div className="App">
     <input onChange={handler} value={value} placeholder="search(Case sensitive)" autoFocus/>
     <div className='ads'>
      {
        
          ads.map((ads)=><Ads key={ads.id} ads={ads}></Ads>)
         
      }
     </div>
    </div>
  );
}

export default App;
