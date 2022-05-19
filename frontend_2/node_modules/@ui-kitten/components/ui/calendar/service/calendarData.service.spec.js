"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const calendarData_service_1 = require("./calendarData.service");
const nativeDate_service_1 = require("./nativeDate.service");
describe('@month-model: service checks', () => {
    const dateService = new nativeDate_service_1.NativeDateService('en-US');
    const dataService = new calendarData_service_1.CalendarDataService(dateService);
    it('* should create day picker data with active month', () => {
        const date = new Date(2018, 7, 1);
        const grid = dataService.createDayPickerData(date);
        expect(grid.length).toBe(5);
        grid.forEach((row) => {
            expect(row.length).toBe(7);
        });
    });
    it('* should create day picker data with boundingMonth', () => {
        const date = new Date(2018, 7, 1);
        const grid = dataService.createDayPickerData(date);
        const firstBounds = grid.shift().slice(0, 3);
        const lastBounds = grid.pop().slice(6);
        firstBounds.forEach((cell) => {
            expect(cell.bounding).toBe(true);
        });
        lastBounds.forEach((cell) => {
            expect(cell.bounding).toBe(true);
        });
    });
    it('* should create month picker data', () => {
        const date = new Date(2019, 7, 1);
        const monthPickerData = dataService.createMonthPickerData(date, 4, 3);
        expect(monthPickerData.length).toEqual(3);
        monthPickerData.forEach((monthRange, row) => {
            expect(monthRange[0].date.getMonth()).toEqual(row * 4);
            expect(monthRange.length).toEqual(4);
            monthRange.forEach((monthDate, column) => {
                expect(monthDate.date.getMonth()).toEqual(monthRange[0].date.getMonth() + column);
            });
        });
    });
    it('* should create year picker data', () => {
        const start = new Date(2019, 7, 1);
        const yearPickerData = dataService.createYearPickerData(start, 4, 3);
        expect(yearPickerData.length).toEqual(3);
        yearPickerData.forEach((yearRange, row) => {
            expect(yearRange[0].date.getFullYear()).toEqual(start.getFullYear() + row * 4);
            expect(yearRange.length).toEqual(4);
            yearRange.forEach((yearDate, column) => {
                expect(yearDate.date.getFullYear()).toEqual(yearRange[0].date.getFullYear() + column);
            });
        });
    });
    it('* should create year picker pager data', () => {
        const start = new Date(2019, 6, 1);
        const end = new Date(2019, 8, 1);
        const yearPickerPagerData = dataService
            .createYearPickerPagerData(start, end, 4, 3);
        yearPickerPagerData.forEach((pageDate, index) => {
            expect(pageDate.date.getFullYear()).toEqual(start.getFullYear() + index * 4 * 3);
        });
    });
    it('* should create day picker pager data', () => {
        const start = new Date(2019, 6, 1);
        const end = new Date(2019, 8, 1);
        const dayPickerPagerData = dataService.createDayPickerPagerData(start, end);
        dayPickerPagerData.forEach((pageDate, index) => {
            expect(pageDate.date.getMonth()).toEqual(start.getMonth() + index);
        });
        expect(dayPickerPagerData.length).toEqual(3);
    });
    it('* calculates number of months properly', () => {
        const start = new Date(2019, 7, 1);
        const end = new Date(2020, 7, 1);
        const numberOfMonths = dataService.getNumberOfMonths(start, end);
        expect(numberOfMonths).toEqual(12);
    });
    it('* calculates number of years properly', () => {
        const start = new Date(2019, 7, 15);
        const end = new Date(2020, 7, 15);
        const numberOfYears = dataService.getNumberOfYears(start, end);
        expect(numberOfYears).toEqual(1);
    });
});
//# sourceMappingURL=calendarData.service.spec.js.map