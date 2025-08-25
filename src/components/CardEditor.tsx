import React, { useState } from 'react'

export default function CardEditor({ onSave }: { onSave: (front: string, back: string) => void }) {
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')

    function save() {
        if (!front.trim()) return
        onSave(front.trim(), back.trim())
        setFront('')
        setBack('')
    }

    return (
        <div className="card-editor">
            <textarea value={front} onChange={e => setFront(e.target.value)} placeholder="Front" />
            <textarea value={back} onChange={e => setBack(e.target.value)} placeholder="Back" />
            <button onClick={save}>Save Card</button>
        </div>
    )
}
