

export function LoginCall(email){
    return fetch('https://budgetwise-356702.uc.r.appspot.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function SignUp(email){
    return fetch('https://budgetwise-356702.uc.r.appspot.com/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
}

export function isAuth(){
    return fetch('https://budgetwise-356702.uc.r.appspot.com/isUserAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": localStorage.getItem("token")}
    })
}
