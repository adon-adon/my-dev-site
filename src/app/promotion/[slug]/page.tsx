'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ItemPromotion } from '../page'
import Layout from '@/components/Layout'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { apiPost } from '@/utils/axiosInstance'

import { getS3File } from '@/utils'

import styles from './styles.module.scss'

async function fetchDetail(id): Promise<ItemPromotion> {
  const { data } = await apiPost<ItemPromotion>(
    '/member/system/agent/activity/getById',
    {
      id: id,
    }
  )
  return data
}

const fetchRichText = async (htmlPath: string) => {
  const { data } = await apiPost<string>(`/member/file/loadHtml?fileId=${htmlPath}`)
  return data
}

export default function PromotionDetail() {
  const router = useRouter()
  const { slug } = useParams()

  const contentRef = useRef(null)

  const { data: activityDetail, isLoading } = useQuery({
    queryKey: ['promotionDetail'],
    queryFn: () => fetchDetail(slug),
  })

  const bannderImg = activityDetail?.image

  const { data: richTextContent } = useQuery({
    queryKey: ['richTextContent', activityDetail?.description],
    queryFn: () => fetchRichText(activityDetail?.description ?? ''),
    enabled: !!activityDetail?.description,
  })

  return (
    <Layout>
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.imgWrap}>
            {bannderImg && (
              <Image
                className={styles.item}
                src={`${getS3File()}${bannderImg}`}
                alt=""
                fill
              />
            )}
          </div>

          <div>
            <div className={styles.title}>{activityDetail?.name}</div>

            {richTextContent && (
              <div
                className={styles.content}
                ref={contentRef}
                dangerouslySetInnerHTML={{
                  __html: removeFontSize(richTextContent),
                }}
              />
            )}

            <div className={styles.btnWrap}>
              <div className={styles.btn} onClick={() => router.back()}>
                TRỞ VỀ
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

function removeFontSize(htmlContent) {
  return htmlContent.replace(/font-size:\s*[\d.]+(px|rem|em|pt|%);?/gi, '')
}
