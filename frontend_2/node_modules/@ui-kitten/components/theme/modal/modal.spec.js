"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const modalPanel_component_1 = require("./modalPanel.component");
const modal_service_1 = require("./modal.service");
describe('@modal-panel: component checks', () => {
    it('should set service instance when becomes mounted', () => {
        react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        expect(modal_service_1.ModalService.panel).toBeTruthy();
    });
    it('should clean service instance when becomes unmounted', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        component.unmount();
        expect(modal_service_1.ModalService.panel).toBeFalsy();
    });
});
describe('@modal-service: service checks', () => {
    it('should do nothing on show if there is no ModalPanel', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(react_native_1.View, null));
        const id = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        const text = component.queryByText('I love Babel');
        expect(id).toBeFalsy();
        expect(text).toBeFalsy();
    });
    it('should do nothing on update if there is no ModalPanel', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(react_native_1.View, null));
        modal_service_1.ModalService.update('random-id', react_1.default.createElement(react_native_1.Text, null, "I love Babel"));
        expect(component.queryByText('I love Babel')).toBeFalsy();
    });
    it('should do nothing on hide if there is no ModalPanel', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(react_native_1.View, null));
        const id = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        expect(id).toBeFalsy();
        expect(component.queryByText('I love Babel')).toBeFalsy();
        const newId = modal_service_1.ModalService.hide(id);
        expect(newId).toBeFalsy();
    });
    it('should render element and return it\'s id', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        const id = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        const text = component.queryByText('I love Babel');
        expect(id).toBeTruthy();
        expect(text).toBeTruthy();
    });
    it('should render multiple elements with unique ids', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        const firstId = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        const secondId = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Jest"), {});
        const firstElement = component.queryByText('I love Babel');
        const secondElement = component.queryByText('I love Jest');
        expect(firstElement).toBeTruthy();
        expect(secondElement).toBeTruthy();
        expect(firstId).not.toEqual(secondId);
    });
    it('should update rendered element by it\'s id', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        const id = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        modal_service_1.ModalService.update(id, react_1.default.createElement(react_native_1.Text, null, "I love Jest"));
        expect(component.queryByText('I love Babel')).toBeFalsy();
        expect(component.queryByText('I love Jest')).toBeTruthy();
    });
    it('should do nothing on update if there is no element with id', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Babel"), {});
        modal_service_1.ModalService.update('random-id', react_1.default.createElement(react_native_1.Text, null, "I love Jest"));
        expect(component.queryByText('I love Babel')).toBeTruthy();
        expect(component.queryByText('I love Jest')).toBeFalsy();
    });
    it('should hide rendered element by it\'s id and clear it\'s id', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(modalPanel_component_1.ModalPanel, null, "Test"));
        const id = modal_service_1.ModalService.show(react_1.default.createElement(react_native_1.Text, null, "I love Jest"), {});
        expect(component.queryByText('I love Jest')).toBeTruthy();
        const newId = modal_service_1.ModalService.hide(id);
        expect(component.queryByText('I love Jest')).toBeFalsy();
        expect(newId).toBeFalsy();
    });
});
//# sourceMappingURL=modal.spec.js.map