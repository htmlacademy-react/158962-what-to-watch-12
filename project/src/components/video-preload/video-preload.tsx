import {useRef, useState} from 'react';

interface VideoPreloadProps {
  previewImage: string;
  previewVideoLink: string;
}

const VideoPreload = ({previewImage, previewVideoLink}: VideoPreloadProps):JSX.Element => {
  const videoPreloadRef = useRef<HTMLVideoElement | null>(null);
  const [timeId, setTimeId] = useState<ReturnType<typeof setTimeout>>();

  const playVideo = () => {
    setTimeId(setTimeout(() => {
      if (videoPreloadRef.current) {
        videoPreloadRef.current.play();
      }
    }, 1000));
  };

  const stopVideo = () => {
    if (videoPreloadRef.current) {
      videoPreloadRef.current.load();
    }

    if (timeId) {
      clearTimeout(timeId);
    }
  };

  return (
    <video
      width="280"
      height="175"
      poster={previewImage}
      muted
      loop
      ref={videoPreloadRef}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
    >
      <source src={previewVideoLink} type="video/mp4" />
    </video>
  );
};

export default VideoPreload;
