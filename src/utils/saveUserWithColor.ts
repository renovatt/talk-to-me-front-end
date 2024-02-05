import randomColor from './randomColor'

export const saveUserWithColor = (username: string) => {
  const user = {
    username,
    color: randomColor(),
  }
  sessionStorage.setItem('@chat-username', JSON.stringify(user))
  return user
}
