

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

// Update an amount from log
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

// Delete a log
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

// Owing money
export function youOweAPI(receiver, amount, description){
    return fetch('/youOwe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
            'receiver': receiver,
            'amount': amount,
            'description': description
        }) 
    })
}

export function friendOweAPI(sender, amount, description){
    return fetch('/friendOwe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
            'sender': sender,
            'amount': amount,
            'description': description
        }) 
    })
}