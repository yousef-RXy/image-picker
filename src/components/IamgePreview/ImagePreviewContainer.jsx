import { AnimatePresence, motion } from 'framer-motion';
import ImagePreview from './ImagePreview';

/* eslint-disable react/prop-types */
function ImagePreviewContainer({ images, deleteImage }) {
  return (
    <motion.div
      className="image-preview"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: 30,
        transition: { ease: 'easeIn', duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <ul>
        <AnimatePresence>
          {images.map(image => (
            <ImagePreview
              key={image.name}
              deleteImage={deleteImage}
              url={URL.createObjectURL(image)}
              name={image.name}
            />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}

export default ImagePreviewContainer;
