require('node_modules/dotenv').config()
const fetch = require('node-fetch')
const {MessageCollector, Client , MessageEmbed, MessageAttachment} = require("discord.js");
const getEmojis  = require('discordjs-getemojis');
const prefix='lp '
const client= new Client(); 
//& badshah cheap comments
const ui=[
    " hey girl are you below 15 , cause i am badshah",
    " you can be the admin of ui :smirk: if ur a gal",
    " aukat ha toh raid lau",
    " tu vc ake lad , chaaiye merese mic on ho na ",
    " inf ke bando ke bharose chalta hu mein ",
    " hey are you a girl , cause im a boy",
    " job type - pro discord-er",
    " chup kr mein google se gali copy paste krdunga ", 
    " haters op feel karo",
    " name mera badshah ha , hu main fattu hee :smirk:",
]

client.on("message", (msg) => {
    if(msg.content.includes("xd")){
        msg.reply("ecs-dee")
    }
})


let helloSet = new Set()


//!taj mode woh bond na mardu wala scene 
client.on("message", (msg) => {
    if(msg.content.startsWith(prefix+"taj")){ 
    let msgSentDate = Date.now();
    const args= msg.content.split(' ').slice(2);
    let topic=args.join(' ')    
        msg.delete()
        msg.channel.send(`*Bond ni marde ${topic} di* ~||<@${msg.author.id}>|| `)
}})


client.on("ready",()=>{
     client.user.setActivity('Aadit crying while making the bot', ({ type: 'LISTENING' }));
     console.log(`${client.user.tag} has logged in`);
})


//! emoji collector 
client.on("message", (msg) => {
    if(msg.content.startsWith(prefix+"-react")){ 
        // function sendSry() {
        //     msg.channel.send(" es channel te nahi haiga oh message ")
        // }
        let args=msg.content.split(' ').slice(2)
        const messageId = args[0]
        args=msg.content.split(' ').slice(3)
        console.log(args)
        const emojis=args
        let i=0
        msg.channel.messages.fetch(messageId)
        .then(function (msg) { 
            if(emojis.length==1){
                msg.react(emojis[0])
            }else{
                for(let i =0;i< emojis.length;i++){
                    msg.react(emojis[i])
                }
            }
        })
        .catch(console.log("cld send"))
}})


//! make this id based
client.on("message", (msg) => {
    if(msg.content==prefix+"24/7"){
        const channel = client.channels.cache.get("867011971018391627");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            msg.reply(" vc join krlia zi ")
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        });        
    }
})


//! ui wala badshah fudu
client.on("message", (msg) => {
    if(msg.content==prefix+"ui mode"){
        const randomElement = ui[Math.floor(Math.random() * ui.length)];
        msg.reply(randomElement+" ~ badshah ui wala")
    }
})


client.on("message", (msg) => {
    if(msg.content==prefix+"leave"){
        const channel = client.channels.cache.get("867011971018391627");
        msg.guild.me.voice.channel.leave();
        msg.reply("vc leave krta zi , hor kush ?")
    }
})


client.on("message", (msg) => {
    if(msg.content==prefix+"smirk"){
        msg.delete()
        msg.channel.send(" :smirk: ")
    }
})


//! welcome message  
const channelId="867011971018391626"
client.on("guildMemberAdd",(member)=>{
    const message = `<@${member.id}> has joined the server :joy: !`
    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
})


client.on("message", (msg) => {
    if(msg.content=="lp"){
        msg.channel.send(`<@${"855049378330837002"}> `+"\n"+` Check <#${"867777962404478976"}> for command list >,\n Made by <@${"730722211354378300"}>`)
    }
})

//! bai bia 
client.on("guildMemberRemove", member => {
    const welcomeChannel = member.guild.channels.cache.get(channelId) 
    welcomeChannel.send(`${member} has left the server!`)
})

//!dev 
client.on("message", (message) => {
    if(message.content==prefix+"owner"){
        message.channel.send(` Aadit#1280 is the creator of this bot`)}
    })

