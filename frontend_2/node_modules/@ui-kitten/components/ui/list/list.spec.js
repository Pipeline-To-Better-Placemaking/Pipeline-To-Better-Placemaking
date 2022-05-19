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
const list_component_1 = require("./list.component");
const listItem_component_1 = require("./listItem.component");
describe('@list-item: component checks', () => {
    const TestListItem = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(listItem_component_1.ListItem, Object.assign({}, props))));
    it('should render text passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render functional component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { title: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JXS component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { title: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to description prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { description: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render functional component passed to description prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { description: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to description prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { description: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render functional components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const AccessoryRight = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toHaveBeenCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestListItem, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toHaveBeenCalled();
    });
});
describe('@list: component checks', () => {
    const TestList = react_1.default.forwardRef((props, ref) => react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(list_component_1.List, Object.assign({ ref: ref, data: new Array(2), renderItem: () => react_1.default.createElement(listItem_component_1.ListItem, null) }, props))));
    it('should render 2 list items', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestList, null));
        expect(component.queryAllByType(listItem_component_1.ListItem).length).toEqual(2);
    });
    it('should call renderItem once per visible item', () => {
        const renderItem = jest.fn();
        react_native_testing_library_1.render(react_1.default.createElement(TestList, { data: new Array(11), renderItem: renderItem }));
        expect(renderItem).toHaveBeenCalledTimes(10);
    });
    it('should be able to call scrollToEnd with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestList, { ref: componentRef, data: new Array(11) }));
        expect(componentRef.current.scrollToEnd).toBeTruthy();
        componentRef.current.scrollToEnd({});
    });
    it('should be able to call scrollToIndex with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestList, { ref: componentRef }));
        expect(componentRef.current.scrollToIndex).toBeTruthy();
        componentRef.current.scrollToIndex({ index: 0 });
    });
    it('should be able to call scrollToIndex with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestList, { ref: componentRef }));
        expect(componentRef.current.scrollToOffset).toBeTruthy();
        componentRef.current.scrollToOffset({ offset: 0 });
    });
});
//# sourceMappingURL=list.spec.js.map