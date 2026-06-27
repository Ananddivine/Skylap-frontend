import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, category, brand }) => {
  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group block"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Product Image */}
        <div className="bg-slate-100 p-6">
          <img
            src={image}
            alt={name}
            className="h-56 w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="p-5">

          {category && (
            <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              {category}
            </span>
          )}

          <h7 className="mt-3 line-clamp-2 text-lg font-bold text-slate-800">
            {name}
          </h7>

          {brand && (
            <p className="mt-2 text-sm text-slate-500">
              {brand}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">

            <span className="rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              In Stock
            </span>

            <span className="font-semibold text-cyan-600 transition group-hover:translate-x-1">
              View →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default Item;