//!help command
client.on("message",(message)=>{
    if(message.content.startsWith(prefix+"help")){
    const helpEmbed=new MessageEmbed()
    .setTitle("little punjab walo ka bot hein")
    .setDescription("COMMAND HELP LIST ABHI BNA NI HEIN TOH RUKO")
    message.channel.send(helpEmbed)
}})

//! jokes api 
client.on("message",(message)=>{
    if(message.content.startsWith(prefix+"joke")){
        // fetch('')
        //    .then(resp=>resp.json())
        //    .then(joke=>console.log(joke))
        async function fetchJoke(){
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const responce = await response.json();
            let joke = responce
            let jokeEmbed=new MessageEmbed()   
            .setTitle(joke.setup)
            .setDescription(joke.punchline)
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmRIvATbIVvTCFj5DRWX78rzjabFm705xJQ&usqp=CAU')
            message.channel.send(jokeEmbed)            
        }
        fetchJoke()
        // let setup=joke.setup
        // let punchline = joke.punchline
        //    let jokeEmbed=new MessageEmbed()
    }})

//     //! image search thingy 
//     client.on("message",(message)=>{
//         if(message.content.startsWith(prefix+"image")){
//             let lastWord=message.content.split(' ')
//             let last=lastWord[-1]            
//             fetch(`https://pixabay.com/api/?key=22124224-952c4bb6db97bee04a9f70044&q=${message.content}&image_type=photo`)
//         }})
        
        //! online members 
client.on("message",(message)=>{
        if(message.content==prefix+"online"){
                message.channel.send(`${message.guild.members.cache.filter(member => member.presence.status !== "offline").size} people are online`)
            }
})

//! offline members 
client.on("message",(message)=>{
    if(message.content==prefix+"offline"){
        message.channel.send(`${message.guild.members.cache.filter(member => member.presence.status !== "online").size} people are offline`)
    }
})

// ! checking for role 
client.on("message", (message) => {
    if(message.content==prefix+"power"){
        message.channel.send(`you need to have the  <@&${867014938773422100}> for powers `)
    }} )
    
    //! author  
    client.on("message",(message)=>{
        if(message.content==prefix+"author") {
            message.channel.send(`<@${message.author.id}>`);
        }
    })
    
//! new cmd 
client.on("message", (msg) => {
    if(msg.content.startsWith(prefix+"news")){
        async function fetchNews(topic,msg){
            const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=2021-07-21&to=2021-07-21&sortBy=popularity&apiKey=f5e7e2fb6e094cffb475cfbaa339cdf5`);
            const responce= await response.json();
            let joke=responce
            if(joke.totalResults>=3){
                for( let i=0;i<1;i++){ 
                    let author =JSON.stringify(joke.articles[i].author) 
                    author=author.replace(/\\/g,'')
                    let title=JSON.stringify(joke.articles[i].title)
                    title=title.replace(/\\/g,'')
                    let url= JSON.stringify(joke.articles[i].url)
                    url=url.replace(/\\/g,'')
                    let content=JSON.stringify(joke.articles[i].content)
                    content.length>=500 ? content=content.slice(0,500): console.log("np");
                    content = content.replace(/\\/g,'')
                    client.channels.cache.get("867740195041968128").send("\n\n\n------------------------------------------------\n\n"+("News on the topic- "+(topic)+"\n\n"+("Author- "+author)+"\n\n"+("Title- "+title)+"\n\n"+("Content- "+content)+"\n\n Click here to read the rest -  "+(url)+"\n\n\n\n --------------------------------"))
                    msg.reply(`message sent in <#${"867740195041968128"}>`)
                    }
            }
            else{
                msg.channel.send(" sorry zi , no news was found on this topic")
            }
            // let order=joke.map(function(j){
            // })
            // function sendMessage(joke){
            //     let jokeEmbed=new MessageEmbed() 
            //     .setTitle(joke.title+" by~"+joke.author)
            //     .setDescription(joke.content)
            //     .setThumbnail(joke.urlToImage)
            //     msg.channel.send(jokeEmbed)
            // }  
        }
        const args= msg.content.split(' ').slice(2);
        let topic=args.join(' ')    
        fetchNews(topic,msg)
    }    
})

