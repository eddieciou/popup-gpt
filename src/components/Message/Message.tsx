import React from 'react'
import { TMessage } from '../../types/common.types'

interface IMessageProps {
  message: TMessage
  name: string
}

const Message = ({ message, name }: IMessageProps) => {
  const { text, user } = message
  const trimmedName = name.trim().toLowerCase()
  const isSentByCurrentUser = trimmedName === user

  return isSentByCurrentUser ? (
    <div className='flex justify-end'>
      <p className='mr-1 text-xs'>{trimmedName}</p>
      <div className='max-w-lg rounded-lg bg-blue-400 py-1 px-2 text-white'>{text}</div>
    </div>
  ) : (
    <div className='flex justify-start'>
      <div className='rounded-lg bg-gray-300 py-1 px-2'>{text}</div>
      <p className='ml-1 text-xs'>{user}</p>
    </div>
  )
}

export default Message
