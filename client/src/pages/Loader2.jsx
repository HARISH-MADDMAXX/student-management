import { motion } from "framer-motion";

const variants = {
  initial: {
    scale: 0,
    opacity: 0.6
  },
  animate: (index) => ({
    scale: 1,
    opacity: 0,
    transition: {
      duration: 3,
      delay: index * 0.8,
      repeat: Infinity
    }
  })
};

const Loader = () => {
  return (
    <motion.div
      style={{
        height: 220,
        width: 220,
        position: "relative"
      }}
    >
      {Array(4)
        .fill(null)
        .map((_, index) => {
          return (
            <motion.div
              key={index}
              variants={variants}
              initial="initial"
              animate="animate"
              custom={index}
              style={{
                height: 200,
                width: 200,
                backgroundColor: "#16e1e9",
                borderRadius: 100,
                position: "absolute"
              }}
            />
          );
        })}
    </motion.div>
  );
};

export default Loader;
