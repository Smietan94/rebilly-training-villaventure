RebillyInstruments.mount({
    publishableKey: 'pk_sandbox_RsMEoPhRvOXyQRy2e0mCHLm-nfNMND2aW5aW1-n',
    organizationId: 'phronesis---villaventure',
    websiteId: 'example.com',
    apiMode: 'sandbox',
    theme: {
        colorPrimary: '#04395E', // Brand color
        colorText: '#ffffff',
        colorDanger: '#cd5c5c',
        colorBackground: '#031D44', // Website background color
        buttonColorText: '#ffffff',
        fontFamily: 'Trebuchet MS, sans-serif' // Website font family
    },
    paymentInstruments: {
        address: {
            show: ['email', 'phoneNumber', 'city', 'country'],
            require: ['address', 'email', 'phoneNumber', 'city', 'country'],
        }
    },
    items: [
        {
            planId: 'premium-membership',
            quantity: 1
        },
    ]
});
// Optional
RebillyInstruments.on('instrument-ready', (instrument) => {
    console.info('instrument-ready', instrument);
});
RebillyInstruments.on('purchase-completed', (purchase) => {
    console.info('purchase-completed', purchase);
});