"use client";

import React from "react";

type Props = {
  errors: string | Array<string>;
  title?: string;
};

const FormErrors = ({ errors, title }: Props) => {
  const isArrayOfStrings = (
    errors: string | Array<string>
  ): errors is Array<string> => {
    return Array.isArray(errors);
  };

  return (
    <div className="flex flex-col gap-2 text-sm text-rose-600 font-medium">
      {title && <div className="font-bold">{title}</div>}

      {isArrayOfStrings(errors) ? (
        <ul className="list-disc pl-4">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      ) : (
        <span>{errors}</span>
      )}
    </div>
  );
};

export default FormErrors;
