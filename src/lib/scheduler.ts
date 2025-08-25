export function applySM2(card: any, rating: number) {
    // card: { easiness?: number, interval?: number, repetitions?: number }
    let easiness = typeof card.easiness === 'number' ? card.easiness : 2.5
    let interval = typeof card.interval === 'number' ? card.interval : 0
    let repetitions = typeof card.repetitions === 'number' ? card.repetitions : 0

    if (rating < 3) {
        repetitions = 0
        interval = 1
    } else {
        repetitions += 1
        if (repetitions === 1) interval = 1
        else if (repetitions === 2) interval = 6
        else interval = Math.round(interval * easiness)
    }

    // update easiness
    const q = rating
    easiness = easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (easiness < 1.3) easiness = 1.3

    const nextReviewAt = Date.now() + interval * 24 * 60 * 60 * 1000

    return { easiness, interval, repetitions, nextReviewAt }
}
