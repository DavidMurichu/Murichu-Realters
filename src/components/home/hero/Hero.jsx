import React from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <video autoPlay muted loop id="background-video">
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <div className="home-search">
          <Link to="/listings">
            <i className="fa fa-search"></i>
            <h3>Click here to search for properties</h3>
          </Link>
        </div>
        <div className="contact-hero-card">
          <h1 className="card-heading">
            MURICHU REALTERS
          </h1>
          <p>
            Receive updates, hot deals, tutorials, and discounts sent straight to your inbox every month.
          </p>
          <Link to="/contact">
            Contact our agents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
