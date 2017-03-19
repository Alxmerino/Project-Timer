import Storage from '../src/js/helpers/Storage';
import xStore from 'xStore';

describe('Local Storage', () => {
    it('should be an instance of xStore', () => {
        expect(Storage).toBeInstanceOf(xStore);
    });
});

