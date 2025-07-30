import { Link } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import "../styles/components/home.css";

export default function Home() {
    return (
        <div>
            <Header />
            <main>
                <section className="hero">
                <h1>Track Issues Efficiently</h1>
                    <p>Manage bugs, tasks, and projects in one place.</p>
                    <div className="cta-buttons">
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                    </div>
                </section>

                <section className="features">
                <div className="feature-card">
                    <h3>Create & Assign Issues</h3>
                    <p>Report bugs and assign them to team members.</p>
                </div>
                <div className="feature-card">
                    <h3>Track Progress</h3>
                    <p>Monitor issue status (Open, In Progress, Resolved).</p>
                </div>
                <div className="feature-card">
                    <h3>Collaborate</h3>
                    <p>Discuss issues with comments and attachments.</p>
                </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}