// http://poetry.apiopen.top/sentences
import request from 'request'
import config from '../config'

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
      if (text == '来句名言') {
        request('http://poetry.apiopen.top/sentences', async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let res = JSON.parse(body)
            await room.say(res.result.name)
          }
        });
      }
      if (contactName != config.selfName && text.indexOf('@泛盈科技-刘冰') != -1) {
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
    if (text.indexOf('emoji') != -1) {
      await contact.say('求求你不要再发表情了！')
    }
    if (text == '来句名言') {
      request('http://poetry.apiopen.top/sentences', async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let res = JSON.parse(body)
          await contact.say(res.result.name)
        }
      });
    }
    if (contactName != '泛盈科技-刘冰') {
      var str = encodeURI(text);
      request(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${str}`, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let res = JSON.parse(body)
          await contact.say(res.content)
        }
      });
    }
  }
}