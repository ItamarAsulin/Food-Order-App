import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlited] = useState(false);
  const cartCtx = useContext(CartContext);
  let totalItems = 0;
  for (const item of cartCtx.itemsList) {
    totalItems += Number(item.amount);
  }

  let cartIconClass = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const { itemsList } = cartCtx;

  useEffect(() => {
    if (itemsList.length === 0) {
      console.log("here");

      return;
    }
    setBtnIsHighlited(true);
    setTimeout(() => {
      setBtnIsHighlited(false);
    }, 300);
  }, [itemsList]);

  return (
    <button className={`${cartIconClass}`} onClick={cartCtx.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
