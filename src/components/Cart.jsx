import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

export const Cart = () => {

    const { carId } = useParams()

    const [cart, setCart] = useState({})
    const [payMethod, setPayMethod] = useState("")

    // console.log("CAR_ID", carId)

    useEffect(() => {
        console.log("CAR_ID", carId)

        axios.get(`/api/cart/${carId}`)
            .then((car) => {
                console.log("CAR", car.data)
                setCart(car.data)
            })

    }, []);


    const checkout = () => {

        axios.post(`/api/cart/checkout/${cart.buyer[0].id}`,

            {
                "detail":
                    [
                        {
                            "brand": cart.brand,
                            "model": cart.model,
                            "year": cart.year,
                            "price": cart.price
                        }

                    ],
                "checkout": true,
                "paymentMethod": payMethod,
                "totalPrice": cart.price
            }

        )


    }

    const handleBuyMethod = (event) => {

        setPayMethod(event.target.value)

    }

    console.log(payMethod)

    const Contenedor = () => {
        return (
            <><div className='divCenter'> Carrito de {cart.buyer[0].name}:</div>
                <div className="divCenter">
                    <div>
                        {" "}
                        <h3>
                            {" "}
                            {cart.brand} {cart.model}{" "}
                        </h3>
                        <br />
                        <div>
                            <img src={cart.img[0]} className="img-thumbnail w-25 rounded-pill" alt="..." />

                            <h2> $ {cart.price} </h2>
                            <h4> features: </h4>

                            <p> description: {cart.description} </p>
                            <p> year: {cart.year} </p>

                            {/*     <DropdownButton onChange={handleBuyMethod} id="dropdown-basic-button" title="Dropdown button">
                                <Dropdown.Item value={"cash"} href="#/action-1">Cash</Dropdown.Item>
                                <Dropdown.Item value={"credit"} href="#/action-2">Credit Card</Dropdown.Item>
                                <Dropdown.Item value={"god"} href="#/action-3">God Pays</Dropdown.Item>
                            </DropdownButton> */}

                            <select title="Payment Method" name="owners" id="owners" onChange={handleBuyMethod}>
                                <option selected> Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="God Pays">God Pays</option>

                            </select>

                            <h1> Total $ {cart.price} </h1>

                            <a href={`/checkout`}>
                                <button type="button" className="btn btn-primary" onClick={checkout}>
                                    Proceed to Checkout
                                </button>
                            </a>
                            <a href={"/"}>
                                <button className="btn btn-outline-primary">Back</button>
                            </a>

                        </div>{" "}
                    </div>

                </div >

            </>
        )
    }


    return (
        cart.id ? <Contenedor /> : "loading"
    )
}
