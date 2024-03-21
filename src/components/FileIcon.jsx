import React from 'react';
import { FaFile, FaFileImage, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileArchive, FaFileAudio, FaFileVideo, FaFileAlt } from 'react-icons/fa';

const FileIcon = ({ filename }) => {
    const getIcon = () => {
        if (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.gif') || filename.includes('.webp') || filename.includes('.svg')) {
            return <FaFileImage size={30} />;
        } else if (filename.includes('.pdf')) {
            return <FaFilePdf size={30} />;
        } else if (filename.includes('.doc') || filename.includes('.docx')) {
            return <FaFileWord size={30} />;
        } else if (filename.includes('.xls') || filename.includes('.xlsx')) {
            return <FaFileExcel size={30} />;
        } else if (filename.includes('.ppt') || filename.includes('.pptx')) {
            return <FaFilePowerpoint size={30} />;
        } else if (filename.includes('.zip') || filename.includes('.rar') || filename.includes('.7z')) {
            return <FaFileArchive size={30} />;
        } else if (filename.includes('.mp3') || filename.includes('.wav')) {
            return <FaFileAudio size={30} />;
        } else if (filename.includes('.mp4') || filename.includes('.avi') || filename.includes('.mov')) {
            return <FaFileVideo size={30} />;
        } else if (filename.includes('.txt')) {
            return <FaFileAlt size={30} />;
        } else {
            return <FaFile size={30} />;
        }
    };

    return getIcon();
};

export default FileIcon;