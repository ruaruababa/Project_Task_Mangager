import {FileAddOutlined} from '@ant-design/icons';
import {Modal, Tag} from 'antd';
import {useCallback, useState} from 'react';
import {uploadChunk} from '../../utils/upload';
interface IProps {
    wrapper?: any;
    onUploadSuccess?: (data: Storage) => void;
    title?: string;
    isRequire?: any;
    disabled?: boolean;
    className?: string;
    fieldName: any;
    url: any;
    isShowModal: boolean;
    oncancel: () => void;
}

const UploadReportFile = (props: IProps) => {
    const {isRequire, fieldName, url, isShowModal, oncancel, title} = props;
    const [reportFile, setReportFile] = useState<any>([]);
    const handleUpload = useCallback((event: any) => {
        event.stopPropagation();
        event.preventDefault();
        // console.log('event', ...event?.target?.files);
        const file_: any = event?.target?.files;
        const files: any = [];
        for (let i = 0; i < file_.length; i++) {
            files.push(file_[i]);
        }

        const file = file_.length === 1 ? file_[0] : files;
        setReportFile(file);
        if (!file) return;
    }, []);

    const handleSubmit = () => {
        uploadChunk(reportFile, url, fieldName);
        oncancel();
    };
    return (
        <>
            <Modal
                visible={isShowModal}
                onCancel={oncancel}
                onOk={handleSubmit}
            >
                {' '}
                <div className="text-lg font-semibold">
                    {title || 'Tải lên file báo cáo của bạn'}
                </div>
                <div className="relative">
                    {' '}
                    <div className="absolute bottom-0 flex gap-3">
                        <FileAddOutlined
                            style={{
                                fontSize: '26px',
                                paddingRight: '10px',
                                paddingBottom: '2px',
                                borderRight: '1px solid #ccc',
                            }}
                        />
                        {reportFile.length > 1 || reportFile.name ? (
                            <div className="">
                                {reportFile[0]?.name && (
                                    <Tag color="success">
                                        {reportFile[0]?.name}
                                    </Tag>
                                )}
                                {reportFile[0]?.name && (
                                    <Tag color="success">
                                        {reportFile[1]?.name}
                                    </Tag>
                                )}
                                {reportFile?.name && (
                                    <Tag color="success">
                                        {reportFile?.name}
                                    </Tag>
                                )}
                            </div>
                        ) : (
                            <div>Chọn file của bạn</div>
                        )}
                    </div>
                    <div className="shadow-[inset_0_-1px_2px_rgba(0,0,0,0.6)] p-1 mt-5">
                        {' '}
                        <input
                            multiple
                            className="relative z-30 w-full opacity-0"
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
                </div>
            </Modal>
        </>
    );
};

export default UploadReportFile;
