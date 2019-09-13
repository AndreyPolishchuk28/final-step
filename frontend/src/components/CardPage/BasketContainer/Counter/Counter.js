

import React from 'react';
import { useState } from 'react';

export const Counter =() =>{
    const [count, setCount] = useState(1);
    return(
        <div>
            <button onClick={() => {
                if (count > 1) setCount (count - 1)}}>-</button>
            <button>{count}</button>
            <button onClick={() => setCount (count + 1)}>+</button>
        </div>
    )
};
