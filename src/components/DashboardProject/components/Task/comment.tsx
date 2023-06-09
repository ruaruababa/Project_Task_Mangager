import {CommentOutlined, DeleteOutlined, EditOutlined, EnterOutlined} from '@ant-design/icons';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Button, Modal, Tooltip, notification} from "antd";
import {useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import useProfile from "../../../../hooks/useProfile";
import {createComment, deleteComment, editComment, getCommentReplies, getComments} from '../../../../services/tasks';
import {convertDateTime} from '../../../../utils/format';
import {Mention} from '@ckeditor/ckeditor5-mention';
import {getUsersInProject} from '../../../../services/project';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import BlockquotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';
import CKFinderPlugin from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import {baseURL} from '../../../../utils/service';
import {getAccessToken} from '../../../../utils/auth';
import {MyUploadAdapter} from '../../../../utils/upload-adapter';

const avatarUrl = 'avatar.jpg';

function MentionCustomization(editor: any) {
    // The upcast converter will convert view <a class="mention" href="" data-user-id="">
    // elements to the model 'mention' text attribute.
    editor.conversion.for('upcast').elementToAttribute({
        view: {
            name: 'a',
            key: 'data-mention',
            classes: 'mention',
            attributes: {
                href: true,
                'data-user-id': true
            }
        },
        model: {
            key: 'mention',
            value: (viewItem: any) => {
                // The mention feature expects that the mention attribute value
                // in the model is a plain object with a set of additional attributes.
                // In order to create a proper object use the toMentionAttribute() helper method:
                const mentionAttribute = editor.plugins.get('Mention').toMentionAttribute(viewItem, {
                    // Add any other properties that you need.
                    link: viewItem.getAttribute('href'),
                    userId: viewItem.getAttribute('data-user-id')
                });

                return mentionAttribute;
            }
        },
        converterPriority: 'high'
    });

    // Downcast the model 'mention' text attribute to a view <a> element.
    editor.conversion.for('downcast').attributeToElement({
        model: 'mention',
        view: (modelAttributeValue: any, {writer}: any) => {
            // Do not convert empty attributes (lack of value means no mention).
            if (!modelAttributeValue) {
                return;
            }

            return writer.createAttributeElement('a', {
                class: 'mention',
                'data-mention': modelAttributeValue.id,
                'data-user-id': modelAttributeValue.userId,
                'href': modelAttributeValue.link
            }, {
                // Make mention attribute to be wrapped by other attribute elements.
                priority: 20,
                // Prevent merging mentions together.
                id: modelAttributeValue.uid
            });
        },
        converterPriority: 'high'
    });
}

const CommentEditor = ({data, onCancel, onSuccess, parentId}:
    {data?: {content: string; id: number;}; onCancel?: Function; onSuccess?: Function; parentId?: number;}) => {
    const {id, taskId} = useParams();
    const [changed, setChanged] = useState(false);
    const [contentIsEmpty, setContentIsEmpty] = useState(true);
    const [editor, setEditor] = useState<any>(null);
    const {userProfile} = useProfile();

    const {data: usersInProjectResponse} = useQuery({
        queryKey: ['getUsersInProject', id],
        queryFn: () => getUsersInProject(id),
    });
    const createMutation = useMutation({
        mutationFn: async (data: {content: string; comment_id?: number;}) => createComment(taskId, data),
        mutationKey: ['createComment', taskId],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Tạo bình luận thành công',
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

    const usersInProjectList = useMemo(() => {
        return usersInProjectResponse?.data?.data?.map((u: any) => ({...u, id: `${u.value}`, text: u.label})) ?? [];
    }, [usersInProjectResponse]);

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            editor?.setData('');
            setChanged(false);
            setContentIsEmpty(true);
        }
    };
    const handleSave = () => {
        actionCommentMutate({content: editor?.getData() ?? '', comment_id: parentId});
    };
    const handleChange = (_: any, editor: any) => {
        setChanged(true);
        setContentIsEmpty(!editor.getData());
    };

    return (
        <div className="flex w-full">
            <img
                src={userProfile?.avatar || avatarUrl}
                alt={userProfile?.name}
                className="w-10 h-10 rounded-full cursor-pointer"
            />

            <div className='flex flex-col items-end ml-4 grow'>
                <div className='w-full'>
                    <CKEditor
                        editor={Editor as any}
                        onReady={(editor) => {
                            setEditor(editor);
                            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => new MyUploadAdapter(loader);
                        }}
                        onChange={handleChange}
                        config={{
                            mention: {
                                feeds: [{
                                    marker: '@',
                                    feed: usersInProjectList,
                                    itemRenderer: (item: any) => {
                                        const itemElement = document.createElement('div');

                                        itemElement.classList.add('custom-item');
                                        // itemElement.id = `mention-list-item-id-${item.value}`;
                                        itemElement.textContent = `${item.label} `;

                                        const usernameElement = document.createElement('span');

                                        usernameElement.classList.add('custom-item-username');
                                        usernameElement.textContent = item.email;

                                        itemElement.appendChild(usernameElement);

                                        return itemElement;
                                    }
                                }],
                            },
                        }}
                        data={data?.content}
                    />
                </div>

                <div className="mt-2 mb-4">
                    <Button onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSave}
                        loading={isLoading}
                        disabled={!changed || contentIsEmpty}
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

const CommentItem = (
    {
        onReply, onEdit, onCancelEdit, onEditSuccess, onDelete,
        item, isReplying, isEditing
    }:
        {
            item: any, onReply: (_: number) => void, onEdit: (_: boolean) => void; onCancelEdit: () => void; onEditSuccess: (_: boolean) => void; onDelete: () => void;
            isReplying: boolean; isEditing: boolean;
        }) => {

    const [shouldFetchInRoot, setShouldFetchInRoot] = useState(false);
    const [confirmDeleteCommentId, setConfirmDeleteCommentId] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowReplies, setIsShowReplies] = useState(false);

    const {data: commentRepliesResponse, refetch} = useQuery({
        queryKey: ['getCommentReplies', item.id],
        queryFn: () => getCommentReplies(item.id),
        enabled: isShowReplies
    });
    const {mutate: deleteCommentMutate} = useMutation({
        mutationKey: ['deleteComment', item?.id],
        mutationFn: (commentId: any) => deleteComment(commentId),
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Xóa bình luận thành công',
            });
            if (shouldFetchInRoot) {
                onDelete?.();
            } else {
                refetch();
            }
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const commentRepliesList = useMemo(() => {
        return commentRepliesResponse?.data?.data ?? [];
    }, [commentRepliesResponse]);

    const handleClickDelete = (commentId: number, isRootComment: boolean) => {
        setConfirmDeleteCommentId(commentId);
        setIsModalOpen(true);
        setShouldFetchInRoot(isRootComment);
    };
    const handleEditSuccess = (shouldRefetch = false) => {
        onEditSuccess(!shouldRefetch);
        if (shouldRefetch) {
            refetch();
        }
    };
    const handleOk = () => {
        deleteCommentMutate(confirmDeleteCommentId);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setConfirmDeleteCommentId(-1);
        setIsModalOpen(false);
    };

    return (
        <div className='flex'>
            {/* edit comment */}
            {isEditing &&
                <CommentEditor onCancel={onCancelEdit} onSuccess={() => handleEditSuccess()} data={item} />
            }

            {!isEditing &&
                <>
                    <img
                        src={item.user.avatar}
                        alt={'User'}
                        className="w-10 h-10 rounded-full cursor-pointer"
                    />

                    {/* Content of comment */}
                    <div className='ml-4 grow text-sm'>
                        <div className='relative w-full p-2 border border-solid border-gray-300 rounded-md'>
                            <div className='mb-2'>{item.user.name}
                                <span className='ml-2 underline text-xs text-gray-500'>commented at {convertDateTime(item.created_at)}</span>
                            </div>

                            <div dangerouslySetInnerHTML={{__html: item.content}}></div>

                            <div className="absolute right-1 top-1">
                                <Tooltip title="Bình luận">
                                    <Button onClick={() => setIsShowReplies(true)} icon={<CommentOutlined />} type='text' size='small' />
                                </Tooltip>

                                <Tooltip title="Trả lời" className='ml-1'>
                                    <Button onClick={() => onReply(item.id)} icon={<EnterOutlined />} type='text' size='small' />
                                </Tooltip>

                                {item.is_editable &&
                                    <>
                                        <Tooltip title="Chỉnh sửa" className='ml-1'>
                                            <Button onClick={() => onEdit(item.id)} icon={<EditOutlined />} type='text' size='small' />
                                        </Tooltip>
                                        <Tooltip title="Xóa" color='red' className='ml-1'>
                                            <Button onClick={() => handleClickDelete(item.id, true)} icon={<DeleteOutlined />} type='text' size='small' danger />
                                            <Modal title="Xóa bình luận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                <p>Bạn có chắc chắn muốn xóa bình luận này chứ?</p>
                                            </Modal>
                                        </Tooltip>
                                    </>
                                }
                            </div>
                        </div>

                        {/* Replies */}
                        {commentRepliesList.length > 0 &&
                            <div className='mb-6'>
                                {
                                    commentRepliesList.map((reply: any, idx: number) =>
                                        <div key={idx} className='flex mt-2'>
                                            <img
                                                src={reply.user.avatar}
                                                alt={'User'}
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                            />
                                            <div className='ml-4 grow text-sm'>
                                                <div className='relative w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                    <div className='mb-2'>{reply.user.name}
                                                        <span className='ml-2 underline text-xs text-gray-500'>commented at {convertDateTime(reply.created_at)}</span>
                                                    </div>

                                                    <div dangerouslySetInnerHTML={{__html: reply.content}}></div>

                                                    <div className="absolute right-1 top-1">
                                                        <Tooltip title="Trả lời" className='ml-1'>
                                                            <Button onClick={() => onReply(item.id)} icon={<EnterOutlined />} type='text' size='small' />
                                                        </Tooltip>

                                                        {reply.is_editable &&
                                                            <>
                                                                <Tooltip title="Chỉnh sửa" className='ml-1'>
                                                                    <Button onClick={() => onEdit(reply.id)} icon={<EditOutlined />} type='text' size='small' />
                                                                </Tooltip>
                                                                <Tooltip title="Xóa" color='red' className='ml-1'>
                                                                    <Button onClick={() => handleClickDelete(reply.id, false)} icon={<DeleteOutlined />} type='text' size='small' danger />
                                                                    <Modal title="Xóa bình luận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                                        <p>Bạn có chắc chắn muốn xóa bình luận này chứ?</p>
                                                                    </Modal>
                                                                </Tooltip>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        }

                        {/* Reply editor */}
                        {isReplying &&
                            <div className='mt-2'>
                                <CommentEditor onCancel={onCancelEdit} onSuccess={() => handleEditSuccess(true)} parentId={item.id} />
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
};

const CommentsList = ({data, onSuccess, onDelete}: {data: any[]; onSuccess: (_: boolean) => void, onDelete: () => void;}) => {
    const [editCommentId, setEditCommentId] = useState(-1);
    const [replyCommentId, setReplyCommentId] = useState(-1);

    const handleCancelEdit = () => {
        setEditCommentId(-1);
        setReplyCommentId(-1);
    };
    const handleClickEdit = (id: any) => {
        setEditCommentId(id);
        setReplyCommentId(-1);
    };
    const handleClickReply = (id: any) => {
        setEditCommentId(-1);
        setReplyCommentId(id);
    };
    const handleSuccess = (shouldRefetch: boolean) => {
        setEditCommentId(-1);
        setReplyCommentId(-1);
        onSuccess(shouldRefetch);
    };

    return (
        <>
            {
                data.map((item: any, idx: number) =>
                    <div key={idx} className='mt-4'>
                        <CommentItem item={item} onReply={handleClickReply} onEdit={handleClickEdit} onCancelEdit={handleCancelEdit} onEditSuccess={handleSuccess} onDelete={onDelete}
                            isReplying={replyCommentId === item.id} isEditing={editCommentId === item.id} />
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

    const handleSuccess = (shouldRefetch: boolean) => {
        if (shouldRefetch) {
            refetch();
        }
    };

    return (
        <div>
            <CommentEditor onSuccess={refetch} />

            <div className='h-px my-2 bg-gray-200'></div>

            <CommentsList data={commentsList ?? []} onSuccess={handleSuccess} onDelete={refetch} />
        </div>
    );
};

export default Comment;
