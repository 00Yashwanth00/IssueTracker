export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];
  
  export const STATUS_OPTIONS = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' }
  ];
  
  export const TYPE_OPTIONS = [
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'task', label: 'Task' }
  ];
  
  export const ROLE_OPTIONS = [
    { value: 'developer', label: 'Developer' },
    { value: 'qa', label: 'QA Engineer' },
    { value: 'admin', label: 'Administrator' }
  ];
  
  export const STATUS_COLORS = {
    open: '#4CAF50',
    'in-progress': '#2196F3',
    closed: '#9E9E9E'
  };
  
  export const PRIORITY_COLORS = {
    low: '#4CAF50',
    medium: '#FFC107',
    high: '#F44336'
  };
  
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me'
    },
    ISSUES: {
      BASE: '/issues',
      BY_ID: (id) => `/issues/${id}`
    },
    COMMENTS: {
      BASE: (issueId) => `/issues/${issueId}/comments`,
      BY_ID: (issueId, commentId) => `/issues/${issueId}/comments/${commentId}`
    },
    ATTACHMENTS: {
      BASE: (issueId) => `/issues/${issueId}/attachments`,
      BY_ID: (issueId, attachmentId) => `/issues/${issueId}/attachments/${attachmentId}`
    }
  };