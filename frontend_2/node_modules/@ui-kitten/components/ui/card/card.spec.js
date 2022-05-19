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
const card_component_1 = require("./card.component");
describe('@card: component checks', () => {
    const TestCard = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(card_component_1.Card, Object.assign({}, props))));
    it('should render component passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, null,
            react_1.default.createElement(react_native_1.Text, null, "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to header prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { header: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "Test Card Header") }));
        expect(component.queryByText('Test Card Header')).toBeTruthy();
    });
    it('should render JSX component passed to header prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { header: react_1.default.createElement(react_native_1.Text, null, "Test Card Header") }));
        expect(component.queryByText('Test Card Header')).toBeTruthy();
    });
    it('should render function component passed to footer prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { footer: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "Test Card Footer") }));
        expect(component.queryByText('Test Card Footer')).toBeTruthy();
    });
    it('should render JSX component passed to footer prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { footer: react_1.default.createElement(react_native_1.Text, null, "Test Card Footer") }));
        expect(component.queryByText('Test Card Footer')).toBeTruthy();
    });
    it('should render function component passed to accent prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { accent: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "Test Card Accent") }));
        expect(component.queryByText('Test Card Accent')).toBeTruthy();
    });
    it('should render JSX component passed to accent prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { footer: react_1.default.createElement(react_native_1.Text, null, "Test Card Accent") }));
        expect(component.queryByText('Test Card Accent')).toBeTruthy();
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestCard, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
});
//# sourceMappingURL=card.spec.js.map