import camera from "../../assets/camera.svg";
import { useFormContext } from "react-hook-form";

const DriverImage = ({ className }) => {
  const { register, watch } = useFormContext();

  const image = watch("driverPic")?.[0];
  let preview;
  if (image) preview = URL.createObjectURL(image);

  return (
    <div
      className={`mt-auto flex flex-1 flex-col justify-center rounded-[0.625rem] border-[0.5px] border-[#E8E8E8] px-5 ${className}`}
    >
      <label className="relative mx-auto block size-[10.5rem] rounded-full bg-[#E7E9FB] bg-profile bg-center bg-no-repeat">
        {/* Hidden Image File Input */}
        <input
          hidden
          accept="image/*"
          type="file"
          id="driver-pic"
          {...register("driverPic", {
            required: true,
            validate: {
              acceptedFormats: (files) => {
                const image = files[0];
                return image.type.match(/^image\//) || "Invalid file format";
              },
            },
          })}
        />

        {/* Image Preview */}
        {preview && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <img
              className="size-full object-cover"
              src={preview}
              alt={image.name}
            />
          </div>
        )}

        {/* Camera Image Icon */}
        <label
          htmlFor="driver-pic"
          className="absolute bottom-1 right-1 z-[5] grid size-[2.45rem] cursor-pointer place-items-center rounded-full bg-white"
        >
          <img className="object-contain" src={camera} alt="camera-icon" />
        </label>
      </label>

      <div className="mt-12 text-center text-sm">
        <p className="text-[#777]">Allowed format</p>
        <p>JPG, JPEG, and PNG</p>

        <p className="mt-6 text-[#777]">Max file size</p>
        <p>2MB</p>
      </div>
    </div>
  );
};
export default DriverImage;
