import React, { memo } from 'react'

import { ReactComponent as Icon } from '@static/icons/telegram.svg'

import styles from './AddButton.module.css'

function AddButton() {
  return (
    <a
      className={styles['add-button']}
      href="https://t.me/i_home_bot"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon />
      <span>Добавить себя</span>
    </a>
  )
}

export default memo(AddButton)
