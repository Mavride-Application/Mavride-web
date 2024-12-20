import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/UI/Button";
import VehicleDetails from "../../components/FleetManagement/AddDriver/VehicleDetails";
import VehicleDocuments from "../../components/FleetManagement/AddDriver/VehicleDocuments";
import BackLink from "../../components/UI/BackLink";
import SuccessModal from "../../components/UI/SuccessModal";
import { replaceFileListWithFile } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateVehicle from "@/hooks/useUpdateVehicle";
import useAddVehicle from "@/hooks/useAddVehicle";

const VehicleForm = ({ defaultValues }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: editVehicle } = useUpdateVehicle();
  const { mutateAsync: addVehicle } = useAddVehicle();

  const successMessage = id
    ? "Vehicle edit successful"
    : "You have successfully added a New Vehicle";

  const steps = [
    {
      heading: "Add Vehicle",
      subheading: "Vehicle Details & Service",
      subtext: "Fill in the details below to Add Vehicle",
      fields: [
        "license_plate",
        "vehicle_type",
        "vehicle_model",
        "vehicle_color",
        "service_offering",
      ],
    },
    {
      heading: "Upload Required Document",
      subtext: "Kindly upload required documents to add vehicle",
      fields: [
        "car_ownership",
        "vehicle_exterior",
        "vehicle_interior",
        "vehicle_insurance",
        "road_worthiness",
      ],
    },
  ];
  const methods = useForm({ defaultValues });
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    if (step === 0) {
      if (id) {
        try {
          await editVehicle(
            { id, data },
            {
              onSuccess: () => {
                reset();
                navigate("/userManagement/fleet");
              },
              onError: (error) => {
                throw error;
              },
            },
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        setStep(1);
      }
    }

    if (step === 1) {
      data = replaceFileListWithFile(data);

      try {
        await addVehicle(data, {
          onSuccess: () => {
            setModal(true);
            reset();
          },
          onError: (error) => {
            throw error;
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="relative bg-white px-8 py-12">
      {
        <BackLink
          onClick={() => setStep(0)}
          to={step === 1 ? "" : "/userManagement/fleet"}
          className="absolute left-12 top-12"
        />
      }

      <h1 className="mb-7 text-center font-bold ~text-lg/2xl">
        {steps[step].heading}
      </h1>

      {steps[step].subheading && (
        <h2 className="mb-[0.81rem] text-center ~text-base/lg">
          {steps[step].subheading}
        </h2>
      )}

      <h3 className="text-center text-light-grey ~text-base/lg">
        {steps[step].subtext}
      </h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="mx-auto my-14 grid max-w-[44rem] grid-cols-2 justify-center gap-x-4 gap-y-6">
            {step === 0 && <VehicleDetails />}
            {step === 1 && <VehicleDocuments />}
          </section>

          {modal && (
            <SuccessModal
              message={successMessage}
              href="/userManagement/fleet"
              linkTextContent="Done"
              onClick={() => setModal(false)}
            />
          )}

          <Button isSubmitting={isSubmitting} className="mx-auto max-w-[20rem]">
            {step === 0
              ? id
                ? "Edit Vehicle Details"
                : "Next"
              : "Add Vehicle"}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
export default VehicleForm;
