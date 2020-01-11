var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var doge = require('dogefy');

module.exports = function(key){
  if(!key) throw new Error('You need to specify a Slack token');

  var rtm = new RtmClient(key);

  rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    var team = rtm.dataStore.getTeamById(rtm.activeTeamId);
    var user = rtm.dataStore.getUserById(rtm.activeUserId);
    console.log('Connected to ' + team.name + ' as ' + user.name);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function(message){
    var channel = rtm.dataStore.getChannelGroupOrDMById(message.channel);

    if(message.type === 'message' && message.text &&
      (channel.is_im || isDirect(rtm.activeUserId, message.text))
    ){
      var cleanedMessage = message.text
        .replace(getTag(rtm.activeUserId), '')
        .replace(':', '')
        .substring(0, 2000)
        .trim();

      if(cleanedMessage){
        console.log('Dogefied: ' + cleanedMessage);
        rtm.sendMessage('``` \n' + doge(cleanedMessage) + '\n ```', message.channel);
      }
    }
  });

  rtm.start();
};

function getTag(id){
  return '<@' + id + '>';
};

function isDirect(userId, messageText){
  return messageText && messageText.indexOf(userId) > -1;
};
