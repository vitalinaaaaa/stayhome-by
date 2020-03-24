import React, { memo, useState } from 'react'

import { ReactComponent as Icon } from '@static/icons/info.svg'

import styles from './Info.module.css'

function Info() {
  const [visible, setVisible] = useState(false)

  function toggle() {
    setVisible(!visible)
  }

  return (
    <>
      {visible && (
        <div className={styles['info-text']}>
          <span>
            Эта карта создана во время пандемии COVID-19 для того, чтобы показать количество людей, солидарных в решении максимально ограничить свои социальные контакты.
          </span>
          <span>
            Если вы уже с нами, то мы очень рады! Если вы хотите к нам присоединиться - добро пожаловать, ведь в данном случае чем нас больше, тем лучше (:
          </span>
          <span>
            Мы понимаем, что в текущей ситуации возможность оставаться дома есть далеко не у всех. Поэтому если вы вынуждены каждый день выходить из дома по не зависящим от вас причинам - мы вами очень гордимся!
          </span>
          <span>
            Список основных рекомендаций ВОЗ можно прочитать{' '}
            <a href="https://www.who.int/ru/emergencies/diseases/novel-coronavirus-2019/advice-for-public">
              здесь
            </a>
            , а текущую информацию о распространении вируса - <a href="https://coronavirus.jhu.edu/map.html">здесь</a>.
          </span>
          <span>
            Будьте здоровы и берегите друг друга ❤️
          </span>
        </div>
      )}
      <button className={styles['info-button']} type="button" onClick={toggle}><Icon /></button>
    </>
  )
}

export default memo(Info)
