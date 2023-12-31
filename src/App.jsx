import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'

const ENDPOINT_CAT_RANDOM_FACT = 'https://catfact.ninja/fact'

function App() {
  const [fact, setFact] = useState('gatito')
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(ENDPOINT_CAT_RANDOM_FACT)
      .then((resp) => resp.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const firstThreeWord = fact.split(' ', 3).join(' ')
    fetch(
      `https://cataas.com/cat/says/${firstThreeWord}?size=50&color=red`,
    ).then((data) => {
      //console.log(data.url)
      const { url } = data
      setImageUrl(url)
    })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image with the first three words of: ${fact}`}
        />
      )}
    </main>
  )
}

export default App
