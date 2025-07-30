import { useState } from 'react';
import { useComments } from '../../context/CommentContext';

function AddComment({ issueId }) {
    const [text, setText] = useState('');
    const { createComment, loading } = useComments();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
    
        try {
          await createComment(issueId, text);
          setText('');
        } catch (err) {
          console.error('Failed to add comment:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-comment">
          <textarea
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !text.trim()}>
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
    );
}

export default AddComment;