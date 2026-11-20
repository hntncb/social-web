import { useEffect, useState } from 'react';
import { useGetPostComment } from '../../comments/hooks/useGetPostComment';
import { useParams } from 'react-router-dom';
import { CommentItem } from './CommentItem';
import { CreateCommentForm } from './CreateCommentForm';

export const CommentForm = () => {
  const [comment, setComment] = useState([]);
  const [onNewItem, setNewItem] = useState(0);
  const [listReply, setlistReply] = useState({});
  const { handleGetPostComment, loading, error } = useGetPostComment();

  const hasNewItem = () => {
    setNewItem((onNewItem) => onNewItem + 1);
  };

  const getComment = async () => {
    const response = await handleGetPostComment(PostId);
    setComment(response);
    const reply = response.reduce((acc, item) => {
      if (item?.parent_id) {
        if (!acc[item.parent_id]) {
          acc[item.parent_id] = [];
        }
        acc[item.parent_id].push(item);
      }

      return acc;
    }, {});
    setlistReply(reply);
  };

  const renderComment = (item) => {
    return (
      <div key={item.id} className="ml-6 border-l">
        <CommentItem item={item} hasNewItem={hasNewItem} />

        {listReply[item.id]?.map((reply) => renderComment(reply))}
      </div>
    );
  };

  const { PostId } = useParams();

  useEffect(() => {
    getComment();
  }, [PostId, onNewItem]);

  return (
    <main>
      <div className="flex w-full flex-col items-center gap-3">
        <CreateCommentForm hasNewItem={hasNewItem} />
        {comment
          .filter((item) => item.parent_id === null)
          .map((item, index) => (
            <article
              key={item.id || index}
              className="flex w-full max-w-xl flex-col gap-2 rounded-md border border-b-black bg-red-100 p-4"
            >
              <CommentItem item={item} hasNewItem={hasNewItem} />

              {listReply[item.id]?.map((reply) => renderComment(reply))}
            </article>
          ))}
      </div>
    </main>
  );
};
