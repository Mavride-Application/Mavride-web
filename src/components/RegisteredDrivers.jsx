import registeredDrivers from "../components/data/registeredDrivers";
import active from "../assets/active.png";
import offline from "../assets/offline.png";

const RegisteredDrivers = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="pb-2 text-[0.9rem] font-medium text-[#888889]">
          Registered Drivers
        </h2>
        <a href="#" className="pb-2 text-[0.9rem] font-medium text-indigo-600">
          View All
        </a>
      </div>
      <div>
        {registeredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="mb-2 h-[4.5rem] w-full flex items-center justify-between rounded-lg bg-gray-50 p-2"
          >
            <div className="flex items-center">
              <img
                src={driver.profilePicture}
                alt={driver.name}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <p className="text-[0.925rem] font-medium text-gray-800">
                {driver.name}
              </p>
            </div>
            <div className="flex items-center gap-[0.1rem]">
              <img
                src={driver.status === "Active" ? active : offline} // Using the imported icons
                alt={`${driver.status} icon`}
                className="h-4 w-4"
              />
              <span
                className={`mr-2 text-sm font-normal ${
                  driver.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {driver.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredDrivers;
