import { useContext } from "react"
import { SettingsActionContext, TypesSettingsAction } from "../Store/settingsContext"
import { StockItemData } from "../types"

const useDatabase = () => {
  // Context
  const {stateSettingsAction, dispatchSettingsAction} = useContext(SettingsActionContext)

  /**
   * Checks passed in EAN exists in the stockItesmData database and passes back the corresponding
   * stockcode. If EAN not found returns empty stockcode and a error message.
   * @param newStockEAN EAN to check exists in database
   * @returns object with stockCode and errorText
   */
  const checkEANExistsInDatabase = (newStockEAN:string):{stockCode:string, errorText:string}|undefined =>
  {
    if(stateSettingsAction.serverIpAddress !== ''){
      const stockCode = stateSettingsAction.stockItemsData.find((stockItem:StockItemData) => stockItem.ean === newStockEAN)

      if(stockCode !== undefined){
        return {stockCode:stockCode.productCode, errorText:''} 
      }

      return {stockCode:'', errorText: 'EAN: ' + newStockEAN + '\nDoes not exist in database'}
    }

    return {stockCode:'', errorText:'Server IpAddress not set'} 
  }

  /**
   * Checks passed in EAN exists on the database and passes back the corresponding
   * stockcode. If EAN not found returns empty stockcode and a error message.
   * @param newStockEAN EAN to check exists in database
   * @returns 
   */
  // const checkEANExistsInDatabase = async (newStockEAN:string):Promise<{stockCode:string, errorText:string}|undefined> =>
  // {
  //   const stockCode = stateSettingsAction.stockItemsData.find((stockItem:StockItemData) => stockItem.ean === newStockEAN)

  //   if(stockCode !== undefined){
  //     return {stockCode:stockCode.productCode, errorText:''} 
  //   }

  //   return {stockCode:'', errorText: 'EAN: ' + newStockEAN + '\nDoes not exist in database'}

  //   // if(stateSettingsAction.serverIpAddress !== ''){
  //   //   let newStockCode = ''

  //   //   try {
  //   //     let response = await fetch('http://' + stateSettingsAction.serverIpAddress + ':4000/api/stockcodes/' + newStockEAN, {
  //   //       method: 'GET',
  //   //       headers: {
  //   //         'Content-Type': 'application/json'
  //   //       }
  //   //     })
  
  //   //     let json = await response.json()
  
  //   //     if(response.ok){
  //   //       if(json.data !== ""){ // backend response is either a stockcode or empty string if EAN not found
  //   //         newStockCode = json.data
  //   //         return {stockCode:newStockCode, errorText:''}
  //   //       }
  //   //       else{
  //   //         return {stockCode:'', errorText: 'EAN: ' + newStockEAN + '\nDoes not exist in database'}
  //   //       }
  //   //     }
  //   //   } catch (error) {
  //   //     return {stockCode:'', errorText:'An unexpected error occurred trying to check with backend'}
  //   //   }
  //   // }
  //   // else{
  //   //   return {stockCode:'', errorText:'Server IpAddress not set'}
  //   // }

  //   // return { stockCode: "", errorText: "Unknown error occurred" };
  // }

  const getStockItemsDataFromDatabase = async () =>
  {
    if(stateSettingsAction.serverIpAddress !== ''){
      try {
        let response = await fetch('http://' + stateSettingsAction.serverIpAddress + ':4000/api/stockcodes/stockItemData/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        let json = await response.json()
  
        if(response.ok){
          dispatchSettingsAction({
            type: TypesSettingsAction.SetStockItemsData,
            payload: { 
              stockItemsData: json
            }
        })
        }
      }
      catch (error) {
        return 'An unexpected error occurred trying to check with backend'
      }
    }
    else{
      return 'Server IpAddress not set'
    }

    return "Unknown error occurred";
  }


  return { checkEANExistsInDatabase, getStockItemsDataFromDatabase };
}

export default useDatabase