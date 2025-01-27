import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import SearchInput from "@/components/UI/SearchInput";
import useAssignDrivers from "@/hooks/Fleet/useAssignDrivers";
import AssignVehicleConfirmation from "./AssignVehicleConfirmation";

const AssignVehicleDialogContent = ({ vehicleId }) => {
  const { data: drivers } = useAssignDrivers();
  const { mutateAsync: assignDriver } = useAssignDrivers();

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader className="mt-4">
        <DialogTitle className="flex items-center justify-between ~text-base/lg">
          <span>Assign Driver</span>
          <SearchInput
            className="max-w-[14rem] py-2 text-sm font-normal"
            name="search"
            placeholder="Search Registered Driver"
          />
        </DialogTitle>
      </DialogHeader>

      <div className="mt-6">
        <h4 className="pb-3 ps-4 pt-2 text-[0.88rem] font-semibold">
          Driver's Name
        </h4>
        <Dialog>
          <DialogTrigger
            onClick={async () => {
              await assignDriver({ vehicle_id: vehicleId, driver_id: "" });
            }}
            className="flex w-full cursor-pointer items-center px-4 text-[0.925rem] font-medium transition-colors duration-300 hover:bg-neutral-50"
          >
            <div className="flex items-center gap-4 py-1 ps-4">
              <div className="size-10 rounded-full border bg-neutral-200"></div>
              <p>Name</p>
            </div>
            <div className="ml-auto">Profile</div>
          </DialogTrigger>

          <AssignVehicleConfirmation />
        </Dialog>
      </div>
    </DialogContent>
  );
};
export default AssignVehicleDialogContent;
