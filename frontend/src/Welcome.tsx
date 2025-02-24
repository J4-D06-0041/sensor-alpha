import { FaBars, FaBuilding, FaUser, FaMicrochip } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./components/Welcome.module.css";

function Welcome() {
    const location = useLocation();
    const name = location.state?.name || "Guest";
    
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [companyData, setCompanyData] = useState<any[]>([]);

    const fetchCompanyData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/company`);
            const data = await response.json();
            setCompanyData(data);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };

    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
        if (section === "Company") {
            fetchCompanyData();
        }
    };

    return (
        <div className={styles.full_screen_box}>
            <div className={styles.left_side_bar}>
                <div className={styles.company_logo}>
                    <img src="/assets/hpv-logo.png" alt="Company Logo" />
                </div>

                <div className={styles.company_name} onClick={() => handleSectionClick("Company")}>
                    <div className={styles.company_icon}><FaBuilding /></div>
                    <span>Company</span>
                </div>

                <div className={styles.users_name} onClick={() => handleSectionClick("Users")}>
                    <div className={styles.user_icon}><FaUser /></div>
                    <span>Users</span>
                </div>

                <div className={styles.sensors_name} onClick={() => handleSectionClick("Sensors")}>
                    <div className={styles.sensors_icon}><FaMicrochip /></div>
                    <span>Sensors</span>
                </div>
            </div>

            <div className={styles.stage}>
                {selectedSection && <h2>You are inside {selectedSection}</h2>}

                {selectedSection === "Company" && (
                    <div>
                        <h3>Company Details</h3>
                        <ul>
                            {companyData.map((company) => (
                                <li key={company.id}>
                                    <strong>{company.name}</strong> - {company.location}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Welcome;