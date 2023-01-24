import './App.css';
import Search2 from './components/Search2';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import  News from './components/News';
import {
  BrowserRouter as Router,
   Routes ,
   Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  const[progress,setProgress]=useState(10)



    return (
    <Router>
      <div>
        <Navbar/>
        <LoadingBar
        color='white'
        progress={progress}
      />
        <Search2/>
         <Routes>
          <Route exact  path="/general" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "general" country = "in" category = "general" headline = "Eagle Eye - Top Headlines"/>} />
          {/* <Route exact path = "/SearchContainer" element = { <SearchContainer/>} /> */}
          {/* <Route exact  path="/Business" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Business" country = "in" category = "business" headline = "Eagle Eye - Business Updates"/>}/> */}
          {/* <Route exact  path="/Entertainment" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Entertainment" country = "in" category = "entertainment" headline = "Eagle Eye - Entertainment Updates"/>}/> */}
          {/* <Route exact  path="/Health" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Health" country = "in" category = "health" headline = "Eagle Eye - Health Updates"/>}/> */}
          {/* <Route exact  path="/Science" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Science" country = "in" category = "science" headline = "Eagle Eye - Science Updates"/>}/> */}
          {/* <Route exact  path="/Sports" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Sports" country = "in" category = "sports" headline = "Eagle Eye - Sports Updates"/>}/> */}
          {/* <Route exact  path="/Technology" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Technology" country = "in" category = "technology" headline = "Eagle Eye - Technology Updates"/>} />     */}
          {/* <Route exact  path="/" element={< News   setProgress={setProgress}  apiKey={apiKey}  pageSize = {15} key = "Home" country = "in" />} />     */}
        </Routes>
      </div>
    </Router>
    )
  
}



export default App

