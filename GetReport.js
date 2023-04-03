// aws configure
//set aws key and secrte

//get List of All User
//aws cognito-idp  list-users --user-pool-id  ap-south-1_wxjd20BU5 > ./json/listofuser.json

//get List of User In Specefic Group
//aws cognito-idp list-users-in-group --user-pool-id ap-south-1_wxjd20BU5 --group-name spark-download-enabled-users > ./json/download-enabled.json

const GetReport = async () => {
    const fs = require("fs");
    let download_enabled = require("./json/download-enabled.json").Users;
    download_enabled = download_enabled?.filter((d) => d.Enabled == true)
    const download_enabled_email = download_enabled?.map((m) =>
        m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);

    let data = "Email\n";
    for (let j in download_enabled_email) {
        data += `${download_enabled_email[j]}\n`
    }
    fs.writeFileSync('./csv/download_enabled_email.csv', data);

    let listofuserAll = require("./json/listofuser.json").Users;

    let listofuserActive = listofuserAll?.filter((d) => d.Enabled == true)
    let listofuserDeactive = listofuserAll?.filter((d) => d.Enabled != true)

    const listofuser_email = listofuserActive?.map((m) =>
        m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);
    const listofuserDeactive_email = listofuserDeactive?.map((m) =>
        m.Attributes?.filter((d) => d.Name == "email")?.[0]?.Value);

    data = "Email\n";
    for (let i in listofuser_email) {
        data += `${listofuser_email[i]}\n`
    }
    fs.writeFileSync('./csv/all_users_emails.csv', data);

    data = "Email\n";
    for (let i in listofuserDeactive_email) {
        data += `${listofuserDeactive_email[i]}\n`
    }
    fs.writeFileSync('./csv/deactive_users_emails.csv', data);


    const download_disable_email = listofuser_email.filter(email => !download_enabled_email.includes(email));
    data = "Email\n";
    for (let i in download_disable_email) {
        data += `${download_disable_email[i]}\n`
    }
    fs.writeFileSync('./csv/download_disable_email.csv', data);
}
GetReport()


