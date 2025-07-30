import { useAuth } from '../../context/AuthContext';
import { useAttachments } from '../../context/AttachmentContext';
import { formatDate } from '../../utils/helpers';

function AttachmentItem({ attachment, issueId }) {
    const { user } = useAuth();
    const { removeAttachment } = useAttachments();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this attachment?')) {
          try {
            await removeAttachment(issueId, attachment._id);
          } catch (err) {
            console.error('Failed to delete attachment:', err);
          }
        }
    };

    const canDelete = user?._id === attachment.uploadedBy._id || user?.role === 'admin';

    return (
        <div className="attachment-item">
            <div className="attachment-info">
                <a 
                href={`http://localhost:5000/uploads/${attachment.filename}`} 
                target="_blank" 
                rel="noopener noreferrer"
                >
                {attachment.filename}
                </a>
                <span className="attachment-meta">
                Uploaded by {attachment.uploadedBy.username} on {formatDate(attachment.uploadedAt)}
                </span>
            </div>
            {canDelete && (
                <button onClick={handleDelete} className="delete-button">
                Delete
                </button>
            )}
        </div>
    );
}

export default AttachmentItem;