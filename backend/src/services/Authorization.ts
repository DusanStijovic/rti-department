import * as jwt from 'jsonwebtoken';




class Authorization {

    static decodeHeader(request: any): any {
        return JSON.parse(jwt.decode(request.headers.authorization.substr(7)).sub);
    }

    static isAdmin(request: any): boolean {
        console.log(this.decodeHeader(request).type);
        return this.decodeHeader(request).type == "admin";
    }

    static isEmployee(request: any): boolean {
        return this.decodeHeader(request).type == "zaposlen";
    }

    static isStudent(request: any): boolean {
        return this.decodeHeader(request).type == "student";
    }

}




export { Authorization }