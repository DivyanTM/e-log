const api={
    login: async (username, password) => {
        const res = await axiosInstance.post('/auth/login', { username, password });
        const token = res.headers?.authorization?.split(" ")[1] || null;
        return { data: res.data, token };
    },
    createfosRecord :(data)=> postData('/fos', data) ,
    createlsfoRecord:(data)=>postData('/lsfo',data),
    createbwrRecord:(data)=>postData('/bwr',data),
    createcrbRecord:(data)=>postData('/crb',data),
    createorb1Record:(data)=>postData('/orb1',data),

    getAllFORRecords:()=>fetchData('/fos/all',"records"),
    getAlllsfoRecords:()=>fetchData('/lsfo/all',"records"), 
    getAllbwrRecords:()=>fetchData('/bwr/all',"records"), 
    getAllcrbRecords:()=>fetchData('/crb/all',"records"), 
    getAllorb1Records:()=>fetchData('/orb1/all',"records"), 
}

const fetchData = (url, key) => axiosInstance.get(url).then(res => key ? res.data[key] : res.data);
const postData = (url, payload) => axiosInstance.post(url, payload).then(res => res.data);
const putData = (url, payload) => axiosInstance.put(url, payload).then(res => res.data);

window.api = api;