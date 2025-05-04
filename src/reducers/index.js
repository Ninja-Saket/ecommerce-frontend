import {combineReducers} from 'redux'
import userReducer from './userReducer'
import searchReducer from './searchReducer'
import cartReducer from './cartReducer'
import drawerReducer from './drawerReducer'
import couponReducer from './couponReducer'
import codReducer from './codReducer'
import emailReducer from './emailReducer'

const rootReducer = combineReducers({
    user : userReducer,
    search : searchReducer,
    cart : cartReducer,
    drawer : drawerReducer,
    coupon : couponReducer,
    cod : codReducer,
    emailData : emailReducer
})

export default rootReducer