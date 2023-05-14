import {baseAPIRequest} from "../utils/service"

export const login = (values: {
    email: string,
    password: string
}) => {
    return baseAPIRequest.post('api/login', values)
}