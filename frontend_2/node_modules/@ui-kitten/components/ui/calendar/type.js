"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var RangeRole;
(function (RangeRole) {
    RangeRole[RangeRole["none"] = 0] = "none";
    RangeRole[RangeRole["member"] = 1] = "member";
    RangeRole[RangeRole["start"] = 2] = "start";
    RangeRole[RangeRole["end"] = 4] = "end";
    RangeRole[RangeRole["complete"] = 6] = "complete";
})(RangeRole = exports.RangeRole || (exports.RangeRole = {}));
const VIEW_MODE_DATE = {
    id: 'DATE',
    navigationNext: () => {
        return VIEW_MODE_YEAR;
    },
    pickNext: () => {
        return VIEW_MODE_DATE;
    },
};
const VIEW_MODE_MONTH = {
    id: 'MONTH',
    navigationNext: () => {
        return VIEW_MODE_DATE;
    },
    pickNext: () => {
        return VIEW_MODE_DATE;
    },
};
const VIEW_MODE_YEAR = {
    id: 'YEAR',
    navigationNext: () => {
        return VIEW_MODE_DATE;
    },
    pickNext: () => {
        return VIEW_MODE_MONTH;
    },
};
exports.CalendarViewModes = {
    DATE: VIEW_MODE_DATE,
    MONTH: VIEW_MODE_MONTH,
    YEAR: VIEW_MODE_YEAR,
};
//# sourceMappingURL=type.js.map