import React, { useRef } from "react";

const FilePicker = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
      // You can handle file upload logic here
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Choose File
      </button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default FilePicker;
