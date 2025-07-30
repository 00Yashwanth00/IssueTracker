import { createContext, useState, useContext, useCallback } from 'react';
import { 
  getAttachments as apiGetAttachments,
  uploadAttachment as apiUploadAttachment,
  deleteAttachment as apiDeleteAttachment
} from '../services/attachmentService';

const AttachmentContext = createContext();

export const AttachmentProvider = ({ children }) => {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAttachments = useCallback(async (issueId) => {
        try {
          setLoading(true);
          const data = await apiGetAttachments(issueId);
          setAttachments(data);
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    }, []);

    const addAttachment = useCallback(async (issueId, file) => {
        try {
          setLoading(true);
          const newAttachment = await apiUploadAttachment(issueId, file);
          setAttachments(prev => [...prev, newAttachment]);
          setError(null);
          return newAttachment;
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
    }, []);

    const removeAttachment = useCallback(async (issueId, attachmentId) => {
        try {
          setLoading(true);
          await apiDeleteAttachment(issueId, attachmentId);
          setAttachments(prev => 
            prev.filter(attachment => attachment._id !== attachmentId)
          );
          setError(null);
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
    }, []);

    return (
        <AttachmentContext.Provider
          value={{
            attachments,
            loading,
            error,
            fetchAttachments,
            addAttachment,
            removeAttachment
          }}
        >
          {children}
        </AttachmentContext.Provider>
    );
};

export const useAttachments = () => {
    const context = useContext(AttachmentContext);
    if (!context) {
      throw new Error('useAttachments must be used within an AttachmentProvider');
    }
    return context;
};