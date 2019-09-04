import React, {useState} from 'react'
import {Orders} from './Orders'

export const MyAccountPage = (props) => {

    const [ pageState, setPageState] = useState(true)

    const [ userInfo, setUserInfo] = useState({
        ...props
    })

    //УДАЛИТЬ КОГДА БУДЕТ СВЯЗЬ С ДБ
    const [ firstName, setFirstName] = useState(userInfo.first_name)
    const [ lastName, setLastName] = useState(userInfo.last_name)

    
    console.log(userInfo);

    const changeHandlerName = (event) => {
        setFirstName(event.target.value)
    }

    const changeHandlerSurname = (event) => {
        setLastName(event.target.value)
    }

    const submithandler = () => {
        setUserInfo({
            ...props,
            first_name: firstName,
            last_name: lastName
        })
        changePage()
    }


    const changePage = () => {
        if(pageState) {
            setPageState(false)
        }
        if(!pageState) {
            setPageState(true)
        } 
    }

    const info = () => {
        if(!pageState) {
            return (
                <div className="d-flex flex-column">   
                    <input type="text" onChange={changeHandlerName} value={firstName}/>
                    <input type="text" onChange={changeHandlerSurname} value={lastName}/>
                    <h2>{userInfo.first_name + " " + userInfo.last_name}</h2>
                    <button onClick={changePage}>Decline changes</button>
                    <button onClick={submithandler}>Submit</button>
                </div>
            )
        }  
        return (
            <div>   
                <button onClick={changePage}>Change profile info</button>
                <h2>{userInfo.first_name}</h2>
                <h2>{userInfo.last_name}</h2>
                <h2>{userInfo.full_name}</h2>
                <h2>{userInfo.email}</h2>
                <Orders/>
            </div>
        )
    }



    return (
        <div className="m-5">
            <div>{info()}</div>
        </div>
    )
};

MyAccountPage.defaultProps = {
    first_name: "Ivan",
    full_name: "Ivan Bohatov",
    last_name: "Bohatov",
    email: "ibohatov@mail.com",
}