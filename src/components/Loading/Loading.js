import React, { memo } from 'react'

import { ReactComponent as Animation } from '@static/icons/loader.svg'

import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading}>
      <Animation />
    </div>
  )
}

export default memo(Loading)
