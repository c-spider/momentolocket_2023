import { useState, useEffect } from "react";
import UTILS_API from "api/Util";
import OrderItem from "./OrderItem";
import Image from "next/image";

export default function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [isLabelOpen, openLabel] = useState(false);
    const [selectedOrder, selectOrder] = useState({});

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await UTILS_API.getOrders(false);
        setOrders(res);
    }
    return (
        <div className="mx-[20px] md:mx-[2.5rem] bg-[#F5F5F5] flex justify-center pt-[20px]">
            <div className="container grow flex flex-col justify-center items-center relative px-[2rem] pt-[5rem]">
                {/* <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-[#AC8118] text-center">
                    Order Table
                </h2> */}
                <div className="mx-[1rem] mb-[120px] bg-white p-[2rem] rounded-[0.5rem] w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="px-[30px] text-[1rem] leading-[1.6875rem] h-[5rem] border-b-[1px] border-[#D4D4D4] flex items-center">
                                <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[80px] text-center"> Order ID </th>
                                <th className="text-[#9E785D] leading-[4rem] w-[200px] px-[0.875rem] text-left"> Buyer </th>
                                <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[80px] text-center"> Items </th>
                                <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[120px] text-center font-medium"> Total Price </th>
                                <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[200px] grow font-medium"> Shipping Address </th>
                                <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[150px] grow font-medium"> Created </th>
                                <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[150px] grow font-medium"> Payment ID </th>
                                <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[80px] grow font-medium"> Shipment </th>
                                <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[120px]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) =>
                                <OrderItem data={item} key={index} onOpenLabel={() => {
                                    selectOrder(item), openLabel(true)
                                }}/>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            { isLabelOpen &&
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-[#000000a0] z-30" onClick={(e) => {openLabel(false)}}>
                    <div className="relative bg-transparent w-full h-full overflow-y-auto aspect-video">
                        <Image src={selectedOrder.shippingLabel} layout="fill"/>
                    </div>
                </div>
            }
        </div>
    )
}

const orders = [
    {
        id: 79383,
        products: [
            {
                id: 124,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 125,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 126,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            }
        ],
        username: "Mark Newman",
        subTotal: 122.50,
        promotion: 10.00,
        tax: 35.00,
        total: 142.5,
        upsId: 213654641,
        address: "351 Markham street, Toronto On Canada",
        status: 1,
    },
    {
        id: 79384,
        products: [
            {
                id: 124,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 125,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 126,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            }
        ],
        username: "Mark Newman",
        subTotal: 122.50,
        promotion: 10.00,
        tax: 35.00,
        total: 142.5,
        upsId: 213654641,
        address: "351 Markham street, Toronto On Canada",
        status: 1,
    },
    {
        id: 79385,
        products: [
            {
                id: 124,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 125,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            },
            {
                id: 126,
                name: "Pearl Flower",
                image: '/images/jewelry.png',
                metal: "Silver",
                color: "Red",
                price: 125.0,
                quantity: 3,
                totalPrice: 350,
            }
        ],
        username: "Mark Newman",
        subTotal: 122.50,
        promotion: 10.00,
        tax: 35.00,
        total: 142.5,
        upsId: 213654641,
        address: "351 Markham street, Toronto On Canada",
        status: 1,
    }
]