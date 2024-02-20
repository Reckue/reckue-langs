class StringUtil {

    notUnsupportedSymbol = (symbol: string) => {
        return symbol
            && symbol !== " "
            && symbol !== "."
            && symbol !== ","
            && symbol !== "“"
            && symbol !== "”"
            && symbol !== "!"
            && symbol !== "?";
    }
}

export default new StringUtil() 