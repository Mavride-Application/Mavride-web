import { AddUserIcon } from "@/components/SvgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import useDeleteVehicle from "@/hooks/useDeleteVehicle";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

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

      return (
        <div className="flex items-center justify-center">
          <span className="ml-auto">
            {driver ? driver : <AddUserIcon className="size-5 fill-white" />}
          </span>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="ml-auto">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="left">
              <DropdownMenuItem className="text-mavride-blue">
                Assign Vehicle
              </DropdownMenuItem>
              <DropdownMenuItem className="text-mavride-blue">
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
        </div>
      );
    },
    filterFn: "customIncludesString",
  },
];

export const data = [
  {
    licensePlate: "4K - 667 - WL",
    color: "Blue",
    model: "Toyota Sienna",
    type: "Sedan",
    driver: "Collins Moolin",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Black",
    model: "Toyota Sienna",
    type: "Ambulatory Van",
    driver: "John Fisher",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Grey",
    model: "Wheelchair-Accessible Van",
    type: "Stretcher Van",
    driver: undefined,
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Black",
    model: "Ford Transit",
    type: "Shuttle Bus",
    driver: "Tim Daniel",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Black",
    model: "Honda Odyssey",
    type: "Minivans",
    driver: undefined,
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Grey",
    model: "Ford Transit",
    type: "Stretcher Van",
    driver: "Green Hayley",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Black",
    model: "Dodge Grand Caravan",
    type: "Minivans",
    driver: "Green Hayley",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Black",
    model: "Ram ProMaster",
    type: "Stretcher Van",
    driver: "Tim Daniel",
  },
  {
    licensePlate: "4K - 667 - WL",
    color: "Blue",
    model: "Nissan NV200",
    type: "Shuttle Bus",
    driver: undefined,
  },
];
