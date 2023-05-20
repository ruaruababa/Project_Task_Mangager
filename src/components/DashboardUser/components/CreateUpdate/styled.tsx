import styled from 'styled-components';

export const Wrapper = styled.div<{
    width: number;
    height: number;
    disabled?: boolean;
}>`
    position: relative;
    width: 200px;
    height: 118px;
    ${({disabled}: any) => disabled && `pointer-events: none;`};
    .loading-percent,
    input,
    img {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        object-fit: contain;
    }

    .loading-percent {
        background: #f8f8f8;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        opacity: 0;
    }
`;

export const SubTitle = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    font-size: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 3px 0px;
`;

export const WrapperBanner = styled.div`
    position: relative;
    width: 200px;
    height: 118px;

    .loading-percent,
    input,
    img {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .loading-percent {
        background: #f8f8f8;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        opacity: 0;
    }
`;

export const ErrorMessage = styled.div`
    font-size: 14px;
    color: #d61d26;
    display: block;
    text-align: left;
`;
