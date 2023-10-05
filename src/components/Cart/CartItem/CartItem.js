import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../../store/CartContext";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addAmountHandler = (event) => {
    event.preventDefault();
    cartCtx.addItem({ ...props.item, amount: 1 });
  };

  const subtractAmountHandler = (event) => {
    event.preventDefault();
    cartCtx.removeItem(props.item);
  };

  const price = Number(props.item.amount) * Number(props.item.price);
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price.toFixed(2)}</span>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={subtractAmountHandler}>−</button>
        <button onClick={addAmountHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
