import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Cart(props) {
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`https://localhost:7012/api/Cart/CartByUserName/${props.username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                const cartData = await response.json();
                setCarts(cartData);
                const productIds = cartData.map((cart) => cart.productId);
                const productResponses = await Promise.all(
                    productIds.map((productId) => fetch(`https://localhost:7012/api/Product/ProductById/${productId}`))
                );
                const productData = await Promise.all(productResponses.map((response) => response.json()));
                setProducts(productData);


                // Calculate total amount
                const calculatedTotalAmount = cartData.reduce((total, cart) => {
                    const product = productData.find((product) => product.productId === cart.productId);
                    const productPrice = product?.price || 0;
                    return total + productPrice * cart.quantity;
                }, 0);
                setTotalAmount(calculatedTotalAmount);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
            }
        };

        fetchCartData();
    }, [props.username]);




    const removeFromCart = async (productId) => {
        try {
            const response = await fetch('http://localhost:7012/api/cart/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove from cart');
            }

            const updatedCartData = carts.filter((cart) => cart.productId !== productId);
            setCarts(updatedCartData);
        } catch (error) {
            console.error('Error removing from cart:', error.message);
        }
    };

    // Add the handleQuantityChange function outside the Cart component
    const handleQuantityChange = async (event, productId) => {
        const newQuantity = parseInt(event.target.value);

        try {
            const response = await fetch('http://localhost:7012/api/cart/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity in cart');
            }

            const updatedCartData = carts.map((cart) => {
                if (cart.productId === productId) {
                    return { ...cart, quantity: newQuantity };
                }
                return cart;
            });

            setCarts(updatedCartData);

            // Recalculate total amount
            const calculatedTotalAmount = updatedCartData.reduce((total, cart) => {
                const product = products.find((product) => product.productId === cart.productId);
                const productPrice = product?.price || 0;
                return total + productPrice * cart.quantity;
            }, 0);
            setTotalAmount(calculatedTotalAmount);
        } catch (error) {
            console.error('Error updating quantity in cart:', error.message);
        }
    };


    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch('http://localhost:7012/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: props.username,
                    productId,
                    quantity: newQuantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            const updatedCartData = carts.map((cart) => {
                if (cart.productId === productId) {
                    return { ...cart, quantity: newQuantity };
                }
                return cart;
            });
            setCarts(updatedCartData);
        } catch (error) {
            console.error('Error updating quantity:', error.message);
        }
    };

   

    const clearCart = async () => {
        try {
            const response = await fetch('http://localhost:7012/api/cart/Clear', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }

            setCarts([]);
        } catch (error) {
            console.error('Error clearing cart:', error.message);
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await fetch('https://localhost:7012/api/Order/', {
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
                        <ul className="products" style={{ listStyleType: 'none', padding: 0 }}>
                            {carts.map((cart, index) => (
                                <li key={cart.productId}>
                                    <div className="card mb-10" style={{ width: '1050px' }}>
                                        <div className="row g-0">
                                            <div className="col-md-7">
                                                {/* {renderProductImage(products[index]?.productName)} */}
                                            </div>
                                            <div className="col-md-5">
                                                <div className="card-body">
                                                    <div className="card-title" >
                                                        <h2>{products[index]?.productName}</h2>
                                                    </div>
                                                    <h3 className="card-text">{products[index]?.description}</h3>
                                                    <br />
                                                    <h4>Price: <b>{products[index]?.price.toFixed(2)}</b></h4> 
                                                    <button onClick={() => removeFromCart(cart.productId)} type="button" class="btn" className="btn btn-outline">Remove</button>

                                                    <div class="btn-group dropend">
                                                        <button
                                                            type="button"
                                                            class="btn dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                            onChange={(event) => handleQuantityChange(event, cart.productId)}
                                                        >
                                                            {cart.quantity}
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li>
                                                                <a class="dropdown-item active">1</a>
                                                            </li>
                                                            <li>
                                                                <a class="dropdown-item">2</a>
                                                            </li>
                                                            <li>
                                                                <a class="dropdown-item">3</a>
                                                            </li>
                                                            <li>
                                                                <a class="dropdown-item">4</a>
                                                            </li>
                                                            <li>
                                                                <a class="dropdown-item">5</a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-buttons">
                            <Button variant="secondary" onClick={clearCart}>
                                Clear Cart
                            </Button>
                            <Button variant="primary" onClick={handleBuyNow}>
                                Buy Now
                        </Button>
                        <div className="total-amount">
                            <h4>Total Amount: <b>{totalAmount.toFixed(2)}</b></h4>
                        </div>

                    </div>
                    
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
    );
}

export default Cart;