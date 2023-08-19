import React from "react";
import { Formik } from "formik";

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: any) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
      disableSubmitWhenInbalid={true}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
