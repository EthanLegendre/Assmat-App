export function formatDateInput(text: string) {
    const digitsOnly = text.replace(/\D/g, "");

    const limited = digitsOnly.slice(0, 8);

    let formatted = limited;

    if (limited.length > 4) {
        formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
    } else if (limited.length > 2) {
        formatted = `${limited.slice(0, 2)}${limited.slice(2)}`;
    }
    return formatted;
}