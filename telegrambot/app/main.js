const request = require('request');

const Telegraf = require('telegraf');

//const uuid = require('uuid');

const bot = new Telegraf(process.env.BOT_TOKEN,
  {
    proxy: process.env.HTTP_PROXY
  });

const wfs = require("webdav-fs")(
  process.env.WEBDAV_URL,
  process.env.WEBDAV_USER,
  process.env.WEBDAV_PWD
);

const telegramPath = (process.env.WEBDAV_PATH !== undefined ? process.env.WEBDAV_PATH : "/Telegram/");
/*
var createClient = require("webdav");

var w = createClient(
  process.env.WEBDAV_URL,
  process.env.WEBDAV_USER,
  process.env.WEBDAV_PWD
);
*/

/*
bot.on('text', (ctx) => {
  
});
*/

bot.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Welcome to ' + process.env.TITLE + '!');
});

bot.command('hi', (ctx) => {
  console.log('hi', ctx.from);
  ctx.reply('Hi all!!');
});

bot.command('files', (ctx) => {
  console.log('files', ctx.from);
  var username = ctx.message.from.username;
  wfs.readdir(telegramPath + username + "/", function(err, contents) {
    if (!err && contents){
      var buttons = [];
      /*
      for (var i = 0; i < contents.length; i++){
        var fileStat = w.stat("/Telegram/" + contents[i]);
        ctx.reply(JSON.stringify(fileStat));
        
        if (fileStat.type == "file"){
          buttons.push(
            Telegraf.Markup.callbackButton(contents[i] + " (" + fileStat.size/1024 + "KB)", contents[i])
          );
        }
      }
      */
      for (var i = 0; i < contents.length; i++){
        buttons.push(
          Telegraf.Markup.callbackButton(contents[i] , username + "/" + contents[i])
        );
      }

      ctx.reply('There are ' + buttons.length + ' file/s.');
      ctx.reply('What file do you want to download?', Telegraf.Extra.HTML().markup((m) =>       
        m.inlineKeyboard(buttons, {
          columns: 3
        })
      ));
    }
    else{
      ctx.reply('There is no content.');
    }
  });
});

bot.action(/.+/, (ctx) => {
  console.log(ctx.match);
  ctx.answerCallbackQuery('Downloading ' + ctx.match[0] + '!');
  // If photo
 
  ctx.replyWithPhoto({
    source: wfs.createReadStream(telegramPath + ctx.match[0])
  });
  //Else If doc
  /*
  ctx.replyWithDocument({
    source: wfs.createReadStream(telegramPath + ctx.match[0])
  });
  */
});

bot.on('photo', (ctx) => {
  
    ctx.reply('I have received a photo, uploading to ' + process.env.TITLE + '..');
    var url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN + "/getFile?file_id=" + ctx.message.photo[ctx.message.photo.length - 1].file_id;
    upload(ctx, url);
    
});

bot.on('document', (ctx) => {
  
    ctx.reply('I have received a document, uploading to ' + process.env.TITLE + '..');
    var url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN + "/getFile?file_id=" + ctx.message.document.file_id;
    upload(ctx, url);
    
});

function upload(ctx, url){
  ctx.state.url = url;

  var username = ctx.message.from.username;
  
  request.get(ctx.state.url, function (error, response, body) {
    
    var data = "";
    if (!error && response.statusCode == 200) {
      data += body;
    } else {
      data += error;
    }

    console.log(data);

    var img = JSON.parse(data);
    var path = img.result.file_path;
    
    ctx.state.url = "https://api.telegram.org/file/bot" + process.env.BOT_TOKEN + "/" + path;
    
    var binaryRequest = require('request').defaults({ encoding: null });
  
    binaryRequest.get(ctx.state.url, function (error, response, body) {
      
      if (!error && response.statusCode == 200) {
        var arr = path.split('/');
        var photo_name = arr[arr.length - 1];
        
        wfs.readdir(telegramPath + username + "/", function(err, files){
          console.log("Folder '" + telegramPath + username + "/" + "' exists?");
          if (err){
            console.log("NO:" + err);
            wfs.mkdir(telegramPath + username + "/", function(err2){
              if (!err2){
                wfs.writeFile(telegramPath + username + "/" + photo_name, new Buffer(body), "binary", function(err3) {
                  if (err3){
                    console.error(err3.message);
                    ctx.reply(err3.message);
                  }
                  else{
                    ctx.reply(photo_name + ' uploaded to ' + process.env.TITLE + ' :) ');
                  }
                });
              }
              else{
                console.error(err2.message);
              }
            });
          }
          else{
            console.log("SI");
            wfs.writeFile(telegramPath + username + "/" + photo_name, new Buffer(body), "binary", function(err2) {
              if (err2){
                console.error(err2.message);
                ctx.reply(err2.message);
              }
              else{
                ctx.reply(photo_name + ' uploaded to ' + process.env.TITLE + ' :) ');
              }
            });
          }
        });
      }
      else{
        ctx.reply('Something wrong :( ');
      }
    });    
  });
}

const express = require("express");
const app = express();

if (process.env.TELEGRAM_CALLBACK=="true")
{
  console.log("Webhook");
  app.use(bot.webhookCallback('/fujitsutelegrambot'));
}
else{
  try{
    console.log("Polling");
    bot.startPolling();
  }
  catch (ex){
    console.error(ex);
  }
}

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('main', { 
    title: 'Fujitsu CNETS Storage Sample', 
    message: 'Chatbot App to communicate with our CNETS Storage Solution and upload files',
    environment: JSON.stringify(process.env)
  }); 
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port '+ (process.env.PORT !== undefined ? process.env.PORT : 3000) +'!');
});