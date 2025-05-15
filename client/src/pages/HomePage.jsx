import React from 'react'
import Sidebar from '../components/Sidebar'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 w-full max-w-6xl rounded-lg shadow-xl h-[80vh]'>
          <div className='flex overflow-hidden rounded-lg h-full'>
            <Sidebar/>
            {!selectedUser?<NoChatSelected/>:<ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage