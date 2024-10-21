import PhoneOtp from "./pages/PhoneOtp"
import Onboarding from "./pages/Onboarding"
import ChooseProfilePhoto from "./pages/ChooseProfilePicture"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import EnterPhoneNumber from "./pages/EnterPhoneNumber";
import PersonalInfoSteps from './pages/PersonalInfoSteps'



// import ChooseProfilePicture from "./pages/ChooseProfilePicture";
// import PersonalInfo from "./pages/PersonalInfo";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Onboarding/>} />
            <Route path="Phonenumber" element={<EnterPhoneNumber/>} />
            <Route path="phoneotp" element={<PhoneOtp/>} />
            <Route path="choosephoto" element={<ChooseProfilePhoto/>} />
            <Route path="personalInfo" element={<PersonalInfoSteps/>} />
          </Routes>
        </ScrollToTop>
      </Router>
      {/*  */}
      {/* <ChooseProfilePicture /> */}
      {/* <PersonalInfoSteps /> */}
      {/* <PhoneOtp/> */}
      {/*  */}
    </div>
  );
}

export default App;