//! respct cmd make fron the 22ji code
client.on("message", (msg) => {
    if(msg.content.startsWith(prefix+"respect")){ 
        const payRespect = msg.mentions.members.first().user.username;
var mess = msg.channel.send(
    payRespect + " nu ejjat dewo mittro\n"
);

// Total number of people who paid respect
var paidRespectTotal = 0; // Starting at -1 because bot will react as well

// Listening to bot's pay respect message
mess.then(
    mess => {
        // React so users only need to press the emoji
        mess.react("🇫");
        // Filter F reaction ===[BOT'S REACTION IS BEING DELETED BY THIS INSTEAD OF NOT ALLOWING USER TO REGISTER PRESSING AGAIN]
        const filter = (reaction, user) => {
            return ['🇫'].includes(reaction.emoji.name) && user.id !== "855049378330837002";
        }
        // Checking who reacted
        let collector = mess.createReactionCollector(filter, {time: 20000})
        collector.on('collect', (reaction, collector) => {
            reaction.users.cache.forEach((val,key,map) => {pressedF = val.username})
            if (reaction.emoji.name === "🇫") {
                mess.channel.send(pressedF + " ne " + payRespect + " nu ejjat ditti!")
                paidRespectTotal++;
            }
            // Removing bot's reaction
            if (paidRespectTotal === 1) {
                reaction.users.remove("855049378330837002");
            }
        })
        setTimeout( () => {msg.channel.send(" respect den da taim finished")}, 20005)
    }
)
}
}
);


//! bored command
client.on("message", (msg) => {
    if(msg.content==prefix+"bored"){ 
        async function fetchBored(msg){
            const api=await fetch("http://www.boredapi.com/api/activity/")
            const responce= await api.json();
            let joke=responce
            let boredembed = new MessageEmbed()
            .setTitle("Heres sth u can do")
            .setDescription(joke.activity)
            .setAuthor(`<@${msg.author.username}>`)
            msg.channel.send(boredembed)
        }       
    
    fetchBored(msg)
}})


//! ship command
        client.on("message",(message)=>{
            if(message.content.startsWith(prefix+"ship")){
               
                let user=message.mentions.users.first()
                let RN=Math.floor(Math.random()*100)+1
                if(!user){
                    message.channel.send(" please mention a user to ship you with ")
                    // random
                }
                else {
                const embed=new MessageEmbed()
                .setTitle(`Chemistry ${RN}% 💚 `)
                .setDescription(`${message.author} shipped with user ${user}`) 
                message.channel.send(embed)
                }
            }
        })

        // //* mod powers  ----------------------------
// //*----------------------------
client.on("message", (message) => {
    if(message.content.startsWith(prefix+"purge")){
        if (message.member.roles.cache.some(role => role.id ==867014938773422100)) {
            const args= message.content.split(' ').slice(2);
            const amount=args.join(' ')
            if(!amount){ 
                message.channel.send(`<@${message.author.id}> please enter an amount `)
            }
            else {                
                if(isNaN(amount)){
                    message.channel.send(`<@${message.author.id}> Number enter krna v ne aunda ? `)
            }
            else {
                if(amount > 100) { 
                    message.channel.send(" free hosting te laga bot , enter less 100 values ")
                }
                else { 

                    if(amount < 1){ 
                        message.channel.send(" ig the time has come for you to transfer ur role to someone who deserves it \n who tf deletes *0* messages")
                        
                    }
else {
    async function ok(){
        await message.channel.messages.fetch({ limit: amount}).then(messages => { // Fetches the messages
            message.channel.bulkDelete(messages) 
        });
    message.channel.send(" krte *zi* message delete ")
    .then(function(message){
        message.react("🙏🏾")
        message.delete({timeout:2000})
    })    }
    ok()
}
            }
            }
            }         
        }   
}})

