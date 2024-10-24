import { useRef, useState } from 'react';
import ImagePreviewContainer from './components/IamgePreview/ImagePreviewContainer';
import { AnimatePresence, motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

function App() {
  const inputRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    if (images.length === 0) {
      toast.error('Image list is empty');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    images.forEach((file, i) => {
      formData.append(`image[${i}]`, file);
    });
    console.log(Object.fromEntries(formData.entries()));
    setImages([]);

    try {
      const res = await fetch('http://localhost:30000/images', {
        method: 'post',
        body: formData,
      });
      if (!res.ok) throw new Error('failed to post');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success('Done Successfully');
  }

  function handleStartDrag(e) {
    e.preventDefault();
    setIsDrag(true);
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleEndDrag(e) {
    e.preventDefault();
    setIsDrag(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDrag(false);
    const files = Array.from(e.dataTransfer.files);
    const filteredFiles = files.filter(
      file =>
        file.type.split('/')[0] === 'image' &&
        !images.some(i => i.name === file.name)
    );
    setImages(prev => [...prev, ...filteredFiles]);
  }

  function handleChange(e) {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter(
      file =>
        file.type.split('/')[0] === 'image' &&
        !images.some(i => i.name === file.name)
    );
    setImages(prev => [...prev, ...filteredFiles]);
  }

  function deleteImage(name) {
    setImages(prev => prev.filter(image => image.name !== name));
  }

  return (
    <>
      {isLoading && <div className="loading-bar" />}
      <Toaster richColors />
      <form
        className="dorp-area"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <input
          onChange={handleChange}
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          ref={inputRef}
        />
        <label
          htmlFor="images"
          onDragOver={handleStartDrag}
          onDragLeave={handleEndDrag}
          onDrop={handleDrop}
        >
          <p style={{ color: '#0086fe' }}>
            Drop your image here{' '}
            <span className={isDrag ? 'hidden' : ''}>
              or{' '}
              <motion.span
                style={{ color: '#00000090', cursor: 'pointer' }}
                whileHover={{ fontSize: '18px' }}
                transition={{ type: 'spring' }}
              >
                Browse
              </motion.span>
            </span>
          </p>
        </label>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#057de8' }}
          transition={{ type: 'spring' }}
          type="submit"
          disabled={isLoading}
        >
          Upload
        </motion.button>
      </form>
      <AnimatePresence>
        {images.length !== 0 && (
          <ImagePreviewContainer deleteImage={deleteImage} images={images} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
