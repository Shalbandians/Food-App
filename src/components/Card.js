import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    let options = props.options;
    const priceRef = useRef()
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState('')

    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.fooditem._id) {
                food = item;


                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalPrice, qty: qty, })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img: props.fooditem.img })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img: props.fooditem.img })

    }

    let finalPrice = qty * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>     <div>
            <div className="card mt-3" style={{ "width": "18rem ", "maxHeight": "360px" }}>
                <img src={props.fooditem.img}
                    className="card-img-top"
                    style={{ height: "120px", objectFit: "fill" }}

                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.fooditem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>

                                })
                            }

                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ${finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={'btn bg-success justify-center ms-2'} onClick={handleAddtoCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

