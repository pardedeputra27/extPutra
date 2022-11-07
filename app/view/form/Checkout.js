Ext.define('extPutra.view.form.Checkout', {
    extend: 'Ext.form.Panel',
    xtype: 'form-checkout',
    controller: 'form-checkout',

    requires: [
        'extPutra.model.State',
        'extPutra.store.States'
    ],

    title: 'Complete Check Out',
    width: 620,
    bodyPadding: 10,
    frame: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 90,
        msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Contact Information',
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Name',

            layout: 'hbox',
            combineErrors: true,
            defaultType: 'textfield',
            defaults: {
                hideLabel: 'true'
            },

            items: [{
                fieldLabel: 'First Name',
                name: 'firstName',

                flex: 2,
                emptyText: 'First',
                allowBlank: false
            }, {
                fieldLabel: 'Last Name',
                name: 'lastName',

                flex: 3,
                margin: '0 0 0 6',
                emptyText: 'Last',
                allowBlank: false
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            margin: '0 0 5 0',

            items: [{
                fieldLabel: 'Email Address',
                name: 'email',

                vtype: 'email',
                flex: 1,
                allowBlank: false
            }, {
                fieldLabel: 'Phone Number',
                name: 'phone',

                labelWidth: 100,
                width: 220,
                emptyText: 'xxx-xxx-xxxx',
                maskRe: /[\d\-]/,
                regex: /^\d{3}-\d{3}-\d{4}$/,
                regexText: 'Must be in the format xxx-xxx-xxxx'
            }]
        }]
    }, {
        xtype: 'fieldset',
        title: 'Mailing Address',
        reference: 'mailingAddressForm',

        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        items: [{
            fieldLabel: 'Street Address',
            name: 'mailingStreet',
            reference: 'mailingStreet',

            labelWidth: 110,
            allowBlank: false,

            listeners: {
                change: 'onMailingAddrFieldChange'
            }
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',

            items: [{
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'mailingCity',
                reference: 'mailingCity',

                labelWidth: 110,
                flex: 1,
                allowBlank: false,

                listeners: {
                    change: 'onMailingAddrFieldChange'
                }
            }, {
                xtype: 'combobox',
                fieldLabel: 'State',
                name: 'mailingState',
                reference: 'mailingState',

                width: 125,
                forceSelection: true,
                enforceMaxLength: true,
                labelWidth: 50,
                valueField: 'abbr',
                displayField: 'abbr',
                typeAhead: true,
                queryMode: 'local',
                allowBlank: false,

                listConfig: {
                    minWidth: null
                },
                store: {
                    type: 'states'
                },

                listeners: {
                    change: 'onMailingAddrFieldChange'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Postal Code',
                name: 'mailingPostalCode',
                reference: 'mailingPostalCode',

                labelWidth: 80,
                width: 160,
                allowBlank: false,
                maxLength: 10,
                enforceMaxLength: true,
                maskRe: /[\d\-]/,
                regex: /^\d{5}(\-\d{4})?$/,
                regexText: 'Must be in the format xxxxx or xxxxx-xxxx',

                listeners: {
                    change: 'onMailingAddrFieldChange'
                }
            }]
        }]
    }, {
        xtype: 'fieldset',
        title: 'Billing Address',
        layout: 'anchor',

        defaults: {
            anchor: '100%'
        },

        items: [{
            xtype: 'checkbox',
            boxLabel: 'Same as Mailing Address?',
            name: 'billingSameAsMailing',
            reference: 'billingSameAsMailing',

            hideLabel: true,
            checked: true,
            margin: '0 0 10 0',
            handler: 'onSameAddressChange'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Street Address',
            name: 'billingStreet',
            reference: 'billingStreet',

            labelWidth: 110,
            style: 'opacity:.5',
            disabled: true,
            allowBlank: false
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',

            items: [{
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'billingCity',
                reference: 'billingCity',

                labelWidth: 110,
                style: 'opacity:.5',
                flex: 1,
                disabled: true,
                allowBlank: false
            }, {
                xtype: 'combobox',
                fieldLabel: 'State',
                name: 'billingState',
                reference: 'billingState',

                width: 125,
                enforceMaxLength: true,
                style: 'opacity:.5',
                labelWidth: 50,
                valueField: 'abbr',
                displayField: 'abbr',
                typeAhead: true,
                queryMode: 'local',
                disabled: true,
                allowBlank: false,
                forceSelection: true,

                listConfig: {
                    minWidth: null
                },
                store: {
                    type: 'states'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Postal Code',
                name: 'billingPostalCode',
                reference: 'billingPostalCode',

                labelWidth: 80,
                style: 'opacity:.5',
                width: 160,
                disabled: true,
                allowBlank: false,
                maxLength: 10,
                enforceMaxLength: true,
                maskRe: /[\d\-]/,
                regex: /^\d{5}(\-\d{4})?$/,
                regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
            }]
        }]
    }, {
        xtype: 'fieldset',
        title: 'Payment',

        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        items: [{
            xtype: 'radiogroup',

            layout: {
                autoFlex: false
            },

            defaults: {
                name: 'ccType',
                margin: '0 15 0 0'
            },

            items: [{
                boxLabel: 'VISA',
                inputValue: 'visa',
                checked: true
            }, {
                boxLabel: 'MasterCard',
                inputValue: 'mastercard'
            }, {
                boxLabel: 'American Express',
                inputValue: 'amex'
            }, {
                boxLabel: 'Discover',
                inputValue: 'discover'
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Name On Card',
            name: 'ccName',

            labelWidth: 110,
            allowBlank: false
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Card Number',
                name: 'ccNumber',

                labelWidth: 110,
                flex: 1,
                allowBlank: false,
                minLength: 15,
                maxLength: 16,
                enforceMaxLength: true,
                maskRe: /\d/
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Expiration',

                labelWidth: 75,
                layout: 'hbox',

                items: [{
                    xtype: 'combobox',
                    name: 'ccExpireMonth',

                    displayField: 'name',
                    valueField: 'number',
                    queryMode: 'local',
                    emptyText: 'Month',
                    hideLabel: true,
                    margin: '0 6 0 0',
                    width: 100,
                    allowBlank: false,
                    forceSelection: true,

                    store: {
                        type: 'months'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'ccExpireYear',

                    width: 90,
                    hideLabel: true,
                    value: new Date().getFullYear(),
                    minValue: new Date().getFullYear(),
                    allowBlank: false
                }]
            }]
        }]
    }],

    buttons: [{
        text: 'Reset',
        handler: 'onResetClick'
    }, {
        text: 'Complete Purchase',
        width: 150,
        handler: 'onCompleteClick'
    }]
});