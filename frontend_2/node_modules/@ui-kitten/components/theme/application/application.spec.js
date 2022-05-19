"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_testing_library_1 = require("react-native-testing-library");
const eva = __importStar(require("@eva-design/eva"));
const applicationProvider_component_1 = require("./applicationProvider.component");
it('should be able to provide styles to all `styled` components in the library', () => {
    const component = react_native_testing_library_1.render(react_1.default.createElement(applicationProvider_component_1.ApplicationProvider, { mapping: eva.mapping, theme: eva.light }));
    const { instance } = component.getByType(applicationProvider_component_1.ApplicationProvider);
    const styleKeys = Object.keys(instance.state.styles);
    expect(styleKeys).toContain('Avatar');
    expect(styleKeys).toContain('BottomNavigation');
    expect(styleKeys).toContain('BottomNavigationTab');
    expect(styleKeys).toContain('Button');
    expect(styleKeys).toContain('ButtonGroup');
    expect(styleKeys).toContain('Card');
    expect(styleKeys).toContain('Calendar');
    expect(styleKeys).toContain('CheckBox');
    expect(styleKeys).toContain('Divider');
    expect(styleKeys).toContain('Drawer');
    expect(styleKeys).toContain('Input');
    expect(styleKeys).toContain('Layout');
    expect(styleKeys).toContain('List');
    expect(styleKeys).toContain('ListItem');
    expect(styleKeys).toContain('Menu');
    expect(styleKeys).toContain('OverflowMenu');
    expect(styleKeys).toContain('Select');
    expect(styleKeys).toContain('Spinner');
    expect(styleKeys).toContain('Tab');
    expect(styleKeys).toContain('TabBar');
    expect(styleKeys).toContain('Text');
    expect(styleKeys).toContain('Toggle');
    expect(styleKeys).toContain('Tooltip');
    expect(styleKeys).toContain('TopNavigation');
    expect(styleKeys).toContain('TopNavigationAction');
});
//# sourceMappingURL=application.spec.js.map