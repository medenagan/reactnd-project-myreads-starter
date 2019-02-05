// "thisLooksNonHuman" => "This Looks Non Human"
export const dromedaryToPrettyCase = string =>
    string.replace(/(?!=[a-z])[A-Z]/g, " $&")
        .replace(/^[a-z]/, az => az.toUpperCase());
