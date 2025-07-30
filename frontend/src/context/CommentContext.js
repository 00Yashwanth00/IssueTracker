import { createContext, useState, useContext, useCallback } from 'react';
import { 
  getComments as apiGetComments,
  addComment as apiAddComment,
  updateComment as apiUpdateComment,
  deleteComment as apiDeleteComment
} from '../services/commentService';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchComments = useCallback(async (issueId) => {
        try {
          setLoading(true);
          const data = await apiGetComments(issueId);
          setComments(data);
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    }, []);

    const createComment = useCallback(async (issueId, text) => {
        try {
          setLoading(true);
          const newComment = await apiAddComment(issueId, text);
          setComments(prev => [...prev, newComment]);
          setError(null);
          return newComment;
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
      }, []);

    const editComment = useCallback(async (issueId, commentId, text) => {
        try {
          setLoading(true);
          const updatedComment = await apiUpdateComment(issueId, commentId, text);
          setComments(prev => 
            prev.map(comment => 
              comment._id === commentId ? updatedComment : comment
            )
          );
          setError(null);
          return updatedComment;
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
    }, []);

    const removeComment = useCallback(async (issueId, commentId) => {
        try {
          setLoading(true);
          await apiDeleteComment(issueId, commentId);
          setComments(prev => prev.filter(comment => comment._id !== commentId));
          setError(null);
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
    }, []);

    return (
        <CommentContext.Provider
          value={{
            comments,
            loading,
            error,
            fetchComments,
            createComment,
            editComment,
            removeComment
          }}
        >
          {children}
        </CommentContext.Provider>
    );
};

export const useComments = () => {
    const context = useContext(CommentContext);
    if (!context) {
      throw new Error('useComments must be used within a CommentProvider');
    }
    return context;
};