import React from "react";
import {DateTime} from "luxon";

const ClockTime = ({date}) => {
    return (
        <>
            {date.toLocaleString(DateTime.TIME_WITH_SECONDS)}
        </>
    )
}

export {ClockTime}
