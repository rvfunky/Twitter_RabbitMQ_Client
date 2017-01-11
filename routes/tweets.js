//var tweetsDAO=require('../dbServices/tweetsDAO');
//var userDAO=require('../dbServices/userDAO');
var async = require("async");
var mq_client = require('../rpc/client');

exports.insertTweet=function(req,res){
    var tweetData=req.body.tweetData;
    var email=req.session.email;

    var msg_payload = {reqType:"insertTweet", tweetData:tweetData, email: email};
    mq_client.make_request('tweets_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
            }
            res.send(json_responses);
        }
    });

}
exports.insertRetweet=function(req,res){
    var email=req.session.email;
    var tweetData=req.body.tweet;
    var origTweeter=req.body.o_tweeter_name;

    var msg_payload = {reqType:"insertRetweet", tweetData:tweetData, email: email,origTweeter:origTweeter};
    mq_client.make_request('tweets_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
            }
            res.send(json_responses);
        }
    });

}
exports.getTweets=function(req,res){
    var email=req.session.email;
    var msg_payload = {reqType:"getTweets", email: email};
    mq_client.make_request('tweets_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200,
                result:response
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
                result:response
            }
            res.send(json_responses);
        }
    });
}
exports.getStats=function(req,res){
    var email=req.session.email;
    var msg_payload = {reqType:"getStats", email: email};
    mq_client.make_request('tweets_queue',msg_payload, function(err, response){
        console.log('mq response'+response);
        if(!err) {
            json_responses = {
                "statusCode": 200,
                stats:response
            }
            res.send(json_responses);
        }
        else {
            json_responses = {
                "statusCode": 401,
                stats:response
            }
            res.send(json_responses);
        }
    });

}