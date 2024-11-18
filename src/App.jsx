import PhoneOtp from "./components/PhoneOtp";
import Onboarding from "./pages/Onboarding";
import ChooseProfilePhoto from "./pages/ChooseProfilePicture";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import EnterPhoneNumber from "./components/EnterPhoneNumber";
import PersonalInfoSteps from "./pages/PersonalInfoSteps";
import PhoneVerificationSteps from "./pages/PhoneVerificationSteps";
import UserManagementLayout from "./layouts/UserManagementLayout";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";
import CreateProfile from "./pages/CreateProfile";

// import ChooseProfilePicture from "./pages/ChooseProfilePicture";
// import Personalinfo from "./pages/Personalinfo";
import SuccessPage from "./pages/Success";
import Registered from "./pages/Registered";
import DriverProfileEdit from "./pages/DriverProfileEdit";
import { AuthProvider } from "./components/OtpAuth/AuthProvider";
import ProtectedRoute from "./components/OtpAuth/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="signup" element={<PhoneVerificationSteps />} />
              <Route 
              path="choosephoto" 
              element={<ProtectedRoute>
                          <ChooseProfilePhoto />
                      </ProtectedRoute>} 
              />
              <Route path="personalInfo" element={<PersonalInfoSteps />} />
              <Route path="userManagement" element={<UserManagementLayout />}>
                <Route path="drivers/new-profile" element={<DriverProfile />} />
                <Route path="createprofile" element={<CreateProfile />} />
                <Route path="createprofile" element={<CreateProfile />} />
                <Route path="drivers" element={<Registered />} />
                <Route path="drivers/driver-profile" element={<DriverProfileEdit />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
