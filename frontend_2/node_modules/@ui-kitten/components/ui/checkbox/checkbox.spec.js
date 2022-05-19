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
const checkbox_component_1 = require("./checkbox.component");
describe('@checkbox component checks', () => {
    const TestCheckBox = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(checkbox_component_1.CheckBox, Object.assign({}, props))));
    it('should request checking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { checked: false, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(true, false);
    });
    it('should request unchecking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { checked: true, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(false, false);
    });
    it('should request clearing indeterminate and checking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { checked: false, indeterminate: true, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(true, false);
    });
    it('should request clearing indeterminate and unchecking', () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { checked: true, indeterminate: true, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(false, false);
    });
    it('should render text', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text as component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, null, props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render ReactElement passed to prop', () => {
        const renderComponent = react_1.default.createElement(react_native_1.Text, null, "I love Babel");
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, null, renderComponent));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onMouseEnter: onMouseEnter }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onMouseLeave: onMouseLeave }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCheckBox, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=checkbox.spec.js.map