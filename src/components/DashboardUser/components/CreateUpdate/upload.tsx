import {useCallback, useState} from 'react';
import {uploadChunk} from '../../../../utils/upload';
import {SubTitle} from './styled';

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

const Upload = (props: IProps) => {
    const {title, isRequire, image, defaultImage, fieldName, url} = props;
    const [fileUpload, setFileUpload] = useState<any>(null);
    const handleUpload = useCallback(
        (event: any) => {
            event.stopPropagation();
            event.preventDefault();
            const file_: any = event?.target?.files;
            const files: any = [];
            for (let i = 0; i < file_.length; i++) {
                files.push(file_[i]);
            }

            const file = file_.length === 1 ? file_[0] : files;
            setFileUpload(file);
            if (!file) return;

            uploadChunk(file, url, fieldName);
        },
        [fieldName, url],
    );

    const avatar = fileUpload ? URL.createObjectURL(fileUpload) : image;
    return (
        <>
            <div className="relative">
                <img
                    src={avatar}
                    alt={'Image'}
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                    className="absolute object-cover bg-cover rounded-full"
                />
                {defaultImage && title && (
                    <SubTitle className="sub">{title}</SubTitle>
                )}

                <input
                    multiple
                    className="z-30 !w-[150px] !h-[150px] opacity-0 cursor-pointer"
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
            </div>
        </>
    );
};

export default Upload;
