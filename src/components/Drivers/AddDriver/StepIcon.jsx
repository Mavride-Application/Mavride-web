import {
  ActiveStepIcon,
  CompleteStepIcon,
  IncompleteStepIcon,
} from "@components/SvgIcons";

const StepIcon = ({ step, currentStep }) => {
  if (currentStep > step) {
    return <CompleteStepIcon />;
  } else if (step === currentStep) {
    return <ActiveStepIcon />;
  } else {
    return <IncompleteStepIcon />;
  }
};
export default StepIcon;
