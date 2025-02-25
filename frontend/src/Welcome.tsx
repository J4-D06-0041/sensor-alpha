import { FaBuilding, FaUser, FaMicrochip } from "react-icons/fa";
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
                    <img src="/assets/hpv_logo.png" alt="Company Logo" />
                </div>

                <div className={styles.left_side_choices}>
                    <div
                        className={`${styles.company_name} ${selectedSection === "Company" ? styles.active : ""}`}
                        onClick={() => handleSectionClick("Company")}
                    >
                        <div className={styles.company_icon}><FaBuilding /></div>
                        <span>Company</span>
                    </div>

                    <div
                        className={`${styles.users_name} ${selectedSection === "Users" ? styles.active : ""}`}
                        onClick={() => handleSectionClick("Users")}
                    >
                        <div className={styles.user_icon}><FaUser /></div>
                        <span>Users</span>
                    </div>

                    <div
                        className={`${styles.sensors_name} ${selectedSection === "Sensors" ? styles.active : ""}`}
                        onClick={() => handleSectionClick("Sensors")}
                    >
                        <div className={styles.sensors_icon}><FaMicrochip /></div>
                        <span>Sensors</span>
                    </div>
                </div>
            </div>

            <div className={styles.stage}>
                {selectedSection === "Company" && (
                    <div className={styles.company_container}>
                        {companyData.map((company) => (
                            <div key={company.id} className={styles.company_box}>
                                <img src={`/assets/${company.logo}`} alt={`${company.name} Logo`} />
                                <strong>{company.name}</strong>

                                <div className={styles.company_details}>
                                    <p><strong>Address:</strong> {company.address}</p>
                                    <p><strong>Description:</strong> {company.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Welcome;