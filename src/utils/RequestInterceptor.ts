import {  RetrofitConfig,  Interceptor,  Chain,  ResponseInterface } from "retrofitjs";
import { getCurrentInstance } from "vue";
import { User } from "../model/User";
import { AccessToken } from "../model/AccessToken";
export class RequestInterceptor implements Interceptor {
	order = 256;
	init(config: RetrofitConfig): void {
		config.baseURL = "/api";
		config.headers = new Map();
		config.headers["Content-Type"] = "application/json; charset=UTF-8";
		config.headers["Accept"]= "*/*";
		const app = getCurrentInstance();
		const curUser: User = app?.appContext.config.globalProperties.$curUser;
		const accessToken: AccessToken = curUser?.accessToken;
		config.headers["Authorization"]= accessToken == undefined?"":"Bearer " + accessToken.token;
	}
	intercept(chain: Chain): Promise<ResponseInterface<any>> {
		const app = getCurrentInstance();
		const curUser: User = app?.appContext.config.globalProperties.$curUser;
		const accessToken: AccessToken = curUser?.accessToken;
		chain.request().headers["Authorization"]= accessToken == undefined?"":"Bearer " + accessToken.token;
		return chain.proceed(chain.request());
	}
 }