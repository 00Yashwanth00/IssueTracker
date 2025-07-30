import { useState } from 'react';
import { useAttachments } from '../../context/AttachmentContext';


function UploadAttachment({ issueId }) {
    const [file, setFile] = useState(null);
    const { addAttachment, loading } = useAttachments();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
        await addAttachment(issueId, file);
        setFile(null);
        // Clear file input
        e.target.reset();
        } catch (err) {
        console.error('Failed to upload attachment:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="upload-attachment">
          <div className="file-input">
            <input
              type="file"
              id="attachment"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
            />
            <label htmlFor="attachment">
              {file ? file.name : 'Choose a file...'}
            </label>
          </div>
          <button 
            type="submit" 
            disabled={loading || !file}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
    );
}