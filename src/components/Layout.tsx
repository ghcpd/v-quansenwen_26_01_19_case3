import { ReactNode } from 'react';
import styles from './Layout.module.css';
import NavBar from './NavBar';
import NowPlayingBar from './NowPlayingBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.appShell}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <NowPlayingBar />
    </div>
  );
};

export default Layout;
