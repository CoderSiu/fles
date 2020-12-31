import { api } from "./api/APIService";
import {User} from "./model/User";
// export default [
//   {
//     text: "Home",
//     path: "/home",
//     icon: "home"
//   },
//   {
//     text: "Examples",
//     icon: "folder",
//     items: [
//       {
//         text: "Profile",
//         path: "/profile"
//       },
//       {
//         text: "Tasks",
//         path: "/tasks"
//       }
//     ]
//   }]
export default {
  async getUserMenus(user:User){
    return api.getUserMenus(user.id,user.nativeLanguageID,-1).then(res=>{
      return res.data;
    }).catch(reason=>{
      return false;
    })
  } 
}