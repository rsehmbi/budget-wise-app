import { currencyFormatter } from "./CurrencyUtils.tsx";

// Get the SQL Date data type, convert it to TS date and parse it
export function parseDate(data){
    data.forEach(row => {
        var date = new Date(row['date'])
        var today = date.getFullYear() +"-"+date.getMonth()+"-"+date.getDate()
        row['date']=today
    });

}

// Add currency type to log table, will take additional argument in future for currency typ
export function addCurrency(data){
    data.forEach(row=>{
        var currency = currencyFormatter.format(row['amount'])
        row['amount'] = currency
    })
    

}