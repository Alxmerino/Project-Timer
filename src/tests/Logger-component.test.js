import Logger from '../js/components/Logger';

describe('Logger component', () => {
    const Debug = new Logger('Debug');

    it('should create a new Logger instance', () => {
        expect(Debug).toBeInstanceOf(Logger);
    });

    it('should call the log method', () => {
        let origFn = console.log;
        console.log = jest.fn();
        Debug.log()

        expect(console.log).toHaveBeenCalled();
        // Reset console
        console.log = origFn;
    });

    it('should call the debug method', () => {
        let origFn = console.debug;
        console.debug = jest.fn();
        Debug.debug()

        expect(console.debug).toHaveBeenCalled();
        // Reset console
        console.debug = origFn;
    });

    it('should call the warn method', () => {
        let origFn = console.warn;
        console.warn = jest.fn();
        Debug.warn()

        expect(console.warn).toHaveBeenCalled();
        // Reset console
        console.warn = origFn;
    });

    it('should call the error method', () => {
        let origFn = console.error;
        console.error = jest.fn();
        Debug.error()

        expect(console.error).toHaveBeenCalled();
        // Reset console
        console.error = origFn;
    });

    it('should return in debug mode when running log', () => {
        Debug.debugMode = false;

        expect(Debug.log()).toBeFalsy();
    });

    it('should return in debug mode when running debug', () => {
        Debug.debugMode = false;

        expect(Debug.debug()).toBeFalsy();
    });

    it('should return in debug mode when running warn', () => {
        Debug.debugMode = false;

        expect(Debug.warn()).toBeFalsy();
    });

    it('should return in debug mode when running error', () => {
        Debug.debugMode = false;

        expect(Debug.error()).toBeFalsy();
    });
});
