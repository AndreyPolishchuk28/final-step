import React from 'react'

export const FullOrder = (props) => {

                    const data = props.data

                    const addressValues = Object.values(data.billing_address)

                    const address= addressValues.map((item, index) => {
                        return <p className="card-text" key={"add" + index}>{item}</p>
                    })

                    const products = data.product_items.map((item, index) => {
                        const oneOrder = Object.values(item)
                        const allOrders = oneOrder.map((item, index) => {
                            return <p className="card-text" key={"ord" + index}>{item}</p>
                        })
                        return (
                            <div className="card m-2 p-fixed" key={index}>
                                <div className="card-body d-flex flex-column flex-wrap">
                                    {allOrders}
                                </div>
                            </div>) 
                        })

                    console.log(address);
                    console.log(products);
                    return (
                        <div className="card m-2 p-fixed">
                            <div className="card-body">
                                <p className="card-title">{data.order_no}</p>
                                <p className="card-text">{data.creation_date}</p>
                                <p className="card-text">{data.order_total}</p>
                                <p className="card-text">{data.currency}</p> 
                                <p className="card-text">{address}</p>       
                                <p className="card-text">{data.customer_info.customer_no}</p>    
                                <p className="card-text">{data.customer_info.email}</p>
                                <div className="d-flex">{products}</div>     
                            </div>
                        </div>
                        )
                        
                }
