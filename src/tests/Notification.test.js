import { TimerNotify,
         requestNotificationPermission } from '../js/utils/Notification';

describe('Notification utility', () => {

    it('should request notification permissions', () => {
        window.Notification = window.Notification || {}
        window.Notification.requestPermission = jest.fn();

        requestNotificationPermission();

        expect(window.Notification.requestPermission).toHaveBeenCalled();
    });

    it('should grant notification permissions', () => {
        window.Notification = window.Notification || {}
        window.Notification.permission = 'granted';

        expect(requestNotificationPermission()).toBeTruthy();
    });

    it('should fire a notification', () => {
        window.Notification = jest.fn();
        window.Notification.requestPermission = jest.fn();
        const expectedNotification = {}

        TimerNotify({
        timer: {
                title: 'Notification',
                duration: 10000,
                plannedTime: 50000,
            }
        });

        expect(window.Notification.requestPermission).toHaveBeenCalled();
    });

});
