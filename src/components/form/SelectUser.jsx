import React from "react";

const SelectItem = ({
  items,
  isLoading,
  error,
  firstLabelKey,
  secondLabelKey,
  firstValueKey,
  secondValueKey,
  setUser,
}) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="" disabled>
        Selecciona un Usuario
      </option>
      {items.map((item) => {
        return (
          <option key={item[firstValueKey]} value={item[secondValueKey]}>
            {`${item[firstLabelKey]} ${item[secondLabelKey]}`}
          </option>
        );
      })}
    </select>
  );
};

export default SelectItem;
