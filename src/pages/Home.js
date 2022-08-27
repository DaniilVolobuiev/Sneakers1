import Card from "../Components/Card";

import React from "react";

function Home({
  searchInput,
  changeSearchInput,
  sneakers,
  onAddToFavourite,
  onAddToCart,

  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = sneakers.filter((obj) =>
      obj.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((obj, index) => (
      <Card
        {...obj}
        key={index}
        onFavourite={(item) => onAddToFavourite(item)}
        onPlus={(item) => onAddToCart(item)}
        loading={isLoading}
      />
    ));
  };
  return (
    <>
      <div className="titleSearch">
        <h1>{searchInput ? `Search for "${searchInput}"` : "All Sneakers"}</h1>
        <div className="search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
              stroke="#E4E4E4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input onChange={changeSearchInput} placeholder="Search..."></input>
        </div>
      </div>
      <section className="cards">{renderItems()}</section>
    </>
  );
}
export default Home;
