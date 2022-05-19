"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const falsyText_component_1 = require("./falsyText.component");
const theme_1 = require("../../../theme");
it('should render nothing', function () {
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyText_component_1.FalsyText, null));
    expect(component.toJSON()).toEqual(null);
});
it('should render provided function component', function () {
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyText_component_1.FalsyText, { style: { color: 'red' }, component: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
    expect(textComponent.props.style).toEqual({
        color: 'red',
    });
});
it('should render provided function component with hooks', () => {
    const HookComponent = (props) => {
        const state = react_1.default.useState(1);
        return (react_1.default.createElement(react_native_1.Text, Object.assign({}, props),
            "I love Babel ",
            state));
    };
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyText_component_1.FalsyText, { style: { color: 'red' }, component: props => react_1.default.createElement(HookComponent, Object.assign({}, props)) }));
    const textComponent = component.getByText('I love Babel 1');
    expect(textComponent).toBeTruthy();
});
it('should render ui kitten text', function () {
    const component = react_native_testing_library_1.render(react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
        react_1.default.createElement(falsyText_component_1.FalsyText, { component: 'I love Babel' })));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
});
it('should be able to render components with hooks', function () {
    const ComponentWithHooks = () => {
        const [text, setText] = react_1.default.useState('');
        react_1.default.useEffect(() => {
            setText('I love Babel');
        }, []);
        return react_1.default.createElement(react_native_1.Text, null, text);
    };
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyText_component_1.FalsyText, { component: ComponentWithHooks }));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
});
it('should be able to render valid element', function () {
    const ComponentWithHooks = (props) => {
        return react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel");
    };
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyText_component_1.FalsyText, { style: { color: 'red' }, component: react_1.default.createElement(ComponentWithHooks, null) }));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
    expect(textComponent.props.style).toEqual({
        color: 'red',
    });
});
//# sourceMappingURL=falsyText.spec.js.map