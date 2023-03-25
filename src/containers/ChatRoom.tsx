import React, { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import MessagesFrame from '../components/MessagesFrame/MessagesFrame'
import { TMessage } from '../types/common.types'

interface IChatRoomProps {
  customId: string
}

let socket: Socket

const ChatRoom = ({ customId }: IChatRoomProps) => {
  const ENDPOINT = '192.168.0.102:5858'
  const [userName, setUserName] = useState('')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Array<TMessage>>([{ user: 'admin', text: '請輸入姓名' }])

  useEffect(() => {
    socket = io(ENDPOINT)

    if (userName) {
      socket.emit('join', { customId, userName }, () => {
        //
      })
    }

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [userName])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages, userName])

  const handleSend = () => {
    if (!userName) {
      setUserName(inputText)
      setInputText('')
    } else {
      if (inputText) {
        socket.emit('sendMessage', inputText, () => setInputText(''))
      }
    }
  }

  return (
    <div className='mb-10 w-80'>
      <h1 className='bg-blue-400 p-2 text-3xl text-white'>測試聊天室</h1>
      <div className='h-80 border-2 border-blue-400 bg-white'>
        <div className='h-5/6'>
          <MessagesFrame messages={messages} name={userName} />
        </div>
        <form
          className='flex h-1/6'
          onSubmit={(event) => {
            event.preventDefault()
            handleSend()
          }}
        >
          <input
            className='h-full w-4/5 border-t-2 border-blue-400 px-2 text-xl focus:outline-none'
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
            }}
          />
          <button className='h-full w-1/5 bg-blue-400 text-white focus:outline-none'>輸入</button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
