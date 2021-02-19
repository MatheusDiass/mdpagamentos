const express = require('express');
const MercadoPago = require('mercadopago');
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-7844847854581950-021821-3248664a47dcc540d0df27c9dcec97e1-326011225'
});

app.get('/', (req, res) =>{
    res.send('Hello Word!');
});

app.get('/pagar', async (req, res) =>{
    var id = Date.now().toString();
    var email = 'dias.math0@outlook.com';

    var data = {
        items: [
            item = {
                id: id,
                title: '2x video games;3x camisas',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],

        payer: {
            email: email
        },

        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(data);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);
    } catch(error){
        return res.send(error.message);
    }
});

app.listen(8800, () =>{
    console.log('Server is running!'); 
});