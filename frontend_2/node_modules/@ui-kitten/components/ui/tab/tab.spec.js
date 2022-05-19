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
const tab_component_1 = require("./tab.component");
const tabBar_component_1 = require("./tabBar.component");
const tabView_component_1 = require("./tabView.component");
const tabIndicator_component_1 = require("../shared/tabIndicator.component");
describe('@tab: component checks', () => {
    const TestTab = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(tab_component_1.Tab, Object.assign({}, props))));
    it('should render function image component passed to icon prop', () => {
        const Icon = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTab, { icon: Icon }));
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render JSX image component passed to icon prop', () => {
        const Icon = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTab, { icon: Icon }));
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render string passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTab, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTab, { title: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTab, { title: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
describe('@tab-bar: component checks', () => {
    const TestTabBar = (props) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(tabBar_component_1.TabBar, Object.assign({ selectedIndex: selectedIndex, onSelect: setSelectedIndex }, props),
                react_1.default.createElement(tab_component_1.Tab, { title: 'Tab 0' }),
                react_1.default.createElement(tab_component_1.Tab, { title: 'Tab 1' }))));
    };
    const touchables = {
        findTabTouchable: (api, index) => api.queryAllByType(react_native_1.TouchableOpacity)[index],
    };
    it('should render 2 tabs passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabBar, null));
        expect(component.queryAllByType(tab_component_1.Tab).length).toEqual(2);
    });
    it('should set tab selected by passing selectedIndex prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabBar, { selectedIndex: 1 }));
        expect(component.queryAllByType(tab_component_1.Tab)[1].props.selected).toEqual(true);
    });
    it('should set tab selected by pressing it', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabBar, null));
        react_native_testing_library_1.fireEvent.press(touchables.findTabTouchable(component, 1));
        expect(component.queryAllByType(tab_component_1.Tab)[1].props.selected).toEqual(true);
    });
    it('should render tab indicator correctly', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabBar, { indicatorStyle: { width: 99, backgroundColor: 'red' } }));
        const el = component.UNSAFE_queryByType(tabIndicator_component_1.TabIndicator).children[0]
            .children[0]
            .children[0]
            .children[0];
        // default styles
        expect(el.props.style[0].width).toEqual('100%');
        expect(el.props.style[1][0].backgroundColor).toEqual('#3366FF');
        // custom styles
        expect(el.props.style[1][1].width).toEqual(99);
        expect(el.props.style[1][1].backgroundColor).toEqual('red');
    });
});
describe('@tab-view: component checks', () => {
    const TestTabView = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(tabView_component_1.TabView, Object.assign({}, props),
            react_1.default.createElement(tab_component_1.Tab, null,
                react_1.default.createElement(react_native_1.Text, null, "Tab 0")),
            react_1.default.createElement(tab_component_1.Tab, null,
                react_1.default.createElement(react_native_1.Text, null, "Tab 1")))));
    it('should render 2 tabs passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabView, null));
        expect(component.queryAllByType(tab_component_1.Tab).length).toEqual(2);
    });
    it('should render 2 content elements passed to tab children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabView, null));
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeTruthy();
    });
    it('should not render content elements if disabled by shouldLoadComponent prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabView, { shouldLoadComponent: index => index !== 1 }));
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeFalsy();
    });
    it('should render tab indicator correctly', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestTabView, { indicatorStyle: { width: 99, backgroundColor: 'red' } }));
        const el = component.UNSAFE_queryByType(tabIndicator_component_1.TabIndicator).children[0]
            .children[0]
            .children[0]
            .children[0];
        // default styles
        expect(el.props.style[0].width).toEqual('100%');
        expect(el.props.style[1][0].backgroundColor).toEqual('#3366FF');
        // custom styles
        expect(el.props.style[1][1].width).toEqual(99);
        expect(el.props.style[1][1].backgroundColor).toEqual('red');
    });
});
//# sourceMappingURL=tab.spec.js.map