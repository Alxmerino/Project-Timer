import Storage from '../js/helpers/Storage';
import xStore from 'xStore';

describe('Local Storage', () => {
    it('should be an object', () => {
        expect(Storage).toEqual(expect.any(Object));
    });
});

