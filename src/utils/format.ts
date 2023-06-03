import dayjs from "dayjs";

export function formatNumber(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const convertDate = (date: any) => {
    return dayjs(date).format('DD/MM/YYYY')
}

export const convertDateTime = (date: any) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm')
}