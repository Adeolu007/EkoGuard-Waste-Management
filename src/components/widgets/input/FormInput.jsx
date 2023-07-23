import React from "react";
import Input from "./Input";

const FormInput = ({
  id,
  label,
  errors,
  touched,
  required,
  size,
  optional,
  end,
  handleVerifyEmail,
  ...rest
}) => {
  return (
    <div className="w-full">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          {label !== undefined && (
            <label
              htmlFor={id}
              className={`block ${
                size === "sm" ? "text-[12px]" : "text-lg"
              } text-[#000000] font-['Spectral'] mb-[2px]`}
            >
              {label}
            </label>
          )}
          {optional && (
            <small className="text-[#009D49] text-[10px]">{optional}</small>
          )}
          {required && (
            <small className="text-red-700 text-[10px]">
              {required}{" "}
              <span
                onClick={handleVerifyEmail}
                className="underline cursor-pointer"
              >
                Click here to verify your email
              </span>
            </small>
          )}
        </div>

        <Input
          end={undefined}
          size={size}
          {...rest}
          className={`${
            errors ? "border-red-700 text-red-700 placeholder:text-red-700" : ""
          } w-full`}
        />
      </div>
      {errors && <p className="text-red-700 text-base">{errors}</p>}
    </div>
  );
};

export default FormInput;
