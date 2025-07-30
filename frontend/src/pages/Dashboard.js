import { useContext } from "react";
import { Link } from "react-router-dom";
import { IssueContext, AuthContext } from "../context";
import IssueList from "../components/issues/IssueList";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import "../styles/components/dashboard.css";

export default function Dashboard() {
    const { issues, loading } = useContext(IssueContext);
    const { user } = useContext(AuthContext);

    const myIssues = issues.filter(issue => issue.assignedTo === user.id);

    return (
        <div>
            <section className="quick-actions">
                <Link to="/issues/create" className="btn">+ New Issue</Link>
            </section>

            <section className="stats">
                <div className="stat-card">
                <h3>Open Issues</h3>
                <p>{issues.filter(i => i.status === "Open").length}</p>
                </div>
                <div className="stat-card">
                <h3>Assigned to Me</h3>
                <p>{myIssues.length}</p>
                </div>
            </section>
            {loading ? <LoadingSpinner /> : <IssueList issues={myIssues} />}
        </div>
    );
}