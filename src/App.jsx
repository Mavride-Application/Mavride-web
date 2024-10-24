import PhoneOtp from "./components/PhoneOtp"
import Onboarding from "./pages/Onboarding"
import ChooseProfilePhoto from "./pages/ChooseProfilePicture"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import EnterPhoneNumber from "./components/EnterPhoneNumber";
import PersonalInfoSteps from './pages/PersonalInfoSteps'
import PhoneVerificationSteps from "./pages/PhoneVerificationSteps";



// import ChooseProfilePicture from "./pages/ChooseProfilePicture";
// import PersonalInfo from "./pages/PersonalInfo";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Onboarding/>} />
            <Route path="signup" element={<PhoneVerificationSteps/>} />
            {/* <Route path="phoneotp" element={<PhoneOtp/>} /> */}
            <Route path="choosephoto" element={<ChooseProfilePhoto/>} />
            <Route path="personalInfo" element={<PersonalInfoSteps/>} />
            
          </Routes>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;