export function getDateOfWeek(referenceDate: Date = new Date()): Date[] {
    const dayOfWeek = referenceDate.getDay();
    const toMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(referenceDate);

    monday.setDate(referenceDate.getDate() + toMonday);
    monday.setHours(0, 0, 0 , 0);

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        week.push(day);
    }
    return week;
}