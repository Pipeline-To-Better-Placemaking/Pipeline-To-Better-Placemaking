"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("react-native-eva-icons/icons");
const evaIcon_component_1 = require("./evaIcon.component");
exports.createIconsMap = () => {
    return new Proxy({}, {
        get(target, name) {
            return new evaIcon_component_1.EvaIcon(icons_1.findIconByName(name));
        },
    });
};
//# sourceMappingURL=createIconsMap.js.map