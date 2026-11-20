import { Button } from '@/shared/components/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatePostComment } from '../hooks/useCreatePostComment';
import { useEditPostComment } from '../hooks/useEditPostComment';
import { toast, ToastContainer } from 'react-toastify';

export const CommentItem = ({ item, hasNewItem }) => {
  const [onShow, setOnShow] = useState(null);
  const { handleCreatePostComment, loading } = useCreatePostComment();
  const { handleEditPostComment } = useEditPostComment();

  const { PostId } = useParams();

  const Reply = async (e, id) => {
    e.preventDefault();
    const parent_id = id;
    const form = e.currentTarget;
    const content = form.elements.namedItem('reply').value;
    const post_id = PostId;
    if (content.trim() === '') {
      toast.warning('Hãy nhập nội dung');
      return;
    }
    const response = await handleCreatePostComment({ post_id, parent_id, content });
    if (response.status === 201) {
      toast.success('Đã phản hồi');
      hasNewItem();
      form.reset();
    } else {
      toast.error('Có lỗi xảy ra');
    }
  };

  const EditComment = async (e, id) => {
    e.preventDefault();
    const form = e.currentTarget;
    const content = form.elements.namedItem('edit').value;
    if (content.trim() === '') {
      toast.warning('Hãy nhập nội dung');
      return;
    }
    const response = await handleEditPostComment({ id, content });
    if (response.status === 200) {
      toast.success('Đã sửa');
      hasNewItem();
      form.reset();
    } else {
      toast.error('Có lỗi xảy ra');
    }
  };

  return (
    <main className="flex flex-col gap-0.5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="grid grid-cols-2 border border-b-black p-2">
        <b>{item.user_name}</b>
        <p className="flex justify-end">{item.created_at}</p>
        <p className="whitespace-pre-wrap">{item.content}</p>
      </div>
      <div className="flex gap-3 p-1">
        <Button className="bg-auto" onClick={() => setOnShow('reply')}>
          Phản hồi
        </Button>
        {localStorage.getItem('current_id') === item.user_id && (
          <Button className="bg-auto" onClick={() => setOnShow('edit')}>
            Sửa
          </Button>
        )}
      </div>

      {onShow !== null && (
        <form
          className="flex gap-2 p-2"
          onSubmit={(e) => {
            if (onShow === 'reply') {
              Reply(e, item.id);
            }
            if (onShow === 'edit') {
              EditComment(e, item.id);
            }
          }}
        >
          <textarea
            className="bg-amber-50"
            rows="1"
            type="text"
            name={onShow}
            placeholder={onShow === 'reply' ? 'Nội dung phản hồi' : 'Nội dung chỉnh sửa'}
          >
            {' '}
          </textarea>
          <Button type="submit" disabled={loading}>
            Gửi
          </Button>
        </form>
      )}
    </main>
  );
};
