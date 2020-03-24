import React, { memo } from 'react'

import styles from './Header.module.css'

function Header({ count }) {
  return (
    <header className={styles.header}>
      {!!count && <span>Нас уже {count}!</span>}
    </header>
  )
}

export default memo(Header)
