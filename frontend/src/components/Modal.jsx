
const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-[40%] mx-[50%] bg-black p-4 rounded-lg z-10 text-right">
              <button
                className="text-white font-semibold hover:text-red-700 focus:outline-none mr-2"
                onClick={onClose}
              >
                <span class="material-symbols-outlined">close </span>
              </button>
              {children}
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;