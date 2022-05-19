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
const radio_component_1 = require("./radio.component");
describe('@radio: component checks', () => {
    const TestRadio = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(radio_component_1.Radio, Object.assign({}, props))));
    it('should request checking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { checked: false, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(true);
    });
    it('should request unchecking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { checked: true, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(false);
    });
    it('should render text', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text from function component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, null, props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text from JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, null,
            react_1.default.createElement(react_native_1.Text, null, "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onMouseEnter: onMouseEnter }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onMouseLeave: onMouseLeave }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRadio, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=radio.spec.js.map