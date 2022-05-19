"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
describe('@measure: frame class instance checks', () => {
    const lhsFrame = new type_1.Frame(2, 2, 2, 2);
    const rhsFrame = new type_1.Frame(4, 4, 2, 2);
    it('left of', () => {
        const { origin: { x, y } } = rhsFrame.leftOf(lhsFrame);
        expect(x).toEqual(0);
        expect(y).toEqual(4);
    });
    it('top of', () => {
        const { origin: { x, y } } = rhsFrame.topOf(lhsFrame);
        expect(x).toEqual(4);
        expect(y).toEqual(0);
    });
    it('right of', () => {
        const { origin: { x, y } } = rhsFrame.rightOf(lhsFrame);
        expect(x).toEqual(4);
        expect(y).toEqual(4);
    });
    it('bottom of', () => {
        const { origin: { x, y } } = rhsFrame.bottomOf(lhsFrame);
        expect(x).toEqual(4);
        expect(y).toEqual(4);
    });
    it('center horizontal of', () => {
        const { origin: { x, y } } = rhsFrame.centerHorizontalOf(lhsFrame);
        expect(x).toEqual(2);
        expect(y).toEqual(4);
    });
    it('center vertical of', () => {
        const { origin: { x, y } } = rhsFrame.centerVerticalOf(lhsFrame);
        expect(x).toEqual(4);
        expect(y).toEqual(2);
    });
    it('center of', () => {
        const { origin: { x, y } } = rhsFrame.centerOf(lhsFrame);
        expect(x).toEqual(2);
        expect(y).toEqual(2);
    });
    it('point equals', () => {
        expect(type_1.Point.zero().equals(new type_1.Point(0, 0))).toBeTruthy();
        expect(type_1.Point.zero().equals(new type_1.Point(0, 1))).toBeFalsy();
        expect(type_1.Point.zero().equals(null)).toBeFalsy();
    });
    it('size equals', () => {
        expect(type_1.Size.zero().equals(new type_1.Size(0, 0))).toBeTruthy();
        expect(type_1.Size.zero().equals(new type_1.Size(0, 1))).toBeFalsy();
        expect(type_1.Size.zero().equals(null)).toBeFalsy();
    });
    it('frame equals', () => {
        expect(type_1.Frame.zero().equals(new type_1.Frame(0, 0, 0, 0))).toBeTruthy();
        expect(type_1.Frame.zero().equals(new type_1.Frame(0, 0, 0, 1))).toBeFalsy();
        expect(type_1.Frame.zero().equals(null)).toBeFalsy();
    });
});
//# sourceMappingURL=measure.spec.js.map