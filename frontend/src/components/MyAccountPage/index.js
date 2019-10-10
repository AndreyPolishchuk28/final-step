import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import {Orders} from './Orders'
import {FullOrder} from './FullOrder'
import {AccInfoChange} from './AccInfoChange'
import {ChangePassword} from './ChangePassword'
import {AccInfo} from './AccInfo'

import './scss/main.scss'
import {Menu, Icon, Button, Empty} from "antd"

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const MyAccountPage = connect(mapStateToProps, {getUserInfo})((props) => { 

    console.log(props);

    const [ pageState, setPageState ] = useState({ page: "info"})

    const [ order, setOrder ] = useState({ id: "info"})

    const returnPage = () => {
        switch(pageState.page){
            case "info":
                return <AccInfo userInfo={props.auth.userInfo} setPageState={setPageState}/>
            case "changeInfo":
                return <AccInfoChange setPageState={setPageState}/>
            case "changePassword":
                return <ChangePassword setPageState={setPageState}/>
            case "orders":
                return <Orders setPageState={setPageState} setOrder={setOrder} history={props.history}/>
            case "fullOrder":
                return <FullOrder setPageState={setPageState} id={order.id}  history={props.history}/>
        }
    }

    
    useEffect(() => {
        props.getUserInfo()
    },[])

    return (
        props.auth.loginStatus ?
            <section className="main-wrapper">   
                <Menu
                defaultSelectedKeys={["1"]}
                mode="horizontal"
                >
                    <Menu.Item key="1" onClick={() => {setPageState({ page: "info"})}}>Account info</Menu.Item>
                    <Menu.Item key="2" onClick={() => {setPageState({ page: "orders"})}}>Order history</Menu.Item> 
                </Menu>
                
                <Menu
                style={{ width: 200 }}
                defaultSelectedKeys={['1']}
                mode="inline"
                >
                    <Menu.Item key="1" onClick={() => {setPageState({ page: "info"})}}>Account info</Menu.Item>
                    <Menu.Item key="2" onClick={() => {setPageState({ page: "orders"})}}>Order history</Menu.Item> 
                </Menu>
            
                <div className="page-viewer">
                    {returnPage()}
                </div>
            </section>
        :
            <div class="no-user-div">
                <Empty
                        imageStyle={{
                        height: 300,
                        width: 100+"%"
                        }}
                        description={
                        <span> No user is loged in on this device</span>
                        }
                    >
                        <Button type="primary" onClick={() => {props.history.push('/login')}}>Login or Register</Button>
                </Empty>
            </div>
        )
});