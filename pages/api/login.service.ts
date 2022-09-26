
export const getLoginData = (data: { login: string, pwd: string }): Promise<{ auth: boolean, response: any }> => {
    if (!process.env.HOST) throw new Error('.ENV doesnt provider');

    return fetch(`${process.env.HOST}/api/auth/login`, { method: "POST", body: new URLSearchParams(data) })
        .then(response => {
            if (response.status !== 201) throw new Error("User dont Found");
            return response.text()
        })
        .then(response => {
            return { auth: true, response: response }
        }).catch(error => {
            return { auth: false, response: error }
        }
        )
}