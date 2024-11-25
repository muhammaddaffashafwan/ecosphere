import PropTypes from 'prop-types';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        {/* Close button */}
        <span className="text-gray-600 cursor-pointer float-right" onClick={onClose}>&times;</span>

        {/* User Avatar */}
        <div className="flex items-center mb-4">
          <img 
            className="w-10 h-10 rounded-full mr-3" 
            src="https://i.pravatar.cc/150?img=5" 
            alt="User Avatar" 
          />
          <span className="font-semibold">User Name</span>
        </div>

        {/* Comment Section */}
        <div className="flex flex-col">
          <textarea 
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full resize-none" 
            placeholder="Add comment..."
          ></textarea>
          <button 
            className="bg-green-600 text-white rounded-full px-6 py-3 mt-2"
          >
            ADD COMMENT
          </button>
        </div>
      </div>
    </div>
  );
};

// Adding prop validation
Modal.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose must be a function and is required
};

export default Modal;
