import { motion } from 'framer-motion';

/* eslint-disable react/prop-types */
function ImagePreview({ name, url, deleteImage }) {
  return (
    <motion.li
      className="image"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0,
        transition: { ease: 'easeIn', duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <span className="delete" onClick={() => deleteImage(name)}>
        &times;
      </span>
      <img src={url} alt={name} />
    </motion.li>
  );
}

export default ImagePreview;
