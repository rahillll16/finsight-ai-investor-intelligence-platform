export default function formatFinancialValue(value) {

    if (!value || value === "NOT_FOUND") {
        return "Data Unavailable";
    }

    if (value.includes("%")) {
        return value;
    }

    const lower = value.toLowerCase();

    const number = parseFloat(
        value
            .replace(/[$,%]/g, "")
            .replace(/,/g, "")
    );

    if (isNaN(number)) {
        return value;
    }

    if (lower.includes("million")) {

        if (number >= 1000) {
            return `$${(number / 1000).toFixed(2)}B`;
        }

        return `$${number.toFixed(0)}M`;
    }

    if (lower.includes("billion")) {
        return `$${number.toFixed(2)}B`;
    }

    return value;
}