//var userDAO=require('../dbServices/userDAO');
//var followDAO=require('../dbServices/followDAO');
//var tweetsDAO=require('../dbServices/tweetsDAO');
var mq_client = require('../rpc/client');
exports.searchUser=function(req,res) {
    var searchEmail=req.body.data;
    var msg_payload = {reqType:"searchUser",  searchEmail: searchEmail};
    mq_client.make_request('search_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(response.length>0) {
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


};
exports.followUser=function(req,res){
    var followingEmail=req.body.followingEmail;
    var followerEmail=req.session.email;
    console.log(followerEmail+' '+followingEmail);
    var msg_payload = {reqType:"followUser",  followingEmail: followingEmail, followerEmail:followerEmail};
    mq_client.make_request('search_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(response) {
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
exports.searchHashTags=function(req,res){
    var tag=req.body.data;
    var msg_payload = {reqType:"searchHashTags",  tag: tag  };
    mq_client.make_request('search_queue',msg_payload, function(err, response){
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