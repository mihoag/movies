import React, { useState } from 'react';
import { Play } from 'lucide-react'; // Assuming you are using lucide-react for the Play icon

interface VideoThumbnailProps {
  thumbnail: string;
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ thumbnail, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handlePlay}>
      {!isPlaying ? (
        <>
          <img src={thumbnail} alt="Video thumbnail" className="w-full h-[300px] object-cover rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-12 h-12 text-white" />
          </div>
        </>
      ) : (
        <video className="w-full h-[300px] object-cover rounded-lg" controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoThumbnail;
