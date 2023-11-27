Updated Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';

function Cart(props) {
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`https://localhost:7186/api/Cart/CartByUserName/${props.username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                const cartData = await response.json();
                setCarts(cartData);
                const productIds = cartData.map((cart) => cart.productId);
                const productResponses = await Promise.all(
                    productIds.map((productId) => fetch(`https://localhost:7186/api/Product/ProductById/${productId}`))
                );
                const productData = await Promise.all(productResponses.map((response) => response.json()));
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
            }
        };

        fetchCartData();
    }, [props.username]);

    const removeFromCart = async (productId) => {
        try {
            await fetch(`https://localhost:7186/api/WishList/DeleteById/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Refresh wishlist data after removing
            const updatedCartData = carts.filter((cart) => cart.productId !== productId);
            setCarts(updatedCartData);
            console.log('Product removed from cart');
            // You can display a success message to the user if needed
        } catch (error) {
            console.error('Error removing from cart:', error.message);
            // You can display an error message to the user if needed
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch(`https://localhost:7186/api/Cart/Clear/${props.username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }

            // Clear cart data
            setCarts([]);
        } catch (error) {
            console.error('Error clearing cart:', error.message);
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await fetch('https://localhost:7186/api/Order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to complete the purchase');
            }

            navigate('/order');
            console.log('Purchase successful!');
        } catch (error) {
            console.error('Error during purchase:', error.message);
        }
    };

    return (
        <div className="cart-container">
            <h2 className="main-heading">Your Cart</h2>
            <div className="underline"></div> <br />

            {carts.length > 0 ? (
                <>
                    <ListGroup>
                        {carts.map((cart, index) => (
                            <ListGroup.Item key={cart.productId}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{products[index]?.productName}</Card.Title>
                                        <Card.Text>
                                            <strong>Price:</strong> {products[index]?.price}
                                            <br />
                                            <strong>Description:</strong> {products[index]?.description}
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => removeFromCart(cart.productId)}>
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <div className="cart-buttons">
                        <Button variant="secondary" onClick={clearCart}>
                            Clear Cart
                        </Button>
                        <Button variant="primary" onClick={handleBuyNow}>
                            Buy Now
                        </Button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
