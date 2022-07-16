
// API call to get all logs for a user
export function getBudgetList(){
    return fetch('/getbudgetList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()}
    })
}

// API call to get all logs for a user
export function getBudgetLogs(){
    return fetch('/getbudgetlogs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()}
    })
}

// API call for getting distinct budget types for a user
export function getBudgetNames(){
    return fetch('/getBudgetNames',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}

// API for getting budget names according to the expense name selected
export function getBudNameLogs(value){
    return fetch(`/getbudgetlogs/${value}`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}