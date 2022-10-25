import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const Greeting = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state.auth)

    setTimeout(() => {
        navigate('/')
    }, 5000);

    return (
        <>
            <h1>Congratulations {user.name}!</h1>
            <p>you'll be receiving an e-mail to {user.email} with your purchase details</p>
        </>
    )
}
