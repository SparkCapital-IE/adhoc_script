// aws configure
//set aws key and secrte

//get List of All User
//aws cognito-idp  list-users --user-pool-id  ap-south-1_wxjd20BU5 > ./json/listofuser.json

//get List of User In Specefic Group
//aws cognito-idp list-users-in-group --user-pool-id ap-south-1_wxjd20BU5 --group-name spark-download-enabled-users > ./json/download-enabled.json

const GetReport = async () => {
    const fs = require("fs");
    const download_enabled = require("./json/download-enabled.json");
    const download_enabled_email = download_enabled.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
    const download_enabled_email_set = [...new Set(download_enabled_email)];

    let data = "Email\n";
    for (let j in download_enabled_email_set) {
        data += `${download_enabled_email_set[j]}\n`
    }
    fs.writeFileSync('./csv/download_enabled_email.csv', data);

    data = "Email\n";
    const listofuser = require("./json/listofuser.json");
    const listofuser_email = listofuser.Users?.map((m) => m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
    const listofuser_email_set = [...new Set(listofuser_email)];

    for (let i in listofuser_email_set) {
        data += `${listofuser_email_set[i]}\n`
    }
    fs.writeFileSync('./csv/all_users_emails.csv', data);

    data = "Email\n";
    const download_disable_email = listofuser_email.filter(email => !download_enabled_email_set.includes(email));

    for (let i in download_disable_email) {
        data += `${download_disable_email[i]}\n`
    }
    fs.writeFileSync('./csv/download_disable_email.csv', data);
}
GetReport()


