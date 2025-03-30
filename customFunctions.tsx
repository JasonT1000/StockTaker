/**
 * Takes a CSV string seperates it out to rows the runs callback for each
 * row which takes a stockcode and it's quantity.
 * @param {string} csvString A CSV string
 * @param callback Function you want to use to deal with the retured values
 * @returns A stockEan, stockCode and it's quantity
 */
export function displayFileContents(csvString: string, callback: (stockEan:string, stockCode:string, quantity?:number) => void) : void {
    if(csvString.length < 1) return;

    let lines = csvString.trimEnd().split('\n');
    lines.shift()

    for (let i = 0; i < lines.length; i++)
    {
        let stockInfo = lines[i].trimEnd().split(',');

        callback(stockInfo[0], stockInfo[1], Number(stockInfo[2]))
    }
}