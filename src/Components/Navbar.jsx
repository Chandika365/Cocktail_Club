import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { FaHeart } from 'react-icons/fa';

const navigation = [
    { name: 'Home', to: '/', current: false },
    { name: 'Search', to: '/search', current: false },
    { name: 'Favorite', to: '/favorite', current: false },
];

export default function Navbar() {
    const [{ favorite }, dispatch] = useStateValue()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className='absolute inset-x-0 top-0 z-50'>
            <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
                <div className='flex lg:flex-1'>
                    <Link to='/' className='-m-1.5 p-1.5'>
                        <div className='text-lg font-semibold leading-6 text-green-500 mb-0'>
                            Cocktail Club
                        </div>
                    </Link>
                </div>

                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>

                <div className='hidden lg:flex lg:gap-x-12'>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                    <Link to='/favorite' className='text-sm font-semibold leading-6 text-gray-900'>
                        <div className='flex '>
                            Favorite Cocktails
                            <FaHeart className='ml-3 mb-2' color="red" size={20} />
                            <span className='ml-3 '>
                                {favorite?.length}
                            </span>
                        </div>

                    </Link>
                </div>
            </nav>

            <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between'>
                        <Link to='/' className='-m-1.5 p-1.5'>
                            <div className='text-lg font-semibold leading-6 text-gray-900'>
                                Cocktail Club
                            </div>
                        </Link>
                        <button
                            type='button'
                            className='-m-2.5 rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>

                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50'
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className='py-6'>
                                <Link
                                    to='/favorite'
                                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                >
                                    Favorite Cocktails
                                    <span className='ml-4 '>
                                        {favorite?.length}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
