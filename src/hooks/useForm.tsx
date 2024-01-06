import React from "react";

type Props<T> = {
  selectedItem: T;
  showForm: boolean;
};

const useForm = <T,>(props: Props<T>) => {
  const { selectedItem, showForm } = props;

  const formRef = React.useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = React.useState<Array<string> | string>(
    []
  );

  React.useEffect(() => {
    if (selectedItem) {
      (formRef.current as HTMLFormElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedItem]);

  React.useEffect(() => {
    if (showForm) {
      setFormErrors([]);
    }
  }, [showForm]);

  return { formRef, formErrors, setFormErrors };
};

export default useForm;
