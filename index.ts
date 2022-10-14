import { WechatyBuilder } from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'
import login from './model/login'
import message from './model/message'

async function main() {
    const bot = WechatyBuilder.build({
        name: 'puppet-wechat',
        puppetOptions: {
            uos: true  // 开启uos协议
        },
        puppet: 'wechaty-puppet-wechat',
    })

    bot
        .on('scan', (qrcode: any, status: any) => {
            console.log(`Scan QR Code to login: ${status}\n`)
            QrcodeTerminal.generate(qrcode, {
                small: true
            })
        })
        .on('login', (user: any) => login(bot, user))
        .on('message', (msg: any) => message(bot, msg))
    await bot.start()
}

main().catch(console.error)