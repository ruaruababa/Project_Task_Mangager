import {create} from 'zustand';
import {removeAccessToken} from '../utils/auth';

export interface UserStore {
    page: {
        name?: string;
        id?: string;
        avatar?: any;
    };
    isLogin: boolean;
    isLoadingUser: true;
    user?: any;
    setUserData: (user: any) => void;
    logout: () => void;
    loginPage: (page: {avatar: any; name: string; id: string}) => void;
    logoutPage: () => void;
    login: (token: any, user: any) => void;
    setLoadingUser: (status: boolean) => void;
}

const useUserStore = create((set, get) => ({
    user: null,
    isLogin: false,
    setUserData: (user: any) => {
        set({
            user,
            isLogin: true,
        });
    },
    login: (token: any, user: any) => {
        set({
            token,
            user,
            isLogin: true,
        });
    },
    setLoadingUser: (status: boolean) => {
        set({
            isLoadingUser: status,
        });
    },
    logout: () => {
        set({
            user: null,
            isLogin: false,
            page: undefined,
            pageId: undefined,
        });
        removeAccessToken();
    },
    loginPage: (page: any) => {
        set({
            page,
        });
    },
    logoutPage: () => {
        set({
            pageId: undefined,
            page: undefined,
        });
    },
}));

export default useUserStore;
