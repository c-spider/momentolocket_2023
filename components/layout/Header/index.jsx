import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth, useUtil } from 'store/hook';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import UserDropdown from './UserDropdown';
import NotificationMenu from './NotificationMenu';
import BagMenu from './BagMenu';
import { setColors, setMetals, setMyBag, setProducts, setLockets, setProductTypes, setOrders } from 'store/slices/utilSlice';
import Button from 'components/utils/Buttons/Button';
import AUTH_API from 'api/Auth';
import { login, setShippingAddress } from 'store/slices/authSlice';
import UTILS_API from 'api/Util';

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { myBag, orders } = useUtil();
    const { avatar, role, isVerified, firstName } = useAuth();
    const [isUserDropDown, openUserDropdown] = useState(false);
    const [isNotificationDropDown, openNotificationDropdown] = useState(false);
    const [isBagDropDown, openBagDropdown] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data) {
            dispatch(login(JSON.parse(data)));
        }

        tryAuthToken()
        const b = JSON.parse(localStorage.getItem('myBag'))
        dispatch(setMyBag({ myBag: b ? [...b] : [] }))

        dispatch(setProductTypes({
            productTypes: [
                {
                    id: 1,
                    name: "Necklace",
                },
                {
                    id: 2,
                    name: "Ring",
                },
                {
                    id: 3,
                    name: "Pendant",
                },
            ]
        }))

        const ba = localStorage.getItem("shippingAddress");
        if(ba) {
            dispatch(setShippingAddress({shippingAddress: JSON.parse(ba)}));
        }

        load();


    }, [])

    useEffect(() => {
        // if(!isVerified && !!firstName) {
        //     router.push('/auth/verify')
        // }
    }, [isVerified, firstName])

    const load = async () => {
        const metals = await UTILS_API.getMetals();
        dispatch(setMetals({ metals: metals.rows }))

        const colors = await UTILS_API.getColors();
        dispatch(setColors({ colors: colors.rows }))

        const lockets = await UTILS_API.getLockets();
        dispatch(setLockets({ lockets: lockets.rows }))
    }

    const tryAuthToken = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (token && isVerified != undefined) {
                const res = await AUTH_API.me(token);
                const data = res.data;
                if(data.status == 0 || data.isVerified == false)
                {
                    router.push("/auth/verify");
                    return;
                }

                dispatch(login({
                    logined: data.logined,
                    fullname: `${data.first_name} ${data.last_name}`,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    phone: data.phone,
                    email: `${data.email}`,
                    avatar: data.avatar,
                    userId: data.id,
                    country: JSON.parse(data.country ? data.country : "{}"),
                    state: JSON.parse(data.state ? data.state : "{}"),
                    city: data.city,
                    apartment: data.apartment,
                    address: data.address,
                    zipcode: data.zipcode,
                    role: data.role,
                    authToken: data.authToken,
                    status: data.status
                }))

                if(data.role == 3) {
                    const orderData = await UTILS_API.getUnViewedOrders();
                    dispatch(setOrders({orders: orderData.rows}));
                }
            } else {
            }
        } catch (e) {
        }
    }

    return (
        <div className="z-30 bg-[#ffffff90] fixed w-full top-0 flex justify-between items-center transition-all duration-500 bg-white h-[4.5rem] px-[40px]">
            <Link href="/">
                <a target="_self" className='h-[40px] flex cursor-pointer items-center'>
                    <Image
                        src='/images/momento-logo.png'
                        alt=''
                        width={120}
                        height={40}
                    />
                    <div className='mx-[20px] h-full w-[1px] bg-[#747067] opacity-[0.2]'></div>
                    <Image
                        src='/images/galatea-logo.png'
                        alt=''
                        width={156}
                        height={40}
                    />
                </a>
            </Link>
            <div className='flex justify-center items-center'>
                <Navbar className="hidden lg:block" />
                { role == 3 &&
                    <div className='w-[2.5rem] h-[2.5rem] mx-[1.25rem] relative'>
                        <button className='w-[2.5rem] h-[2.5rem]' onClick={() => { orders.length > 0 && openNotificationDropdown(true) }}>
                            <Image alt='' src='/images/bell.svg' width={40} height={40} />
                            {orders.length > 0 &&
                                <p className='absolute text-white min-w-[1.625rem] min-h-[1.625rem] px-[0.25rem] -top-[0.25rem] -right-[0.75rem] bg-primary rounded-[10px] rounded-bl-[0px] border-[0.125rem] border-white'>
                                    {orders.length}
                                </p>
                            }
                        </button>
                        {isNotificationDropDown && <NotificationMenu onCloseMenu={() => { openNotificationDropdown(false) }} />}
                    </div>
                }
                <div className='w-[2.5rem] h-[2.5rem] mx-[1.25rem] relative'>
                    <button className='w-[2.5rem] h-[2.5rem]' onClick={() => { myBag.length && openBagDropdown(true) }}>
                        <Image alt='' src='/images/bag.png' width={40} height={40} />
                        {myBag?.length > 0 &&
                            <p className='absolute text-white min-w-[1.625rem] min-h-[1.625rem] px-[0.25rem] -top-[0.25rem] -right-[0.75rem] bg-primary rounded-[10px] rounded-bl-[0px] border-[0.125rem] border-white'>
                                {myBag?.length}
                            </p>
                        }
                    </button>
                    {isBagDropDown && <BagMenu onCloseMenu={() => { openBagDropdown(false) }} />}
                </div>

                <div className='w-[2.5rem] h-[2.5rem] mx-[1.25rem] relative'>
                    <button className='w-[2.5rem] h-[2.5rem] border-[#00000020] border-[1px] rounded-full overflow-hidden' onClick={() => { openUserDropdown(true) }}>
                        { avatar && 
                            <div className='w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden relative'> 
                                <Image alt='' src={avatar} width={40} height={40} layout='fill' objectFit='cover' /> 
                            </div>
                        }
                        {!avatar && <Image alt='' src='/images/avatar.svg' width={40} height={40} />}
                    </button>
                    {isUserDropDown &&
                        <UserDropdown onCloseMenu={() => { openUserDropdown(false) }} />
                    }
                </div>

                {/* <ConnectWallet className='bg-[#AAEFFF] border-[#400077] border-[2px] rounded-[10px] '
                        colorMode="dark"
                        accentColor="#AAEFFF"
                    /> */}
            </div>
            {/* </div> */}
        </div>
    )
}