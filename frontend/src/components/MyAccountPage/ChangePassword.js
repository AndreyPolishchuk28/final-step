import React, {useState} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const ChangePassword = (props) => {

    console.log(props);

    const [ passChange, setPassChange] = useState({
        currentPass: "",
        pass: "",
        repeatPass: ""
    })

    const changeHandler = (event) => {
        setPassChange({
            ...passChange,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        if (passChange.pass !== passChange.repeatPass){
            alert("passwords doesn't match")
        } else if (passChange.currentPass !== props.userInfo.password){
            alert('current password is incorrect')
        } else {
            const data = await {
                password: passChange.pass
            }

            await fetch("/change_customer_info",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            props.setUserInfo(data)

            props.history.push('/account/info/change')
        }
    }
  
    return (
        <Row  gutter={6}>
            <Col align="center">
                <Input type="text" onChange={changeHandler} name="currentPass"/>
                <Input type="text" onChange={changeHandler} name="pass"/>
                <Input type="text" onChange={changeHandler} name="repeatPass"/>
                <Link exact to="/account/info/change">
                    <Button type="Deafault">Decline changes</Button>
                </Link>
                <Button type="primary" onClick={submitHandler}>Submit password</Button>
            </Col>
        </Row>
    )
};