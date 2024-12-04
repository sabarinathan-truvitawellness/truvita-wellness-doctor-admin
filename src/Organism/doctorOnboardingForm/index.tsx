import React from "react";
import { Input, Select } from "../../Atom";
import './doctorOnboardingForm.scss'

export const DocotorOnBoardingForm = () => {
  return (
    <div className="doctor-onboarding-form-container">
      <div className="form-wrapper">

        {/* Row 1 */}
        <div className="form-row">
          <div className="global-input-wrapper">
            <Select
              label="Speciality"
              value=""
              options={[]}
              onChange={(value: string, name: string): void => {}}
              name="option1"
              helperText=""
            />
          </div>
          <div className="global-input-wrapper">
            <Select
              label="Credentials"
              value=""
              options={[]}
              onChange={(value: string, name: string): void => {}}
              name="option2"
              helperText=""
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
        <div className="global-input-wrapper">
            <Select
              label="License State"
              value=""
              options={[]}
              onChange={(value: string, name: string): void => {}}
              name="option3"
              helperText=""
            />
          </div>
          <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              label="License Number"
              externalClassName="internal-input-lastname"
              variant="outlined"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
        <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              label="NPI Number"
              externalClassName="internal-input-lastname"
              variant="outlined"
            />
          </div>
          <div className="global-input-wrapper">
            <Select
              label="Language"
              value=""
              options={[]}
              onChange={(value: string, name: string): void => {}}
              name="option4"
              helperText=""
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          {/* <div className="global-input-wrapper">
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              label="Email Address"
              externalClassName="internal-input-email"
              variant="outlined"
            />
          </div>
          <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Phone Number"
              name="phone"
              label="Phone Number"
              externalClassName="internal-input-phone"
              variant="outlined"
            />
          </div> */}
        </div>

        {/* Row 5 */}
        <div className="form-row">
          <div className="global-input-wrapper">
            <Select
              label="Type of Service"
              value=""
              options={[]}
              onChange={(value: string, name: string): void => {}}
              name="option5"
              helperText=""
            />
          </div>
          <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Address"
              name="address"
              label="Service Name"
              externalClassName="internal-input-address"
              variant="outlined"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
