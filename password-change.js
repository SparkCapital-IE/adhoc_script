
const json = require("./file.json");
const username = json.Users?.map((m) => m.Username);
var data="";
for (i in username) {
    data += `aws cognito-idp admin-set-user-password --user-pool-id "ap-south-1_Ih4Kfm1pZ" --username 507cc2f9-067d-4b83-852e-6167b71589b5 --password 'abc123' --permanent \n`
}   
const fs = require("fs");
fs.writeFileSync('list.txt', data);