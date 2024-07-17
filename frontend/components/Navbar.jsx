import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		console.log('Token removed from sessionStorage');
		alert('Log out successful');
		navigate('/');
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container navbarContainer">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto nav-buttons">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<div className="loginDiv">
						<Link to="/log_in">
							<button className="btn btn-primary">Log In</button>
						</Link>
						<button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
					</div>
				</div>	
			</div>
		</nav>
	);
};