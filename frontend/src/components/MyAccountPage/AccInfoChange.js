import React, {useState} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfoChange = (props) => {
    const [ userInfo, setUserInfo] = useState({
        ...props
    })

    //УДАЛИТЬ КОГДА БУДЕТ СВЯЗЬ С ДБ
    const [ firstLast, setFirstLast] = useState({
        "name": userInfo.first_name,
        "surname": userInfo.last_name
    })

    const changeHandler = (event) => {
        setFirstLast({
            ...firstLast,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = () => {
        setUserInfo({
            ...props,
            first_name: firstLast.name,
            last_name: firstLast.surname
        })
    }
  
    return (
        <Row  gutter={6}>
            <Col align="center">
                <Input type="text" onChange={changeHandler} defaultValue={firstLast.name} name="name"/>
                <Input type="text" onChange={changeHandler} defaultValue={firstLast.surname} name="surname"/>
                <h2>{firstLast.name + " " + firstLast.surname}</h2>
                <Link exact to="/account">
                    <Button type="Deafault">Decline changes</Button>
                </Link>
                <Link exact to="/account">
                    <Button type="primary" onClick={submitHandler}>Submit</Button>
                </Link>
            </Col>
        </Row>
    )
};

AccInfoChange.defaultProps = {
    first_name: "Ivan",
    full_name: "Ivan Bohatov",
    last_name: "Bohatov",
    email: "ibohatov@mail.com",
}