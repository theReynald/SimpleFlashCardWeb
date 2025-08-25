import React, { useEffect, useState } from 'react'
import { listDueCardsForDeck, updateCard, addReviewLog } from '../lib/storage'
import { applySM2 } from '../lib/scheduler'

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

    function rate(r: number) {
        const updated = { ...card }
        const sched = applySM2(card, r)
        updated.easiness = sched.easiness
        updated.interval = sched.interval
        updated.repetitions = sched.repetitions
        updated.nextReviewAt = sched.nextReviewAt
        updateCard(updated)
        addReviewLog(card.id, r)

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
                {revealed ? <div className="back">{card.back}</div> : <button onClick={() => setRevealed(true)}>Reveal</button>}

                {revealed && (
                    <div className="ratings">
                        {[0, 1, 2, 3, 4, 5].map(r => (
                            <button key={r} onClick={() => rate(r)}>{r}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
