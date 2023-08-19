import React from "react";

const AppFormImg = (props: any) => {
  const {
    info,
    label,
    placeholder,
    optional,
    imgSrc,
    setImgSrc,
    setSelectedFile,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setFieldTouched(name);
        onChange(name)(fileReader.result);
        setImgSrc(fileReader.result);
      }
    };

    const file = e.target.files[0];
    console.log("FILE", file.type);
    if (file && file.type.substring(0, 5) === "image") {
      setSelectedFile(file);
    }

    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="bg-black w-[80px] h-[80px] flex flex-row items-end my-8 ">
      <img
        src={imgSrc}
        alt="Imagine Profil"
        className="h-full w-full rounded-full"
      />
      <input
        type="file"
        id="file"
        className="hidden"
        accept="/image/*"
        onChange={handleChange}
      />
      <label htmlFor="file" className="text-green absolute text-4xl ml-16">
        {" "}
        +{" "}
      </label>

      {hasError && <p>{errors[name]}</p>}
    </div>
  );
};

export default AppFormImg;