//! random ping ui 
    client.on("message", (message) => {
        if(message.content.startsWith(prefix+"random ping")){
            if (message.member.roles.cache.some(role => role.id == 867014938773422100)) {
            const args= message.content.split(' ').slice(3);
            const amount=args.join(' ')    
            const randomuser = message.guild.members.cache.array();
            function randomPing(){
                const randomElement = randomuser[Math.floor(Math.random() * randomuser.length)];
                message.channel.send([randomElement])
            }
            if(!amount){ 
                message.channel.send(`<@${message.author.id}> please enter an amount `)
            }
            else {
                
                if(isNaN(amount)){
                    message.channel.send(`<@${message.author.id}> Number enter krna v ne aunda ? `)
            }
            else {
                if(amount > 100) { 
                    message.channel.send(" free hosting te laga bot , enter less 100 values ")
                }
                else { 
                    if(amount <= 1){ 
                        randomPing()
                    }
                    else {
for(let i=0;i<amount;i++){
    randomPing()
}      
} 
}
}}}
else {
message.channel.send(`you need to have the  <@&${867014938773422100}> for powers `)
}}})

//! 
client.on("message", (msg) => {
    if(msg.content=="lp bund marlo"){
        msg.reply(" apni marlo zi")
    }
})

//! anonymouse mod power 
client.on("message", (message) => {
    if(message.content.startsWith(prefix+"-m")){ 
        // message.channel.send(` <@${message.author.id}>`)
        if (message.member.roles.cache.some(role => role.id == 867014938773422100)) {
        const args= message.content.split(' ').slice(2);
        let messageC=args.join(' ')    
        let CONFESs=new MessageEmbed()   
         .setTitle("sent by the staff")
         .setDescription(messageC)              
        let filter = m => m.author.id === message.author.id
        message.channel.send(" ARE you sure you want to send this message to general chat").then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
              })
              .then(message => {
                message = message.first()
                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                    client.channels.cache.get("867281008101687296").send(CONFESs)
                    message.channel.send(`message sent to <#${"867281008101687296"}> anonymously  `)
                    .then({timeout:3000})
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                  message.channel.send(`Terminated`)
                } else {
                  message.channel.send(`Terminated: Invalid Response`)
                }
              })
              .catch(collected=>{
                  message.channel.send(" Time out bruh ")
              })
            })
        }
        else{ 
            message.channel.send(`you need to have the  <@&${867014938773422100}> for powers `)
}}})
//         client.on("message", (m) => {
//             collector.on('collect', m => {
//                 if(m.content.startsWith("yes")){
//                     const args= m.content.split(' ').slice(2);
//                     const messageC=args.join(' ')    
//                     const contentOfMessage=messageC;
//                     let CONFESs=new MessageEmbed()   
//                     .setTitle("This message has been sent by one of the staff members")
//                     .setDescription(contentOfMessage)
//                     client.channels.cache.get("867281008101687296").send(CONFESs)
//                 }
//                 else{
//                     m.channel.send("message not being sent")
//                 }
//             }                
//             )
//         })
//     }
// }
// )

//! mute role add and remove both 
client.on("message", (message) => {
    if(message.content.startsWith(prefix+"mute")){ 
        if (message.member.roles.cache.some(role => role.id == 867014938773422100)) {
        }}})


//! 
client.on("message", (msg) => {
    if(msg.content.startsWith(prefix+"kick")){
        if (msg.mentions.members.first()) {
            try {
                msg.members.mentions.first().kick();
                msg.reply("member was kicked , oof ")
            } catch {
                msg.reply("maybe the person is an admin or i dont have the powers ");
            }
        } else {
            msg.reply("mention someone to be kicked outta this server ");
        }  
}})
//sdfsdfsdf

const auto_responces=[
    [["bc"],["gal ne kadni zi"]],[["nigger"],["na zi dont use the (n) word"]],[["bhai"],["koi kise da bro ne haiga ethe"]],[["badshah"],["ui ala fattu :smirk: "]],[["creator"],[" this bot is made by Aadit :smirk: "]],[["kidda"],["main ta vadia 22 tuc sunao "]],[["nigga"],["na zi dont use the (n) word"]],[["how are you"],[" main ta vadia a , wbu"]]
]


client.on("message", (msg) => {
    const content=msg.content;
    for(let i =0;i<auto_responces.length;i++){ 
        if(content.toLowerCase().includes(auto_responces[i][0])){
            if((Math.floor(Math.random() * 100) + 1)>50){
                                msg.reply(auto_responces[i][1])
            }
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)
