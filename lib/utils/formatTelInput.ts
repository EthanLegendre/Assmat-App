export function formatTelInput(text: string) {
    const digitOnly = text.replace(/\D/g, "");
    const limited = digitOnly.slice(0, 10);

    let formatted = limited;

    if (limited.length > 8) {
        formatted = `${limited.slice(0, 2)} ${limited.slice(2, 4)} ${limited.slice(4, 6)} ${limited.slice(6, 8)} ${limited.slice(8)}`;
    } else if (limited.length > 6) {
        formatted = `${limited.slice(0, 2)} ${limited.slice(2, 4)} ${limited.slice(4, 6)} ${limited.slice(6)}`;
    } else if (limited.length > 4) {
        formatted = `${limited.slice(0, 2)} ${limited.slice(2, 4)} ${limited.slice(4)}`;
    } else if (limited.length > 2) {
        formatted = `${limited.slice(0, 2)} ${limited.slice(2)}`;
    }

    return formatted;
}