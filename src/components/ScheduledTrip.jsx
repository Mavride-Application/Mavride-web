import React from "react";
import { scheduledTrips } from "../components/data/scheduledTrips";

const ScheduledTrip = () => {
  // Get the first 8 trips from the dummy data
  const tripsToDisplay = scheduledTrips.slice(0, 8);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.1rem] text-[#888889] font-semibold">Scheduled Trips</h2>
        <a
          href="/scheduled-trips"
          className="text-indigo-600 text-[0.825rem] font-medium"
        >
          View All
        </a>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[0.79rem] text-[#909090]">
            <th className="py-2">Trip ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Pick up Time</th>
            <th className="py-2">Pick up Location</th>
            <th className="py-2">Drop off Location</th>
          </tr>
        </thead>
        <tbody>
          {tripsToDisplay.map((trip, index) => (
            <tr
              key={trip.id}
              className={`text-[0.8rem] text-[#9499a8] ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-6 ">{trip.id}</td>
              <td className="py-6 ">{trip.name}</td>
              <td className="py-6 ">{trip.pickupTime}</td>
              <td className="py-6 ">{trip.pickupLocation}</td>
              <td className="py-6 ">{trip.dropoffLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledTrip;
