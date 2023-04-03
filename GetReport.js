// aws configure
//set aws key and secrte

//get List of All User
//aws cognito-idp  list-users --user-pool-id  ap-south-1_wxjd20BU5 > listofuser.json

//get List of User In Specefic Group
//aws cognito-idp list-users-in-group --user-pool-id ap-south-1_wxjd20BU5 --group-name spark-download-enabled-users > download-enabled.json


const fs = require("fs");
const listofuser = require("./listofuser.json");
const download_enabled = require("./download-enabled.json");
const listofuser_email = listofuser.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
const download_enabled_email = download_enabled.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
const diffArray = listofuser_email.filter(email => !download_enabled_email.includes(email));
var data = "Email\n";
for (let i in diffArray) {
    data += `${diffArray[i]}\n`
}
fs.writeFileSync('diffArray.csv', data);

for (let j in download_enabled_email) {
    data += `${download_enabled_email[j]}\n`
}
fs.writeFileSync('download_enabled_email.csv', data);