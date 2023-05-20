import {useCallback, useState} from 'react';
import {uploadChunk} from '../../../../utils/upload';
import {SubTitle, Wrapper} from './styled';

interface IProps {
    wrapper?: any;
    image?: Storage | any;
    onUploadSuccess?: (data: Storage) => void;
    defaultImage?: any;
    title?: string;
    isRequire?: any;
    disabled?: boolean;
    className?: string;
    id: any;
}

const Upload = (props: IProps) => {
    const {
        title,
        isRequire,
        disabled,
        image,
        onUploadSuccess,
        defaultImage = '/images/account/plus-background.png',
        id,
    } = props;
    const UploadWrapper = props?.wrapper || Wrapper;
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpload = useCallback((event: any) => {
        event.stopPropagation();
        event.preventDefault();
        // console.log('event', ...event?.target?.files);
        const file_: any = event?.target?.files;
        console.log('file_', file_);
        const file: any = [];
        for (let i = 0; i < file_.length; i++) {
            file.push(file_[i]);
        }
        console.log('file123123', typeof file[0]);

        if (!file) return;

        setIsLoading(true);
        uploadChunk(id, file, (err, {data, percent}) => {
            if (err) {
                setIsLoading(false);
                setPercent(0);
            }
            if (data) {
                console.log('data', data);
                setIsLoading(false);
                setPercent(0);
            } else {
                setPercent(percent);
            }
        });
    }, []);
    return (
        <>
            <UploadWrapper
                disabled={disabled}
                className={`${props?.className}`}
            >
                <img
                    src={image}
                    alt={'Image'}
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                />
                {defaultImage && title && (
                    <SubTitle className="sub">{title}</SubTitle>
                )}

                <input
                    multiple
                    className="z-30"
                    type="file"
                    onChange={handleUpload}
                    accept="image/*"
                    required={isRequire}
                    onInvalid={(e) => {
                        e.currentTarget.setCustomValidity(
                            'Vui lòng tải lên ảnh',
                        );
                    }}
                    onInput={(e) => {
                        e.currentTarget.setCustomValidity('');
                    }}
                ></input>

                {isLoading && (
                    <span className="loading-percent">Đang tải lên...</span>
                )}
            </UploadWrapper>
        </>
    );
};

export default Upload;
