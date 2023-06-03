import {baseAPIRequest} from "../utils/service"

export const getComputers = () => {
    return baseAPIRequest.get('computers')
}

export const createComputer = (input: {
    name: string,
    url: string
}) => {
    return baseAPIRequest.post('computers', input)
}

export const removeComputer = (id: string) => {
    return baseAPIRequest.delete('computers/' + id)
}
