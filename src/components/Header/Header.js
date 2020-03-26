import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import styles from './Header.module.css'

function Header({ count }) {
  const [showMolaMola, setShowMolaMola] = useState(false)

  useEffect(() => {
    if (count) {
      setTimeout(() => {
        setShowMolaMola(true)
      }, 3000)
    }
  }, [count])

  const linkClass = classnames(styles.link, {
    [styles['link-visible']]: showMolaMola
  })
  const countClass = classnames(styles.count, {
    [styles['count-visible']]: count && !showMolaMola
  })

  return (
    <header className={styles.header}>
      <a className={linkClass} href="https://molamola.by/campaigns?category_id=10&sort=popular">
        Поддержать наших медиков 👨‍⚕️👩‍⚕️
      </a>
      <span className={countClass}>Нас уже {count}!</span>
    </header>
  )
}

export default memo(Header)
