import React, {useState, useEffect} from 'react'

export const CheckoutPage = () => {

    const [userInfo, setUserInfo] = useState();

    const getUserInfo = async () => {
        const response = await fetch("/customer")

        const responseJSON = await response.json();
        setUserInfo(responseJSON);
        console.log(responseJSON);
        console.log(userInfo);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div></div>
    )
};