import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useState} from 'react';
import {uploadChunk} from '../../utils/upload';

interface IProps {
    wrapper?: any;
    image?: Storage | any;
    onUploadSuccess?: (data: Storage) => void;
    defaultImage?: any;
    title?: string;
    isRequire?: any;
    disabled?: boolean;
    className?: string;
    fieldName: any;
    isSingle?: boolean;
    url: any;
}
const UploadReportFileInput = (props: IProps) => {
    const {
        isSingle,
        title,
        isRequire,
        disabled,
        image,
        onUploadSuccess,
        defaultImage,
        fieldName,
        url,
    } = props;
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const handleUpload = useCallback(
        (event: any) => {
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
                file,
                url,
                (err, {data, percent}) => {
                    if (err) {
                        setIsLoading(false);
                        setPercent(0);
                    }
                    if (data) {
                        setIsLoading(false);
                        setPercent(0);
                    } else {
                        setPercent(percent);
                    }
                },
            );
        },
        [fieldName, isSingle, queryClient, url],
    );
    return (
        <div>
            {' '}
            <input
                multiple
                className="z-30"
                type="file"
                onChange={handleUpload}
                accept="image/*"
                onInvalid={(e) => {
                    e.currentTarget.setCustomValidity('Vui lòng tải lên ảnh');
                }}
                onInput={(e) => {
                    e.currentTarget.setCustomValidity('');
                }}
            ></input>
        </div>
    );
};

export default UploadReportFileInput;
