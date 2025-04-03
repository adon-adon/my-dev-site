'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import leftBtn from '@/assets/images/main/registerBtn.gif'
import styles from './styles.module.scss'

export default function UserAction() {
  const router = useRouter()

  const goToLogin = () => {
    // router.push("/login");
    window.open('https://test-2q-agent.2qsport.me/', '_blank')
  }

  return (
    <div className={styles.btnControl}>
      <Image
        className={styles.btnItem}
        src={leftBtn}
        alt=""
        onClick={() => {
          router.push('/register')
        }}
      />
      <div
        className={`${styles.btnItem} ${styles.rightBtn}`}
        onClick={() => {
          goToLogin()
        }}
      >
        ĐĂNG NHẬP
      </div>
    </div>
  )
}
