import { PRIORITY_COLORS } from "../../utils/constants";

function PriorityBadge({ priority }) {
    const priorityMap = {
        low: { text: 'Low', color: PRIORITY_COLORS.low },
        medium: { text: 'Medium', color: PRIORITY_COLORS.medium },
        high: { text: 'High', color: PRIORITY_COLORS.high }
    };

    const priorityInfo = priorityMap[priority] || { text: priority, color: '#9E9E9E' };

    return (
        <span className="priority-badge" style={{ backgroundCOlor: priorityInfo.color }}>
            {priorityInfo.text}
        </span>
    );
};

export default PriorityBadge;