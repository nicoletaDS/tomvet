import React from "react";
import { useFormikContext } from "formik";

interface AppFormSubmitButtonProps {
  title: string;
  isLoading?: boolean;
  alwaysEnabled?: boolean;
}

const AppFormSubmitButton = ({
  title,
  isLoading,
  alwaysEnabled,
}: AppFormSubmitButtonProps) => {
  const { isValid, dirty } = useFormikContext();
  let isDisabled = alwaysEnabled
    ? isLoading || !isValid
      ? true
      : false
    : !dirty || !isValid || isLoading;

  return (
    <button
      disabled={isDisabled}
      type="submit"
      className={`
       ${
         isDisabled ? "opacity-60" : ""
       } bg-lilac rounded-full w-fit px-6 py-2 mt-4 text-white hover:underline`}
    >
      {isLoading ? "se incarca ..." : title}
    </button>
  );
};

export default AppFormSubmitButton;
