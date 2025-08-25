import React, { useEffect, useState } from 'react'
import { getDeck, listCardsForDeck, createCard } from '../lib/storage'
import CardEditor from '../components/CardEditor'

export default function DeckPage({ id }: { id: string }) {
    const [deck, setDeck] = useState(() => (id ? getDeck(id) : null))
    const [cards, setCards] = useState(() => (id ? listCardsForDeck(id) : []))

    useEffect(() => {
        setDeck(id ? getDeck(id) : null)
        setCards(id ? listCardsForDeck(id) : [])
    }, [id])

    function onCreateCard(front: string, back: string) {
        if (!deck) return
        createCard(deck.id, front, back)
        setCards(listCardsForDeck(deck.id))
    }

    if (!deck) return <div>Deck not found</div>

    return (
        <div>
            <h2>{deck.title}</h2>
            <p>{deck.description}</p>

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
