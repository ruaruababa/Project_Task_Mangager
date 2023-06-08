import dayjs from 'dayjs';
import {baseAPIRequest} from '../utils/service';

export const getTaskAnalystic = (input: any) => {
    try {
        const {date_range} = input;
        console.log('params>>>', !!input);

        const startAtParams =
            date_range && dayjs(date_range[0]).format('YYYY-MM-DD');
        const endAtParams =
            date_range && dayjs(date_range[1]).format('YYYY-MM-DD');
        const params =
            date_range && `?start_at=${startAtParams}&end_at=${endAtParams}`;
        if (input) {
            return baseAPIRequest.get(
                `/api/tasks/statistics${params ? params : ''}`,
            );
        } else {
            return baseAPIRequest.get(`api/tasks/statistics`);
        }
    } catch (error) {
        console.log('error>>>', error);
    }
};

export const getProjectAnalystic = (input: any) => {
    try {
        const {date_range} = input;
        console.log('params>>>', !!input);

        const startAtParams =
            date_range && dayjs(date_range[0]).format('YYYY-MM-DD');
        const endAtParams =
            date_range && dayjs(date_range[1]).format('YYYY-MM-DD');
        const params =
            date_range && `?start_at=${startAtParams}&end_at=${endAtParams}`;
        if (input) {
            return baseAPIRequest.get(
                `/api/projects/statistics${params ? params : ''}`,
            );
        } else {
            return baseAPIRequest.get(`api/projects/statistics`);
        }
    } catch (error) {
        console.log('error>>>', error);
    }
};
