import { POST, Body, RetrofitPromise, GET, Path } from "retrofitjs";
import http from "../utils/http";
import {User} from "../model/User";
export class APIService {
    @POST("auth")
    public login(@Body user: object): RetrofitPromise<User> & void{     
    }

    @GET("User/getUserMenus/:userID/:LanguageID/:ParentMenuID")
    public getUserMenus(@Path("userID") userID: number, @Path("LanguageID") LanguageID: number, @Path("ParentMenuID") ParentMenuID: number): RetrofitPromise<any>& void{
    }
}
export let api: APIService = http.create( APIService );