Ext.define('extPutra.view.tab.BasicTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'basic-tabs',
    controller: 'tab-view',


    // requires: [
    //     'extPutra.view.tab.TabController'
    // ],

    width: 1000,
    height: 700,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
    items: [{
        title: 'Active Tab',
        html: 'loremIpsum'
    }, {
        title: 'Inactive Tab',
        html: 'loremIpsum'
    }, {
        title: 'Disabled Tab',
        disabled: true
    }, {
        title: 'Closable Tab',
        closable: true,
        html: 'loremIpsum'
    }, {
        title: 'Another inactive Tab',
        html: 'loremIpsum'
    }]
});