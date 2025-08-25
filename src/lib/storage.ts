export type Category = { id: string; name: string; description?: string; parentId?: string; createdAt: number }
export type Deck = { id: string; userId?: string; categoryId?: string; title: string; description?: string; privacy?: 'public' | 'private'; createdAt: number }
export type Card = { id: string; deckId: string; front: string; back: string; tags?: string[]; createdAt: number; nextReviewAt?: number; interval?: number; easiness?: number; repetitions?: number }
export type ReviewLog = { id: string; cardId: string; userId?: string; rating: number; timestamp: number }

const KEY = 'sfc:db:v1'

function genId(prefix = '') { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }

export type DB = { categories: Category[]; decks: Deck[]; cards: Card[]; logs: ReviewLog[] }

function defaultDB(): DB { return { categories: [], decks: [], cards: [], logs: [] } }

export function loadDB(): DB {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return defaultDB()
        return JSON.parse(raw)
    } catch (e) {
        console.error('loadDB error', e)
        return defaultDB()
    }
}

export function saveDB(db: DB) {
    localStorage.setItem(KEY, JSON.stringify(db))
}

export function createCategory(name: string, description?: string, parentId?: string) {
    const db = loadDB()
    const c = { id: genId('cat_'), name, description, parentId, createdAt: Date.now() }
    db.categories.push(c)
    saveDB(db)
    return c
}

export function listCategories() { return loadDB().categories }

export function createDeck(title: string, categoryId?: string, description?: string) {
    const db = loadDB()
    const d = { id: genId('deck_'), title, description, categoryId, createdAt: Date.now() }
    db.decks.push(d)
    saveDB(db)
    return d
}

export function listDecks() { return loadDB().decks }

export function getDeck(id: string) { return loadDB().decks.find(d => d.id === id) }

export function createCard(deckId: string, front: string, back: string) {
    const db = loadDB()
    const c = { id: genId('card_'), deckId, front, back, createdAt: Date.now() }
    db.cards.push(c)
    saveDB(db)
    return c
}

export function listCardsForDeck(deckId: string) { return loadDB().cards.filter(c => c.deckId === deckId) }

export function updateCard(updated: Card) {
    const db = loadDB()
    const idx = db.cards.findIndex(c => c.id === updated.id)
    if (idx >= 0) { db.cards[idx] = updated; saveDB(db) }
}

export function addReviewLog(cardId: string, rating: number) {
    const db = loadDB()
    const log = { id: genId('log_'), cardId, rating, timestamp: Date.now() }
    db.logs.push(log)
    saveDB(db)
    return log
}

export function listDueCardsForDeck(deckId: string) {
    const now = Date.now()
    return loadDB().cards.filter(c => c.deckId === deckId && (!c.nextReviewAt || c.nextReviewAt <= now))
}

export function listDueCardsForCategory(categoryId?: string) {
    const db = loadDB()
    const now = Date.now()
    const decks = categoryId ? db.decks.filter(d => d.categoryId === categoryId) : db.decks
    const deckIds = new Set(decks.map(d => d.id))
    return db.cards.filter(c => deckIds.has(c.deckId) && (!c.nextReviewAt || c.nextReviewAt <= now))
}
