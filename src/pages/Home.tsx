import React, { useEffect, useState } from 'react'
import { listCategories, listDecks, createCategory, createDeck } from '../lib/storage'

export default function Home() {
    const [categories, setCategories] = useState(() => listCategories())
    const [decks, setDecks] = useState(() => listDecks())
    const [newCat, setNewCat] = useState('')
    const [newDeck, setNewDeck] = useState('')
    const [selectedCat, setSelectedCat] = useState<string | null>(null)

    useEffect(() => {
        setCategories(listCategories())
        setDecks(listDecks())
    }, [])

    function addCategory() {
        if (!newCat.trim()) return
        createCategory(newCat.trim())
        setNewCat('')
        setCategories(listCategories())
    }

    function addDeck() {
        if (!newDeck.trim()) return
        createDeck(newDeck.trim(), selectedCat || undefined)
        setNewDeck('')
        setDecks(listDecks())
    }

    const filteredDecks = selectedCat ? decks.filter(d => d.categoryId === selectedCat) : decks

    return (
        <div className="home">
            <section className="left">
                <h2>Categories</h2>
                <ul>
                    <li key="all">
                        <a href="#/">All</a>
                    </li>
                    {categories.map(c => (
                        <li key={c.id}>
                            <a href={`#/`}>{c.name}</a>
                        </li>
                    ))}
                </ul>

                <div className="form">
                    <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New category" />
                    <button onClick={addCategory}>Add</button>
                </div>
            </section>

            <section className="main">
                <h2>Decks</h2>
                <ul>
                    {filteredDecks.map(d => (
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
