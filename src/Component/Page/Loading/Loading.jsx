import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/json/Orbit Lodding.json";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <div className="w-48 h-48">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default Loading;