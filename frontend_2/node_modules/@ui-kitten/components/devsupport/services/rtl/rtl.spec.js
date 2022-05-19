"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtl_service_1 = require("./rtl.service");
describe('@i18n-layout: service checks', () => {
    it('* creates LTR style properly', () => {
        const i18nStyle = rtl_service_1.RTLService.ignoreRTL({
            alignContent: 'flex-start',
            alignItems: 'flex-end',
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            flexWrap: 'wrap-reverse',
        }, false);
        expect(i18nStyle).toEqual({
            alignContent: 'flex-start',
            alignItems: 'flex-end',
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            flexWrap: 'wrap-reverse',
        });
    });
    it('* creates RTL style properly', () => {
        const i18nStyle = rtl_service_1.RTLService.ignoreRTL({
            alignContent: 'flex-start',
            alignItems: 'flex-end',
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            flexWrap: 'wrap-reverse',
        }, true);
        expect(i18nStyle).toEqual({
            alignContent: 'flex-end',
            alignItems: 'flex-start',
            alignSelf: 'flex-end',
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
        });
    });
    it('* creates RTL style properly - partial', () => {
        const i18nStyle = rtl_service_1.RTLService.ignoreRTL({
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'row',
        }, true);
        expect(i18nStyle).toEqual({
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse',
        });
    });
});
//# sourceMappingURL=rtl.spec.js.map