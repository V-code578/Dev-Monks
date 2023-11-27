import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//for images
import Sofa2 from '../Assets/Sofas/Sofa2.jpg';
import Sofa3 from '../Assets/Sofas/Sofa3.jpg';
import Sofa4 from '../Assets/Sofas/Sofa4.jpg';
import Sofa5 from '../Assets/Sofas/Sofa5.jpg';
import Sofa6 from '../Assets/Sofas/Sofa6.jpg';
import Sofa7 from '../Assets/Sofas/Sofa7.jpg';
import Sofa8 from '../Assets/Sofas/Sofa8.jpg';
import Sofa9 from '../Assets/Sofas/Sofa9.jpg';
import Sofa10 from '../Assets/Sofas/Sofa10.jpg';
import Bed1 from '../Assets/Beds/Bed1.jpg';
import Bed2 from '../Assets/Beds/Bed2.jpg';
import Bed3 from '../Assets/Beds/Bed3.jpg';
import Bed4 from '../Assets/Beds/Bed4.jpg';
import Bed5 from '../Assets/Beds/Bed5.jpg';
import Bed6 from '../Assets/Beds/Bed6.jpg';
import Bed7 from '../Assets/Beds/Bed7.jpg';
import Dining1 from '../Assets/Dining/Dining1.jpg';
import Dining2 from '../Assets/Dining/Dining2.jpg';
import Dining3 from '../Assets/Dining/Dining3.jpg';
import Dining4 from '../Assets/Dining/Dining4.jpg';
import Dining5 from '../Assets/Dining/Dining5.jpg';
import Lamp1 from '../Assets/Lamps/Lamp1.jpg';
import Lamp2 from '../Assets/Lamps/Lamp2.jpg';
import Lamp3 from '../Assets/Lamps/Lamp3.jpg';
import Lamp4 from '../Assets/Lamps/Lamp4.jpg';
import Lamp5 from '../Assets/Lamps/Lamp5.jpg';
import Lamp6 from '../Assets/Lamps/Lamp6.jpg';
import CoffeeTable1 from '../Assets/Coffee Table/CTable1.jpg';
import CoffeeTable2 from '../Assets/Coffee Table/CTable2.jpg';
import CoffeeTable3 from '../Assets/Coffee Table/CTable3.jpg';
import CoffeeTable4 from '../Assets/Coffee Table/CTable4.jpg';
import CoffeeTable5 from '../Assets/Coffee Table/CTable5.jpg';
import CoffeeTable6 from '../Assets/Coffee Table/CTable6.jpg';
import Chair1 from '../Assets/Seating/Chair1.jpg';
import Chair2 from '../Assets/Seating/Chair2.jpg';
import Chair3 from '../Assets/Seating/Chair3.jpg';
import Chair4 from '../Assets/Seating/Chair4.jpg';
import Chair5 from '../Assets/Seating/Chair5.jpg';
import Chair6 from '../Assets/Seating/Chair6.jpg';
import Chair7 from '../Assets/Seating/Chair7.jpg';
import Chair8 from '../Assets/Seating/Chair8.jpg';
import Chair9 from '../Assets/Seating/Chair9.jpg';
import Chair10 from '../Assets/Seating/Chair10.jpg';
import Study1 from '../Assets/Study Table/Study1.jpg';
import Study2 from '../Assets/Study Table/Study2.jpg';
import Study3 from '../Assets/Study Table/Study3.jpg';
import Study4 from '../Assets/Study Table/Study4.jpg';
import Study5 from '../Assets/Study Table/Study5.jpg';
import Swing1 from '../Assets/Swing Chairs/Swing1.jpg';
import Swing2 from '../Assets/Swing Chairs/Swing2.jpg';
import Swing3 from '../Assets/Swing Chairs/Swing3.jpg';
import Swing4 from '../Assets/Swing Chairs/Swing4.jpg';
import TVUnit1 from '../Assets/TV Units/TVUnit1.jpg';
import TVUnit2 from '../Assets/TV Units/TVUnit2.jpg';
import TVUnit3 from '../Assets/TV Units/TVUnit3.jpg';
import TVUnit4 from '../Assets/TV Units/TVUnit4.jpg';
import TVUnit5 from '../Assets/TV Units/TVUnit5.jpg';
import TVUnit6 from '../Assets/TV Units/TVUnit6.jpg';

