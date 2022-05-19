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
const overflowMenu_component_1 = require("./overflowMenu.component");
const menuItem_component_1 = require("../menu/menuItem.component");
/*
 * Mock UIManager since OverflowMenu relies on native measurements
 */
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
describe('@overflow-menu: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    /*
     * In this test:
     * [0] for `anchor` component
     * [1] for modal backdrop
     */
    const touchables = {
        findToggleButton: (api) => api.queryByTestId('@overflow-menu/toggle-button'),
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    const TestOverflowMenu = react_1.default.forwardRef((props, ref) => {
        const [visible, setVisible] = react_1.default.useState(props.visible);
        const toggleOverflowMenu = () => {
            setVisible(!visible);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(overflowMenu_component_1.OverflowMenu, Object.assign({ ref: ref, visible: visible, anchor: () => react_1.default.createElement(react_native_1.Button, { testID: '@overflow-menu/toggle-button', title: '', onPress: toggleOverflowMenu }) }, props),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 1' }),
                react_1.default.createElement(menuItem_component_1.MenuItem, { title: 'Option 2' }))));
    });
    it('should render element passed to `anchor` prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, null));
        expect(touchables.findToggleButton(component)).toBeTruthy();
    });
    it('should not render content when not visible', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { visible: false }));
        const options = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(menuItem_component_1.MenuItem));
        expect(options.length).toEqual(0);
    });
    it('should render content when becomes visible', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { visible: true }));
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const options = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(menuItem_component_1.MenuItem));
        expect(options.length).toEqual(2);
    });
    it('should call onBackdropPress', async () => {
        const onBackdropPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { onBackdropPress: onBackdropPress }));
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await react_native_testing_library_1.waitForElement(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findBackdropTouchable(component));
        });
        expect(onBackdropPress).toBeCalled();
    });
    it('should style backdrop with backdropStyle prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { backdropStyle: { backgroundColor: 'red' } }));
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        expect(react_native_1.StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
    });
    it('should be able to show with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { ref: componentRef }));
        componentRef.current.show();
        const options = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(menuItem_component_1.MenuItem));
        expect(options.length).toEqual(2);
    });
    it('should be able to hide with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestOverflowMenu, { ref: componentRef }));
        componentRef.current.show();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.hide();
        const options = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(menuItem_component_1.MenuItem));
        expect(options.length).toEqual(0);
    });
});
//# sourceMappingURL=overflowMenu.spec.js.map