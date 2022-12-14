

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
export function updateLogsAPICall(id, budgetCategory, amount, expenseDescrip){
    return fetch('/BudgetLog/updateLog', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'id': id,
          'budgetcategory': budgetCategory,
          'amount': amount,
          'description': expenseDescrip ,
        }) 
    })
}

// Delete a log
export function deleteLogAPI(record){
    var id = record.id
    var category = record.category
    var description = record.description
    return fetch('/BudgetLog/deleteLog', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'budgetcategory': category,
          'description': description,
          'id': id
        }) 
    })
}

// Owing money
export function youOweAPI(receiver, amount, description){
    return fetch('/FriendWise/youOwe', {
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
    return fetch('/FriendWise/friendOwe', {
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

// Get all the owing logs
export function getAllOwingLogs(){
    return fetch(`/FriendWise/getAllOwings`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}

// Get all logs for who you owe
export function getMyOwingLogs(){
    return fetch(`/FriendWise/getMyOwings`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}
// Get all logs for who owes me
export function getOwingMeLogs(){
    return fetch(`/FriendWise/getOwingMe`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()}
        })
}

// Delete a log
export function deleteOweLog(id){
    return fetch('/FriendWise/deleteOweLog', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'id': id
        }) 
    })
}

// Update an amount from log
export function updateOweLogAPICall(id, amount, description){
    return fetch('/FriendWise/updateOweLog', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        },
        body: JSON.stringify({
          'id': id,
          'amount': amount,
          'description': description
        }) 
    })
}
    
// Get total Owings
export function getTotalOwingsAPI(){
    return fetch('/FriendWise/getTotalOwings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': localStorage.getItem('token')?.toString()
        }, 
    })
}