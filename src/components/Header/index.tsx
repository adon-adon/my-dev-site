"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import mainLogo from "@/assets/images/main/mainLogo.png";

import styles from "./styles.module.scss";

const navItems = [
	{
		title: "TRANG CHỦ",
		routerName: "/",
	},
	{
		title: "CHÍNH SÁCH HOA HỒNG",
		routerName: "bonus",
	},
	{
		title: "KHUYẾN MÃI",
		routerName: "promotion",
	},
	{
		title: "SẢN PHẨM",
		routerName: "product",
	},
	{
		title: "LIÊN HỆ",
		routerName: "contact",
	},
	{
		title: "ĐIỀU KHOẢN VÀ ĐIỀU KIỆN",
		routerName: "terms",
	},
];

export default function Navbar() {
	const router = useRouter();
	const [currPathname, setCurrPathname] = useState("");
	const pathname = usePathname();

	useEffect(() => {
		const path = pathname.slice(1);
		setCurrPathname(path ? path : "/");
	}, [pathname]);

	const goToLogin = () => {
		// router.push("/login");
		window.open("https://test-2q-agent.2qsport.me/", "_blank");
	};

	const goToRegister = () => {
		router.push("/register");
	};

	return (
		<div className={styles.content}>
			<div className={styles.userControlWrap}>
				<div className={styles.userControl}>
					<div className={styles.leftTitle}>Chất lượng đi đôi tinh thần thể thao</div>
					<div className={styles.rightControl}>
						<div className={`${styles.button} ${styles.buttonBlue}`} onClick={goToLogin}>
							ĐĂNG NHẬP
						</div>

						<div className={styles.button} onClick={goToRegister}>
							ĐĂNG KÝ NGAY
						</div>
					</div>
				</div>
			</div>

			<div className={styles.navControl}>
				<div className={styles.realContent}>
					<Image
						src={mainLogo}
						className={styles.mainLogo}
						alt=""
						onClick={() => {
							router.push("/");
						}}
					/>
					<div className={styles.navLists}>
						{navItems.map((item, idx) => (
							<div
								key={idx}
								className={`${styles.navItem} ${currPathname == item.routerName ? styles.active : styles.normal}`}
								onClick={() => {
									router.push(`/${item.routerName}`);
									setCurrPathname(item.routerName);
								}}
							>
								{item.title}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
