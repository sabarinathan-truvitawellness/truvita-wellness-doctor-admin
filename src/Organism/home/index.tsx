import React, { ReactNode } from "react";
import { CalendarComponent } from "../../Atom";


export const Home = (() => {
    return (
        <div className="page-render-container">
            <div className="container-wrapper">
               <CalendarComponent/>
            </div>
        </div>
    )
});

