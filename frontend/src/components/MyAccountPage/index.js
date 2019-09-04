import React from 'react'

export const MyAccountPage = (props) => {
        const orders = props.orders.map((item, index) => {
            return (
                <div className="card m-2" key={index}>
                    <div className="card-body">
                        <p className="card-title">{item.order_no}</p>
                        <p className="card-text">{item.creation_date}</p>
                        <p className="card-text">{item.order_total}</p>
                        <p className="card-text">{item.currency}</p>     
                    </div>
                </div>
            )
        })

    return (
        <div className="m-5">
            <h2>{props.full_name}</h2>
            <h2>{props.email}</h2>
            <div className="">{orders}</div>
        </div>
    )
};

MyAccountPage.defaultProps = {
    first_name: "Ivan",
    full_name: "Ivan Bohatov",
    last_name: "Bohatov",
    email: "ibohatov@mail.com",

    orders : [
        {
            order_no: "00000101",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.50,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        },
        {
            order_no: "00000101",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.54,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        },
        {
            order_no: "00000101",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.34,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        }
    ]
}