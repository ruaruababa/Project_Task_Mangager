import {baseAPIRequest} from '../utils/service';

export const uploadReportFile = (id: any) => {
    return baseAPIRequest.post(`api/tasks/${id}/report`);
};
