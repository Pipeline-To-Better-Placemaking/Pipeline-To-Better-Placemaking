"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const themeProvider_component_1 = require("./themeProvider.component");
const withStyles_1 = require("./withStyles");
const theme_service_1 = require("./theme.service");
const styleProvider_component_1 = require("../style/styleProvider.component");
const eva_1 = require("@eva-design/eva");
const theme = {
    defaultColor: '#000000',
    disabledColor: '#646464',
    activeColor: '#3366FF',
    refValue: '$defaultColor',
    doubleRefValue: '$refValue',
};
describe('@theme: service checks', () => {
    it('finds theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('defaultColor', theme);
        const undefinedValue = theme_service_1.ThemeService.getValue('undefined', theme);
        expect(themeValue).toEqual(theme.defaultColor);
        expect(undefinedValue).toBeFalsy();
    });
    it('finds referencing theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('refValue', theme);
        expect(themeValue).toEqual(theme.defaultColor);
    });
    it('finds multiple referencing theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('doubleRefValue', theme);
        expect(themeValue).toEqual(theme.defaultColor);
    });
});
describe('@theme: ui component checks', () => {
    const themeConsumerTestId = '@theme/consumer';
    const themeChangeTouchableTestId = '@theme/btnChangeTheme';
    const Sample = (props) => (react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: themeConsumerTestId })));
    const ThemeChangingComponent = (props) => {
        const [currentTheme, setCurrentTheme] = react_1.default.useState(props.theme);
        const ThemedComponent = withStyles_1.withStyles(Sample);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(themeProvider_component_1.ThemeProvider, { theme: currentTheme },
                react_1.default.createElement(ThemedComponent, null)),
            react_1.default.createElement(react_native_1.TouchableOpacity, { testID: themeChangeTouchableTestId, onPress: () => setCurrentTheme(props.themeInverse) })));
    };
    it('withStyles component should not re-renderer because of parent render', async () => {
        const rerenderButtonText = 'Rerender parent';
        const getRenderCountText = (elementType, count) => {
            return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
        };
        const ChildComponent = react_1.default.memo(() => {
            const counter = react_1.useRef(0);
            counter.current++;
            return (react_1.default.createElement(react_native_1.Text, null, getRenderCountText('Child', counter.current)));
        });
        const ChildComponentWithStyles = withStyles_1.withStyles(ChildComponent);
        const ParentComponent = () => {
            const [renderCount, setRenderCount] = react_1.useState(1);
            return react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setRenderCount(renderCount + 1) },
                    react_1.default.createElement(react_native_1.Text, null, rerenderButtonText)),
                react_1.default.createElement(react_native_1.Text, null, getRenderCountText('Parent', renderCount)),
                react_1.default.createElement(ChildComponentWithStyles, null));
        };
        const renderedComponent = react_native_testing_library_1.render(react_1.default.createElement(themeProvider_component_1.ThemeProvider, { theme: theme },
            react_1.default.createElement(ParentComponent, null)));
        react_native_testing_library_1.fireEvent.press(renderedComponent.getByText(rerenderButtonText));
        expect(renderedComponent.queryByText(getRenderCountText('Parent', 2))).toBeTruthy();
        expect(renderedComponent.queryByText(getRenderCountText('Child', 1))).toBeTruthy();
    });
    it('static methods are copied over', () => {
        // @ts-ignore: test-case
        Sample.staticMethod = function () {
        };
        const ThemedComponent = withStyles_1.withStyles(Sample);
        // @ts-ignore: test-case
        expect(ThemedComponent.staticMethod).not.toBeFalsy();
    });
    it('receives compiled theme', () => {
        const ThemedComponent = withStyles_1.withStyles(Sample);
        const component = react_native_testing_library_1.render(react_1.default.createElement(themeProvider_component_1.ThemeProvider, { theme: theme },
            react_1.default.createElement(ThemedComponent, null)));
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.theme).toEqual({
            defaultColor: '#000000',
            disabledColor: '#646464',
            activeColor: '#3366FF',
            refValue: '#000000',
            doubleRefValue: '#000000',
        });
    });
    it('receives custom theme', () => {
        const ThemedComponent = withStyles_1.withStyles(Sample);
        const component = react_native_testing_library_1.render(react_1.default.createElement(themeProvider_component_1.ThemeProvider, { theme: {
                ...theme,
                defaultColor: '#ffffff',
            } },
            react_1.default.createElement(ThemedComponent, null)));
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.theme).toEqual({
            defaultColor: '#ffffff',
            disabledColor: '#646464',
            activeColor: '#3366FF',
            refValue: '#ffffff',
            doubleRefValue: '#ffffff',
        });
    });
    it('receives style prop', () => {
        const ThemedComponent = withStyles_1.withStyles(Sample, contextTheme => ({
            container: { backgroundColor: contextTheme.defaultColor },
        }));
        const component = react_native_testing_library_1.render(react_1.default.createElement(themeProvider_component_1.ThemeProvider, { theme: theme },
            react_1.default.createElement(ThemedComponent, null)));
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.style).toEqual({
            container: { backgroundColor: '#000000' },
        });
    });
    it('receives new theme when it is changed', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(ThemeChangingComponent, { theme: theme, themeInverse: {
                ...theme,
                defaultColor: '#ffffff',
            } }));
        const touchableComponent = component.getByTestId(themeChangeTouchableTestId);
        react_native_testing_library_1.fireEvent.press(touchableComponent);
        const themedComponent = await react_native_testing_library_1.waitForElement(() => {
            return component.getByTestId(themeConsumerTestId);
        });
        expect(themedComponent.props.eva.theme.defaultColor).toEqual('#ffffff');
    });
});
describe('@useTheme: rendering performance check', () => {
    const styleTouchableTestId = '@style/touchable';
    const themes = {
        light: {
            defaultColor: 'white',
        },
        dark: {
            defaultColor: 'black',
        }
    };
    const ThemeChangingProvider = (props) => {
        return (react_1.default.createElement(styleProvider_component_1.StyleProvider, { styles: props.styles, theme: props.theme },
            react_1.default.createElement(react_native_1.TouchableOpacity, { testID: styleTouchableTestId, onPress: props.onPress },
                react_1.default.createElement(react_native_1.Text, { style: { color: theme.defaultColor } }, `${props.value}`))));
    };
    it('changing theme should force new render', async () => {
        const themeFuncMock = jest.fn();
        const ChildComponent = (props) => {
            react_1.default.useEffect(() => {
                themeFuncMock();
            });
            return react_1.default.createElement(ThemeChangingProvider, Object.assign({}, props));
        };
        const Component = () => {
            const [theme, setTheme] = react_1.default.useState(themes.dark);
            const changeTheme = () => {
                setTheme(theme.defaultColor === 'white' ? themes.dark : themes.light);
            };
            return (react_1.default.createElement(ChildComponent, { styles: eva_1.mapping, theme: theme, onPress: changeTheme, value: theme.defaultColor }));
        };
        const component = react_native_testing_library_1.render(react_1.default.createElement(Component, null));
        expect(themeFuncMock).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(themeFuncMock).toBeCalledTimes(2);
    });
    it('not changing theme value state should not force component to render', async () => {
        const themeFuncMock = jest.fn();
        const ChildComponent = (props) => {
            react_1.default.useEffect(() => {
                themeFuncMock();
            });
            return react_1.default.createElement(ThemeChangingProvider, Object.assign({}, props));
        };
        const Component = () => {
            const [theme, setTheme] = react_1.default.useState(themes.dark);
            const changeTheme = () => {
                setTheme(themes.dark);
            };
            return (react_1.default.createElement(ChildComponent, { styles: eva_1.mapping, theme: theme, onPress: changeTheme, value: theme.defaultColor }));
        };
        const component = react_native_testing_library_1.render(react_1.default.createElement(Component, null));
        expect(themeFuncMock).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(themeFuncMock).toBeCalledTimes(1);
    });
});
//# sourceMappingURL=theme.spec.js.map