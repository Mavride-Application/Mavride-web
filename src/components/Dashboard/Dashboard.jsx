import React from "react";
import Today from "../../components/Today";
import ScheduledTrip from "../../components/ScheduledTrip";
import RegisteredDrivers from "../RegisteredDrivers";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-between gap-8 bg-gray-50 py-4 lg:flex-row">
      {/* Left Section */}
      <div className="flex flex-grow flex-col space-y-6">
        <Today />
        <ScheduledTrip />
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/4">
        <RegisteredDrivers />
      </div>
    </div>
  );
};

export default Dashboard;
