
export default async (bot: any, user: any) => {
  console.log('========================  onLogin  ========================\n\n')
  console.log(`机器人信息：${JSON.stringify(user)}\n\n`)
  console.log(`
        \\           //
         \\         //
          \\       //
  ##DDDDDDDDDDDDDDDDDDDDDD##
  ## DDDDDDDDDDDDDDDDDDDD ##      
  ## DDDDDDDDDDDDDDDDDDDD ##      
  ## hh                hh ##      ##         ## ## ## ##   ## ## ## ###   ##    ####     ##     
  ## hh    //    \\    hh ##      ##         ##       ##   ##             ##    ## ##    ##
  ## hh   //      \\   hh ##      ##         ##       ##   ##             ##    ##   ##  ##
  ## hh                hh ##      ##         ##       ##   ##     ##      ##    ##    ## ##
  ## hh      wwww      hh ##      ##         ##       ##   ##       ##    ##    ##     ####
  ## hh                hh ##      ## ## ##   ## ## ## ##   ## ## ## ###   ##    ##      ###
  ## MMMMMMMMMMMMMMMMMMMM ##    
  ##MMMMMMMMMMMMMMMMMMMMMM##      微信机器人名为: [${user.payload.name}] 已经扫码登录成功了。\n\n
  `)
  const self = await bot.Contact.find({ name: 'A   . 阿冰' })
//   const selfRoom1 = await bot.Room.find({ topic: '又是崇拜大佬们的一天' })
//   const selfRoom2 = await bot.Room.find({ topic: 'IIIII' })
  await self.say('俺光头强又回来了!')
//   await selfRoom1.say('俺光头强又回来了!')
//   await selfRoom2.say('俺光头强又回来了!')
}