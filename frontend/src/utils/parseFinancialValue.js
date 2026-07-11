export function parseFinancialValue(value) {

    if (!value || value === "NOT_FOUND")
        return null;

    const lower = value.toLowerCase();

    const number = parseFloat(
        value.replace(/[^0-9.]/g, "")
    );

    if (isNaN(number))
        return null;

    if (lower.includes("billion"))
        return number * 1000;

    if (lower.includes("million"))
        return number;

    if (lower.includes("%"))
        return number;

    return number;
}