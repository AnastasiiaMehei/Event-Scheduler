import React, { ReactNode } from 'react';
import css from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <div className={css.container}>
      {children}
    </div>
    </>
    
  );
}
