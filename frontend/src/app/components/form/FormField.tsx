import React from "react";

const AppFormField = (props: any) => {
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

  return (
    <div className="mb-4 w-full">
      {label && (
        <p className="font-bold text-[14px]">
          {label} {optional && <p className="font-light">Optional</p>}
        </p>
      )}

      <input
        className="rounded w-full py-1 px-2"
        type="text"
        onChange={(text) => {
          setFieldTouched(name);
          onChange(name)(text);
        }}
        onBlur={() => onBlur(name)}
        value={value}
        name={name}
        placeholder={placeholder}
      />

      {hasError && <p>{errors[name]}</p>}
    </div>
  );
};

export default AppFormField;
