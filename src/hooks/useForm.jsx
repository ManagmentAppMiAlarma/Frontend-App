import { useState } from "react";

export const useForm = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    const { name, value, type, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return {
    form,
    changed,
  };
};
