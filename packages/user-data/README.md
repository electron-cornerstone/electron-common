## Usage

```js
const UserData = require('cornerstone-user-data')
UserData.setOptions({
  enableEncrypt: true,
  encryptSecret: 'my-secret',
  encryptMethod: 'aes256'
})
const storedUser = UserData.readUserConfig('12345678', 'user.data')
console.log(storedUser)
if (storedUser) {
  storedUser.birthday = '1991-01-01'
  UserData.saveUserConfig('12345678', storedUser)
}
```
