import {baseAPIRequest} from "../utils/service"

export const getCategories = () => {
    return baseAPIRequest.get('category')
}