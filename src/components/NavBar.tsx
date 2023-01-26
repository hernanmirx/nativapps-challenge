import { useContext, useEffect } from 'react';
import { Disclosure } from '@headlessui/react'
import { BiMenu,BiCart } from 'react-icons/bi'
import ContextStates from '../context/States';
import { Link } from 'react-router-dom';


const navigation = [
  { name: 'Inicio', href: '/', current: false },
  { name: 'Carro', href: '/cart', current: false },
]

export const NavBar = () => {
    const { cantCart, setCantCart } = useContext(ContextStates)

    useEffect(()=>{
        const checkCant = () => {
            if (localStorage.getItem("arrayCart")!==null)
            {
                let arrayCart = JSON.parse(localStorage.getItem("arrayCart")!)
                setCantCart(arrayCart.length)    
            }
        }
        checkCant()
    },[])
  
    return (
        <Disclosure as="nav" className="bg-indigo-600 text-white shadow-md">

            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-24">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Abrir Menú</span>
                                <BiMenu className="block h-6 w-6" aria-hidden="true" />
                        </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center mr-10">
                            <Link to="/">
                                <img
                                    className="block lg:hidden w-24"
                                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Blockbuster_logo.svg/2560px-Blockbuster_logo.svg.png"}
                                    alt="Block Buster"
                                />
                                <img
                                    className="hidden lg:block w-24"
                                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Blockbuster_logo.svg/2560px-Blockbuster_logo.svg.png"}
                                    alt="Block Buster"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`(${item.current ? "bg-indigo-700 text-white" : "text-gray-300 hover:bg-indigo-500 hover:text-white"},
                                    "py-2 px-3 py-2 mx-2 rounded-md text-lg")`}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                                
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link
                            to={"/cart"}
                            
                        >
                            <div className='flex hover:bg-indigo-500 p-3 hover:rounded-full'>
                                <p className="text-3xl">
                                    <BiCart/>
                                </p>
                                {cantCart>0 && (
                                    <p className="ml-7 absolute bg-red-500 text-white rounded-full px-2">
                                        {cantCart}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            

            <Disclosure.Panel className="sm:hidden z-50 absolute w-full bg-indigo-600/95">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={`(${item.current ? "bg-indigo-700 text-white" : "text-gray-300 hover:bg-indigo-500 hover:text-white"},
                                "block py-2 px-3 rounded-md text-base font-medium")`}
                            aria-current={item.current ? 'page' : undefined}
                            >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
                <div className='px-3 pt-2 mb-5 flex'>
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}