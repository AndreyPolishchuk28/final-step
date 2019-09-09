import React, {useState} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfoChange = (props) => {

    const [ userChange, setUserChange] = useState({
        ...props.userInfo
    })
    

    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        const data = await {
            first_name: userChange.first_name,
            last_name: userChange.last_name,
            email: props.userInfo.email
        }

        await fetch("/change_customer_info",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
        
        props.setUserInfo(data)
    }
  
    return (
        <Row  gutter={6}>
            {  props.userInfo ?
                <Col align="center">
                    <Link exact to="/account/info/change/pass">
                        <Button type="Deafault">change password</Button>
                    </Link>
                    <Input type="text" onChange={changeHandler} defaultValue={props.userInfo.first_name} name="first_name"/>
                    <Input type="text" onChange={changeHandler} defaultValue={props.userInfo.last_name } name="last_name"/>
                    <Link exact to="/account">
                        <Button type="Deafault">Decline changes</Button>
                        <Button type="primary" onClick={submitHandler}>Submit</Button>
                    </Link>
                </Col>
                : null }
        </Row>
    )
};