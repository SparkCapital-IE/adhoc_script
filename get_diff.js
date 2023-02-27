const fs = require("fs");
const listofuser = require("./listofuser.json");
const download_enabled = require("./download-enabled.json");
const listofuser_email = listofuser.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
const download_enabled_email = download_enabled.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
const diffArray = listofuser_email.filter(email => !download_enabled_email.includes(email));
var data = "Email\n";
for (i in diffArray) {
    data += `${diffArray[i]}\n`
}
fs.writeFileSync('diffArray.csv', data);