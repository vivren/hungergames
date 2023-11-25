// components/MobileFrame.tsx

import React, { ReactNode } from 'react';
import styles from './MobileFrame.module.css';

interface MobileFrameProps {
    children: ReactNode;
  }
  

const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  };

export default MobileFrame;
