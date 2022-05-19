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
const button_component_1 = require("./button.component");
describe('@button: component checks', () => {
    const TestButton = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(button_component_1.Button, Object.assign({}, props))));
    it('should render text passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, null, props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render accessory from prop as pure JSX element', () => {
        const accessoryLeft = react_1.default.createElement(react_native_1.Text, null, "Left accessory");
        const accessoryRight = react_1.default.createElement(react_native_1.Text, null, "Right accessory");
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { accessoryLeft: accessoryLeft, accessoryRight: accessoryRight }));
        expect(component.queryByText('Left accessory')).toBeTruthy();
        expect(component.queryByText('Right accessory')).toBeTruthy();
    });
    it('should render children from prop as pure JSX element', () => {
        const children = (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.Text, null, "Children component")));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { children: children }));
        expect(component.queryByText('Children component')).toBeTruthy();
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onMouseEnter: onMouseEnter }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onMouseLeave: onMouseLeave }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestButton, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=button.spec.js.map