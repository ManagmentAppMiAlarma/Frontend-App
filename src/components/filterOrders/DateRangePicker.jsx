import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onDateRangeChange) {
      onDateRangeChange(start, end);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <div>
        <p>Start Date: {format(startDate, "yyyy-MM-dd")}</p>
        <p>End Date: {format(endDate, "yyyy-MM-dd")}</p>
      </div>
    </div>
  );
};

export default DateRangePicker;
