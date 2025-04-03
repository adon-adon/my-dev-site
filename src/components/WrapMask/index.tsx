import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'

import maskBg from '@/assets/images/contact/maskBg.png'

export default function WrapMask({ children }) {
  return (
    <div className={styles.wrapBg}>
      <Image className={styles.maskBg} src={maskBg} alt="" />
      {children}
    </div>
  )
}
