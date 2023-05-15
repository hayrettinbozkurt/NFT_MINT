import React from 'react';
import ReactDOM from 'react-dom/client'; 
// import './index.css';
 
 
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
 
 import Login from './components/login';
 
 import NFTPage from './components/NFTpage';
 

  
 
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        
       
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/mintNFT" element={<NFTPage />}/> 
                </Routes>
            </BrowserRouter>
        
         
    </React.StrictMode>
);