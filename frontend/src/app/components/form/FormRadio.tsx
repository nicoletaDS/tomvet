import React from "react";

const AppFormRadio = (props: any) => {
  const {
    info,
    label,
    choices,
    optional,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <div className="mb-4  w-3/6">
      {label && (
        <p>
          {label} {optional && <p>Optional</p>}
        </p>
      )}

      <div className="flex flex-row">
        {choices.map((val: string) => (
          <div className="mr-4">
            <input
              className="mr-1 accent-green"
              type="radio"
              id={val}
              name={name}
              value={val}
              defaultChecked={value === val}
              onChange={(e) => {
                onChange(name)(e.target.value);
              }}
            />
            <label htmlFor={val}> {val}</label>
          </div>
        ))}
      </div>

      {hasError && <p>{errors[name]}</p>}
    </div>
  );
};

export default AppFormRadio;
