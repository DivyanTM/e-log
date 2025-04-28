const api = {
    login: async (username, password) => {
        const res = await axiosInstance.post('/auth/login', { username, password });
        const token = res.headers?.authorization?.split(" ")[1] || null;
        
        return { data: res.data, token };
    },

    createfosRecord :(data)=> postData('/fos', data) ,
    createorb2 :(data)=> postData('/orb2/submit-operations',data),
    createbdnrecord :(data)=> postData('/bdn',data),
    createodsRecords1: (data)=>postData('/odsrb/create-records1',data),
    createodsRecords2: (data)=>postData('/odsrb/create-records2',data),
    getAllFORRecords:()=>fetchData('/for/all',"records"),

    creategrbRecord :(data)=> postData('/grb', data),

    createNoXRecord :(data)=> postData('/nox', data),
    createlsfoRecord:(data)=>postData('/lsfo',data),
    createbwrRecord:(data)=>postData('/bwr',data),
    createcrbRecord:(data)=>postData('/crb',data),
    createorb1Record:(data)=>postData('/orb1',data),
    
    getAlllsfoRecords:()=>fetchData('/lsfo/all',"records"), 
    getAllbwrRecords:()=>fetchData('/bwr/all',"records"), 
    getAllcrbRecords:()=>fetchData('/crb/all',"records"), 
    getAllorb1Records:()=>fetchData('/orb1/all',"records"),

    getAllGRBRecords:()=>fetchData('/grb/all',"records"),

    getAllFOSRecords:()=>fetchData('/fos/all',"records"),
    getAllAuditLogs:()=>fetchData('/auditlogs',"logs"),
    getAllUnverifiedRecords:()=>fetchData('/ce/unverified/all','unverifiedRecords')
}

const fetchData = (url, key) => axiosInstance.get(url).then(res => key ? res.data[key] : res.data);


const postData = (url, payload, isFileUpload = false) => {
    let headers = isFileUpload ? { "Content-Type": "multipart/form-data" } : {};
    return axiosInstance.post(url, payload, { headers }).then(res => res.data);
};

const putData = (url, payload) => axiosInstance.put(url, payload).then(res => res.data);

window.api = api;
