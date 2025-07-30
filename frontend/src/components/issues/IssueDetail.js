import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssues } from '../../context/IssueContext';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';
import CommentSection from '../comments/CommentSection';
import AttachmentSection from '../attachments/AttachmentSection';
import IssueActions from './IssueActions';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/helpers';

function IssueDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        currentIssue,
        loading,
        error,
        getIssue,
        deleteIssue
    } = useIssues();

    useEffect(() => {
        if(id) {
            getIssue(id);
        }
    }, [id, getIssue]);

    const handleDelete = async () => {
        if(window.confirm('Are you sure want to delete this issue?')) {
            await deleteIssue(id);
            navigate('/issues');
        }
    };

    if(loading && !currentIssue) return <LoadingSpinner />;
    if(error) return <ErrorMessage message={error} />;
    if(!currentIssue) return <div>Issue not found</div>

    return (
        <div className="issue-detail">
            <div className="issue-header">
                <h2>{currentIssue.title}</h2>
                <IssueActions 
                    issue={currentIssue}
                    onDelete={handleDelete}
                />
            </div>

            <div className="issue-meta">
                <span>Created: {formatDate(currentIssue.createdAt)}</span>
                <PriorityBadge priority={currentIssue.priority} />
                <StatusBadge status={currentIssue.status} />
                <span>Type: {currentIssue.type}</span>
            </div>

            <div className="issue-content">
                <p>{currentIssue.description}</p>
            </div>

            <AttachmentSection issueId={currentIssue._id} />
            <CommentSection issueId={currentIssue._id} />
        </div>
    );
};

export default IssueDetail;