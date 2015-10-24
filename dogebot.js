var Slack = require('slack-client');
var doge = require('dogefy');

var getTag = function(id){
    return '<@' + id + '>';
};

var isDirect = function(userId, messageText){
    var userTag = getTag(userId);
    return messageText &&
           messageText.length >= userTag.length &&
           messageText.substr(0, userTag.length) === userTag;
};

module.exports = function(key){
    if(key){
        var slack = new Slack(key, true, true);

        slack.on('open', function(){
            var channels = Object.keys(slack.channels)
                .map(function (k) { return slack.channels[k]; })
                .filter(function (c) { return c.is_member; })
                .map(function (c) { return c.name; });

            console.log("Connected to " + slack.team.name + " as @" + slack.self.name);
            console.log("Joined channels: " + channels.join(', '));
        });

        slack.on('message', function(message) {
            var channel = slack.getChannelGroupOrDMByID(message.channel);

            if(message.type === 'message' && isDirect(slack.self.id, message.text) || channel.is_im){
                var cleanedMessage = message.text && message.text.replace(getTag(slack.self.id), '').replace(':', '').trim();

                if(cleanedMessage){
                    channel.send('``` \n' + doge(cleanedMessage) + '\n ```');
                }
            }
        });

        slack.on('error', function(err){
            return console.error("Error", err);
        });

        slack.login();
    }else{
        throw "You need to specify a Slack token";
    }
};
