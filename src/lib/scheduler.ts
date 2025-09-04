export function applySimpleScheduler(card: any) {
    // Always schedule next review for tomorrow
    const nextReviewAt = Date.now() + 24 * 60 * 60 * 1000
    return { nextReviewAt }
}
