var mq_client = require('../rpc/client');
//var userDAO=require('../dbServices/userDAO');
exports.updateProfile=function (req,res) {
    console.log(req.body);
    var msg_payload = {reqType:"updateProfile", email:req.session.email,fullname:req.body.fullname,twitterHandle: req.body.twitterHandle,gender:req.body.gender,birthday:req.body.birthday,mobile:req.body.mobile};
    mq_client.make_request('profile_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(response) {
            json_responses = {
                "statusCode": 200,
                "result":response
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
}
exports.getProfile=function (req,res) {
    var msg_payload = {reqType:"getProfile",  email:req.session.email  };
    mq_client.make_request('profile_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(response) {
            json_responses = {
                "statusCode": 200,
                "result":response
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
}