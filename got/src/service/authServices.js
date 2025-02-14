
import instance from "./instance";


const authServices ={

    reg:async(data)=>{
        return await instance.post("/users/register",data)
    },
    log:async(data)=>{
        return await instance.post("/users/login",data,{ withCredentials: true, })
    },
    forgot:async(data)=>{
        return await instance.post("/users/forgotPassword",data)
    },

    code:async(data)=>{
      return await instance.post("/users/verifyresetcode",data)
    },
    changepass: async(data)=>{
        return await instance.post("/users/changepassword",data)
    },

    lout: async()=>{
    return await instance.get("/users/logout")
    },
    loggedinuser: async()=>{
        return await instance.get('/users/loggedinuser',{ withCredentials: true, })
    },
    all: async(data)=>{
        return await instance.get('/users/getUsers',data)
    },
 
    }  
  
  

export default authServices;  