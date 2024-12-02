import client from ".";

import { LoginModel } from "@/classes/auth";

const link = "/auth";

const login = async (data: LoginModel) => {
    return new Promise((resolve, reject) => {
        client.post(`${link}/login`, data)
            .then(response => {
                if (response.data?.token) {
                    client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                    sessionStorage.setItem('token', response.data.token)
                }

                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const logout = () => {
    sessionStorage.removeItem('token')
}

const checkToken = async () => {
    return new Promise((resolve, reject) => {
        client.get(`${link}/check-token`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export { login, checkToken, logout }