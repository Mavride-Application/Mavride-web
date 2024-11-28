import { Link, useLocation } from "react-router-dom";
import DriverImage from "../components/Drivers/DriverImage";
import FormStepOne from "../components/Drivers/FormStepOne";
import { BackArrowIcon } from "../components/SvgIcons";
import { FormProvider, useForm } from "react-hook-form";
import FormStepTwo from "../components/Drivers/FormStepTwo";
import FileInput from "../components/UI/FileInput";

// const DriverDocuments = ({ documents }) => {
//   const methods = useForm({ defaultValues: documents });
//   const { handleSubmit } = methods;

//   //handle form submission
//   const onSubmit = (data) => {
//     console.log(data);
//   };
//   return (
//     <div className="mt-[0.88rem] px-5 pb-20 pt-14">
//       <h2 className="mb-6 text-center text-2xl font-bold">Update Document</h2>

//       <h3 className="text-center text-lg">
//         Vehicle document and Government Requirement
//       </h3>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <div className="mt-[3.2rem] grid grid-cols-1 gap-y-[0.81rem] px-8 sm:grid-cols-3">
//             <FileInput
//               label="Vehicle Insurance"
//               subtext="Upload your vehicle insurance"
//               name="vehicleInsurance"
//             />
//             <FileInput
//               label="Exterior photo of vehicle"
//               subtext="Upload vehicle’s exterior photo"
//               name="vehiclePhotoExterior"
//             />
//             <FileInput
//               label="Interior photo of vehicle"
//               subtext="Upload vehicle’s interior photo"
//               name="vehiclePhotoInterior"
//             />

//             <FileInput
//               label="Proof of car ownership"
//               subtext="Upload proof of car ownership"
//               name="carOwnershipProof"
//             />
//             <FileInput
//               label="Road worthiness"
//               subtext="Upload road worthiness"
//               name="roadWorthiness"
//             />
//           </div>

//           <button
//             type="submit"
//             className="mx-auto mt-12 block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
//           >
//             Update Document
//           </button>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };

const DriverProfileEdit = () => {
  const { state } = useLocation();
  // const {
  //   vehicleInsurance,
  //   vehiclePhotoExterior,
  //   vehiclePhotoInterior,
  //   carOwnershipProof,
  //   roadWorthiness,
  //   ...profileData
  // } = state || {};

  // const documents = {
  //   vehicleInsurance,
  //   vehiclePhotoExterior,
  //   vehiclePhotoInterior,
  //   carOwnershipProof,
  //   roadWorthiness,
  // };

  const methods = useForm({ defaultValues: state });
  const { handleSubmit } = methods;

  //handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="px-5 pb-[2.38rem] pt-[1.69rem]">
      <FormProvider {...methods}>
        <form className="pb-20" onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="relative text-center">
            <Link
              to="/userManagement/drivers"
              className="absolute left-5 mt-2 flex items-center gap-2"
            >
              <BackArrowIcon className="w-4" />
              Back
            </Link>

            <h1 className="mb-7 text-2xl font-bold">Driver Profile</h1>
            <h2 className="mt-1 text-lg">
              Personal Information & Location Details
            </h2>
          </section>

          <div className="mt-10 flex w-full justify-between gap-4 px-5">
            {/* Left Column */}
            <section className="flex w-full max-w-[20.8125rem] flex-col gap-24">
              {/* Back or Previous Button */}

              {/* Driver Image */}
              <DriverImage />
            </section>

            {/* Right Column */}
            <section className="w-full max-w-[43.5rem]">
              {/* Form Steps */}
              <div>
                <div className="grid grid-cols-2 gap-x-[0.88rem] gap-y-5">
                  <FormStepOne />
                </div>
              </div>
            </section>
          </div>
          {/* 
          <section className="mt-20 px-5">
            <div className="ms-auto w-full max-w-[43.5rem]">
              <h2 className="text-center text-lg">Vehicle Details & Service</h2>

              <div className="mt-10 grid grid-cols-2 gap-x-[0.88rem] gap-y-5">
                <FormStepTwo />
              </div>
            </div>
          </section> */}

          <button
            type="submit"
            className="mx-auto mt-24 block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
          >
            Edit Profile
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default DriverProfileEdit;
