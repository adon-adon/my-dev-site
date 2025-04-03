'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Banner from '@/components/Banner'
import Layout from '@/components/Layout'
import WrapMask from '@/components/WrapMask'
import { getS3File } from '@/utils'

import banner1 from '@/assets/images/promotion/banner1.webp'

import { apiPost } from '@/utils/axiosInstance'

import styles from './styles.module.scss'

export type ItemPromotion = {
  page: number
  size: number
  name: string
  startTime: number
  endTime: number
  image: string
  h5Image: string
  status: number
  repeatTime: number
  description: string
  h5Description: string
  navigationCatalogId: number
  vipLevel: string
  sort: number
  needApply: number
  id: string
  companyAcct: string
  createTime: number
  createAcct: string
  updateTime: number
  updateAcct: string
  aeviceType: number
  isRescueFund: number
  isDynamicText: number
  type: number
  needCheckRecharge: number
  rechargeTimeRange: string
  rechargeMinAmount: number
  appUsage: boolean
}

type DataPromotion = {
  list: ItemPromotion[]
  currPageNum: number
  pageSize: number
  totalPage: number
}

async function fetchList(page): Promise<DataPromotion> {
  const response = await apiPost<DataPromotion>(
    '/member/system/agent/getActivitiesList',
    {
      page: page,
      size: 6,
    }
  )
  return response.data
}

export default function Promotion() {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['/lists', page],
    queryFn: () => fetchList(page),
  })

  return (
    <Layout>
      <div className={styles.container}>
        <Banner list={[banner1]} />

        <WrapMask>
          <div className={styles.listGroup}>
            {!!data &&
              data.list.map((item) => {
                return (
                  <div
                    className={styles.cardItem}
                    key={item.id}
                    onClick={() => router.push(`/promotion/${item.id}`)}
                  >
                    <div className={styles.cardItemImgWrap}>
                      <Image
                        className={styles.cardItemImg}
                        src={`${getS3File()}${item.image}`}
                        alt=""
                        fill
                      />
                    </div>
                    <div className={styles.cardItemTitle}>{item.name}</div>
                  </div>
                )
              })}
          </div>
          <div className={styles.paginationBox}>
            <Stack spacing={2}>
              <Pagination
                count={data?.totalPage}
                variant="outlined"
                shape="rounded"
                className={styles.paginationWrap}
                onChange={(event, value) => {
                  console.log('page', value)
                  setPage(value)
                }}
              />
            </Stack>
          </div>
        </WrapMask>
      </div>
    </Layout>
  )
}
