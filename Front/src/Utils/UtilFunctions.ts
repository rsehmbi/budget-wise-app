// Get the SQL Date data type, convert it to TS date and parse it
export function parseDate(data){
    data.forEach(row => {
        var date = new Date(row['date'])
        var today = date.getFullYear() +"-"+date.getMonth()+"-"+date.getDate()
        row['date']=today
    });

}