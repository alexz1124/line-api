const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {
    channelAccessToken: "8croVqr9h31+jj2hqQhJPdkxkoaAAjJ0bvAcQAAMsxJ5AYRuFRo4AvSZysJ+y05WwHAV3GrJ8ANB4oKz70"
        + "NyMVmiXdC/H3JBhXN8GXQjYAT1tQMwK6hIHp9G73JpdL13F0m7SC+gi/EpHX8Bj+dpqgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "a17d00a616be67a7f9d1be91a0ec0860"
}
const client = new line.Client(config)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type != "text") {
        return Promise.resolve(null)
    }

    if (event.message.text === "ขอเบอร์หน่อย") {
        return client.replyMessage(event.replyToken, {
            type: "sticker",
            packageId: "1",
            stickerId: "5"
        })
    }
    /*return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })*/
}

app.listen(port, () => console.log(`App running: ${port}`))