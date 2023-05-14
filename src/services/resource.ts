import {baseAPIRequest} from "../utils/service"

export const importExcel = (input: any) => {
    return baseAPIRequest.post('resources/import', input, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getStatistics = () => {
    return baseAPIRequest.get('resources/statistics')
}

export const getResources = (params: any) => {
    return () => baseAPIRequest.get('resources', params)
}