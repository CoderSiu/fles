import {AccessToken} from './AccessToken'
export class User {
    id!: number;
    userName: string;
    password: string;
    personName!: string;
    email!: string;
    cellPhone!: string;
    lastPasswordResetDate!: string;
    signature: any;
    backupSignature: any;
    isTesting!: boolean;
    isReporting!: boolean;
    isCS!: boolean; 
    isSaler!: boolean;
    isDeveloper!: boolean;
    isAdministrator!: boolean;
    isDCSAdmin!: boolean;
    positionID!: boolean;
    labID!: number;
    nativeLanguageID!: number;
    secondaryLanguageID!: number;
    accessToken!: AccessToken;
    avatarUrl!: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png';

    constructor(userName:string,password:string){
        this.userName = userName;
        this.password = password;
    }
}