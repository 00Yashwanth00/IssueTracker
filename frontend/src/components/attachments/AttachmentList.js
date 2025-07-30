import { useEffect } from 'react';
import { useAttachments } from '../../context/AttachmentContext';
import AttachmentItem from './AttachmentItem';
import UploadAttachment from './UploadAttachment';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

function AttachmentList({ issueId }) {
    const { 
        attachments, 
        loading, 
        error, 
        fetchAttachments 
    } = useAttachments();

    useEffect(() => {
        if (issueId) {
          fetchAttachments(issueId);
        }
    }, [issueId, fetchAttachments]);
    
    if (loading && !attachments.length) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="attachment-section">
            <h3>Attachments ({attachments.length})</h3>

            <div className="attachment-list">
                {attachments.map(
                    attachment => (
                        <AttachmentItem 
                            key={attachment._id} 
                            attachment={attachment} 
                            issueId={issueId}
                        />
                    )
                )}
            </div>
            <UploadAttachment issueId={issueId} />
        </div>
    );
}

export default AttachmentList;