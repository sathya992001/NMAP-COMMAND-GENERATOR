import { FaGithub } from 'react-icons/fa';
import '../assets/fonts/Agustina.woff';
import '../styles/Header.css'; // Make sure you're importing your CSS file

const Header = () => {
  return (
    <header className="header glass-header">
      <div className="header-left">
        <h1 className="logo">Nmap Augur</h1> {/* Added logo class here */}
      </div>

      <a
        href="https://github.com/AbdulAHAD968/NMAP-COMMAND-GENERATOR"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <FaGithub size={32} />
      </a>
    </header>
  );
};

export default Header;