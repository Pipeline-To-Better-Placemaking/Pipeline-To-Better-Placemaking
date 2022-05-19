/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export declare enum RangeRole {
    none = 0,
    member = 1,
    start = 2,
    end = 4,
    complete = 6
}
export interface CalendarDateOptions {
    bounding: boolean;
    holiday: boolean;
    range?: RangeRole;
}
export interface CalendarRange<D> {
    startDate?: D;
    endDate?: D;
}
export interface CalendarDateInfo<D> extends CalendarDateOptions {
    date: D;
}
export declare type CalendarViewModeId = 'DATE' | 'MONTH' | 'YEAR';
export interface CalendarViewMode {
    id: CalendarViewModeId;
    navigationNext: () => CalendarViewMode;
    pickNext: () => CalendarViewMode;
}
interface CalendarViewModes {
    DATE: CalendarViewMode;
    MONTH: CalendarViewMode;
    YEAR: CalendarViewMode;
}
export declare const CalendarViewModes: CalendarViewModes;
export {};
