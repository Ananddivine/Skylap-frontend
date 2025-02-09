import React, { useEffect, useState, useRef } from "react";
import Typed from "typed.js";
import './Css/About.css';

const About = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const typedRef = useRef(null);

  useEffect(() => {
    let typed;
    if (typedRef.current) {
      typed = new Typed(typedRef.current, {
        strings: ["Hello", "Welcome to my website!", "Enjoy your stay!"],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
      });
    }
    
    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, []);
  

  useEffect(() => {
    // Blinking effect
    const blinkInterval = setInterval(() => {
      const ele = document.getElementById("myBlinkingDiv");
      if (ele) {
        ele.style.visibility = ele.style.visibility === "hidden" ? "" : "visible";
      }
    }, 400);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div>
      <section id="about">
        <h1>ABOUT US</h1>
        <div className="contant">
          <div className="row">
            <div className="col-md-6">
              <h2>
                WHERE THE LAPTOP <br /> GET SERVICED BY SkyLap
              </h2>
              <div className="scroller">
                <span>
                  CHIP LEVEL <br />
                  EXPERT TECHNICIAN <br />
                  GENUINE <br />
                  SPARES
                </span>
              </div>
              <p>
                Skylap is a leading Laptop Service Center in Bangalore, dealing with major brands like Dell, Lenovo, Acer, Toshiba, Sony, HP, Asus, and Samsung.
              </p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter Your Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button id="btn" className={`submit ${submitted ? "submitted" : ""}`} type="submit">
                  {submitted ? <span className="tick">&#10004; Submitted</span> : "Submit"}
                  <i className="fa fa-6x fa-arrow-right"></i>
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <div className="box">
                <h3>
                  Why SkyLap <i className="fa fa-question"></i>
                </h3>
                <p>
                  <span ref={typedRef} className="auto-input"></span>
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="speed">
                <h3>
                  SPEED UP YOUR <br /> LAPTOP
                </h3>
                <div id="myBlinkingDiv">
                  <p>
                    <i className="fa fa-3x fa-bolt"></i> 35x faster
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Counter Section */}
          <section className="section-content-block section-counter-bg">
            <h1>HOW IS SKYLAP</h1>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="counter-block-1 text-center">
                    <i className="fa fa-users"></i>
                    <span className="counter">17</span>+
                    <p className="text-uppercase">Years Experience</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="counter-block-1 text-center">
                    <i className="fa fa-smile-o"></i>
                    <span className="counter">5843</span>
                    <p className="text-uppercase">Happy Customers</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="counter-block-1 text-center">
                    <i className="fa fa-desktop"></i>
                    <span className="counter">99.99%</span>
                    <p className="text-uppercase">Devices Fixed</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="counter-block-1 text-center">
                    <i className="fa fa-wrench"></i>
                    <span className="counter">4739</span>
                    <p className="text-uppercase">Current Fixings</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Life Section */}
          <div className="life">
            <h2>SkyLap Gives Life To Your Laptop</h2>
            <h3>
              <i className="fa fa-shield"></i> Protect Your Laptops With SkyLap
            </h3>
            <div className="shows">
              <p>
                A good laptop antivirus should have real-time malware protection, an advanced scanning engine, a firewall, and anti-phishing protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Link */}
      <a href="https://wa.me/+919606120007" className="whatsApp" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-whatsapp my-whatsApp"></i>
      </a>
    </div>
  );
};

export default About;
