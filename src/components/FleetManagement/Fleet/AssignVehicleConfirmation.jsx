import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
  DialogPortal,
} from "@/components/UI/dialog";
import { DialogContent as Content } from "@radix-ui/react-dialog";
import SuccessModal from "@/components/UI/SuccessModal";
import { useState } from "react";

const AssignVehicleConfirmation = ({ unassign }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogPortal>
          <Content>
            <SuccessModal
              message={`You have successfully ${unassign ? "Unassigned" : "Assigned"} Vehicle to Driver`}
              children="Done"
              to={0}
            />
          </Content>
        </DialogPortal>
      </Dialog>

      <DialogContent aria-describedby={undefined} className="px-0 text-center">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-center text-lg font-bold">
            {unassign ? "Unassign" : "Assign"} Vehicle
          </DialogTitle>
        </DialogHeader>

        <p className="mx-auto max-w-[20.32rem] text-[0.925rem] font-medium">
          Are you sure you want to {unassign ? "unassign" : "assign"} this
          vehicle to this driver?
        </p>

        <div className="flex items-center justify-center gap-3">
          <button className="rounded-3xl border-[0.6px] border-[#979797] bg-mavride-blue px-8 py-2 text-sm font-semibold text-white">
            Yes
          </button>
          <DialogClose className="rounded-3xl border-[0.6px] border-[#979797] px-8 py-2 text-sm font-semibold">
            No
          </DialogClose>
        </div>

        <hr className="mt-3 border-[#979797]" />

        <button
          onClick={() => setShowConfirmation(true)}
          className="mx-auto mt-3 w-fit rounded-md bg-mavride-blue px-7 py-[0.56rem] text-sm font-bold text-white"
        >
          {unassign ? "Unassign" : "Assign"} Vehicle
        </button>
      </DialogContent>
    </>
  );
};
export default AssignVehicleConfirmation;
