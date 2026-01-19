import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>Mixtape Builder</div>
      <nav className={styles.links} aria-label="Primary navigation">
        <NavLink to="/library" className={({ isActive }) => (isActive ? styles.active : '')}>
          Library
        </NavLink>
        <NavLink to="/playlists" className={({ isActive }) => (isActive ? styles.active : '')}>
          Playlists
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
