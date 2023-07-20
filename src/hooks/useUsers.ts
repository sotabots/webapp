import { useStore } from '../store'
import { TUser } from '../types'

export const useUsers = () => {
  const { users, userRelations, setUserRelations, selectUserIndex } = useStore()

  const usedUserIds = userRelations.map((item) => item.user?.id)
  const unrelatedUsers = users.filter(user => selectUserIndex !== null ? true : !usedUserIds.includes(user.id))

  const selectUser = (user: TUser) => () => {
    if (selectUserIndex !== null) {
      // todo: replace
    } else { // add user
      setUserRelations([
        ...userRelations,
        { user }
      ])
    }
    history.back()
  }

  return { unrelatedUsers, selectUser }
}