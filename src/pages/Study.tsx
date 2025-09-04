import React, { useEffect, useState } from 'react'
import { listDueCardsForDeck, updateCard, addReviewLog } from '../lib/storage'
import { applySimpleScheduler } from '../lib/scheduler'

export default function StudyPage({ id }: { id: string }) {
    const [queue, setQueue] = useState<any[]>([])
    const [index, setIndex] = useState(0)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        setQueue(id ? listDueCardsForDeck(id) : [])
        setIndex(0)
        setRevealed(false)
    }, [id])

    if (!queue.length) return <div>No due cards right now.</div>

    const card = queue[index]

    function next() {
        const updated = { ...card }
        const sched = applySimpleScheduler(card)
        updated.nextReviewAt = sched.nextReviewAt
        updateCard(updated)
        addReviewLog(card.id, 1) // rating is always 1 for log

        const nextIndex = index + 1
        if (nextIndex >= queue.length) {
            setQueue([])
        } else {
            setIndex(nextIndex)
            setRevealed(false)
        }
    }

    return (
        <div>
            <h2>Study session</h2>
            <div className="card">
                <div className="front">{card.front}</div>
                {revealed ? (
                    <>
                        <div className="back">{card.back}</div>
                        <button className="btn" onClick={next}>Next</button>
                    </>
                ) : (
                    <button className="btn" onClick={() => setRevealed(true)}>Reveal</button>
                )}
            </div>
        </div>
    )
}
