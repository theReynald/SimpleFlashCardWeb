import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import DeckPage from './pages/Deck'
import StudyPage from './pages/Study'

type Route = { name: string; params?: Record<string, string> }

function parseHash(): Route {
    const hash = location.hash.replace(/^#/, '')
    if (!hash || hash === '/') return { name: 'home' }
    const parts = hash.split('/').filter(Boolean)
    if (parts[0] === 'deck' && parts[1]) return { name: 'deck', params: { id: parts[1] } }
    if (parts[0] === 'study' && parts[1]) return { name: 'study', params: { id: parts[1] } }
    return { name: 'home' }
}

export default function App() {
    const [route, setRoute] = useState<Route>(parseHash())

    useEffect(() => {
        const onHash = () => setRoute(parseHash())
        window.addEventListener('hashchange', onHash)
        return () => window.removeEventListener('hashchange', onHash)
    }, [])

    return (
        <div className="app">
            <header>
                <h1>SimpleFlashCardWeb</h1>
                <nav>
                    <a href="#/">Home</a>
                </nav>
            </header>

            <main>
                {route.name === 'home' && <Home />}
                {route.name === 'deck' && route.params && <DeckPage id={route.params.id} />}
                {route.name === 'study' && route.params && <StudyPage id={route.params.id} />}
            </main>
        </div>
    )
}
