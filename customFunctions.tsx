export function displayFileContents(csvString: string, callback: (stockCode:string, quantity?:number) => void) : void {
    if(csvString.length < 1) return;

    let lines = csvString.trimEnd().split('\n');
    // let hasQuantities = hasCodeWithQuantity(lines);
    lines.shift()

    for (let i = 0; i < lines.length; i++)
    {
        let stockInfo = lines[i].trimEnd().split(',');

        // if (!isValidInput(stockInfo[0])) {
        //     console.log("found illegal stockcode");
        //     displayIllegalStockCode(stockInfo[0]);
        //     continue;
        // }
        callback(stockInfo[0], Number(stockInfo[1]))

        // if (hasQuantities) {
        //     addItem(stockInfo[0], stockInfo[1]);
        // }
        // else {
        //     addItem(lines[i]);
        // }
    }
    
    // if(hasNoItemsAdded){
    //     // if(window.getComputedStyle(saveButtonElement).visibility === 'collapse'){
    //     saveButtonElement.style.visibility = "visible";
    //     hasNoItemsAdded = false;
    // }

}