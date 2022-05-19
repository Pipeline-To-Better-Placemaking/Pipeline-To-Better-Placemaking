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
const iconRegistry_component_1 = require("./iconRegistry.component");
const icon_component_1 = require("./icon.component");
const DefaultIcon = {
    toReactElement: (props) => (react_1.default.createElement(react_native_1.View, Object.assign({ testID: 'default' }, props))),
};
const AdditionalIcon = {
    toReactElement: (props) => (react_1.default.createElement(react_native_1.View, Object.assign({ testID: 'additional' }, props))),
};
const testIconPack1 = {
    name: 'test-icon-pack',
    icons: {
        home: DefaultIcon,
        gear: DefaultIcon,
    },
};
const testIconPack2 = {
    name: 'additional-icon-pack',
    icons: {
        home: AdditionalIcon,
    },
};
describe('@icon: component checks', () => {
    beforeAll(() => {
        react_native_testing_library_1.render(react_1.default.createElement(iconRegistry_component_1.IconRegistry, { icons: [testIconPack1, testIconPack2], defaultIcons: testIconPack1.name }));
        /*
         * Prevent posting output to console
         */
        jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('should render icon from default pack', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'home' }));
        expect(component.queryByTestId('default')).toBeTruthy();
    });
    it('should render icon from additional pack', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'home', pack: 'additional-icon-pack' }));
        expect(component.queryByTestId('additional')).toBeTruthy();
    });
    it('should pass props to an icon component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'home', testID: 'custom-test-id' }));
        expect(component.queryByTestId('custom-test-id')).toBeTruthy();
    });
    it('should throw while rendering not registered icon', () => {
        expect(() => {
            react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'not-registered-icon' }));
        }).toThrowError();
        expect(() => {
            react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'not-registered-icon', pack: 'additional-icon-pack' }));
        }).toThrowError();
    });
    it('should throw while rendering icon from not registered pack', () => {
        expect(() => {
            react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'home', pack: 'not-registered-pack' }));
        }).toThrowError();
    });
    it('should render without an animation if animation is null', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(icon_component_1.Icon, { name: 'home', animation: null }));
        expect(() => component.UNSAFE_getByType(react_native_1.Animated.View)).toThrow();
    });
});
//# sourceMappingURL=icon.spec.js.map