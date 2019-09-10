
import React from 'react'
import {Link} from "react-router-dom";

export const CardHeader = () => {
    return(
        <div className="redirection">
            <h2 className="caption">your cart</h2>
            <div className="page-way">
                <Link to="/"><span className="text-left">Home</span></Link>
                <span> / Your cart</span>
            </div>
        </div>
    )
};