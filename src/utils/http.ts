import {Retrofit, RetrofitConfig} from 'retrofitjs'
import {RequestInterceptor} from './RequestInterceptor'


const requestInterceptor: RequestInterceptor =new RequestInterceptor(); 
class Config implements RetrofitConfig{
}
const config = new Config();
requestInterceptor.init(config);

const http = Retrofit.getBuilder()
  .setConfig(config)
  .addInterceptor(requestInterceptor)
  //.setErrorHandler( /** define your error handler */ )
  .build();

export default http;