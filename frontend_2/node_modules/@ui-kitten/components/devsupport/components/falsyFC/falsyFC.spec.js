"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const falsyFC_component_1 = require("./falsyFC.component");
it('should render nothing', function () {
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, null));
    expect(component.toJSON()).toEqual(null);
});
it('should render provided function component', () => {
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, { style: { color: 'red' }, component: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
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
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, { style: { color: 'red' }, component: props => react_1.default.createElement(HookComponent, Object.assign({}, props)) }));
    const textComponent = component.getByText('I love Babel 1');
    expect(textComponent).toBeTruthy();
});
it('should render fallback component', function () {
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, { component: null, fallback: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
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
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, { component: ComponentWithHooks }));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
});
it('should be able to render valid element', function () {
    const ComponentWithHooks = (props) => {
        return react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel");
    };
    const component = react_native_testing_library_1.render(react_1.default.createElement(falsyFC_component_1.FalsyFC, { style: { color: 'red' }, component: react_1.default.createElement(ComponentWithHooks, null) }));
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
    expect(textComponent.props.style).toEqual({
        color: 'red',
    });
});
//# sourceMappingURL=falsyFC.spec.js.map