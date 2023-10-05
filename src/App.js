import React, { Fragment, useContext } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./store/CartContext";

function App() {
  const cartCtx = useContext(CartContext);

  return (
    <Fragment>
      {cartCtx.isShow ? <Cart /> : ""}
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
