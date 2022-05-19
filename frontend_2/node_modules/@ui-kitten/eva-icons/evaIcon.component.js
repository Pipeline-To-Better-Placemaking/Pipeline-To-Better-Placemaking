"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class EvaIcon {
    constructor(content) {
        this.content = content;
    }
    toReactElement(props) {
        const Icon = this.content;
        const { style, ...svgProps } = props;
        // @ts-ignore - UI Kitten components pass here `tintColor`
        const fillColor = react_native_1.StyleSheet.flatten(style || {}).tintColor;
        return (react_1.default.createElement(Icon, Object.assign({ style: props.style, fill: fillColor }, svgProps)));
    }
}
exports.EvaIcon = EvaIcon;
//# sourceMappingURL=evaIcon.component.js.map