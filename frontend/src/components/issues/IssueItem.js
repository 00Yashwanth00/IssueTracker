import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

function IssueItem({ issue }) {
    return (
        <div className="issue-card">
            <div className="issue-header">
                <Link to={`/issues/{issue._id}`}>
                    <h3>{issue.title}</h3>
                </Link>
                <div className="issue-meta">
                    <PriorityBadge prioriry={issue.priority} />
                    <StatusBadge status={issue.status} />
                </div>
            </div>

            <p className="issue-description">
                {issue.description.substring(0,100)}...
            </p>

            <div className="issue-footer">
                <span className="issue-type">{issue.type}</span>
                <span className="issue-date">
                    {formatDate(issue.createdAt)}
                </span>
            </div>
        </div>
    );
};

export default IssueItem;