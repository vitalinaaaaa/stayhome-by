import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import { ANIMATION_DURATION, SHOW_MOLA_MOLA_TIMEOUT } from './Header.constants'
import styles from './Header.module.css'

function Header({ count }) {
  const [hiddenCount, setHiddenCount] = useState(false)

  return (
    <header className={styles.header}>
      {!hiddenCount && (
        <span className='count-visible'>Нужна помощь для {count}!</span>
      )}
      {/* <a className={linkClass} href="https://molamola.by/campaigns?category_id=10&sort=popular">
        Поддержать наших медиков <span>👨‍⚕️👩‍⚕️</span>
      </a> */}
    </header>
  )
}

export default memo(Header)
