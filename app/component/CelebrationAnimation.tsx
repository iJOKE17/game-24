"use client";

import Lottie from "lottie-react";
import confettiAnimation from "../../public/lottiefiles/confetti_effects_lottie_animation.json";

interface CelebrationAnimationProps {
  visible: boolean;
}

const CelebrationAnimation = ({ visible }: CelebrationAnimationProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default CelebrationAnimation;
