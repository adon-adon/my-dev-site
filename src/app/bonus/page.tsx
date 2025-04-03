'use client'
import { useState } from 'react'
import Image from 'next/image'
import Banner from '@/components/Banner'
import Layout from '@/components/Layout'
import RenderTitle from '@/components/RenderTitle'

import logoBg from '@/assets/images/bonus/logoBg.png'
import arrow from '@/assets/images/bonus/arrow.png'
import arrowTop from '@/assets/images/bonus/arrowTop.png'
import title3 from '@/assets/images/bonus/title3.png'
import cardImg from '@/assets/images/bonus/card.webp'
import banner1 from '@/assets/images/bonus/banner1.webp'

import 'swiper/css'
import styles from './styles.module.scss'

export default function Bonus() {
  const [show, setShow] = useState(false)
  const [showText, setShowText] = useState(false)

  return (
    <Layout>
      <div className={styles.container}>
        <Banner list={[banner1]} />

        <div className={styles.largeBg}>
					<RenderTitle title="CHÍNH SÁCH HOA HỒNG ĐẠI LÝ" />

          <div className={styles.tableWrap}>
            <Image className={styles.logoBg} src={logoBg} alt="" />
            <div className={styles.tableFirstRow}>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemCenter} ${styles.tableRowItemFirstRow}`}
              >
                Lợi Nhuận Ròng Trong Tháng
              </div>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemVertical} ${styles.tableRowItemFirstRow}`}
              >
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  3 Tháng Đầu
                </div>
                <div className={styles.tableRowItemInner}>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    Hội Viên Hợp Lệ
                  </div>
                  <div className={styles.tableRowItemCenter}>
                    Tỉ Lệ Hoa Hồng
                  </div>
                </div>
              </div>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemVertical} ${styles.tableRowItemFirstRow}`}
              >
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  Hưởng Thụ Vĩnh Viễn (Sau 3 Tháng)
                </div>
                <div className={styles.tableRowItemInner}>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    Hội Viên Hợp Lệ
                  </div>
                  <div className={styles.tableRowItemCenter}>
                    Tỉ Lệ Hoa Hồng
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tableSecondRow}>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemVertical}`}
              >
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter} ${styles.tableRowItemInnerFirstColumn}`}
                >
                  1 - 88,888
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  88,888+
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  888,888+
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  3,888,888+
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  5,888,888+
                </div>
              </div>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemSecond} ${styles.tableRowItemHorizontal}`}
              >
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  5
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemCenter}`}
                >
                  60%
                </div>
              </div>
              <div
                className={`${styles.tableRowItem} ${styles.tableRowItemThird} ${styles.tableRowItemHorizontal}`}
              >
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemVertical} ${styles.tableRowItemCenter}`}
                >
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    5
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    10
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    15
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    20
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    30
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    40
                  </div>
                </div>
                <div
                  className={`${styles.tableRowItemInner} ${styles.tableRowItemVertical} ${styles.tableRowItemCenter}`}
                >
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    35%
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    40%
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    45%
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    50%
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    55%
                  </div>
                  <div
                    className={`${styles.tableRowItemInnerItem} ${styles.tableRowItemCenter}`}
                  >
                    60%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.myTitle}>
            (Chính sách Hoa hồng Đại lý được áp dụng thử nghiệm đến hết
            30/6/2025, không tính sản phẩm Lô đề truyền thống.)
          </div>

          <div className={styles.switchWrap} onClick={() => setShow(!show)}>
            <span>{show ? 'RÚT GỌN' : 'CHI TIẾT'} </span>
            {show ? (
              <Image className={styles.arrowImg} src={arrowTop} alt="" />
            ) : (
              <Image className={styles.arrowImg} src={arrow} alt="" />
            )}
          </div>

          {show && (
            <div className={styles.decribleText}>
              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Tỉ lệ % hoa hồng được tính dựa trên tổng số tiền thua cược của
                  các hội viên hàng tháng của Đại Lý tại 2Q và số lượng hội viên
                  hoạt động trong tháng.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Phần trăm hoa hồng của Quý Khách sẽ dựa vào tổng doanh thu từ
                  tất cả các hội viên của Đại Lý đang cược tại 2Q và thỏa mãn
                  những điều kiện để nhận thanh toán hoa hồng.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Với ít nhất <span className={styles.textColor}>05</span> hội
                  viên <span className={styles.textColor}>hợp lệ</span> trong
                  tháng ( Nếu số hội viên hợp lệ ít hơn 05 sẽ không được tính
                  hoa hồng) thì Đại Lý sẽ có cơ hội nhận được hoa hồng từ 2Q.
                  Phần trăm hoa hồng của đại lý cao hay thấp phụ thuộc vào số
                  lượng hội viên mới đạt chuẩn trong tháng và tổng cược thua của
                  hội viên trong tháng.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Nếu tổng doanh thu cược của hội viên tháng đó là dương, thì
                  tài khoản Đại Lý của Quý Khách sẽ được ghi nhận lợi nhuận âm
                  tích lũy sang những tháng tiếp theo{' '}
                  <span className={styles.textColor}>
                    {' '}
                    để khấu trừ cho đến hết
                  </span>{' '}
                  thì Đại Lý mới nhận được tiền hoa hồng.
                </p>
              </div>

              <div className={styles.itemWrapFix}>
                <div className={styles.itemWrap}>
                  <p className={styles.rightTitle}>
                    Tất cả Đại Lý phải thanh toán chi phí:
                  </p>
                </div>

                <div className={styles.itemWrapLeftPadding}>
                  <div> + Phí gửi/ rút tiền của Ngân Hàng</div>
                  <div> + Phí báo biểu cho nhà cung cấp dịch vụ</div>
                  <div> + Tiền khuyến mãi và hoàn trả </div>
                  <div> + Chi phí marketing - quảng cáo (nếu có) </div>
                </div>
              </div>

              <div className={styles.itemWrapFix}>
                <div className={styles.itemWrap}>
                  <p className={styles.rightTitle}>
                    Các Đại Lý phải đảm bảo được các hội viên đang hoạt động của
                    mình là hợp lệ. Hội viên hoạt động hợp lệ phải đáp ứng được
                    các điều kiện sau:
                  </p>
                </div>
                <div
                  className={`${styles.itemWrapLeftPadding} ${styles.textColor}`}
                >
                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>1.</p>
                    <p className={styles.rightTitle}>
                      Có số nạp tiền trong tháng ≥ 1000 điểm hoặc có lượng tiền
                      cược hợp lệ  ≥ 3,000 điểm.
                    </p>
                  </div>
                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>2.</p>
                    <p className={styles.rightTitle}>
                      Dựa vào đánh giá tổng hợp IP, tính hoạt động và tính nạp
                      lại phê duyệt.
                    </p>
                  </div>
                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>3.</p>
                    <p className={styles.rightTitle}>
                      Không vi phạm bất cứ chính sách được quy định của 2Q.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

					<RenderTitle title="CÔNG THỨC TÍNH HOA HỒNG" />

          <Image className={styles.title3Img} src={title3} alt="" />

          <div
            className={styles.switchWrap}
            onClick={() => setShowText(!showText)}
          >
            <span>{showText ? 'RÚT GỌN' : 'CHI TIẾT'} </span>
            {showText ? (
              <Image className={styles.arrowImg} src={arrowTop} alt="" />
            ) : (
              <Image className={styles.arrowImg} src={arrow} alt="" />
            )}
          </div>

          {showText && (
            <div className={styles.decribleText}>
              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Lợi nhuận ròng hàng tháng = Tổng tiền thua cược của hội viên -
                  ( Phí báo biểu cho nhà cung cấp + Tiền thưởng khuyến mãi và
                  hoàn trả + Chi phí marketing + Phí gửi tiền và rút tiền).
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Phí báo biểu: Là chi phí cho các nhà cung cấp game được tích
                  hợp trên trang của nhà cái. Tổng tiền thua cược của hội viên
                  *10%.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Tiền khuyến mãi và hoàn trả: Tiền thưởng khuyến mãi hội viên
                  đã hưởng và các khoản hoàn trả cho hội viên tuyến dưới.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Chi phí marketing - quảng cáo theo chương trình thu hút khách
                  của Đại lý (nếu có ).
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Phí ngân hàng: Lệ phí nạp/ rút tiền của các hội viên tuyến
                  dưới.
                </p>
              </div>

              <div className={styles.itemWrap}>
                <p className={styles.rightTitle}>
                  Lợi nhuận âm tích lũy: Là tổng số tiền thắng cược tích lũy của
                  khách hàng. Nếu hội viên tuyến dưới thắng tiền trong tháng thì
                  lượng tiền thắng sẽ được tích lũy vào tháng sau.
                </p>
              </div>

              <div className={styles.itemWrapFix}>
                <div className={styles.itemWrap}>
                  <p className={styles.rightTitle}>Ví dụ cách tính hoa hồng:</p>
                </div>
                <div
                  className={`${styles.itemWrapLeftPadding} ${styles.textColor}`}
                >
                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>1.</p>
                    <p className={styles.rightTitle}>
                      Trường hợp 1: Không cần thành viên mới chỉ 05 hội viên hợp
                      lệ trong tháng{'>>'} Đại lý vẫn nhận được hoa hồng dựa vào
                      số lượng thành viên hoạt động trong tháng và tổng lợi
                      nhuận ròng đối chiếu với mức hoa hồng đạt được cao nhất
                      của đại lý.
                    </p>
                  </div>

                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>2.</p>
                    <p className={styles.rightTitle}>
                      Trường hợp 2: Lợi nhuận ròng của đại lý trong tháng là
                      5,888,889, tỉ lệ hoàn trả hoa hồng tương ứng là 60% và số
                      lượng thành viên hợp lệ trong tháng là 40, thì cuối cùng
                      tỉ lệ hoàn trả hoa hồng cho Đại lý là 60%.
                    </p>
                  </div>

                  <div className={styles.itemWrap}>
                    <p className={styles.leftNumber}>3.</p>
                    <p className={styles.rightTitle}>
                      Trường hợp 3: Lợi nhuận ròng của đại lý trong tháng là
                      5,888,889, tỉ lệ hoàn trả hoa hồng tương ứng là 60% và số
                      lượng thành viên hợp lệ trong tháng ít hơn 10, thì cuối
                      cùng tỉ lệ hoàn trả hoa hồng cho Đại lý là 35%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

					<RenderTitle title="PHƯƠNG THỨC THANH TOÁN" />

          <Image className={styles.cardImg} src={cardImg} alt="" />
        </div>
      </div>
    </Layout>
  )
}
