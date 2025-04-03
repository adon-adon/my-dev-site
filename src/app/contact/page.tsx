'use client'
import { JSX } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Layout from '@/components/Layout'
import WrapMask from '@/components/WrapMask'
import RenderTitle from '@/components/RenderTitle'
import Banner from '@/components/Banner'
import IssueForm from './IssueForm'
import { apiPost } from '@/utils/axiosInstance'

import banner1 from '@/assets/images/contact/banner1.webp'
import email from '@/assets/images/contact/email.png'
import telegram from '@/assets/images/contact/telegram.png'

import styles from './styles.module.scss'

type LinkItem = {
  name: string
  svg: JSX.Element
  link: string
  textName: string
}

const LinkList: LinkItem[] = [
  {
    name: 'email',
    svg: <Image className={styles.contactImg} src={email} alt="" />,
    link: '',
    textName: 'affiliate2q@gmail.com',
  },
  {
    name: 'telegram',
    svg: <Image className={styles.contactImg} src={telegram} alt="" />,
    link: '',
    textName: '@affagent2q',
  },
]

async function fetchList(): Promise<LinkItem[]> {
  const response = await apiPost<LinkItem[]>(
    '/member/member/front/contactConfig/list',
    {}
  )
  return response.data
}

export default function Contact() {
  const { data } = useQuery({
    queryKey: ['/LinkLists'],
    queryFn: () => fetchList(),
  })

  const linkLists = LinkList.map((item) => {
    const curItem = data
      ? data.find((curItem) => curItem.name == item.name)
      : []
    return { ...item, ...curItem }
  })

  return (
    <Layout>
      <div className={styles.container}>
        <Banner list={[banner1]} />

        <WrapMask>
          <RenderTitle title="HÃY LIÊN HỆ VỚI CHÚNG TÔI" />

          <div className={styles.formWrap}>
            <div className={styles.formBoxLeft}>
              <IssueForm />
            </div>

            <div className={styles.formBoxRight}>
              <div className={styles.contactBox}>
                <p className={styles.contactText}>THÔNG TIN LIÊN HỆ</p>

                {linkLists.map((item) => {
                  return (
                    <a href={item.link} target={'_blank'} key={item.name}>
                      <div className={styles.contactItem}>
                        {item.svg}
                        <div className={styles.contactItemContent}>
                          {item.name.toUpperCase()}: {item.textName}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </WrapMask>
      </div>
    </Layout>
  )
}
