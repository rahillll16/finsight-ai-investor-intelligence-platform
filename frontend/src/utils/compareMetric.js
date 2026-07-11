import { parseFinancialValue } from "./parseFinancialValue";

export function compareMetric(
    metric,
    value1,
    value2
) {

    const num1 = parseFinancialValue(value1);
    const num2 = parseFinancialValue(value2);

    if (num1 === null || num2 === null) {

        return {
            width1: 0,
            width2: 0,
            winner: null,
            lead: null,
            message: "Insufficient data"
        };

    }

    const lowerIsBetter = [
        "debt"
    ].includes(metric.toLowerCase());

    const max = Math.max(num1, num2);

    const width1 = (num1 / max) * 100;
    const width2 = (num2 / max) * 100;

    let winner;
    let loserValue;
    let winnerValue;

    if (lowerIsBetter) {

        winner = num1 < num2 ? 1 : 2;

        winnerValue = Math.min(num1, num2);

        loserValue = Math.max(num1, num2);

    }

    else {

        winner = num1 > num2 ? 1 : 2;

        winnerValue = Math.max(num1, num2);

        loserValue = Math.min(num1, num2);

    }

    const lead = (
        (winnerValue - loserValue)
        /
        loserValue
    ) * 100;

    return {

        width1,

        width2,

        winner,

        lead: lead.toFixed(1)

    };

}