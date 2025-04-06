'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'

import styles from './style.module.scss'

export default function Banner({
  list,
}: {
  list: string[] | StaticImageData[]
}) {
  return (
    <div className={styles.wrapper}>
      {list.length > 0 && (
        <Swiper
          {...{
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: list.length > 1 ? true : false,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            },
            modules: list.length > 1 ? [Autoplay, Pagination] : [],
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
          {list.map((url, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.imgWrap}>
                <Image className={styles.item} src={url} alt="" fill />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
