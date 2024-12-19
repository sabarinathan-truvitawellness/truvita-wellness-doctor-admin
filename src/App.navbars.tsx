
// import React, { ReactNode, useEffect, useState } from "react";
// import { Header, NavBar } from "./Molecules";
// import { useVerificationStatusQuery } from "./redux/services";
// import { AppRoutes } from "./routes";
// import { Navigate } from "react-router-dom";

// interface AppNavBarsProps {
//   children?: ReactNode;
// }

// export const AppNavBars: React.FC<AppNavBarsProps> = ({ children }) => {
//   const [isCentPercent, setIsCentPercent] = useState<boolean | null>(null);
//   const [redirect, setRedirect] = useState(false);
//   const userId = localStorage.getItem("userId");

//   const { data: verificationStatus } = useVerificationStatusQuery(userId);

//   console.log("Verification Status:", verificationStatus?.percentage_completion);

//   useEffect(() => {
//     if (verificationStatus) {
//       if (verificationStatus.percentage_completion === 100) {
//         setIsCentPercent(true);
//       } else if(verificationStatus?.percentage_completion != 100) {
//         setRedirect(true);
//       }
//     }
//   }, [verificationStatus]);

//   if (redirect) {
//     // window.location.href = AppRoutes.doctorOnBoardingProgress;
//     return <Navigate to={AppRoutes.doctorOnBoardingProgress} />;
//   }

//   return (
//     <div className="page-render-container">
//       <div className="container-wrapper flex justify-between">
//         <div className="pr-col-1">{isCentPercent && <NavBar />}</div>
//         <div className="pr-col-2 flex-1">
//           {isCentPercent && <Header />}
//           {children}
//           <p>&#169; All Rights Reserved</p>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { ReactNode, useEffect, useState } from "react";
import { Header, NavBar } from "./Molecules";
import { useVerificationStatusQuery } from "./redux/services";
import { AppRoutes } from "./routes";
import { Navigate, useNavigate } from "react-router-dom";

interface AppNavBarsProps {
  children?: ReactNode;
}

export const AppNavBars: React.FC<AppNavBarsProps> = ({ children }) => {
  const [isCentPercent, setIsCentPercent] = useState<boolean | null>(null);
  const navigate = useNavigate(); // React Router navigation hook
  const userId = localStorage.getItem("userId");

  const { data: verificationStatus } = useVerificationStatusQuery(userId);

  console.log("Verification Status:", verificationStatus?.percentage_completion);

  useEffect(() => {
    if (verificationStatus) {
      if (verificationStatus.percentage_completion === 100) {
        setIsCentPercent(true);
      } else if (verificationStatus.percentage_completion !== 100) {
        navigate(AppRoutes.doctorOnBoardingProgress);
      }
    }
  }, [verificationStatus]);



  return (
    <div className="page-render-container">
      <div className="container-wrapper flex justify-between">
        <div className="pr-col-1">{isCentPercent && <NavBar />}</div>
        <div className="pr-col-2 flex-1">
          {isCentPercent && <Header />}
          {children}
          <p>&#169; All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};
