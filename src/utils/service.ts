import { apiPost } from './axiosInstance'

export type ItemBanner = {
  id: string
  companyAcct: string
  distributedId: string
  remark: string
  createTime: number
  createAcct: string
  updateTime: number
  updateAcct: string
  deviceType: number
  bannerType: number
  bannerSort: number
  bannerUrl: string
  link: string
  startTime: number
  endTime: number
  type: number
}

type DataPromotion = {
  list: ItemBanner[]
  currPageNum: number
  pageSize: number
  totalPage: number
}

export async function fetchBannerList(params: {
  page: number
  size: number
  type: number
  deviceType: number
  bannerType: number
}): Promise<DataPromotion> {
  const response = await apiPost<DataPromotion>(
    '/member/system/getBannerList',
    params
  )
  return response.data
}
