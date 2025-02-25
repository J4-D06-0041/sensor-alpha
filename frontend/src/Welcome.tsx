import { FaBuilding, FaUser, FaMicrochip, FaPlus, FaPlusSquare, FaGooglePlusSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./components/Welcome.module.css";

function Welcome() {
    const location = useLocation();
    const name = location.state?.name || "Guest";

    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [companyData, setCompanyData] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        logo: "",
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/company`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowForm(false);
                fetchCompanyData(); // Refresh company list
            } else {
                console.error("Failed to add company");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

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
                        <div className={styles.card}>
                            <div className={styles.card_inner}>
                                <div className={styles.card_front}>
                                    <img src={`/assets/add_company.png`} alt={`Add Company Logo`} />
                                </div>
                                <div className={styles.card_back}>
                                    <p>Back Side</p>
                                </div>
                            </div>
                        </div>

                        {companyData.map((company) => (
                            <div key={company.id} className={styles.card}>
                                <div className={styles.card_inner}>
                                    <div className={styles.card_front}>
                                        <img src={`/assets/${company.logo}`} alt={`${company.name} Logo`} />
                                    </div>
                                    <div className={styles.card_back}>
                                        <p className={styles.card_back_address}>{company.address}</p>
                                        <p className={styles.card_back_description}>{company.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {showForm && (
                    <div className={styles.form_overlay}>
                        <form className={styles.company_form} onSubmit={handleSubmit}>
                            <h2>Add Company</h2>
                            <input type="text" name="name" placeholder="Company Name" onChange={handleInputChange} required />
                            <input type="text" name="address" placeholder="Company Address" onChange={handleInputChange} required />
                            <textarea name="description" placeholder="Company Description" onChange={handleInputChange} required />
                            <input type="text" name="logo" placeholder="Logo Filename (e.g. logo.png)" onChange={handleInputChange} required />
                            <div className={styles.form_buttons}>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={toggleForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Welcome;