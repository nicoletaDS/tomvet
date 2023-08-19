import React from "react";

export enum MsgType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

interface FormMsgProp {
  info: string;
  type: MsgType;
}

const FormMsg: React.FC<FormMsgProp> = ({ info, type }) => {
  let bgColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-success";
      break;
    case "warning":
      bgColor = "bg-attention";
      break;
    case "error":
      bgColor = "bg-critical";
      break;
    default:
      bgColor = "bg-critical";
      break;
  }

  return (
    <div
      className={`${bgColor} rounded-lg py-4 px-6 flex-row justify-center items-center m-2`}
    >
      <p className="text-black font-normal text-center text-base leading-6 ml-2">
        {info}
      </p>
    </div>
  );
};

export default FormMsg;
