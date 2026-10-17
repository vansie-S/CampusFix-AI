
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/complaints";

function App() {
    const [complaint, setComplaint] = useState("");
    const [location, setLocation] = useState("");
    const [savedComplaint, setSavedComplaint] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [error, setError] = useState("");
    const [listError, setListError] = useState("");

    const fetchComplaints = useCallback(async () => {
        setListLoading(true);
        setListError("");

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Could not load complaints.");
            }

            const data = await response.json();
            setComplaints(Array.isArray(data) ? data : []);
        } catch (err) {
            setListError(
                err.message === "Failed to fetch"
                    ? "Cannot connect to the backend. Check that Spring Boot is running."
                    : err.message
            );
        } finally {
            setListLoading(false);
        }
    }, []);

    const updateComplaintStatus = async (id, status) => {
        setListError("");

        try {
            const response = await fetch(
                `${API_URL}/${id}/status?status=${encodeURIComponent(status)}`,
                { method: "PUT" }
            );

            if (!response.ok) {
                throw new Error("Could not update complaint status.");
            }

            await fetchComplaints();
        } catch (err) {
            setListError(err.message);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!complaint.trim()) {
            setError("Please enter your complaint.");
            return;
        }

        setLoading(true);
        setError("");
        setSavedComplaint(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: complaint.trim(),
                    location: location.trim() || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || data.error || "Could not save complaint."
                );
            }

            setSavedComplaint(data);
            setComplaint("");
            setLocation("");

            await fetchComplaints();
        } catch (err) {
            setError(
                err.message === "Failed to fetch"
                    ? "Cannot connect to the backend. Check that Spring Boot is running."
                    : err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>CampusFix AI</h1>
                <p>Smart Campus Complaint Management System</p>
            </header>

            <main className="container">
                <section className="card">
                    <h2>Submit a Complaint</h2>
                    <p>
                        Describe your campus problem. Our AI predicts its
                        category and priority, then saves it.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="complaint">
                            Complaint Description
                        </label>
                        <textarea
                            id="complaint"
                            rows="5"
                            placeholder="Example: Wi-Fi is not working in my hostel room..."
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            required
                        />

                        <label htmlFor="location">
                            Campus Location (optional)
                        </label>
                        <input
                            id="location"
                            type="text"
                            placeholder="Example: Hostel Block A, Room 101"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Complaint"}
                        </button>
                    </form>

                    {error && <p className="error">{error}</p>}
                </section>

                {savedComplaint && (
                    <section className="card result">
                        <h2>Complaint Saved Successfully!</h2>
                        <p>
                            <strong>Complaint ID:</strong>{" "}
                            {savedComplaint.complaintId}
                        </p>
                        <p>
                            <strong>Predicted Category:</strong>{" "}
                            {savedComplaint.category || "Not available"}
                        </p>
                        <p>
                            <strong>Predicted Priority:</strong>{" "}
                            {savedComplaint.priority || "Not available"}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {savedComplaint.status || "OPEN"}
                        </p>
                        <p className="note">
                            Your complaint was saved by the backend.
                        </p>
                    </section>
                )}

                <section className="card">
                    <h2>All Complaints</h2>

                    <button
                        type="button"
                        onClick={fetchComplaints}
                        disabled={listLoading}
                    >
                        {listLoading ? "Refreshing..." : "Refresh Complaints"}
                    </button>

                    {listError && <p className="error">{listError}</p>}

                    {listLoading && complaints.length === 0 && (
                        <p>Loading complaints...</p>
                    )}

                    {!listLoading &&
                        !listError &&
                        complaints.length === 0 && (
                            <p>No complaints found yet.</p>
                        )}

                    {complaints.length > 0 && (
                        <div className="complaints-list">
                            {complaints.map((item) => (
                                <article
                                    className="complaint-item"
                                    key={item.complaintId}
                                >
                                    <h3>Complaint #{item.complaintId}</h3>

                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {item.description}
                                    </p>

                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {item.location || "Not provided"}
                                    </p>

                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {item.category || "Not assigned"}
                                    </p>

                                    <p>
                                        <strong>Priority:</strong>{" "}
                                        {item.priority || "Not assigned"}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {item.status || "Not assigned"}
                                    </p>

                                    <label htmlFor={`status-${item.complaintId}`}>
                                        Update Status
                                    </label>

                                    <select
                                        id={`status-${item.complaintId}`}
                                        value={item.status || "OPEN"}
                                        onChange={(e) =>
                                            updateComplaintStatus(
                                                item.complaintId,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="IN-PROGRESS">
                                            IN-PROGRESS
                                        </option>
                                        <option value="RESOLVED">RESOLVED</option>
                                    </select>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;







