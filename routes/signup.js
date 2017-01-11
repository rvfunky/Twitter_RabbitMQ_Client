//var userDAO=require('../dbServices/userDAO');
var mq_client = require('../rpc/client');
exports.createUser=function(req,res){
    var fullname=req.body.fullname;
    var email=req.body.email;
    var password=req.body.password;
    var msg_payload = {reqType:"createUser",  email: email, password:password, fullname:fullname};
    mq_client.make_request('signup_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401
            }
            res.send(json_responses);
        }
    });

};
