import { DownArrowIcon, StarIcon, StatusIcon } from "@/components/SvgIcons";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";

export const columns = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ getValue }) => {
      const image = getValue();
      return (
        <div className="mx-auto size-[2.6rem] overflow-hidden rounded-full">
          <img
            className="size-full object-cover"
            src={image}
            alt="driver image"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: "Driver's Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => {
      const rating = Math.round(getValue());
      return (
        <div className="flex items-center">
          {Array.from({ length: rating }).map((el) => (
            <StarIcon key={"rating"} />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "vehicle_color",
    header: "Vehicle Color",
  },
  {
    accessorKey: "license_plate",
    header: "Plate Number",
  },
  {
    accessorKey: "status",
    header: (
      <div className="flex items-center">
        Status <DownArrowIcon className="-mt-1 size-5" />
      </div>
    ),
    cell: ({ getValue }) => {
      const status = getValue();
      const isActive = status && status === "active";
      return (
        <div
          className={cn("flex items-center gap-1 text-sm", {
            "text-[#00A82F]": isActive,
            "text-[#F32121]": !isActive,
          })}
        >
          <StatusIcon
            className={cn("size-4", {
              "fill-[#00A82F]": isActive,
              "fill-[#F32121]": !isActive,
            })}
          />
          <span>{isActive ? "Active" : "Offline"}</span>
        </div>
      );
    },
  },
  {
    id: "options",
    cell: <EllipsisVertical />,
  },
];

export const placeholder = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/3b4f/e1a6/60f065a3090bbac1d3b1069cae759e3b?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eSEk40PlU26vW8cMJaqECynmiYCdOJnIoKRAlUWwbBlsjR3YnDJ73KPetI4Y5uFxSCfnS6aI~Ft6HlxtMh8vOsmBPhZ~Ri6W8xWK8XY7Rm3wWLOBsRA~QE3o1TlI0SXYyQe8Vj1RouKOcGV~~v32QXENGDXlO8JoWO8LUgGpAAOI6EGBEYxlpxw-LJvAUNlubwNeoTFdfXNUMxdHVis9jnspE72hBDvoajmHBrNc5Hf6QdE2q~vj38LfK58JguzqprQBQoQAGsXN2uwOQrxqpMM6HoxBlcZTXa17NWQ28Wz~b1WPJPlf07n3MZZkMXHW3WntsXu56eSMHGxXokmpcQ__",
    fullname: "John Doe",
    email: "johndoe@example.com",
    rating: 2.8,
    gender: "Male",
    vehicle_color: "Black",
    license_plate: "ABC-1234",
    status: "active",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/7042/a84b/3d6a7edb0157de0a7bf383dd2673a1be?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ip2Go2dckSXM5v4Z5JD01lXsGm6sFr7xbb9IBV8JYLaMjcyKPIQG3xQrm6u-XAH~g1Fa5mKzmNRHU1ofLxBWkQ2vYWXB~CdqIBJegu6mRo2yTvp3EfsVL12uKLcK5jtWC4GXbjYCyDNnPzztlkdkhM2GffTW~ys3CeRlKhFgJsGrDr7yZB~k6UlQAODXOXke67yY6j1lTXo6jL0p-myEaXZlvNsWJF2BCOoCWCfoVXtO82FJ8248BpcYR2lncxTCVCNVE4HF7THc-FI5QHu05egxK-L~iJB8IU2Sm5XIGWAOXdryoi6O0jggrxHfXa2aETWyoHg2ZcSF5ujKeZSfvA__",
    fullname: "Jane Smith",
    email: "janesmith@example.com",
    rating: 1.5,
    gender: "Female",
    vehicle_color: "Red",
    license_plate: "XYZ-5678",
    status: "active",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/0137/6a01/f8898b4d066033af55f17b0f52d39b46?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UEqPAlPI7xngPu~G2pvJrobY-5LKDQtx~AiCWh5DN8cHhFfA8WHS4mRYjLpmbTOZwLOijbOTvW3QeXW1HoiiGPg~GDvaBsFWVPV7sCccfdGXz7NHfWb9cv3YYrLfHhHAYjsovklQAbBUyi6sdsxdqTguWBIoiR8WDZbPsDdPKNwnfjg66t0YTOn~Ft6McVhynsKWQBGp2H5bXWjN2I~j5pcuC3wY76P7QHY67ak~679KoIF~PmuaY~S~Djyh5tzBoG0SngNsnKar0A~P8fyfIEDKQUFw0LO8RPn73sbfN25MoBztWHcZF-op14Bswuqvd3suWGsggzzhCsDaYSyzWg__",
    fullname: "Samuel Green",
    email: "samuelgreen@example.com",
    rating: 3.2,
    gender: "Male",
    vehicle_color: "White",
    license_plate: "DEF-9101",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/1627/f3a8/70e9b56d751d07f53392d7a84aa55817?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VyTPaBdA0DuwFkNSRPwnXY8nkE7QpSbn0HRvOH8JNl8XSwmHtjXxSvXZb6j35pJWGbulKDdkj9lhtMjnGP891GsD2ESevndwwjab-FC7LQZZ56~LobcZ9uSz-6iSfxHFy1S~4PCHWSiFnfflgwNSXMCqHvCv5cFPFkJWdciy8srT3fuvY2SnRU1whIkU2rKw3fF0~B-oLaupEvM2iTNoOGR4OHAGgM4fSw~mlHLYgGbVt4dOiQB8hASYj-4f3eahQJKXHpxuhPgBGPsXw0vKBb6rjyag9IIqIh9k~fy4YMK0p2mD35C-KGP~Lx0JUoN6U6jh1K2lUEQABrWPhFX~YQ__",
    fullname: "Emily Brown",
    email: "emilybrown@example.com",
    rating: 4.9,
    gender: "Female",
    vehicle_color: "Blue",
    license_plate: "GHI-3456",
    status: "active",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/6228/a159/24c144a144b9b62a3b9568ce9304c6b9?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KKLay91VDAJ4~5AJyVNR7kprpR0ScVLPWrzQbqVs7I-HJsm3djW7-wM3B9vcQ6p9XEnROA~RZz7MgwAh8eEpji0qb-c6yxcM03u2XujMji6c0uQ-O6WoQwgEO6vxszZKp6Nj3~WB6Dqi5lZLPRe~jFuL77jYpmFcJDKwM1iDhQP1ejCw3WULNGfitagKOQ3QFihVE8xylJz4O2dUZWkHdlbpTDixQ1m30ULh1T8XZ7ILzb1JAOAZJG0g4AlFEOMBnm6V~htzvXMqiwjzrVA5QpYcMGTbm4p3Umo4~FoE5xUbJKXrMdX2Sh9DqitMZQU-QpXghDXT9QnMMHBoKlxC5w__",
    fullname: "Michael Johnson",
    email: "michaeljohnson@example.com",
    rating: 4.3,
    gender: "Male",
    vehicle_color: "Silver",
    license_plate: "JKL-7890",
  },
];
