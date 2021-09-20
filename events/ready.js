const Moment = require('moment')
const Discord = require('discord.js')

  module.exports = client => {
  
    const aktiviteListesi = [
        "CodeMareFi Gelişmiş V12 Kayıt Altyapı",
        "https://codemarefi.blogspot.com",
        "İyi kullanımlar"
    ]

    client.user.setStatus('ONLİNE')
  
    setInterval(() => {
      const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
      client.user.setActivity(aktiviteListesi[Aktivite])
    }, 7000)
  }