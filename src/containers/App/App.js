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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import MatchAstrology from '../MatchAstrology/MatchAstrology';
import Terms from '../Pages/Terms';
import Privacy from '../Pages/Privacy';
import Disclaimer from '../Pages/Disclaimer';
import FPSendLink from '../ForgetPassword/FPSendLink';
import ResetPassword from '../ForgetPassword/ResetPassword';
import ContactUs from '../ContactUs/ContactUs';
import FAQs from '../FAQs/FAQs';
import AboutUs from '../Pages/AboutUs';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path="/" element={<HomePage/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/player-stats/:id" element={<PlayerStats/>} />
              <Route path="/match-astrology/:id" element={<MatchAstrology/>} />
              <Route path="/player-profile/:id" element={<PlayerProfile/>} />
              <Route path="/live-score-board/:id" element={<LiveScoreBoard/>} />
            </Route>
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/terms" element={<Terms/>} />
            <Route path="/privacy" element={<Privacy/>} />
            <Route path="/disclaimer" element={<Disclaimer/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/faqs" element={<FAQs/>} />
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/forget-password' element={<FPSendLink/>}/>
            <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
