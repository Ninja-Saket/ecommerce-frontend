import React from "react";

const LocalSearch = ({keyword, setKeyword}) => {
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value)
    }
    
    return (
        <input type="search" placeholder="Filter" value={keyword} onChange={handleSearchChange} className="form-control mb-4 mt-4"/>
    )
}

export default LocalSearch