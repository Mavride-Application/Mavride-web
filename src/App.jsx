/** @type {import('tailwindcss').Config} */
import Signup from "../src/components/Signup"

import EnterPhoneNumber from "./pages/EnterPhoneNumber";
import PhoneOtp from "./pages/PhoneOtp";

// import ChooseProfilePicture from "./pages/ChooseProfilePicture";
// import PersonalInfo from "./pages/PersonalInfo";

function App() {
  return (
    <div>
      {/* <EnterPhoneNumber /> */}
      <PhoneOtp/>
    </div>
  );
}

export default App;