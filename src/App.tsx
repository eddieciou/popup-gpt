import React, { useState } from 'react'
import ChatRoom from './containers/ChatRoom'

function App() {
  const scriptSrc = document?.getElementById('popupGPTSrc')?.getAttribute('src')
  const url = new URL((scriptSrc as string) || 'http://localhost:8080?customId=k643khf3')
  const customId = url.searchParams.get('customId') as string

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='fixed bottom-10 right-10 z-50'>
        {open && <ChatRoom customId={customId} />}

        <div className='flex justify-end'>
          {!open ? (
            <button
              className='rounded-lg bg-teal-500 p-2 text-white'
              onClick={() => {
                setOpen(true)
              }}
            >
              開始聊天
            </button>
          ) : (
            <button
              className='h-10 w-10 rounded-full bg-red-400 text-white'
              onClick={() => {
                setOpen(false)
              }}
            >
              X
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default App
