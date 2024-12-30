import React from "react";
import { Select } from "../../Atom";
import { TimeSlotMaker } from "../../Molecules";
import './createSlots.scss'

export const CreateSlots = () => {
  return (
    <div className="create-slots-container">
      <div className="create-slots-wrapper">
        <div className="col-1">
          <div className="slot-allocating-section">
            <p>Slot Availability</p>
            <div className="slot-cretating-area">
                <p className="slot-creating-title">Weekly Availability Status</p>
                <div className="slot-maker-container">
                    <div className="slot-maker-wrapper">
                        <TimeSlotMaker/>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};
