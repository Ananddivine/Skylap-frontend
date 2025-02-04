import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import bannerImg from '../../Components/Assets/eddit.png'
import treeImg from '../../Components/Assets/tree.jpg'
import backgroundImg from '../../Components/Assets/background.jpg'
import '../../Components/Slider/Slider.css'

const Slider = () => {
  return (
    <div className="slider" id="top">
      <div id="headerlider" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        {/* Carousel Indicators */}
        <ol className="carousel-indicators">
          <li data-bs-target="#headerlider" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#headerlider" data-bs-slide-to="1"></li>
          <li data-bs-target="#headerlider" data-bs-slide-to="2"></li>
        </ol>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block img-fluid" src={bannerImg} alt="First slide" />
            <div className="carousel-caption">
              <h5>WELCOME TO SkyLap</h5>
              <p><strong>The Service Excellence</strong></p>            
            </div>
          </div>

          <div className="carousel-item">
            <img className="d-block img-fluid" src={treeImg} alt="Second slide" />
            <div className="carousel-caption">
              <h5>WELCOME TO SKYLAP</h5>
              <p><strong>The Service Excellence</strong></p>            
            </div>
          </div>

          <div className="carousel-item">
            <img className="d-block img-fluid" src={backgroundImg} alt="Third slide" />
            <div className="carousel-caption">
              <h5>WELCOME TO SKYLAP</h5>
              <p><strong>The Service Excellence</strong></p>            
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <a className="carousel-control-prev" href="#headerlider" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#headerlider" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Slider;
