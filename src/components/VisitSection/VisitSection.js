import React from "react";
import "./VisitSection.css";

const VisitSection = () => {
  return (
    <section id="visit" className="visit-section">
      <div className="section-container">
        <h2 className="section-title">Visit Us</h2>
        <div className="visit-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>5968 B Main Street</p>
                <p>Mt Jackson, VA 22842</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>(540)477-HERO [4376]</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>herosjourneycardshop@gmail.com </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hours">
          <h3>
            <i className="fa-solid fa-clock"></i>&nbsp;&nbsp;Store Hours
          </h3>
          <p>
            <span>Monday - Tuesday</span> Closed
          </p>
          <p>
            <span>Wednesday - Saturday</span> 2:00 PM - 10:00 PM
          </p>
          <p>
            <span>Sunday:</span> 11:00 AM - 6:00 PM
          </p>
          <p className="small-text">
            <i>
              hours may change to accomodate events/tournaments/or community
              requests. We're still actively adjusting our hours to provide the
              best times for customers, while also not staying open without
              demand.
            </i>
          </p>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5291.630564314313!2d-78.64488662261863!3d38.74602627175676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b4557146054981%3A0x8ffcd033eb810c80!2sHero&#39;s%20Journey!5e1!3m2!1sen!2sus!4v1747049703848!5m2!1sen!2sus"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hero's Journey Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
export default VisitSection;
