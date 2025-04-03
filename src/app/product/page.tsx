'use client'
import Image from 'next/image'
import Banner from '@/components/Banner'
import Layout from '@/components/Layout'
import banner1 from '@/assets/images/product/banner1.webp'
import { gameList } from './data'
import styles from './styles.module.scss'

export default function Product() {
  return (
    <Layout>
      <div className={styles.container}>
        <Banner list={[banner1]} />

        <div className={styles.listWrap}>
          <div className={styles.list}>
            {gameList.map((item) => {
              return (
                <div className={styles.card} key={item.id}>
                  <Image className={styles.cardCover} src={item.image} alt="" />
                  <div className={styles.cardContent}>
                    <Image
                      className={`${styles.cardTitle} ${styles.cardTitle}${item.id}`}
                      src={item.title}
                      alt=""
                    />
                    <div className={styles.cardText}>
                      {item.content.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                    </div>

                    <div className={styles.cardTip}>NHÀ CUNG CẤP</div>

                    <div className={styles.cardIcons}>
                      {item.icons.map((icon, idx) => (
                        <div className={styles.iconItem} key={idx}>
                          <div className={styles.gameIconWrap}>
                            <Image
                              className={`${styles.gameIcon} ${styles.gameIconWhite}`}
                              src={icon.white}
                              alt=""
                            />
                            <Image
                              className={`${styles.gameIcon} ${styles.gameIconBlue}`}
                              src={icon.blue}
                              alt=""
                            />
                          </div>
                          <div className={styles.gameIconText}>
                            {icon.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
