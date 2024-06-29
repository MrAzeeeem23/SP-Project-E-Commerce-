const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #f472b6; /* red color */
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 1.2s linear infinite;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

export default Loader;
