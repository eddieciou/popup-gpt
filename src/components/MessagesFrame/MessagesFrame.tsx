import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'
import { TMessage } from '../../types/common.types'
import Message from '../Message/Message'

interface IMessagesFrameProps {
  messages: Array<TMessage>
  name: string
}

const MessagesFrame = ({ messages, name }: IMessagesFrameProps) => {
  return (
    <ScrollToBottom className='h-full p-1'>
      <div className='grid gap-4'>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </div>
    </ScrollToBottom>
  )
}

export default MessagesFrame
