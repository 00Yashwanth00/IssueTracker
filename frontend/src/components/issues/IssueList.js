import { useEffect } from 'react';
import { useIssues } from '../../context/IssueContext';
import IssueItem from './IssueItem';
import IssueFilters from './IssueFilters';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

function IssueList() {
    const { 
        issues,
        loading,
        error,
        fetchIssues
    } = useIssues();

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    if(loading && !issues.length) return <LoadingSpinner />
    if(error) return <ErrorMessage message={error} />;

    return (
        <div className="issue-list">
            <IssueFilters />

            <div className="issue-grid">
                {issues.map(issue => (
                    <IssueItem key={issue._id} issue={issue} />
                ))}
            </div>

            {loading && issues.length > 0 && (
                <div className="loading-more">
                    <LoadingSpinner small />
                </div>
            )}
        </div>
    );
};

export default IssueList;