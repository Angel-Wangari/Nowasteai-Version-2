
import { useEffect, useState } from "react";
import "./equipment.css";

const equipmentOptions = [
    { name: "has_cooker", label: "Cooker/Stovetop" },
    { name: "has_frying_pan", label: "Frying pan" },
    { name: "has_oven", label: "Oven" },
    { name: "has_microwave", label: "Microwave" },
    { name: "has_blender", label: "Blender" },
    { name: "has_air_fryer", label: "Air fryer" }
];

const emptyEquipment = {
    has_cooker: false,
    has_frying_pan: false,
    has_oven: false,
    has_microwave: false,
    has_blender: false,
    has_air_fryer: false
};

function EquipmentSetup() {
    const [equipment, setEquipment] = useState(emptyEquipment);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
        setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
}, [success]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/Equipment"
                );

                if (!response.ok) {
                    throw new Error("Could not load your equipment.");
                }

                const data = await response.json();
                setEquipment({
                    ...emptyEquipment,
                    ...data
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    const handleChange = (event) => {
        const { name, checked } = event.target;

        setEquipment((current) => ({
            ...current,
            [name]: checked
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/Equipment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(equipment)
                }
            );

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(
                    data?.detail
                        ? JSON.stringify(data.detail)
                        : "Could not save your equipment."
                );
            }

            const savedEquipment = await response.json();

            setEquipment({
                ...emptyEquipment,
                ...savedEquipment
            });
            setShowForm(false);
            setSuccess("Equipment saved successfully.");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const selectedEquipment = equipmentOptions.filter(
        (item) => equipment[item.name]
    );

    if (loading) {
        return (
            <main className="equipment-page">
                <h1>Your Kitchen Equipment</h1>
                <p>Loading your equipment...</p>
            </main>
        );
    }
    
    return (
        <main className="equipment-page">
            <div className="equipment-header">
                <div>
                    <h1>Your Kitchen Equipment</h1>
                    <p>
                        Manage the equipment available in your kitchen
                        so we can suggest recipes you can prepare.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setSuccess("");
                            setShowForm(true);
                        }}
                    >
                        {selectedEquipment.length > 0
                            ? "Edit Equipment"
                            : "Set Up Equipment"}
                    </button>
                )}
            </div>

            {error && <p className="equipment-error">{error}</p>}
            {success && <p className="equipment-success">{success}</p>}

            {!showForm ? (
                <section className="equipment-summary">
                    <h2>Your Equipment</h2>

                    {selectedEquipment.length > 0 ? (
                        <div className="equipment-list">
                            {selectedEquipment.map((item) => (
                                <div
                                    className="equipment-card"
                                    key={item.name}
                                >
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="equipment-empty">
                            <h3>No equipment added yet</h3>
                            <p>
                                Set up your kitchen equipment to get
                                recipes that match what you have.
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowForm(true)}
                            >
                                Set Up Equipment
                            </button>
                        </div>
                    )}
                </section>
            ) : (
                <form
                    className="equipment-form"
                    onSubmit={handleSubmit}
                >
                    <h2>
                        {selectedEquipment.length > 0
                            ? "Edit Your Equipment"
                            : "Set Up Your Equipment"}
                    </h2>

                    <p>Select all the equipment you have.</p>

                    <div className="equipment-options">
                        {equipmentOptions.map((item) => (
                            <label
                                className="equipment-option"
                                key={item.name}
                            >
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    checked={equipment[item.name]}
                                    onChange={handleChange}
                                />
                                {item.label}
                            </label>
                        ))}
                    </div>

                    <div className="equipment-actions">
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setError("");
                            }}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Equipment"}
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
}

export default EquipmentSetup;