const ProductList = ({ products, addToCart, addToWishlist }) => {
    //const imagesArray = [Sofa1, Sofa2, Sofa3, Sofa4, Sofa5, Sofa6, Sofa7, Bed1, Bed2, Bed3, Bed4, Bed5, Bed6, Bed7, Dining1, Dining2, Dining3, Dining4, Dining5, Lamp1, Lamp2, Lamp3, Lamp4, Lamp5, Lamp6, CTable1, CTable2, CTable3, CTable4, CTable5, CTable6, Chair1, Chair2, Chair3, Chair4, Chair5, Chair6, Chair7, Chair8, Chair9, Chair10, Study1, Study2, Study3, Study4, Study5, Swing1, Swing2, Swing3, Swing4];
    const sofaImages = [Sofa2, Sofa3, Sofa4, Sofa5, Sofa6, Sofa7, Sofa8, Sofa9, Sofa10];
    const bedImages = [Bed1, Bed2, Bed3, Bed4, Bed5, Bed6, Bed7];
    const lampImages = [Lamp1, Lamp2, Lamp3, Lamp4, Lamp5, Lamp6];
    const chairImages = [Chair1, Chair2, Chair3, Chair4, Chair5, Chair6, Chair7, Chair8, Chair9, Chair10];
    const studyImages = [Study1, Study2, Study3, Study4, Study5];
    const diningImages = [Dining1, Dining2, Dining3, Dining4, Dining5];
    const coffeeImages = [CoffeeTable1, CoffeeTable2, CoffeeTable3, CoffeeTable4, CoffeeTable5, CoffeeTable6];
    const swingImages = [Swing1, Swing2, Swing3, Swing4];
    const tvunitImages = [TVUnit1, TVUnit2, TVUnit3, TVUnit4, TVUnit5, TVUnit6];

    const shuffleArray = (array) => {
        const shuffledArray = array.slice(); // Copy the array to avoid mutating the original
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const [shuffledSofaImages, setShuffledSofaImages] = useState([]);
    const [shuffledBedImages, setShuffledBedImages] = useState([]);
    const [shuffledLampImages, setShuffledLampImages] = useState([]);
    const [shuffledChairImages, setShuffledChairImages] = useState([]);
    const [shuffledStudyImages, setShuffledStudyImages] = useState([]);
    const [shuffledDiningImages, setShuffledDiningImages] = useState([]);
    const [shuffledCoffeeImages, setShuffledCoffeeImages] = useState([]);
    const [shuffledSwingImages, setShuffledSwingImages] = useState([]);
    const [shuffledTVUnitImages, setShuffledTVUnitImages] = useState([]);

    useEffect(() => {
        // Shuffle the sofa and other images arrays when the component mounts or when the products change
        setShuffledSofaImages(shuffleArray(sofaImages));
        setShuffledBedImages(shuffleArray(bedImages));
        setShuffledLampImages(shuffleArray(lampImages));
        setShuffledChairImages(shuffleArray(chairImages));
        setShuffledStudyImages(shuffleArray(studyImages));
        setShuffledDiningImages(shuffleArray(diningImages));
        setShuffledCoffeeImages(shuffleArray(coffeeImages));
        setShuffledSwingImages(shuffleArray(swingImages));
        setShuffledTVUnitImages(shuffleArray(tvunitImages));
    }, [products]);
    const renderProductImage = (productName) => {
        const lowerProductName = productName.toLowerCase();
        let image;

        if (lowerProductName.includes('sofa')) {
            const imageIndex = Math.floor(Math.random() * shuffledSofaImages.length);
            image = shuffledSofaImages[imageIndex];
        }
        else if (lowerProductName.includes('bed')) {
            const imageIndex = Math.floor(Math.random() * shuffledBedImages.length);
            image = shuffledBedImages[imageIndex];
        }
        else if (lowerProductName.includes('lamp')) {
            const imageIndex = Math.floor(Math.random() * shuffledLampImages.length);
            image = shuffledLampImages[imageIndex];
        }
        else if (lowerProductName.includes('chair')) {
            const imageIndex = Math.floor(Math.random() * shuffledChairImages.length);
            image = shuffledChairImages[imageIndex];
        }
        else if (lowerProductName.includes('study')) {
            const imageIndex = Math.floor(Math.random() * shuffledStudyImages.length);
            image = shuffledStudyImages[imageIndex];
        }
        else if (lowerProductName.includes('dining')) {
            const imageIndex = Math.floor(Math.random() * shuffledDiningImages.length);
            image = shuffledDiningImages[imageIndex];
        }
        else if (lowerProductName.includes('coffee')) {
            const imageIndex = Math.floor(Math.random() * shuffledCoffeeImages.length);
            image = shuffledCoffeeImages[imageIndex];
        }
        else if (lowerProductName.includes('swing')) {
            const imageIndex = Math.floor(Math.random() * shuffledSwingImages.length);
            image = shuffledSwingImages[imageIndex];
        }
        else if (lowerProductName.includes('tv unit')) {
            const imageIndex = Math.floor(Math.random() * shuffledTVUnitImages.length);
            image = shuffledTVUnitImages[imageIndex];
        }
        else {
            return <img src={Sofa2} className="img-fluid rounded-start" alt={productName} />;
        }
        return <img src={image} className="img-fluid rounded-start" alt={productName} />;
    };
    return (
        <div>
            <h2 className="productsHead">Product List</h2>
            <div className="underline"></div>
            <ul style={{ listStyleType: 'none', padding: 0 }} className="products">
                {products.map((product) => (
                    <li key={product.productId}>
                        <div className="card mb-12" style={{ width: '1050px' }}>
                            <div className="row g-0">
                                <div className="col-md-7">
                                    {renderProductImage(product.productName)}
                                </div>
                                <div className="col-md-5">
                                    <div className="card-body">
                                        <h2 class="text-center" className="card-title">{product.productName}</h2>
                                        <h3 class="text-center" className="card-text">{product.description}</h3>
                                        <br />
                                        <h4 >Price: <b>Rs.{product.price.toFixed(2)} </b></h4>
                                        <button class="button-style" onClick={() => addToCart(product)} >Add to Cart</button>{' '}
                                        <button class="button-style" onClick={() => addToWishlist(product.productId)} >Add to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useState({ userName: '', productId: 0, quantity: 0 });
    const [wishlist, setWishlist] = useState({ wishListId: 0, userName: '', productId: 0 });

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('https://localhost:7077/api/Product/AllProducts/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const productData = await response.json();
            setProducts(productData);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const isUserLoggedIn = () => {
        const userString = localStorage.getItem('user');
        console.log('User string from localStorage:', userString);

        if (userString) {
            const user = JSON.parse(userString);
            console.log('Parsed user object:', user);
            return !!user;
        }

        return false;
    };

    const addToCart = async (product) => {
        if (isUserLoggedIn()) {
            const user = JSON.parse(localStorage.getItem('user'));

            const cartItem = {
                userName: user.userName,
                productId: product.productId,
                quantity: 1,
            };

            try {
                console.log('Adding to cart:', cartItem);
                const existingCartItem = await fetch('https://localhost:7077/api/Cart/CartByUserNameandProductId/${user.userName}/${product.productId}');
                console.log('Existing cart item:', existingCartItem);

                if (existingCartItem.ok) {
                    const existingCartData = await existingCartItem.json();
                    cartItem.quantity += existingCartData.quantity;

                    await fetch('https://localhost:7077/api/Cart/Update', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                    },
                        body: JSON.stringify(cartItem),
                });
            } else {
                await fetch('https://localhost:7077/api/Cart/Add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartItem),
                });
            }

            alert('Product added to cart');
            setCart({ userName: '', productId: 0, quantity: 0 });
            console.log('Navigating to /Cart');
            navigate('/Cart');
        } catch (error) {
            console.error('Error adding item to the cart:', error.message);
        }
    } else {
        //redirectToLogin();
        console.log('User not logged in. Cannot add to cart.');
        return;
        }
    };


    const redirectToLogin = () => {
        navigate('/login');
    };

    const addToWishlist = (productId) => {
        if (!isUserLoggedIn()) {
            redirectToLogin();
            return;
        }

        const selectedProduct = products.find((product) => product.productId === productId);
        setWishlist(selectedProduct);

        navigate('/wishlist');
    };

    return (
        <div>
            <ProductList products={products} addToCart={addToCart} addToWishlist={addToWishlist} />
        </div>
    );
};

export default Product;
