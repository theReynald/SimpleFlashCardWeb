import React, { useEffect, useState } from 'react'
import { getDeck, listCardsForDeck, createCard, updateCard, updateDeck, deleteDeck } from '../lib/storage'
import CardEditor from '../components/CardEditor'

export default function DeckPage({ id }: { id: string }) {
    const [deck, setDeck] = useState(() => (id ? getDeck(id) : null))
    const [cards, setCards] = useState(() => (id ? listCardsForDeck(id) : []))
    const [editing, setEditing] = useState(false)
    const [titleInput, setTitleInput] = useState<string>(deck?.title ?? '')
    const [descInput, setDescInput] = useState<string>(deck?.description ?? '')

    useEffect(() => {
        setDeck(id ? getDeck(id) : null)
        setCards(id ? listCardsForDeck(id) : [])
        setTitleInput(id && getDeck(id) ? getDeck(id)!.title : '')
        setDescInput(id && getDeck(id) ? getDeck(id)!.description ?? '' : '')
    }, [id])

    function onCreateCard(front: string, back: string) {
        if (!deck) return
        createCard(deck.id, front, back)
        setCards(listCardsForDeck(deck.id))
    }

    function saveDeck() {
        if (!deck) return
        updateDeck({ id: deck.id, title: titleInput, description: descInput })
        setDeck(getDeck(deck.id))
        setEditing(false)
    }

    function removeDeck() {
        if (!deck) return
        if (!confirm('Delete this deck and all its cards? This action cannot be undone.')) return
        deleteDeck(deck.id)
        // navigate back to home
        window.location.hash = '#/'
    }

    if (!deck) return <div>Deck not found</div>

    return (
        <div>
            {editing ? (
                <div style={{ marginBottom: 12 }}>
                    <input value={titleInput} onChange={e => setTitleInput(e.target.value)} style={{ padding: 8, fontSize: 18, width: '100%', marginBottom: 8 }} />
                    <textarea value={descInput} onChange={e => setDescInput(e.target.value)} style={{ width: '100%', padding: 8, height: 80 }} />
                    <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <button className="btn" onClick={saveDeck}>Save</button>
                        <button onClick={() => { setEditing(false); setTitleInput(deck.title); setDescInput(deck.description ?? '') }}>Cancel</button>
                        <button onClick={removeDeck} style={{ marginLeft: 'auto', background: '#ff5959', color: '#fff', borderRadius: 8, padding: '8px 12px' }}>Delete deck</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{deck.title}</h2>
                    <p>{deck.description}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                        <button className="btn" onClick={() => setEditing(true)}>Rename / Edit</button>
                        <button onClick={removeDeck} style={{ background: '#ff5959', color: '#fff', borderRadius: 8, padding: '8px 12px' }}>Delete deck</button>
                    </div>
                </div>
            )}

            <section>
                <h3>Cards</h3>
                <ul>
                    {cards.map(c => (
                        <li key={c.id}>{c.front} — {c.back}</li>
                    ))}
                </ul>

                <CardEditor onSave={onCreateCard} />
            </section>

            <a href={`#/study/${deck.id}`}>Start study session</a>
        </div>
    )
}
