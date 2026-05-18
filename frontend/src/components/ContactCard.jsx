import { Flag, Eye, EyeOff } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export const ContactCard = ({
  contact,
  onRead,
  onFlag,
  onView,
}) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getFlagColor = (flag) => {
    const colors = {
      important: 'text-red-600',
      followup: 'text-blue-600',
      resolved: 'text-green-600',
      default: 'text-gray-400',
    };
    return colors[flag] || colors.default;
  };

  return (
    <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${contact.seen ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1" onClick={onView}>
          <h3 className="font-semibold text-gray-900 text-sm">{contact.subject}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{contact.message}</p>
        </div>
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onRead()}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title={contact.seen ? 'Mark as unread' : 'Mark as read'}
          >
            {contact.seen ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button
            onClick={() => onFlag()}
            className={`p-1 transition-colors ${getFlagColor(contact.flag)}`}
            title="Toggle flag"
          >
            <Flag size={16} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <div className="flex gap-2 items-center">
          <span className={`px-2 py-1 rounded ${getPriorityColor(contact.priority)}`}>
            {contact.priority || 'medium'}
          </span>
          <span className="text-gray-500">{contact.email}</span>
        </div>
        <span className="text-gray-400">{formatDate(contact.createdAt)}</span>
      </div>
    </div>
  );
};
