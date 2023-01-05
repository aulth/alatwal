import React from 'react'

const CartItem = ({cart}) => {
    return (
        <>
            <div className="w-full  border border-gray-100 rounded-lg p-1 my-2">
                <h2 className="text-lg font-semibold border-b border-gray-100 p-1">{cart.title?cart.title:"title_goes_here"}</h2>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 mb-1">
                    <span className='font-semibold'>Option Name:</span>
                    <p>{cart.title?cart.title:'Title goes here'}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Date:</span>
                    <p>{cart.date?cart.date:'date here'}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Time:</span>
                    <p>{cart.time?cart.time:'time here'}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Pax:</span>
                    <p>{cart.adult?`${cart.adult}x Adult, `:''}{cart.child?`${cart.child}x Children, `:''}{cart.infant?`${cart.infant}x Infant`:''}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Last Date To Cancel:</span>
                    <p>{cart.lastDateToCancel?cart.lastDateToCancel:'last date here'}</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>Amount (Ex VAT):</span>
                    <p>{cart.price?cart.price:'00'} AED</p>
                </div>
                <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                    <span className='font-semibold'>VAT Amount:</span>
                    <p>{cart.vat?cart.vat:'00'} AED</p>
                </div>
                <div className="w-full flex justify-between text-sm  p-1 my-1">
                    <span className='font-semibold'>Total (Inc VAT):</span>
                    <p>{cart.price?(cart.price+(cart.vat?cart.vat:0)):'00'} AED</p>
                </div>
            </div>
        </>
    )
}

export default CartItem