import { motion } from 'framer-motion';
interface TimeWindowButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TimeWindowButton: React.FC<TimeWindowButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative z-10 px-4 text-sm font-medium transition-colors duration-300 rounded-full ${
        isActive ? 'text-[#0F1824]' : 'text-dark'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="trending-pill"
          className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5] to-[#63E6BE] rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default TimeWindowButton;
