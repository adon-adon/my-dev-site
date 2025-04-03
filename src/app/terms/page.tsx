'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import WrapMask from '@/components/WrapMask'
import RenderTitle from '@/components/RenderTitle'

import banner1 from '@/assets/images/terms/banner1.webp'
import styles from './styles.module.scss'

export default function Terms() {
  const [show, setShow] = useState(true)

  return (
    <Layout>
      <div className={styles.navbar}>
        <Banner list={[banner1]} />

        <WrapMask>
          <RenderTitle title="ĐIỀU KHOẢN & ĐIỀU KIỆN" />

          <div className={styles.content}>
            Nhằm chống lạm dụng và gian lận chế độ cũng như ưu đãi từ 2Q, bộ
            phận chống gian lận 2Q luôn nghiêm ngặt kiểm tra thông tin từng tài
            khoản Đại Lý (bao gồm họ tên, e-mail và điện thoại, vv), khi phát
            hiện bất kỳ tài khoản có hành vi gian dối hoặc liên kết với các Đại
            Lý khác nhằm lạm dụng các chế độ ưu đãi, trục lợi hoa hồng Đại Lý.
            Chúng tôi sẽ đóng ngay và tịch thu số dư trong tài khoản của Đại Lý
            đó và các Đại Lý có liên quan khác mà không cần thông báo trước.
          </div>

          <div className={styles.btnsWrap}>
            <div
              className={`${styles.switchBtn} ${show ? styles.active : ''}`}
              onClick={() => {
                setShow(true)
              }}
            >
              ĐIỀU KHOẢN
            </div>
            <div
              className={`${styles.switchBtn} ${!show ? styles.active : ''}`}
              onClick={() => {
                setShow(false)
              }}
            >
              ĐIỀU KIỆN
            </div>
          </div>

          {show ? (
            <div className={styles.cardGroup}>
              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    Đại lý cần hiểu rõ trách nhiệm, tích cực quảng bá trang{' '}
                    <span className={styles.textColor}>2Q</span> tới các hội
                    viên của mình nhằm tối đa hóa lợi nhuận cũng như lợi ích của
                    2 bên.
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    Đại lý cần nắm rõ pháp luật Việt Nam và quảng bá{' '}
                    <span className={styles.textColor}>2Q</span> theo hướng hợp
                    pháp. Chi phí marketing do bên đại lý hoàn toàn chịu trách
                    nhiệm.
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    Các đại lý phải chịu trách nhiệm về các hội viên đang hoạt
                    động dưới mã đại lý của mình. Chăm sóc và đảm bảo rằng mỗi
                    hội viên hoạt động đều là hội viên thật.
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={`${styles.itemWrap} `}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    CÁC CHÍNH SÁCH TRÊN KHÔNG ÁP DỤNG CHO CÁC ĐẠI LÝ XỔ SỐ.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.cardGroup}>
              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    Đại lý không được phép tự ý sao chép, công khai, phân phối
                    thông tin có liên quan mà không có sự cho phép, bao gồm
                    trang chủ, tên miền, logo, báo cáo, màn hình trò chơi, đồ
                    họa, vv... Ngoài ra, trong việc quảng bá truyền thông, đại
                    lý cần bảo vệ lợi ích của{' '}
                    <span className={styles.textColor}>2Q</span>, không làm ảnh
                    hưởng đến danh tiếng của công ty,{' '}
                    <span className={styles.textColor}>2Q</span> có quyền ngay
                    lập tức chấm dứt quan hệ hợp tác khi đại lý vi phạm quy định
                    trên.
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    Dịch vụ chăm sóc khách hàng đại lý{' '}
                    <span className={styles.textColor}>2Q</span> sẽ đại diện và
                    hỗ trợ cho tất cả hội viên của đại lý: mở tài khoản, kiểm
                    soát tình trạng cược và các vấn đề liên quan. Đại lý và các
                    hội viên đồng ý tuân thủ các điều khoản điều kiện, chính
                    sách và thủ tục của{' '}
                    <span className={styles.textColor}>2Q</span>.
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    <span className={styles.textColor}>2Q</span> có quyền đồng ý
                    hoặc từ chối hợp tác với đại lý, hội viên dưới tuyến đại lý,
                    khóa tài khoản của đại lý hoặc hội viên nếu phát hiện vi
                    phạm điều khoản hoặc gian lận v.v...
                  </p>
                </div>
              </div>

              <div className={styles.decribleText}>
                <div className={styles.itemWrap}>
                  <p className={styles.leftIcon}></p>
                  <p className={styles.rightTitle}>
                    <span className={styles.textColor}>2Q</span> có quyền đơn
                    phương sửa đổi các điều khoản thỏa thuận với đại lý,
                    <span className={styles.textColor}> 2Q</span> sẽ gửi email
                    hoặc đăng tải trên trang web để thông báo cho tất cả đại lý
                    về thông tin được điều chỉnh. Thông tin điều chỉnh có thể
                    bao gồm: mức hoa hồng, thủ tục thanh toán và các quy định
                    khác. Nếu các đại lý phản đối các thông tin được điều chỉnh,
                    đại lý có thể đơn phương ngưng hợp tác. Sau khi thông tin
                    được điều chỉnh và đại lý không có bất kỳ ý kiến phản hồi
                    nào, điều khoản và điều kiện mới được xem như đã đồng ý và
                    thống nhất.
                  </p>
                </div>
              </div>
            </div>
          )}
        </WrapMask>
      </div>
    </Layout>
  )
}
