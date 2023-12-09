const domain = window.location.origin.substring(0, String(window.location).lastIndexOf(":"));
const port = 3001;
export const fetchJSON = (url) => {
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