export function getBudgetList(){
    return fetch('http://localhost:3000/getbudgetList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
    })
}

export function getBudgetNames(){
    return fetch('http://localhost:3000/getBudgetNames',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
        })
}

export function getBudNameLogs(value){
    return fetch(`http://localhost:3000/getBudgetList/${value}`,{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
        })
}