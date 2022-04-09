const discord = require('discord.js');
const client = new discord.Client();
const disbut = require('discord-buttons')(client);
const cfg = require("./config.json");

client.on("message", async (msg) => {
let prefix = cfg.Bot.Prefix.find((x) => msg.content.toLowerCase().startsWith(x));
if (msg.content !== ""+prefix+"button" && msg.content !== ""+prefix+"buttons") return; 
if(!cfg.Bot.Owners.includes(msg.author.id) && !msg.guild.owner.user.id.includes(msg.author.id)) return

let ET = new disbut.MessageButton()
     .setStyle('red')
     .setLabel('Etkinlik Katılımcısı')
     .setID('ET')
let CK = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('Çekiliş Katılımcısı')
    .setID('CK')


msg.channel.send(`
Merhabalar sunucumuza tekrardan hoşgeldin demek istiyorum.

Aşşağıda ki butonları kullanarak rollerinizi alabilirsiniz fakat bu roller ne işe yarıyor ? 

**Etkinlik Katılımcısı: =>** Sunucumuz da yapılan bir çok etkinliğimizin duyurusu bu role erkenden duyuruluyor. Etkinliklere katılıp bizlerle eğlenmek istiyorsan bu rol tam seninlik.

**Çekiliş Katılımcısı: =>** Sunucumuz da yapılan nitro,spotify,netflix vb. özel platform üyelik çekilişlerine katılıp, sunucumuz da eğlenerek yeni üyelikler ve hediyeler kazanabilirsin.
`, {
        buttons: [CK, ET, ]
    })

})
client.on('clickButton', async (button) => {

    if (button.id === 'ET') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.ET)) {
            await button.clicker.member.roles.remove(cfg.Roles.ET)
            await button.think(true);
            await button.reply.edit("Etkinlik katılımcısı rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.ET)
            await button.think(true);
            await button.reply.edit("Etkinlik katılımcısı rolü üzerinize verildi.")
        }
    }
    if (button.id === 'CK') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.CK)) {
            await button.clicker.member.roles.remove(cfg.Roles.CK)
            await button.think(true);
            await button.reply.edit("Çekiliş katılımcısı rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.CK)
            await button.think(true);
            await button.reply.edit("Çekiliş katılımcısı rolü üzerinize verildi.")
        }}
   

    

})



client.on('ready', async () => {

client.user.setPresence({ activity: { name: cfg.Bot.Durum }, status: cfg.Bot.Status })
let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID)
if (VoiceChannelID) VoiceChannelID.join().catch(() => { })
console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı. ✔`)

});

client.login(cfg.Bot.Token).catch(() => console.error("Bota giriş yapılırken başarısız olundu!"));