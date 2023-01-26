import { useContext } from 'react'
import ContextStates from '../context/States'

const Message = () => {
    const { message } = useContext(ContextStates);
    return (
        <div className='absolute w-full'>
            { message!=="" && (
                <div className='w-1/3 mx-auto shadow-xl'>
                    <p className='text-center text-2xl bg-green-300 p-4 rounded-lg'>{message}</p>
                </div>
            )}
        </div>
    )
}

export default Message