export const Message = (type) => {
    if (type) {
        var randomItem = Math.floor(Math.random() * trueMessage.length)
        console.log(randomItem)
        return trueMessage[randomItem]
    } else {
        var randomItem = Math.floor(Math.random() * falsMessage.length)
        console.log(randomItem)
        return falsMessage[randomItem]
    }
}


const trueMessage = [
    "آفرین ستون گنگ من",
    "حرف نداری پسر",
    "خداوکیلی صد تومن میدم!",
    "روزی چند ساعت میخونی؟",
    "حرف نداشت",
    "عالی بودی ",
    "اوه، ترکوندی",
    "ابرو ببینم بعدی رو چیکار میکنی",
    "این آسون بود اگه زرنگی بعدی رو جواب بده",
    "من دیگه حرفی ندارم",
]


const falsMessage = [
    "تبریک، خراب کردی آبم قطعه",
    "تو مخت چیه؟ ",
    "خراب کردی دوکی",
    "مهندس اشتباه زدی",
    "اشکالی نداره بعدی درست جواب بده",
    "فدا سرت",
    "برو ببینم بعدی رو چه میکنی",
    "رفیق تر زدی",
]