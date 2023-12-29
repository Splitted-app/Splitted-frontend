import axios from 'axios'

let refreshingFunc: any = undefined;

function isUnauthorizedError(error : any) {
    return error.response.status === 401;
}

async function renewToken() {
    const response = await axios.post(process.env.REACT_APP_API_URL + `/api/users/refresh`, null , {withCredentials:true})
    const token = response.data.token;
    return token;
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': '*',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
})

api.interceptors.response.use((res)=>res,
async (error) => {
    const originalConfig = error.config;
    if (!isUnauthorizedError(error)) {
        return Promise.reject(error);
    }

    try {
        console.log("requesting a new token");
        if (!refreshingFunc)
            refreshingFunc = renewToken();
            
        const newToken = await refreshingFunc

        localStorage.setItem("token", newToken);
        originalConfig.headers.Authorization = `Bearer ${newToken}`;

        try {
            return await axios.request(originalConfig);;
        } catch(innerError) {
            if (isUnauthorizedError(innerError)) {
                throw innerError;
            }                  
        }

    } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        console.error("failed to refresh token");
        // todo navigate
    } finally {
        refreshingFunc = undefined;
    }
})

export default api;