// http://poetry.apiopen.top/sentences
const mrmy = require('../local/mrmy.json')
import request from 'request'
import config from '../config'
import { FileBox }  from 'file-box'

export default async (bot: any, msg: any) => {
  // console.log(`Message: ${message}`)
  let room = msg.room()
  let topic = ''
  if (room) {
    topic = await room.topic()
  }
  const contact = msg.talker()
  const contactName = contact.name()
  const text = msg.text()

  console.log(`这个群（${topic}）里的这个逼（${contactName}）发来了：${text}`)

  if (room) {
    if (config.groupArray.indexOf(topic) != -1) {
        if (text == '来个色图') {
          request('https://www.mxnzp.com/api/image/girl/list/random?app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09', async (error, response, body) => {
            if (!error && response.statusCode == 200) {
              let res = JSON.parse(body)
              const i = Math.ceil(Math.random()*10);
              console.log("🚀 ~ file: message.ts ~ line 29 ~ request ~ i", i)
              const fileBox = FileBox.fromUrl(res.data[i].imageUrl)
              await room.say(fileBox)
            }
          });
          return 
        }
        if (msg.type() === 13) {
            const recalledMessage = await msg.toRecalled()
            if(recalledMessage) {
                const resMsg = (recalledMessage.toString()).split(']')[1]
                await room.say(`这个叼毛(${contactName})撤回了消息:${resMsg}`)
            }
            return
        }
        if (text == '来句名言') {
            const i = Math.ceil(Math.random()*330);
            await room.say(mrmy[i])
            return
        }
        
        if (await msg.mentionSelf()) {
            console.log('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)')
            var str = encodeURI(text.replace('@泛盈科技-刘冰', ''));
            request(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${str}`, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let res = JSON.parse(body)
                    await room.say(res.content)
                }
            });
        }
    }
  } else {
    if (text == '来句名言') {
        const i = Math.ceil(Math.random()*330);
        await contact.say(mrmy[i])
    }
    if (text == '来个色图') {
      request('https://www.mxnzp.com/api/image/girl/list/random?app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09', async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let res = JSON.parse(body)
          const i = Math.ceil(Math.random()*10);
          const fileBox = FileBox.fromUrl(res.data[i].imageUrl)
          await contact.say(fileBox)
        }
      });
      return 
    }
    if (msg.type() === 13) {
        const recalledMessage = await msg.toRecalled()
        const resMsg = (recalledMessage.toString()).split(']')[1]
        await contact.say(`这个叼毛(${contactName})撤回了消息:${resMsg}`)
    }
    // if (contactName != '泛盈科技-刘冰') {
    //   var str = encodeURI(text);
    //   request(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${str}`, async (error, response, body) => {
    //     if (!error && response.statusCode == 200) {
    //       let res = JSON.parse(body)
    //       await contact.say(res.content)
    //     }
    //   });
    // }
  }
}