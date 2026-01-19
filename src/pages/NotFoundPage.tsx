import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <p className="muted">Page not found.</p>
      <Link to="/library">
        <button>Back to Library</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
