import React, { useRef, useEffect, useContext } from "react";
import SearchResults from "../SearchResults/SearchResults";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import delllogo from "../../Components/Assets/delllogo.png";
import hplogo from "../../Components/Assets/hplogo.png";
import asuslogo from "../../Components/Assets/asuslogo.png";
import acerlogo from "../../Components/Assets/acerlogo.jpg";
import microsoftlog from "../../Components/Assets/microsoftlogo.png";
import { ShopContext } from '../../Context/ShopContext';


import "./Hero.css";

import Products from "../../Pages/Products";


const Hero = () => {
  const locationObj = useLocation();
  const { location } = useParams();
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);

  const cityName = location
    ? location.replace(/-/g, " ")
    : "Bangalore";

  const searchParams = new URLSearchParams(locationObj.search);
const searchQuery = decodeURIComponent(
  searchParams.get("search") || ""
);

  const searchResultsRef = useRef(null);

const laptopModels = all_product;



  const filteredModels = searchQuery
    ? laptopModels.filter((model) =>
        isQueryMatch(model, searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (searchResultsRef.current && searchQuery) {
      setTimeout(() => {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }
  }, [searchQuery]);

  const locations = [
    "koramangala",
    "whitefield",
    "marathahalli",
    "electronic-city",
    "indiranagar",
    "banashankari",
  ];

  return (
    <div className="hero">

      {/* Main Heading */}
      <h1>
        Laptop Service Center in {cityName}
      </h1>

      <h2>
        Laptop Repair | Screen Replacement | Battery Replacement | SSD Upgrade
      </h2>

      <p className="hero-items">
        SkyLap Laptop Service Center provides professional laptop repair
        services in {cityName}. We repair Dell, HP, Lenovo, ASUS, Acer,
        Apple MacBook, MSI, Samsung and other laptop brands with genuine
        spare parts, experienced technicians, warranty support and free
        pickup & drop across Bangalore.
      </p>

      {searchQuery && (
        <SearchResults
          searchResults={filteredModels}
          searchParams={searchParams}
          ref={searchResultsRef}
        >
          <Products laptopModels={filteredModels} />
        </SearchResults>
      )}

      <section className="section">
        <div className="row">

          <div className="colums">

            <h2>About SkyLap Laptop Service Center</h2>

            <div className="underline">
              <span></span>
            </div>

            <p>
              SkyLap Laptop Service Center has more than 13 years of
              experience in laptop repair and computer services in
              Bangalore. Our certified technicians repair Dell, HP,
              Lenovo, ASUS, Acer, Apple MacBook, Samsung, Sony,
              Toshiba and MSI laptops.

              <br /><br />

              We specialize in motherboard repair, laptop screen
              replacement, keyboard replacement, battery replacement,
              SSD upgrade, RAM upgrade, hinge repair, water damage
              repair, charger replacement and data recovery.

              <br /><br />

              We use genuine spare parts, provide affordable pricing,
              offer free pickup & drop and warranty on every repair.
              More than 99% of laptops are successfully repaired by
              our experienced engineers.
            </p>

          </div>

          <div className="colums">

            <h2>Why Customers Choose SkyLap</h2>

            <div className="underline">
              <span></span>
            </div>

            <div className="skills-bar">

              <p>
                Laptop Repair Success
              </p>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: "96%" }}
                >
                  96%
                </div>
              </div>

              <p>
                Customer Satisfaction
              </p>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: "98%" }}
                >
                  98%
                </div>
              </div>

              <p>
                Customer Trust
              </p>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: "100%" }}
                >
                  100%
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Brand Logos */}

      <section className="icons row mt-5">

        <div className="col-md-2 col-4">
          <img
            src={delllogo}
            alt="Dell Laptop Service Center Bangalore"
          />
        </div>

        <div className="col-md-2 col-4">
          <img
            src={hplogo}
            alt="HP Laptop Service Center Bangalore"
          />
        </div>

        <div className="col-md-2 col-4">
          <img
            src={asuslogo}
            alt="ASUS Laptop Repair Bangalore"
          />
        </div>

        <div className="col-md-2 col-4">
          <img
            src={acerlogo}
            alt="Acer Laptop Service Center Bangalore"
          />
        </div>

        <div className="col-md-2 col-4">
          <img
            src={microsoftlog}
            alt="Windows Laptop Repair Bangalore"
          />
        </div>

      </section>

      {/* Service Locations */}

      <section className="mt-5 text-center">

        <h2>Our Laptop Repair Service Locations</h2>

        <p>
          {locations.map((loc, index) => (
            <span key={loc}>
              <span
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() =>
                  navigate(`/laptop-service-center-in/${loc}`)
                }
              >
                {loc.replace(/-/g, " ")}
              </span>

              {index !== locations.length - 1 && " | "}
            </span>
          ))}
        </p>

      </section>

    </div>
  );
};

function isQueryMatch(model, searchQuery) {
  const query = searchQuery.toLowerCase().trim();

  const searchableText = `
    ${model.name || ""}
    ${model.description || ""}
    ${model.brand || ""}
    ${model.category || ""}
    ${model.model || ""}
  `
    .toLowerCase()
    .replace(/\s+/g, " ");

  return searchableText.includes(query);
}

export default Hero;