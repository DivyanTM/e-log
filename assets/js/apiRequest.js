const api={
    login: async (username, password) => {
        const res = await axiosInstance.post('/auth/login', { username, password });
        const token = res.headers?.authorization?.split(" ")[1] || null;
        return { data: res.data, token };
    },

    createfosRecord :(data)=> postData('/fos', data) ,


    getAllFORRecords:()=>fetchData('/fos/all',"records"),

}

const fetchData = (url, key) => axiosInstance.get(url).then(res => key ? res.data[key] : res.data);
const postData = (url, payload) => axiosInstance.post(url, payload).then(res => res.data);
const putData = (url, payload) => axiosInstance.put(url, payload).then(res => res.data);

window.api = api;