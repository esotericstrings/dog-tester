import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import './index.scss';
import Layout from '../Layout';

function Identify() {
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([])

  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()  

  const loadModel = async () => {
    setLoading(true)
    try {
      const model = await mobilenet.load()
      setModel(model)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const identify = async () => {
    textInputRef.current.value = ''
    const results = await model.classify(imageRef.current)
    setResults(results)
  }

  const uploadImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImage(url)
    } else {
      setImage(null)
    }
  }
  
  const handleOnChange = (e) => {
    setImage(e.target.value)
    setResults([])
  }

  const triggerUpload = () => {
    fileInputRef.current.click()
  }

  useEffect(() => {
      loadModel()
  }, [])

  if (loading) {
    return <Layout><h2>Model Loading...</h2></Layout>
  }

  return (
    <Layout>
      <div className='input-container'>
          <input type='file' accept='image/*' capture='camera' className='upload-input' onChange={uploadImage} ref={fileInputRef} />

          <button className='image-upload' onClick={triggerUpload}>Upload</button>
          <span className='or'>OR</span>
          <input type="text" placeholder='Image URL' ref={textInputRef} onChange={handleOnChange} />
          {image && <button className='button' onClick={identify}>Identify Image</button>}

        </div>
        <div className="container">
          <div className="main-content">

            <div className="image-container">
              {image && <img src={image} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
            </div>

            {results.length > 0 && <div className='results'>
              {results.map((result, index) => {
                return (
                  <div className='result' key={result.className}>
                    <span className='name'>{result.className}</span>
                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='top-guess'>Best Guess</span>}</span>
                  </div>
                )
            })}
          </div>}
        </div>
      </div>
    </Layout>
  );
}

export default Identify;
