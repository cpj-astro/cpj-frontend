import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../authFiles/PrivateRoutes';
import HomePage from '../HomePage/HomePage';
import HomePageV2 from '../HomePage/HomePageV2';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import PlayerStats from '../PlayerStats/PlayerStats';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import LiveScoreBoard from '../LiveScoreBoard/LiveScoreBoard';
import { ToastContainer } from 'react-toastify';
import Terms from '../Pages/Terms';
import Privacy from '../Pages/Privacy';
import Disclaimer from '../Pages/Disclaimer';
import FPSendLink from '../ForgetPassword/FPSendLink';
import ResetPassword from '../ForgetPassword/ResetPassword';
import ContactUs from '../ContactUs/ContactUs';
import FAQs from '../FAQs/FAQs';
import AboutUs from '../Pages/AboutUs';
import Feedback from '../Feedback';
import NewsDetails from '../NewsDetails/NewsDetails';
import PhonePeStatus from '../../components/PhonePeStatus';
import MatchReports from '../MatchReports/MatchReports';
import 'react-toastify/dist/ReactToastify.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import LiveMatches from '../LiveMatches/LiveMatches';
import LiveLineV2 from '../LiveLineV2/LiveLineV2';
import UpcomingMatches from '../UpcomingMatches/UpcomingMatches';
import FinishedMatches from '../FinishedMatches/FinishedMatches';
import News from '../News/News';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            {/* Use PrivateRoute to protect these routes */}
            <Route
              path="/profile"
              element={<PrivateRoute><Profile /></PrivateRoute>}
            />
            <Route
              path="/player-stats/:id"
              element={<PrivateRoute><PlayerStats /></PrivateRoute>}
            />
            <Route
              path="/match-reports/:id"
              element={<PrivateRoute><MatchReports /></PrivateRoute>}
            />
            <Route
              path="/player-profile/:id"
              element={<PrivateRoute><PlayerProfile /></PrivateRoute>}
            />
            <Route
              path="/payment-status/:tid"
              element={<PhonePeStatus />}
            />

            {/* Other Routes */}
            <Route path="/" element={<HomePageV2 />} />
            <Route path="/live" element={<LiveMatches />} />
            <Route path="/upcoming" element={<UpcomingMatches />} />
            <Route path="/finished" element={<FinishedMatches />} />
            <Route path="/news" element={<News />} />
            <Route path="/news-details/:id/:title/:pub_date" element={<NewsDetails />} />
            <Route path="/live-score-board/:id" element={<LiveLineV2 />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forget-password" element={<FPSendLink />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
