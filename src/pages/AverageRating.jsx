import React from 'react'
import StarRatings from 'react-star-ratings'

const AverageRating = (p) => {
    if(p && p.ratings && p.ratings.length > 0) {
        let ratingsArray = p && p.ratings
        let total = 0
        let length = ratingsArray.length
        ratingsArray.forEach(r => {
            total += r.star
        });
        let average = total/length
        return (
            <div className='text-center pt-1 pb-3 d-flex justify-content-center '>
                <span>
                    <StarRatings starDimension='20px' starSpacing='2px' starRatedColor='red' rating={average}/>
                    {" "}
                </span>
                <span className='ps-2' style={{ paddingTop: "3px" }}>({p.ratings.length})</span>
            </div>
        )
    }else{
        return (
            <div className='text-center pt-1 pb-3'>No rating available yet</div>
        )
    }
}

export default AverageRating

