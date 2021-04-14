const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const mailchimp=require("@mailchimp/mailchimp_marketing");

const app=express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

})
app.listen(process.env.PORT,function(){
  console.log("Server is running at port 3000!");
});
mailchimp.setConfig({
  apiKey:"d1bdbd1ced4d4eb85f251bb01affa5eb-us1",
  server:"us1"
});
app.post("/",function(req,res)
{
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
const listId="f5caf80590";

const subscribingUser = {
 firstName: firstname,
 lastName: lastname,
 email: email
};
async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName

}
});
}
res.sendFile(__dirname + "/success.html")
run();
});
