import { useState } from "react";

const Productdisplay = ({ product }) => {
  const images = product.images || (product.image ? [product.image] : []);

  const [mainImage, setMainImage] = useState(
    images[0] || "https://via.placeholder.com/700x700"
  );

  return (
    <section className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT */}

          <div>

            <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">

              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[500px] object-contain"
              />

            </div>

            {images.length > 1 && (

              <div className="flex gap-4 mt-5 overflow-auto">

                {images.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setMainImage(img)}
                    className={`w-24 h-24 object-contain rounded-xl cursor-pointer border-2 transition
                    ${
                      mainImage === img
                        ? "border-cyan-400"
                        : "border-slate-700 hover:border-cyan-400"
                    }`}
                  />

                ))}

              </div>

            )}

          </div>

          {/* RIGHT */}

          <div>

            <span className="inline-block bg-cyan-500 text-black px-4 py-1 rounded-full font-semibold mb-4">

              {product.category}

            </span>

            <h1 className="text-4xl font-bold">

              {product.name}

            </h1>

            <p className="text-slate-400 mt-2">

              {product.brand}

            </p>

            <hr className="border-slate-700 my-6" />

            <p className="text-slate-300 leading-8">

              {product.description}

            </p>

            {/* Info */}

            <div className="grid sm:grid-cols-2 gap-5 mt-8">

              <div className="bg-slate-900 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Model
                </p>

                <p className="font-semibold mt-1">

                  {product.model}

                </p>

              </div>

              <div className="bg-slate-900 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Brand
                </p>

                <p className="font-semibold mt-1">

                  {product.brand}

                </p>

              </div>

              <div className="bg-slate-900 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Availability
                </p>

                <p className="text-green-400 font-semibold mt-1">

                  {product.availability}

                </p>

              </div>

              <div className="bg-slate-900 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Service
                </p>

                <p className="font-semibold mt-1">

                  {product.service}

                </p>

              </div>

            </div>

            {/* Features */}

            {product.features && (

              <>

                <h2 className="text-2xl font-bold mt-10 mb-5">

                  Specifications

                </h2>

                <ul className="space-y-4">

                  {product.features.map((feature, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 rounded-xl p-4 flex items-center gap-3"
                    >

                      <span className="text-green-400 text-xl">
                        ✓
                      </span>

                      <span>

                        {feature}

                      </span>

                    </li>

                  ))}

                </ul>

              </>

            )}

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="tel:+919606120007"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold transition"
              >
                📞 Call Now
              </a>

              <a
                href="https://wa.me/919606120007"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-bold transition"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Productdisplay;