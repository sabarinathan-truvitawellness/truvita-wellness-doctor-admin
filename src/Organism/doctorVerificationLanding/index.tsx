import React from "react";
import {
  PhoneWith24,
  RightArrow,
  SandClock,
  Web,
} from "../../utils/common/svgIcons";
import { Link } from "react-router-dom";
import doctorImgOne from "../../Assets/images/doctorVerification/doctor-verification-img-1.png";
import doctorImgTwo from "../../Assets/images/doctorVerification/doctor-verification-img-2.png";
import './doctorVerificationLanding.scss'

export const DoctorVerificationLanding = () => {
  return (
    <div className="dvl-container">
      <div className="dvl-wrapper">
        <div className="dvl-col-1">
          <div className="dvl-col-1-wrapper">
            <div className="icon-wrapper">
              <SandClock />
            </div>
            <div className="description-container">
              <p className="chief-description">
                Verification Pending. Your Patience will help us build you the
                best service.
              </p>

              <p className="normal-description">
                Our team is diligently reviewing your credentials to ensure
                compliance and quality.
              </p>
            </div>
            <div className="learn-more-btn">
              <Link to="#">Learn More</Link>
            </div>

            <div className="horizontal-line"></div>

            <div className="contact-section">
              <div className="contact-section-card">
                <div className="contact-card-wrapper">
                  <div className="row-1">
                    <div className="icon-separataor">
                      <PhoneWith24 />
                    </div>
                    <div className="icon-separataor">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="row-2">
                    <span>Help & Support</span>
                  </div>
                </div>
              </div>
              <div className="contact-section-card">
                <div className="contact-card-wrapper">
                  <div className="row-1">
                    <div className="icon-separataor">
                      <Web />
                    </div>
                    <div className="icon-separataor">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="row-2">
                    <span>Visit Our Website</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dvl-col-2">
            <div className="img-1-wrapper">
            <img src={doctorImgTwo} />
            </div>
            <div className="img-2-wrapper">
            <img src={doctorImgOne} />
            </div>
        </div>
      </div>
    </div>
  );
};
