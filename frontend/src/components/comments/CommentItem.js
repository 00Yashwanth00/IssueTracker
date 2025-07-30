import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../context/CommentContext';
import { formatDate } from '../../utils/helpers';

function CommentItem({ comment, issueId }) {
    const { user } = useAuth();
    const { editComment, removeComment } = useComments();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    
    const handleEdit = async () => {
        try {
          setIsEditing(false);
          await editComment(issueId, comment._id, editedText);
        } catch (err) {
          console.error('Failed to update comment:', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
          try {
            await removeComment(issueId, comment._id);
          } catch (err) {
            console.error('Failed to delete comment:', err);
          }
        }
    };

    const canModify = user?._id === comment.postedBy._id || user?.role === 'admin';

    return (
        <div className="comment-item">
            <div className="comment-header">
                <span className="comment-author">{comment.postedBy.username}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
            </div>

            {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="comment-actions">
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
            <p>{comment.text}</p>
            {canModify && (
                <div className="comment-actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                </div>
            )}
            </div>
            )}
        </div>
    );
 
}

export default CommentItem;