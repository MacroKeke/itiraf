// Repo Sahibi - github.com/sirincay
// Telegram - t.me/HusnuEhedov
////////////////////////////////////////
// Başka github hesabına yükləməy olmaz
// Reponu öz adına çıxaran peysərdi...!!!

const { Telegraf,Telegram  } = require('telegraf')
const config = require("./config")
const telegram = new Telegram(config.token)
const bot = new Telegraf(config.token)

bot.command('start', (ctx) => {
if (ctx.chat.type !== 'private') return null; // Əmirin sadəcə özəldə aktif olması üçün
        ctx.chat.id,
	ctx.replyWithHTML(`👋🏼 <b><i><a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a></i></b> ${config.startmesaj}`,			 
	    {
           reply_markup:{
            inline_keyboard:[
                [{text:"🔔 İtiraf Et",  callback_data:'etirafbuton'}]
            ]
        }
    }) 
})

bot.action('start', (ctx) => { 
        ctx.chat.id,
        ctx.deleteMessage()
	ctx.replyWithHTML(`👋🏼 <b><i><a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a></i></b> ${config.startmesaj}`,			 
	    {
            reply_markup:{
            inline_keyboard:[
                [{text:"🔔 Etiraf Et",  callback_data:'etirafbuton'}]
            ]
        }
    })
})


bot.action('etirafbuton', ctx=>{
	ctx.deleteMessage()
	ctx.telegram.sendMessage(ctx.chat.id, '✍️ *Buyurun,Etirafınızı Yazın*', { parse_mode: 'MarkdownV2' });
})


let etiraf;

bot.on("text", ctx => {
	if (ctx.chat.type !== 'private') return null; // Sadəcə özəldə aktif olsun deyə
	let kanalid = -1001611084249 // KANAL ID BURA YAZ
	etiraf = ctx.message.text
    ctx.telegram.sendMessage(ctx.from.id, `🗯 İtirafınız Nasıl Paylaşılsın?`, {
	reply_markup: {
		inline_keyboard: [
		
		[{text: '🔐 𝖠𝗇𝗈𝗇𝗂𝗆 ', callback_data: 'anonimetiraf'}],
		[{text: '🗣 𝖠𝖼̧ı𝗄 ', callback_data: 'aciqetiraf'}]
		
		]
	}	
})
})


bot.action("aciqetiraf", async (ctx, next) => {
	let aciqetiraf= `${config.aciqetirafeden} ${ctx.from.first_name}\n\n\n`
	let kanalid = -1001370335483 // KANAL ID BURA YAZ
	var seliqe = `${config.aciqyazdigietiraf} ${etiraf}\n\n\n`
	var sonda = `${config.sonluq}`
	ctx.telegram.sendMessage(kanalid, `${aciqetiraf+seliqe+sonda}`)
	ctx.deleteMessage()
	await ctx.replyWithHTML(`<a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> yazdığın itiraf için teşekkürler`,			 
	    {
            reply_markup: { 
                inline_keyboard: [
                    [{text: `${config.yenidenetiraf}`, callback_data:'etirafbuton' }]
                ]
            }
       }
    
     )
})

bot.action("anonimetiraf", async (ctx) => {
	let aciqetiraf = `${config.anonimetiraf} \n\n\n`
	let kanalid = -1001370335483 // KANAL ID BURA YAZ
	var seliqe = `${config.anonimyazdigietiraf} ${etiraf}\n\n\n`
	var sonda = `${config.sonluq}`
	ctx.telegram.sendMessage(kanalid, `${aciqetiraf+seliqe+sonda}`)
	ctx.deleteMessage()
	await ctx.replyWithHTML(`<a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> yazdığınız etirafa görə təşəkkürlər`,			 
	    {
            reply_markup: { 
                inline_keyboard: [
                    [{text: `${config.yenidenetiraf}`, callback_data:'etirafbuton' }]
                ]
            }
       }
    
     )
})


//Kiçik xətalar olduğu halda dayanmağa icazə vermir və bot davam edir
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun nickname alan kod
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Bot Aktif Oldu => ${bot.options.username}`)
})

bot.launch()

// Bu, botumuzu yavaşca dayandırmağa imkan verir.
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
