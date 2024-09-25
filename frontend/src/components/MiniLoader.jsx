const MiniLoader = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid red;
            border-radius: 50%;
            width: 10rem;
            height: 10rem;
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default MiniLoader;
  