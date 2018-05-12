var TelegramBot=require('node-telegram-bot-api');
var token='569418321:AAHUpVyk0Gex6myrTDqjpXKuTtGMrWfA-Rw';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

// Простая команда без параметров.
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
    var photo = '499210.jpg';
    bot.sendPhoto(chatId, photo, {caption: 'Ух ты'});
});

var notes=[];
var notes[0]={'111','19:23','УРА '};
bot.onText(/\/напомни (.+) в (.+)/,function(msg,match){
		var userId=msg.from.id;
		var text=match[1];
		var time=match[2];
		notes.push({'uid':userId,'time':time,'text':text});
		bot.sendMessage(userId,'Отлично! Я обязательно напомню, если не сдохну :)');});
setInterval(function(){
	for(var i=0;i<notes.length;i++){
		var curDate=new Date().getHours()+':'+new Date().getMinutes();
		if(notes[i]['time']==curDate){bot.sendMessage(notes[i]['uid'],'Напоминаю, что вы должны: '+notes[i]['text']+' сейчас.');
		notes.splice(i,1);}
	}
},1000);
