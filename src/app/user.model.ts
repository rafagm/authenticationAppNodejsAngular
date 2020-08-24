export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public rol: string,
    public tokenExpirationDate?: number
  )
  {}

  tokenIsValid(): boolean {
    return this.tokenExpirationDate*1000 - new Date().getTime() < 0 ? false : true;
  }
}
