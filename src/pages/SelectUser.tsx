import { useTranslation } from 'react-i18next'

import Button from '../kit/Button'
import Divider from '../kit/Divider'
import Header from '../kit/Header'
import Screen from '../kit/Screen'
import UserButton from '../kit/UserButton'

import { useFeedback, useInit, useUsers } from '../hooks'
import { useStore } from '../store'

function SelectUser() {
  useInit()

  const { t } = useTranslation()
  const { users, unrelatedUsers, addUsers, selectUser, deleteUser } = useUsers()
  const { selectPersonId, transaction } = useStore()
  const { feedback } = useFeedback()

  const usersToShow = selectPersonId !== null ? users : unrelatedUsers
  const forName = selectPersonId !== null ? (transaction?.shares || []).find(share => share.person_id === selectPersonId)?.normalized_name : null
  const title = selectPersonId !== null
    ? (
      forName
        ? `${t('selectWhoIs')} "${forName === 'MESSAGE_AUTHOR' ? t('author') : forName}"`
        : t('selectUser')
      )
    : t('addUser')

  return (
    <Screen className="!bg-bg">
      <Header onBack={() => { history.back() }} />

      <div className="mb-2 px-4 flex items-center justify-between gap-3">
        <h2 className="pt-[2px] pb-[6px]">{title}</h2>
        {selectPersonId !== null && (
          <Button
            theme="text"
            text={t('delete')}
            onClick={() => {
              deleteUser(selectPersonId)
              feedback('delete_user_expnames_web')
            }}
          />
        )}
        {selectPersonId === null && usersToShow.length > 1 && (
          <Button
            theme="text"
            text={t('addEveryone')}
            onClick={() => {
              addUsers(usersToShow)
              feedback('set_users_expnames_web')
            }}
          />
        )}
      </div>

      <div className="mt-4 overflow-y-auto">
        {usersToShow.map((user, i, arr) => (
          <>
            <UserButton
              key={i}
              user={user}
              onClick={() => {
                if (selectPersonId !== null) {
                  selectUser(user)
                  feedback('set_user_expnames_web')
                } else {
                  addUsers([user])
                  feedback('set_users_expnames_web')
                }
              }}
            />
            {i < arr.length - 1 && <Divider key={`Divider-${i}`} />}
          </>
        ))}
      </div>
    </Screen>
  )
}

export default SelectUser
