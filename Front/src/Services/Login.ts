

export function LoginCall(email){
    return fetch('http://34.123.234.76/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function SignUp(email){
    return fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function isAuth(){
    return fetch('/isUserAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": localStorage.getItem("token")}
    })
}
