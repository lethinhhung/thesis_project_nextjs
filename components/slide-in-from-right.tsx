"use client";

import { useDelayedHidden } from "@/hooks/use-delay-hidden";
import { motion } from "framer-motion";

interface SlideInFromRightProps {
  hidden: boolean;
  children: React.ReactNode;
  className?: string;
}

const SlideInFromRight: React.FC<SlideInFromRightProps> = ({
  hidden,
  children,
  className = "",
}) => {
  const isFullyHidden = useDelayedHidden(hidden, 80);

  if (isFullyHidden && hidden) {
    return null; // Không render sidebar khi nó đã hoàn toàn ẩn
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: hidden ? 0 : 1, x: hidden ? 50 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      hidden={isFullyHidden}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideInFromRight;
