import React, { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  let totalItems = 0;
  for (const item of cartCtx.itemsList) {
    totalItems += Number(item.amount);
  }

  return (
    <button className={classes.button} onClick={cartCtx.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
