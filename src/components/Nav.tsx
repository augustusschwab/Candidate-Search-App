import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/" className="nav-item nav-link active">Home</Link>
      <Link to="/SavedCandidates" className="nav-item nav-link active">Potential Candidates</Link>
    </nav>
  )
};

export default Nav;
