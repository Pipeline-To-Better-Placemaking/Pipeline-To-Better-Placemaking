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
const eva_1 = require("@eva-design/eva");
const react_native_testing_library_1 = require("react-native-testing-library");
const theme_1 = require("../../theme");
const menu_component_1 = require("./menu.component");
const menuItem_component_1 = require("./menuItem.component");
const menuGroup_component_1 = require("./menuGroup.component");
jest.useFakeTimers();
describe('@menu-item: component checks', () => {
    const TestMenuItem = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(menuItem_component_1.MenuItem, Object.assign({}, props))));
    it('should render text passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to title prop as pure JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { title: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { title: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render functional components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const AccessoryRight = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toHaveBeenCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenuItem, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
});
describe('@menu: component checks', () => {
    const TestMenu = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(menu_component_1.Menu, Object.assign({}, props))));
    it('should render two menu items passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, null,
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1' }),
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2' })));
        expect(component.queryByText('Option 1')).toBeTruthy();
        expect(component.queryByText('Option 2')).toBeTruthy();
    });
    it('should call onSelect with non-grouped index', () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(1);
            expect(index.section).toBeFalsy();
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, { onSelect: onSelect },
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1' }),
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2' })));
        react_native_testing_library_1.fireEvent.press(component.queryByText('Option 2'));
    });
    it('should call onSelect with grouped index', () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(0);
            expect(index.section).toEqual(1);
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, { onSelect: onSelect },
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { title: 'Group 1' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1.2' })),
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { title: 'Group 2' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.2' }))));
        react_native_testing_library_1.fireEvent.press(component.queryByText('Option 2.1'));
    });
    it('should fire onPress on group with row = 0, section = undefined', () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(0);
            expect(index.section).toBeFalsy();
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, { onSelect: onSelect },
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { title: 'Group 1' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1.2' })),
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1' })));
        react_native_testing_library_1.fireEvent.press(component.queryByText('Group 1'));
    });
    it('should fire onPress on group with row = 1, section = undefined', () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(1);
            expect(index.section).toBeFalsy();
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, { onSelect: onSelect },
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1' }),
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { title: 'Group 2' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.2' })),
            react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 3' })));
        react_native_testing_library_1.fireEvent.press(component.queryByText('Group 2'));
    });
    it('should fire onPress event for group & item separately', () => {
        const onGroupPress = jest.fn();
        const onItemPress = jest.fn();
        const onSelect = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestMenu, { onSelect: onSelect },
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { onPress: onGroupPress, title: 'Group 1' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { onPress: onItemPress, title: 'Option 1.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1.2' })),
            react_1.default.createElement(menuGroup_component_1.MenuGroup, { title: 'Group 2' },
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2.2' }))));
        react_native_testing_library_1.fireEvent.press(component.queryByText('Group 1'));
        expect(onGroupPress).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.queryByText('Option 1.1'));
        expect(onItemPress).toBeCalledTimes(1);
        expect(onSelect).toBeCalledTimes(2);
    });
});
//# sourceMappingURL=menu.spec.js.map