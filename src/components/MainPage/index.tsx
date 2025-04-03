// "use client";
import Image from 'next/image'
import WrapMask from '../WrapMask'
import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import SwiperCustom from '@/components/Swiper'
import maskBg from '@/assets/images/main/maskBg.png'
import maskBottom from '@/assets/images/main/maskBottom.png'

import topTitle from '@/assets/images/main/topTitle.png'

import card1 from '@/assets/images/main/card1.webp'
import card2 from '@/assets/images/main/card2.webp'
import card3 from '@/assets/images/main/card3.webp'

import littleCard1 from '@/assets/images/main/littleCard1.webp'
import littleCard2 from '@/assets/images/main/littleCard2.webp'
import littleCard3 from '@/assets/images/main/littleCard3.webp'
import littleCard4 from '@/assets/images/main/littleCard4.webp'
import littleCard5 from '@/assets/images/main/littleCard5.webp'
import littleCard6 from '@/assets/images/main/littleCard6.webp'
import bottomImg from '@/assets/images/main/bottomImg.webp'
import banner1 from '@/assets/images/main/banner1.webp'

import UserAction from './UserAction'
import styles from './styles.module.scss'

export default function MainPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <Banner list={[banner1]} />

        <div className={styles.largeBg}>
          <div className={styles.cardContent}>
            <Image className={styles.maskBg} src={maskBg} alt="" />
            <Image className={styles.topTitle} src={topTitle} alt="" />

            <div className={styles.cardWrap}>
              <Image
                className={styles.card}
                src={card1}
                alt=""
                quality={100}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
              <Image className={styles.card} src={card2} alt="" />
              <Image className={styles.card} src={card3} alt="" />
            </div>
          </div>

          <UserAction />

          <div className={styles.cardContentSecond}>
            <div className={styles.title}>VÌ SAO NÊN CHỌN CHÚNG TÔI</div>

            <div className={styles.swiperSecond}>
              <Image className={styles.maskBg} src={maskBg} alt="" />
              <Image className={styles.maskBottom} src={maskBottom} alt="" />
              <SwiperCustom />
            </div>
          </div>

          <div className={styles.cardContentThird}>
            <div className={styles.title}>LỢI ÍCH KHI LÀM ĐỐI TÁC</div>

            <div className={styles.littleCardWrap}>
              <Image className={styles.littleCard} src={littleCard1} alt="" />
              <Image className={styles.littleCard} src={littleCard2} alt="" />
              <Image className={styles.littleCard} src={littleCard3} alt="" />
              <Image className={styles.littleCard} src={littleCard4} alt="" />
              <Image className={styles.littleCard} src={littleCard5} alt="" />
              <Image className={styles.littleCard} src={littleCard6} alt="" />
            </div>

            <Image className={styles.bottomImg} src={bottomImg} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
