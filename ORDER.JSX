import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Order(props) {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleOrder = async () => {
        try {
            const response = await fetch('https://localhost:7186/api/Order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: props.username,
                    orderAddress: address,
                    totalAmount: props.totalAmount,
                    orderDate: new Date().toISOString(), // Add the current date and time
                    orderStatus: 'Success', // Set the order status to 'Success'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place the order');
            }

            navigate('/OrderSuccess');
            console.log('Order placed successfully!');
        } catch (error) {
            console.error('Error placing the order:', error.message);
        }
    };

    return (
        <div className="order-container">
            <h2 className="main-heading">Place Order</h2>
            <div className="underline"></div>
            <br />

            <Form>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                {/*<Form.Group controlId="formTotalAmount">*/}
                {/*    <Form.Label>Total Amount</Form.Label>*/}
                {/*    <Form.Control type="text" value={props.totalAmount.toFixed(2)} disabled />*/}
                {/*</Form.Group>*/}

                <Button variant="primary" onClick={handleOrder}>
                    Place Order
                </Button>
            </Form>
        </div>
    );
}

export default Order;
