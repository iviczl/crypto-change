import { Currency } from '../types/currency'
import { IUser } from '../types/user'

export async function getUsers() {
  const usersString = localStorage.getItem('users')
  if (usersString) {
    return JSON.parse(usersString) as IUser[]
  }
  return [] as IUser[]
}

export async function logIn(userName: string, password: string) {
  const users = await getUsers()
  let user: IUser = {
    name: userName,
    rights: [],
    activeCurrencies: [] as Currency[],
  }
  const foundUser = users.find((u) => u.name === userName)
  if (!!foundUser) {
    user = foundUser
  } else {
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
  }
  return user
}

export async function logOut() {
  // optional access token invalidation
}

// export async function addCurrency(oldUser: IUser, currency: Currency){
// let user = {...oldUser}
// user.activeCurrencies = [...oldUser.activeCurrencies]
// if(!user?.activeCurrencies.some(a => a.code === currency.code)) {
//   user?.activeCurrencies.push(currency)
//   await updateUser(user)
// }
// return user
// }

// export async function removeCurrency(oldUser: IUser, currencyCode: string) {
//   let user = {...oldUser}
//   user.activeCurrencies = [...user.activeCurrencies]
//   const index = user.activeCurrencies.findIndex(c => c.code === currencyCode)
//   console.log('deleting ' + currencyCode + ' at ' + index)
//   if(index > -1) {
//     user?.activeCurrencies.splice(index,1)
//     user = await updateUser(user)
//   }
//   return user
// }

export async function updateUser(user: IUser) {
  const users = await getUsers()
  const index = users.findIndex((u) => u.name === user.name)
  users[index] = user
  localStorage.setItem('users', JSON.stringify(users))
  return user
}
