
 
 
 
import Marketplace from './components/login';
import MyPage from './components/mypage';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<MyPage />}/>
          <Route path="/nftPage" element={<NFTPage />}/>        
                    
        </Routes>
    </div>
  );
}

export default App;