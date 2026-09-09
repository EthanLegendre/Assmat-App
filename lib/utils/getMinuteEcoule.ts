export function getMinuteEcoulees(heureDebut: string): number {
    const now = new Date();
    const parts = heureDebut.split(":").map(Number);
    const heure = parts[0];
    const minute = parts[1];
    const debutEnMinute = heure * 60 + minute;
    const maintenantEnMinute = now.getHours() * 60 + now.getMinutes();

    return maintenantEnMinute - debutEnMinute;
}