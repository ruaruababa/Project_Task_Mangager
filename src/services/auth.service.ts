import {secondBaseAPIRequest} from "../utils/service"

export const login = (values: {
    email: string,
    password: string
}) => {
    return secondBaseAPIRequest.post('api/login', values)
}