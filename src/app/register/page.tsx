'use client'
import Image from 'next/image'
import cardBack from '@/assets/images/register/card.png'

import Navbar from '@/components/Header'
import RegisterForm from './registerForm'
import WrapMask from '@/components/WrapMask'
import RenderTitle from '@/components/RenderTitle'

import 'swiper/css'
import styles from './styles.module.scss'

export default function Register() {
  return (
    <div className={styles.container}>
      <Navbar />

      <WrapMask>
        <RenderTitle title="ĐĂNG KÝ TRỞ THÀNH ĐẠI LÝ" />
        <div className={styles.loginForm}>
          <div className={styles.formBox}>
            <div className={styles.formWrap}>
              <RegisterForm />
            </div>
          </div>
          <div className={styles.formBox}>
            <Image className={styles.cardBack} src={cardBack} alt="" />
          </div>
        </div>
      </WrapMask>
    </div>
  )
}
