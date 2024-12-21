import React, {useRef} from "react"
import Resizer from "react-image-file-resizer"
import axios from 'axios'
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Badge, Avatar, Space } from "antd"

const FileUpload = ({values, setValues, setLoading}) => {
    const userToken = useSelector(state => state.user.token)
    const fileInputRef = useRef(null)
    const fileUploadAndResize = (e)=> {
        let files = e.target.files
        let allUploadedFiles = values.images
        if(files){
            setLoading(true)
            let noerror = true;
            for(let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri)=> {
                    axios.post(`${import.meta.env.VITE_APP_API}/uploadimages`, {image : uri}, {
                        headers: {
                            authToken : userToken
                        }
                    }).then(result => {
                        setLoading(false)
                        allUploadedFiles.push(result.data)
                        setValues({...values, images : allUploadedFiles})
                        if(fileInputRef.current){
                            fileInputRef.current.value = ""
                        }
                    }).catch(err => {
                        noerror = false
                        setLoading(false)
                        console.log('Cloudinary upload error : ', err)
                        toast.error('Cloudinary upload error')
                    })
                }, 'base64')
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true)
        console.log('Remove image : ', public_id)
        axios.post(`${import.meta.env.VITE_APP_API}/removeimage`, {public_id},{
            headers : {
                authToken : userToken
            }
        }).then(res => {
            setLoading(false)
            const {images} = values;
            let filteredImages = images.filter((item)=> {
                return item.public_id !== public_id
            })
            setValues({...values, images: filteredImages})
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <>
            <div className="row">
                {values.images && values.images.map((image) => (
                    <Space size="middle" className="col-md-1 px-0 mx-3 col-sm-2" key={image.public_id}>
                        <Badge count="X" className="px-0 mx-0" onClick={()=> handleImageRemove(image.public_id)} style={{cursor: 'pointer'}}>
                            <Avatar
                            src={image.url}
                            size={100}
                            shape="square"
                            className="px-0 mx-0"
                            onClick={(e) => e.stopPropagation()}
                            />
                        </Badge>
                    </Space>
                ))}
            </div>
            <div className="row">
                <label className="col-md-2 mx-2 my-2 btn btn-info">Choose File
                    <input type="file" multiple accept="images/*" onChange={fileUploadAndResize} hidden ref={fileInputRef}/>
                </label>
            </div>
        </>
        
    )
}

export default FileUpload