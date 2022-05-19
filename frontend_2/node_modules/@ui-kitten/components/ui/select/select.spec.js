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
const text_component_1 = require("../text/text.component");
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
const select_component_1 = require("./select.component");
const selectGroup_component_1 = require("./selectGroup.component");
const selectItem_component_1 = require("../select/selectItem.component");
const checkbox_component_1 = require("../checkbox/checkbox.component");
/*
 * Mock UIManager since Select relies on native measurements
 * Mock Animated for testing animation callbacks
 */
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    ActualReactNative.Animated = {
        ...ActualReactNative.Animated,
        timing: () => ({
            start: (callback) => {
                callback();
            },
        }),
    };
    return ActualReactNative;
});
describe('@select-item: component checks', () => {
    const TestSelectItem = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(selectItem_component_1.SelectItem, Object.assign({}, props))));
    it('should render text passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { title: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to title prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { title: props => react_1.default.createElement(text_component_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toHaveBeenCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toHaveBeenCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelectItem, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toHaveBeenCalled();
    });
});
describe('@select: component checks', () => {
    const TestSelect = react_1.default.forwardRef((props, ref) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        const onSelect = (index) => {
            setSelectedIndex(index);
            props.onSelect && props.onSelect(index);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(select_component_1.Select, Object.assign({ ref: ref }, props, { selectedIndex: selectedIndex, onSelect: onSelect }),
                react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 1' }),
                react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 2' }))));
    });
    /*
     * In this test:
     * [0] for modal control touchable
     * [1] for modal backdrop
     * ...rest for options
     */
    const touchables = {
        findControlTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[0],
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
        findOptionTouchable: (api, index) => api.queryAllByType(react_native_1.TouchableOpacity)[index + 2],
    };
    it('should render placeholder', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { placeholder: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render placeholder as function component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { placeholder: props => react_1.default.createElement(text_component_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render placeholder as pure JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { placeholder: react_1.default.createElement(text_component_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { label: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as function component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { label: props => react_1.default.createElement(text_component_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as pure JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { label: react_1.default.createElement(text_component_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { caption: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as function component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { caption: props => react_1.default.createElement(text_component_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as pure JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { caption: react_1.default.createElement(text_component_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } })));
        const AccessoryRight = (props) => (react_1.default.createElement(react_native_1.Image, Object.assign({}, props, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } })));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' } }));
        const AccessoryRight = (react_1.default.createElement(react_native_1.Image, { source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' } }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { accessoryLeft: AccessoryLeft, accessoryRight: AccessoryRight }));
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should not render options when not focused', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, null));
        expect(component.queryByText('Option 1')).toBeFalsy();
        expect(component.queryByText('Option 2')).toBeFalsy();
    });
    it('should render options when becomes focused', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, null));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const firstOption = await react_native_testing_library_1.waitForElement(() => component.queryByText('Option 1'));
        const secondOption = component.queryByText('Option 2');
        expect(firstOption).toBeTruthy();
        expect(secondOption).toBeTruthy();
    });
    it('should hide options when backdrop is pressed', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, null));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        const firstOption = await react_native_testing_library_1.waitForElement(() => touchables.findOptionTouchable(component, 0));
        const secondOption = component.queryByText('Option 2');
        expect(firstOption).toBeFalsy();
        expect(secondOption).toBeFalsy();
    });
    it('should call onSelect with single option index', async () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(1);
            expect(index.section).toBeFalsy();
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        await react_native_testing_library_1.waitForElement(() => null);
        react_native_testing_library_1.fireEvent.press(touchables.findOptionTouchable(component, 1));
    });
    it('should call onSelect with array of indices', async () => {
        const onSelect = jest.fn((indices) => {
            const [firstIndex, secondIndex, ...restIndices] = indices;
            expect(firstIndex.row).toEqual(0);
            expect(firstIndex.section).toBeFalsy();
            expect(secondIndex.row).toEqual(1);
            expect(secondIndex.section).toBeFalsy();
            expect(restIndices.length).toEqual(0);
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { multiSelect: true, selectedIndex: [new devsupport_1.IndexPath(0)], onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const optionTouchable = await react_native_testing_library_1.waitForElement(() => component.queryByText('Option 2'));
        react_native_testing_library_1.fireEvent.press(optionTouchable);
    });
    it('should render checkboxes when multiselect', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { multiSelect: true }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const checkboxes = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(checkbox_component_1.CheckBox));
        expect(checkboxes.length).toEqual(2);
    });
    it('should call onSelect when pressing checkbox', async () => {
        const onSelect = jest.fn((indices) => {
            expect(indices[0].row).toEqual(1);
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { multiSelect: true, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const option2Checkbox = await react_native_testing_library_1.waitForElement(() => component.queryAllByType(checkbox_component_1.CheckBox)[1]);
        react_native_testing_library_1.fireEvent.press(option2Checkbox);
    });
    it('should call onFocus', async () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        await react_native_testing_library_1.waitForElement(() => expect(onFocus).toHaveBeenCalled());
    });
    it('should call onBlur', async () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        await react_native_testing_library_1.waitForElement(() => null);
        react_native_testing_library_1.fireEvent.press(touchables.findBackdropTouchable(component));
        await react_native_testing_library_1.waitForElement(() => expect(onBlur).toHaveBeenCalled());
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(touchables.findControlTouchable(component), 'pressIn');
        expect(onPressIn).toHaveBeenCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(touchables.findControlTouchable(component), 'pressOut');
        expect(onPressOut).toHaveBeenCalled();
    });
    it('should be able to call focus with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.focus).toBeTruthy();
        componentRef.current.focus();
    });
    it('should be able to call blur with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.blur).toBeTruthy();
        componentRef.current.blur();
    });
    it('should be able to call isFocused with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.isFocused).toBeTruthy();
        componentRef.current.isFocused();
    });
    it('should be able to call clear with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.clear).toBeTruthy();
        componentRef.current.clear();
    });
    it('should be able to call show with ref', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.show).toBeTruthy();
        componentRef.current.show();
    });
    it('should be able to call hide with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { ref: componentRef }));
        expect(componentRef.current.hide).toBeTruthy();
        componentRef.current.hide();
    });
});
describe('@select: component checks with groups', () => {
    const TestSelect = react_1.default.forwardRef((props, ref) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        const onSelect = (index) => {
            setSelectedIndex(index);
            props.onSelect && props.onSelect(index);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(select_component_1.Select, Object.assign({ ref: ref }, props, { selectedIndex: selectedIndex, onSelect: onSelect }),
                react_1.default.createElement(selectGroup_component_1.SelectGroup, { title: 'Group 1' },
                    react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 1.1' }),
                    react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 1.2' })),
                react_1.default.createElement(selectGroup_component_1.SelectGroup, { title: 'Group 2' },
                    react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 2.1' }),
                    react_1.default.createElement(selectItem_component_1.SelectItem, { title: 'Option 2.2' })))));
    });
    const touchables = {
        findControlTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[0],
    };
    it('should select single option in group', async () => {
        const onSelect = jest.fn((index) => {
            expect(index.row).toEqual(1);
            expect(index.section).toEqual(0);
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const option12Touchable = await react_native_testing_library_1.waitForElement(() => component.getByText('Option 1.2'));
        react_native_testing_library_1.fireEvent.press(option12Touchable);
    });
    it('should select options group', async () => {
        const onSelect = jest.fn((indices) => {
            const [firstIndex, secondIndex, ...restIndices] = indices;
            expect(firstIndex.row).toEqual(0);
            expect(firstIndex.section).toEqual(1);
            expect(secondIndex.row).toEqual(1);
            expect(secondIndex.section).toEqual(1);
            expect(restIndices.length).toEqual(0);
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestSelect, { multiSelect: true, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findControlTouchable(component));
        const group2Touchable = await react_native_testing_library_1.waitForElement(() => component.getByText('Group 2'));
        react_native_testing_library_1.fireEvent.press(group2Touchable);
    });
});
//# sourceMappingURL=select.spec.js.map