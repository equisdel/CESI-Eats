class User {
    constructor(mail, password, info) {
      this.mail = mail;
      this.password = password;
      this.info = info  // despues precisar que info necesita la base de datos
    }
}

module.exports = User;