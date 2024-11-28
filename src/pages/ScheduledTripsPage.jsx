import React from "react";
import { scheduledTrips } from "../components/data/scheduledTrips";

const ScheduledTripsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Scheduled Trips</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="py-2">Trip ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Pick up Time</th>
            <th className="py-2">Pick up Location</th>
            <th className="py-2">Drop off Location</th>
          </tr>
        </thead>
        <tbody>
          {scheduledTrips.map((trip, index) => (
            <tr
              key={trip.id}
              className={`text-sm ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-2">{trip.id}</td>
              <td className="py-2">{trip.name}</td>
              <td className="py-2">{trip.pickupTime}</td>
              <td className="py-2">{trip.pickupLocation}</td>
              <td className="py-2">{trip.dropoffLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledTripsPage;
