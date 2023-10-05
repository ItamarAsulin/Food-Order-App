import React, { useReducer } from "react";

const CartContext = React.createContext({
  itemsList: [],
  isShow: false,
  hideCart: () => {},
  showCart: () => {},
  addItem: (item) => {},
  removeItem: (item) => {},
  emptyCart: () => {},
});

const defaultCartState = {
  itemsList: [],
  totalAmount: 0,
  isShow: false,
};

const cartReducer = (state, action) => {
  if (action.type === "HIDE_CART") {
    return { ...state, isShow: false };
  } else if (action.type === "SHOW_CART") {
    return { ...state, isShow: true };
  } else if (action.type === "ADD") {
    const existingItemIndex = state.itemsList.findIndex((item) => {
      return item.id === action.val.id;
    });
    const existingCartItem = state.itemsList[existingItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.val.amount,
      };
      updatedItems = [...state.itemsList];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.itemsList.concat(action.val);
    }
    const updatedTotalAmount =
      Number(state.totalAmount) +
      Number(action.val.price) * Number(action.val.amount);
    return {
      ...state,
      itemsList: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const itemIndex = state.itemsList.findIndex((item) => {
      return item.id === action.val.id;
    });
    const prevItem = state.itemsList[itemIndex];
    let updatedItems;
    if (prevItem.amount === 1) {
      updatedItems = state.itemsList.filter((item) => {
        return item.id !== prevItem.id;
      });
    } else {
      updatedItems = state.itemsList;
      updatedItems[itemIndex].amount -= 1;
    }
    return {
      ...state,
      itemsList: updatedItems,
      totalAmount: state.totalAmount - prevItem.price,
    };
  } else if (action.type === "EMPTY_CART") {
    return { ...state, itemsList: [], totalAmount: 0 };
  }

  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartState
  );
  // const [itemsList, setItemsList] = useState([
  //   { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
  // ]);
  // const [isShow, setIsShow] = useState(false);

  const addItemHandler = (itemToAdd) => {
    dispatchCartActions({ type: "ADD", val: itemToAdd });
  };

  const removeItemHandler = (itemToRemove) => {
    dispatchCartActions({ type: "REMOVE", val: itemToRemove });
  };

  const hideCartHandler = () => {
    dispatchCartActions({ type: "HIDE_CART" });
  };

  const showCartHandler = () => {
    dispatchCartActions({ type: "SHOW_CART" });
  };

  const emptyCartHandler = () => {
    dispatchCartActions({ type: "EMPTY_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        itemsList: cartState.itemsList,
        isShow: cartState.isShow,
        totalAmount: cartState.totalAmount,
        hideCart: hideCartHandler,
        showCart: showCartHandler,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        emptyCart: emptyCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
