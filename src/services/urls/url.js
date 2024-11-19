export const baseURl = "https://upskilling-egypt.com:3006/api/v1";
export const imagbaseURl = "https://upskilling-egypt.com:3006";

 // USERS URL
export const USERS_URL={
    LOGIN:`${baseURl}/Users/Login`,
    Rest_Reqest:`${baseURl}/Users/Reset/Request`,
    REST:`${baseURl}/Users/Reset`,
    GET_USER:(id)=>`${baseURl}/Users/${id}`
 }