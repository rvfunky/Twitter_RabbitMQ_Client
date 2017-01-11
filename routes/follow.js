//var followDAO=require('../dbServices/followDAO');
var mq_client = require('../rpc/client');
exports.getFollowingUsers=function(req,res){
    var email=req.session.email;
    var msg_payload = {reqType:"getFollowingUsers",  email: email};
    mq_client.make_request('follow_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200,
                "result": response
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
                "result": err
            }
            res.send(json_responses);
        }
    });
};
exports.getFollowersUsers=function(req,res){
    var email=req.session.email;
    var msg_payload = {reqType:"getFollowersUsers",  email: email};
    mq_client.make_request('follow_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200,
                "result": response
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
                "result": err
            }
            res.send(json_responses);
        }
    });

}