import { useState } from "react";
import Icon from "react-icons-kit";
import { eyeClosed } from "react-icons-kit/oct/eyeClosed";
import { eye } from "react-icons-kit/oct/eye";
import PhoneInput from "react-phone-input-2";
import { VMSimages } from "../../../assets";

import "./styles.css";

const Input = ({
  end,
  size = "md",
  className = "",
  label,
  errors,
  touched,
  emailError,
  register,
  ...props
}) => {
  const [password, setPassword] = useState(true);
  const error = touched !== undefined || errors !== undefined;

  const getSize = (size) => {
    switch (size) {
      case "sm":
        return "px-2 h-10";
      case "md":
        return "px-4 h-12";
      case "lg":
        return "px-3 h-16";

      default:
        return "p-1 h-10";
    }
  };
  if (props.type === "password") {
    return (
      <div className="relative w-full">
        <img
          className={`${
            size === "sm" && "max-w-[3px] top-2 left-4"
          } object-contain absolute top-3 left-6`}
          //   src={VMSimages.input_bar}
          alt=""
        />

        <Icon
          icon={password ? eye : eyeClosed}
          size={30}
          className="absolute right-6 top-4"
          style={{ cursor: "pointer", color: " #EB6223" }}
          onClick={() => {
            setPassword(!password);
          }}
        />

        <input
          {...props}
          type={password ? "password" : "text"}
          className={`${getSize(
            size
          )} ${className} text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none`}
        />
      </div>
    );
  }

  if (props.type === "checkbox") {
    return (
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            className={`${getSize(
              size
            )} ${className} text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none`}
            {...props}
          />
        </div>
        <label
          htmlFor="email"
          className={`block ${
            size === "sm" ? "text-[12px]" : "text-lg"
          } text-[#000000] font-['Spectral'] mb-[6px]`}
        >
          {label}
        </label>
        {error && <p className="text-red-700 text-base">{errors}</p>}
      </div>
    );
  }

  if (props.type === "tel") {
    return (
      <div className="relative w-full">
        <PhoneInput
          {...register}
          country={"ng"}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          containerClass={`${className} react-tel-input`}
        />
      </div>
    );
  }

  if (props.type === "textarea") {
    return (
      <div className="relative w-full">
        <textarea
          {...props}
          className={`${getSize(size)} ${className} ${
            size === "sm" && "pl-[20px]"
          } text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none`}
        />
      </div>
    );
  }

  if (end !== undefined) {
    return (
      <div
        className={`${getSize(
          size
        )} ${className} flex items-center justify-between text-base bg-white placeholder:text-[#8692A6] border rounded-[6px] focus:border-[#004B9D] outline-none`}
      >
        <input
          {...props}
          className="w-3/4 md:w-4/5 h-full bg-transparent outline-none"
        />

        <div className="w-1/4 md:w-1/5 pl-4 h-full flex items-center justify-end">
          {end}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        className={`${
          size === "sm" && "max-w-[3px] top-[8px] left-[15px]"
        } object-contain absolute top-3 left-6`}
        // src={VMSimages.input_bar}
        alt=""
      />

      <input
        {...props}
        className={`${getSize(size)} ${className} ${
          size === "sm" && "pl-[20px]"
        } text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none`}
      />
    </div>
  );
};

export default Input;
