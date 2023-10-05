import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.itemsList.length > 0;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.itemsList.map((item) => {
        return <CartItem item={item} key={Math.random().toString()} />;
      })}
    </ul>
  );

  const orderHandler = () => {
    console.log("Order Sent!");
    cartCtx.hideCart();
    cartCtx.emptyCart();
  };

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={cartCtx.hideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
