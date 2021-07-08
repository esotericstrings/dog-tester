import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";

function Model() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)

  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()  
   
  const loadModel = async () => {
      setIsModelLoading(true)
      try {
          const model = await mobilenet.load()
          setModel(model)
          setIsModelLoading(false)
      } catch (error) {
          console.log(error)
          setIsModelLoading(false)
      }
  }

  const uploadImage = (e) => {
      const { files } = e.target
      if (files.length > 0) {
          const url = URL.createObjectURL(files[0])
          setImageURL(url)
      } else {
          setImageURL(null)
      }
  }

  const identify = async () => {
      textInputRef.current.value = ''
      const results = await model.classify(imageRef.current)
      setResults(results)
  }

  const handleOnChange = (e) => {
      setImageURL(e.target.value)
      setResults([])
  }

  const triggerUpload = () => {
      fileInputRef.current.click()
  }

  useEffect(() => {
      loadModel()
  }, [])

  useEffect(() => {
      if (imageURL) {
          setHistory([imageURL, ...history])
      }
  }, [imageURL])

  if (isModelLoading) {
      return <Layout><h2>Model Loading...</h2></Layout>
  }
}

export default Model;