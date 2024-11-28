import PropTypes from "prop-types";

const Modal = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg'>
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
            src='/images/forum1/muhammad sumbul.png'
            alt='User Avatar'
          />
          <span className='font-semibold text-lg'>User Name</span>
        </div>

        {/* Comment Section */}
        <div className='flex flex-col space-y-4'>
          <textarea
            className='w-full border border-gray-300 rounded-lg p-2'
            placeholder='Add your comment...'
          ></textarea>

          <button className='ml-[300px] py-2 rounded-full shadow-md bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all text-center text-[13px]'>
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
