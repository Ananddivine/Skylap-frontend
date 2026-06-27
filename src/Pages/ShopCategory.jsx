import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import { useNavigate } from "react-router-dom";

const ShopCategory = ({ category }) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    category || "All Categories"
  );

  const filteredProducts = all_product.filter((item) => {
    if (selectedCategory === "All Categories") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 ">

      
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-5 px-5 md:flex-row">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Laptop Spare Parts
          </h1>

          <p className="mt-2 text-slate-500">
            Showing
            <span className="mx-2 font-bold text-cyan-600">
              {filteredProducts.length}
            </span>
            of
            <span className="mx-2 font-bold">
              {all_product.length}
            </span>
            Products
          </p>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-lg">

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cursor-pointer bg-transparent text-slate-700 outline-none"
          >
            <option>All Categories</option>
            <option>Battery</option>
            <option>Screen</option>
            <option>SSD</option>
            <option>HDD</option>
            <option>Keyboard</option>
            <option>Charger</option>
            <option>Cable</option>
            <option>Motherboard</option>
            <option>Cooling Fan</option>
            <option>WiFi Card</option>
            <option>RAM</option>
          </select>

        </div>

      </div>

      {/* Products */}

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {filteredProducts.map((item) => (

          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            brand={item.brand}
            category={item.category}
          />

        ))}

      </div>

      {/* CTA */}

      <div className="py-20 text-center">

        <button
          onClick={() => navigate("/products")}
          className="rounded-full bg-cyan-600 px-10 py-4 text-lg font-semibold text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-cyan-500"
        >
          Explore More Products →
        </button>

      </div>

    </div>
  );
};

export default ShopCategory;