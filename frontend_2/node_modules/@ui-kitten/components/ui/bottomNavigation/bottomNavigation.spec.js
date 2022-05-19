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
const bottomNavigation_component_1 = require("./bottomNavigation.component");
const bottomNavigationTab_component_1 = require("./bottomNavigationTab.component");
const tabIndicator_component_1 = require("../shared/tabIndicator.component");
describe('@bottom-navigation-tab: component checks', () => {
    const TestBottomNavigationTab = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(bottomNavigationTab_component_1.BottomNavigationTab, Object.assign({}, props))));
    it('should render component passed to icon prop', () => {
        const Icon = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { icon: Icon }));
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render text passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { title: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render title from prop passed as pure JSX element', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { title: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render icon from prop passed as pure JSX element', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { icon: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { onMouseEnter: onMouseEnter }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigationTab, { onMouseLeave: onMouseLeave }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
});
describe('@bottom-navigation: component checks', () => {
    const TestBottomNavigation = (props) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        const onSelect = (index) => {
            setSelectedIndex(index);
            props.onSelect && props.onSelect(index);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(bottomNavigation_component_1.BottomNavigation, Object.assign({}, props, { selectedIndex: selectedIndex, onSelect: onSelect }),
                react_1.default.createElement(bottomNavigationTab_component_1.BottomNavigationTab, { title: 'Tab 0' }),
                react_1.default.createElement(bottomNavigationTab_component_1.BottomNavigationTab, { title: 'Tab 1' }))));
    };
    it('should render 2 tabs passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, null));
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab).length).toEqual(2);
    });
    it('should set tab selected by passing selectedIndex prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, { selectedIndex: 1 }));
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab)[1].props.selected).toEqual(true);
    });
    it('should not render tab indicator', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, { appearance: 'noIndicator' }));
        expect(component.queryByType(tabIndicator_component_1.TabIndicator)).toEqual(null);
    });
    it('should render tab indicator correctly', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, { indicatorStyle: { width: 99, backgroundColor: 'red' } }));
        const el = component.queryByTestId('indicator body');
        const style = react_native_1.StyleSheet.flatten(el.props.style);
        expect(style.width).toEqual(99);
        expect(style.backgroundColor).toEqual('red');
    });
    it('should set tab selected by pressing it', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, { selectedIndex: 1 }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[0]);
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab)[0].props.selected).toEqual(true);
    });
    it('should request selecting', () => {
        const onSelect = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestBottomNavigation, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[1]);
        expect(onSelect).toHaveBeenCalledWith(1);
    });
});
//# sourceMappingURL=bottomNavigation.spec.js.map