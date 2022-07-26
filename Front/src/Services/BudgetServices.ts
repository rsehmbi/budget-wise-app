

// API call to get all logs for a user
export function getBudgetLogs(){
    return fetch('/BudgetLog/getbudgetlogs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()}
    })
}

// API call for getting distinct budget types for a user
export function getBudgetNames(){
    return fetch('/BudgetLog/getBudgetNames',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}

// API for getting budget names according to the expense name selected
export function getBudNameLogs(value){
    return fetch(`/BudgetLog/getbudgetlogs/${value}`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}

export function updateLogsAPICall(budgetCategory, amount, expenseDescrip){
    return fetch('/BudgetLog/updateLog', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'budgetcategory': budgetCategory,
          'amount': amount,
          'description': expenseDescrip ,
        }) 
    })
}

export function deleteLogAPI(category, description){
    return fetch('/BudgetLog/deleteLog', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'budgetcategory': category,
          'description': description
        }) 
    })
}