function AuthLayout({ children }) {
    return (
        <div className="auth-layout">
            <header className="auth-header">
                <h1>Issue Tracker</h1>
            </header>
            <main className="auth-main">
                {children}
            </main>
            <footer className="auth-footer">
            <p>© {new Date().getFullYear()} Issue Tracker</p>
            </footer>
        </div>
    );
};
 
export default AuthLayout;