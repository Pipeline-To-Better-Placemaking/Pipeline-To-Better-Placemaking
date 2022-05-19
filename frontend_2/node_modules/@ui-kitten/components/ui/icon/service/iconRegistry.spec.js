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
const iconRegistry_service_1 = require("./iconRegistry.service");
const TestIcon = {
    toReactElement: () => (react_1.default.createElement(react_native_1.View, null)),
};
describe('@icon-registry: service checks', () => {
    beforeEach(() => {
        iconRegistry_service_1.IconRegistryService.register({
            name: 'test-icon-pack-1',
            icons: {
                home: TestIcon,
                gear: TestIcon,
            },
        }, {
            name: 'test-icon-pack-2',
            icons: {
                home: TestIcon,
            },
        });
        iconRegistry_service_1.IconRegistryService.setDefaultIconPack('test-icon-pack-1');
    });
    it('should register icon pack', () => {
        iconRegistry_service_1.IconRegistryService.register({
            name: 'additional-icon-pack',
            icons: {
                star: TestIcon,
            },
        });
        expect(iconRegistry_service_1.IconRegistryService.getIconPack('additional-icon-pack').name).toEqual('additional-icon-pack');
    });
    it('should register icon pack without overriding default', () => {
        iconRegistry_service_1.IconRegistryService.register({
            name: 'additional-icon-pack',
            icons: {
                home: TestIcon,
            },
        });
        expect(iconRegistry_service_1.IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
    });
    it('should throw when setting not registered pack as default', () => {
        expect(() => iconRegistry_service_1.IconRegistryService.setDefaultIconPack('not-registered-pack')).toThrowError();
    });
    it('should change default icon pack', () => {
        iconRegistry_service_1.IconRegistryService.setDefaultIconPack('test-icon-pack-2');
        expect(iconRegistry_service_1.IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-2');
    });
    it('should set first pack as default', () => {
        expect(iconRegistry_service_1.IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
    });
    it('should return icon from default pack', () => {
        expect(iconRegistry_service_1.IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
    });
    it('should return icon from specified pack', () => {
        expect(iconRegistry_service_1.IconRegistryService.getIcon('home', 'test-icon-pack-2').pack).toEqual('test-icon-pack-2');
    });
    it('should throw for getting not registered icon', () => {
        expect(() => iconRegistry_service_1.IconRegistryService.getIcon('not-registered-pack')).toThrowError();
    });
    it('should throw for getting icon from not registered pack', () => {
        expect(() => iconRegistry_service_1.IconRegistryService.getIcon('home', 'not-registered-pack')).toThrowError();
    });
});
//# sourceMappingURL=iconRegistry.spec.js.map