import { Wechaty } from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'
import login from './model/login'
import message from './model/message'

async function main() {
  const bot = new Wechaty({ name: 'my-bot-name' })

  bot
    .on('scan', (qrcode: string | number | boolean, status: any) => {
      console.log(`Scan QR Code to login: ${status}\n`)
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    })
    .on('login', (user: any) => login(bot, user))
    .on('message', (msg: any) => message(bot, msg))
  await bot.start()
}

main()
  .catch(console.error)