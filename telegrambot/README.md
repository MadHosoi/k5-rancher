Source code of telegram bot named "fujitsunextcloudbot"

docker build -t madhosoi/telegrambot:v.2.0 --build-arg HTTP_PROXY=http://10.142.74.132:82 --build-arg HTTPS_PROXY=http://10.142.74.132:82 .

docker tag madhosoi/telegrambot madhosoi/telegrambot:latest

docker run --name telegrambot -p 83:83 -e HTTP_PROXY=http://esdiegoalfm:Fujitsu.0817@10.142.74.132:82 -e HTTPS_PROXY=http://esdiegoalfm:Fujitsu.0817@10.142.74.132:82 madhosoi/telegrambot:latest

https://api.telegram.org/bot406142839:AAEMc701k6jq3DHGNwsuk9Isoh4n1_iwwhk/setWebhook?url=

var request = require('request');
request({
		url: 'https://api.telegram.org/bot406142839:AAEMc701k6jq3DHGNwsuk9Isoh4n1_iwwhk/getUpdates?offset=0&limit=100&timeout=30',
        proxy: "http://esdiegoalfm:Fujitsu.0817@10.142.74.132:82"
      } , function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})