import React, { createContext, useState, useEffect } from "react";

// create context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    //cart state
    const [cart, setCart] = useState([]);

    //item amount state
    const [itemAmount, setItemAmount] = useState(0);

    //total price state
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            return acc + item.price * item.amount;
        }, 0);
        setTotalPrice(total);
    });

    //update item amount
    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((acc, currItem) => {
                return acc + currItem.amount;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart]);

    // add to cart
    const addToCart = (product, id) => {
        const newItem = { ...product, amount: 1 };
        // check if the item is already in the cart
        const cartItem = cart.find((item) => {
            return item.id === id;
        });
        // if the item is already in the cart
        if (cartItem) {
            const newCart = [...cart].map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
        }
        console.log(cart);
    };

    // remove from cart
    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        });
        setCart(newCart);
    };

    //clear cart
    const clearCart = () => {
        setCart([]);
    };

    //increase amount
    const incrementAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        addToCart(cartItem, id);
    };

    //decrease amount
    const decrementAmount = (id) => {
        const cartItem = cart.find((item) => {
            return item.id === id;
        });
        if (cartItem) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount - 1 };
                } else {
                    return item;
                }
            });

            setCart(newCart);
        }

        if (cartItem.amount < 2) {
            removeFromCart(id);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                incrementAmount,
                decrementAmount,
                itemAmount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
