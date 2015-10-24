# Dogebot
Doge bot for Slack

## Setup
1. [Create new a bot in Slack](https://my.slack.com/services/new/bot) and get your Slack token.
2. Install the bot via `npm install dogebot -g` if you want to run it through the command line or with `npm install dogebot --save` if you want to run it from your project.
3. If you've installed the bot globally, just run `dogebot mySuperSecretSlackToken`.
4. If you're running it from your project, you can require and run it with:

```javascript
require('dogebot')('mySuperSecretSlackToken');
```

## Usage
You can message the bot directly or you can @mention it on a channel that it is on. You can invite the bot to as many channels as you want.

## Result
![dogebot in action](https://raw.githubusercontent.com/crisbeto/dogebot/master/result.gif)
