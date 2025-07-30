import { useState, useEffect } from 'react';
import { useIssues } from '../../context/IssueContext';

function IssueFilters() {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    type: ''
  });
  const { fetchIssues } = useIssues();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIssues(filters);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters, fetchIssues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="issue-filters">
      <select 
        name="status" 
        value={filters.status} 
        onChange={handleChange}
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select 
        name="priority" 
        value={filters.priority} 
        onChange={handleChange}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select 
        name="type" 
        value={filters.type} 
        onChange={handleChange}
      >
        <option value="">All Types</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
        <option value="task">Task</option>
      </select>
    </div>
  );
}

export default IssueFilters;