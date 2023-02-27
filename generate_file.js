// aws configure
//set aws key and secrte

//get List of All User
//aws cognito-idp  list-users --user-pool-id  ap-south-1_wxjd20BU5 > listofuser.json

//get List of User In Specefic Group
//aws cognito-idp list-users-in-group --user-pool-id ap-south-1_wxjd20BU5 --group-name spark-download-enabled-users > download-enabled.json

const json = require("./file.json");
const username = json.Users?.map((m) => m.Username);
var data="";
for (i in username) {
    data += `aws cognito-idp admin-set-user-password --user-pool-id "ap-south-1_wxjd20BU5" --username ${username[i]} --password 'abc123' --permanent \n`
}   
const fs = require("fs");
fs.writeFileSync('list.txt', data);