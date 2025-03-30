import { useContext } from "react"
import { SettingsActionContext } from "../Store/settingsContext"

const useDatabase = () => {
    // Context
    const {stateSettingsAction} = useContext(SettingsActionContext)

    /**
     * Checks passed in EAN exists on the database and passes back the corresponding
     * stockcode along with the EAN. If EAN not found returns empty EAN, empty stockcode and
     * a error message.
     * @param newStockEAN EAN to check exists in database
     * @returns 
     */
    const checkEANExistsInDatabase = async (newStockEAN:string):Promise<{stockCode:string, errorText:string}|undefined> =>
    {
        if(stateSettingsAction.serverIpAddress !== ''){
          let newStockCode = ''
    
          try {
              let response = await fetch('http://' + stateSettingsAction.serverIpAddress + ':4000/api/stockcodes/' + newStockEAN, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
              })
        
              let json = await response.json()
        
              if(!response.ok){
                return {stockCode:'', errorText:'There was an error trying to get stock info from database'}
              }
              if(response.ok){
                if(json.data !== ""){ // backend response is either a stockcode or empty string if EAN not found
                    newStockCode = json.data
          
                  return {stockCode:newStockCode, errorText:''}
                }
                else{
                    return {stockCode:'', errorText:'EAN does not exist in database'}
                }
              }
          } catch (error) {
            return {stockCode:'', errorText:'An unexpected error occurred trying to check with backend'}
          }
        }
        else{
            return {stockCode:'', errorText:'Server IpAddress not set'}
        }

        return { stockCode: "", errorText: "Unknown error occurred" };
    }

    return { checkEANExistsInDatabase };
}

export default useDatabase