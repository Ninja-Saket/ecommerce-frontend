import axios from "axios"

const createOrUpdateUser = async (authToken) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/create-or-update-user`, {}, {
        headers : {
            authToken
        }
    })
}

const currentUser = async (authToken) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/current-user`, {}, {
        headers : {
            authToken
        }
    })
}

const currentAdmin = async (authToken) => {
    return axios.post(`${import.meta.env.VITE_APP_API}/current-admin`, {}, {
        headers : {
            authToken
        }
    })
}

export {createOrUpdateUser, currentUser, currentAdmin}