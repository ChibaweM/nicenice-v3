import { Outlet } from "react-router-dom";
import Navbar from "../pages/landing/Navbar";
import styles from "../styles";

const Landing = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Landing;
