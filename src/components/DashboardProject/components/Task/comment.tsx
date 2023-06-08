import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Button, notification, Modal, Tooltip} from "antd";
import {useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import useProfile from "../../../../hooks/useProfile";
import {createComment, editComment, getComments} from '../../../../services/tasks';
import {baseURL} from '../../../../utils/service';
import {DeleteOutlined, EditOutlined, EnterOutlined} from '@ant-design/icons';
import {convertDateTime} from '../../../../utils/format';

const avatarUrl = 'avatar.jpg';

const CommentEditor = ({data, onCancel, onSuccess}:
    {data?: {content: string; id: number;}; onCancel?: Function; onSuccess?: Function;}) => {
    const {taskId} = useParams();
    const [changed, setChanged] = useState(false);
    const [editor, setEditor] = useState<ClassicEditor | null>(null);
    const {userProfile} = useProfile();

    console.log(data);

    const createMutation = useMutation({
        mutationFn: async (data: {content: string; comment_id?: number;}) => createComment(taskId, data),
        mutationKey: ['createComment', taskId],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Tạo bình luận thành công',
            });
            editor?.setData('');
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Đã có lỗi xảy ra',
            });
        },
    });
    const editMutation = useMutation({
        mutationFn: async (formData: {content: string; comment_id?: number;}) => editComment(data?.id, formData),
        mutationKey: ['editComment', data?.id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Chỉnh sửa bình luận thành công',
            });
            editor?.setData('');
            onSuccess?.();
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Đã có lỗi xảy ra',
            });
        },
    });


    const {mutate: actionCommentMutate, isLoading} = data ? editMutation : createMutation;

    const cancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            editor?.setData('');
            setChanged(false);
        }
    };

    const onSave = () => {
        actionCommentMutate({content: editor?.getData() ?? ''});
    };

    return (
        <div className="flex">
            <img
                src={userProfile?.avatar || avatarUrl}
                alt={userProfile?.name}
                className="w-10 h-10 rounded-full cursor-pointer"
            />

            <div className='flex flex-col items-end ml-4 grow'>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        onReady={(editor) => {
                            setEditor(editor);
                            // editor.editing.view.change(writer => writer.setStyle('width', '100%', editor.editing.view.document.getRoot()!));
                            // (window as any).editor = editor;
                        }}
                        onChange={() => setChanged(true)}
                        config={{
                            simpleUpload: {
                                uploadUrl: baseURL + '/api/upload-file'
                            },
                        }}
                        data={data?.content}
                    />
                </div>

                <div className="mt-2">
                    <Button onClick={cancel}>
                        Hủy
                    </Button>
                    <Button
                        onClick={onSave}
                        loading={isLoading}
                        disabled={!changed}
                        type='primary'
                        className="ml-1"
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CommentsList = ({data, onSuccess}: {data: any[]; onSuccess: Function;}) => {
    const [editCommentId, setEditCommentId] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {userProfile} = useProfile();

    const onClickEdit = (id: any) => setEditCommentId(id);
    const onClickDelete = (id: any) => setIsModalOpen(true);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSuccess = () => {
        setEditCommentId(-1);   
        onSuccess();
    };

    return (
        <>
            {
                data.map((item: any, idx: number) =>
                    <div key={idx} className='mt-2 flex'>
                        {/* edit comment */}
                        {editCommentId === item.id &&
                            <CommentEditor onCancel={() => setEditCommentId(-1)} onSuccess={handleSuccess} data={item} />
                        }

                        {/* button edit and delete */}
                        {editCommentId !== item.id &&
                            <>
                                <img
                                    src={item.user.avatar}
                                    alt={'User'}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />

                                <div className='relative grow ml-4 p-2 border border-solid border-gray-300 rounded-md text-base'>
                                    <div className='mb-2'>{item.user.name}
                                        <span className='ml-2 underline text-xs text-gray-500'>commented at {convertDateTime(item.created_at)}</span>
                                    </div>

                                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>

                                    <div className="absolute right-1 top-1">
                                        <Tooltip title="Trả lời">
                                            <Button onClick={() => onClickEdit(item.id)} icon={<EnterOutlined />} type='text' size='small' />
                                        </Tooltip>

                                        {item.user_id === userProfile.id &&
                                            <>
                                                <Tooltip title="Chỉnh sửa" className='ml-1'>
                                                    <Button onClick={() => onClickEdit(item.id)} icon={<EditOutlined />} type='text' size='small' />
                                                </Tooltip>
                                                <Tooltip title="Xóa" color='red' className='ml-1'>
                                                    <Button onClick={() => onClickDelete(item.id)} icon={<DeleteOutlined />} type='text' size='small' danger />
                                                    <Modal title="Xóa bình luận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                        <p>Bạn có chắc chắn muốn xóa bình luận này chứ?</p>
                                                    </Modal>
                                                </Tooltip>
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                )
            }
        </>
    );
};

const Comment = () => {
    const {taskId} = useParams();
    const {data: commentsResponse, refetch} = useQuery({
        queryKey: ['getComments', taskId],
        queryFn: () => getComments(taskId),
    });
    const commentsList = useMemo(() => {
        return commentsResponse?.data?.data ?? [];
    }, [commentsResponse]);

    return (
        <div>
            <CommentEditor onSuccess={refetch} />

            <div className='h-px my-2 bg-gray-200'></div>

            <CommentsList data={commentsList ?? []} onSuccess={refetch} />
        </div>
    );
};

export default Comment;
