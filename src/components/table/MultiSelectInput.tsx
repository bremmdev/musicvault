import React from "react";
import MultiSelect from "react-select";

type Props<T> = {
  defaultValue: Array<T>;
  name: string;
  options: Array<T>;
  placeholder: string;
};

const MultiSelectInput = <T,>(props: Props<T>) => {
  const { defaultValue, name, options, placeholder } = props;

  return (
      <MultiSelect
        defaultValue={defaultValue}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#e2e8f0" : "#e2e8f0",
            borderRadius: "0.375rem",
            fontSize: "14px",
            outline: state.isFocused ? "2px solid #020617" : "none",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#94a3b8",
            },
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "14px",
            backgroundColor: state.isFocused ? "#f1f5f9" : "#fff",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#94a3b8",
          }),
        }}
        options={options}
        isMulti={true}
        className="text-slate-950 shrink-0 w-full block"
        placeholder={placeholder}
        name={name}
      />
  );
};

export default MultiSelectInput;
