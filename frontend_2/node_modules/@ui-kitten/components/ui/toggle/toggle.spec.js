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
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
const toggle_component_1 = require("./toggle.component");
describe('@toggle: component checks', () => {
    const TestToggle = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(toggle_component_1.Toggle, Object.assign({}, props))));
    const touchables = {
        findRootTouchable: (api) => api.queryByType(devsupport_1.TouchableWeb).children[0],
    };
    it('should request checking', async () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestToggle, { checked: false, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent(touchables.findRootTouchable(component), 'responderRelease');
        await react_native_testing_library_1.waitForElement(() => {
            expect(onCheckedChange).toBeCalledWith(true);
        });
    });
    it('should request unchecking', async () => {
        const onCheckedChange = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestToggle, { checked: true, onChange: onCheckedChange }));
        react_native_testing_library_1.fireEvent(touchables.findRootTouchable(component), 'responderRelease');
        await react_native_testing_library_1.waitForElement(() => {
            expect(onCheckedChange).toBeCalledWith(false);
        });
    });
    it('should render text', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestToggle, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text as function component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestToggle, null, props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestToggle, null,
            react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.Text, null, "I love Babel"))));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
//# sourceMappingURL=toggle.spec.js.map