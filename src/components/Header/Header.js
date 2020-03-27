import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import { ANIMATION_DURATION, SHOW_MOLA_MOLA_TIMEOUT } from './Header.constants'
import styles from './Header.module.css'

function Header({ count }) {
  const [visibleMolaMola, setVisibleMolaMola] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(false)

  useEffect(() => {
    let animationTimeout = null
    let hideCountTimeout = null

    if (count) {
      hideCountTimeout = setTimeout(() => {
        hideCountTimeout = null
        setVisibleMolaMola(true)

        animationTimeout = setTimeout(() => {
          animationTimeout = null
          setHiddenCount(true)
        }, ANIMATION_DURATION)
      }, SHOW_MOLA_MOLA_TIMEOUT)
    }

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout)
      }

      if (hideCountTimeout) {
        clearTimeout(hideCountTimeout)
      }
    }
  }, [count])

  const linkClass = classnames(styles.link, {
    [styles['link-visible']]: visibleMolaMola
  })
  const countClass = classnames(styles.count, {
    [styles['count-visible']]: count && !visibleMolaMola
  })

  return (
    <header className={styles.header}>
      {!hiddenCount && (
        <span className={countClass}>Нас уже {count}!</span>
      )}
      <a className={linkClass} href="https://molamola.by/campaigns?category_id=10&sort=popular">
        Поддержать наших медиков <span>👨‍⚕️👩‍⚕️</span>
      </a>
    </header>
  )
}

export default memo(Header)
