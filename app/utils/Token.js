/**
 * Created by Medivh on 2017/3/23.
 */
export  default  function validateToken() {
    return fetch("http://"+ window.location.hostname +":3000/blog/rest/validation/token", {
        method: 'post',
        mode: 'cros',
        body: '',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Access-Token' : localStorage.getItem("access-token") || ''
        }
    })
        .then((res) => res.json())
        .then((res) => {
            return res.result;
        })
        .catch((e) => {
            console.error(e);
            return false;
        });
}


export  async function AsyncValidateToken() {
    const tokenResult = await
        fetch("http://"+ window.location.hostname +":3000/blog/rest/validation/token", {
            method: 'post',
            mode: 'cros',
            body: '',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': localStorage.getItem("access-token") || ''
            }
        })
            .then((res) => res.json())
            .then((res) => {
                return res.result;
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
    return tokenResult;
}
