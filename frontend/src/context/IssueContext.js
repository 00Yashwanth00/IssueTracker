import { createContext, useContext, useState, useCallback } from 'react';
import {
    getIssues as apiGetIssues,
    getIssueById as apiGetIssueById,
    createIssue as apiCreateIssue,
    updateIssue as apiUpdateIssue,
    deleteIssue as apiDeleteIssue
} from '../services/issueService';

const IssueContext = createContext();

export const IssueProvider = async ({ children }) => {
    const [issues, setIssues] = useState([]);
    const [currentIssue, setCurrentIssue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //fetch all issues
    const fetchIssues = useCallback(async (filter = {}) => {
        try {
            setLoading(true);
            const data = await apiGetIssues(filter);
            setIssues(data);
            setError(null);
        } catch(err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const getIssue = useCallback(async (id) => {
        try {
            setLoading(true);
            const data = await apiGetIssueById(id);
            setCurrentIssue(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createIssue = useCallback(async (issueData) => {
        try {
            setLoading(true);
            const newIssue = await apiCreateIssue(issueData);
            setError(null);
            setIssues(prev => [newIssue, ...prev]);
            return newIssue
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateIssue = useCallback(async (id, updates) => {
        try {
            setLoading(true);
            const updatedIssue = await apiUpdateIssue(id, updates);
            setIssues(prev => prev.map(
                issue => (issue._id === id) ? updateIssue : issue
            ));
            if(currentIssue._id === id) {
                setCurrentIssue(updateIssue);
            }
            setError(null);
            return updatedIssue;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentIssue]);

    const deleteIssue = useCallback(async (id) => {
        try {
            setLoading(true);
            await apiDeleteIssue(id);
            setIssues(prev => prev.filter(
                issue => issue._id !== id
            ));
            if (currentIssue?._id === id) {
                setCurrentIssue(null);
              }
            setError(null);
        } catch(err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentIssue]);

     // Clear current issue
    const clearCurrentIssue = useCallback(() => {
        setCurrentIssue(null);
    }, []);

    return (
        <IssueContext.Provider
          value={{
            issues,
            currentIssue,
            loading,
            error,
            fetchIssues,
            getIssue,
            createIssue,
            updateIssue,
            deleteIssue,
            clearCurrentIssue
          }}
        >
          {children}
        </IssueContext.Provider>
      );
};

export const useIssues = () => {
    const context = useContext(IssueContext);
    if (!context) {
      throw new Error('useIssues must be used within an IssueProvider');
    }
    return context;
  };