"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

import slider1 from "@/assets/images/main/slider1.webp";
import slider2 from "@/assets/images/main/slider2.webp";
import slider3 from "@/assets/images/main/slider3.webp";
import slider4 from "@/assets/images/main/slider4.webp";

import styles from "./styles.module.scss";
import Image from "next/image";

export default function SwiperCustom() {
	return (
		<Swiper
			{...{
				effect: "coverflow",
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: "auto",
				loop: true,
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 200,
					modifier: 1,
					slideShadows: false,
				},
				modules: [Autoplay, Pagination],
				className: styles.swiperInner,
				pagination: {
					clickable: true,
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
			}}
		>
			{[slider1, slider2, slider3, slider4].map((url, idx) => (
				<SwiperSlide key={idx}>
					<Image className={styles.item} src={url} alt="" />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
