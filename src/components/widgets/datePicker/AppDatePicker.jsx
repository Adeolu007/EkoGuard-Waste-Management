import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SWMCalendar } from "../../icons";

import "./styles.css";

const AppDatePicker = ({
  onChange,
  placeholder,
  value,
  maxDate,
  dateFormat,
  className,
  hasIcon,
  showTimeSelect,
  minDate,
  id,
  size,
  label,
  optional,
  required,
  touched,
  errors,
  message,
}) => {
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
  const parsedValue = value ? moment(value, "YYYY-MM-DD").toDate() : null;
  const CustomInput = ({ value, onClick }) => (
    <div className="relative w-full">
      <input
        type="text"
        className={`${getSize(size)} ${className} ${
          size === "sm" && "pl-[20px]"
        } text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none ${
          errors ? "border-red-700 text-red-700 placeholder:text-red-700" : ""
        } `}
        value={value}
        onClick={onClick}
        placeholder="Select date"
      />
      <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
        <SWMCalendar size={14} />
      </div>
    </div>
  );
  return (
    <div className="space-y-1 w-full mb-8">
      <div className="flex items-center justify-between">
        {label !== undefined && (
          <label
            htmlFor={id}
            className={`block ${
              size === "base" ? "text-[12px]" : "text-lg"
            } text-[#000000] font-['Spectral'] mb-[2px]`}
          >
            {label}
          </label>
        )}
        {optional && (
          <small className="text-[#009D49] text-[10px]">Optional</small>
        )}
        {required && (
          <small className="text-red-700 text-[10px]">Required</small>
        )}
        {message && (
          <small className="text-[#009D49] font-LatoRegular text-[14px]">
            Please Select only {message} for this month's appointment
          </small>
        )}
      </div>
      <DatePicker
        selected={parsedValue}
        onChange={onChange}
        dateFormat={dateFormat || "yyyy-MM-dd"}
        maxDate={new Date(maxDate)}
        minDate={new Date(minDate)}
        showYearDropdown
        showMonthDropdown
        showTimeSelect={showTimeSelect}
        customInput={<CustomInput />}
        className="react-datepicker-wrapper"
      />
      {errors && <p className="text-red-700 text-base">{errors}</p>}
    </div>
  );
};
export default AppDatePicker;
