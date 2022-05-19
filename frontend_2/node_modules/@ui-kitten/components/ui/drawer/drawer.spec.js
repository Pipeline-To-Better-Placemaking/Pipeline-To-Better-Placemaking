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
const drawer_component_1 = require("./drawer.component");
const drawerItem_component_1 = require("./drawerItem.component");
describe('@drawer-item: component checks', () => {
    const TestDrawerItem = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(drawerItem_component_1.DrawerItem, Object.assign({}, props))));
    it('should render text passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { title: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { title: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const AccessoryRight = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawerItem, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toHaveBeenCalled();
    });
});
describe('@drawer: component checks', () => {
    const TestDrawer = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(drawer_component_1.Drawer, Object.assign({}, props),
            react_1.default.createElement(drawerItem_component_1.DrawerItem, null),
            react_1.default.createElement(drawerItem_component_1.DrawerItem, null))));
    it('should render 2 drawer items passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawer, null));
        const items = component.queryAllByType(drawerItem_component_1.DrawerItem);
        expect(items.length).toEqual(2);
    });
    it('should render function component passed to header prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawer, { header: () => react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to header prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawer, { header: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to footer prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawer, { footer: () => react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to footer prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestDrawer, { footer: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
//# sourceMappingURL=drawer.spec.js.map