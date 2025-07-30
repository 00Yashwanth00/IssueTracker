import { STATUS_COLORS } from "../../utils/constants";

function StatusBadge({ status }) {
    const statusMap = {
        open: { text: 'Open', color: STATUS_COLORS.open },
        'in-progress': { text: 'In Progress', color: STATUS_COLORS['in-progress'] },
        closed: { text: 'Closed', color: STATUS_COLORS.closed }
    };

    const statusInfo = statusMap[status] || { text: status, color: '#9E9E9E' };

    return (
        <span className="status-badge" style={{ backgroundColor: statusInfo.color }}>
            {statusInfo.text}
        </span>
    );
}

export default StatusBadge;