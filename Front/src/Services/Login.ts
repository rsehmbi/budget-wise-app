

export function LoginCall(email){
    return fetch('http://budget-wise-app.ey.r.appspot.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function SignUp(email){
    return fetch('http://budget-wise-app.ey.r.appspot.com/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function isAuth(){
    return fetch('http://budget-wise-app.ey.r.appspot.com/isUserAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": localStorage.getItem("token")}
    })
}
