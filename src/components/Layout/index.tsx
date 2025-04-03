"use clinet";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./styles.module.scss";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles["main-content"]}>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
