export const Message = (type) => {
    if (type === "endTime") {
        var randomItem = Math.floor(Math.random() * endTime.length)
        return endTime[randomItem]
    }else if (type) {
        var randomItem = Math.floor(Math.random() * trueMessage.length)
        return trueMessage[randomItem]
    } else {
        var randomItem = Math.floor(Math.random() * falsMessage.length)
        return falsMessage[randomItem]
    }
}


const trueMessage = [
    "آفرین ستون گنگ من",
    "حرف نداری پسر",
    "روزی چند ساعت میخونی؟",
    "حرف نداشت",
    "عالی بودی ",
    "اوه، ترکوندی",
    "ابرو ببینم بعدی رو چیکار میکنی",
    "این آسون بود اگه زرنگی بعدی رو جواب بده",
    "من دیگه حرفی ندارم",
]


const falsMessage = [
    "تبریک، باختی!",
    "تو مخت چیه؟ ",
    "خراب کردی دوکی",
    "مهندس اشتباه زدی",
    "اشکالی نداره بعدی درست جواب بده",
    "فدا سرت",
    "برو ببینم بعدی رو چه میکنی",
    "رفیق یه خورده دقت کن",
]

const endTime = [
    "وقتت تموم شد گلم!",
    "حاجی یه خورده سریعتر باش",
    "حلزون!!!",
    "خداوکیلی سریع تر بازی کن"
]