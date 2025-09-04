import React, { useEffect, useState } from 'react'
import { listDecks, createDeck } from '../lib/storage'

export default function Home() {
  const [decks, setDecks] = useState(() => listDecks())
  const [newDeck, setNewDeck] = useState('')

  useEffect(() => {
    setDecks(listDecks())
  }, [])

  function addDeck() {
    if (!newDeck.trim()) return
    createDeck(newDeck.trim())
    setNewDeck('')
    setDecks(listDecks())
  }

  return (
    <div className="home">
      <section className="main">
        <h2>Decks</h2>
        <ul>
          {decks.map(d => (
            <li key={d.id}>
              <a href={`#/deck/${d.id}`}>{d.title}</a>
            </li>
          ))}
        </ul>
        <div className="form">
          <input value={newDeck} onChange={e => setNewDeck(e.target.value)} placeholder="New deck title" />
          <button onClick={addDeck}>Add deck</button>
        </div>
      </section>
    </div>
  )
}
