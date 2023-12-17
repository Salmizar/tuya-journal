const domain = window.location.origin.substring(0, String(window.location).lastIndexOf(":"));
const port = process.env.REACT_APP_API_PORT;
export const get = (url) => {
    return new Promise((resolve, reject) => {
        fetch(`${domain}:${port}${url}`)
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const post = (url, body) => {
    //new content
    return new Promise((resolve, reject) => {
        fetch(`${domain}:${port}${url}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
export const put = (url, body) => {
    //existing content
    return new Promise((resolve, reject) => {
        fetch(`${domain}:${port}${url}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
//can't use delete as a variable name
export const fetchDelete = (url) => {
    return new Promise((resolve, reject) => {
        fetch(`${domain}:${port}${url}`,{ method: "DELETE"})
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
} 