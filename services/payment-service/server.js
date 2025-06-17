require('dotenv').config(); // environment variables
const express = require('express');
const cors = require('cors');//nuevo
const axios = require('axios'); // to do requests to other services
const app = express();
app.use(cors()); //nuevo
app.use(express.json()); // middleware

// PORT needs to be in capitals(?)
const PORT = process.env.PORT || 5005;

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

// this is optional, useful for debugging, it shows date, method, url and the request's body
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);
    next(); // Pasa la petición a la siguiente función middleware o ruta
});

// tryal route to verify the service is working
app.get('/api/v1/payments/health', (req, res) => {
    res.status(200).json({
        message: `✅ ${process.env.SERVICE_NAME || 'Payment Service'} is healthy and running!`,
        port: PORT,
        orderServiceUrl: ORDER_SERVICE_URL
    });
});

// route to process a simulation payment. Endpoint
app.post('/api/v1/payments/process', async (req, res) => {
    console.log('Received payment processing request:', req.body);
    
    // Extrae los datos necesarios del cuerpo de la petición
    // CORREGIDO: 'currency' ha sido eliminado de la desestructuración
    const { orderId, userId, amount } = req.body; 
    
    // here i create an id but is not necesarry i think
    // CORREGIDO: Usar backticks (`) para template literals
    const transactionId = `sim_tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let paymentStatusForOrder; // este estado lo manda a order
    let responseMessage; 
    let httpStatusForClient; // codigo HTTP

    // acá valida los datos de entrada, si esta todo ok es success sino es failed
    // CORREGIDO: 'currency' ha sido eliminado de la validación
    if (!orderId || !userId || !amount || typeof amount !== 'number' || amount <= 0) {
        paymentStatusForOrder = 'failed';
        responseMessage = 'Payment failed';
        httpStatusForClient = 400; // error de bad request
        // CORREGIDO: Usar backticks (`) para template literal
        console.error(`Payment failed for order ${orderId}`);
    } else {
        paymentStatusForOrder = 'paid';
        responseMessage = 'Payment success';
        httpStatusForClient = 200;
        // CORREGIDO: Usar backticks (`) para template literal
        console.log(`Payment success for order ${orderId}`);
    }

// Now notify Order service
try {
    if (!ORDER_SERVICE_URL) {
        throw new Error('ORDER_SERVICE_URL is not set in .env. Cannot notify Order Service.');
    }

    // HTTP PUT request to Order-service
    // CORREGIDO: Sintaxis correcta de template literal para la URL (elimina el span LaTeX)
    const orderUpdateEndpoint = `${ORDER_SERVICE_URL}/api/v1/orders/${orderId}/payment-status`;
    // CORREGIDO: Usar la variable correcta 'paymentStatusForOrder'
    console.log(`Attempting to notify Order Service at: ${orderUpdateEndpoint} with status: ${paymentStatusForOrder}`);
    const orderResponse = await axios.put(orderUpdateEndpoint, {
                status: paymentStatusForOrder,
                transactionId: transactionId,
                paymentAmount: amount,
                // CORREGIDO: 'paymentCurrency' ha sido eliminado de los datos enviados al Order Service
            });

    console.log('Order Service response:', orderResponse.status, orderResponse.data);

        // Envía la respuesta al cliente original
        res.status(httpStatusForClient).json({
            message: responseMessage,
            transactionId: transactionId,
            status: paymentStatusForOrder,
            orderServiceNotified: true
        });
} 

catch (notificationError) {
        console.error(`Error notifying Order Service for order ${orderId}:`, notificationError.message);
        // Aquí hay una decisión: si el pago fue exitoso pero la notificación falló le damos 500. El cliente debe saber que el estado final no se pudo confirmar.
        res.status(500).json({
            message: `Payment processed (simulated: ${paymentStatusForOrder}) but failed to notify Order Service: ${notificationError.message}. Please check Order Service logs.`,
            transactionId: transactionId,
            status: paymentStatusForOrder, // El estado del pago simulado
            orderServiceNotified: false
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ ${process.env.SERVICE_NAME || 'Service'} listening on port ${PORT}`);
    console.log(`💡 ORDER_SERVICE_URL: ${ORDER_SERVICE_URL}`);
    if (!ORDER_SERVICE_URL) {
        console.warn('⚠️ WARNING: ORDER_SERVICE_URL is not set in .env. Communication with Order Service will fail.');
    }
});