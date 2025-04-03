import React from "react";
import styles from "./styles.module.scss";

export default function RenderTitle({ title }: { title: string }) {
	return <div className={styles.title}>{title}</div>;
}
