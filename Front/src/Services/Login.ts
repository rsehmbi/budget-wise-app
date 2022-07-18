

export function LoginCall(email){
    return fetch('/login', {
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
