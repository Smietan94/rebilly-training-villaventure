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
    features: {
        hideConfirmation: true,
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
    ],
    addons: [
        {
            planId: 'personalized-travel-plan',
            quantity: 1
        }
    ],
    bumpOffer: [
        {
            planId: 'platinum-membership',
            quantity: 1
        }
    ]
});

const button = document.getElementById('btn');

button.addEventListener('click', (e) => {
    if (button.textContent === 'change to yearly plan') {
        button.textContent = 'change to monthly plan';
        const newConfig = {
            items: [
                {
                    planId: 'yearly-premium-membership',
                    quantity: 1
                }
            ],
            bumpOffer: [
                {
                    planId: 'yearly-platinum-membership',
                    quantity: 1
                }
            ]
        };
        try {
            RebillyInstruments.update(newConfig);
        } catch (error) {
            console.log('error: ', error);
        }
    } else {
        button.textContent = 'change to yearly plan';
        const newConfig = {
            items: [
                {
                    planId: 'premium-membership',
                    quantity: 1
                }
            ],
            bumpOffer: [
                {
                    planId: 'platinum-membership',
                    quantity: 1
                }
            ]
        };
        try {
            RebillyInstruments.update(newConfig);
        } catch (error) {
            console.log('error: ', error);
        }
    }
})

RebillyInstruments.on('instrument-ready', (instrument) => {
    const {billingAddress, _raw} = instrument;
    const form = document.querySelector('[data-rebilly-instruments="form"]');
    const confirmationScreen = document.querySelector('.rebilly-instruments-custom-confirmation');
    form.classList.add('display-none');
    confirmationScreen.classList.remove('display-none');

    const confirm = document.querySelector('#confirm');
    confirm.addEventListener('click', makePurchase);

    async function makePurchase() {
        const agree = document.querySelector('#confirmation-terms');

        if (agree.checked) {
            form.classList.remove('display-none');
            confirmationScreen.classList.add('display-none');
            RebillyInstruments.show('confirmation', instrument);
        } else {
            document.querySelector('#confirmation-terms-error').innerHTML = '<br/>Please agree with terms and conditions';
        }
    }
});
// Optional
RebillyInstruments.on('purchase-completed', (purchase) => {
    console.info('purchase-completed', purchase);
});