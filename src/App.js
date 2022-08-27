import "./SCSS/Navbar.scss";
import "./SCSS/Card.scss";
import "./SCSS/App.scss";
import "./SCSS/Title.scss";
import "./SCSS/Sidebar.scss";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./pages/Home";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

import { useMediaQuery } from "@react-hook/media-query";

export const AppContext = React.createContext({});

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [isLoading, setIsloading] = React.useState(true);
  const [burgerOpened, setBurgerOpened] = React.useState(false);
  const matchesMin = useMediaQuery("only screen and (min-width: 700px)");
  const matchesMax = useMediaQuery("only screen and (max-width: 700px)");

  React.useEffect(() => {
    async function axiosData() {
      setIsloading(true);
      const [cartRespones, favouritesRespones, itemsResponse] =
        await Promise.all([
          await axios.get(
            "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/CartItems"
          ),
          await axios.get(
            "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/favourites"
          ),
          await axios.get(
            "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/SneakersList"
          ),
        ]);

      setIsloading(false);
      setFavourites(favouritesRespones.data);
      setCartItems(cartRespones.data);
      setSneakers(itemsResponse.data);
    }
    axiosData();
  }, []);

  const noScroll = () => {
    cartOpened
      ? (document.body.style.position = "fixed")
      : (document.body.style.position = "relative");
  };
  noScroll();

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      setCartOpened(false);
    }
  });

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((cartObj) => cartObj.parentId == obj.id);
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(
          `https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/CartItems/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/CartItems",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parent == data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка в корзине");
      console.error(error);
    }
  };
  const onRemoveItem = async (id) => {
    try {
      await axios.delete(
        `https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/CartItems/${id}`
      );

      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };
  const changeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  const onAddToFavourite = async (obj) => {
    try {
      const findFavourite = favourites.find(
        (cartObj) => cartObj.parentId == obj.id
      );
      if (findFavourite) {
        setFavourites((prev) =>
          prev.filter((item) => item.parentId !== obj.id)
        );
        await axios.delete(
          `https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/favourites/${findFavourite.id}`
        );
      } else {
        setFavourites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) =>
          prev.map((item) => {
            if (item.parent == data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка в корзине");
      console.error(error);
    }
    // if (favourites.find((favObj) => favObj.id == obj.id)) {
    //   axios.delete(
    //     `https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/favourites/${obj.id}`
    //   );
    //   setFavourites((prev) => prev.filter((item) => item.id !== obj.id));
    // } else {
    //   const { data } = await axios.post(
    //     "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/favourites",
    //     obj
    //   );
    //   setFavourites((prev) => [...prev, data]);
    // }
  };
  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(item.parentId) == Number(id));
  };
  const isItemFavourited = (id) => {
    return favourites.some((item) => Number(item.parentId) == Number(id));
  };

  const onOpenBurger = () => {
    setBurgerOpened(!burgerOpened);
  };
  React.useEffect(() => {
    if (matchesMin) {
      setBurgerOpened(true);
    }
  }, [matchesMin]);
  React.useEffect(() => {
    if (matchesMax) {
      setBurgerOpened(false);
    }
  }, [matchesMax]);

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cartItems,
        favourites,
        isItemAdded,
        onAddToFavourite,
        onAddToCart,
        setCartItems,
        isLoading,
        isItemFavourited,
      }}
    >
      <div className="wrapperOuter">
        <div className="wrapper">
          <Navbar
            onClickCart={() => setCartOpened(true)}
            onOpenBurger={onOpenBurger}
            burgerOpened={burgerOpened}
            setBurgerOpened={setBurgerOpened}
          />
          {/* <Routes>
          <Route
            path="/cart"
            element={
              <Sidebar
                items={cartItems}
                closeCart={() => setCartOpened(false)}
                onRemove={onRemoveItem}
              />
            }
          />
        </Routes> */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchInput={searchInput}
                  changeSearchInput={changeSearchInput}
                  sneakers={sneakers}
                  onAddToFavourite={onAddToFavourite}
                  onAddToCart={onAddToCart}
                  cartItems={cartItems}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/favourites"
              element={
                <Favourites
                  onAddToCart={onAddToCart}
                  onAddToFavourite={onAddToFavourite}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>

          <Sidebar
            opened={cartOpened}
            items={cartItems}
            closeCart={() => setCartOpened(false)}
            onRemove={(obj) => onRemoveItem(obj)}
            setBurgerOpened={setBurgerOpened}
          />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
