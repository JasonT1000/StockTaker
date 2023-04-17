export function displayFileContents(csvString:string, addItem:(stockCode:string, quantity?:number) => {}) : void {
    console.log(csvString)
    addItem({stockCode: 'testyTesty', quantity: 1})
}