import PropTypes from 'prop-types';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <span className="text-gray-600 cursor-pointer float-right" onClick={onClose}>&times;</span>
        <div className="flex flex-col">
          <textarea className="border border-gray-300 rounded-lg p-2 mb-4" placeholder="Add comment..."></textarea>
          <button className="bg-green-600 text-white rounded-full px-4 py-2">ADD COMMENT</button>
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