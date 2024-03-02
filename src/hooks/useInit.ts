import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useInitData } from '@vkruglikov/react-telegram-web-app'

import { useStore } from '../store'
import { useUsers } from '../hooks'

import i18n from '../i18n'

export const useInit = () => {
  const {
    txId, setTxId,
    summaryId, setSummaryId,
    chat,
    transaction,
    isAuthorSharesInited, setIsAuthorSharesInited,
  } = useStore()
  const routerLocation = useLocation()
  const [initDataUnsafe/*, initData*/] = useInitData()
  const { users, getUserById, addUsers } = useUsers()

  // init transaction/summary pages
  const queryParameters = new URLSearchParams(routerLocation.search)
  const queryTxId = queryParameters.get('txid')
  const querySummaryId = queryParameters.get('summaryid')

  const startParam = initDataUnsafe.start_param
  // use `?startapp=...` as id
  // todo: decode
  let startParamTxId
  let startParamSummaryId

  if (routerLocation.pathname === '/summary') {
    startParamSummaryId = startParam
  } else {
    startParamTxId = startParam
  }

  if (txId === undefined) {
    setTxId(queryTxId || startParamTxId || null)
  }

  if (summaryId === undefined) {
    setSummaryId(querySummaryId || startParamSummaryId || null)
  }

  // init new-tx author shares
  useEffect(() => {
    if (transaction && users.length && initDataUnsafe.user && !isAuthorSharesInited) {
      console.log('setIsAuthorSharesInited', true)
      setIsAuthorSharesInited(true)
      if (transaction.shares.length === 0) {
        const userId = initDataUnsafe.user.id
        console.log('author: 0 shares, userId =', userId)
        const user = getUserById(userId)
        if (user) {
          console.log('author: user found, addUsers...')
          addUsers([user], { isAuthor: true })
        }
      }
    }
  }, [transaction, users, initDataUnsafe, isAuthorSharesInited, setIsAuthorSharesInited, getUserById, addUsers])

  // init language
  if (
    chat?.language_code &&
    chat.language_code !== i18n.language &&
    i18n.languages.includes(chat.language_code)
  ) {
    i18n.changeLanguage(chat.language_code)
  }
}
