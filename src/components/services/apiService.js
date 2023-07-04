import axios from "axios";

export const API_URL = "https://hitchhikermanagmentsystem-jygl.onrender.com"
export const TOKEN_NAME = "USER_TOKEN"
export const CURRENT_USER="USER" 
export const arrRideHistory="arrRideHistory"
// export const arrMyRidesOffer="arrMyRidesOffer"
// export const arrMyRidesRequst="arrMyRidesRequst"
export const arrOfferOpenAdmin="arrOfferOpenAdmin"
export const arrRequstOpenAdmin="arrRequstOpenAdmin"
export const arrRidsCloseAdmin="arrRidsCloseAdmin"



export const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*.<>])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const regPhone = /^[0-9]+$/;



export const doApiGet = async(_url) => {
  try{
    let resp = await axios.get(_url,{
      headers:{
        "x-api-key": localStorage[TOKEN_NAME]
      }
    })
    return resp;
  }
  catch(err){
    // throw-> בבקשות של פרומיס מזהים את זה בתור החזרת שגיאה
    throw err;
  }
}

// For Post,delete, put, patch
export const doApiMethod = async(_url,_method,_body = {}) => {
  try{
    console.log(_body)
    let resp = await axios({
      url:_url,
      method:_method,
      data:_body,
      headers:{
        "x-api-key":localStorage[TOKEN_NAME]
      }
    })
    return resp;
  }
  catch(err){
    throw err;
  }
}

//for myInfo
export const doApiMethodTokenPatch = async (_url, _method, _body = {}) => {
  try {
      let resp = await axios({
          method: _method,
          url: _url,
          data: _body,
          headers: {
              // 'Content-Type': 'application/json',
              "x-api-key": localStorage[TOKEN_NAME]
          }
      })
      return resp;
  } catch (err) {
      throw err;
  }
}


export const doApiTukenGet = async (_url) => {
  try {
      let resp = await axios.get(_url, {
          headers: {
              // 'Content-Type': 'application/json',
              "x-api-key": localStorage.getItem(TOKEN_NAME)
          }
      })
      return resp;
  } catch (err) {
      throw err;
  }
}