

export function LoginCall(email){
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function isAuth(){
    return fetch('http://localhost:3000/isUserAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": localStorage.getItem("token")},
    })
}
