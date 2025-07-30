import { useEffect } from 'react';
import { useComments } from '../../context/CommentContext';
import CommentItem from './CommentItem';
import AddComment from './AddComment';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';


function CommentList({ issueId }) {
    const { 
        comments, 
        loading, 
        error, 
        fetchComments 
    } = useComments();

    useEffect(() => {
        if (issueId) {
          fetchComments(issueId);
        }
    }, [issueId, fetchComments]);

    if (loading && !comments.length) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="comment-section">
            <h3>Comments ({comments.length})</h3>

            <div className="comment-list">
                {comments.map(comment => (
                    <CommentItem 
                        key={comment._id}
                        comment={comment}
                        issueId={issueId}
                    />
                ))}
            </div>

            <AddComment issueId={issueId} />
        </div>
    );
}

export default CommentList;