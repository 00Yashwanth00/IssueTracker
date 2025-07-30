function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Issue Tracker</h3>
                    <p>Track and manage your project issues efficiently</p>
                </div>

                <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/issues">All Issues</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>support@issuetracker.com</p>
                    <p>+1 (555) 123-4567</p>
                </div>

                <div className="copyright">
                    <p>© {new Date().getFullYear()} Issue Tracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 