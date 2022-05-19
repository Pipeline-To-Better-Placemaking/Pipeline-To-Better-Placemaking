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
const input_component_1 = require("./input.component");
describe('@input: component checks', () => {
    const TestInput = react_1.default.forwardRef((props, ref) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(input_component_1.Input, Object.assign({ ref: ref }, props)))));
    it('should be able to call focus via ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestInput, { ref: componentRef }));
        expect(componentRef.current.focus).toBeTruthy();
    });
    it('should be able to call blur via ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestInput, { ref: componentRef }));
        expect(componentRef.current.blur).toBeTruthy();
    });
    it('should be able to call isFocused via ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestInput, { ref: componentRef }));
        expect(componentRef.current.isFocused).toBeTruthy();
    });
    it('should be able to call clear via ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestInput, { ref: componentRef }));
        expect(componentRef.current.clear).toBeTruthy();
    });
    it('should set TextInput editable to false by passing disabled prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { disabled: true }));
        const textInput = component.queryByType(react_native_1.TextInput);
        expect(textInput.props.editable).toEqual(false);
    });
    it('should render placeholder', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { placeholder: 'I love Babel' }));
        expect(component.queryByPlaceholder('I love Babel')).toBeTruthy();
    });
    it('should render text passed to label prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { label: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to label prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { label: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to label prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { label: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to caption prop', () => {
        const renderCaption = () => (react_1.default.createElement(react_native_1.Text, null, "I love Babel"));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { caption: renderCaption }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to caption prop', () => {
        const renderCaption = (react_1.default.createElement(react_native_1.Text, null, "I love Babel"));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { caption: renderCaption }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to caption prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { caption: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to caption prop', () => {
        const Caption = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { caption: Caption }));
        const caption = component.queryByType(react_native_1.Image);
        expect(caption).toBeTruthy();
        expect(caption.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    });
    it('should render function components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const AccessoryRight = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should request text change', () => {
        const onChangeText = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { onChangeText: onChangeText }));
        react_native_testing_library_1.fireEvent.changeText(component.queryByType(react_native_1.TextInput), 'I love Babel');
        expect(onChangeText).toBeCalledWith('I love Babel');
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TextInput), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestInput, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TextInput), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=input.spec.js.map