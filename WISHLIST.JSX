import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function WishList(props) {
    const [wishLists, setWishLists] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchWishListData = async () => {
            try {
                const response = await fetch(`https://localhost:7186/api/WishList/ByUserName/${props.username}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist data');
                }

                const wishListData = await response.json();
                setWishLists(wishListData);

                const productIds = wishListData.map((wishList) => wishList.productId);
                const productResponses = await Promise.all(
                    productIds.map((productId) =>
                        fetch(`https://localhost:7186/api/Product/ProductById/${productId}`)
                    )
                );

                const productData = await Promise.all(productResponses.map((response) => response.json()));
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching wishlist data:', error.message);
            }
        };

        fetchWishListData();
    }, [props.username]);

    const removeFromWishList = async (wishListId) => {
        try {
            await fetch(`https://localhost:7186/api/WishList/DeleteById/${wishListId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Refresh wishlist data after removing
            const updatedWishListData = wishLists.filter((wishList) => wishList.wishListId !== wishListId);
            setWishLists(updatedWishListData);
            console.log('Product removed from wishlist');
            // You can display a success message to the user if needed
        } catch (error) {
            console.error('Error removing from wishlist:', error.message);
            // You can display an error message to the user if needed
        }
    };

    const clearWishList = async () => {
        try {
            const response = await fetch(`https://localhost:7186/api/WishList/Clear/${props.username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to clear wishlist');
            }

            // Clear wishlist data
            setWishLists([]);
        } catch (error) {
            console.error('Error clearing wishlist:', error.message);
        }
    };

    const handleBuyNow = async () => {
        try {
            // Call your server-side endpoint to handle the purchase logic
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
        <div>
            <div>
                <h2 className="main-heading">Your Wishlist</h2>
                <div className="underline"></div> <br />
                {wishLists.length > 0 ? (
                    <>
                        <ul>
                            {wishLists.map((wishList, index) => (
                                <li key={wishList.wishListId}>
                                    <strong>Product Name:</strong> {products[index]?.productName}
                                    <br />
                                    <strong>Price:</strong> {products[index]?.price}
                                    <br />
                                    <strong>Description:</strong> {products[index]?.description}
                                    <br />
                                    <Button onClick={() => removeFromWishList(wishList.wishListId)}>Remove</Button>
                                </li>
                            ))}
                        </ul>

                        <Button onClick={clearWishList}>Clear Wishlist</Button>
                        <Button onClick={handleBuyNow}>Add to Cart</Button>
                    </>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
}
export default WishList;
