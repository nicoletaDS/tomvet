import React from "react";
import { Formik } from "formik";

const AppFormFieldPass = (props: any) => {
  const {
    info,
    label,
    placeholder,
    optional,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="mb-4  w-full">
      {label && (
        <p>
          {label} {optional && <p>Optional</p>}
        </p>
      )}

      <input
        className=" rounded w-full py-1 px-2"
        id={name}
        type={showPassword ? "text" : "password"}
        onChange={(text) => {
          setFieldTouched(name);
          onChange(name)(text);
        }}
        onBlur={() => onBlur(name)}
        value={value}
        name={name}
      />

      {hasError && <p>{errors[name]}</p>}
    </div>
  );
};

export default AppFormFieldPass;
