import { useState } from 'react';
import { useIssues } from '../../context/IssueContext';
import { useNavigate } from 'react-router-dom';

function CreateIssueForm() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'bug',
        priority: 'medium'
    });
    
    const [errors, setErrors] = useState({});
    const { createIssue, loading } = useIssues();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        try {
        const newIssue = await createIssue(formData);
        navigate(`/issues/${newIssue._id}`);
        } catch (err) {
        // Error is handled in context
        }
    };

    return (
        <form onSubmit={handleSubmit} className="issue-form">
          <div className={`form-group ${errors.title ? 'error' : ''}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
    
          <div className={`form-group ${errors.description ? 'error' : ''}`}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              rows={5}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>
    
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="task">Task</option>
              </select>
            </div>
    
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
    
          <button type="submit" disabled={loading} className="primary-button">
            {loading ? 'Creating...' : 'Create Issue'}
          </button>
        </form>
    );
};

export default CreateIssueForm;