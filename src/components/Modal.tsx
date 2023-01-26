import { Fragment, useRef, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'


import ContextStates from '../context/States';

const ModalVista = () => {
  const { openVista, setOpenVista,respModal, setRespModal } = useContext(ContextStates);


  const cancelButtonRef = useRef(null)

  return (
    <>
    <Transition.Root show={openVista} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenVista}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 md:w-1/2 w-1/2">
                <div className="px-4 pt-2 sm:p-6">
                    <h3 className='text-2xl text-gray-600 text-center uppercase'>Confirma que desea quitar la película del carro?</h3>
                    <div className='flex mt-10 justify-around'>
                        <button 
                            type='button' 
                            className='bg-red-500 p-3 rounded-xl text-white'
                            onClick={()=>(setRespModal(true), setOpenVista(false))}
                        >Quitar</button>
                        <button 
                            type='button' 
                            className='bg-gray-500 p-3 rounded-xl text-white'
                            onClick={()=>(setOpenVista(false))}
                        >Cancelar</button>
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    
    </>
  )
}

export default ModalVista