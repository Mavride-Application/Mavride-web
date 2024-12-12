import { Link } from "react-router-dom";
import { PlusIcon, TruckIcon } from "../components/SvgIcons";

const ManageFleet = () => {
  return (
    <section className="flex w-full flex-col bg-white p-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Manage Fleet</h1>

        <Link
          className="flex items-center gap-2 rounded-md bg-mavride-blue px-4 py-3 font-medium text-white"
          to="add-vehicle"
        >
          <PlusIcon className="fill-white" />
          Add Vehicle
        </Link>
      </header>

      <div className="grid min-h-[80vh] place-items-center">
        <div className="text-light-grey flex flex-col items-center justify-center gap-3">
          <TruckIcon className="stroke-light-grey" />
          <p className="max-w-[30.5rem] text-center">
            You have not added any vehicles yet. Click 'Add Vehicle' to register
            your first vehicle.
          </p>
        </div>
      </div>
    </section>
  );
};
export default ManageFleet;
