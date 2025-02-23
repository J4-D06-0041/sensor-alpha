import { FaBars, FaBuilding, FaUser, FaMicrochip } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styles from "./components/Welcome.module.css";

function Welcome() {
    const location = useLocation();
    const name = location.state?.name || "Guest";

    return (
        <div className={styles.full_screen_box}>
            <div className={styles.box1}>
                <img src="/assets/hpv-logo.png" alt="HPV Logo" className={styles.logo} />
            </div>
            <div className={styles.box2}>
                <span className={styles.welcomeText}>Welcome, {name}</span>
                <FaBars className={styles.hamburgerIcon} {...({} as React.ComponentProps<'svg'>)} />
            </div>
            <div className={styles.box3}>
                <div className={styles.menuItem}>
                    <FaBuilding className={styles.menuIcon} {...({} as React.ComponentProps<'svg'>)} />
                    <span>Company</span>
                </div>
                <div className={styles.menuItem}>
                    <FaUser className={styles.menuIcon} {...({} as React.ComponentProps<'svg'>)} />
                    <span>Users</span>
                </div>
                <div className={styles.menuItem}>
                    <FaMicrochip className={styles.menuIcon} {...({} as React.ComponentProps<'svg'>)} />
                    <span>Sensors</span>
                </div>
            </div>
            <div className={styles.box4}></div>
        </div>
    );
}

export default Welcome;