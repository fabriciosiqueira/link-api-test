const Mercadopago = require('mercadopago');

Mercadopago.setPublishableKey("TEST-98638d24-eb00-4dd5-82d8-4e573fac6a80");

Mercadopago.createToken(form,tokenHandler);

Mercadopago.getPaymentMethod({
    "payment_type_id": "credit_card",
}, paymentMethodHandler);