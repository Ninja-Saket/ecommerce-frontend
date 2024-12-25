import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import {toast} from 'react-toastify'
import {StarOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'

const RatingModal = ({children}) => {
    const userToken = useSelector((state) => state.user && state.user.token ? state.user.token : null)
    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleModal = () => {
        if(userToken){
            setModalVisible(true)
        }else{
            navigate('/login', {state : { from : location}})
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className='text-danger'/> <br/>
                {userToken ? "Leave Rating" : "Login to leave rating"}
            </div>
            <Modal
                title="Leave your rating"
                centered
                open={modalVisible}
                onOk={()=> {
                    setModalVisible(false)
                    toast.success("Thanks for your review. It will appear soon.")
                }}
                onCancel={()=> setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal


