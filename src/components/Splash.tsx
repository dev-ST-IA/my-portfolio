import React, { FC } from 'react';
import styles from "../styles/splash.module.css"

type SplashProps = {
  loading: boolean;
};

const Splash: FC<SplashProps> = ({ loading }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}>
          <div className={styles.loader}></div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Splash;
