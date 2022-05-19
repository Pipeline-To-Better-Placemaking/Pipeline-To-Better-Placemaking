"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const rangeCalendar_component_1 = require("./rangeCalendar.component");
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
describe('@range-calendar: component checks', () => {
    /*
     * Get rid of useNativeDriver warnings
     */
    beforeAll(() => {
        jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const now = new Date();
    const TestRangeCalendar = react_1.default.forwardRef((props, ref) => {
        const [range, setRange] = react_1.default.useState(props.range || {});
        const onSelect = (nextRange) => {
            setRange(nextRange);
            props.onSelect && props.onSelect(nextRange);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(rangeCalendar_component_1.RangeCalendar, Object.assign({ ref: ref }, props, { range: range, onSelect: onSelect }))));
    });
    it('should call onSelect only with start date', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: null,
            });
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeCalendar, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('7')[0]);
    });
    it('should call onSelect with start and end dates if start date passed to props', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: new Date(now.getFullYear(), now.getMonth(), 8),
            });
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeCalendar, { range: { startDate: new Date(now.getFullYear(), now.getMonth(), 7) }, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('8')[0]);
    });
    it('should call onSelect only with start date if start and end dates passed to props', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: null,
            });
        });
        const initialRange = {
            startDate: new Date(now.getFullYear(), now.getMonth(), 7),
            endDate: new Date(now.getFullYear(), now.getMonth(), 8),
        };
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeCalendar, { range: initialRange, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('7')[0]);
    });
    it('should show startDate of the selected range on load provided by range prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeCalendar, { ref: componentRef, range: {
                startDate: date,
                endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 10),
            } }));
        const visibleDate = componentRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(visibleDate.getMonth()).toEqual(date.getMonth());
    });
});
//# sourceMappingURL=rangeCalendar.spec.js.map