'use client'
import React, { JSX } from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import {
  Icon18Svg,
  IconBmmSvg,
  IconEmailSvg,
  IconFacebookSvg,
  IconGambleSvg,
  IconGameCareSvg,
  IconIovationSvg,
  IconTelegramSvg,
  IconThreatMetrixSvg,
} from '@/assets/svg'
import { getS3Url } from '@/utils'
import GameLogo1 from '@/assets/images/common/gameLogo/game-logo-01.png'
import GameLogo2 from '@/assets/images/common/gameLogo/game-logo-02.png'
import GameLogo3 from '@/assets/images/common/gameLogo/game-logo-03.png'
import GameLogo4 from '@/assets/images/common/gameLogo/game-logo-04.png'
import GameLogo5 from '@/assets/images/common/gameLogo/game-logo-05.png'
import GameLogo6 from '@/assets/images/common/gameLogo/game-logo-06.png'
import GameLogo7 from '@/assets/images/common/gameLogo/game-logo-07.png'
import GameLogo8 from '@/assets/images/common/gameLogo/game-logo-08.png'

import styles from './styles.module.scss'
import { useQuery } from '@tanstack/react-query'
import { apiPost } from '@/utils/axiosInstance'

const LinkList: LinkItem[] = [
  {
    name: 'telegram',
    svg: <Image className={styles.svgIcon} src={IconTelegramSvg} alt="" />,
    link: '',
  },
  {
    name: 'email',
    svg: <Image className={styles.svgIcon} src={IconEmailSvg} alt="" />,
    link: '',
  },
]


type LinkItem = {
	name: string
	svg: JSX.Element
	link: string
}

const gameLogos = [
  GameLogo1,
  GameLogo2,
  GameLogo3,
  GameLogo4,
  GameLogo5,
  GameLogo6,
  GameLogo7,
  GameLogo8,
]

async function fetchList(): Promise<LinkItem[]> {
  const response = await apiPost<LinkItem[]>(
    `/member/member/front/contactConfig/list`,
    {}
  )
  return response.data
}

export default function Footer() {
	const { data } = useQuery({
    queryKey: ['/LinkLists'],
    queryFn: () => fetchList(),
  })

	const linkLists = LinkList.map((item) => {
		const curItem = data ? data .find((curItem) => curItem.name == item.name) : []
		return { ...item, ...curItem }
	})

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <section className={styles.sitePartner}>
          <div className={styles.siteLogoWrap}>
            <Image
              className={styles.siteLogo}
              src={`${getS3Url()}/home/footer-logo.png`}
              alt="logo"
              width={120}
              height={120}
            />
            <Image
              className={styles.logoCom}
              src={`${getS3Url()}/home/2q.com.png`}
              alt="logo"
              width={219}
              height={57}
            />
          </div>
          <div className={styles.protect}>
            <div className={styles.title}>CHƠI CÓ TRÁCH NHIỆM</div>
            <div className={styles.protectContent}>
              <Image
                className={styles.svg18}
                src={Icon18Svg}
                alt=""
                width={45}
                height={45}
              />
              <Image
                className={styles.svgGameCare}
                src={IconGameCareSvg}
                alt=""
                width={39}
                height={43}
              />
              <Image
                className={styles.svgGamble}
                src={IconGambleSvg}
                alt=""
                width={60}
                height={46}
              />
              <Image
                className={styles.svgIovation}
                src={IconIovationSvg}
                alt=""
                width={140}
                height={27}
              />
              <Image
                className={styles.svgThreatMetrix}
                src={IconThreatMetrixSvg}
                alt=""
                width={143}
                height={34}
              />
            </div>
          </div>
          <div className={styles.license}>
            <p className={styles.title}>GIẤY PHÉP</p>
            <div className={styles.svgList}>
              <Image
                className={styles.svgGameCare}
                src={IconGameCareSvg}
                alt=""
              />
              <Image className={styles.svgBmm} src={IconBmmSvg} alt="" />
            </div>
          </div>
          <div className={styles.lineHe}>
            <p className={styles.title}>LIÊN HỆ</p>
            <div className={styles.svgList}>
              {linkLists.map((item, index) => (
                <a key={index} href={item.link} target={'_blank'}>
                  {item.svg}
                </a>
              ))}
            </div>
          </div>
        </section>

        <Marquee className={styles.gameLogoList}>
          {gameLogos.map((item, index) => (
            <div key={index} className={styles.logoItem}>
              <Image
                src={item}
                alt=""
                style={{ width: 'auto', height: '100%' }}
              />
            </div>
          ))}
        </Marquee>

        <div className={styles.fastLink}>
          <div className={styles.copyright}>© Toàn bộ bản quyền thuộc 2Q</div>
        </div>
      </div>
    </footer>
  )
}
