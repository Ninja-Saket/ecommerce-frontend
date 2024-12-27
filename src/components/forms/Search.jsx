import React from "react"
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'

const Search = ()=> {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const search = useSelector((state) => state.search)
    const {text} = search
    
    const handleChange = (e)=> {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {
                text : e.target.value
            }
        })
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        navigate(`/shop?${text}`)
    }

    return (
        <form className="d-flex align-items-center mt-1" onSubmit={handleSubmit}>
            <input 
                onChange={handleChange}
                type="search"
                value={text}
                className="form-control me-2"
                placeholder="Search"
            />
            <SearchOutlined onClick={handleSubmit} style={{cursor: "pointer"}}/>
        </form>
    )
}

export default Search