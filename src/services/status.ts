import {baseAPIRequest} from '../utils/service';

export const getListStatus = () => {
    return baseAPIRequest.get(`api/task-statuses`);
};
