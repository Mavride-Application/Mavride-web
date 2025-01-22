import { AddUserIcon } from "@/components/SvgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/UI/dialog";
import AssignVehicleDialogContent from "../Fleet/AssignVehicleDialogContent";
import useDeleteVehicle from "@/hooks/Fleet/useDeleteVehicle";
import useUnassignVehicle from "@/hooks/Fleet/useUnassignDriver";

export const columns = [
  {
    accessorKey: "license_plate",
    header: "License Plate No.",
  },
  {
    accessorKey: "vehicle_color",
    header: "Color of Vehicle",
  },
  {
    accessorKey: "vehicle_model",
    header: "Vehicle Model",
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
  },
  {
    accessorKey: "assigned_driver",
    header: "Assigned Driver",
    cell: ({ row, getValue, ...rest }) => {
      const driver = getValue();
      const id = row?.original?.interior_photos?.[0]?.vehicle;

      const { mutateAsync: deleteVehicle } = useDeleteVehicle();
      const { mutateAsync: unassignVehicle } = useUnassignVehicle();

      return (
        <div className="flex items-center justify-center">
          <span className="ml-auto">
            {driver ? driver : <AddUserIcon className="size-5 fill-white" />}
          </span>
          <Dialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="ml-auto">
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="text-mavride-blue"
                align="start"
                side="left"
              >
                {driver ? (
                  <DropdownMenuItem
                    onClick={async () =>
                      await unassignVehicle({ vehicle_id: id })
                    }
                  >
                    Unassign Vehicle
                  </DropdownMenuItem>
                ) : (
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Assign Vehicle</DropdownMenuItem>
                  </DialogTrigger>
                )}
                <DropdownMenuItem>
                  <Link to={`vehicle/${id}`}>Edit Vehicle Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => await deleteVehicle(id)}
                  className="text-danger"
                >
                  Delete Vehicle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AssignVehicleDialogContent vehicleId={id} />
          </Dialog>
        </div>
      );
    },
    filterFn: "customIncludesString",
  },
];
