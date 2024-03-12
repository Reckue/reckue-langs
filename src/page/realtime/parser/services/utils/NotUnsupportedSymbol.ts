export const notUnsupportedSymbol = (symbol: string) => {
        return symbol
            && symbol !== " "
            && symbol !== "."
            && symbol !== ","
            && symbol !== "“"
            && symbol !== "”"
            && symbol !== "!"
            && symbol !== "?";
    }