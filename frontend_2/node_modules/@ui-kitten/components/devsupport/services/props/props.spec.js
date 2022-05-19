"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_service_1 = require("./props.service");
describe('@props: service checks', () => {
    const props = {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 32,
    };
    const textProps = [
        'color',
        'fontSize',
    ];
    it('should retrieve all text props', () => {
        const retrievedProps = props_service_1.PropsService.all(props, textProps);
        expect(retrievedProps).toEqual({
            color: 'white',
            fontSize: 32,
        });
    });
    it('should retrieve all text props and move rest props under `rest` key', () => {
        const retrievedProps = props_service_1.PropsService.allWithRest(props, textProps);
        const { rest, ...allOf } = retrievedProps;
        expect(allOf).toEqual({
            color: 'white',
            fontSize: 32,
        });
        expect(rest).toEqual({
            backgroundColor: 'black',
        });
    });
    it('should be able to work with falsy objects', () => {
        const allRetrievedProps = props_service_1.PropsService.all(undefined, textProps);
        const allWithRestRetrievedProps = props_service_1.PropsService.allWithRest(undefined, textProps);
        expect(allRetrievedProps).toEqual({});
        expect(allWithRestRetrievedProps).toEqual({
            rest: {},
        });
    });
});
//# sourceMappingURL=props.spec.js.map