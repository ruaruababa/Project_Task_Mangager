import {useQueryClient} from '@tanstack/react-query';
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
    fieldName: any;
    isSingle?: boolean;
}

const Upload = (props: IProps) => {
    const {
        isSingle,
        title,
        isRequire,
        disabled,
        image,
        onUploadSuccess,
        defaultImage,
        id,
        fieldName,
    } = props;
    const UploadWrapper = props?.wrapper || Wrapper;
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const handleUpload = useCallback((event: any) => {
        event.stopPropagation();
        event.preventDefault();
        // console.log('event', ...event?.target?.files);
        const file_: any = event?.target?.files;
        console.log('file_', file_);
        const files: any = [];
        for (let i = 0; i < file_.length; i++) {
            files.push(file_[i]);
        }

        const file = file_.length === 1 ? file_[0] : files;

        if (!file) return;

        setIsLoading(true);
        uploadChunk(
            isSingle || true,
            fieldName,
            id,
            file,
            (err, {data, percent}) => {
                if (err) {
                    setIsLoading(false);
                    setPercent(0);
                }
                if (data) {
                    setIsLoading(false);
                    setPercent(0);
                    queryClient.invalidateQueries(['getDetailUser'], id);
                } else {
                    setPercent(percent);
                }
            },
        );
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
