"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const datepicker_component_1 = require("./datepicker.component");
const calendar_component_1 = require("../calendar/calendar.component");
const type_1 = require("../calendar/type");
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
describe('@datepicker: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const TestDatepicker = react_1.default.forwardRef((props, ref) => {
        const [date, setDate] = react_1.default.useState(props.date);
        const onSelect = (nextDate) => {
            setDate(nextDate);
            props.onSelect && props.onSelect(nextDate);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(datepicker_component_1.Datepicker, Object.assign({ ref: ref, date: date }, props, { onSelect: onSelect }))));
    });
    /*
     * In this test:
     * [0] for input touchable
     * [1] for backdrop
     * ...rest for calendar touchable components
     */
    const touchables = {
        findInputTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[0],
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    it('should not render calendar when not focused', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, null));
        expect(component.queryByType(calendar_component_1.Calendar)).toBeFalsy();
    });
    it('should render calendar when becomes focused', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, null));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeTruthy();
    });
    it('should render label as string', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { label: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { label: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render placeholder as pure JSX component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { placeholder: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render placeholder as string', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { placeholder: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render placeholder as component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { placeholder: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as pure JSX component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { label: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as string', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { caption: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { caption: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { caption: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'caption icon' })) }));
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render caption as pure JXS component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { caption: react_1.default.createElement(react_native_1.View, { testID: 'caption icon' }) }));
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render component passed to accessoryLeft prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { accessoryLeft: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'accessory left' })) }));
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryLeft prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { accessoryLeft: react_1.default.createElement(react_native_1.View, { testID: 'accessory left' }) }));
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render component passed to accessoryRight prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { accessoryRight: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'accessory right' })) }));
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryRight prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { accessoryRight: react_1.default.createElement(react_native_1.View, { testID: 'accessory right' }) }));
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should request date change', async () => {
        const onSelect = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
        expect(onSelect).toBeCalledWith(new Date(today.getFullYear(), today.getMonth(), 7));
    });
    it('should render element provided with renderDay prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { renderDay: () => react_1.default.createElement(react_native_1.View, { testID: '@datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderMonth prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { startView: type_1.CalendarViewModes.MONTH, renderMonth: () => react_1.default.createElement(react_native_1.View, { testID: '@datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderYear prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { startView: type_1.CalendarViewModes.YEAR, renderYear: () => react_1.default.createElement(react_native_1.View, { testID: '@datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should hide calendar when date pressed', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, null));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeFalsy();
    });
    it('should not hide calendar when date pressed (autoDismiss)', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { autoDismiss: false }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar when backdrop pressed', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, null));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeFalsy();
    });
    it('should call onFocus when calendar becomes visible', async () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        await react_native_testing_library_1.waitForElement(() => null);
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur when calendar becomes invisible', async () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        expect(onBlur).toBeCalled();
    });
    it('should show calendar by calling `show` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        componentRef.current.show();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar by calling `hide` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        componentRef.current.show();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.hide();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeFalsy();
    });
    it('should show calendar by calling `focus` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar by calling `blur` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.blur();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(calendar_component_1.Calendar));
        expect(calendar).toBeFalsy();
    });
    it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        expect(componentRef.current.isFocused()).toEqual(false);
    });
    it('should return true if calendar visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        await react_native_testing_library_1.waitForElement(() => null);
        expect(componentRef.current.isFocused()).toEqual(true);
    });
    it('should call onSelect with null when calling `clear` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const onSelect = jest.fn();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef, onSelect: onSelect }));
        componentRef.current.clear();
        await react_native_testing_library_1.waitForElement(() => null);
        expect(onSelect).toBeCalledWith(null);
    });
    it('should call onPress', async () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', async () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(touchables.findInputTouchable(component), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', async () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(touchables.findInputTouchable(component), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should show the selected date on load provided by date prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef, date: date }));
        componentRef.current.show();
        // @ts-ignore: private calendarRef
        const calendarState = componentRef.current.calendarRef.current.state;
        expect(calendarState.visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(calendarState.visibleDate.getMonth()).toEqual(date.getMonth());
    });
    it('should show the specific date on load provided by initialVisibleDate prop', () => {
        const initialDate = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef, date: new Date(), initialVisibleDate: initialDate }));
        componentRef.current.show();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
        expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
    });
    it('should scroll to current month when scrollToToday called', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef, date: new Date(2020, 1, 1) }));
        componentRef.current.show();
        componentRef.current.scrollToToday();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(today.getFullYear());
        expect(visibleDate.getMonth()).toEqual(today.getMonth());
    });
    it('should scroll to the specific date when scrollToDate called', () => {
        const dateToScroll = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestDatepicker, { ref: componentRef, date: new Date(2020, 1, 1) }));
        componentRef.current.show();
        componentRef.current.scrollToDate(dateToScroll);
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
        expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
    });
});
//# sourceMappingURL=datepicker.spec.js.map