import React from "react";
import "./Ourservice.css";

const Ourservice = () => {
  return (
    <section id="services">
      <div className="container">
        <h1 className="text-center">
          <span className="highlight">OUR</span> Services
        </h1>
        <div className="row services">
          {/* Laptop Services */}
          <div className="col-lg-3 col-md-6 text-center">
            <div className="icon">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <h3>LAPTOP SERVICES</h3>
              <p>
                Screen Replacement, Fan Issues, Touchpad Issues, Motherboard Issues,
                Display Errors, Keyboard Problems, Hinges Replacement, Sound Issues,
                Battery Issues, Software Installation. Experts recommend servicing
                your laptop at least once a year to ensure proper functionality.
              </p>
            </div>
          </div>

          {/* Spars */}
          <div className="col-lg-3 col-md-6 text-center">
            <div className="icon">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <h3>SPARES</h3>
              <p>
                We offer all kinds of laptop chargers, wireless mice, display screens,
                cooling fans, RAM, hard disks, batteries, SSD upgradation, RAM
                upgradation, HDD caddy, WiFi adapters, and more.
              </p>
            </div>
          </div>

          {/* Replacements */}
          <div className="col-lg-3 col-md-6 text-center">
            <div className="icon">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <h3>Replacements</h3>
              <p>
                We replace memory RAM, processors, video cards, hard drives, optical
                drives, keyboards, motherboards, display screens, fans, laptop panels,
                hinges, DC jack, USB ports, batteries, and display cables.
              </p>
            </div>
          </div>

          {/* Chip Level Service */}
          <div className="col-lg-3 col-md-6 text-center">
            <div className="icon">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <h3>Chip Level Service</h3>
              <p>
                We offer chip-level services including motherboard repair, power
                supply diagnostics, DC to DC conversion, digital IC testing, PWM
                technology applications, and power signal maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourservice;
