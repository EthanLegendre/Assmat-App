export function tempsEcoule(heureDebut: string): string {
    const now = new Date();
    const parts = heureDebut.split(":").map(Number);
    const h = parts[0];
    const m = parts[1];

    const debutEnMinutes = h * 60 + m;
    const maintenantEnMinutes = now.getHours() * 60 + now.getMinutes();

    const diffMinutes = maintenantEnMinutes - debutEnMinutes;

    const heures = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${heures}h${String(minutes).padStart(2, "0")}`;
}