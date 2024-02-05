export interface IUser {
  username: string
  color: string
}

export interface IMessage {
  roomId: string
  message: string
  username: IUser
  time: string
}
