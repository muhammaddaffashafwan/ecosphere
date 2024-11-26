import PropTypes from "prop-types";

const Modal = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg'>
        {/* Close button */}
        <span
          className='text-gray-600 cursor-pointer float-right text-3xl hover:text-gray-800'
          onClick={onClose}
        >
          &times;
        </span>

        {/* User Avatar */}
        <div className='flex items-center mb-6'>
          <img
            className='w-12 h-12 rounded-full mr-3'
            src='https://i.pravatar.cc/150?img=5'
            alt='User Avatar'
          />
          <span className='font-semibold text-lg'>User Name</span>
        </div>

        {/* Comment Section */}
        <div className='flex flex-col space-y-4'>
          <textarea
            className='border border-gray-300 rounded-lg p-4 w-full resize-none h-32'
            placeholder='Add your comment...'
          ></textarea>

          <button className='px-2 py-3 bg-[#739646] text-white rounded-full hover:bg-[#6d9b5d] text-center'>
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
