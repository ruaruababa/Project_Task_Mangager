import {Modal} from 'antd';

const ModalConfirm = ({isOpen, hideModal, handleConfirm}: any) => {
    return (
        <>
            <Modal
                visible={isOpen}
                onCancel={hideModal} 
                title="Thêm danh mục phân quyền"
                footer={[]}
                width={1000}
            >
                <p>Sau khi xóa sẽ k thể khôi phục lại.</p>
            </Modal>
            ;
        </>
    );
};

export default ModalConfirm;
