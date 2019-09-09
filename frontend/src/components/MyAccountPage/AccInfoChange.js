import React, {useState} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfoChange = (props) => {

    const [ userInfo, setUserInfo] = useState({
        ...props.userInfo
    })
    

    const changeHandler = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        const data = await {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        }

        const response = await fetch("/change_customer_info",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
    }
  
    return (
        <Row  gutter={6}>
        {props.userInfo ?
            <Col align="center">
                <Input type="text" onChange={changeHandler} defaultValue={props.userInfo.name} name="first_name"/>
                <Input type="text" onChange={changeHandler} defaultValue={props.userInfo.surname} name="last_name"/>
                <h2>{userInfo.name + " " + userInfo.surname}</h2>
                <Link exact to="/account">
                    <Button type="Deafault">Decline changes</Button>
                </Link>
                <Link exact to="/account">
                    <Button type="primary" onClick={submitHandler}>Submit</Button>
                </Link>
            </Col>
            : null}
        </Row>
    )
};