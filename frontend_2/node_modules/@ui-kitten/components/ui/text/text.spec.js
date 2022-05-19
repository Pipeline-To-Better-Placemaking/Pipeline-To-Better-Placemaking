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
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const text_component_1 = require("./text.component");
describe('@text: component checks', () => {
    const TestText = (props) => (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(text_component_1.Text, Object.assign({}, props))));
    it('should render text passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestText, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to children', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestText, null,
            react_1.default.createElement(text_component_1.Text, null, "I love Babel")));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
//# sourceMappingURL=text.spec.js.map