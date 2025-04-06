'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { clsx } from 'clsx'

import ToggleCon from '@/assets/images/customer/toggleCon.svg'
import OpenIcon from '@/assets/images/customer/open.svg'
import CloseIcon from '@/assets/images/customer/close.svg'
import PolygonIcon from '@/assets/images/customer/polygon.svg'

import codeImg from '@/assets/images/common/code.png'
import cskh from '@/assets/images/common/cskh.png'
import email from '@/assets/images/common/email.png'
import facebook from '@/assets/images/common/facebook.png'
import telegram from '@/assets/images/common/telegram.png'
import defaultImg from '@/assets/images/common/default.png'

import customerBar from '@/assets/images/common/customer-bar.png'
import iconBg from '@/assets/images/common/icon-bg.png'

import { useHover } from 'ahooks'

import Image from 'next/image'
import { apiPost } from '@/utils/axiosInstance'

type customerProps = {
  top: string
  showLogin?: () => void
}

const contactKeyMapImg = {
  code: codeImg,
  cskh: cskh,
  email: email,
  facebook: facebook,
  telegram: telegram,
  defaultImg: defaultImg,
}

type LinkItem = {
  id: string
  companyAcct: string
  distributedId: string
  createTime: number
  createAcct: string
  updateTime: number
  updateAcct: string
  name: string
  memberLevel: number
  icon: string
  hoverIcon: string
  link: string
  sort: number
  img: string
}

const Customer: FC<customerProps> = ({ top, showLogin }: customerProps) => {
  const [open, setOpen] = useState(false)
  const [curIndex, setCurIndex] = useState('')
  const [contactList, setContactList] = useState<LinkItem[]>([])
  const toggleRef = useRef(null)
  const hovered = useHover(toggleRef)

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const response = await apiPost<LinkItem[]>(
      '/member/member/front/contactConfig/list',
      {
        type: 2
      }
    )

    if (response.code === 0) {
      const list = response.data.filter((item) => item.link)

      setContactList(
        list.map((item) => {
          const name = item.name.split(' ')?.[0]
          return {
            ...item,
            img: contactKeyMapImg[name] || contactKeyMapImg.defaultImg,
          }
        })
      )
    }
  }

  const handleToggle = () => {
    setOpen((open) => !open)
  }
  const clickHandler = (item) => () => {
    window.open(item.link, '_blank')
  }

  const overHandler = (item) => () => {
    setCurIndex(item.id)
  }

  const posY = (idx: number) => {
    const len = contactList.length
    return 68 + 70 * (len - 1 - idx)
  }

  return (
    <div className={styles.container} style={{ ['--top' as any]: top }}>
      <div className={clsx(styles.contactList)}>
        {contactList.map((item, index) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={clickHandler(item)}
            style={{
              ['--itemtop' as any]: open ? 0 : posY(index),
              ['--op' as any]: open ? 1 : 0,
            }}
            onMouseOver={overHandler(item)}
            onMouseLeave={() => setCurIndex('')}
          >
            <Image
              className={styles.bg}
              style={{
                ['--deg' as any]: curIndex === item.id ? '-60deg' : '0',
              }}
              src={iconBg}
              alt=""
            />
            <div
              className={clsx(styles.content, {
                [styles.active]: curIndex === item.id,
              })}
            >
              <p
                dangerouslySetInnerHTML={{ __html: item.name }}
                className={styles.txt}
              />
            </div>
            <div className={styles.imgCon}>
              <Image className={styles.icon} src={item.img} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.toggleArea}>
        <Image
          src={customerBar}
          className={styles.customBar}
          style={{ ['--iop' as any]: open ? 0 : 1 }}
          alt=""
        />
        <div className={styles.popoverTitle}>
          {hovered && (
            <span className={styles.toggleTips}>
              <Image src={PolygonIcon} className={styles.arrowIcon} alt="" />
              {open ? 'Bấm để thu gọn' : 'Bấm để mở rộng'}
            </span>
          )}
          <Image
            src={ToggleCon}
            ref={toggleRef}
            className={styles.toggleCon}
            onClick={handleToggle}
            alt=""
          />
        </div>
        {open ? (
          <Image src={CloseIcon} className={styles.toggle} alt="" />
        ) : (
          <Image src={OpenIcon} className={styles.toggle} alt="" />
        )}
      </div>
    </div>
  )
}

export default React.memo(Customer)
