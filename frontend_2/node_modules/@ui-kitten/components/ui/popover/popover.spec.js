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
const devsupport_1 = require("../../devsupport");
const popover_component_1 = require("./popover.component");
const type_1 = require("./type");
/*
 * Mock UIManager since Popover relies on native measurements
 */
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
describe('@popover: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    /*
     * In this test:
     * [0] for popover anchor
     * [1] for modal backdrop
     */
    const touchables = {
        findToggleButton: (api) => api.queryByTestId('@popover/toggle-button'),
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    const TestPopover = react_1.default.forwardRef((props, ref) => {
        const [visible, setVisible] = react_1.default.useState(props.visible);
        const togglePopover = () => {
            setVisible(!visible);
        };
        const AnchorButton = () => (react_1.default.createElement(react_native_1.Button, { testID: '@popover/toggle-button', title: '', onPress: togglePopover }));
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(popover_component_1.Popover, Object.assign({ ref: ref, visible: visible, anchor: AnchorButton }, props),
                react_1.default.createElement(react_native_1.Text, null, "I love Babel"))));
    });
    it('should render element passed to `anchor` prop', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, null));
        expect(touchables.findToggleButton(component)).toBeTruthy();
    });
    it('should not render content when not visible', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, { visible: false }));
        expect(component.queryByText('I love Babel')).toBeFalsy();
    });
    it('should render content when becomes visible', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, null));
        react_native_testing_library_1.fireEvent.press(component.queryByTestId('@popover/toggle-button'));
        const text = await react_native_testing_library_1.waitForElement(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should call onBackdropPress', async () => {
        const onBackdropPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, { onBackdropPress: onBackdropPress }));
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await react_native_testing_library_1.waitForElement(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findBackdropTouchable(component));
        });
        expect(onBackdropPress).toBeCalled();
    });
    it('should style backdrop with backdropStyle prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, { backdropStyle: { backgroundColor: 'red' } }));
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        expect(react_native_1.StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
    });
    it('should be able to show with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, { ref: componentRef }));
        componentRef.current.show();
        const text = await react_native_testing_library_1.waitForElement(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should be able to hide with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestPopover, { ref: componentRef }));
        componentRef.current.show();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.hide();
        const text = await react_native_testing_library_1.waitForElement(() => component.queryByText('I love Babel'));
        expect(text).toBeFalsy();
    });
});
describe('@popover: service checks', () => {
    const options = {
        source: new devsupport_1.Frame(6, 6, 2, 2),
        other: new devsupport_1.Frame(2, 2, 4, 4),
        offsets: devsupport_1.Frame.zero(),
        bounds: devsupport_1.Frame.zero(),
    };
    it('* left', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT.frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(3);
    });
    it('* left start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_START.frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(2);
    });
    it('* left end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_END.frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(4);
    });
    it('* top', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP.frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(0);
    });
    it('* top start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_START.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(0);
    });
    it('* top end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_END.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(0);
    });
    it('* right', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT.frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(3);
    });
    it('* right start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_START.frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(2);
    });
    it('* right end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_END.frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(4);
    });
    it('* bottom', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM.frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(6);
    });
    it('* bottom start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_START.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(6);
    });
    it('* bottom end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_END.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(6);
    });
});
describe('* placement - offset', () => {
    const options = {
        source: new devsupport_1.Frame(6, 6, 2, 2),
        other: new devsupport_1.Frame(2, 2, 4, 4),
        bounds: devsupport_1.Frame.zero(),
        offsets: new devsupport_1.Frame(2, 2, 2, 2),
    };
    it('* left', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(3);
    });
    it('* left start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_START.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(4);
    });
    it('* left end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_END.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(2);
    });
    it('* top', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP.frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(2);
    });
    it('* top start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_START.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(2);
    });
    it('* top end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_END.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(2);
    });
    it('* right', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(3);
    });
    it('* right start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_START.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(4);
    });
    it('* right end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_END.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(2);
    });
    it('* bottom', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM.frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(4);
    });
    it('* bottom start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_START.frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(4);
    });
    it('* bottom end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_END.frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(4);
    });
});
describe('* placement - reverse', () => {
    const options = {
        source: new devsupport_1.Frame(6, 6, 2, 2),
        other: new devsupport_1.Frame(2, 2, 4, 4),
        bounds: devsupport_1.Frame.zero(),
        offsets: devsupport_1.Frame.zero(),
    };
    it('* left', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT.reverse().frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(3);
    });
    it('* left start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_START.reverse().frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(2);
    });
    it('* left end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.LEFT_END.reverse().frame(options);
        expect(x).toEqual(6);
        expect(y).toEqual(4);
    });
    it('* top', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP.reverse().frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(6);
    });
    it('* top start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_START.reverse().frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(6);
    });
    it('* top end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.TOP_END.reverse().frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(6);
    });
    it('* right', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT.reverse().frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(3);
    });
    it('* right start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_START.reverse().frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(2);
    });
    it('* right end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.RIGHT_END.reverse().frame(options);
        expect(x).toEqual(0);
        expect(y).toEqual(4);
    });
    it('* bottom', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM.reverse().frame(options);
        expect(x).toEqual(3);
        expect(y).toEqual(0);
    });
    it('* bottom start', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_START.reverse().frame(options);
        expect(x).toEqual(2);
        expect(y).toEqual(0);
    });
    it('* bottom end', () => {
        const { origin: { x, y } } = type_1.PopoverPlacements.BOTTOM_END.reverse().frame(options);
        expect(x).toEqual(4);
        expect(y).toEqual(0);
    });
});
describe('* raw constructor', () => {
    it('* left', () => {
        const placement = type_1.PopoverPlacements.parse('left');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.LEFT.rawValue);
    });
    it('* left start', () => {
        const placement = type_1.PopoverPlacements.parse('left start');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.LEFT_START.rawValue);
    });
    it('* left end', () => {
        const placement = type_1.PopoverPlacements.parse('left end');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.LEFT_END.rawValue);
    });
    it('* top', () => {
        const placement = type_1.PopoverPlacements.parse('top');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.TOP.rawValue);
    });
    it('* top start', () => {
        const placement = type_1.PopoverPlacements.parse('top start');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.TOP_START.rawValue);
    });
    it('* top end', () => {
        const placement = type_1.PopoverPlacements.parse('top end');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.TOP_END.rawValue);
    });
    it('* right', () => {
        const placement = type_1.PopoverPlacements.parse('right');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.RIGHT.rawValue);
    });
    it('* right start', () => {
        const placement = type_1.PopoverPlacements.parse('right start');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.RIGHT_START.rawValue);
    });
    it('* right end', () => {
        const placement = type_1.PopoverPlacements.parse('right end');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.RIGHT_END.rawValue);
    });
    it('* bottom', () => {
        const placement = type_1.PopoverPlacements.parse('bottom');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.BOTTOM.rawValue);
    });
    it('* bottom start', () => {
        const placement = type_1.PopoverPlacements.parse('bottom start');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.BOTTOM_START.rawValue);
    });
    it('* bottom end', () => {
        const placement = type_1.PopoverPlacements.parse('bottom end');
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.BOTTOM_END.rawValue);
    });
    it('* fallback', () => {
        const placement = type_1.PopoverPlacements.parse('undefined', type_1.PopoverPlacements.BOTTOM);
        expect(placement.rawValue).toEqual(type_1.PopoverPlacements.BOTTOM.rawValue);
    });
});
//# sourceMappingURL=popover.spec.js.map