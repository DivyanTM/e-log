const api = {
    login: async (username, password) => {
        const res = await axiosInstance.post('/auth/login', { username, password });
        const token = res.headers?.authorization?.split(" ")[1] || null;
        return { data: res.data, token };
    },
    createorb2:(data) => postData('/orb2/submit-operations', data),
    
    createbdnrecord: (data) => postData('/bdn', data, true), 
    getbdnRecords: () => fetchData('/bdn/all', "records"),
    createfosRecord: (data) => postData('/fos', data),
    createodsRecords1: (data) => postData('/ods/create-records1', data),
    createodsRecords2: (data) => postData('/ods/create-records2', data),
    
    
};

const fetchData = (url, key) => axiosInstance.get(url).then(res => key ? res.data[key] : res.data);


const postData = (url, payload, isFileUpload = false) => {
    let headers = isFileUpload ? { "Content-Type": "multipart/form-data" } : {};
    return axiosInstance.post(url, payload, { headers }).then(res => res.data);
};

const putData = (url, payload) => axiosInstance.put(url, payload).then(res => res.data);

window.api = api;
