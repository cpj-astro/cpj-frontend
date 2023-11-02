import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import React, {Fragment} from 'react';
import PrivateRoute from '../../authFiles/PrivateRoutes';
import HomePage from '../HomePage/HomePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import PlayerStats from '../PlayerStats/PlayerStats';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import LiveScoreBoard from '../LiveScoreBoard/LiveScoreBoard';
import BuyMatchAstrology from '../BuyMatchAstrology/BuyMatchAstrology';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path="/" element={<HomePage/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/player-stats" element={<PlayerStats/>} />
              <Route path="/buy-match-astrology/:id" element={<BuyMatchAstrology/>} />
              <Route path="/player-profile/:id" element={<PlayerProfile/>} />
              <Route path="/live-score-board/:id" element={<LiveScoreBoard/>} />
            </Route>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
