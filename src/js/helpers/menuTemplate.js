const AppEvents = require('../enums/AppEvents');

const editMenu = {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Cmd+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+Cmd+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'Cmd+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'Cmd+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'Cmd+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'Cmd+A',
        role: 'selectall'
    }]
}

const selectionMenu = [
    {role: 'copy', accelerator: 'Cmd+C'},
    {type: 'separator'},
    {role: 'selectall', accelerator: 'Cmd+A'}
];

const windowMenu = (app) => {

    return {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'Cmd+M',
            role: 'minimize'
        }, {
            label: 'Close',
            accelerator: 'Cmd+W',
            key: 'hideWindow',
            click: () => {
                app.emit(AppEvents.CLOSE);
            }
        }, {
            type: 'separator'
        }, {
            label: 'Show Window',
            accelerator: 'Cmd+0',
            key: 'showWindow',
            click: () => {
                app.emit(AppEvents.ACTIVATE);
            }
        }]
    }
}

module.exports = {
    getMenuTemplate: (app) => {
        const name = app.getName();

        return [{
            label: name,
            submenu: [{
                label: `About ${name}`,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: `Hide ${name}`,
                accelerator: 'Cmd+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Cmd+Alt+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Cmd+Q',
                click: () => {
                    app.quit();
                }
            }]
        },
        // {
        //     label: 'Action',
        //     submenu: [{
        //         label: 'New Timer',
        //         accelerator: 'Cmd+N'
        //     }, {
        //         label: 'Start Timer',
        //         accelerator: 'Cmd+Return'
        //     }, {
        //         label: 'Reset Timer',
        //         accelerator: 'Shift+Cmd+Delete'
        //     }
        //     // Log/Post time Shift+Cmd+P
        //     ]
        // },
        editMenu,
        windowMenu(app),
        // Help/version/update
        ];
    },
    editMenu,
    selectionMenu
}
