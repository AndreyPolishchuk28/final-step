import React, {useState} from 'react'
import {SearchResult} from "./SearchResult";
import {getSearchProducts} from "../../redux/catalog";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const Search = connect(mapStateToProps, {getSearchProducts})((props) =>{
    // const [products, setProducts] = useState();
    const [value, setValue] = useState('');

    const SearchProduct = (event) =>{
        setValue(event.target.value);
        props.getSearchProducts({
            q: event.target.value
        })
    };

    // useEffect(() =>{
    //
    // },[value]);

    return(
        <div>
            <form className='header-search-form'>
                <input value={value} onChange={ SearchProduct } type='text' placeholder='Music shop search ...'/>
                <button>
                    <i className="fas fa-search search-icon"></i>
                </button>
            </form>
            {props.catalog.searchProducts.length ? <SearchResult products={props.catalog.searchProducts} setValue={setValue} /> : null}
        </div>
    )
});