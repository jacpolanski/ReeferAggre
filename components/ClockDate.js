import React from "react";
import { DateTime } from "luxon";

const ClockDate = ({ date }) => {
  return (
    <>
      <h2>{date.toLocaleString(DateTime.DATE_FULL)}</h2>
    </>
  );
};

export { ClockDate };
