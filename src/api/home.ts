import client from "."

const getHome = async () => {
    // const response = await axios.get("./api/Home");
    // return response.data;
    return new Promise((resolve, reject) => {
        client.get("/Home")
            .then(response => {
                // if type of html document throw error
                if (response.headers["content-type"].includes("text/html")) {
                    resolve("Bạn cần vào link proxy đẻ chạy ứng dụng")
                }

                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default getHome