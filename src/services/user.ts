import { IUser } from "../types/user"

export async function logIn(userName: string, password: string) {
  const user: IUser = { name: userName, rights: [] }
  await localStorage.setItem('user', JSON.stringify(user))
  return user
}

export function logOut() {
  localStorage.removeItem('user')
}
