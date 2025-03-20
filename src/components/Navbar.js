import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa"; // Importing icon

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={navbarStyle}>
            <div className="container">
                {/* Brand with Icon */}
                <Link className="navbar-brand d-flex align-items-center" to="/" style={brandStyle}>
                    <FaDumbbell style={iconStyle} /> {/* Added Dumbbell Icon */}
                    Health & Fitness Tracker
                </Link>

                {/* Toggle Button for Mobile View */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    style={toggleButtonStyle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home-page" style={linkStyle}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/fitness-insight" style={linkStyle}>
                                Fitness Insights
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/workout-home" style={linkStyle}>
                                Workouts
                            </Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calorie-log" style={linkStyle}>
                                Calorie Logs
                            </Link>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Styles
const navbarStyle = {
    background: 'linear-gradient(90deg, #1c2e4a, #2e3d59)', // Modern Gradient Background
    padding: '1rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    borderBottom: '2px solid #ff9800' // Stylish Border Highlight
};

const brandStyle = {
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: '700',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    fontSize: '1.8rem',
    color: '#ff9800', // Matching the border color
    marginRight: '10px'
};

const linkStyle = {
    color: '#f0f0f0',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    transition: 'color 0.3s ease, background-color 0.3s ease',
    textDecoration: 'none'
};

const toggleButtonStyle = {
    border: 'none',
    backgroundColor: 'transparent'
};

// Hover effect for links
const hoverEffect = `
    .nav-link:hover {
        color: #ff9800 !important; /* Highlight color */
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
    }
`;

// Injecting hover effect into the document
const style = document.createElement('style');
style.innerHTML = hoverEffect;
document.head.appendChild(style);

export default Navbar;
