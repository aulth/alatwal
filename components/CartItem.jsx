import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
const CartItem = ({ cart, cartData, setCartData, setDeleteState }) => {
    console.log(cart)
    const deletItem = (id) => {
        if (typeof window !== 'undefined') {
            let cart = cartData;
            console.log(cart);
            console.log(id)
            cart = cart.filter(item => item.id !== id);
            console.log(cart);
            if (typeof window !== 'undefined') {
                localStorage.setItem('tour-cart', JSON.stringify(cart))
            }
            setCartData(cart);
            setDeleteState(id)
        }
    }
    return (
        <>
            <div className="w-full relative border border-gray-100 rounded-lg p-1 my-2">
                <button onClick={() => { deletItem(cart.id) }} className="absolute -right-1 -top-1 bg-white  hover:text-white hover:bg-red-400 rounded-full duration-100"><AiOutlineCloseCircle className='text-lg ' /></button>
                <h2 className="text-lg font-semibold border-b border-gray-100 p-1">{cart.title ? cart.title : "title_goes_here"}</h2>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 mb-1">
                    <span className='font-semibold'>Option Name:</span>
                    <p>{cart.title ? cart.title : 'Title goes here'}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Date:</span>
                    <p>{cart.date ? cart.date : 'date here'}</p>
                </div>
                {
                    cart.platinum &&
                    <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                        <span className='font-semibold'>Time:</span>
                        <p>{cart.time ? cart.time : 'time here'}</p>
                    </div>
                }
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Pax:</span>
                    <p>{cart.adult ? `${cart.adult}x Adult, ` : ''}{cart.child ? `${cart.child}x Children, ` : ''}{cart.infant ? `${cart.infant}x Infant` : ''}</p>
                </div>
                {/* <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Last Date To Cancel:</span>
                    <p>{cart.lastDateToCancel ? cart.lastDateToCancel : 'last date here'}</p>
                </div> */}
                {/* <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Amount (Ex VAT):</span>
                    <p>{cart.price ? cart.price : '00'} AED</p>
                </div> */}
                {/* <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>VAT Amount:</span>
                    <p>{cart.vat ? cart.vat : '00'} AED</p>
                </div> */}
                {
                    cart.explorer &&
                    <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                        <span className='font-semibold'>Type:</span>
                        <p>{cart.typeOfTicket ? cart.typeOfTicket : 'time here'}</p>
                    </div>
                }
                {
                    cart.explorer && cart.typeOfTicket=='privateTransfer' &&
                    <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                        <span className='font-semibold'>Transport:</span>
                        <p>{cart.transport ? cart.transport : 'time here'}</p>
                    </div>
                }
                {
                    <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                        <span className='font-semibold'>Ticket:</span>
                        <p>{cart.price?cart.price:''}</p>
                    </div>
                }
                {
                    cart.isFastTrackAddOn &&
                    <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                        <span className='font-semibold'>Fast Track Add On:</span>
                        <p>{cart.fastTrackAddOn ? cart.fastTrackAddOn*(Number(cart.child) + Number(cart.adult) + Number(cart.infant)) : 'time here'}</p>
                    </div>
                }
                <div className="w-full flex justify-between text-sm  p-1 my-1">
                    {/* <span className='font-semibold'>Total (Inc VAT):</span> */}
                    <span className='font-semibold'>Total:</span>
                    {/* <p> {cart.price + (cart.explorer? cart.transport: 0 ) + (cart.isFastTrackAddOn?cart.fastTrackAddOn:0) + (cart.vat?cart.vat:0)} AED</p> */}
                    <p> {cart.price + (cart.explorer? cart.typeOfTicket=='privateTransfer'? cart.transport: 0:0 ) + (cart.isFastTrackAddOn?cart.fastTrackAddOn*(Number(cart.child) + Number(cart.adult) + Number(cart.infant)):0)} AED</p>
                </div>
            </div>
        </>
    )
}

export default CartItem