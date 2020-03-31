import React, { memo } from 'react'

import { ReactComponent as Icon } from '@static/icons/telegram.svg'

import styles from './AddButton.module.css'

function AddButton() {
  return (
    <a
      className={styles['add-button']}
      href="#"
      rel="noopener noreferrer"
    >
      <Icon />
      <span>Связаться</span>
    </a>
  )
}

export default memo(AddButton)
