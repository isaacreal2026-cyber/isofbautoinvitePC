var scriptIsRunning,
    iconClicked,
    iconClicked2,
    commentSenderLoaded,
    c_c1,
    c_c2,
    c_c3,
    api = "undefined" != typeof chrome ? chrome : browser,
    debug = !1,
    userClickedOnIcon = !1;
function getElem(e, t) {
    if (t) {
        if ($(e).not(t).length > 0) return $(e).not(t);
        try {
            if ($("iframe").first().contents().find(e).not(t).length > 0)
                return $("iframe").first().contents().find(e).not(t);
            if ($("iframe").last().contents().find(e).not(t).length > 0)
                return $("iframe").last().contents().find(e).not(t);
        } catch (e) {}
    } else {
        if ($(e).length > 0) return $(e);
        try {
            if ($("iframe").first().contents().find(e).length > 0) return $("iframe").first().contents().find(e);
            if ($("iframe").last().contents().find(e).length > 0) return $("iframe").last().contents().find(e);
        } catch (e) {}
    }
    return t ? $(e).not(t) : $(e);
}
"undefined" != typeof _c1 && _c1 && (c_c1 = _c1),
    "undefined" != typeof _c2 && _c2 && (c_c2 = _c2),
    "undefined" != typeof _c3 && _c3 && (c_c3 = _c3);
var scanByNameNewUI = !1,
    inviteFailed = 0,
    likeButtonsProcessed = 0,
    stringForjQuerySearch = "",
    stringForjQuerySearch2 = "",
    currentFbLang = "",
    usedFbLang = "",
    newFBinviteDesign = !1,
    scrollingNewFBDesignClassDef = ".xb57i2i.xkhd6sd",
    scrollingNewFBDesignClass = ".xb57i2i.xkhd6sd",
    checkInsideScrolledWindow = "",
    searchInAllLangArray1 = Array(),
    searchInAllLangArray2 = Array(),
    tempreturnNumber = 0,
    tempreturnNumber2 = 0,
    newFBinviteDesignFromSourceCode = !1;
function isThisNewFbDesign2020() {
    return (
        "" != newFBinviteDesignFromSourceCode ||
            (((getElem("html").length > 0 &&
                ((getElem("html").attr("dir") && "ltr" == getElem("html").attr("dir")) ||
                    (getElem("body").attr("dir") && "ltr" == getElem("body").attr("dir")))) ||
                getElem(scrollingNewFBDesignClass).length > 0 ||
                getElem(scrollingNewFBDesignClassDef).length > 0) &&
                (newFBinviteDesignFromSourceCode = !0)),
        newFBinviteDesignFromSourceCode
    );
}
function getCurrentFbLang() {
    return (
        "" != currentFbLang ||
            (getElem("html").length > 0 &&
                getElem("html").attr("lang") &&
                getElem("html").attr("lang").replace("-", "").length > 1 &&
                ("en" == (currentFbLang = getElem("html").attr("lang").replace("-", "")) &&
                    1 == getElem("body.Locale_es_LA").length &&
                    (currentFbLang = "es"),
                1 == getElem("body.Locale_ar_AR").length && (currentFbLang = "ar"),
                1 == getElem("body.Locale_zh_HK").length && (currentFbLang = "zh-Hanh"))),
        currentFbLang
    );
}
var showEndNotifOnly2,
    inviteDuringShareCheck,
    inviteDuringShareCheck2,
    sharedI,
    sharedI2,
    sharedInputs,
    sharedInputs2,
    fbInviteBtnArrayLang = Array(
        "en",
        "it",
        "da",
        "de",
        "et",
        "es",
        "tl",
        "fr",
        "hr",
        "lv",
        "lt",
        "hu",
        "mt",
        "nl",
        "no",
        "nb",
        "pl",
        "pt",
        "ro",
        "sl",
        "sv",
        "fi",
        "tr",
        "cs",
        "el",
        "be",
        "bg",
        "mk",
        "ru",
        "uk",
        "he",
        "ar",
        "fa",
        "th",
        "ka",
        "cn",
        "jp",
        "ja",
        "ko",
        "vi",
        "hi",
        "zhHant",
        "zhHans",
        "zhHanh",
        "jv",
        "ms",
        "ca"
    ),
    fbInviteBtnArray = {
        en: {
            lan: "en",
            inv: ["Invite", "Invitar"],
            inv2: ["Invited", "Invitado", "Invitado(a)"],
            oth: ["Like", "Liked", "Follow", "Unfollow", "Me gusta", "Te gusta", "Seguir"],
            comment: ["Comment"],
            likeButton: ["Like", "Me gusta"],
            addFriend: ["Add Friend", "Agregar", "Añadir"],
            leaveAComment: ["Leave a comment"],
        },
        it: {
            lan: "it",
            inv: ["Invita"],
            inv2: ["Invitato/a", "Utente invitato"],
            oth: ["Mi piace", "Ti piace", "Segui"],
            comment: ["Commenta"],
            likeButton: ["Mi piace"],
            addFriend: ["Aggiungi"],
            leaveAComment: ["Lascia un commento"],
        },
        da: {
            lan: "da",
            inv: ["Inviter"],
            inv2: ["Inviteret"],
            oth: ["Synes godt om"],
            comment: ["Kommenter"],
            likeButton: ["Synes godt om"],
            addFriend: ["Tilføj ven"],
            leaveAComment: ["Skriv en kommentar"],
        },
        de: {
            lan: "de",
            inv: ["Einladen"],
            inv2: ["Gefällt dir", "Eingeladen"],
            oth: ["Like", "Gefällt dir", "Abonnieren"],
            comment: ["Kommentieren"],
            likeButton: ["Gefällt mir"],
            addFriend: ["Freund/in hinzufügen"],
            leaveAComment: ["Kommentar hinterlassen"],
        },
        et: {
            lan: "et",
            inv: ["Kutsu"],
            inv2: ["Kutsutud"],
            oth: ["Meeldib"],
            comment: ["Kommenteeri"],
            likeButton: ["Meeldib"],
            addFriend: ["Lisa sõbraks"],
            leaveAComment: ["Jäta kommentaar"],
        },
        es: {
            lan: "es",
            inv: ["Invitar"],
            inv2: ["Invitado", "Invitado(a)"],
            oth: ["Me gusta", "Te gusta", "Seguir"],
            comment: ["Comentar"],
            likeButton: ["Me gusta"],
            addFriend: ["Agregar", "Añadir"],
            leaveAComment: ["Dejar un comentario"],
        },
        tl: {
            lan: "tl",
            inv: ["Imbitahan"],
            inv2: ["Invited"],
            oth: ["I-like", "Liked"],
            comment: ["Mag-comment"],
            likeButton: ["I-like"],
            addFriend: ["I-add na Friend"],
            leaveAComment: ["Mag-iwan ng komento"],
        },
        fr: {
            lan: "fr",
            inv: ["Inviter"],
            inv2: ["Invité(e)", "En attente"],
            oth: ["J’aime", "J’aime déjà", "S’abonner"],
            comment: ["Commenter"],
            likeButton: ["J’aime"],
            addFriend: ["Ajouter"],
            leaveAComment: ["Laissez un commentaire"],
        },
        hr: {
            lan: "hr",
            inv: ["Pozivnica"],
            inv2: ["Pozvani"],
            oth: ["Sviđa mi se", "Sviđa vam se", "Follow"],
            comment: ["Komentar"],
            likeButton: ["Sviđa mi se"],
            addFriend: ["Dodaj"],
            leaveAComment: ["Napišite komentar"],
        },
        lv: {
            lan: "lv",
            inv: ["Uzaicināt"],
            inv2: ["Uzaicināti"],
            oth: ["Patīk"],
            comment: ["Komentēt"],
            likeButton: ["Patīk"],
            addFriend: ["Pievienot draugu"],
            leaveAComment: ["Pievienot komentāru"],
        },
        lt: {
            lan: "lt",
            inv: ["Invite"],
            inv2: ["Pakviesta"],
            oth: ["Patinka", "Patiko"],
            comment: ["Komentuoti"],
            likeButton: ["Patinka"],
            addFriend: ["Pridėti prie draugų"],
            leaveAComment: ["Komentuoti"],
        },
        hu: {
            lan: "hu",
            inv: ["Meghívás", "Ajánlás"],
            inv2: ["Meghívva", "Ajánlás elküldve"],
            oth: ["Tetszik", "Kedveli"],
            comment: ["Hozzászólás"],
            likeButton: ["Tetszik"],
            addFriend: ["Jelölés"],
            leaveAComment: ["Hozzászólás írása", "Követem"],
        },
        mt: {
            lan: "mt",
            inv: ["Invite"],
            inv2: ["Mistiedna"],
            oth: ["Jogħġobni", "Intogħġob"],
            comment: ["Ikkummenta"],
            likeButton: ["Jogħġobni"],
            addFriend: ["Żid bħala Ħabib/a"],
            leaveAComment: ["Ħalli kumment"],
        },
        nl: {
            lan: "nl",
            inv: ["Uitnodigen"],
            inv2: ["Uitgenodigd"],
            oth: ["Vind ik leuk"],
            comment: ["Opmerking plaatsen"],
            likeButton: ["Vind ik leuk"],
            addFriend: ["Toevoegen", "Toevoegen als vriend"],
            leaveAComment: ["Opmerking plaatsen", "Volgen"],
        },
        no: {
            lan: "no",
            inv: ["Inviter"],
            inv2: ["Invitert", "Inviterte"],
            oth: ["Liker", "Likt", "Lik dette", "Følg", "Slutt å følge"],
            comment: ["Kommenter"],
            likeButton: ["Liker"],
            addFriend: ["Legg til venn"],
            leaveAComment: ["Skriv en kommentar"],
        },
        nb: {
            lan: "nb",
            inv: ["Inviter"],
            inv2: ["Invitert", "Inviterte"],
            oth: ["Liker", "Likt", "Lik dette", "Følg", "Slutt å følge"],
            comment: ["Kommenter"],
            likeButton: ["Liker"],
            addFriend: ["Legg til venn"],
            leaveAComment: ["Skriv en kommentar"],
        },
        pl: {
            lan: "pl",
            inv: ["Zaproś"],
            inv2: ["Zaproszono"],
            oth: ["Lubię to!", "Polubiono"],
            comment: ["Komentarz"],
            likeButton: ["Like"],
            addFriend: ["Dodaj"],
            leaveAComment: ["Dodaj komentarz"],
        },
        pt: {
            lan: "pt",
            inv: ["Convidar"],
            inv2: ["Convidado"],
            oth: ["Gosto", "Gostou", "Curtir", "Curtiu", "Seguir"],
            comment: ["Comentar"],
            likeButton: ["Gosto"],
            addFriend: ["Adicionar"],
            leaveAComment: ["Deixe um comentário"],
        },
        ro: {
            lan: "ro",
            inv: ["Invită"],
            inv2: ["A primit invitaţie", "Invitat(ă)"],
            oth: ["Îmi place", "A apreciat"],
            comment: ["Comentează"],
            likeButton: ["Îmi place"],
            addFriend: ["Adaugă"],
            leaveAComment: ["Lasă un comentariu"],
        },
        sk: {
            lan: "sk",
            inv: ["Pozvať", "Povabi"],
            inv2: ["Invited"],
            oth: ["Páči sa mi to", "Páčilo sa mi to", "Všeč mi je"],
            comment: ["Komentovať"],
            likeButton: ["Páči sa mi to"],
            addFriend: ["Pridať priateľa", "Dodaj prijatelja"],
            leaveAComment: ["Pridať komentár"],
        },
        sl: {
            lan: "sl",
            inv: ["Pozvať", "Povabi"],
            inv2: ["Invited"],
            oth: ["Páči sa mi to", "Páčilo sa mi to", "Všeč mi je"],
            comment: ["Komentovať"],
            likeButton: ["Páči sa mi to"],
            addFriend: ["Pridať priateľa", "Dodaj prijatelja"],
            leaveAComment: ["Pridať komentár"],
        },
        sv: {
            lan: "sv",
            inv: ["Bjuda in"],
            inv2: ["Inbjuden"],
            oth: ["Gilla", "Har gillat"],
            comment: ["Kommentera"],
            likeButton: ["Gilla"],
            addFriend: ["Lägg till vän"],
            leaveAComment: ["Kommentera"],
        },
        fi: {
            lan: "fi",
            inv: ["Kutsu"],
            inv2: ["Kutsuttu"],
            oth: ["Tykkää", "Tykkäsi"],
            comment: ["Kommentti"],
            likeButton: ["Tykkää"],
            addFriend: ["Lisää kaveriksi"],
            leaveAComment: ["Jätä kommentti"],
        },
        tr: {
            lan: "tr",
            inv: ["Davet Et"],
            inv2: ["Davet Edildi"],
            oth: ["Beğen", "Beğendi"],
            comment: ["Yorum Yap"],
            likeButton: ["Beğen"],
            addFriend: ["Arkadaşı Ekle"],
            leaveAComment: ["Yorum bırak"],
        },
        cs: {
            lan: "cs",
            inv: ["Pozvat"],
            inv2: ["Pozván(a)"],
            oth: ["To se mi líbí", "Tohle se mi líbí"],
            comment: ["Okomentovat"],
            likeButton: ["To se mi líbí"],
            addFriend: ["Přidat přítele"],
            leaveAComment: ["Zanechte vzkaz"],
        },
        el: {
            lan: "el",
            inv: ["Πρόσκληση"],
            inv2: ["Έχει προσκληθεί"],
            oth: ["Μου αρέσει!", "Δήλωσε ότι του αρέσει"],
            comment: ["Σχόλιο"],
            likeButton: ["Μου αρέσει!"],
            addFriend: ["Προσθήκη"],
            leaveAComment: ["Αφήστε ένα σχόλιο"],
        },
        be: {
            lan: "be",
            inv: ["Запрасіць"],
            inv2: ["Запрошана"],
            oth: ["Падабаецца", "Liked"],
            comment: ["Каментаваць"],
            likeButton: ["Падабаецца"],
            addFriend: ["Дадаць да сяброў"],
            leaveAComment: ["Пакіньце каментарый"],
        },
        bg: {
            lan: "bg",
            inv: ["Invite"],
            inv2: ["Invited"],
            oth: ["Liked", "Харесва ми", "Харесване"],
            comment: ["Коментар"],
            likeButton: ["Харесване"],
            addFriend: ["Добавяне"],
            leaveAComment: ["Оставете коментар"],
        },
        mk: {
            lan: "mk",
            inv: ["Покани"],
            inv2: ["Invited"],
            oth: ["Liked", "Ми се допаѓа"],
            comment: ["Коментирај"],
            likeButton: ["Ми се допаѓа"],
            addFriend: ["Додај пријател"],
            leaveAComment: ["Остави коментар"],
        },
        ru: {
            lan: "ru",
            inv: ["Пригласить"],
            inv2: ["Приглашение отправлено", "Приглашен(-а)"],
            oth: ["Нравится", "Подписаться"],
            comment: ["Комментировать"],
            likeButton: ["Нравится"],
            addFriend: ["Добавить"],
            leaveAComment: ["Оставьте комментарий"],
        },
        uk: {
            lan: "uk",
            inv: ["Запросити"],
            inv2: ["Invited", "Запрошено"],
            oth: ["Liked", "Подобається"],
            comment: ["Коментувати"],
            likeButton: ["Подобається"],
            addFriend: ["Додати друга"],
            leaveAComment: ["Залишити коментар"],
        },
        he: {
            lan: "he",
            inv: ["הזמן"],
            inv2: ["הוזמן"],
            oth: ["לייק", "סימנת בלייק"],
            comment: ["תגובה"],
            likeButton: ["לייק"],
            addFriend: ["הוספה לחברים"],
            leaveAComment: ["השאירי תגובה"],
        },
        ar: {
            lan: "ar",
            inv: ["دعوة"],
            inv2: ["مدعو"],
            oth: ["أعجبني", "أعجبك"],
            comment: ["تعليق"],
            likeButton: ["أعجبني"],
            addFriend: ["add friend"],
            leaveAComment: ["كتابة تعليق"],
        },
        fa: {
            lan: "fa",
            inv: ["دعوت"],
            inv2: ["دعوت‌شده"],
            oth: ["پسندیدن", "پسندیده است"],
            comment: ["نظر"],
            likeButton: ["پسندیدن"],
            addFriend: ["دوست شوید"],
            leaveAComment: ["نظر بدهید"],
        },
        th: {
            lan: "th",
            inv: ["เชิญ"],
            inv2: ["เชิญแล้ว"],
            oth: ["ถูกใจ", "ถูกใจแล้ว"],
            comment: ["แสดงความคิดเห็น"],
            likeButton: ["ถูกใจ"],
            addFriend: ["เพิ่มเป็นเพื่อน"],
            leaveAComment: ["แสดงความคิดเห็น"],
        },
        ka: {
            lan: "ka",
            inv: ["მოწვევა"],
            inv2: ["მოწვეულია"],
            oth: ["Liked", "მოწონება", "მომწონს"],
            comment: ["კომენტარი"],
            likeButton: ["მომწონს"],
            addFriend: ["მეგობრის დამატება"],
            leaveAComment: ["დატოვეთ კომენტარი"],
        },
        cn: {
            lan: "cn",
            inv: ["邀請", "邀请"],
            inv2: ["已邀請", "已邀请"],
            oth: ["讚", "已說讚", "赞", "赞了", "讚好", "已讚好"],
            comment: ["留言"],
            likeButton: ["讚"],
            addFriend: ["加朋友"],
            leaveAComment: ["留言"],
        },
        zhHant: {
            lan: "zhHant",
            inv: ["邀請"],
            inv2: ["已邀請"],
            oth: ["讚", "已說讚"],
            comment: ["回應"],
            likeButton: ["讚"],
            addFriend: ["加朋友"],
            leaveAComment: ["留下回應"],
        },
        zhHans: {
            lan: "zhHans",
            inv: ["邀请"],
            inv2: ["已邀请"],
            oth: ["赞", "赞了", "关注"],
            comment: ["评论"],
            likeButton: ["赞"],
            addFriend: ["加为好友"],
            leaveAComment: ["发表评论"],
        },
        zhHanh: {
            lan: "zhHanh",
            inv: ["邀請"],
            inv2: ["已邀請"],
            oth: ["讚好", "已讚好", "追蹤"],
            comment: ["回應"],
            likeButton: ["讚好"],
            addFriend: ["加為朋友"],
            leaveAComment: ["留下回應"],
        },
        jp: {
            lan: "jp",
            inv: ["招待"],
            inv2: ["招待されています", "呼ばれとる人"],
            oth: ["いいね！", "「いいね！」しました", "ええやん！"],
            comment: ["コメントする"],
            likeButton: ["いいね！"],
            addFriend: ["友達になる"],
            leaveAComment: ["コメントする"],
        },
        ja: {
            lan: "ja",
            inv: ["招待"],
            inv2: ["招待されています", "呼ばれとる人"],
            oth: ["いいね！", "「いいね！」しました", "ええやん！"],
            comment: ["コメントする"],
            likeButton: ["いいね！"],
            addFriend: ["友達になる"],
            leaveAComment: ["コメントする"],
        },
        ko: {
            lan: "ko",
            inv: ["요청"],
            inv2: ["요청됨"],
            oth: ["좋아요"],
            comment: ["댓글 달기"],
            likeButton: ["좋아요"],
            addFriend: ["친구 추가"],
            leaveAComment: ["댓글 남기기"],
        },
        vi: {
            lan: "vi",
            inv: ["Mời"],
            inv2: ["Đã mời"],
            oth: ["Thích", "Đã thích"],
            comment: ["Bình luận"],
            likeButton: ["Thích"],
            addFriend: ["Thêm bạn bè"],
            leaveAComment: ["Viết bình luận"],
        },
        hi: {
            lan: "hi",
            inv: ["Invite", "आमंत्रित करें"],
            inv2: ["आमंत्रित", "Invited"],
            oth: ["आवडले", "आवडलेले", "पसंद करें", "पसंद किया", "লাইক করুন", "Liked", "પસંદ કર્યું", "પસંદ કરો"],
            comment: ["कमेंट करें"],
            likeButton: ["आवडले"],
            addFriend: ["मित्र जोडा"],
            leaveAComment: ["टिप्पणी करें"],
        },
        jv: {
            lan: "jv",
            inv: ["Ngundang"],
            inv2: ["Diundang"],
            oth: ["Seneng"],
            comment: ["Komentar"],
            likeButton: ["Seneng"],
            addFriend: ["Tambah Kanca"],
            leaveAComment: ["Ninggali tanggepan"],
        },
        ms: {
            lan: "ms",
            inv: ["Invite"],
            inv2: ["Dijemput"],
            oth: ["Suka", "Liked", "Ikut"],
            comment: ["Komen"],
            likeButton: ["Suka"],
            addFriend: ["Tambah Rakan"],
            leaveAComment: ["Tinggalkan komen"],
        },
        ca: {
            lan: "ca",
            inv: ["Convida"],
            inv2: ["Convidats"],
            oth: ["M'ha agradat", "Segueix"],
            comment: ["Comenta"],
            likeButton: ["M'agrada"],
            addFriend: ["Afegeix"],
            leaveAComment: ["Write a comment"],
        },
    },
    fbEmotionsBtnArray = {
        oldEmoClass: {
            like: [".sx_7afd17", ".sx_86b67d", ".sx_351704", ".sx_a971b3"],
            love: [".sx_48d270", ".sx_d97dc9", ".sx_59d6f8", ".sx_7e36d4"],
            haha: [".sx_ae9006", ".sx_8627fe", ".sx_dd8f5a", ".sx_45e823"],
            wow: [".sx_380365", ".sx_3c0ae5", ".sx_042cc2", ".sx_419b17"],
            sad: [".sx_237696", ".sx_26fc6a", ".sx_24bed0", ".sx_b43c4f"],
            care: [".sx_239a9d"],
            angry: [".sx_552061", ".sx_c1a7c1", ".sx_218204", ".sx_e08ca0"],
        },
        oldEmoText: {
            like: "reacted with Like",
            love: "reacted with Love",
            haha: "reacted with Haha",
            wow: "reacted with Wow",
            sad: "reacted with Sad",
            care: "reacted with Care",
            angry: "reacted with Angry",
        },
        newEmoLink: {
            like: [
                "kcvCNizVjn7sw",
                "dOJFaVZihS_",
                "XNiSml5lbzb",
                "fqb8rfFxpfX",
                "tc5IAx58Ipa",
                "L3l7S5zaUNIcxYJ4uUPCNDlXP",
                "lKwYrzcNLupv27",
                "1635855486666999",
            ],
            love: [
                "p59iYz6MDdtqgcTZw",
                "emi3_1IpGVz",
                "T0C85G0d1wU",
                "r4h1SXzlm0B",
                "MB1XWOdQjV0",
                "hCqkOc3spA_jeOHZBc-iWlwewzM",
                "jmJufFtJoVJCUklu",
                "1678524932434102",
            ],
            haha: [
                "fVK3zAMCRSiYtsWTpWSid0DJlPasg",
                "yzxDz4ZUD49",
                "4p2OacwLD66",
                "yMAXL0cdq9q",
                "bkP6GqAFgZ_",
                "qaYFNgTSXlvM4nCbmBfRzzGxNu8",
                "ZXzVvFJ_KvvB4",
                "115940658764963",
            ],
            wow: [
                "7MBZ2WKuJXvOK6WdOQfGi2Ixg9Sd",
                "qZOYbiV8BHS",
                "Sn9UlMA89ls",
                "7-3YmWpFyGJ",
                "tHO3j6Ngeyx",
                "FqjvZsZw6gGAhzX1fLhIoNydmCt",
                "4BTtfpxJ2KfylUgpq",
                "478547315650144",
            ],
            sad: [
                "o0cYKS_GprBBJlcwiBHomFx7hQ",
                "dhZwLwMz9U7",
                "jxIs0b3ls9g",
                "bltK5gY9gdu",
                "1eqxxZX7fYp",
                "bdRgKREz_QwfdpBYw58UhnXQ",
                "y8lxxQ9edz-6r6_o9YroQ",
                "908563459236466",
            ],
            care: ["QTVmPoFjk5O", "p_-PTXnrxIv", "C2OIiRxzS02cOuKEoo"],
            angry: [
                "BEent1vmcy8MXOQt0msew",
                "i6eZvvUMZW5",
                "Xz-3pbeBbW-",
                "3uLTUTwjP7O",
                "PByJ079GWfl",
                "Vvist1cde3YJ3mCMK0A6yjn-D-",
                "4Bm3UKlJBnXJyqwKsR",
                "444813342392137",
            ],
        },
    };
function getStringBtnByLang(e, t) {
    if (
        ("" == checkInsideScrolledWindow &&
            (getElem(scrollingNewFBDesignClass).length > 0
                ? (checkInsideScrolledWindow = scrollingNewFBDesignClass + " ")
                : getElem(scrollingNewFBDesignClassDef).length > 0 &&
                  (checkInsideScrolledWindow = scrollingNewFBDesignClassDef + " ")),
        e && e.length > 1 && fbInviteBtnArray[e])
    ) {
        for (i = 0; i < fbInviteBtnArray[e].inv.length; i++)
            t &&
                ("" != stringForjQuerySearch && (stringForjQuerySearch += ","),
                (stringForjQuerySearch =
                    stringForjQuerySearch +
                    checkInsideScrolledWindow +
                    'span>span:contains("' +
                    fbInviteBtnArray[e].inv[i] +
                    '")')),
                "" != stringForjQuerySearch2 && (stringForjQuerySearch2 += ","),
                (stringForjQuerySearch2 =
                    stringForjQuerySearch2 +
                    checkInsideScrolledWindow +
                    'span>span:contains("' +
                    fbInviteBtnArray[e].inv[i] +
                    '")');
        for (i = 0; i < fbInviteBtnArray[e].inv2.length; i++)
            t &&
                ("" != stringForjQuerySearch && (stringForjQuerySearch += ","),
                (stringForjQuerySearch =
                    stringForjQuerySearch +
                    checkInsideScrolledWindow +
                    'span>span:contains("' +
                    fbInviteBtnArray[e].inv2[i] +
                    '")')),
                "" != stringForjQuerySearch2 && (stringForjQuerySearch2 += ","),
                (stringForjQuerySearch2 =
                    stringForjQuerySearch2 +
                    checkInsideScrolledWindow +
                    'span>span:contains("' +
                    fbInviteBtnArray[e].inv2[i] +
                    '")');
        for (i = 0; i < fbInviteBtnArray[e].oth.length; i++)
            "" != stringForjQuerySearch2 && (stringForjQuerySearch2 += ","),
                (stringForjQuerySearch2 =
                    stringForjQuerySearch2 +
                    checkInsideScrolledWindow +
                    'span>span:contains("' +
                    fbInviteBtnArray[e].oth[i] +
                    '")');
    }
    return stringForjQuerySearch2;
}
function getTextForCurrentLanguage(e) {
    return fbInviteBtnArray &&
        fbInviteBtnArray[getCurrentFbLang()] &&
        fbInviteBtnArray[getCurrentFbLang()][e] &&
        fbInviteBtnArray[getCurrentFbLang()][e][0]
        ? fbInviteBtnArray[getCurrentFbLang()][e][0]
        : e;
}
function getNewInviteButtonsByText() {
    return getNewInviteButtonsByText2()
        .filter(function () {
            return $(this).parents('div[role="dialog"]').length > 0;
        })
        .closest('div[role="button"]')
        .not('div.fbNubFlyout[role="dialog"] div[role="button"],.uiLayer._31e div[role="dialog"] div[role="button"]')
        .filter(function () {
            var e = !0;
            return (
                $(this)
                    .parents("div")
                    .each(function () {
                        $(this).attr("aria-hidden") && "true" == $(this).attr("aria-hidden") && (e = !1);
                    }),
                e
            );
        });
}
function getNewInviteButtonsByText2() {
    if ("" != stringForjQuerySearch2 && getElem(stringForjQuerySearch2).length > 0)
        return getElem(stringForjQuerySearch2);
    var e = !1;
    if (
        ("" != getCurrentFbLang() &&
            fbInviteBtnArray[getCurrentFbLang()] &&
            ((e = !0), getStringBtnByLang(getCurrentFbLang(), !0)),
        stringForjQuerySearch.length > 0 &&
            stringForjQuerySearch2.length > 0 &&
            (getElem(stringForjQuerySearch).length > 0 || getElem(stringForjQuerySearch2).length > 5))
    )
        return (usedFbLang = getCurrentFbLang()), getElem(stringForjQuerySearch2);
    if (!e) {
        for (r = 0; r < fbInviteBtnArrayLang.length; r++)
            (stringForjQuerySearch = ""),
                (stringForjQuerySearch2 = ""),
                getStringBtnByLang(fbInviteBtnArrayLang[r], !1),
                (tempreturnNumber = getElem(stringForjQuerySearch2).length),
                stringForjQuerySearch2.length > 0 &&
                    tempreturnNumber > 0 &&
                    (console.log("we have FOUND possible lang:" + fbInviteBtnArrayLang[r]),
                    searchInAllLangArray1.push(fbInviteBtnArrayLang[r]),
                    searchInAllLangArray2.push(tempreturnNumber));
        if (searchInAllLangArray1.length > 0 && searchInAllLangArray2.length > 0) {
            for (tempreturnNumber = 0, tempreturnNumber2 = 0, u = 0; u < searchInAllLangArray2.length; u++)
                searchInAllLangArray2[u] > tempreturnNumber &&
                    ((tempreturnNumber = searchInAllLangArray2[u]), (tempreturnNumber2 = u));
            return (
                getStringBtnByLang(searchInAllLangArray1[tempreturnNumber2], !1),
                (usedFbLang = searchInAllLangArray1[tempreturnNumber2]),
                console.log("We think that this is the next LANGUAGE:" + usedFbLang),
                getElem(stringForjQuerySearch2)
            );
        }
    }
    return (
        (stringForjQuerySearch = ""),
        (stringForjQuerySearch2 = ""),
        getElem(
            checkInsideScrolledWindow +
                'span>span:contains("Invite"),' +
                checkInsideScrolledWindow +
                'span>span:contains("Invited")'
        )
    );
}
void 0 !== iconClicked && iconClicked && ((iconClicked2 = !0), (userClickedOnIcon = !0)),
    "undefined" != typeof showEndNotifOnly && showEndNotifOnly && (showEndNotifOnly2 = !0);
var _textR,
    _matches,
    _options,
    _random,
    antiSpamCommentSkipped = 0,
    totalShowModeClickedForRun = 0,
    doNotStartNowFix = !1;
1 != scriptIsRunning || ("undefined" !== iconClicked2 && iconClicked2) || (doNotStartNowFix = !0),
    (iconClicked = !1),
    (iconClicked2 = !1);
var _tempTimeoutLoc1,
    _tempTimeoutLoc2,
    _tempTimeoutLoc3,
    adsNewManagerScrollPartially,
    additionalCoefToScrollLess,
    scrollingLimitsInARow,
    commentLink,
    weAreInvitingFromShared,
    weAreScanningOnlyShared,
    weAreScanningOnlyInvites,
    _regEx = new RegExp(/{([^{}]+?)}/),
    creatorStudioPostOpenedForScrollArray = new Array();
(creatorStudioPostOpenedForScrollArray.length = 7),
    (creatorStudioPostOpenedForScrollArray[0] = new Array()),
    (creatorStudioPostOpenedForScrollArray[1] = new Array()),
    (creatorStudioPostOpenedForScrollArray[2] = new Array()),
    (creatorStudioPostOpenedForScrollArray[3] = new Array()),
    (creatorStudioPostOpenedForScrollArray[4] = new Array()),
    (creatorStudioPostOpenedForScrollArray[5] = new Array()),
    (creatorStudioPostOpenedForScrollArray[6] = new Array()),
    (creatorStudioPostOpenedForScrollArray[0].length = 0),
    (creatorStudioPostOpenedForScrollArray[1].length = 0),
    (creatorStudioPostOpenedForScrollArray[2].length = 0),
    (creatorStudioPostOpenedForScrollArray[3].length = 0),
    (creatorStudioPostOpenedForScrollArray[4].length = 0),
    (creatorStudioPostOpenedForScrollArray[5].length = 0),
    (creatorStudioPostOpenedForScrollArray[6].length = 0);
var ignoreScannedPosts = !1,
    postsIgnoredInArrowToStopScript = 0,
    FPa = !1;
if (document.location.href.indexOf("facebook.com") > -1 && !doNotStartNowFix && !showEndNotifOnly2) {
    if (!commentSenderLoaded) {
        var commentScript = document.createElement("script");
        commentScript.setAttribute("src", api.runtime.getURL("comment_sender.js")),
            document.head.appendChild(commentScript),
            (commentSenderLoaded = !0);
    }
    var _elsHelpCont, _timeCheckLimit;
    debug && console.log("We start the script now!");
    var _tab_ID,
        _realt,
        _time,
        _runMode,
        _fbe_number,
        _shared_p_liked,
        _shared_p_comm,
        _totalInvited,
        tab_ID,
        mtotalInvited,
        totalPostsProcessed,
        runMode,
        runModetext,
        nextPage,
        PagesCheckedText,
        try_after_limit,
        pauseAfterLimit,
        pauseAfterLimit2,
        pauseAfterLimit3,
        monthSave,
        showLessInfoDate,
        TimerDelayVar1,
        TimerDelayVar2,
        timerShowNotifEnd,
        itemElement4,
        posterFoundToChange2,
        posterFoundToChange3,
        shares_list_delete_days,
        inviteEvent,
        oneReportOnly = !1,
        fb_limit = 490,
        fb_limit_show_more_btn = 199,
        fb_limit_show_more_btn_add_sec = 0,
        fb_limit_multi = 490,
        fb_lim_this_page_counter = 0,
        MaxPostFound = 0,
        totalLikedCheck = -1,
        loadsWithNoInvite = 0,
        loadsWithNoWorkOnShares = 0,
        tryToLoad = 0,
        checkTwice = 0,
        locali = 0,
        limitreached = 0,
        pauseLastNumber = 0,
        localuse = 0,
        selectedpostsRun = 0,
        fmob = !1,
        photosTabRunAll = !1,
        tryAgainForFullScan = 0,
        FPactivation = !1,
        tryloadVar1 = 0,
        itemRemovedSharedScroll = !1,
        scanManySharedOnPage = -1,
        doNotCloseFirstRunSelectPostsVerif = !1,
        fixedStartOfI = 0,
        fixedMaxTries = 0,
        posterFoundToChange = !1,
        pageNameAdditionalCheck = "",
        obj = {};
    obj.msgListSentID = new Object();
    var elementUpdCommentText,
        fast_scan_loads,
        fast_scan,
        shares_reply_ignore_string,
        pageNameFixedByUser,
        TotalInvited,
        FirstInstalled,
        inputsInvites,
        inputsInvites2,
        loadMoreClicked,
        found,
        elsHelpCont,
        clickedForMore,
        inputsInvMore2,
        publishingToolInv,
        isNotificationTab,
        InsightsTabInv,
        publishingToolTotPost,
        publishingTabNumber,
        publishingToolElem,
        sharedPostsStuckCheck,
        elementUpd,
        psfTr,
        pslicID,
        psemailID,
        psNotif1,
        psNotif2,
        psexp,
        psrenewCanc,
        psmessagelast,
        psscr,
        pstype,
        psdura,
        psactive,
        pswork,
        psCurRunType,
        installID,
        psTimerSaveButton,
        psInvTot,
        psInvDay,
        psels,
        scrollQ = 0,
        invitedToEvent = 0,
        itemProcessed = 0,
        docHeight = 0,
        localtimeout = 10,
        temp_block_help = !1,
        multi_notif_page = !1,
        multi_random_order = !1,
        tryToChangePoster = !1,
        temp_random_array = new Array(),
        shares_reply_ignore_array = Array(),
        imgSharedCommentPoster = "",
        bigPostArray = Array(
            "0K",
            "1K",
            "2K",
            "3K",
            "4K",
            "5K",
            "6K",
            "7K",
            "8K",
            "9K",
            "0 K",
            "1 K",
            "2 K",
            "3 K",
            "4 K",
            "5 K",
            "6 K",
            "7 K",
            "8 K",
            "9 K",
            ".",
            ",",
            "0 K",
            "1 K",
            "2 K",
            "3 K",
            "4 K",
            "5 K",
            "6 K",
            "7 K",
            "8 K",
            "9 K"
        ),
        bigPostTabs = Array(),
        dateObj = new Date(),
        month = dateObj.getUTCMonth() + 1,
        day = dateObj.getUTCDate(),
        year = dateObj.getUTCFullYear(),
        currentTimeInSec = parseInt(Math.floor(Date.now() / 1e3)),
        ButtonClass = "_51sy",
        inputsComments = getElem("._2x4v", ".hidden_elem ._2x4v"),
        ID = "reaction_profile_browser1",
        timeout = 1e3,
        addText = "",
        canSKIPButton = 0,
        hadInvitedButton = 0,
        hadClickedMoreButton = 0,
        loopmaxtry = 0,
        uiMorePagerPrimary = 0,
        skip_post_setting = 0,
        share_put_likes = !1,
        likeSharedComments = !1,
        share_put_comments = !1,
        skip_Invite = !1,
        share_likes_limit = 300,
        share_comments_limit = 300,
        stop_on_captcha_shown = !0,
        postMoreUnderSameAccount = !1,
        do_not_check_who_comments2 = "",
        do_not_check_shared_my_name_skip = "",
        do_not_check_shared_my_name_s_Array = Array(),
        total_shared_posts_liked = 0,
        total_shared_posts_commented = 0,
        sharedPostIsCheckingNow = 0,
        sharedPostsHeight = 0,
        sharedMaxScroll = 0,
        skip_angry_emotion = !1,
        like_other_pages = !1,
        skip_haha_emotion = !1,
        skip_sad_emotion = !1,
        skip_like_emotion = !1,
        skip_love_emotion = !1,
        skip_wow_emotion = !1,
        scan_reactions_tabs = !1,
        scan_reactions_tabs_more1 = !0,
        name_comm_filter1 = "",
        accept_ashii_names_only = !1,
        ascii = /^[ -~]+$/,
        skip_no_profile_image = !1,
        slow_internet = !1,
        notif_other_tab = !1,
        namesFilter = Array(),
        lastlengthPosts = -1,
        publishingResetArray = !1,
        tryMoreToScroll = 0,
        lastphotoOpen = -1,
        checkOnceVideoPost = !0,
        weAreElaboratingAlbums = 0,
        total = 0,
        FriendsListHeight = 0,
        FriendsTry = 0,
        urllist1 = Array(),
        urllist2 = Array(),
        psThisScr = "mul",
        pstries = 0,
        psCurTimeStamp = parseInt(Math.floor(Date.now() / 1e3)),
        psdivtitle = "",
        psSaveButtonEnabled = !0,
        _psmaxtries1 = 0,
        _psmaxtries2 = 0,
        _psShowLicFrame = !0,
        _psLicScripts = {
            pro: "Script #1: Inviter PRO version",
            mul: "Script #1: Inviter Multi-Pages version",
            lit: "Script #2: Comments - LITE version",
            plu: "Script #2: Comments - PLUS version",
            max: "Script #2: Comments - MAX version",
            gro: "Script #3: for Groups",
            fp: "Full Pack: access to all our scripts",
        },
        _email = "info@invitelikecomment.com",
        monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        _txtreturn1 = "",
        isPhotoInviting = 0,
        inputsPhoto = $("#content_container ._2eec ._3x2f .rfloat ._4crj .ZZZZZZZZZZZZZZ"),
        inputsPhoto2 = $("#content_container ._2eec ._3x2f .rfloat ._4crj .ZZZZZZZZZZZZZ"),
        waitForLoad = 30,
        curr_timestamp = parseInt(Math.floor(Date.now() / 1e3)),
        _ret = "";
    function urlCode(e) {
        return (
            (_ret = e.trim()).indexOf("https://business.facebook.com/") > -1 &&
                (_ret = _ret.replace("https://business.facebook.com/", "|bf|")),
            _ret.indexOf("http://business.facebook.com/") > -1 &&
                (_ret = _ret.replace("http://business.facebook.com/", "|bf|")),
            _ret.indexOf("https://www.facebook.com/") > -1 && (_ret = _ret.replace("https://www.facebook.com/", "|f|")),
            _ret.indexOf("http://www.facebook.com/") > -1 && (_ret = _ret.replace("http://www.facebook.com/", "|f|")),
            _ret
        );
    }
    function urlDeCode(e) {
        return (
            (_ret = e).indexOf("|bf|") > -1 && (_ret = _ret.replace("|bf|", "https://business.facebook.com/")),
            _ret.indexOf("|f|") > -1 && (_ret = _ret.replace("|f|", "https://www.facebook.com/")),
            _ret
        );
    }
    function javascript_abort() {
        throw new Error("This is NOT an error. This is just to abort javascript during other tasks.");
    }
    function stopBreakIt() {
        (scriptIsRunning = 0),
            clearTimeout(loopTimerDelay),
            clearTimeout(TimerDelayVar1),
            clearTimeout(TimerDelayVar2),
            console.log("You stopped the script"),
            stopScript(api.i18n.getMessage("you_stop") + "\r");
    }
    if (-1 == window.location.href.indexOf("pages?fb-auto-invite=1")) {
        scriptIsRunning = 1;
        var popup = null;
        (mtotalInvited = 0),
            (totalPostsProcessed = 0),
            (runMode = 0),
            (runModetext = ""),
            (nextPage = 0),
            (PagesCheckedText = ""),
            (try_after_limit = !1),
            (pauseAfterLimit = !1),
            (pauseAfterLimit2 = 180),
            (pauseAfterLimit3 = 50),
            (InsightsTabInv = !1),
            (publishingToolTotPost = 0),
            (publishingTabNumber = 1),
            (sharedPostsStuckCheck = 0),
            (TotalInvited = 0),
            (FirstInstalled = 0),
            (showLessInfoDate = 0),
            (publishingToolInv = !1),
            (isNotificationTab = !1),
            (fast_scan_loads = 4),
            (fast_scan = !1),
            (inviteDuringShareCheck = !1),
            (inviteDuringShareCheck2 = !1),
            (_tempTimeoutLoc1 = 0),
            (_tempTimeoutLoc2 = 0),
            (_tempTimeoutLoc3 = 0),
            (adsNewManagerScrollPartially = 0),
            (additionalCoefToScrollLess = 1),
            (scrollingLimitsInARow = 0),
            (psfTr = 0),
            (psexp = 0),
            (psrenewCanc = 0),
            (pslicID = ""),
            (psemailID = ""),
            (psNotif1 = 1),
            (psNotif2 = 0),
            (psmessagelast = ""),
            (psscr = ""),
            (pstype = ""),
            (psdura = ""),
            (psactive = 0),
            (pswork = 0),
            (psCurRunType = 0),
            (installID = ""),
            (psInvTot = 0),
            (psInvDay = ""),
            (weAreInvitingFromShared = 0),
            (weAreScanningOnlyShared = !1),
            (weAreScanningOnlyInvites = !1),
            api.runtime.sendMessage({ type: "getTabId" }, function (e) {
                tab_ID = e.tabId;
            });
        var p1_1 = 3,
            p1_2 = 5,
            p2_1 = 3,
            p2_2 = 5,
            pc_1 = 10,
            pc_2 = 15,
            text_comm_shares = "",
            text_comm_shares2 = "",
            text_comm_shares3 = "",
            text_comm_shares4 = "",
            text_comm_shares5 = "",
            temp_text = "",
            randomNum = 0,
            fb_timeout_1 = 7e3,
            fb_timeout_2 = 2e3,
            fb_timeout_3 = 1500,
            fb_timeout_4 = 7e3,
            fb_timeout_5 = 1e4,
            fb_timeout_6 = 15e3,
            additional_script_pause = !0,
            check_post_first = !0;
        monthSave = 0;
        var loopTimerDelay,
            loop_PostsList = "1,2,3,4,5",
            loop_PostsListArray = new Array(),
            loop_currentPostJustForCounter = 0,
            loop_Pause = 5,
            reloadloop = !0,
            loop_skip_secondtime = !1,
            notloadtoomuch = !1,
            skip_if_no_buttons_after_first_loop = !1,
            normal_run_limitposts = 100,
            normal_run_limitNoInvGoNextPage = 100,
            normal_run_limitNoInvitePosts = 0;
        function getURLParameter(e) {
            return (
                decodeURIComponent(
                    (new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(
                        /\+/g,
                        "%20"
                    )
                ) || null
            );
        }
        function destroyPopupInfo() {
            (scriptIsRunning = 0),
                "undefined" != typeof popupInfo &&
                    popupInfo &&
                    popupInfo.parentElement &&
                    popupInfo.parentElement.removeChild(popupInfo),
                (popupInfo = null);
        }
        function reset_posts_elabList() {
            debug && console.log("Todo: reset saved lists!"),
                ((creatorStudioPostOpenedForScrollArray = new Array()).length = 7),
                (creatorStudioPostOpenedForScrollArray[0] = new Array()),
                (creatorStudioPostOpenedForScrollArray[1] = new Array()),
                (creatorStudioPostOpenedForScrollArray[2] = new Array()),
                (creatorStudioPostOpenedForScrollArray[3] = new Array()),
                (creatorStudioPostOpenedForScrollArray[4] = new Array()),
                (creatorStudioPostOpenedForScrollArray[5] = new Array()),
                (creatorStudioPostOpenedForScrollArray[6] = new Array()),
                (creatorStudioPostOpenedForScrollArray[0].length = 0),
                (creatorStudioPostOpenedForScrollArray[1].length = 0),
                (creatorStudioPostOpenedForScrollArray[2].length = 0),
                (creatorStudioPostOpenedForScrollArray[3].length = 0),
                (creatorStudioPostOpenedForScrollArray[4].length = 0),
                (creatorStudioPostOpenedForScrollArray[5].length = 0),
                (creatorStudioPostOpenedForScrollArray[6].length = 0),
                api.storage.local.set(
                    { creatorStudioPostOpenedForScrollArray: creatorStudioPostOpenedForScrollArray },
                    function () {}
                ),
                (document.getElementById("elPosts").innerHTML = "0");
        }
        function checkSpintaxFormatOk() {
            var e = 1;
            if (document.getElementsByName("text_comm_shares") && document.getElementsByName("text_comm_shares")[0])
                for (var t = 1; t < 6; t++)
                    if (
                        document.getElementsByName("text_comm_shares" + (1 != t ? t : ""))[0].value.toString().length >
                            0 &&
                        document.getElementById("share_put_comments").checked &&
                        1 == e &&
                        (
                            document
                                .getElementsByName("text_comm_shares" + (1 != t ? t : ""))[0]
                                .value.toString()
                                .match(new RegExp("{", "g")) || []
                        ).length !=
                            (
                                document
                                    .getElementsByName("text_comm_shares" + (1 != t ? t : ""))[0]
                                    .value.toString()
                                    .match(new RegExp("}", "g")) || []
                            ).length
                    ) {
                        alert(
                            "Spintax format error in field " +
                                t +
                                " (shared posts comments). Quntity of '{' is not the same as '}'.\r\nSTOP THE SCRIPT and check better the text you've inserted if you want to comment!"
                        ),
                            (e = 0);
                        break;
                    }
            return e;
        }
        function saveQuickVars() {
            if ((checkSpintaxFormatOk(), document.getElementById("p1_1"))) {
                if (
                    ((p1_1 = Number(document.getElementById("p1_1").value)),
                    (p1_2 = Number(document.getElementById("p1_2").value)),
                    p1_1 > p1_2)
                ) {
                    var e = p1_1;
                    (p1_1 = p1_2), (p1_2 = e);
                }
                if (
                    ((share_put_likes = document.getElementById("share_put_likes").checked),
                    (likeSharedComments = document.getElementById("likeSharedComments").checked),
                    (share_put_comments = document.getElementById("share_put_comments").checked),
                    (skip_Invite = !document.getElementById("skip_Invite2").checked),
                    (inviteDuringShareCheck = document.getElementById("inviteDuringShareCheck").checked),
                    (inviteDuringShareCheck2 = document.getElementById("inviteDuringShareCheck2").checked),
                    (ignoreScannedPosts = document.getElementById("ignoreScannedPosts").checked),
                    (pc_1 = Number(document.getElementById("pc_1").value)),
                    (pc_2 = Number(document.getElementById("pc_2").value)),
                    pc_1 > pc_2)
                ) {
                    e = pc_1;
                    (pc_1 = pc_2), (pc_2 = e);
                }
                (text_comm_shares = document.getElementsByName("text_comm_shares")[0].value.replace("% name", "%name")),
                    (text_comm_shares2 = document
                        .getElementsByName("text_comm_shares2")[0]
                        .value.replace("% name", "%name")),
                    (text_comm_shares3 = document
                        .getElementsByName("text_comm_shares3")[0]
                        .value.replace("% name", "%name")),
                    (text_comm_shares4 = document
                        .getElementsByName("text_comm_shares4")[0]
                        .value.replace("% name", "%name")),
                    (text_comm_shares5 = document
                        .getElementsByName("text_comm_shares5")[0]
                        .value.replace("% name", "%name")),
                    (temp_random_array.length = 0),
                    text_comm_shares.length > 1 && temp_random_array.push(text_comm_shares),
                    text_comm_shares2.length > 1 && temp_random_array.push(text_comm_shares2),
                    text_comm_shares3.length > 1 && temp_random_array.push(text_comm_shares3),
                    text_comm_shares4.length > 1 && temp_random_array.push(text_comm_shares4),
                    text_comm_shares5.length > 1 && temp_random_array.push(text_comm_shares5),
                    document.getElementsByName("fast_scan_loads") &&
                        document.getElementsByName("fast_scan_loads")[0] &&
                        (fast_scan_loads = document.getElementsByName("fast_scan_loads")[0].value),
                    document.getElementById("fast_scan") && (fast_scan = document.getElementById("fast_scan").checked),
                    api.storage.sync.set(
                        {
                            p1_1: p1_1,
                            p1_2: p1_2,
                            pc_1: pc_1,
                            pc_2: pc_2,
                            text_comm_shares: text_comm_shares,
                            text_comm_shares2: text_comm_shares2,
                            text_comm_shares3: text_comm_shares3,
                            text_comm_shares4: text_comm_shares4,
                            text_comm_shares5: text_comm_shares5,
                            share_put_likes: share_put_likes,
                            likeSharedComments: likeSharedComments,
                            share_put_comments: share_put_comments,
                            skip_Invite: skip_Invite,
                            inviteDuringShareCheck: inviteDuringShareCheck,
                            inviteDuringShareCheck2: inviteDuringShareCheck2,
                            fast_scan_loads: fast_scan_loads,
                            fast_scan: fast_scan,
                            ignoreScannedPosts: ignoreScannedPosts,
                        },
                        function () {}
                    ),
                    p1_1 < 1e3 && (p1_1 *= 1e3),
                    p1_2 < 1e3 && (p1_2 *= 1e3),
                    pc_1 < 1e3 && (pc_1 *= 1e3),
                    pc_2 < 1e3 && (pc_2 *= 1e3);
            }
        }
        function multiPageUniqueFunc(e, t, n, o, i, r, a, l) {
            api.storage.local.set(
                {
                    _tab_ID: tab_ID,
                    _realt: a,
                    _time: Math.floor(Date.now() / 1e3),
                    _runMode: n,
                    _fbe_number: t,
                    _shared_p_liked: o,
                    _shared_p_comm: i,
                    _totalInvited: r,
                },
                function () {
                    l || ((e = e.replace("&current_page=", "&rem=")), window.location.replace(e));
                }
            );
        }
        function mode1() {
            licWorking() &&
                ((doNotCloseFirstRunSelectPostsVerif = !0),
                getElem("#mediaManagerGlobalChromeBar").length > 0 &&
                    getElem("#mediaManagerGlobalChromeBar")[0].remove(),
                saveQuickVars(),
                (loop_PostsListArray.length = 0),
                (loop_PostsList = ""),
                (runMode = 1),
                (runModetext = api.i18n.getMessage("UI_9")),
                do1());
        }
        function mode2() {
            licWorking() &&
                ((doNotCloseFirstRunSelectPostsVerif = !0),
                getElem("#mediaManagerGlobalChromeBar").length > 0 &&
                    getElem("#mediaManagerGlobalChromeBar")[0].remove(),
                saveQuickVars(),
                forceRefresh(),
                destroyPopupInfo(),
                0 == loop_PostsList.length && (loop_PostsList = "1,2,3,4,5"),
                (runMode = 2),
                (runModetext = api.i18n.getMessage("UI_10")),
                setTimeout(function () {
                    startDowithDelay(0);
                }, 1500));
        }
        function start_mode3() {
            if (licWorking())
                if ((saveQuickVars(), 0 == urllist1.length)) alert(api.i18n.getMessage("UI_13"));
                else {
                    var e = urlDeCode(urllist1[0]);
                    "/" == e.slice(-1) && (e = e.slice(0, -1)),
                        e.indexOf("/posts/") > 0 ||
                            e.indexOf("/videos/") > 0 ||
                            e.indexOf("/watch/") > 0 ||
                            e.indexOf("/photos/") > 0 ||
                            e.indexOf("/events/") > 0 ||
                            e.indexOf("/ads/manage/") > 0 ||
                            e.indexOf("album_id=") > 0 ||
                            e.indexOf("/adsmanager/pages") > 0 ||
                            e.indexOf("/content_management") > 0 ||
                            e.indexOf("/latest/posts") > 0 ||
                            (e += "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending"),
                        e.indexOf("/ads/manage/") > 0 && (e = e.replace("?fbe-number=", "&fbe-number=")),
                        e.indexOf("/groups/") > 0 &&
                            (e = e.replace(
                                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending",
                                ""
                            )),
                        multi_notif_page &&
                            (e = e.replace(
                                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending",
                                "/notifications"
                            )),
                        multiPageUniqueFunc(
                            e,
                            0,
                            3,
                            total_shared_posts_liked,
                            total_shared_posts_commented,
                            mtotalInvited,
                            0
                        );
                }
        }
        function start_mode4() {
            if (licWorking())
                if ((saveQuickVars(), forceRefresh(), destroyPopupInfo(), 0 == urllist2.length))
                    alert(api.i18n.getMessage("UI_13"));
                else {
                    var e = urlDeCode(urllist2[0]);
                    "/" == e.slice(-1) && (e = e.slice(0, -1)),
                        e.indexOf("/posts/") > 0 ||
                            e.indexOf("/videos/") > 0 ||
                            e.indexOf("/watch/") > 0 ||
                            e.indexOf("/photos/") > 0 ||
                            e.indexOf("/events/") > 0 ||
                            e.indexOf("/ads/manage/") > 0 ||
                            e.indexOf("album_id=") > 0 ||
                            e.indexOf("/adsmanager/pages") > 0 ||
                            e.indexOf("/content_management") > 0 ||
                            e.indexOf("/latest/posts") > 0 ||
                            (e += "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending"),
                        e.indexOf("/ads/manage/") > 0 && (e = e.replace("?fbe-number=", "&fbe-number=")),
                        e.indexOf("/groups/") > 0 &&
                            (e = e.replace(
                                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending",
                                ""
                            )),
                        multi_notif_page &&
                            (e = e.replace(
                                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending",
                                "/notifications"
                            )),
                        multiPageUniqueFunc(
                            e,
                            0,
                            4,
                            total_shared_posts_liked,
                            total_shared_posts_commented,
                            mtotalInvited,
                            0
                        );
                }
        }
        function mode3() {
            0 == urllist1.length
                ? alert(api.i18n.getMessage("UI_13"))
                : ((loop_PostsListArray.length = 0),
                  (loop_PostsList = ""),
                  (runMode = 3),
                  (runModetext = api.i18n.getMessage("UI_11")),
                  _fbe_number >= 0 && (nextPage = parseInt(_fbe_number) + 1),
                  setTimeout(function () {
                      startDowithDelay(0);
                  }, 1500));
        }
        function mode4() {
            forceRefresh(),
                0 == urllist2.length
                    ? alert(api.i18n.getMessage("UI_13"))
                    : (0 == loop_PostsList.length && (loop_PostsList = "1,2,3,4,5"),
                      (runMode = 4),
                      (runModetext = api.i18n.getMessage("UI_12")),
                      _fbe_number >= 0 && (nextPage = parseInt(_fbe_number) + 1),
                      setTimeout(function () {
                          startDowithDelay(0);
                      }, 1500));
        }
        function startDowithDelay(e) {
            e > 2
                ? do1()
                : (e++,
                  (window.location.href.indexOf("/notifications") > 0 &&
                      getElem("._5tdr ._1t7p ._2v5c", ".hidden_elem ._2v5c").length > 0) ||
                  (window.location.href.indexOf("/publishing_tools") > 0 &&
                      getElem("._3h1j ._1gda ._3pzj ._4h2m ._4h2x._4lge ._2pir", ".hidden_elem ._2pir").length > 0)
                      ? do1()
                      : setTimeout(function () {
                            startDowithDelay(e);
                        }, 2e3));
        }
        function forceRefresh() {
            var e = document.getElementsByTagName("body")[0],
                t = document.createElement("script");
            t.setAttribute("type", "text/javascript"),
                (t.innerHTML = "window.onbeforeunload = function() {}"),
                e.appendChild(t);
        }
        function myrand(e, t, n) {
            var o = -1;
            (t -= 1), n < 0 && (n = 0);
            do {
                o = Math.floor(Math.random() * (t - e + 1) + e);
            } while (o < 0 || o == n);
            return o;
        }
        function open_next_page() {
            goBackToMainTab(0);
        }
        api.storage.sync.get(
            {
                p1_1: 3,
                p1_2: 5,
                p2_1: 3,
                p2_2: 5,
                pc_1: 10,
                pc_2: 15,
                text_comm_shares: "",
                text_comm_shares2: "",
                text_comm_shares3: "",
                text_comm_shares4: "",
                text_comm_shares5: "",
                fb_timeout_1: 5e3,
                fb_timeout_2: 2e3,
                fb_timeout_3: 1500,
                fb_timeout_4: 7e3,
                fb_timeout_5: 1e4,
                fb_timeout_6: 15e3,
                psfTr: 0,
                psexp: 0,
                psrenewCanc: 0,
                pslicID: "",
                psemailID: "",
                psNotif1: 1,
                psNotif2: 0,
                psmessagelast: "",
                psscr: "",
                pstype: "",
                psdura: "",
                psactive: 0,
                installID: "",
                psInvTot: 0,
                psInvDay: "",
                additional_script_pause: !0,
                check_post_first: !0,
                skip_angry_emotion: !1,
                like_other_pages: !1,
                skip_haha_emotion: !1,
                skip_like_emotion: !1,
                skip_love_emotion: !1,
                skip_wow_emotion: !1,
                scan_reactions_tabs: !1,
                scan_reactions_tabs_more1: !0,
                skip_sad_emotion: !1,
                name_comm_filter1: "",
                accept_ashii_names_only: !1,
                skip_no_profile_image: !1,
                slow_internet: !1,
                notif_other_tab: !1,
                scrollingNewFBDesignClass: scrollingNewFBDesignClassDef,
                fb_limit: 490,
                fb_limit_multi: 490,
                fb_limit_show_more_btn: 199,
                fb_limit_show_more_btn_add_sec: 0,
                TotalInvited: 0,
                FirstInstalled: 0,
                showLessInfoDate: 0,
                skip_post_setting: 0,
                share_put_likes: !1,
                likeSharedComments: !1,
                share_put_comments: !1,
                skip_Invite: !1,
                inviteDuringShareCheck: !1,
                inviteDuringShareCheck2: !1,
                share_likes_limit: 300,
                share_comments_limit: 300,
                stop_on_captcha_shown: !0,
                postMoreUnderSameAccount: !1,
                do_not_check_who_comments2: "postPage",
                do_not_check_shared_my_name_skip: "",
                shares_list_delete_days: 14,
                multi_notif_page: !1,
                multi_random_order: !1,
                loop_PostsList: "1,2,3,4,5",
                loop_Pause: 5,
                urllist1: new Array(),
                urllist2: new Array(),
                normal_run_limitposts: 100,
                normal_run_limitNoInvGoNextPage: 100,
                shares_reply_ignore_string: "",
                pageNameFixedByUser: "",
                monthSave: 0,
                fast_scan_loads: 4,
                fast_scan: !1,
                try_after_limit: !1,
                pauseAfterLimit: !1,
                pauseAfterLimit2: 180,
                pauseAfterLimit3: 50,
                ignoreScannedPosts: !1,
            },
            function (e) {
                e
                    ? (Number(e.p1_2) >= Number(e.p1_1) &&
                          ((p1_1 = 1e3 * Number(e.p1_1)), (p1_2 = 1e3 * Number(e.p1_2))),
                      Number(e.p2_2) >= Number(e.p2_1) &&
                          ((p2_1 = 1e3 * Number(e.p2_1)), (p2_2 = 1e3 * Number(e.p2_2))),
                      Number(e.pc_2) >= Number(e.pc_1) &&
                          ((pc_1 = 1e3 * Number(e.pc_1)), (pc_2 = 1e3 * Number(e.pc_2))),
                      (0 == p1_1 || "" == p1_1 || p1_1 < 2e3) && (p1_1 = 2e3),
                      (0 == p1_2 || "" == p1_2 || p1_2 < 2e3) && (p1_2 = 2500),
                      (loop_Pause = 1e3 * Number(e.loop_Pause) * 60),
                      (fb_timeout_2 = Number(e.fb_timeout_2)),
                      (fb_timeout_3 = Number(e.fb_timeout_3)),
                      (fb_timeout_4 = Number(e.fb_timeout_4)),
                      (fb_timeout_5 = Number(e.fb_timeout_5)),
                      (fb_timeout_6 = Number(e.fb_timeout_6)),
                      (psfTr = Number(e.psfTr)),
                      (psexp = Number(e.psexp)),
                      (psrenewCanc = Number(e.psrenewCanc)),
                      (pslicID = e.pslicID),
                      (psemailID = e.psemailID),
                      (psNotif1 = Number(e.psNotif1)),
                      (psNotif2 = Number(e.psNotif2)),
                      (psmessagelast = e.psmessagelast),
                      (psscr = e.psscr),
                      (pstype = e.pstype),
                      (psdura = e.psdura),
                      (psactive = Number(e.psactive)),
                      (installID = e.installID),
                      (psInvTot = Number(e.psInvTot)),
                      (psInvDay = e.psInvDay) != month + "-" + day && ((psInvDay = month + "-" + day), (psInvTot = 0)),
                      (skip_post_setting = Number(e.skip_post_setting)),
                      (share_put_likes = e.share_put_likes),
                      (likeSharedComments = e.likeSharedComments),
                      (share_put_comments = e.share_put_comments),
                      (skip_Invite = e.skip_Invite),
                      (inviteDuringShareCheck = e.inviteDuringShareCheck),
                      (inviteDuringShareCheck2 = e.inviteDuringShareCheck2),
                      0 == (share_likes_limit = Number(e.share_likes_limit)) && (share_likes_limit = 500),
                      0 == (share_comments_limit = Number(e.share_comments_limit)) && (share_comments_limit = 500),
                      (stop_on_captcha_shown = e.stop_on_captcha_shown),
                      (postMoreUnderSameAccount = e.postMoreUnderSameAccount),
                      (do_not_check_who_comments2 = e.do_not_check_who_comments2.toString()),
                      "," == (do_not_check_shared_my_name_skip = e.do_not_check_shared_my_name_skip).slice(-1) &&
                          (do_not_check_shared_my_name_skip = do_not_check_shared_my_name_skip.slice(0, -1)),
                      do_not_check_shared_my_name_skip.length > 1 &&
                          (do_not_check_shared_my_name_s_Array = do_not_check_shared_my_name_skip
                              .split(",")
                              .map(function (e) {
                                  return e.trim();
                              })),
                      (shares_list_delete_days = Number(e.shares_list_delete_days)),
                      (multi_notif_page = e.multi_notif_page),
                      (multi_random_order = e.multi_random_order),
                      (loop_PostsList = e.loop_PostsList),
                      (additional_script_pause = e.additional_script_pause),
                      (check_post_first = e.check_post_first),
                      (skip_angry_emotion = e.skip_angry_emotion),
                      (like_other_pages = e.like_other_pages),
                      (skip_haha_emotion = e.skip_haha_emotion),
                      (skip_sad_emotion = e.skip_sad_emotion),
                      (skip_like_emotion = e.skip_like_emotion),
                      (skip_love_emotion = e.skip_love_emotion),
                      (skip_wow_emotion = e.skip_wow_emotion),
                      (scan_reactions_tabs = e.scan_reactions_tabs),
                      (scan_reactions_tabs_more1 = e.scan_reactions_tabs_more1),
                      "," == (name_comm_filter1 = e.name_comm_filter1.toString().trim()).slice(-1) &&
                          (name_comm_filter1 = name_comm_filter1.slice(0, -1)),
                      name_comm_filter1.length > 0 &&
                          (namesFilter = name_comm_filter1.split(",").map(function (e) {
                              return e.trim();
                          })),
                      do_not_check_who_comments2.length < 2 && (do_not_check_who_comments2 = "postPage"),
                      (accept_ashii_names_only = e.accept_ashii_names_only),
                      (skip_no_profile_image = e.skip_no_profile_image),
                      (slow_internet = e.slow_internet),
                      (notif_other_tab = e.notif_other_tab),
                      (scrollingNewFBDesignClass = e.scrollingNewFBDesignClass),
                      (fb_limit = Number(e.fb_limit)),
                      (fb_limit_multi = Number(e.fb_limit_multi)),
                      (fb_limit_show_more_btn = Number(e.fb_limit_show_more_btn)) < 10 && (fb_limit_show_more_btn = 10),
                      (fb_limit_show_more_btn_add_sec = Number(e.fb_limit_show_more_btn_add_sec)) > 1e3 &&
                          (fb_limit_show_more_btn_add_sec = 10),
                      fb_limit_show_more_btn_add_sec > 300 && (fb_limit_show_more_btn_add_sec = 120),
                      (TotalInvited = Number(e.TotalInvited)) > 2e5 && (TotalInvited = 5e3),
                      (FirstInstalled = e.FirstInstalled.toString()),
                      (showLessInfoDate = e.showLessInfoDate.toString()),
                      (urllist1 = e.urllist1),
                      (urllist2 = e.urllist2),
                      (void 0 !== (normal_run_limitposts = e.normal_run_limitposts) && "" != normal_run_limitposts) ||
                          (normal_run_limitposts = 300),
                      (void 0 !== (normal_run_limitNoInvGoNextPage = e.normal_run_limitNoInvGoNextPage) &&
                          "" != normal_run_limitNoInvGoNextPage) ||
                          (normal_run_limitNoInvGoNextPage = 100),
                      (try_after_limit = e.try_after_limit),
                      (pauseAfterLimit = e.pauseAfterLimit),
                      (pauseAfterLimit2 = Number(e.pauseAfterLimit2)),
                      (pauseAfterLimit3 = Number(e.pauseAfterLimit3)),
                      (monthSave = Number(e.monthSave)),
                      (fast_scan_loads = Number(e.fast_scan_loads)),
                      (fast_scan = e.fast_scan),
                      (text_comm_shares = e.text_comm_shares.toString()),
                      (text_comm_shares2 = e.text_comm_shares2.toString()),
                      (text_comm_shares3 = e.text_comm_shares3.toString()),
                      (text_comm_shares4 = e.text_comm_shares4.toString()),
                      (text_comm_shares5 = e.text_comm_shares5.toString()),
                      "," == (shares_reply_ignore_string = e.shares_reply_ignore_string.toString().trim()).slice(-1) &&
                          (shares_reply_ignore_string = shares_reply_ignore_string.slice(0, -1)),
                      shares_reply_ignore_string.length > 1 &&
                          (shares_reply_ignore_array = shares_reply_ignore_string.split(",").map(function (e) {
                              return e.trim().replace("‬", "").replace("‫", "");
                          })),
                      (temp_random_array.length = 0),
                      (pageNameFixedByUser = e.pageNameFixedByUser.toString().trim()),
                      text_comm_shares.length > 1 && temp_random_array.push(text_comm_shares),
                      text_comm_shares2.length > 1 && temp_random_array.push(text_comm_shares2),
                      text_comm_shares3.length > 1 && temp_random_array.push(text_comm_shares3),
                      text_comm_shares4.length > 1 && temp_random_array.push(text_comm_shares4),
                      text_comm_shares5.length > 1 && temp_random_array.push(text_comm_shares5),
                      console.log("Tot invited:" + TotalInvited),
                      (ignoreScannedPosts = e.ignoreScannedPosts))
                    : ((temp_random_array.length = 0),
                      text_comm_shares.length > 1 && temp_random_array.push(text_comm_shares),
                      text_comm_shares2.length > 1 && temp_random_array.push(text_comm_shares2),
                      text_comm_shares3.length > 1 && temp_random_array.push(text_comm_shares3),
                      text_comm_shares4.length > 1 && temp_random_array.push(text_comm_shares4),
                      text_comm_shares5.length > 1 && temp_random_array.push(text_comm_shares5)),
                    api.storage.local.get({ creatorStudioPostOpenedForScrollArray: new Array() }, function (e) {
                        e && (creatorStudioPostOpenedForScrollArray = e.creatorStudioPostOpenedForScrollArray),
                            (void 0 === creatorStudioPostOpenedForScrollArray ||
                                creatorStudioPostOpenedForScrollArray.length < 2 ||
                                !ignoreScannedPosts) &&
                                (((creatorStudioPostOpenedForScrollArray = new Array()).length = 7),
                                (creatorStudioPostOpenedForScrollArray[0] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[1] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[2] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[3] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[4] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[5] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[6] = new Array()),
                                (creatorStudioPostOpenedForScrollArray[0].length = 0),
                                (creatorStudioPostOpenedForScrollArray[1].length = 0),
                                (creatorStudioPostOpenedForScrollArray[2].length = 0),
                                (creatorStudioPostOpenedForScrollArray[3].length = 0),
                                (creatorStudioPostOpenedForScrollArray[4].length = 0),
                                (creatorStudioPostOpenedForScrollArray[5].length = 0),
                                (creatorStudioPostOpenedForScrollArray[6].length = 0));
                    }),
                    api.storage.local.get(obj, function (e) {
                        for (var t in ((void 0 !== (obj = e).msgListSentID && obj.msgListSentID) ||
                            (obj.msgListSentID = new Object()),
                        obj.msgListSentID))
                            currentTimeInSec > obj.msgListSentID[t] + 86400 * shares_list_delete_days &&
                                delete obj.msgListSentID[t];
                    }),
                    p1_1 < 1e3 && (p1_1 *= 1e3),
                    p1_2 < 1e3 && (p1_2 *= 1e3),
                    p2_1 < 1e3 && (p2_1 *= 1e3),
                    p2_2 < 1e3 && (p2_2 *= 1e3),
                    pc_1 < 1e3 && (pc_1 *= 1e3),
                    pc_2 < 1e3 && (pc_2 *= 1e3),
                    loop_Pause < 1e3 && (loop_Pause = 1e3 * loop_Pause * 60),
                    (isPhotoInviting = 0),
                    (inputsPhoto = $("#content_container ._2eec ._3x2f .rfloat ._4crj .ZZZZZZZZZZZZZZ")),
                    (inputsPhoto2 = $("#content_container ._2eec ._3x2f .rfloat ._4crj .ZZZZZZZZZZZZZ")),
                    (curr_timestamp = parseInt(Math.floor(Date.now() / 1e3)));
            }
        ),
            setTimeout(function () {
                api.storage.local.get(
                    {
                        _tab_ID: 0,
                        _realt: 0,
                        _time: 0,
                        _runMode: 0,
                        _fbe_number: 0,
                        _shared_p_liked: 0,
                        _shared_p_comm: 0,
                        _totalInvited: 0,
                    },
                    function (e) {
                        e &&
                            ((_tab_ID = e._tab_ID),
                            (_realt = e._realt),
                            (_time = e._time),
                            (_runMode = e._runMode),
                            (_fbe_number = e._fbe_number),
                            (_shared_p_liked = e._shared_p_liked),
                            (_shared_p_comm = e._shared_p_comm),
                            (_totalInvited = e._totalInvited)),
                            (waitForLoad = 30),
                            slow_internet &&
                                ((waitForLoad = 180),
                                (fb_timeout_1 = 32e3),
                                (fb_timeout_2 = 4e3),
                                (fb_timeout_3 = 3500),
                                (fb_timeout_4 = 9e3),
                                (fb_timeout_5 = 15e3),
                                (fb_timeout_6 = 2e4)),
                            (waitForLoad = 300),
                            (curr_timestamp = parseInt(Math.floor(Date.now() / 1e3))),
                            _time > 0 &&
                                curr_timestamp < parseInt(_time) + waitForLoad &&
                                ((mtotalInvited = _totalInvited),
                                (total_shared_posts_liked = _shared_p_liked),
                                (total_shared_posts_commented = _shared_p_comm),
                                (nextPage = parseInt(_fbe_number) + 1)),
                            null == mtotalInvited && (mtotalInvited = 0),
                            (mtotalInvited = Number(mtotalInvited)),
                            null == total_shared_posts_liked && (total_shared_posts_liked = 0),
                            null == total_shared_posts_commented && (total_shared_posts_commented = 0),
                            mtotalInvited > 0 && (skip_if_no_buttons_after_first_loop = !0),
                            userClickedOnIcon
                                ? just_start()
                                : 1 == _realt && _time > 0 && curr_timestamp < parseInt(_time) + waitForLoad
                                  ? 2 == _runMode
                                      ? setTimeout(function () {
                                            mode2();
                                        }, 310)
                                      : 4 == _runMode
                                        ? setTimeout(function () {
                                              mode4();
                                          }, 310)
                                        : just_start()
                                  : 3 == _runMode && _time > 0 && curr_timestamp < parseInt(_time) + waitForLoad
                                    ? setTimeout(function () {
                                          mode3();
                                      }, 310)
                                    : 4 == _runMode && _time > 0 && curr_timestamp < parseInt(_time) + waitForLoad
                                      ? setTimeout(function () {
                                            mode4();
                                        }, 310)
                                      : just_start();
                    }
                );
            }, 400);
    }
} else if (!doNotStartNowFix) {
    if (
        (debug &&
            console.log(
                "We verify if we need to show progress bar of the script in another tab. Also check stop script notification and reminder to run the script"
            ),
        "undefined" != typeof fbmultiprogressBarActive)
    ) {
        debug && console.log("Progress Bar shown on this page");
        var e = document.getElementsByTagName("head")[0],
            t = document.getElementsByTagName("body")[0];
        (n = document.createElement("div")).setAttribute("id", "fb-progress-bar"),
            (n.innerHTML =
                '<div id="fb-notification" class="fb-style"><div class="fb-logo">' +
                api.runtime.getManifest().name +
                '</div><div class="progress-bar" width="' +
                progress_bar_len +
                '"><span class="fb-close"></span></div>');
    }
    if ("undefined" != typeof fbmultiscriptStoppedNotif) {
        debug && console.log("Progress Bar shown on this page");
        (e = document.getElementsByTagName("head")[0]), (t = document.getElementsByTagName("body")[0]);
        (n = document.createElement("div")).setAttribute("id", "fb-progress-bar"),
            (n.innerHTML =
                '<div id="fb-notification" class="fb-style"><div class="fb-logo">' +
                api.runtime.getManifest().name +
                ' stopped! Open Facebook to see the result and run it on the other post/page/account!</div><span class="fb-close"></span>');
    }
    if ("undefined" != typeof fbmultireminderToRunScript) {
        debug && console.log("reminderToRunScript shown on this page");
        var n;
        (e = document.getElementsByTagName("head")[0]), (t = document.getElementsByTagName("body")[0]);
        (n = document.createElement("div")).setAttribute("id", "fb-progress-bar"),
            (n.innerHTML =
                '<div id="fb-notification" class="fb-style"><div class="fb-logo">You did not run the script ' +
                api.runtime.getManifest().name +
                ' for a while! Open Faceboook.com and run the script or disable this notification!</div><span class="fb-close"></span>');
    }
}
var justOnePost = !0;
function just_start() {
    (runModetext = "Scanning the post in a separate tab. Do not close or change tab."),
        createPopup(),
        setTimeout(function () {
            do4();
        }, 800);
}
function doPHOTO() {
    if (((doNotCloseFirstRunSelectPostsVerif = !1), debug && console.log("doPhoto"), 1 == scriptIsRunning)) {
        if (
            (!(0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed) ||
                publishingToolInv ||
                isNotificationTab ||
                -1 != window.location.href.indexOf("/photos/") ||
                (inputsPhoto = getElem("#content_container ._2eec ._3x2f .rfloat ._4crj", ".hidden_elem ._4crj")),
            (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
                publishingToolInv &&
                !isNotificationTab &&
                (getElem("._3h1j ._1gda ._30p6 ._3pzj ._4h2m ._4h2x._4lge ._2pir", ".hidden_elem ._2pir").length > 0 &&
                ((0 == totalPostsProcessed && 1 == publishingTabNumber) || 1 == selectedpostsRun)
                    ? ((inputsPhoto = getElem(
                          "._3h1j ._1gda ._30p6 ._3pzj ._4h2m ._4h2x._4lge ._2pir",
                          ".hidden_elem ._2pir"
                      )),
                      (selectedpostsRun = 1),
                      (publishingResetArray = !1))
                    : getElem("._3h1j ._1gda ._3pzj ._4h2m ._4h2x._4lge ._2pir", ".hidden_elem ._2pir").length > 0 &&
                      ((inputsPhoto = getElem(
                          "._3h1j ._1gda ._3pzj ._4h2m ._4h2x._4lge ._2pir",
                          ".hidden_elem ._2pir"
                      )),
                      (publishingResetArray = !1))),
            (window.location.href.indexOf("/creatorstudio") > 0 ||
                ((window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/publishing_tools") > 0) &&
                    getElem("table tr._2zxd._2zyc,._1ug5", ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5").length >
                        0)) &&
                (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
                publishingToolInv &&
                !isNotificationTab)
        )
            (fb_timeout_1 = 1e4),
                getElem("table tr._2zxd._2zyc,._1ug5", ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5").filter(
                    function () {
                        return (
                            $(this).closest("._2e42._2yi0").length > 0 &&
                            $(this).closest("._2e42._2yi0").prev() &&
                            $(this).closest("._2e42._2yi0").prev().prev() &&
                            $(this)
                                .closest("._2e42._2yi0")
                                .prev()
                                .prev()
                                .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w").length > 0 &&
                            $(this)
                                .closest("._2e42._2yi0")
                                .prev()
                                .prev()
                                .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w")
                                .filter(function () {
                                    return "true" == $(this).attr("aria-checked");
                                }).length > 0
                        );
                    }
                ).length > 0 &&
                ((0 == totalPostsProcessed && 1 == publishingTabNumber) || 1 == selectedpostsRun)
                    ? ((inputsPhoto = getElem(
                          "table tr._2zxd._2zyc,._1ug5",
                          ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5"
                      ).filter(function () {
                          return (
                              $(this).closest("._2e42._2yi0").length > 0 &&
                              $(this).closest("._2e42._2yi0").prev() &&
                              $(this).closest("._2e42._2yi0").prev().prev() &&
                              $(this)
                                  .closest("._2e42._2yi0")
                                  .prev()
                                  .prev()
                                  .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w").length > 0 &&
                              $(this)
                                  .closest("._2e42._2yi0")
                                  .prev()
                                  .prev()
                                  .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w")
                                  .filter(function () {
                                      return "true" == $(this).attr("aria-checked");
                                  }).length > 0
                          );
                      })),
                      (selectedpostsRun = 1))
                    : (inputsPhoto = getElem(
                          "table tr._2zxd._2zyc,._1ug5",
                          ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5"
                      )),
                (publishingResetArray = !1);
        if (
            (window.location.href.indexOf("/content_management") > 0 ||
                window.location.href.indexOf("/latest/posts") > 0 ||
                window.location.href.indexOf("/publishing_tools") > 0) &&
            (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
            publishingToolInv &&
            !isNotificationTab &&
            getElem(
                "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
            ).filter(function () {
                return $(this).find(".ellipsis,.kiex77na,.l6kht628>div").length > 0;
            }).length > 0
        )
            (fb_timeout_1 = 1e4),
                getElem(
                    "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                    ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                ).filter(function () {
                    return (
                        $(this).closest("._2e42._2yi0").length > 0 &&
                        $(this).closest("._2e42._2yi0").prev() &&
                        $(this)
                            .closest("._2e42._2yi0")
                            .prev()
                            .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w").length > 0 &&
                        $(this)
                            .closest("._2e42._2yi0")
                            .prev()
                            .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w")
                            .filter(function () {
                                return "true" == $(this).attr("aria-checked");
                            }).length > 0
                    );
                }).length > 0 &&
                ((0 == totalPostsProcessed && 1 == publishingTabNumber) || 1 == selectedpostsRun)
                    ? ((inputsPhoto = getElem(
                          "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                          ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                      ).filter(function () {
                          return (
                              $(this).closest("._2e42._2yi0").length > 0 &&
                              $(this).closest("._2e42._2yi0").prev() &&
                              $(this)
                                  .closest("._2e42._2yi0")
                                  .prev()
                                  .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w").length > 0 &&
                              $(this)
                                  .closest("._2e42._2yi0")
                                  .prev()
                                  .find("._88ly input,button._1gcq,._1gcq._29c-._1gco._5e9w")
                                  .filter(function () {
                                      return "true" == $(this).attr("aria-checked");
                                  }).length > 0
                          );
                      })),
                      (selectedpostsRun = 1))
                    : (inputsPhoto = getElem(
                          "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                          ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                      ).filter(function () {
                          return (
                              $(this).find(".ellipsis,.kiex77na,.l6kht628>div").length > 0 &&
                              (0 == $(this).find("i").length ||
                                  ($(this).find("i").length > 0 &&
                                      (!$(this).find("i").text() ||
                                          ($(this).find("i").text() &&
                                              -1 == $(this).find("i").text().toLowerCase().indexOf("instagram")))))
                          );
                      })),
                (publishingResetArray = !1);
        0 == inputsPhoto.length &&
            isThisNewFbDesign2020() &&
            getElem(".l9j0dhe7:visible")
                .not(".y3zKF.sqdOP.yWX7d._8A5w5")
                .filter(function () {
                    return "row" == $(this).attr("role") && 0 == $(this).find(".sx_e9b3e2,.sx_848308").length;
                }).length > 0 &&
            (document.location.href.indexOf("/notifications") || document.location.href.indexOf("&notif_t=")) &&
            ((inputsPhoto = getElem(".l9j0dhe7:visible")
                .not(".y3zKF.sqdOP.yWX7d._8A5w5")
                .filter(function () {
                    return "row" == $(this).attr("role") && 0 == $(this).find(".sx_e9b3e2,.sx_848308").length;
                })),
            (inputsPhoto = $(inputsPhoto).find("a"))),
            0 == inputsPhoto.length &&
                getElem("._wyj._20nr ._7gpd a._7gm_").length > 0 &&
                document.location.href.indexOf("/watch/") &&
                (inputsPhoto = getElem("._wyj._20nr ._7gpd a._7gm_")),
            (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed) &&
                isNotificationTab &&
                (getElem("._5tdr ._1t7p ._2v5c._4vb9 ._5aj7", "._5tdr ._1t7p ._1d2k ._5aj7,.hidden_elem ._5aj7")
                    .length > 0 &&
                ((0 == totalPostsProcessed && 1 == publishingTabNumber) || 1 == selectedpostsRun)
                    ? ((inputsPhoto = getElem(
                          "._5tdr ._1t7p ._2v5c._4vb9 ._5aj7",
                          "._5tdr ._1t7p ._1d2k ._5aj7,.hidden_elem ._5aj7"
                      )),
                      (selectedpostsRun = 1))
                    : (inputsPhoto = getElem(
                          "._5tdr ._1t7p ._2v5c ._5aj7",
                          "._5tdr ._1t7p ._1d2k ._5aj7,.hidden_elem ._5aj7"
                      ))),
            (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed) &&
                window.location.href.indexOf("/photos/") > 0 &&
                getElem("#content_container ._2eec ._2eea>a>img,#content_container ._2eec ._2eea._4zc->a ._1g1c>img")
                    .length > 0 &&
                ((publishingToolInv = !0),
                (photosTabRunAll = !0),
                (weAreElaboratingAlbums = 1),
                (inputsPhoto = getElem(
                    "#content_container ._2eec ._2eea>a>img,#content_container ._2eec ._2eea._4zc->a ._1g1c>img"
                )),
                debug && console.log("we update here how many photos we have, new number:" + inputsPhoto.length)),
            (checkOnceVideoPost = !0),
            debug &&
                console.log(
                    "LENGTH of items this time:" +
                        inputsPhoto.length +
                        ". Tot post:" +
                        totalPostsProcessed +
                        ". Selected posts:" +
                        selectedpostsRun
                ),
            loop_PostsListArray.length > 0
                ? (debug && console.log("doPHOTO for real time."),
                  totalPostsProcessed < inputsPhoto.length
                      ? ((tryloadVar1 = 0),
                        totalPostsProcessed++,
                        normal_run_limitNoInvitePosts >= 0
                            ? normal_run_limitNoInvitePosts++
                            : (normal_run_limitNoInvitePosts = 0),
                        loop_PostsListArray.indexOf(totalPostsProcessed) > -1 && !publishingToolInv
                            ? (loop_currentPostJustForCounter++,
                              photosTabRunAll
                                  ? inputsPhoto[totalPostsProcessed - 1].click()
                                  : $(inputsPhoto[totalPostsProcessed - 1])
                                        .children("a")[0]
                                        .click(),
                              updatePopup(),
                              (TimerDelayVar1 = setTimeout(function () {
                                  doPHOTO2();
                              }, fb_timeout_1)))
                            : loop_PostsListArray.indexOf(totalPostsProcessed) > -1 && publishingToolInv
                              ? (loop_currentPostJustForCounter++,
                                inputsPhoto[totalPostsProcessed - 1].click(),
                                updatePopup(),
                                (TimerDelayVar1 = setTimeout(function () {
                                    doPHOTO2();
                                }, fb_timeout_1)))
                              : doPHOTO())
                      : (debug &&
                            (console.log("try to load more IF we need this just for notification tab!"),
                            console.log(multi_notif_page),
                            console.log(Math.max.apply(null, loop_PostsListArray)),
                            console.log(totalPostsProcessed),
                            console.log(tryloadVar1)),
                        multi_notif_page &&
                        Math.max.apply(null, loop_PostsListArray) > totalPostsProcessed &&
                        tryloadVar1 < 5
                            ? (tryClickToLoadMorePosts(),
                              tryloadVar1++,
                              (TimerDelayVar1 = setTimeout(function () {
                                  doPHOTO();
                              }, 7e3)))
                            : reloadloop
                              ? prepareforReloadPage()
                              : (updatePopup(
                                    ". " +
                                        api.i18n.getMessage("pause_1") +
                                        " " +
                                        loop_Pause / 1e3 +
                                        " " +
                                        api.i18n.getMessage("pause_2"),
                                    1
                                ),
                                (skip_if_no_buttons_after_first_loop = !0),
                                (totalPostsProcessed = 0),
                                (loopTimerDelay = setTimeout(function () {
                                    doPHOTO3s();
                                }, loop_Pause)))))
                : inputsPhoto.length > 0 && inputsPhoto.length > totalPostsProcessed
                  ? $(inputsPhoto[totalPostsProcessed]).children("a") &&
                    $(inputsPhoto[totalPostsProcessed]).children("a")[0] &&
                    !publishingToolInv
                      ? (photosTabRunAll
                            ? inputsPhoto[totalPostsProcessed].click()
                            : $(inputsPhoto[totalPostsProcessed]).children("a")[0].click(),
                        totalPostsProcessed++,
                        normal_run_limitNoInvitePosts >= 0
                            ? normal_run_limitNoInvitePosts++
                            : (normal_run_limitNoInvitePosts = 0),
                        updatePopup(),
                        (checkTwice = 0),
                        (TimerDelayVar1 = setTimeout(function () {
                            doPHOTO2();
                        }, fb_timeout_1)))
                      : publishingToolInv
                        ? postsIgnoredInArrowToStopScript > 1499
                            ? (3 != runMode && 4 != runMode) || !try_after_limit
                                ? (console.log("Stop, debug: all posts were already checked by images"), stopScript())
                                : (debug && console.log("next page 1"), open_next_page())
                            : 0 == verifyThisPostAlreadyScanned(inputsPhoto[totalPostsProcessed])
                              ? ((postsIgnoredInArrowToStopScript = 0),
                                ignoreScannedPosts &&
                                    api.storage.local.set(
                                        {
                                            creatorStudioPostOpenedForScrollArray:
                                                creatorStudioPostOpenedForScrollArray,
                                        },
                                        function () {}
                                    ),
                                (window.location.href.indexOf("/creatorstudio") > 0 ||
                                    window.location.href.indexOf("/content_management") > 0 ||
                                    window.location.href.indexOf("/latest/posts") > 0 ||
                                    window.location.href.indexOf("/publishing_tools") > 0) &&
                                    ($(inputsPhoto[totalPostsProcessed]).find("img._8u9x,img._8u9w,img._8oii").length >
                                        0 &&
                                    $(inputsPhoto[totalPostsProcessed])
                                        .find("img._8u9x,img._8u9w,img._8oii")[0]
                                        .getAttribute("src").length > 3
                                        ? creatorStudioPostOpenedForScrollArray[0].push(
                                              $(inputsPhoto[totalPostsProcessed])
                                                  .find("img._8u9x,img._8u9w,img._8oii")[0]
                                                  .getAttribute("src")
                                          )
                                        : $(inputsPhoto[totalPostsProcessed]).find("img").length > 0
                                          ? creatorStudioPostOpenedForScrollArray[0].push(
                                                $(inputsPhoto[totalPostsProcessed]).find("img")[0].getAttribute("src")
                                            )
                                          : creatorStudioPostOpenedForScrollArray[0].push(""),
                                    $(inputsPhoto[totalPostsProcessed]).find(".ellipsis,.kiex77na,.l6kht628>div")
                                        .length > 0
                                        ? creatorStudioPostOpenedForScrollArray[1].push(
                                              $(inputsPhoto[totalPostsProcessed])
                                                  .find(".ellipsis,.kiex77na,.l6kht628>div")
                                                  .first()
                                                  .text()
                                          )
                                        : creatorStudioPostOpenedForScrollArray[1].push(""),
                                    window.location.href.indexOf("/creatorstudio") > 0 &&
                                        ($(inputsPhoto[totalPostsProcessed]).find("._1mxi ._4ik4._4ik5").length > 0
                                            ? creatorStudioPostOpenedForScrollArray[3].push(
                                                  $(inputsPhoto[totalPostsProcessed])
                                                      .find("._1mxi ._4ik4._4ik5")
                                                      .first()
                                                      .text()
                                              )
                                            : creatorStudioPostOpenedForScrollArray[3].push("")),
                                    (window.location.href.indexOf("/content_management") > 0 ||
                                        window.location.href.indexOf("/latest/posts") > 0 ||
                                        window.location.href.indexOf("/publishing_tools") > 0) &&
                                    $(inputsPhoto[totalPostsProcessed]).closest("._2e42").length &&
                                    $(inputsPhoto[totalPostsProcessed]).closest("._2e42").next().length > 0 &&
                                    $(inputsPhoto[totalPostsProcessed])
                                        .closest("._2e42")
                                        .next()
                                        .find("._8oim>span,._8oim ._8oij>span").length > 0
                                        ? creatorStudioPostOpenedForScrollArray[2].push(
                                              $(inputsPhoto[totalPostsProcessed])
                                                  .closest("._2e42")
                                                  .next()
                                                  .find("._8oim>span,._8oim ._8oij>span")
                                                  .first()
                                                  .text()
                                          )
                                        : creatorStudioPostOpenedForScrollArray[2].push("")),
                                inputsPhoto[totalPostsProcessed].click(),
                                totalPostsProcessed++,
                                publishingToolTotPost++,
                                normal_run_limitNoInvitePosts >= 0
                                    ? normal_run_limitNoInvitePosts++
                                    : (normal_run_limitNoInvitePosts = 0),
                                updatePopup(),
                                (checkTwice = 0),
                                (TimerDelayVar1 = setTimeout(function () {
                                    doPHOTO2();
                                }, fb_timeout_1)))
                              : (debug &&
                                    $(inputsPhoto[totalPostsProcessed]).find("img._8u9x,img._8u9w,img._8oii").length >
                                        0 &&
                                    console.log(
                                        "We have already this img" +
                                            $(inputsPhoto[totalPostsProcessed])
                                                .find("img._8u9x,img._8u9w,img._8oii")[0]
                                                .getAttribute("src")
                                    ),
                                postsIgnoredInArrowToStopScript++,
                                totalPostsProcessed++,
                                normal_run_limitNoInvitePosts >= 0
                                    ? normal_run_limitNoInvitePosts++
                                    : (normal_run_limitNoInvitePosts = 0),
                                doPHOTO())
                        : (totalPostsProcessed++,
                          publishingToolTotPost++,
                          normal_run_limitNoInvitePosts >= 0
                              ? normal_run_limitNoInvitePosts++
                              : (normal_run_limitNoInvitePosts = 0),
                          doPHOTO())
                  : MaxPostFound == totalPostsProcessed &&
                      ((checkTwice >= 1 &&
                          !isNotificationTab &&
                          -1 == window.location.href.indexOf("/content_management") &&
                          -1 == window.location.href.indexOf("/latest/posts") &&
                          0 ==
                              getElem(
                                  "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                  ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                              ).length) ||
                          (checkTwice > 13 &&
                              (0 == adsNewManagerScrollPartially ||
                                  adsNewManagerScrollPartially / additionalCoefToScrollLess > 8) &&
                              (!ignoreScannedPosts || (ignoreScannedPosts && checkTwice > 20))))
                    ? 3 == runMode || 4 == runMode
                        ? (debug && console.log("next page 2"), open_next_page())
                        : (console.log("Stop, debug: 1"), stopScript())
                    : (MaxPostFound == totalPostsProcessed && checkTwice++,
                      (MaxPostFound = totalPostsProcessed),
                      publishingToolInv && !isNotificationTab
                          ? 0 == selectedpostsRun
                              ? window.location.href.indexOf("/creatorstudio") > 0
                                  ? (adsNewManagerScrollPartially++,
                                    (additionalCoefToScrollLess = 1),
                                    (getElem(".ReactVirtualized__Grid._1zmk").length > 0 &&
                                        getElem(".ReactVirtualized__Grid._1zmk")[0].scrollHeight > 2500 &&
                                        publishingToolTotPost < 25) ||
                                    (getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length > 0 &&
                                        getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")[
                                            getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length - 1
                                        ].scrollHeight > 2500 &&
                                        publishingToolTotPost < 25)
                                        ? (additionalCoefToScrollLess = 2)
                                        : ((getElem(".ReactVirtualized__Grid._1zmk").length > 0 &&
                                              getElem(".ReactVirtualized__Grid._1zmk")[0].scrollHeight > 8e3 &&
                                              publishingToolTotPost < 50) ||
                                              (getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length > 0 &&
                                                  getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")[
                                                      getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length -
                                                          1
                                                  ].scrollHeight > 8e3 &&
                                                  publishingToolTotPost < 50)) &&
                                          (additionalCoefToScrollLess = 3),
                                    getElem(".uiScrollableAreaWrap").length > 2
                                        ? getElem(".uiScrollableAreaWrap").scrollTop(
                                              getElem(".uiScrollableAreaWrap")[2].scrollHeight *
                                                  ((adsNewManagerScrollPartially / additionalCoefToScrollLess) * 0.19)
                                          )
                                        : getElem(".uiScrollableAreaWrap").length > 1
                                          ? getElem(".uiScrollableAreaWrap").scrollTop(
                                                getElem(".uiScrollableAreaWrap")[1].scrollHeight *
                                                    ((adsNewManagerScrollPartially / additionalCoefToScrollLess) * 0.19)
                                            )
                                          : getElem(".uiScrollableAreaWrap").length > 0 &&
                                            getElem(".uiScrollableAreaWrap").scrollTop(
                                                getElem(".uiScrollableAreaWrap")[0].scrollHeight *
                                                    ((adsNewManagerScrollPartially / additionalCoefToScrollLess) * 0.19)
                                            ),
                                    getElem(".ReactVirtualized__Grid._1zmk").length > 0
                                        ? getElem(".ReactVirtualized__Grid._1zmk").scrollTop(
                                              getElem(".ReactVirtualized__Grid._1zmk")[0].scrollHeight *
                                                  ((adsNewManagerScrollPartially / additionalCoefToScrollLess) * 0.19)
                                          )
                                        : getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length > 0 &&
                                          getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").scrollTop(
                                              getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")[
                                                  getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length - 1
                                              ].scrollHeight *
                                                  ((adsNewManagerScrollPartially / additionalCoefToScrollLess) * 0.19)
                                          ),
                                    (totalPostsProcessed = 0),
                                    (publishingResetArray = !0),
                                    publishingTabNumber++)
                                  : window.location.href.indexOf("/content_management") > 0 ||
                                      window.location.href.indexOf("/latest/posts") > 0 ||
                                      getElem(
                                          "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                          ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                      ).length > 0
                                    ? (adsNewManagerScrollPartially < 12 &&
                                      getElem("._3vo_ .ReactVirtualized__Grid").length > 1 &&
                                      getElem("._3vo_ .ReactVirtualized__Grid")[1].scrollHeight > 1e3
                                          ? (0 == adsNewManagerScrollPartially &&
                                                publishingToolTotPost > 50 &&
                                                adsNewManagerScrollPartially++,
                                            1 == adsNewManagerScrollPartially &&
                                                publishingToolTotPost > 80 &&
                                                adsNewManagerScrollPartially++,
                                            adsNewManagerScrollPartially++,
                                            getElem("._3vo_ .ReactVirtualized__Grid").length > 1 &&
                                                getElem("._3vo_ .ReactVirtualized__Grid").scrollTop(
                                                    getElem("._3vo_ .ReactVirtualized__Grid")[1].scrollHeight *
                                                        (0.2 * adsNewManagerScrollPartially)
                                                ))
                                          : getElem("._3vo_ .ReactVirtualized__Grid").length > 0 &&
                                            getElem("._3vo_ .ReactVirtualized__Grid").scrollTop(99999999),
                                      (totalPostsProcessed = 0),
                                      (publishingResetArray = !0),
                                      publishingTabNumber++)
                                    : (publishingToolElem = getElem("._4sol ._4-u3 .rfloat ._51xa ._42ft")).length > 0
                                      ? $(publishingToolElem[publishingToolElem.length - 1]).is("[disabled]")
                                          ? setTimeout(function () {
                                                tryClickToLoadMorePosts();
                                            }, 900)
                                          : (publishingToolElem[publishingToolElem.length - 1].click(),
                                            (totalPostsProcessed = 0),
                                            (publishingResetArray = !0),
                                            publishingTabNumber++)
                                      : setTimeout(function () {
                                            tryClickToLoadMorePosts();
                                        }, 900)
                              : (3 != runMode && 4 != runMode) || !try_after_limit
                                ? (console.log("Stop, debug: 2"), stopScript())
                                : (debug && console.log("next page 3"), open_next_page())
                          : (window.location.href.indexOf("&notif_t=") > 0 ||
                                  window.location.href.indexOf("?notif_t=") > 0) &&
                              (getElem('div[role="navigation"] ' + scrollingNewFBDesignClassDef).length > 0 ||
                                  getElem('div[role="navigation"] ' + scrollingNewFBDesignClass).length > 0)
                            ? (getElem('div[role="navigation"] ' + scrollingNewFBDesignClassDef).length > 0 &&
                                  getScrollElemNewFb(
                                      'div[role="navigation"] ' + scrollingNewFBDesignClassDef
                                  ).scrollTop(5199948),
                              getElem('div[role="navigation"] ' + scrollingNewFBDesignClass).length > 0 &&
                                  getScrollElemNewFb('div[role="navigation"] ' + scrollingNewFBDesignClass).scrollTop(
                                      5199948
                                  ))
                            : (window.location.href.indexOf("&notif_t=") > 0 ||
                                    window.location.href.indexOf("?notif_t=") > 0 ||
                                    window.location.href.indexOf("/notifications") > 0 ||
                                    window.location.href.indexOf("/videos/") > 0) &&
                                (getElem('div[role="navigation"]>.hybvsw6c>.q5bimw55').length > 0 ||
                                    getElem('div[role="navigation"]>THISisWHENtheyCHANGEitALITTLE'))
                              ? (console.log("scroll notif new1"),
                                getScrollElemNewFb('div[role="navigation"]>.hybvsw6c>.q5bimw55').scrollTop(5199948))
                              : 0 == selectedpostsRun
                                ? (debug && console.log("Scroll try 1"),
                                  window.scrollTo(0, document.body.scrollHeight),
                                  setTimeout(function () {
                                      tryClickToLoadMorePosts();
                                  }, 900))
                                : (3 != runMode && 4 != runMode) || !try_after_limit
                                  ? (console.log("Stop, debug: 3"), stopScript())
                                  : (debug && console.log("next page 4"), open_next_page()),
                      updatePopup(),
                      (timeout = 4e3),
                      (TimerDelayVar1 = setTimeout(function () {
                          doPHOTO();
                      }, timeout)));
    }
}
function verifyThisPostAlreadyScanned(e) {
    if (
        (($(e).find("img._8u9x,img._8u9w,img._8oii").length > 0 &&
            $(e).find("img._8u9x,img._8u9w,img._8oii")[0].getAttribute("src") &&
            $(e).find("img._8u9x,img._8u9w,img._8oii")[0].getAttribute("src").length > 3) ||
            (0 == $(e).find("img._8u9x,img._8u9w,img._8oii").length &&
                $(e).find("img").length > 0 &&
                $(e).find("img")[0].getAttribute("src") &&
                $(e).find("img")[0].getAttribute("src").length > 3)) &&
        (window.location.href.indexOf("/creatorstudio") > 0 ||
            window.location.href.indexOf("/content_management") > 0 ||
            window.location.href.indexOf("/latest/posts") > 0 ||
            getElem("._68tl ._2eqm._3qn7._61-1._2fyi._3qng", ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng")
                .length > 0) &&
        creatorStudioPostOpenedForScrollArray.length > 0 &&
        creatorStudioPostOpenedForScrollArray[0].length > 0
    )
        for (i = 0; i < creatorStudioPostOpenedForScrollArray[0].length; i++)
            if (
                ($(e).find("img._8u9x,img._8u9w,img._8oii").length > 0 &&
                    creatorStudioPostOpenedForScrollArray[0][i] ==
                        $(e).find("img._8u9x,img._8u9w,img._8oii")[0].getAttribute("src")) ||
                (0 == $(e).find("img._8u9x,img._8u9w,img._8oii").length &&
                    $(e).find("img").length > 0 &&
                    creatorStudioPostOpenedForScrollArray[0][i] == $(e).find("img")[0].getAttribute("src"))
            )
                if ($(e).find(".ellipsis,.kiex77na,.l6kht628>div").length > 0) {
                    if (
                        creatorStudioPostOpenedForScrollArray[1][i] ==
                        $(e).find(".ellipsis,.kiex77na,.l6kht628>div").first().text()
                    )
                        if (window.location.href.indexOf("/creatorstudio") > 0) {
                            if (!($(e).find("._1mxi ._4ik4._4ik5").length > 0)) return !0;
                            if (
                                creatorStudioPostOpenedForScrollArray[3][i] ==
                                $(e).find("._1mxi ._4ik4._4ik5").first().text()
                            )
                                return !0;
                        } else if (
                            window.location.href.indexOf("/content_management") > 0 ||
                            window.location.href.indexOf("/latest/posts") > 0 ||
                            (window.location.href.indexOf("/publishing_tools") > 0 &&
                                getElem(
                                    "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                    ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                ).length > 0)
                        ) {
                            if (
                                !(
                                    $(e).closest("._2e42").length &&
                                    $(e).closest("._2e42").next().length > 0 &&
                                    $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").length > 0
                                )
                            )
                                return !0;
                            if (
                                creatorStudioPostOpenedForScrollArray[2][i] ==
                                $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").first().text()
                            )
                                return !0;
                        }
                } else if (window.location.href.indexOf("/creatorstudio") > 0) {
                    if (!($(e).find("._1mxi ._4ik4._4ik5").length > 0)) return !0;
                    if (creatorStudioPostOpenedForScrollArray[3][i] == $(e).find("._1mxi ._4ik4._4ik5").first().text())
                        return !0;
                } else if (
                    window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    (window.location.href.indexOf("/publishing_tools") > 0 &&
                        getElem(
                            "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                            ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                        ).length > 0)
                ) {
                    if (
                        !(
                            $(e).closest("._2e42").length &&
                            $(e).closest("._2e42").next().length > 0 &&
                            $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").length > 0
                        )
                    )
                        return !0;
                    if (
                        creatorStudioPostOpenedForScrollArray[2][i] ==
                        $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").first().text()
                    )
                        return !0;
                }
    return !1;
}
function doPHOTO2() {
    1 == scriptIsRunning &&
        (debug && console.log("doPHOTO2"),
        (inputsPhoto2 = getElem(
            '.uiContextualLayerPositioner .uiContextualLayer ._53ij .UFIContainer .UFILikeSentenceText a[data-testid="n_other_people_link"]',
            '.uiContextualLayerPositioner.hidden_elem a[data-testid="n_other_people_link"]'
        )),
        (adsNewManagerScrollPartially = 0),
        window.location.href.indexOf("/creatorstudio") > 0 &&
            getElem("._4t2a .userContentWrapper span.fwb a", ".hidden_elem span.fwb a").length > 0 &&
            (pageNameAdditionalCheck = getElem("._4t2a .userContentWrapper span.fwb a", ".hidden_elem span.fwb a")
                .first()
                .text()),
        (window.location.href.indexOf("/content_management") > 0 ||
            window.location.href.indexOf("/latest/posts") > 0 ||
            (window.location.href.indexOf("/publishing_tools") > 0 &&
                getElem("._68tl ._2eqm._3qn7._61-1._2fyi._3qng", ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng")
                    .length > 0)) &&
            1 == getElem("._7fc8").length &&
            (pageNameAdditionalCheck = getElem("._7fc8").text()),
        publishingToolInv &&
            (0 ==
                (inputsPhoto2 = getElem(
                    '._37uu ._3399 ._3t53 ._1g5v,div[role="article"] .gpro0wi8 span.pcp91wgn,._3t09 .fbPhotosSnowliftFeedback .fbPhotosSnowliftUfi ._3t53 ._1g5v',
                    ".hidden_elem ._1g5v"
                )).length &&
                (inputsPhoto2 = getElem(
                    "._37uu ._3399 ._3t53 ._1g5v,.gpro0wi8 span.pcp91wgn,._3t09 .fbPhotosSnowliftFeedback .fbPhotosSnowliftUfi ._3t53 ._1g5v",
                    ".hidden_elem ._1g5v"
                )),
            0 == inputsPhoto2.length &&
                getElem(".fbPhotoSnowliftContainer ._6iib ._3dlh", ".hidden_elem ._3dlh,._3dli._3dlh").length > 0 &&
                (inputsPhoto2 = getElem(
                    ".fbPhotoSnowliftContainer ._6iib ._3dlh",
                    ".hidden_elem ._3dlh,._3dli._3dlh"
                ))),
        isNotificationTab &&
            (0 ==
                (inputsPhoto2 = getElem(".UFILikeSentence ._3t53 ._1g5v,._4t2a ._3t53 ._1g5v", ".hidden_elem ._1g5v"))
                    .length &&
                (inputsPhoto2 = getElem(
                    '._66lg ._3dlf ._3dlh._3dli,div[role="article"] .gpro0wi8 span.pcp91wgn',
                    ".hidden_elem ._3dlh"
                )),
            0 == inputsPhoto2.length &&
                (inputsPhoto2 = getElem("._66lg ._3dlf ._3dlh._3dli,.gpro0wi8 span.pcp91wgn", ".hidden_elem ._3dlh"))),
        0 == inputsPhoto2.length &&
        getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").length > 0 &&
        getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").siblings('div[role="button"]').length > 0
            ? (inputsPhoto2 = getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").siblings('div[role="button"]'))
            : 0 == inputsPhoto2.length &&
              getElem('.x1ja2u2z[role="toolbar"] div[role="button"]').length > 0 &&
              (inputsPhoto2 = getElem('.x1ja2u2z[role="toolbar"] div[role="button"]')),
        inputsPhoto2 &&
        inputsPhoto2[0] &&
        (publishingToolInv || (!publishingToolInv && lastphotoOpen != inputsPhoto2.length))
            ? ((lastphotoOpen = inputsPhoto2.length),
              inputsPhoto2[inputsPhoto2.length - 1].click(),
              (TimerDelayVar1 = setTimeout(function () {
                  StartInvitePeople();
              }, fb_timeout_1)))
            : publishingToolInv && !isNotificationTab
              ? getElem('._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]').length > 0
                  ? (getElem('._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]')
                        .last()[0]
                        .click(),
                    (TimerDelayVar1 = setTimeout(function () {
                        newStatsDesignCreatorStudio(0);
                    }, 5e3)))
                  : (inputsPhoto2 = getElem(
                          "._fjd ._5vx2 ._43o4 ._45hc",
                          "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                      )) &&
                      inputsPhoto2[0] &&
                      checkOnceVideoPost
                    ? ($(inputsPhoto2[0]).find("._fjc")[0].click(),
                      setTimeout(function () {
                          $(inputsPhoto2[0]).find("._fjc")[0].click();
                      }, 1e3),
                      (checkOnceVideoPost = !1),
                      (TimerDelayVar1 = setTimeout(function () {
                          doPHOTO2();
                      }, 7e3)))
                    : (inputsPhoto2 = getElem(
                            "._u0y ._1gd5 ._4h2x ._5194",
                            ".hidden_elem ._u0y ._1gd5 ._4h2x ._5194"
                        )) &&
                        inputsPhoto2[0] &&
                        checkOnceVideoPost
                      ? (inputsPhoto2[0].click(),
                        (TimerDelayVar1 = setTimeout(function () {
                            (inputsPhoto2 = getElem(
                                "._fjd ._5vx2 ._43o4 ._45hc",
                                "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                            )) &&
                            inputsPhoto2[0] &&
                            checkOnceVideoPost
                                ? ($(inputsPhoto2[0]).find("._fjc")[0].click(),
                                  setTimeout(function () {
                                      $(inputsPhoto2[0]).find("._fjc")[0].click();
                                  }, 1e3),
                                  (checkOnceVideoPost = !1),
                                  (TimerDelayVar1 = setTimeout(function () {
                                      doPHOTO2();
                                  }, 7e3)))
                                : (debug && console.log("GO TO NEXT Here 1"), ClosePostAndOpenNext(-1));
                        }, 7e3)))
                      : (debug && console.log("GO TO NEXT Here 2"), ClosePostAndOpenNext(-1))
              : isNotificationTab
                ? (debug && console.log("GO TO NEXT Here 3"), ClosePostAndOpenNext(-1))
                : doPHOTO());
}
function newStatsDesignCreatorStudio(e) {
    1 == scriptIsRunning &&
        ((inputsPhoto2 = getElem("._fjd ._5vx2 ._43o4 ._45hc", "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc")) &&
        inputsPhoto2[0] &&
        checkOnceVideoPost
            ? ($(inputsPhoto2[0]).find("._fjc")[0].click(),
              setTimeout(function () {
                  $(inputsPhoto2[0]).find("._fjc")[0].click();
              }, 1e3),
              (checkOnceVideoPost = !1),
              (TimerDelayVar1 = setTimeout(function () {
                  doPHOTO2();
              }, 7e3)))
            : (inputsPhoto2 = getElem("._u0y ._1gd5 ._4h2x ._5194", ".hidden_elem ._u0y ._1gd5 ._4h2x ._5194")) &&
                inputsPhoto2[0] &&
                checkOnceVideoPost
              ? (inputsPhoto2[0].click(),
                (TimerDelayVar1 = setTimeout(function () {
                    (inputsPhoto2 = getElem(
                        "._fjd ._5vx2 ._43o4 ._45hc",
                        "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                    )) &&
                    inputsPhoto2[0] &&
                    checkOnceVideoPost
                        ? ($(inputsPhoto2[0]).find("._fjc")[0].click(),
                          setTimeout(function () {
                              $(inputsPhoto2[0]).find("._fjc")[0].click();
                          }, 1e3),
                          (checkOnceVideoPost = !1),
                          (TimerDelayVar1 = setTimeout(function () {
                              doPHOTO2();
                          }, 7e3)))
                        : (debug && console.log("GO TO NEXT Here 4"), ClosePostAndOpenNext(-1));
                }, 7e3)))
              : e > 5
                ? (debug && console.log("GO TO NEXT Here 5"), ClosePostAndOpenNext(-1))
                : (TimerDelayVar1 = setTimeout(function () {
                      newStatsDesignCreatorStudio(e + 1);
                  }, 5e3)));
}
function doPHOTO3s() {
    (totalPostsProcessed = 0),
        publishingToolInv &&
            (getElem(".layerCancel").length > 1 && getElem(".layerCancel")[1].click(),
            getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click()),
        doPHOTO3();
}
function doPHOTO3() {
    1 == scriptIsRunning &&
        (0 == totalPostsProcessed &&
            (inputsPhoto2 = getElem(
                '.uiContextualLayerPositioner .uiContextualLayer ._53ij .UFIContainer .UFILikeSentenceText a[data-testid="n_other_people_link"]',
                '.uiContextualLayerPositioner.hidden_elem a[data-testid="n_other_people_link"]'
            )),
        0 == inputsPhoto2.length || 1 == inputsPhoto2.length
            ? doPHOTO()
            : inputsPhoto2.length > totalPostsProcessed
              ? (inputsPhoto2[totalPostsProcessed].click(),
                totalPostsProcessed++,
                normal_run_limitNoInvitePosts >= 0
                    ? normal_run_limitNoInvitePosts++
                    : (normal_run_limitNoInvitePosts = 0),
                updatePopup(),
                (loop_skip_secondtime = !0),
                (TimerDelayVar1 = setTimeout(function () {
                    StartInvitePeople();
                }, fb_timeout_1)))
              : reloadloop
                ? prepareforReloadPage()
                : (updatePopup(
                      ". " +
                          api.i18n.getMessage("pause_1") +
                          " " +
                          loop_Pause / 1e3 +
                          " " +
                          api.i18n.getMessage("pause_2"),
                      1
                  ),
                  (totalPostsProcessed = 0),
                  (skip_if_no_buttons_after_first_loop = !0),
                  (loopTimerDelay = setTimeout(function () {
                      doPHOTO3s();
                  }, loop_Pause))));
}
function prepareforReloadPage() {
    if (((skip_if_no_buttons_after_first_loop = !0), 4 == runMode))
        updatePopup("", 1),
            (loopTimerDelay = setTimeout(function () {
                debug && console.log("next page 5"), open_next_page();
            }, 10));
    else {
        var e = new Date();
        e.setSeconds(e.getSeconds() + loop_Pause / 1e3),
            updatePopup(
                ". " +
                    api.i18n.getMessage("pause_1") +
                    " " +
                    loop_Pause / 1e3 +
                    " " +
                    api.i18n.getMessage("pause_2") +
                    ' <span style="color:green"><b>' +
                    api.i18n.getMessage("pause_3") +
                    " (" +
                    ("0" + e.getHours()).slice(-2) +
                    ":" +
                    ("0" + e.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + e.getSeconds()).slice(-2) +
                    ")</b></span>",
                1
            ),
            (totalPostsProcessed = 0),
            (loopTimerDelay = setTimeout(function () {
                multiPageUniqueFunc(
                    "",
                    0,
                    runMode,
                    total_shared_posts_liked,
                    total_shared_posts_commented,
                    mtotalInvited,
                    1,
                    !0
                ),
                    setTimeout(function () {
                        backgrReloadPage("");
                    }, 800);
            }, loop_Pause));
    }
}
function prepareforReloadPage2() {
    skip_if_no_buttons_after_first_loop = !0;
    var e = new Date();
    e.setSeconds(e.getSeconds() + loop_Pause / 1e3),
        updatePopup(
            ". " +
                api.i18n.getMessage("pause_1") +
                " " +
                loop_Pause / 1e3 +
                " " +
                api.i18n.getMessage("pause_2") +
                ' <span style="color:green"><b>' +
                api.i18n.getMessage("pause_3") +
                " (" +
                ("0" + e.getHours()).slice(-2) +
                ":" +
                ("0" + e.getMinutes()).slice(-2) +
                ":" +
                ("0" + e.getSeconds()).slice(-2) +
                ")</b></span>",
            1
        ),
        (totalPostsProcessed = 0),
        4 == runMode
            ? 1 == limitreached
                ? (console.log("Stop, debug: 4"), stopScript())
                : (loopTimerDelay = setTimeout(function () {
                      start_mode4();
                  }, loop_Pause))
            : (loopTimerDelay = setTimeout(function () {
                  multiPageUniqueFunc(
                      "",
                      0,
                      runMode,
                      total_shared_posts_liked,
                      total_shared_posts_commented,
                      mtotalInvited,
                      1,
                      !0
                  ),
                      setTimeout(function () {
                          backgrReloadPage("");
                      }, 800);
              }, loop_Pause));
}
function backgrReloadPage(e) {
    var t = window.location.href;
    t.indexOf("realt=") > 0 && (t = t.substring(0, t.indexOf("realt=") - 1)),
        t.indexOf("fbe-number=") > 0 && (t = t.substring(0, t.indexOf("fbe-number=") - 1)),
        t.indexOf("/posts/") > 0 &&
            t.indexOf("/pg/") > 0 &&
            t.match(new RegExp("/pg/(.*)/posts/")) &&
            t.match(new RegExp("/pg/(.*)/posts/"))[1] &&
            (t =
                "https://www.facebook.com/" +
                t.match(new RegExp("/pg/(.*)/posts/"))[1] +
                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending"),
        t.indexOf("/photos/") > 0 &&
            t.indexOf("/pg/") > 0 &&
            t.match(new RegExp("/pg/(.*)/photos/")) &&
            t.match(new RegExp("/pg/(.*)/photos/"))[1] &&
            (t =
                "https://www.facebook.com/" +
                t.match(new RegExp("/pg/(.*)/photos/"))[1] +
                "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending"),
        t.indexOf("?") > 0 ? (t += "&") : (t += "?"),
        (t = (t += e).replace("&current_page=", "&rem=")),
        window.location.replace(t);
}
function do1() {
    if (
        (debug && console.log("do1"),
        getElem(
            getElemWithAddFriendButtons('div[role="dialog"] span:contains("Add Friend")'),
            getElemWithAddFriendButtons('div[role="article"] span:contains("Add Friend")')
        ).length > 5 &&
        (getElem(scrollingNewFBDesignClassDef).length > 0 || getElem(scrollingNewFBDesignClass).length > 0)
            ? ((scriptIsRunning = 0),
              alert(
                  'Oh, we have a problem!\r\nI see too many "Add Friend" buttons. We should have "Invite" buttons instead.\r\n\r\nCheck another tab where you have Invite buttons and run the script there. Don\'t find them? Are you using correct profile? Or contact Facebook and ask them to enable Invite feature for your page: https://www.facebook.com/business/help'
              ))
            : (destroyPopupInfo(), (scriptIsRunning = 1)),
        1 == scriptIsRunning)
    ) {
        weAreScanningOnlyShared = !1;
        var e = 0,
            t = !1;
        if (
            getElem(
                '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0',
                "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
            ).length > 0 &&
            3 != runMode &&
            4 != runMode &&
            (inviteDuringShareCheck ||
                inviteDuringShareCheck2 ||
                likeSharedComments ||
                share_put_likes ||
                (share_put_comments && text_comm_shares.length > 1))
        )
            if (
                confirm(
                    "Shared posts are OPEN. If you want to scan ONLY shared posts now - press OK. If you cancel - we will close shared posts and scan the page as usual.\r\nScript will use next page name (if it is wrong run in another tab or set settings to post comments with default profile): " +
                        getCurrentPageTitle()
                )
            ) {
                if (t) return;
                (t = !0),
                    (e = 1),
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    (weAreScanningOnlyShared = !0),
                    StartLIKEPosts(0);
            } else {
                if (t) return;
                (t = !0),
                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
                        getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
                            getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
                        ].click(),
                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                        getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click(),
                    getElem(".layerCancel").length > 3 && getElem(".layerCancel")[3].click(),
                    getElem(".layerCancel").length > 2 && getElem(".layerCancel")[2].click(),
                    getElem(".layerCancel").length > 1 && getElem(".layerCancel")[1].click(),
                    getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click(),
                    closeInviteWindowInNewUI();
            }
        if (
            (0 == e &&
                (window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                    window.location.href.indexOf("/creatorstudio?tab=home") > 0) &&
                ((e = 1),
                stopScript(
                    "ERROR! You are in the HOME tab of Creator Studio, no posts here!<br><b>OPEN Creator Studio -> Content Library -> Posts and run script there.</b>"
                )),
            0 == e &&
                ((weAreScanningOnlyInvites = !1),
                isThisNewFbDesign2020() &&
                    getNewInviteButtonsByText().length > 0 &&
                    3 != runMode &&
                    4 != runMode &&
                    0 ==
                        getElem(".oajrlxb2").filter(function () {
                            return "false" == $(this).attr("aria-checked");
                        }).length &&
                    confirm(
                        "It seems that list of post likers is OPEN. If you want to scan likers ONLY for this post press OK. We suggest you to run the script in Publishing Tools tab, Creator Studio or Content Management to automatically scan ALL your posts!"
                    ) &&
                    ((e = 1),
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    (weAreScanningOnlyInvites = !0),
                    StartInvitePeople())),
            0 == e)
        )
            if (
                0 == share_put_likes &&
                0 == inviteDuringShareCheck &&
                0 == inviteDuringShareCheck2 &&
                0 == likeSharedComments &&
                (text_comm_shares.length < 2 || !share_put_comments) &&
                1 == skip_Invite
            )
                alert("ATTENTION: check Settings better, you have disabled Invite and Like features!"),
                    destroyPopup(),
                    (scriptIsRunning = 0);
            else if (
                (1 == share_put_likes ||
                    (share_put_comments && text_comm_shares.length > 1) ||
                    inviteDuringShareCheck ||
                    inviteDuringShareCheck2 ||
                    likeSharedComments) &&
                1 == skip_Invite &&
                3 != runMode &&
                4 != runMode &&
                -1 == document.location.href.indexOf("publishing_tools") &&
                -1 == document.location.href.indexOf("notifications/") &&
                -1 == document.location.href.indexOf("/photos/") &&
                -1 == document.location.href.indexOf("business.facebook.com/ads") &&
                -1 == document.location.href.indexOf("facebook.com/adsmanager/") &&
                -1 == document.location.href.indexOf("/content_management") &&
                -1 == window.location.href.indexOf("/latest/posts") &&
                -1 == window.location.href.indexOf("/videos/") &&
                -1 == window.location.href.indexOf("/photo/") &&
                -1 == window.location.href.indexOf("/creatorstudio") &&
                -1 == window.location.href.indexOf("/latest/posts")
            )
                alert(
                    "ATTENTION: You have enabled ONLY shared posts feature. Run extension in Publishing Tools, Content management, Creator Studio or Business Suite tabs!"
                ),
                    destroyPopup(),
                    (scriptIsRunning = 0);
            else if (
                ((document.location.href.indexOf("/posts/?") > 0 ||
                    (getElem("._2yaa._2yap").length > 0 &&
                        ("tab_posts" == getElem("._2yaa._2yap").attr("data-key") ||
                            "tab_home" == getElem("._2yaa._2yap").attr("data-key") ||
                            "Discussion" == getElem("._2yaa._2yap").attr("title")))) &&
                    3 != runMode &&
                    4 != runMode &&
                    alert(
                        "Attention! We suggest you to run the script in the Business Suite, Publishing tools, Creator Studio, Ads manager tab. If more than 1 post is opened on the same page, script doesn't work well."
                    ),
                loop_PostsList.length > 0 &&
                    (loop_PostsListArray = loop_PostsList.split(",").map(function (e) {
                        return Number(e.trim());
                    })),
                getElem(".fbProfileBrowser .fbProfileBrowserListContainer .fbProfileBrowserListItem").length > 0)
            ) {
                var n = null,
                    o = getElem(".fbProfileBrowserListContainer .uiButton._1sm");
                createPopup2();
                var i = document.getElementsByClassName("fbProfileBrowserResult")[0];
                (i.scrollTop = i.scrollHeight),
                    setTimeout(function () {
                        startScrollFriendsList(i, o);
                    }, 2e3);
            } else if (
                getElem(
                    ".uiList._4kg ._2gdu ._42o8,.uiList._4kg ._2gdu ._64xy ._2gf5",
                    ".hidden_elem ._2gf5,.hidden_elem ._42o8"
                ).length > 0
            ) {
                n = null;
                setTimeout(function () {
                    inviteFriendsNEW();
                }, 100);
            } else if (
                getElem(".oajrlxb2").filter(function () {
                    return "false" == $(this).attr("aria-checked");
                }).length > 0
            ) {
                n = null;
                setTimeout(function () {
                    inviteFriendsNew2020();
                }, 100);
            } else
                getElem("#content_container ._2eec ._3x2f .rfloat ._4crj").length > 0
                    ? ((isPhotoInviting = 1),
                      document.getElementById("add-all-div-sw") && n && destroyPopup(),
                      createPopup(),
                      (totalPostsProcessed = skip_post_setting) > 1 && totalPostsProcessed--,
                      tryToCloseIfSomethingOpen2(),
                      setTimeout(function () {
                          doPHOTO();
                      }, 500))
                    : getElem("._3h1j ._1gda ._3pzj ._4h2m ._4h2x._4lge ._2pir", ".hidden_elem ._2pir").length > 0
                      ? (debug && console.log("page manager tool"),
                        (publishingToolInv = !0),
                        (isPhotoInviting = 1),
                        skip_post_setting < 25 && (totalPostsProcessed = skip_post_setting),
                        totalPostsProcessed > 1 && totalPostsProcessed--,
                        document.getElementById("add-all-div-sw") && n && destroyPopup(),
                        createPopup(),
                        tryToCloseIfSomethingOpen2(),
                        setTimeout(function () {
                            doPHOTO();
                        }, 500))
                      : (window.location.href.indexOf("/creatorstudio") > 0 ||
                              window.location.href.indexOf("/latest/posts") > 0 ||
                              window.location.href.indexOf("/content_management") > 0 ||
                              window.location.href.indexOf("/publishing_tools") > 0) &&
                          (getElem("table tr._2zxd._2zyc,._1ug5", ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5")
                              .length > 0 ||
                              getElem(
                                  "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                  ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                              ).filter(function () {
                                  return $(this).find(".ellipsis,.kiex77na,.l6kht628>div").length > 0;
                              }).length > 0)
                        ? (debug && console.log("crator studio scan"),
                          (publishingToolInv = !0),
                          (isPhotoInviting = 1),
                          skip_post_setting < 10 && (totalPostsProcessed = skip_post_setting),
                          totalPostsProcessed > 1 && totalPostsProcessed--,
                          document.getElementById("add-all-div-sw") && n && destroyPopup(),
                          createPopup(),
                          tryToCloseIfSomethingOpen2(),
                          setTimeout(function () {
                              doPHOTO();
                          }, 500))
                        : (window.location.href.indexOf("/notifications") > 0 &&
                                getElem("._5tdr ._1t7p ._2v5c", ".hidden_elem ._2v5c").length > 0) ||
                            (isThisNewFbDesign2020() &&
                                getElem(".l9j0dhe7:visible")
                                    .not(".y3zKF.sqdOP.yWX7d._8A5w5")
                                    .filter(function () {
                                        return "row" == $(this).attr("role") && 0 == $(this).find(".sx_160564").length;
                                    }).length > 0 &&
                                (document.location.href.indexOf("/notifications") ||
                                    document.location.href.indexOf("&notif_t=") ||
                                    document.location.href.indexOf("?notif_t=")))
                          ? (debug && console.log("notifications tab"),
                            (isNotificationTab = !0),
                            (publishingToolInv = !0),
                            (isPhotoInviting = 1),
                            skip_post_setting < 25 && (totalPostsProcessed = skip_post_setting),
                            totalPostsProcessed > 1 && totalPostsProcessed--,
                            document.getElementById("add-all-div-sw") && n && destroyPopup(),
                            createPopup(),
                            tryToCloseIfSomethingOpen2(),
                            setTimeout(function () {
                                doPHOTO();
                            }, 500))
                          : (window.location.href.indexOf("/videos/") > 0 ||
                                  window.location.href.indexOf("/photo/") > 0) &&
                              getElem("._2x4v", ".hidden_elem ._2x4v").length > 0
                            ? setTimeout(function () {
                                  do2();
                              }, 2e3)
                            : window.location.href.indexOf("/watch/") > 0 && getElem("._1c_u ._53j5 ._ox1").length > 0
                              ? (getElem("._1c_u ._53j5 ._ox1")[0].click(),
                                setTimeout(function () {
                                    getElem("._437j ._3l-q ._6dic a._371y").length > 0 &&
                                        (pageNameAdditionalCheck = getElem("._437j ._3l-q ._6dic a._371y").text()),
                                        do2();
                                }, 4e3))
                              : window.location.href.indexOf("/watch/") > 0 &&
                                  getElem("._wyj._20nr ._7gpd a._7gm_").length > 0
                                ? (getElem("._wyj._20nr ._7gsh a").length > 0 &&
                                      (pageNameAdditionalCheck = getElem("._wyj._20nr ._7gsh a").text()),
                                  do2())
                                : (2 == runMode || 3 == runMode || 4 == runMode) &&
                                    tryAgainForFullScan < 10 &&
                                    window.location.href.indexOf("runMode=") > 0
                                  ? (tryAgainForFullScan++,
                                    setTimeout(function () {
                                        do1();
                                    }, 1500))
                                  : (getElem(".layerCancel").length > 0 || inviteWindowInNewUIOpen()) &&
                                      !check_post_first
                                    ? (getElem(".layerCancel").length > 1 &&
                                          setTimeout(function () {
                                              getElem(".layerCancel").length > 1 && getElem(".layerCancel")[1].click();
                                          }, 70),
                                      getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click(),
                                      closeInviteWindowInNewUI(),
                                      setTimeout(function () {
                                          do2();
                                      }, 2e3))
                                    : setTimeout(function () {
                                          do2();
                                      }, 200);
    }
}
function tryToCloseIfSomethingOpen2() {
    doNotCloseFirstRunSelectPostsVerif
        ? (doNotCloseFirstRunSelectPostsVerif = !1)
        : (getElem(".layerCancel").length > 0 &&
              (getElem(".layerCancel").length > 4 &&
                  setTimeout(function () {
                      getElem(".layerCancel").length > 4 && getElem(".layerCancel")[4].click();
                  }, 20),
              getElem(".layerCancel").length > 3 &&
                  setTimeout(function () {
                      getElem(".layerCancel").length > 3 && getElem(".layerCancel")[3].click();
                  }, 70),
              getElem(".layerCancel").length > 2 &&
                  setTimeout(function () {
                      getElem(".layerCancel").length > 2 && getElem(".layerCancel")[2].click();
                  }, 170),
              getElem(".layerCancel").length > 1 &&
                  setTimeout(function () {
                      getElem(".layerCancel").length > 1 && getElem(".layerCancel")[1].click();
                  }, 270),
              getElem(".layerCancel")[0].click()),
          closeInviteWindowInNewUI());
}
function startScrollFriendsList(e, t) {
    1 == scriptIsRunning &&
        (FriendsListHeight ==
            getElem(".fbProfileBrowser .fbProfileBrowserResult .fbProfileBrowserListContainer").height() &&
        2 == FriendsTry
            ? inviteNextFriend(0, (t = getElem(".fbProfileBrowserListContainer .uiButton._1sm")))
            : FriendsListHeight ==
                getElem(".fbProfileBrowser .fbProfileBrowserResult .fbProfileBrowserListContainer").height()
              ? (FriendsTry++,
                setTimeout(function () {
                    startScrollFriendsList(e, t);
                }, 2e3))
              : ((FriendsTry = 0),
                (FriendsListHeight = getElem(
                    ".fbProfileBrowser .fbProfileBrowserResult .fbProfileBrowserListContainer"
                ).height()),
                (e.scrollTop = e.scrollHeight),
                setTimeout(function () {
                    startScrollFriendsList(e, t);
                }, 2e3)));
}
function inviteNextFriend(e, t) {
    1 == scriptIsRunning &&
        (e < t.length
            ? document.documentElement.innerHTML.indexOf("no more invitations to like this Page can be sent today") > -1
                ? (destroyPopup(), alert("(1) " + api.i18n.getMessage("limit_err1")))
                : ((found = 0),
                  getElem("._pig").length,
                  0 == found &&
                      (total < fb_limit && (total++, t[e].click()),
                      e++,
                      (timeout = Math.floor(101 * Math.random()) + 1600),
                      total % 3 == 0 && (timeout = Math.floor(1801 * Math.random()) + 1600),
                      total % 40 == 0 && (timeout = Math.floor(7001 * Math.random()) + 8e3),
                      (TimerDelayVar1 = setTimeout(function () {
                          inviteNextFriend(e, t);
                      }, timeout)),
                      updateCount(t.length)))
            : (destroyPopup(),
              alert(
                  "FRIENDS INVITE: " +
                      total +
                      " of " +
                      t.length +
                      " friends were invited. Try also to invite fans (who liked your posts)!"
              )));
}
function updateCount(e) {
    document.getElementById("invite-all-count-sw").innerText = total + "/" + e;
}
function createPopup2() {
    document.getElementsByTagName("head")[0];
    var e = document.getElementsByTagName("body")[0],
        t = document.createElement("div");
    t.setAttribute("id", "add-all-div-sw"),
        t.setAttribute(
            "style",
            'text-align:center;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;padding:20px;width:60%;border:2px solid #ccc;background-color:#fff;position:fixed;margin:0 auto;z-index:999;top: 5px;left:20%;font-size:1.5em;'
        ),
        (t.innerHTML =
            "Inviting Everyone in the List (Limit = " +
            fb_limit +
            ')...<span id="invite-all-count-sw">0</span> invited so far...'),
        e.appendChild(t),
        (popup = t);
}
function inviteFriendsNEW() {
    var e = getElem(".uiList._4kg ._2gdu ._42o8._42oc");
    (invitedToEvent = 0), e.length > 0 && invitedToEvent < 490 ? inviteNextForFRIENDSNEW(0, e) : (scriptIsRunning = 0);
}
function inviteNextForFRIENDSNEW(e, t) {
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < 490
                ? (invitedToEvent++,
                  t[e].click(),
                  setTimeout(function () {
                      (t = getElem(".uiList._4kg ._2gdu ._42o8._42oc")), inviteNextForFRIENDSNEW(e, t);
                  }, 150))
                : (alert('ALL friends were selected, now you can check the list and click on "Send Invites" button.'),
                  (scriptIsRunning = 0))
            : setTimeout(function () {
                  inviteFRIENDSNEWScrollMore();
              }, 300));
}
function inviteFRIENDSNEWScrollMore() {
    getElem("._4t2a ._50f4 ._15z1._3kbk").length > 0
        ? setTimeout(function () {
              getElem("._4t2a ._50f4 ._15z1._3kbk").scrollTop(getElem("._4t2a ._50f4 ._15z1._3kbk")[0].scrollHeight);
          }, 5)
        : (scriptIsRunning = 0),
        setTimeout(function () {
            (inputs = getElem(".uiList._4kg ._2gdu ._42o8._42oc")),
                inputs.length > 0
                    ? inviteNextForFRIENDSNEW(0, inputs)
                    : (alert(
                          'ALL friends were selected, now you can check the list and click on "Send Invites" button.'
                      ),
                      (scriptIsRunning = 0));
        }, 2e3);
}
function inviteFriendsNew2020() {
    var e = getElem(".oajrlxb2").filter(function () {
        return (
            "false" == $(this).attr("aria-checked") && (!$(this).attr("tabindex") || "-1" != $(this).attr("tabindex"))
        );
    });
    (invitedToEvent = 0),
        (e.length > 0 ||
            getElem(".oajrlxb2").filter(function () {
                return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
            }).length > 0) &&
        invitedToEvent < 490
            ? inviteNextForFRIENDSNEW2020(0, e)
            : (scriptIsRunning = 0);
}
function inviteNextForFRIENDSNEW2020(e, t) {
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < 490
                ? (invitedToEvent++,
                  t[e].click(),
                  e++,
                  setTimeout(function () {
                      inviteNextForFRIENDSNEW2020(e, t);
                  }, 150))
                : (alert('ALL friends were selected, now you can check the list and click on "Send Invites" button.'),
                  (scriptIsRunning = 0))
            : setTimeout(function () {
                  inviteFRIENDSNEWScrollMore(0);
              }, 300));
}
var maxScrolledElements = 0;
function inviteFRIENDSNEWScrollMore(e) {
    getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
        ? setTimeout(function () {
              getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
          }, 5)
        : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
          setTimeout(function () {
              getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
          }, 5),
        setTimeout(function () {
            var t = getElem(".oajrlxb2").filter(function () {
                return (
                    "false" == $(this).attr("aria-checked") &&
                    (!$(this).attr("tabindex") || "-1" != $(this).attr("tabindex"))
                );
            });
            t.length > 1
                ? inviteNextForFRIENDSNEW2020(0, t)
                : t.length < 2 &&
                    (e < 6 ||
                        getElem(".oajrlxb2").filter(function () {
                            return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
                        }).length > maxScrolledElements)
                  ? ((maxScrolledElements = getElem(".oajrlxb2").filter(function () {
                        return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
                    }).length),
                    inviteFRIENDSNEWScrollMore(e + 1))
                  : (alert('ALL friends were selected, now you can check the list and click on "Send Invites" button.'),
                    (scriptIsRunning = 0));
        }, 1500);
}
function inviteNextForEvent(e, t) {
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < 500
                ? (invitedToEvent++,
                  t[e].click(),
                  e++,
                  setTimeout(function () {
                      (inviteEvent = getElem("._6ht6 ._6i6z._3qn7 button._1gcq").filter(function () {
                          return "false" == $(this).attr("aria-checked");
                      })).length > 0
                          ? inviteNextForEvent(0, inviteEvent)
                          : setTimeout(function () {
                                inviteEventScrollMore(scrollQ + 1);
                            }, 10);
                  }, 100))
                : (scriptIsRunning = 0)
            : setTimeout(function () {
                  inviteEventScrollMore(scrollQ + 1);
              }, 10));
}
function inviteEventScrollMore(e) {
    (scrollQ = e),
        getElem(".ReactVirtualized__Grid.ReactVirtualized__List").length > 0
            ? setTimeout(function () {
                  getElem(".ReactVirtualized__Grid.ReactVirtualized__List").scrollTop(800 * e);
              }, 5)
            : getElem("._3qey .uiScrollableArea .uiScrollableAreaWrap").length > 0 &&
              setTimeout(function () {
                  getElem("._3qey .uiScrollableArea .uiScrollableAreaWrap").scrollTop(
                      getElem("._3qey .uiScrollableArea .uiScrollableAreaWrap")[0].scrollHeight
                  );
              }, 5),
        setTimeout(function () {
            inviteEventF();
        }, 2e3);
}
function inviteEventF() {
    0 == (inviteEvent = getElem(".uiScrollableAreaContent ._1pt_ ._2aks ._51mw ._1pu4")).length &&
        (inviteEvent = getElem("._6ht6 ._6i6z._3qn7 button._1gcq").filter(function () {
            return "false" == $(this).attr("aria-checked");
        })),
        inviteEvent.length > 0 && invitedToEvent < 500 ? inviteNextForEvent(0, inviteEvent) : (scriptIsRunning = 0);
}
function do2() {
    if (1 == scriptIsRunning)
        if (
            (0 == (inviteEvent = getElem(".uiScrollableAreaContent ._1pt_ ._2aks ._51mw ._1pu4")).length &&
                (inviteEvent = getElem("._6ht6 ._6i6z._3qn7 button._1gcq").filter(function () {
                    return "false" == $(this).attr("aria-checked");
                })),
            inviteEvent.length > 0)
        )
            destroyPopup(), (scriptIsRunning = 1), inviteEventF();
        else {
            var e = document.getElementsByClassName("_3f-h");
            e && e.length,
                setTimeout(function () {
                    do3();
                }, 1e3);
        }
}
function do3() {
    if (1 == scriptIsRunning)
        if (
            ((totalPostsProcessed = skip_post_setting) > 1 && totalPostsProcessed--,
            document.getElementById("add-all-div-sw") && popup && destroyPopup(),
            createPopup(),
            skip_post_setting > 7 && 0 == loop_PostsList.length)
        ) {
            setTimeout(function () {
                tryClickToLoadMorePosts();
            }, 10);
            for (var e = 0; e < Math.ceil(skip_post_setting / 5); e++)
                setTimeout(
                    function () {
                        tryClickToLoadMorePosts();
                    },
                    1e3 + 3500 * e
                );
            TimerDelayVar1 = setTimeout(
                function () {
                    do4();
                },
                4e3 + 3500 * Math.ceil(skip_post_setting / 5)
            );
        } else if (loop_PostsList.length > 0) {
            if (((timeout = 1e3), loop_PostsListArray.length > 0)) {
                var t = Math.max.apply(Math, loop_PostsListArray);
                if (t > 0)
                    for (e = 0; e < Math.ceil(t / 5); e++)
                        (TimerDelayVar1 = setTimeout(
                            function () {
                                tryClickToLoadMorePosts();
                            },
                            1e3 + 3500 * e
                        )),
                            (timeout = 3500 * e + 5e3);
            }
            TimerDelayVar1 = setTimeout(function () {
                do4();
            }, timeout);
        } else
            check_post_first && (getElem(".layerCancel").length > 0 || inviteWindowInNewUIOpen())
                ? StartInvitePeople()
                : 0 == inputsComments.length || inputsComments.length <= totalPostsProcessed
                  ? (tryClickToLoadMorePosts(),
                    setTimeout(function () {
                        do4();
                    }, 4e3))
                  : do4();
}
var inputsShareButton = getElem(".qqfsdfsfsdwwwwwqwdnoelement"),
    pageNameOfThisPost = "";
function do4() {
    debug && console.log("inputsComments1:" + inputsComments.length),
        inputsComments.length > 0
            ? goBackToMainTab(0)
            : 1 == scriptIsRunning &&
              ((0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                  (inputsComments = getElem("._2x4v", ".hidden_elem ._2x4v")),
              debug && console.log("inputsComments2:" + inputsComments.length),
              (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                  getElem("._66lg a._3dlf,span.pcp91wgn", "._66lg .hidden_elem a._3dlf").length > 0 &&
                  (document.location.href.indexOf("/posts/") > 0 || document.location.href.indexOf("/photos/") > 0) &&
                  (((inputsComments = getElem("._66lg a._3dlf,span.pcp91wgn", "._66lg .hidden_elem a._3dlf")).length =
                      1),
                  $(inputsComments).closest(".bkfpd7mw").length > 0 &&
                      $(inputsComments).closest(".bkfpd7mw").find('.gtad4xkn>span div[role="button"]').length > 0 &&
                      (inputsShareButton = $(inputsComments)
                          .closest(".bkfpd7mw")
                          .find('.gtad4xkn>span div[role="button"]')),
                  -1 == document.location.href.indexOf("/posts/") &&
                      ($(inputsComments).closest('div[role="article"]').length > 0 &&
                          $(inputsComments).closest('div[role="article"]').find('h2 a.oajrlxb2[role="link"] span')
                              .length > 0 &&
                          $(inputsComments)
                              .closest('div[role="article"]')
                              .find('h2 a.oajrlxb2[role="link"] span')
                              .text().length > 0 &&
                          (pageNameOfThisPost = $(inputsComments)
                              .closest('div[role="article"]')
                              .find('h2 a.oajrlxb2[role="link"] span')
                              .text()),
                      console.log("my page name:" + pageNameOfThisPost))),
              (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                  getElem('._66lg a._3dlf,div[role="article"] .gpro0wi8 span.pcp91wgn', "._66lg .hidden_elem a._3dlf")
                      .length > 0 &&
                  document.location.href.indexOf("/posts/") &&
                  (inputsComments = getElem(
                      '._66lg a._3dlf,div[role="article"] .gpro0wi8 span.pcp91wgn',
                      "._66lg .hidden_elem a._3dlf"
                  )),
              0 == inputsComments.length &&
                  getElem("._wyj._20nr ._7gpd a._7gm_").length > 0 &&
                  document.location.href.indexOf("/watch/") &&
                  (inputsComments = getElem("._wyj._20nr ._7gpd a._7gm_")),
              0 == inputsComments.length &&
                  getElem('.stjgntxs div[role="button"] .ni8dbmo4>span').length > 0 &&
                  document.location.href.indexOf("/watch/") &&
                  (inputsComments = getElem('.stjgntxs div[role="button"] .ni8dbmo4>span')),
              0 == inputsComments.length &&
                  getElem("._4bl7 ._7rb8 ._1n9k>a").length > 0 &&
                  document.location.href.indexOf("/videos/") &&
                  ((inputsComments = getElem("._4bl7 ._7rb8 ._1n9k>a")),
                  setTimeout(function () {
                      getElem("._4t2a ._21ab li._45hc>a", "._4t2a ._21ab li._45hc._1hqh ._21af._9zc").length > 0 &&
                          getElem("._4t2a ._21ab li._45hc>a", "._4t2a ._21ab li._45hc._1hqh ._21af._9zc")[0].click();
                  }, 2e3)),
              0 == inputsComments.length &&
              getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").length > 0 &&
              getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").siblings('div[role="button"]').length > 0
                  ? (inputsComments = getElem(".x1iyjqo2.x78zum5 span.x1ja2u2z").siblings('div[role="button"]'))
                  : 0 == inputsComments.length &&
                    getElem('.x1ja2u2z[role="toolbar"] div[role="button"]').length > 0 &&
                    (inputsComments = getElem('.x1ja2u2z[role="toolbar"] div[role="button"]')),
              debug && console.log("inputsComments3:" + inputsComments.length),
              loop_PostsListArray.length > 0
                  ? 0 == inputsComments.length
                      ? 3 == tryMoreToScroll
                          ? 3 == runMode || 4 == runMode
                              ? (debug && console.log("next page 6"), open_next_page())
                              : 2 == _runMode
                                ? (console.log(
                                      "Error: didn't find posts after reload, will try to reload the page again in 1 minute. Wait."
                                  ),
                                  updatePopup(
                                      ". Error: didn't find posts after reload, will try to reload the page again in 1 minute. Wait.."
                                  ),
                                  (TimerDelayVar1 = setTimeout(function () {
                                      window.location.replace(window.location.href);
                                  }, 6e4)))
                                : (window.location.href.indexOf("/creatorstudio") > 0
                                      ? (window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                                            window.location.href.indexOf("/creatorstudio?tab=home"),
                                        goBackToMainTab(0))
                                      : isThisNewFbDesign2020() || newFBinviteDesign
                                        ? goBackToMainTab(0)
                                        : alert(api.i18n.getMessage("error1")),
                                  destroyPopup(),
                                  (scriptIsRunning = 0))
                          : (tryMoreToScroll++,
                            debug && console.log("Scroll try 2"),
                            window.scrollTo(0, document.body.scrollHeight),
                            (TimerDelayVar1 = setTimeout(function () {
                                do4();
                            }, 5e3)))
                      : totalPostsProcessed < inputsComments.length
                        ? (totalPostsProcessed++,
                          normal_run_limitNoInvitePosts >= 0
                              ? normal_run_limitNoInvitePosts++
                              : (normal_run_limitNoInvitePosts = 0),
                          loop_PostsListArray.indexOf(totalPostsProcessed) > -1
                              ? inputsComments[totalPostsProcessed - 1]
                                  ? (inputsComments[totalPostsProcessed - 1].click(),
                                    updatePopup(),
                                    (TimerDelayVar1 = setTimeout(function () {
                                        StartInvitePeople();
                                    }, fb_timeout_1)))
                                  : (debug && console.log("Scroll try 3"),
                                    window.scrollTo(0, document.body.scrollHeight),
                                    (TimerDelayVar1 = setTimeout(function () {
                                        do4();
                                    }, fb_timeout_4)))
                              : do4())
                        : reloadloop
                          ? prepareforReloadPage()
                          : (updatePopup(
                                ". " +
                                    api.i18n.getMessage("pause_1") +
                                    " " +
                                    loop_Pause / 1e3 +
                                    " " +
                                    api.i18n.getMessage("pause_2"),
                                1
                            ),
                            (skip_if_no_buttons_after_first_loop = !0),
                            (totalPostsProcessed = 0),
                            (loopTimerDelay = setTimeout(function () {
                                do4();
                            }, loop_Pause)))
                  : 0 == inputsComments.length
                    ? 3 == tryMoreToScroll
                        ? 3 == runMode || 4 == runMode
                            ? (debug && console.log("next page 7"), open_next_page())
                            : (window.location.href.indexOf("/creatorstudio") > 0
                                  ? (window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                                        window.location.href.indexOf("/creatorstudio?tab=home"),
                                    goBackToMainTab(0))
                                  : isThisNewFbDesign2020() || newFBinviteDesign
                                    ? goBackToMainTab(0)
                                    : alert(api.i18n.getMessage("error1")),
                              destroyPopup(),
                              (scriptIsRunning = 0))
                        : (tryMoreToScroll++,
                          debug && console.log("Scroll try 4"),
                          window.scrollTo(0, document.body.scrollHeight),
                          (TimerDelayVar1 = setTimeout(function () {
                              do4();
                          }, 5e3)))
                    : window.location.href.indexOf("/watch/") > 0 && totalPostsProcessed >= 1
                      ? 3 == runMode || 4 == runMode
                          ? (debug && console.log("next page 8"), open_next_page())
                          : (console.log("Stop, debug: watch"), stopScript())
                      : inputsComments.length > 0 && inputsComments.length > totalPostsProcessed
                        ? (inputsComments[totalPostsProcessed].click(),
                          totalPostsProcessed++,
                          normal_run_limitNoInvitePosts >= 0
                              ? normal_run_limitNoInvitePosts++
                              : (normal_run_limitNoInvitePosts = 0),
                          updatePopup(),
                          (checkTwice = 0),
                          (TimerDelayVar1 = setTimeout(function () {
                              StartInvitePeople();
                          }, fb_timeout_1)))
                        : MaxPostFound == totalPostsProcessed && 1 == checkTwice
                          ? (3 != runMode && 4 != runMode) || !try_after_limit
                              ? (console.log("Stop, debug: 5"), stopScript())
                              : (debug && console.log("next page 9"), open_next_page())
                          : skip_post_setting > 0 && skip_post_setting > inputsComments.length
                            ? lastlengthPosts == inputsComments.length && checkTwice > 9
                                ? (3 != runMode && 4 != runMode) || !try_after_limit
                                    ? (console.log("Stop, debug: 6"), stopScript())
                                    : (debug && console.log("next page 10"), open_next_page())
                                : (lastlengthPosts == inputsComments.length ? (checkTwice += 2) : (checkTwice = 0),
                                  (lastlengthPosts = inputsComments.length),
                                  debug && console.log("Scroll try 5"),
                                  window.scrollTo(0, document.body.scrollHeight),
                                  (TimerDelayVar1 = setTimeout(function () {
                                      do4();
                                  }, fb_timeout_4)))
                            : (MaxPostFound == totalPostsProcessed && (checkTwice = 1),
                              (MaxPostFound = totalPostsProcessed),
                              debug && console.log("Scroll try 6"),
                              -1 == window.location.href.indexOf("/watch/")
                                  ? (window.scrollTo(0, document.body.scrollHeight),
                                    setTimeout(function () {
                                        tryClickToLoadMorePosts();
                                    }, 900),
                                    (timeout = fb_timeout_4),
                                    totalPostsProcessed > 20 && (timeout = fb_timeout_5),
                                    totalPostsProcessed > 40 && (timeout = fb_timeout_6),
                                    setTimeout(function () {
                                        do4();
                                    }, timeout))
                                  : do4()));
}
function tryClickToLoadMorePosts() {
    -1 == window.location.href.indexOf("/watch/") &&
        (document.getElementsByClassName("uiMorePagerPrimary") &&
            document.getElementsByClassName("uiMorePagerPrimary")[0] &&
            document.getElementsByClassName("uiMorePagerPrimary")[0].click(),
        getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click(),
        closeInviteWindowInNewUI(),
        debug && console.log("Scroll try 7"),
        (document.location.href.indexOf("/posts/") > 0 && (3 == runMode || 4 == runMode)) ||
            setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
            }, 100));
}
function ClosePostAndOpenNext(e, t) {
    debug && console.log("ClosePostAndOpenNext"),
        weAreInvitingFromShared > 0
            ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                  getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click(),
              closeInviteWindowInNewUI(),
              (inviteDuringShareCheck || inviteDuringShareCheck2 || likeSharedComments) &&
                  ((clickedForMore = 0),
                  (canSKIPButton = 0),
                  (hadInvitedButton = 0),
                  (hadClickedMoreButton = 0),
                  (loopmaxtry = 0),
                  (uiMorePagerPrimary = 0),
                  (likeButtonsProcessed = 0)),
              1 == weAreInvitingFromShared
                  ? setTimeout(function () {
                        checkInvitesOnShares2(sharedI, sharedInputs);
                    }, 1500)
                  : 2 == weAreInvitingFromShared
                    ? setTimeout(function () {
                          processeCommentsInsideSharedPosts(sharedI, sharedInputs, sharedI2 + 1, sharedInputs2);
                      }, 1500)
                    : setTimeout(function () {
                          checkInvitesOnShares2(sharedI, sharedInputs);
                      }, 1500),
              (weAreInvitingFromShared = 0))
            : weAreScanningOnlyShared
              ? (console.log("only shared scanned"),
                stopScript(
                    '<span style="color:red">Extension stopped. We were scanning only opened shared posts.</span><br>'
                ))
              : weAreScanningOnlyInvites
                ? stopScript(
                      '<span style="color:red">Extension stopped. We were scanning only list of likers shown on the screen.</span><br>'
                  )
                : e > -1 && bigPostTabs.length > 0 && bigPostTabs.length > e + 1 && bigPostTabs[e + 1].length > 0
                  ? StartInvitePeopleOLD(e + 1)
                  : ((fixedStartOfI = 0),
                    (fixedMaxTries = 0),
                    (sharedPostIsCheckingNow = 1),
                    1 == scriptIsRunning &&
                        ((share_put_likes &&
                            share_likes_limit > total_shared_posts_liked + c_c2 &&
                            0 == sharedPostIsCheckingNow) ||
                        (share_put_comments &&
                            text_comm_shares.length > 1 &&
                            total_shared_posts_commented + c_c3 < share_comments_limit &&
                            0 == sharedPostIsCheckingNow) ||
                        ((inviteDuringShareCheck || inviteDuringShareCheck2 || likeSharedComments) &&
                            mtotalInvited + c_c1 < fb_limit &&
                            0 == sharedPostIsCheckingNow) ||
                        ((3 == runMode || 4 == runMode) &&
                            (inviteDuringShareCheck ||
                                inviteDuringShareCheck2 ||
                                likeSharedComments ||
                                share_put_likes ||
                                (share_put_comments && text_comm_shares.length > 1)) &&
                            (getElem("._6iij ._355t._6iik ._3rwx,._437j ._3l-q a._3rwx").length > 0 ||
                                (0 == getElem("._6iij ._355t._6iik ._3rwx,._437j ._3l-q a._3rwx").length &&
                                    getElem("._355t._4vn2 ._3rwx").length > 0) ||
                                inputsShareButton.length > 0) &&
                            ((share_put_likes &&
                                share_likes_limit > total_shared_posts_liked + c_c2 &&
                                0 == sharedPostIsCheckingNow) ||
                                (share_put_comments &&
                                    text_comm_shares.length > 1 &&
                                    total_shared_posts_commented + c_c3 < share_comments_limit &&
                                    0 == sharedPostIsCheckingNow) ||
                                ((inviteDuringShareCheck || inviteDuringShareCheck2 || likeSharedComments) &&
                                    mtotalInvited + c_c1 < fb_limit &&
                                    0 == sharedPostIsCheckingNow)))
                            ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
                                  getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
                                      getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
                                  ].click(),
                              getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                                  getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click(),
                              closeInviteWindowInNewUI(),
                              (loadsWithNoWorkOnShares = 0),
                              (inviteDuringShareCheck || inviteDuringShareCheck2 || likeSharedComments) &&
                                  ((clickedForMore = 0),
                                  (canSKIPButton = 0),
                                  (hadInvitedButton = 0),
                                  (hadClickedMoreButton = 0),
                                  (loopmaxtry = 0),
                                  (uiMorePagerPrimary = 0),
                                  (likeButtonsProcessed = 0)),
                              (TimerDelayVar1 = setTimeout(function () {
                                  doSHAREDposts();
                              }, 4e3)))
                            : getElem("._98ry ._738z ._6np5,#vde_close_tray_button").length > 0 && void 0 === t
                              ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click(),
                                setTimeout(function () {
                                    getElem(".layerCancel").length > 0 && getElem(".layerCancel").last()[0].click();
                                }, 500),
                                setTimeout(function () {
                                    getElem("#vde_close_tray_button span").length > 0
                                        ? getElem("#vde_close_tray_button span")[0].click()
                                        : getElem("._95vc ._3-8_ .rwb8dzxj .if5qj5rh").length > 0
                                          ? getElem("._95vc ._3-8_ .rwb8dzxj .if5qj5rh")[0].click()
                                          : console.log(
                                                "We didn't find a button to close this stats window. Maybe Facebook changed its design"
                                            ),
                                        setTimeout(function () {
                                            ClosePostAndOpenNext(e, !0);
                                        }, 2500);
                                }, 1500))
                              : ((sharedPostIsCheckingNow = 0),
                                setTimeout(function () {
                                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
                                        getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
                                            getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
                                        ].click(),
                                        getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                                            getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click(),
                                        closeInviteWindowInNewUI(),
                                        getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click();
                                }, 650),
                                document.location.href.indexOf("/creatorstudio") > 0 && clickCloseButton(),
                                (document.location.href.indexOf("/content_management") > 0 ||
                                    document.location.href.indexOf("/latest/posts") > 0 ||
                                    (window.location.href.indexOf("/publishing_tools") > 0 &&
                                        getElem(
                                            "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                            ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                        ).length > 0)) &&
                                    (getElem("._8pxk button._271k._271l._1o4e").length > 0 &&
                                        getElem("._8pxk button._271k._271l._1o4e")[0].click(),
                                    setTimeout(function () {
                                        0 == selectedpostsRun &&
                                            (inputsPhoto = getElem(
                                                "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                                ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                            ).filter(function () {
                                                return (
                                                    $(this).find(".ellipsis,.kiex77na,.l6kht628>div").length > 0 &&
                                                    (0 == $(this).find("i").length ||
                                                        ($(this).find("i").length > 0 &&
                                                            (!$(this).find("i").text() ||
                                                                ($(this).find("i").text() &&
                                                                    -1 ==
                                                                        $(this)
                                                                            .find("i")
                                                                            .text()
                                                                            .toLowerCase()
                                                                            .indexOf("instagram")))))
                                                );
                                            }));
                                    }, 1500)),
                                publishingToolInv &&
                                    getElem(".layerCancel").length > 1 &&
                                    (isNotificationTab
                                        ? setTimeout(function () {
                                              clickCloseButton();
                                          }, 70)
                                        : setTimeout(function () {
                                              getElem(".layerCancel").length > 1 && getElem(".layerCancel")[1].click();
                                          }, 70)),
                                publishingToolInv &&
                                    getElem(".layerCancel").length > 2 &&
                                    (isNotificationTab
                                        ? setTimeout(function () {
                                              clickCloseButton();
                                          }, 570)
                                        : setTimeout(function () {
                                              getElem(".layerCancel").length > 2 && getElem(".layerCancel")[2].click();
                                          }, 140)),
                                photosTabRunAll &&
                                    getElem("._n9 ._n3>a._xlt._418x").length > 0 &&
                                    getElem("._n9 ._n3>a._xlt._418x")[
                                        getElem("._n9 ._n3>a._xlt._418x").length - 1
                                    ].click(),
                                3 == runMode &&
                                (totalPostsProcessed >= normal_run_limitposts ||
                                    publishingToolTotPost >= normal_run_limitposts ||
                                    normal_run_limitNoInvitePosts > normal_run_limitNoInvGoNextPage ||
                                    (window.location.href.indexOf("/creatorstudio") > 0 &&
                                        (totalPostsProcessed >= 50 || publishingToolTotPost >= 50)))
                                    ? (debug && console.log("next page 11"), open_next_page())
                                    : (3 != runMode && 4 != runMode) ||
                                        0 != weAreElaboratingAlbums ||
                                        !(
                                            window.location.href.indexOf("/photo/") > 0 ||
                                            window.location.href.indexOf("/photos/") > 0 ||
                                            window.location.href.indexOf("/videos/") > 0 ||
                                            window.location.href.indexOf("/posts/") > 0 ||
                                            window.location.href.indexOf("/video/") > 0 ||
                                            window.location.href.indexOf("/post/") > 0
                                        ) ||
                                        -1 != window.location.href.indexOf("latest/posts")
                                      ? ((clickedForMore = 0),
                                        (canSKIPButton = 0),
                                        (hadInvitedButton = 0),
                                        (hadClickedMoreButton = 0),
                                        (loopmaxtry = 0),
                                        (uiMorePagerPrimary = 0),
                                        (likeButtonsProcessed = 0),
                                        (TimerDelayVar1 =
                                            1 == isPhotoInviting
                                                ? loop_skip_secondtime
                                                    ? setTimeout(function () {
                                                          doPHOTO3();
                                                      }, 3300)
                                                    : setTimeout(function () {
                                                          doPHOTO();
                                                      }, 3300)
                                                : setTimeout(function () {
                                                      do4();
                                                  }, 3300)))
                                      : (debug && console.log("next page 12"), open_next_page()))));
}
function clickCloseButton() {
    for (locali = 0; locali < getElem("._4t2a ._4-i0 ._51-u .layerCancel").length; locali++)
        getElem("._4t2a ._4-i0 ._51-u .layerCancel")[locali].click();
    getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
        getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
            getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
        ].click(),
        getElem("._4t2a ._4-i0 ._51-u ._42ft,._4t2a ._pig ._8dwn ._8dvy", ".layerCancel._42ft", ".layerCancel._42ft")
            .length &&
            (getElem(
                "._4t2a ._4-i0 ._51-u ._42ft,._4t2a ._pig ._8dwn ._8dvy",
                ".layerCancel._42ft",
                ".layerCancel._42ft"
            )[0].click(),
            setTimeout(function () {
                getElem("._4t2a .layerConfirm").length > 0 && getElem("._4t2a .layerConfirm")[0].click();
            }, 500)),
        setTimeout(function () {
            getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click();
        }, 30);
}
function doSHAREDposts() {
    if (1 == scriptIsRunning)
        if (
            ((uiMorePagerPrimary = 0),
            (likeButtonsProcessed = 0),
            updatePopup(),
            debug && console.log("doSHAREDposts 1"),
            (window.location.href.indexOf("/adsmanager/") > 0 ||
                window.location.href.indexOf("/content_management") > 0 ||
                document.location.href.indexOf("/latest/posts") > 0 ||
                (window.location.href.indexOf("/publishing_tools") > 0 &&
                    getElem(
                        "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                        ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                    ).length > 0)) &&
                1 == getElem("._4t2a .userContentWrapper span.fwb.fcg a").length &&
                getElem("._4t2a .userContentWrapper span.fwb.fcg a").text().length > 0 &&
                (pageNameAdditionalCheck = getElem("._4t2a .userContentWrapper span.fwb.fcg a").text()),
            (sharedPostIsCheckingNow = 1),
            (sharedPostsHeight = 0),
            (sharedMaxScroll = 0),
            (itemProcessed = 0),
            (inputsPhoto2 = $(inputsComments).closest(".bkfpd7mw").find('.gtad4xkn>span div[role="button"]').last()),
            isNotificationTab &&
                ((inputsPhoto2.length = 0),
                getElem(".UFIList .UFIShareRow .UFIShareLink", ".hidden_elem .UFIShareLink").length > 0 &&
                    (inputsPhoto2 = getElem(".UFIList .UFIShareRow .UFIShareLink", ".hidden_elem .UFIShareLink")),
                0 == inputsPhoto2.length &&
                    getElem(".userContentWrapper ._4vn1 ._3rwx._42ft", ".hidden_elem ._3rwx._42ft").length > 0 &&
                    (inputsPhoto2 = getElem(".userContentWrapper ._4vn1 ._3rwx._42ft", ".hidden_elem ._3rwx._42ft"))),
            document.location.href.indexOf("/events/") > 0 && inputsPhoto2 && inputsPhoto2[scanManySharedOnPage + 1])
        )
            (lastphotoOpen = inputsPhoto2.length),
                inputsPhoto2[scanManySharedOnPage + 1].click(),
                (TimerDelayVar1 = setTimeout(function () {
                    StartLIKEPosts(0);
                }, fb_timeout_1)),
                scanManySharedOnPage++;
        else if (inputsPhoto2.length > 0 && -1 == document.location.href.indexOf("/events/"))
            (lastphotoOpen = inputsPhoto2.length),
                inputsPhoto2.length > 1 ? inputsPhoto2[inputsPhoto2.length - 1].click() : inputsPhoto2[0].click(),
                (TimerDelayVar1 = setTimeout(function () {
                    StartLIKEPosts(0);
                }, fb_timeout_1));
        else {
            var e = !1;
            0 == inputsPhoto2.length &&
                (window.location.href.indexOf("/videos/") > 0 || window.location.href.indexOf("/photo/") > 0) &&
                getElem("._437j ._3l-q ._36_q a,.gtad4xkn .oi732d6d,._437j ._3l-q ._355t a").length > 0 &&
                getElem("._437j ._3l-q ._36_q a,.gtad4xkn .oi732d6d,._437j ._3l-q ._355t a").each(function (t) {
                    $(this)[0].getAttribute("href") &&
                        $(this)[0].getAttribute("href").indexOf("shares/") > -1 &&
                        ($(this)[0].click(),
                        (e = !0),
                        (TimerDelayVar1 = setTimeout(function () {
                            StartLIKEPosts(0);
                        }, fb_timeout_1)));
                }),
                0 == inputsPhoto2.length &&
                    window.location.href.indexOf("/photos/") > 0 &&
                    getElem("._6iij ._355t._6iik ._3rwx").length > 0 &&
                    (getElem("._6iij ._355t._6iik ._3rwx")[0].click(),
                    (e = !0),
                    (TimerDelayVar1 = setTimeout(function () {
                        StartLIKEPosts(0);
                    }, fb_timeout_1))),
                0 != inputsPhoto2.length ||
                    (3 != runMode && 4 != runMode) ||
                    (getElem("._6iij ._355t._6iik ._3rwx,._437j ._3l-q a._3rwx").length > 0
                        ? (getElem("._6iij ._355t._6iik ._3rwx,._437j ._3l-q a._3rwx")[0].click(),
                          (e = !0),
                          (TimerDelayVar1 = setTimeout(function () {
                              StartLIKEPosts(0);
                          }, fb_timeout_1)))
                        : getElem("._355t._4vn2 ._3rwx").length > 0 &&
                          (getElem("._355t._4vn2 ._3rwx")[0].click(),
                          (e = !0),
                          (TimerDelayVar1 = setTimeout(function () {
                              StartLIKEPosts(0);
                          }, fb_timeout_1)))),
                e || (debug && debug && console.log("GO TO NEXT Here 6"), ClosePostAndOpenNext(-1));
        }
}
function StartLIKEPosts(e) {
    1 == scriptIsRunning &&
        ((inputsPhoto2 = getElem(
            '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0',
            "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
        )).length > 0 && itemProcessed != inputsPhoto2.length
            ? itemProcess(itemProcessed, inputsPhoto2)
            : e < 3
              ? (1 == ++e || 3 == e
                    ? (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(
                              2 * getScrollElemNewFb(scrollingNewFBDesignClassDef).height() * e
                          ),
                      getElem(scrollingNewFBDesignClass).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(
                              2 * getScrollElemNewFb(scrollingNewFBDesignClass).height() * e
                          ))
                    : (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(99999),
                      getElem(scrollingNewFBDesignClass).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(99999)),
                (TimerDelayVar1 = setTimeout(function () {
                    StartLIKEPosts(e);
                }, 3500)))
              : (debug && console.log("GO TO NEXT Here 7"), ClosePostAndOpenNext(-1)));
}
function itemProcess(e, t, n, o) {
    (weAreInvitingFromShared = 0),
        1 == scriptIsRunning &&
            ($(t[e]).find('.mfxi4zlt.scb9dxdr.dflh9lhu div[role="button"]').length,
            debug && console.log("stop_on_captcha_shown:" + stop_on_captcha_shown),
            (!stop_on_captcha_shown || (stop_on_captcha_shown && noFbLimitTriggered())) && !checkLimitationPopup2()
                ? ((temp_block_help = !1),
                  void 0 === n && (tryToChangePoster = !1),
                  e > 2 && $(t[e - 3]) && ((itemRemovedSharedScroll = !0), $(t[e - 3]).remove()),
                  e < t.length
                      ? ((sharedPostsStuckCheck = 0),
                        $(t[e]).find("._5vsi._192z ._5ybo._5yhh").length &&
                            $(t[e]).find("._5vsi._192z ._5ybo._5yhh").length,
                        (localtimeout = 10),
                        0 == (commentLink = $(t[e]).find("._37uu .comment_link,._18vi ._666h")).length &&
                            $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]') &&
                            (commentLink = $(t[e]).find(
                                'div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]'
                            )),
                        commentLink.length > 0
                            ? ((temp_block_help = !0),
                              commentLink[0].click(),
                              setTimeout(function () {
                                  checkIfWeCanCommentByPage(e, t);
                              }, 600))
                            : ((temp_block_help = !0),
                              setTimeout(function () {
                                  secondCheckOnCommentButton2(e, t);
                              }, 5e3)),
                        temp_block_help ||
                            (e++,
                            (itemProcessed = e),
                            (TimerDelayVar1 = setTimeout(function () {
                                itemProcess(e, t);
                            }, localtimeout))))
                      : (debug && console.log("sharedPostsStuckCheck:" + sharedPostsStuckCheck),
                        sharedPostsStuckCheck < 5 &&
                        (total_shared_posts_liked + c_c2 < share_likes_limit ||
                            (share_put_comments &&
                                text_comm_shares.length > 1 &&
                                total_shared_posts_commented + c_c3 < share_comments_limit))
                            ? (sharedPostsStuckCheck++, itemsLoadMore(0, 4))
                            : (debug && console.log("GO TO NEXT Here 8"),
                              setTimeout(function () {
                                  ClosePostAndOpenNext(-1);
                              }, 500))))
                : stopScript(
                      '<span style="color:red">Extension stopped. Facebook popup message was detected.</span><br>'
                  ));
}
function secondCheckOnCommentButton2(e, t) {
    (temp_block_help = !1),
        0 == (commentLink = $(t[e]).find("._37uu .comment_link,._18vi ._666h")).length &&
            $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]') &&
            (commentLink = $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]')),
        commentLink.length > 0
            ? ((temp_block_help = !0),
              commentLink[0].click(),
              setTimeout(function () {
                  checkIfWeCanCommentByPage(e, t);
              }, 600))
            : (console.log("ERROR: Comment button not found 1 (SECOND CHECK)"),
              share_put_likes &&
                  total_shared_posts_liked + c_c2 < share_likes_limit &&
                  ($(t[e]).find("._37uu ._3m9g,button.bp9cbjyn").length > 0 ||
                      "postPage" != do_not_check_who_comments2) &&
                  $(t[e])
                      .find(
                          '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"]'
                      )
                      .not(
                          ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                      ).length > 0 &&
                  ((temp_block_help = !0), tryToLikeOnlyNoCommentAvailable(e, t))),
        temp_block_help ||
            (e++,
            (itemProcessed = e),
            (TimerDelayVar1 = setTimeout(function () {
                itemProcess(e, t);
            }, localtimeout)));
}
function checkInvitesOnShares(e, t) {
    1 == scriptIsRunning &&
        (debug &&
            (console.log("======================== CHECK HERE"),
            console.log("======================== CHECK HERE:" + getCurrentPageTitle()),
            console.log(
                getCurrentPageTitle().startsWith(
                    $(t[e])
                        .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                        .not("._5u5j .fcg .fwb>a._wpv")[0].text
                )
            ),
            console.log(
                "======================== CHECK HERE:" +
                    $(t[e])
                        .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                        .not("._5u5j .fcg .fwb>a._wpv")[0].text
            ),
            console.log(inviteDuringShareCheck),
            console.log(
                inviteDuringShareCheck &&
                    $(t[e]).find(".pcp91wgn,._66lh a").length > 0 &&
                    (0 ==
                        $(t[e])
                            .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                            .not("._5u5j .fcg .fwb>a._wpv").length ||
                        $(t[e])
                            .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                            .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                        getCurrentPageTitle().startsWith(
                            $(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv")[0].text
                        ) ||
                        (shares_reply_ignore_array.length > 0 &&
                            arrayInStringFound(
                                shares_reply_ignore_array,
                                $(t[e])
                                    .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                    .not("._5u5j .fcg .fwb>a._wpv")[0].text
                            )))
            )),
        inviteDuringShareCheck &&
        $(t[e]).find(".pcp91wgn,._66lh a").length > 0 &&
        (0 ==
            $(t[e])
                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                .not("._5u5j .fcg .fwb>a._wpv").length ||
            $(t[e])
                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
            getCurrentPageTitle().startsWith(
                $(t[e])
                    .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                    .not("._5u5j .fcg .fwb>a._wpv")[0].text
            ) ||
            (shares_reply_ignore_array.length > 0 &&
                arrayInStringFound(
                    shares_reply_ignore_array,
                    $(t[e])
                        .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                        .not("._5u5j .fcg .fwb>a._wpv")[0].text
                )))
            ? (debug && console.log("Check likes here!"),
              $(t[e]).find(".pcp91wgn,._66lh a")[0].click(),
              (weAreInvitingFromShared = 1),
              (sharedI = e),
              (sharedInputs = t),
              (TimerDelayVar1 = setTimeout(function () {
                  StartInvitePeople();
              }, 5e3)))
            : (debug && console.log("no invites, go to next shared post"), checkInvitesOnShares2(e, t)));
}
function checkInvitesOnShares2(e, t) {
    1 == scriptIsRunning &&
        (inviteDuringShareCheck2 || likeSharedComments
            ? (0 == $(t[e]).find('.UFIContainer a[href*="' + getCurrentPage() + '"]').length &&
                  0 ==
                      $(t[e]).find(
                          '.UFIContainer ._3b-9._j6a a.UFICommentActorName:contains("' +
                              getCurrentPageTitle() +
                              '"),a._6qw4:contains("' +
                              getCurrentPageTitle() +
                              '")'
                      ).length &&
                  0 ==
                      $(t[e]).find(
                          '.UFIContainer ._3b-9._j6a a.UFICommentActorName:contains("' +
                              getCurrentPageTitle2(e, t) +
                              '"),a._6qw4:contains("' +
                              getCurrentPageTitle2(e, t) +
                              '")'
                      ).length &&
                  (-1 == window.location.href.indexOf("facebook.com/ads/") ||
                      ((window.location.href.indexOf("facebook.com/ads/") > 0 ||
                          window.location.href.indexOf("facebook.com/adsmanager/") > 0 ||
                          window.location.href.indexOf("/content_management") > 0 ||
                          document.location.href.indexOf("/latest/posts") > 0) &&
                          0 == $(t[e]).find(".uiHelpLink").length)) &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-").length > 0 &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt") &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt").length > 1 &&
                  ($(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt") == getCurrentPageTitle() ||
                      "skip" == getCurrentPageTitle() ||
                      $(t[e])
                          .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                          .not("a img._3me-")
                          .attr("alt") == getCurrentPageTitle2(e, t)) &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt").length > 1 &&
                  0 ==
                      $(t[e]).find(
                          '.UFIRow.UFIComment .UFICommentAuthorWithPresence:has(img[alt="' +
                              $(t[e])
                                  .find(
                                      ".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-"
                                  )
                                  .not("a img._3me-")
                                  .attr("alt") +
                              '"])'
                      ).length &&
                  !arrayInStringFound(
                      do_not_check_shared_my_name_s_Array,
                      $(t[e])
                          .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                          .not("a img._3me-")
                          .attr("alt")
                  )) ||
              ($(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').length > 0 &&
                  $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() &&
                  $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text().length >
                      1 &&
                  ($(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() ==
                      getCurrentPageTitle() ||
                      "skip" == getCurrentPageTitle() ||
                      $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() ==
                          getCurrentPageTitle2(e, t)) &&
                  $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text().length >
                      1 &&
                  $(t[e]).find('a[role="link"] .d2edcug0').length > 0 &&
                  $(t[e]).find('a[role="link"] .d2edcug0').text() &&
                  ($(t[e]).find('a[role="link"] .d2edcug0').text().indexOf(getCurrentPageTitle()) >= 0 ||
                      $(t[e]).find('a[role="link"] .d2edcug0').text().indexOf(getCurrentPageTitle2(e, t)) >= 0) &&
                  !arrayInStringFound(
                      do_not_check_shared_my_name_s_Array,
                      $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text()
                  ))
                ? (debug && console.log("no our comment here 1"),
                  likeSharedComments &&
                  $(t[e]).find(".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li")
                      .length > 0
                      ? ($(t[e]).find(".UFIContainer ._3b-9 .UFIPagerRow._4oep .UFIPagerLink").length > 0 &&
                            (debug && console.log("click on show more comments"),
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIPagerRow._4oep .UFIPagerLink")[0].click()),
                        $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink").length > 1 &&
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink")[1].click(),
                        $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink").length > 0 &&
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink")[0].click(),
                        setTimeout(function () {
                            processeCommentsInsideSharedPosts(
                                e,
                                t,
                                0,
                                $(t[e]).find(
                                    ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li"
                                )
                            );
                        }, 1e3))
                      : futureAdditionalOptionForSharesPostHere(e, t))
                : (debug && console.log("WE HAVE OUR COMMENT HERE! Let's scan it if we find it!"),
                  $(t[e]).find(".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li")
                      .length > 0
                      ? (debug &&
                            console.log(
                                "We have comments here:" +
                                    $(t[e]).find(
                                        ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li"
                                    ).length
                            ),
                        $(t[e]).find(".UFIContainer ._3b-9 .UFIPagerRow._4oep .UFIPagerLink").length > 0 &&
                            (debug && console.log("click on show more comments"),
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIPagerRow._4oep .UFIPagerLink")[0].click()),
                        $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink").length > 1 &&
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink")[1].click(),
                        $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink").length > 0 &&
                            $(t[e]).find(".UFIContainer ._3b-9 .UFIReplyList .UFIRow .UFICommentLink")[0].click(),
                        setTimeout(function () {
                            processeCommentsInsideSharedPosts(
                                e,
                                t,
                                0,
                                $(t[e]).find(
                                    ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li"
                                )
                            );
                        }, 1e3))
                      : setTimeout(function () {
                            futureAdditionalOptionForSharesPostHere(e, t);
                        }, 500))
            : futureAdditionalOptionForSharesPostHere(e, t));
}
function processeCommentsInsideSharedPosts(e, t, n, o) {
    1 == scriptIsRunning &&
        (n < o.length
            ? (debug &&
                  (console.log("QQQQQQQQQQQQQ 2:" + getCurrentPageTitle()),
                  console.log("title2=" + getCurrentPageTitle2(e, t)),
                  console.log(
                      arrayInStringFound(
                          do_not_check_shared_my_name_s_Array,
                          $(o[n]).find('a[role="link"] .d2edcug0').text()
                      )
                  )),
              $(o[n]).find('a[href*="' + getCurrentPage() + '"]').length > 0 ||
              $(o[n]).find(
                  'a.UFICommentAuthorWithPresence:contains("' +
                      getCurrentPageTitle() +
                      '"),a._6qw4:contains("' +
                      getCurrentPageTitle() +
                      '")'
              ).length > 0 ||
              $(o[n]).find('a.UFICommentActorName:contains("' + getCurrentPageTitle() + '")').length > 0 ||
              $(o[n]).find(
                  'a.UFICommentAuthorWithPresence:contains("' +
                      getCurrentPageTitle2(n, o) +
                      '"),a._6qw4:contains("' +
                      getCurrentPageTitle2(n, o) +
                      '")'
              ).length > 0 ||
              $(o[n]).find(
                  'a.UFICommentActorName:contains("' +
                      getCurrentPageTitle2(n, o) +
                      '"),a._6qw4:contains("' +
                      getCurrentPageTitle2(n, o) +
                      '")'
              ).length > 0 ||
              $(o[n])
                  .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                  .not("a img._3me-")
                  .attr("alt") == getCurrentPageTitle() ||
              $(o[n]).find(".UFIReplyActorPhotoWrapper img,.UFICommentAuthorWithPresence img,.a img").attr("alt") ==
                  getCurrentPageTitle2(n, o) ||
              arrayInStringFound(
                  do_not_check_shared_my_name_s_Array,
                  $(o[n]).find(".UFIReplyActorPhotoWrapper img,.UFICommentAuthorWithPresence img,.a img").attr("alt")
              ) ||
              ($(o[n]).find('a[role="link"] .d2edcug0').length > 0 &&
                  $(o[n]).find('a[role="link"] .d2edcug0').text() &&
                  $(o[n]).find('a[role="link"] .d2edcug0').text().indexOf(getCurrentPageTitle()) >= 0) ||
              arrayInStringFound(do_not_check_shared_my_name_s_Array, $(o[n]).find('a[role="link"] .d2edcug0').text())
                  ? inviteDuringShareCheck2
                      ? (debug && console.log("this is our comment"),
                        $(o[n]).find('.UFICommentReactionsBling,div[role="button"] .b3onmgus img,._1lh3 a._1lh9')
                            .length > 0
                            ? (debug && console.log("we have likes here, scan them!"),
                              $(o[n])
                                  .find('.UFICommentReactionsBling,div[role="button"] .b3onmgus img,._1lh3 a._1lh9')[0]
                                  .click(),
                              (weAreInvitingFromShared = 2),
                              (sharedI = e),
                              (sharedInputs = t),
                              (sharedI2 = n),
                              (sharedInputs2 = o),
                              (TimerDelayVar1 = setTimeout(function () {
                                  StartInvitePeople();
                              }, 5e3)))
                            : (n++, processeCommentsInsideSharedPosts(e, t, n, o)))
                      : (n++, processeCommentsInsideSharedPosts(e, t, n, o))
                  : (debug && console.log("this is not our comment - LIKE IT"),
                    (localtimeout = 20),
                    likeSharedComments &&
                        $(o[n])
                            .find(
                                '._khz .UFILikeLink,div[role="button"] .bdca9zbp,._6coj a._6a-y,a[aria-label="' +
                                    getTextForCurrentLanguage("likeButton") +
                                    '"]'
                            )
                            .not("._khz .UFILinkBright,a._3_16").length > 0 &&
                        ($(o[n])
                            .find(
                                '._khz .UFILikeLink,div[role="button"] .bdca9zbp,._6coj a._6a-y,a[aria-label="' +
                                    getTextForCurrentLanguage("likeButton") +
                                    '"]'
                            )
                            .not("._khz .UFILinkBright,a._3_16")[0]
                            .click(),
                        total_shared_posts_liked++,
                        (loadsWithNoWorkOnShares = 0),
                        updatePopup(),
                        (localtimeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1)),
                    n++,
                    (TimerDelayVar1 = setTimeout(function () {
                        processeCommentsInsideSharedPosts(e, t, n, o);
                    }, localtimeout))))
            : futureAdditionalOptionForSharesPostHere(e, t));
}
function futureAdditionalOptionForSharesPostHere(e, t) {
    debug && console.log("go to the next shared post now!"),
        (imgSharedCommentPoster = ""),
        e++,
        (itemProcessed = e),
        setTimeout(function () {
            itemProcess(e, t);
        }, 10);
}
function noFbLimitTriggered() {
    return (
        1 == scriptIsRunning &&
        (!(
            (getElem("._4t2a,.uiLayer").is(":visible") &&
                ((getElem("._4t2a,.uiLayer").find("._pig").length > 0 &&
                    getElem("._4t2a,.uiLayer").find("._pig").length > 0 &&
                    0 == getElem("._4t2a ._pig .userContentWrapper").length) ||
                    getElem("._4t2a,.uiLayer").find(".confirmation_message").length > 0 ||
                    getElem("button#captcha_dialog_submit_button").length > 0) &&
                0 == getElem("._4t2a,.uiLayer").find("._r3v").length &&
                (0 == getElem("._4t2a ._50f4").length ||
                    -1 == getElem("._4t2a ._50f4").text().indexOf("Your message has been sent"))) ||
            checkNewLimitPopupInClassicDesign() ||
            getElem("._4-i0 ._52c9").filter(function () {
                return $(this).text().indexOf("Use This Feature Right") > -1;
            }).length > 0
        ) ||
            ((3 != runMode && 4 != runMode) || !try_after_limit
                ? (stopScript(
                      '<span style="color:red">Extension stopped. Facebook popup message was detected.</span><br>'
                  ),
                  !1)
                : (debug && console.log("next page 13"), open_next_page(), !1)))
    );
}
function checkIfWeCanCommentByPage(e, t) {
    $(t[e]).find(
        '.UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-,._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain',
        "a img._3me-"
    ).length > 0
        ? doICommentAsPage(e, t)
            ? (debug && console.log("COMMENT BY PAGE - do it!"),
              (temp_block_help = !1),
              1 == $(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]').length
                  ? ($(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]')[0].click(),
                    setTimeout(function () {
                        1 == $(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]').length &&
                            $(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]')[0].click();
                    }, 500),
                    setTimeout(function () {
                        mainCall(e, t);
                    }, 800))
                  : mainCall(e, t))
            : tryToChangePoster
              ? (debug && console.log("Seems we are posting by other person, skip it!"),
                "postPageOrCurrent" == do_not_check_who_comments2 || "postCurrentProfile" == do_not_check_who_comments2
                    ? (debug && console.log("COMMENT ANY WAY - do it!"), (temp_block_help = !1), mainCall(e, t))
                    : (TimerDelayVar1 = setTimeout(function () {
                          checkInvitesOnShares(e, t);
                      }, localtimeout)))
              : (debug && console.log("we try to change poster"), tryToChangePosterF(e, t))
        : (debug && console.log("We cannot check comments, skip them"),
          (TimerDelayVar1 = setTimeout(function () {
              checkInvitesOnShares(e, t);
          }, localtimeout)));
}
function doICommentAsPage(e, t) {
    return (
        debug &&
            (console.log("--------------------------------"),
            console.log(
                $(t[e])
                    .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                    .not("a img._3me-")
                    .attr("alt")
            ),
            console.log("tit=" + getCurrentPageTitle()),
            console.log("check by image of Poster:" + imgSharedCommentPoster),
            console.log("skip" == getCurrentPageTitle()),
            console.log(
                $(t[e])
                    .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                    .not("a img._3me-")
                    .attr("alt") == getCurrentPageTitle2(e, t)
            ),
            console.log(getCurrentPageTitle2(e, t)),
            console.log("0000000")),
        "postCurrentProfile" == do_not_check_who_comments2 ||
        ($(t[e])
            .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
            .not("a img._3me-")
            .attr("alt") &&
            $(t[e])
                .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                .not("a img._3me-")
                .attr("alt").length > 1 &&
            ($(t[e])
                .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                .not("a img._3me-")
                .attr("alt") == getCurrentPageTitle() ||
                "skip" == getCurrentPageTitle() ||
                $(t[e])
                    .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                    .not("a img._3me-")
                    .attr("alt") == getCurrentPageTitle2(e, t)))
            ? (debug && console.log("WE CAN COMMENT, lets check if we are in business page"),
              !(
                  "postCurrentProfile" != do_not_check_who_comments2 &&
                  "" != pageNameAdditionalCheck &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt").length > 1 &&
                  $(t[e])
                      .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                      .not("a img._3me-")
                      .attr("alt") != pageNameAdditionalCheck
              ))
            : $(t[e]).find("button img").length > 0 &&
                $(t[e]).find("button img").attr("src") &&
                $(t[e]).find("button img").attr("src").length > 0 &&
                $(t[e]).find('div[data-visualcompletion="ignore-dynamic"] image').length > 0 &&
                $(t[e]).find('div[data-visualcompletion="ignore-dynamic"] image').attr("xlink:href") &&
                $(t[e]).find('div[data-visualcompletion="ignore-dynamic"] image').attr("xlink:href").length > 0 &&
                $(t[e])
                    .find("button img")
                    .attr("src")
                    .substring(0, $(t[e]).find("button img").attr("src").indexOf(".jpg") + 4)
                    .substring(
                        $(t[e])
                            .find("button img")
                            .attr("src")
                            .substring(0, $(t[e]).find("button img").attr("src").indexOf(".jpg") + 4)
                            .lastIndexOf("/") + 1
                    ) ==
                    $(t[e])
                        .find('div[data-visualcompletion="ignore-dynamic"] image')
                        .attr("xlink:href")
                        .substring(
                            0,
                            $(t[e])
                                .find('div[data-visualcompletion="ignore-dynamic"] image')
                                .attr("xlink:href")
                                .indexOf(".jpg") + 4
                        )
                        .substring(
                            $(t[e])
                                .find('div[data-visualcompletion="ignore-dynamic"] image')
                                .attr("xlink:href")
                                .substring(
                                    0,
                                    $(t[e])
                                        .find('div[data-visualcompletion="ignore-dynamic"] image')
                                        .attr("xlink:href")
                                        .indexOf(".jpg") + 4
                                )
                                .lastIndexOf("/") + 1
                        )
              ? (debug && console.log("We can comment because the image of the poster is the same 2!"), !0)
              : !!(
                    "postCurrentProfile" == do_not_check_who_comments2 ||
                    ($(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').length > 0 &&
                        $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() &&
                        $(t[e])
                            .find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain')
                            .text()
                            .indexOf(getCurrentPageTitle()) >= 0) ||
                    "skip" == getCurrentPageTitle() ||
                    $(t[e])
                        .find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain')
                        .text()
                        .indexOf(getCurrentPageTitle2(e, t)) >= 0
                ) &&
                !(
                    "" != pageNameAdditionalCheck &&
                    $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text()
                        .length > 1 &&
                    $(t[e])
                        .find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain')
                        .text()
                        .indexOf(pageNameAdditionalCheck) >= 0
                )
    );
}
function tryToChangePosterF(e, t) {
    (tryToChangePoster = !0),
        1 == $(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]').length
            ? ($(t[e]).find('._37uu ._3m9g ._40yk a,button.bp9cbjyn,._1dnh a[type="button"]')[0].click(),
              (TimerDelayVar1 = setTimeout(function () {
                  tryToChangePosterF2(e, t);
              }, 3e3)))
            : setTimeout(function () {
                  itemProcess(e, t, !0);
              }, 2e3);
}
function tryToChangePosterF2(e, t) {
    (imgSharedCommentPoster = ""),
        (posterFoundToChange = !1),
        (posterFoundToChange3 = getElem(
            '.uiContextualLayerPositioner ._21wq ._2sl4,.uiContextualLayer div[role="menuitemradio"],div[role="menu"] div[role="menuitemradio"]',
            ".uiContextualLayerPositioner.hidden_elem ._21wq ._2sl4"
        )).length > 0 &&
            posterFoundToChange3.each(function (n) {
                if (
                    ("" != pageNameFixedByUser && pageNameFixedByUser == $(this).text()) ||
                    getCurrentPageTitle() == $(this).text() ||
                    getCurrentPageTitle2(e, t) == $(this).text() ||
                    ("" != pageNameAdditionalCheck && pageNameAdditionalCheck == $(this).text())
                )
                    return (
                        debug &&
                            (console.log("found the right one, click on it!"), console.log(n + ": " + $(this).text())),
                        $(this).find("img").length > 0 &&
                            $(this).find("img").attr("src") &&
                            $(this).find("img").attr("src").length > 0 &&
                            ((imgSharedCommentPoster = (imgSharedCommentPoster = (imgSharedCommentPoster = $(this)
                                .find("img")
                                .attr("src")).substring(0, imgSharedCommentPoster.indexOf(".jpg") + 4)).substring(
                                imgSharedCommentPoster.lastIndexOf("/") + 1
                            )),
                            debug && console.log("Save image2:" + imgSharedCommentPoster)),
                        (posterFoundToChange = !0),
                        posterFoundToChange3[n] && posterFoundToChange3[n].click(),
                        !1
                    );
            }),
        posterFoundToChange
            ? setTimeout(function () {
                  itemProcess(e, t, !0);
              }, 2e3)
            : (posterFoundToChange2 = getElem(
                    ".uiContextualLayerPositioner ._21wq ._5ghu ._5ghv",
                    ".uiContextualLayerPositioner.hidden_elem ._21wq ._5ghu ._5ghv"
                )).length > 0
              ? posterToBusinessPageChange(
                    0,
                    posterFoundToChange2,
                    e,
                    t,
                    getCurrentPageTitle(),
                    getCurrentPageTitle2(e, t)
                )
              : (posterFoundToChange3.length > 0 && posterFoundToChange3[0].click(),
                setTimeout(function () {
                    itemProcess(e, t, !0);
                }, 2e3));
}
function posterToBusinessPageChange(e, t, n, o, i, r) {
    (imgSharedCommentPoster = ""),
        t[e].click(),
        setTimeout(function () {
            (posterFoundToChange = !1),
                getElem(
                    '.uiContextualLayerPositioner ._21wq ._2sl4,.uiContextualLayer div[role="menuitemradio"],div[role="menu"] div[role="menuitemradio"]',
                    ".uiContextualLayerPositioner.hidden_elem ._21wq ._2sl4"
                ).length > 0 &&
                    getElem(
                        '.uiContextualLayerPositioner ._21wq ._2sl4,.uiContextualLayer div[role="menuitemradio"],div[role="menu"] div[role="menuitemradio"]',
                        ".uiContextualLayerPositioner.hidden_elem ._21wq ._2sl4"
                    ).each(function (e) {
                        if (
                            ("" != pageNameFixedByUser && pageNameFixedByUser == $(this).text()) ||
                            i == $(this).text() ||
                            r == $(this).text()
                        )
                            return (
                                debug &&
                                    (console.log("found the right one, click on it!"),
                                    console.log(e + ": " + $(this).text())),
                                $(this).find("img").length > 0 &&
                                    $(this).find("img").attr("src") &&
                                    $(this).find("img").attr("src").length > 0 &&
                                    ((imgSharedCommentPoster = (imgSharedCommentPoster = (imgSharedCommentPoster = $(
                                        this
                                    )
                                        .find("img")
                                        .attr("src")).substring(
                                        0,
                                        imgSharedCommentPoster.indexOf(".jpg") + 4
                                    )).substring(imgSharedCommentPoster.lastIndexOf("/") + 1)),
                                    debug && console.log("Save image2:" + imgSharedCommentPoster)),
                                (posterFoundToChange = !0),
                                getElem(
                                    '.uiContextualLayerPositioner ._21wq ._2sl4,.uiContextualLayer div[role="menuitemradio"],div[role="menu"] div[role="menuitemradio"]',
                                    ".uiContextualLayerPositioner.hidden_elem ._21wq ._2sl4"
                                )[e].click(),
                                !1
                            );
                    }),
                !posterFoundToChange && t.length > e + 1
                    ? (getElem(
                          ".uiContextualLayerPositioner ._21wq ._8g0 ._2gxl ._2gxn>i",
                          ".uiContextualLayerPositioner.hidden_elem ._21wq ._8g0 ._2gxl ._2gxn>i"
                      ).length > 0 &&
                          getElem(
                              ".uiContextualLayerPositioner ._21wq ._8g0 ._2gxl ._2gxn>i",
                              ".uiContextualLayerPositioner.hidden_elem ._21wq ._8g0 ._2gxl ._2gxn>i"
                          )[0].click(),
                      setTimeout(function () {
                          posterToBusinessPageChange(e + 1, t, n, o, i, r);
                      }, 500))
                    : setTimeout(function () {
                          itemProcess(n, o, !0);
                      }, 2e3);
        }, 500);
}
function getIdFromThisLink(e) {
    var t = "";
    return e && e.length > 0
        ? (e.indexOf("?id=") > 0
              ? (t = e.substring(e.indexOf("?id=") + 4)).indexOf("&") > 0 && (t = t.substring(0, t.indexOf("&")))
              : e.indexOf("facebook.com/") > 0 &&
                ((t = e.substring(e.indexOf("facebook.com/") + 13)).indexOf("/") > 0 &&
                    (t = t.substring(0, t.indexOf("/"))),
                t.indexOf("?") > 0 && (t = t.substring(0, t.indexOf("?")))),
          t)
        : t;
}
function tryToLikeOnlyNoCommentAvailable(e, t) {
    doICommentAsPage(e, t) || tryToChangePoster
        ? 1 == scriptIsRunning &&
          ((localtimeout = 10),
          share_put_likes &&
              total_shared_posts_liked + c_c2 < share_likes_limit &&
              $(t[e])
                  .find(
                      '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                          getTextForCurrentLanguage("likeButton") +
                          '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                          getTextForCurrentLanguage("likeButton") +
                          '"]'
                  )
                  .not(
                      ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                  ).length > 0 &&
              (0 ==
                  $(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv").length ||
                  $(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                  (shares_reply_ignore_array.length > 0 &&
                      arrayInStringFound(
                          shares_reply_ignore_array,
                          $(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text
                      )) ||
                  ($(t[e])
                      .find(
                          '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"]'
                      )
                      .not(
                          ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                      )[0]
                      .click(),
                  debug && console.log("liked"),
                  total_shared_posts_liked++,
                  (loadsWithNoWorkOnShares = 0),
                  (total_shared_posts_liked + total_shared_posts_commented) % 40 == 0 &&
                      additional_script_pause &&
                      (timeout = 3e4),
                  updatePopup(addText),
                  updatePopup(),
                  (localtimeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1))),
          setTimeout(function () {
              checkInvitesOnShares(e, t);
          }, localtimeout))
        : tryToChangePoster || (debug && console.log("we try to change poster for likes"), tryToChangePosterF(e, t));
}
function mainCall(e, t) {
    (temp_block_help = !1),
        share_put_likes &&
            total_shared_posts_liked + c_c2 < share_likes_limit &&
            $(t[e])
                .find(
                    '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                        getTextForCurrentLanguage("likeButton") +
                        '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                        getTextForCurrentLanguage("likeButton") +
                        '"]'
                )
                .not(
                    ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                ).length > 0 &&
            ((localtimeout = 10),
            0 ==
                $(t[e])
                    .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                    .not("._5u5j .fcg .fwb>a._wpv").length ||
                $(t[e])
                    .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                    .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                (shares_reply_ignore_array.length > 0 &&
                    arrayInStringFound(
                        shares_reply_ignore_array,
                        $(t[e])
                            .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                            .not("._5u5j .fcg .fwb>a._wpv")[0].text
                    )) ||
                ($(t[e])
                    .find(
                        '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                            getTextForCurrentLanguage("likeButton") +
                            '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                            getTextForCurrentLanguage("likeButton") +
                            '"]'
                    )
                    .not(
                        ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                    )[0]
                    .click(),
                total_shared_posts_liked++,
                (loadsWithNoWorkOnShares = 0),
                (total_shared_posts_liked + total_shared_posts_commented) % 40 == 0 &&
                    additional_script_pause &&
                    (timeout = 3e4),
                updatePopup(),
                (localtimeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1))),
        share_put_comments && text_comm_shares.length > 1 && total_shared_posts_commented + c_c3 < share_comments_limit
            ? (TimerDelayVar1 = setTimeout(function () {
                  var n = $(t[e]).find("._37uu .comment_link,._18vi ._666h");
                  0 == n.length &&
                      $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]') &&
                      (n = $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]')),
                      n.length > 0
                          ? (debug && console.log("we click on comment button:" + n.length), n[0].click())
                          : (console.log("ERROR: Comment button not found 2"),
                            (temp_block_help = !0),
                            (TimerDelayVar2 = setTimeout(function () {
                                commentButtonSecondCheck(e, t);
                            }, 5e3))),
                      n.length > 0
                          ? ((temp_block_help = !0),
                            (TimerDelayVar2 = setTimeout(function () {
                                commentToThisElement1(e, t);
                            }, localtimeout + 800)))
                          : temp_block_help ||
                            (TimerDelayVar2 = setTimeout(function () {
                                checkInvitesOnShares(e, t);
                            }, localtimeout));
              }, localtimeout))
            : temp_block_help ||
              (TimerDelayVar1 = setTimeout(function () {
                  checkInvitesOnShares(e, t);
              }, localtimeout));
}
function commentButtonSecondCheck(e, t) {
    temp_block_help = !1;
    var n = $(t[e]).find("._37uu .comment_link,._18vi ._666h");
    0 == n.length &&
        $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]') &&
        (n = $(t[e]).find('div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]')),
        n.length > 0
            ? (debug && console.log("we click on comment button on SECOND CHECK:" + n.length), n[0].click())
            : console.log("ERROR: Comment button not found 2 (SECOND CHECK)"),
        n.length > 0
            ? ((temp_block_help = !0),
              (TimerDelayVar2 = setTimeout(function () {
                  commentToThisElement1(e, t);
              }, localtimeout + 800)))
            : temp_block_help ||
              (TimerDelayVar2 = setTimeout(function () {
                  checkInvitesOnShares(e, t);
              }, localtimeout));
}
function commentToThisElement1(e, t) {
    if (1 == scriptIsRunning) {
        var n = $(t[e]).find(".UFIContainer ._3b-9 .UFIPagerRow._4oep .UFIPagerLink");
        n.length > 0
            ? (debug && console.log("click on show more comments"),
              n.click(),
              setTimeout(function () {
                  commentToThisElement2(e, t);
              }, 1e3))
            : commentToThisElement2(e, t);
    }
}
var verifyLinkOfCurPageR = "";
function verifyLinkOfCurPage(e) {
    return !!(
        $(e)[0].getAttribute("href") &&
        $(e)[0].getAttribute("href").length > 0 &&
        ((verifyLinkOfCurPageR = $(e)[0].getAttribute("href")).indexOf("?") > 0 &&
            (verifyLinkOfCurPageR = verifyLinkOfCurPageR.substring(0, verifyLinkOfCurPageR.indexOf("?"))),
        -1 != window.location.href.indexOf(verifyLinkOfCurPageR))
    );
}
function getCurrentPageTitle() {
    var e = "";
    ("ar" == document.documentElement.lang || "he" == document.documentElement.lang
        ? (e = "skip")
        : pageNameOfThisPost && pageNameOfThisPost.length > 0
          ? (e = pageNameOfThisPost)
          : ((window.location.href.indexOf("/posts/") > 0 || window.location.href.indexOf("/photos/") > 0) &&
                getElem("a.profileLink,.fcg .fwb a").filter(function () {
                    return 1 == verifyLinkOfCurPage($(this));
                }).length > 0 &&
                (e = getElem("a.profileLink,.fcg .fwb a")
                    .filter(function () {
                        return 1 == verifyLinkOfCurPage($(this));
                    })
                    .first()
                    .text()),
            1 == getElem(".fb_content ._64-f>span").length && (e = getElem(".fb_content ._64-f>span").text()),
            window.location.href.indexOf("/creatorstudio") > 0 &&
                getElem(
                    '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0',
                    "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
                ).length > 0 &&
                getElem("a.profileLink,.fcg .fwb a").length > 0 &&
                (e = getElem("a.profileLink,.fcg .fwb a").first().text()),
            (window.location.href.indexOf("/creatorstudio") > 0 ||
                window.location.href.indexOf("/watch/") > 0 ||
                window.location.href.indexOf("/videos/") > 0) &&
            "" != pageNameAdditionalCheck
                ? (e = pageNameAdditionalCheck)
                : window.location.href.indexOf("/videos/") > 0 && getElem("._437j ._6dic a._371y").length > 0
                  ? (e = getElem("._437j ._6dic a._371y").first().text())
                  : window.location.href.indexOf("facebook.com/ads/") > 0 ||
                      window.location.href.indexOf("facebook.com/adsmanager/") > 0 ||
                      window.location.href.indexOf("/content_management") > 0 ||
                      document.location.href.indexOf("/latest/posts") > 0
                    ? (e =
                          1 == getElem("._34_k ._44f_").length
                              ? getElem("._34_k ._44f_").text()
                              : getElem("._5u5j .fcg .fwb a", "._1nvm ._5u5j .fcg .fwb a").length > 0
                                ? getElem("._5u5j .fcg .fwb a", "._1nvm ._5u5j .fcg .fwb a").text()
                                : getElem(
                                        '.mrwmy8nb .tds9wb2m div[role="combobox"] .rwb8dzxj .yukb02kx,#mediaManagerPagesSelector .qku1pbnj'
                                    ).length > 0
                                  ? getElem(
                                        '.mrwmy8nb .tds9wb2m div[role="combobox"] .rwb8dzxj .yukb02kx,#mediaManagerPagesSelector .qku1pbnj'
                                    )
                                        .last()
                                        .text()
                                  : getElem(
                                          'div[data-pagelet="BizKitLocalScopeSelector"] .yukb02kx .rwb8dzxj .a53abz89>.qku1pbnj'
                                      ).length > 0 && document.location.href.indexOf("/latest/posts") > 0
                                    ? getElem(
                                          'div[data-pagelet="BizKitLocalScopeSelector"] .yukb02kx .rwb8dzxj .a53abz89>.qku1pbnj'
                                      )
                                          .first()
                                          .text()
                                    : getElem('div[role="article"] .buofh1pr .nc684nl6').length > 0
                                      ? getElem('div[role="article"] .buofh1pr .nc684nl6').first().text()
                                      : "skip")
                    : window.location.href.indexOf("/photos/") > 0 &&
                        getElem(".fbPhotoContributorName ._hli").length > 0
                      ? (e = getElem(".fbPhotoContributorName ._hli").text())
                      : getElem(".fbPhotoContributorName a._hli").length > 0
                        ? (e = getElem(".fbPhotoContributorName a._hli").text())
                        : "" == e &&
                          (e = (e =
                              "(" == document.getElementsByTagName("title")[0].innerHTML.substring(0, 1)
                                  ? document
                                        .getElementsByTagName("title")[0]
                                        .innerHTML.substring(
                                            document.getElementsByTagName("title")[0].innerHTML.indexOf(" ") + 1
                                        )
                                  : document.getElementsByTagName("title")[0].innerHTML).replace(" | Facebook", "")),
            document.location.href.indexOf("/events/") > 0 &&
                getElem("._5gnb ._b9- a").length > 0 &&
                (e = getElem("._5gnb ._b9- a").text()),
            "" != pageNameAdditionalCheck && "" == e && (e = pageNameAdditionalCheck)),
    (e = (e = (e = (e = e.replace("‬", "")).replace("‫", "")).replace(" | Facebook", "")).replace(
        " - Posts",
        ""
    )).indexOf("&") > -1) && (e = new DOMParser().parseFromString(e, "text/html").body.textContent);
    return oneReportOnly || ((oneReportOnly = !0), console.log("Page Name=" + e)), e;
}
function getCurrentPageTitle2(e, t) {
    return $(t[e]).find(".fcg>a.profileLink,h3 .nc684nl6 a").length > 0
        ? $(t[e]).find(".fcg>a.profileLink,h3 .nc684nl6 a")[0].text
        : "-";
}
function getCurrentPage() {
    var e = window.location.href.replace("/pg/", "/"),
        t = "";
    return (
        e.indexOf("facebook.com/") > -1 &&
            e.indexOf("/", e.indexOf("facebook.com/") + 13) > 0 &&
            (t = e.substring(e.indexOf("facebook.com/") + 13, e.indexOf("/", e.indexOf("facebook.com/") + 13))),
        (t =
            t.length > 0
                ? e.indexOf("/business.", e) > 0
                    ? "https://business.facebook.com/" + t + "/"
                    : "https://www.facebook.com/" + t + "/"
                : "")
    );
}
function arrayInStringFound(e, t) {
    return (
        void 0 !== t &&
        !!e.some(function (e) {
            return t.toLowerCase().indexOf(e.toString().toLowerCase()) >= 0;
        })
    );
}
function getSharedPostAuthorName(e) {
    var t = "";
    return (
        $(e).find("._5u5j .fcg .fwb a.profileLink").not("._5u5j .fcg .fwb>a._wpv").length > 0
            ? (t = $(e).find("._5u5j .fcg .fwb a.profileLink").not("._5u5j .fcg .fwb>a._wpv")[0].text)
            : $(e).find("._5u5j .fcg .fwb>a").not("._5u5j .fcg .fwb>a._wpv").length > 0 &&
              (t = $(e).find("._5u5j .fcg .fwb>a").not("._5u5j .fcg .fwb>a._wpv")[0].text),
        t
    );
}
function checkWeAlreadyCommentNewFb(e, t) {
    return (
        !(
            !(
                $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').length > 0 &&
                $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() &&
                $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text().length > 1
            ) ||
            ($(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() !=
                getCurrentPageTitle() &&
                "skip" != getCurrentPageTitle() &&
                $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text() !=
                    getCurrentPageTitle2(e, t)) ||
            arrayInStringFound(
                do_not_check_shared_my_name_s_Array,
                $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text()
            )
        ) ||
        !!(
            $(t[e]).find('a[role="link"] .d2edcug0').length > 0 &&
            $(t[e]).find('a[role="link"] .d2edcug0').text() &&
            ($(t[e]).find('a[role="link"] .d2edcug0').text().indexOf(getCurrentPageTitle()) >= 0 ||
                $(t[e]).find('a[role="link"] .d2edcug0').text().indexOf(getCurrentPageTitle2(e, t)) >= 0)
        )
    );
}
function weDoNotSpamWithTheSameAccount(e, t) {
    if (postMoreUnderSameAccount) return !0;
    if (
        $(t[e])
            .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
            .not("a img._3me-").length > 0 &&
        $(t[e])
            .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
            .not("a img._3me-")
            .attr("alt") &&
        $(t[e])
            .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
            .not("a img._3me-")
            .attr("alt").length > 1
    )
        return (
            0 ==
            $(t[e]).find(
                'li a._6qw4:contains("' +
                    $(t[e])
                        .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                        .not("a img._3me-")
                        .attr("alt") +
                    '")'
            ).length
        );
    if (
        $(t[e]).find("image").not("a image").length > 0 &&
        $(t[e]).find("image").not("a image").attr("xlink:href") &&
        $(t[e]).find("image").not("a image").attr("xlink:href").length > 0
    ) {
        var n = !0;
        return (
            $(t[e]).find(".cwj9ozl2 a image").length > 0 &&
                $(t[e]).find(".cwj9ozl2 a image").attr("xlink:href") &&
                $(t[e]).find(".cwj9ozl2 a image").attr("xlink:href").length > 0 &&
                $(t[e])
                    .find(".cwj9ozl2 a image")
                    .each(function (o) {
                        $(this) &&
                            $(this).attr("xlink:href") &&
                            $(this).attr("xlink:href").length > 0 &&
                            $(this).attr("xlink:href") == $(t[e]).find("image").not("a image").attr("xlink:href") &&
                            (n = !1);
                    }),
            n
        );
    }
    return !0;
}
function commentToThisElement2(e, t) {
    1 == scriptIsRunning &&
        (0 == $(t[e]).find('.UFIContainer a[href*="' + getCurrentPage() + '"]').length &&
        weDoNotSpamWithTheSameAccount(e, t) &&
        0 ==
            $(t[e]).find(
                '.UFIContainer ._3b-9._j6a a.UFICommentActorName:contains("' +
                    getCurrentPageTitle() +
                    '"),a._6qw4:contains("' +
                    getCurrentPageTitle() +
                    '")'
            ).length &&
        0 ==
            $(t[e]).find(
                '.UFIContainer ._3b-9._j6a a.UFICommentActorName:contains("' +
                    getCurrentPageTitle2(e, t) +
                    '"),a._6qw4:contains("' +
                    getCurrentPageTitle2(e, t) +
                    '")'
            ).length &&
        (-1 == window.location.href.indexOf("facebook.com/ads/") ||
            ((window.location.href.indexOf("facebook.com/ads/") > 0 ||
                window.location.href.indexOf("facebook.com/adsmanager/") > 0 ||
                window.location.href.indexOf("/content_management") > 0 ||
                document.location.href.indexOf("/latest/posts") > 0) &&
                0 == $(t[e]).find(".uiHelpLink").length)) &&
        (!checkWeAlreadyCommentNewFb(e, t) ||
            ($(t[e])
                .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                .not("a img._3me-").length > 0 &&
                ("postCurrentProfile" == do_not_check_who_comments2 ||
                    "postPageOrCurrent" == do_not_check_who_comments2 ||
                    ($(t[e])
                        .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                        .not("a img._3me-")
                        .attr("alt") &&
                        $(t[e])
                            .find(
                                ".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-"
                            )
                            .not("a img._3me-")
                            .attr("alt").length > 1 &&
                        ($(t[e])
                            .find(
                                ".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-"
                            )
                            .not("a img._3me-")
                            .attr("alt") == getCurrentPageTitle() ||
                            "skip" == getCurrentPageTitle() ||
                            $(t[e])
                                .find(
                                    ".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-"
                                )
                                .not("a img._3me-")
                                .attr("alt") == getCurrentPageTitle2(e, t)))) &&
                $(t[e])
                    .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                    .not("a img._3me-")
                    .attr("alt").length > 1 &&
                0 ==
                    $(t[e]).find(
                        '.UFIRow.UFIComment .UFICommentAuthorWithPresence:has(img[alt="' +
                            $(t[e])
                                .find(
                                    ".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-"
                                )
                                .not("a img._3me-")
                                .attr("alt") +
                            '"])'
                    ).length &&
                !arrayInStringFound(
                    do_not_check_shared_my_name_s_Array,
                    $(t[e])
                        .find(".UFIAddComment .UFIMentionsInputWrap .UFIReplyActorPhotoWrapper img,._3w53 img._3me-")
                        .not("a img._3me-")
                        .attr("alt")
                ))) &&
        !checkWeAlreadyCommentNewFb(e, t)
            ? (debug &&
                  (console.log("our comment not found, check if we cannot comment why:"),
                  ($(t[e]).find(
                      '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                  ).length > 0 &&
                      (0 == shares_reply_ignore_array.length ||
                          0 == getSharedPostAuthorName($(t[e])).length ||
                          (shares_reply_ignore_array.length > 0 &&
                              !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
                      (0 == getSharedPostAuthorName($(t[e])).length ||
                          $(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
                      (0 == shares_list_delete_days ||
                          !$(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                          ($(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                              "" ==
                                  getIdFromThisLink(
                                      $(t[e])
                                          .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                          .not("._5u5j .fcg .fwb>a._wpv")[0]
                                          .getAttribute("href")
                                  )) ||
                          ($(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                              0 ==
                                  obj.msgListSentID.hasOwnProperty(
                                      getIdFromThisLink(
                                          $(t[e])
                                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                              .not("._5u5j .fcg .fwb>a._wpv")[0]
                                              .getAttribute("href")
                                      )
                                  )))) ||
                      (console.log(
                          $(t[e]).find(
                              '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                          ).length
                      ),
                      console.log(shares_reply_ignore_array.length),
                      console.log(
                          $(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text
                      ),
                      console.log(getCurrentPageTitle()),
                      console.log(
                          $(t[e])
                              .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                              .not("._5u5j .fcg .fwb>a._wpv")[0]
                      ),
                      console.log(
                          obj.msgListSentID.hasOwnProperty(
                              getIdFromThisLink(
                                  $(t[e])
                                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                      .not("._5u5j .fcg .fwb>a._wpv")[0]
                                      .getAttribute("href")
                              )
                          )
                      ),
                      console.log("======================!!"))),
              $(t[e]).find(
                  '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
              ).length > 0 &&
              (0 == shares_reply_ignore_array.length ||
                  0 == getSharedPostAuthorName($(t[e])).length ||
                  (shares_reply_ignore_array.length > 0 &&
                      !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
              (0 == getSharedPostAuthorName($(t[e])).length ||
                  $(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
              (0 == shares_list_delete_days ||
                  !$(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                  ($(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                      "" ==
                          getIdFromThisLink(
                              $(t[e])
                                  .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                  .not("._5u5j .fcg .fwb>a._wpv")[0]
                                  .getAttribute("href")
                          )) ||
                  ($(t[e])
                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                      .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                      0 ==
                          obj.msgListSentID.hasOwnProperty(
                              getIdFromThisLink(
                                  $(t[e])
                                      .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                      .not("._5u5j .fcg .fwb>a._wpv")[0]
                                      .getAttribute("href")
                              )
                          )))
                  ? ($(t[e])
                        .find(
                            '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                        )[0]
                        .click(),
                    setTimeout(function () {}, 200),
                    setTimeout(function () {
                        if (
                            ((temp_text = getCommSharesRandomText()).search("%name") >= 0 &&
                            $(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv").length > 0
                                ? (temp_text = addUserNameToComment(
                                      temp_text,
                                      $(t[e])
                                          .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                          .not("._5u5j .fcg .fwb>a._wpv")[0].text,
                                      $(t[e])
                                          .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                          .not("._5u5j .fcg .fwb>a._wpv")
                                          .attr("data-hovercard")
                                  ))
                                : temp_text.search("%name") >= 0 && 1 == $(t[e]).find("._5u5j .fcg .fwb a").length
                                  ? (temp_text = addUserNameToComment(
                                        temp_text,
                                        $(t[e]).find("._5u5j .fcg .fwb a")[0].text,
                                        $(t[e]).find("._5u5j .fcg .fwb a").attr("data-hovercard")
                                    ))
                                  : temp_text.search("%name") >= 0 &&
                                    (temp_text = addUserNameToComment(temp_text, "", "")),
                            temp_text.length > 0)
                        ) {
                            var n = !0;
                            0 == $(t[e]).find('.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span').length &&
                                $(t[e]).find('.l9j0dhe7 div[role="textbox"] .hcukyx3x').length > 0 &&
                                (n = !1);
                            try {
                                $(t[e])
                                    .find(
                                        '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x span'
                                    )
                                    .last()
                                    .sendkeys(temp_text);
                            } catch (e) {
                                console.log("Error during posting a comment:" + e);
                            }
                            debug &&
                                console.log(
                                    "ПЕРЕД ОТПРАВКОЙ СКОЛЬКО СПАНОВ:" +
                                        $(t[e]).find(
                                            '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                                        ).length
                                ),
                                debug && console.log("submit"),
                                (elementUpdCommentText.innerHTML = temp_text),
                                n
                                    ? setTimeout(function () {
                                          (temp_current_com_text = $(t[e])
                                              .find(
                                                  '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                                              )
                                              .first()
                                              .html()),
                                              "undefined" != typeof temp_current_com_text &&
                                                  ((temp_current_com_text = temp_current_com_text.substring(
                                                      temp_current_com_text.indexOf("<span")
                                                  )),
                                                  $(t[e])
                                                      .find(
                                                          '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                                                      )
                                                      .first()
                                                      .replaceWith(temp_current_com_text),
                                                  $(t[e])
                                                      .find(
                                                          '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                                                      )
                                                      .last()
                                                      .attr("data-comment-sender", "true"));
                                      }, 200)
                                    : $(t[e])
                                          .find(
                                              '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x span'
                                          )
                                          .last()
                                          .attr("data-comment-sender", "true"),
                                (TimerDelayVar1 = setTimeout(function () {
                                    1 == scriptIsRunning &&
                                        (0 == getElem('[data-comment-sender="true"]').length
                                            ? refreshSharedPosts(e, t)
                                            : (debug && console.log("ЫЫТЕСТ TEST write comment here"),
                                              (script1 = document.createElement("script")),
                                              script1.setAttribute("src", api.runtime.getURL("postTextNow.js")),
                                              (document.head || document.documentElement).appendChild(script1),
                                              script1.parentNode.removeChild(script1),
                                              (TimerDelayVar1 = setTimeout(function () {
                                                  checkCommentWasSent(e, t, !0);
                                              }, 2500))));
                                }, 1300));
                        } else
                            setTimeout(function () {
                                checkInvitesOnShares(e, t);
                            }, 500);
                    }, 600))
                  : ($(t[e]).find(
                        '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x'
                    ).length > 0 &&
                        (0 == shares_reply_ignore_array.length ||
                            0 == getSharedPostAuthorName($(t[e])).length ||
                            (shares_reply_ignore_array.length > 0 &&
                                !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
                        (0 == getSharedPostAuthorName($(t[e])).length ||
                            $(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
                        (0 == shares_list_delete_days ||
                            !$(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                            ($(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                                "" ==
                                    getIdFromThisLink(
                                        $(t[e])
                                            .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                            .not("._5u5j .fcg .fwb>a._wpv")[0]
                                            .getAttribute("href")
                                    )) ||
                            ($(t[e])
                                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                                1 ==
                                    obj.msgListSentID.hasOwnProperty(
                                        getIdFromThisLink(
                                            $(t[e])
                                                .find(
                                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a"
                                                )
                                                .not("._5u5j .fcg .fwb>a._wpv")[0]
                                                .getAttribute("href")
                                        )
                                    ))) &&
                        (antiSpamCommentSkipped++, updatePopup()),
                    setTimeout(function () {
                        checkInvitesOnShares(e, t);
                    }, 500)))
            : (debug && console.log("comment found OR we are commenting as different person, go to next element"),
              setTimeout(function () {
                  checkInvitesOnShares(e, t);
              }, 10)));
}
function checkCommentWasSent(e, t, n) {
    1 == scriptIsRunning &&
        (debug && console.log("Comment was posted correctly."),
        total_shared_posts_commented++,
        (loadsWithNoWorkOnShares = 0),
        updatePopup(),
        (fixedStartOfI = 0),
        (fixedMaxTries = 0),
        shares_list_delete_days > 0 &&
            $(t[e])
                .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
            "" !=
                getIdFromThisLink(
                    $(t[e])
                        .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                        .not("._5u5j .fcg .fwb>a._wpv")[0]
                        .getAttribute("href")
                ) &&
            ((obj.msgListSentID[
                getIdFromThisLink(
                    $(t[e])
                        .find("._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a")
                        .not("._5u5j .fcg .fwb>a._wpv")[0]
                        .getAttribute("href")
                )
            ] = parseInt(Math.floor(Date.now() / 1e3))),
            api.storage.local.set(obj)),
        (TimerDelayVar1 = setTimeout(function () {
            checkInvitesOnShares(e, t);
        }, getTimeoutComments())));
}
function refreshSharedPosts(e, t) {
    debug && console.log("not found, I fix it"),
        console.log(
            "There was an error, we were not able to send the comment, so we try again and reload all comments for this post."
        ),
        5 == fixedMaxTries
            ? (console.log("ERROR! We were not able to post a comment, let's go to the next post."),
              setTimeout(function () {
                  ClosePostAndOpenNext(-1);
              }, 500))
            : (setTimeout(function () {
                  getElem(".uiToggle._4962._4xi2._5orm>a").length > 0 &&
                      getElem(".uiToggle._4962._4xi2._5orm>a")[0].click();
              }, 10),
              setTimeout(function () {
                  getElem(".uiToggle._4962._4xi2._5orm>a").length > 0 &&
                      getElem(".uiToggle._4962._4xi2._5orm>a")[0].click();
              }, 1e3),
              (TimerDelayVar1 = setTimeout(function () {
                  1 == scriptIsRunning &&
                      ((itemElement4 = getElem("._ohf>a.layerCancel")).length > 0
                          ? (itemElement4[itemElement4.length - 1].click(),
                            (fixedStartOfI = e),
                            fixedMaxTries++,
                            setTimeout(function () {
                                doSHAREDposts();
                            }, 1500))
                          : (e++,
                            (itemProcessed = e),
                            setTimeout(function () {
                                itemProcess(e, t);
                            }, 500)));
              }, 2e3)));
}
function itemsLoadMore(e, t) {
    1 == scriptIsRunning &&
        (fast_scan &&
        ((0 == fast_scan_loads && loadsWithNoWorkOnShares > fast_scan_loads + 3) ||
            (0 != fast_scan_loads && loadsWithNoWorkOnShares > 3 * fast_scan_loads))
            ? (debug && console.log("Fast scan, we stop scanning those shared posts"),
              setTimeout(function () {
                  ClosePostAndOpenNext(-1);
              }, 100))
            : 0 == e
              ? ((docHeight = getElem(
                    '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .sjgh65i0',
                    "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm"
                ).length),
                (sharedPostsHeight = docHeight),
                scrollThisE(),
                setTimeout(function () {
                    itemsLoadMore(e + 1, t);
                }, 2e3))
              : ((docHeight = getElem(
                    '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .sjgh65i0',
                    "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm"
                ).length),
                (sharedMaxScroll >= 2e3 || e >= 4) && !itemRemovedSharedScroll
                    ? (debug && console.log("GO TO NEXT Here 9"),
                      setTimeout(function () {
                          ClosePostAndOpenNext(-1);
                      }, 100))
                    : docHeight != sharedPostsHeight || itemRemovedSharedScroll
                      ? (sharedMaxScroll++,
                        (itemProcessed = 2),
                        (itemRemovedSharedScroll = !1),
                        (loadsWithNoWorkOnShares = 0),
                        setTimeout(function () {
                            StartLIKEPosts(0);
                        }, 100))
                      : docHeight != sharedPostsHeight || itemRemovedSharedScroll
                        ? (scrollThisE(),
                          sharedMaxScroll > 50
                              ? setTimeout(function () {
                                    itemsLoadMore(e + 1, 8);
                                }, 3e3)
                              : sharedMaxScroll > 40
                                ? setTimeout(function () {
                                      itemsLoadMore(e + 1, 7);
                                  }, 3e3)
                                : sharedMaxScroll > 30
                                  ? setTimeout(function () {
                                        itemsLoadMore(e + 1, 7);
                                    }, 2e3)
                                  : sharedMaxScroll > 20
                                    ? setTimeout(function () {
                                          itemsLoadMore(e + 1, 6);
                                      }, 2e3)
                                    : setTimeout(function () {
                                          itemsLoadMore(e + 1, 4);
                                      }, 2e3))
                        : (sharedMaxScroll++,
                          (itemProcessed = 2),
                          loadsWithNoWorkOnShares++,
                          setTimeout(function () {
                              StartLIKEPosts(0);
                          }, 100))));
}
function scrollThisE() {
    window.scrollTo(0, $(document).height()),
        getElem("._4-i2 #pagelet_scrolling_pager .uiMorePager a,._59s7 ._4-i2 .uiMorePager a").length > 0 &&
            getElem("._4-i2 #pagelet_scrolling_pager .uiMorePager a,._59s7 ._4-i2 .uiMorePager a")[0].click();
}
function getTimeoutComments() {
    return (total_shared_posts_liked + total_shared_posts_commented) % 40 == 0 && additional_script_pause
        ? 3e4
        : Math.floor(Math.random() * (pc_2 - pc_1 + 1)) + pc_1;
}
function getCommSharesRandomText() {
    if (temp_random_array.length > 0) {
        for (
            _textR = temp_random_array[Math.floor(Math.random() * temp_random_array.length)];
            null !== (_matches = _regEx.exec(_textR));

        )
            (_options = _matches[1].split("|")),
                (_random = Math.floor(Math.random() * _options.length)),
                (_textR = _textR.replace(_matches[0], _options[_random]));
        return _textR;
    }
    return "";
}
function addUserNameToComment(e, t, n) {
    return (
        "%" == e.slice(-1) && (e += " "),
        n && "undefined" !== n && n.length > 0 && n.indexOf("page.php") > 0
            ? (e = (e = (e = (e = e.replace(/\%name3\%/g, t)).replace(/\%name2\%/g, t)).replace(
                  /\%name1\%/g,
                  t
              )).replace("%name%", t))
            : "undefined" !== t && t.length > 1
              ? (e.search("%name3%") >= 0 &&
                    (e =
                        t.indexOf(" ") >= 0 ? e.replace(/\%name3\%/g, t.split(" ").pop()) : e.replace(/\%name3\%/g, t)),
                e.search("%name2%") >= 0 &&
                    (e = t.indexOf(" ") >= 0 ? e.replace(/\%name2\%/g, t.split(" ")[0]) : e.replace(/\%name2\%/g, t)),
                e.search("%name1%") >= 0 && (e = e.replace(/\%name1\%/g, t)),
                e.search("%name%") >= 0 && (e = e.replace("%name%", t)))
              : (e = (e = (e = (e = e.replace("%name%", "")).replace(/\%name1\%/g, "")).replace(
                    /\%name2\%/g,
                    ""
                )).replace(/\%name3\%/g, "")),
        e
    );
}
function StartInvitePeople() {
    (checkTwice = 0),
        1 == scriptIsRunning &&
            (1 == skip_Invite && 0 == weAreInvitingFromShared
                ? (console.log("Invite feature is disabled in Options. Go to next one."),
                  setTimeout(function () {
                      ClosePostAndOpenNext(-1);
                  }, 20))
                : scan_reactions_tabs || openedPostHasTooManyLikes()
                  ? ((bigPostTabs.length = 0),
                    getElem(
                        "._4t2a ._21ab li._45hc ._21af._9zc",
                        "._4t2a ._21ab li._45hc._1hqh ._21af._9zc,.hidden_elem ._21af._9zc"
                    ).length > 0 &&
                        getElem(
                            "._4t2a ._21ab li._45hc ._21af._9zc",
                            "._4t2a ._21ab li._45hc._1hqh ._21af._9zc,.hidden_elem ._21af._9zc"
                        ).each(function (e) {
                            (((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.like) ||
                                ($(this).parent() &&
                                    $(this).parent().attr("aria-label") &&
                                    $(this)
                                        .parent()
                                        .attr("aria-label")
                                        .toLowerCase()
                                        .indexOf(fbEmotionsBtnArray.oldEmoText.like.toLowerCase()) > 0)) &&
                                !skip_like_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.angry) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.angry.toLowerCase()) > 0)) &&
                                    !skip_angry_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.haha) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.haha.toLowerCase()) > 0)) &&
                                    !skip_haha_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.sad) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.sad.toLowerCase()) > 0)) &&
                                    !skip_sad_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.love) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.love.toLowerCase()) > 0)) &&
                                    !skip_love_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.care) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.care.toLowerCase()) > 0)) &&
                                    !skip_love_emotion) ||
                                ((checkInArrayIconOldFB(this, fbEmotionsBtnArray.oldEmoClass.wow) ||
                                    ($(this).parent() &&
                                        $(this).parent().attr("aria-label") &&
                                        $(this)
                                            .parent()
                                            .attr("aria-label")
                                            .toLowerCase()
                                            .indexOf(fbEmotionsBtnArray.oldEmoText.wow.toLowerCase()) > 0)) &&
                                    !skip_wow_emotion)) &&
                                bigPostTabs.push($(this));
                        }),
                    0 == bigPostTabs.length &&
                        getNewUIMainScrollOnly(
                            'div[aria-label="Reactions"] div[aria-hidden="false"],div[aria-label="Reazioni"] div[aria-hidden="false"]'
                        ).filter(function () {
                            return $(this).attr("aria-selected") && "false" == $(this).attr("aria-selected");
                        }).length > 0 &&
                        getNewUIMainScrollOnly(
                            'div[aria-label="Reactions"] div[aria-hidden="false"],div[aria-label="Reazioni"] div[aria-hidden="false"]'
                        )
                            .filter(function () {
                                return $(this).attr("aria-selected") && "false" == $(this).attr("aria-selected");
                            })
                            .each(function (e) {
                                (($(this).find("img").length > 0 &&
                                    $(this).find("img").attr("src") &&
                                    checkInArrayIconNewFB(
                                        $(this).find("img").attr("src"),
                                        fbEmotionsBtnArray.newEmoLink.like
                                    ) &&
                                    !skip_like_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.angry
                                        ) &&
                                        !skip_angry_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.haha
                                        ) &&
                                        !skip_haha_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.sad
                                        ) &&
                                        !skip_sad_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.love
                                        ) &&
                                        !skip_love_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.care
                                        ) &&
                                        !skip_love_emotion) ||
                                    ($(this).find("img").length > 0 &&
                                        $(this).find("img").attr("src") &&
                                        checkInArrayIconNewFB(
                                            $(this).find("img").attr("src"),
                                            fbEmotionsBtnArray.newEmoLink.wow
                                        ) &&
                                        !skip_wow_emotion)) &&
                                    bigPostTabs.push($(this));
                            }),
                    bigPostTabs.length > 0 ? StartInvitePeopleOLD(0) : StartInvitePeopleOLD(-1))
                  : StartInvitePeopleOLD(-1));
}
var listenerInit,
    returnFF2 = !1;
function checkInArrayIconNewFB(e, t) {
    return (
        (returnFF2 = !1),
        t.forEach(function (t) {
            e.indexOf(t) > -1 && (returnFF2 = !0);
        }),
        returnFF2
    );
}
function checkInArrayIconOldFB(e, t) {
    return (
        (returnFF2 = !1),
        t.forEach(function (t) {
            $(e).find(t).length > 0 && (returnFF2 = !0);
        }),
        returnFF2
    );
}
function allOldEmoClassesAreNotPresent() {
    (returnFF2 = !0),
        fbEmotionsBtnArray.oldEmoClass.forEach(function (e) {
            e.forEach(function (e) {
                getElem(e).length > 0 && (returnFF2 = !1);
            });
        });
}
function openedPostHasTooManyLikes() {
    if (scan_reactions_tabs_more1) {
        if (
            getElem("._4t2a ._43o4 ._1hqh ._3m1v>span>span").length > 0 &&
            getElem("._4t2a ._43o4 ._1hqh ._3m1v>span>span").text().length > 0 &&
            checkArrayInString(getElem("._4t2a ._43o4 ._1hqh ._3m1v>span>span").text())
        )
            return !0;
        if (
            getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span").length > 1 &&
            $(getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span")[1]).text().length > 0 &&
            checkArrayInString($(getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span")[1]).text())
        )
            return !0;
        if (
            getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span").length > 2 &&
            $(getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span")[2]).text().length > 0 &&
            checkArrayInString($(getElem("._4t2a ._43o4 ._45hc ._3m1v>span>span")[2]).text())
        )
            return !0;
        var e = !1;
        return (
            getNewUIMainScrollOnly(
                'div[aria-label="Reactions"] div[aria-hidden="false"],div[aria-label="Reazioni"] div[aria-hidden="false"]'
            )
                .filter(function () {
                    return $(this).attr("aria-selected") && "false" == $(this).attr("aria-selected");
                })
                .each(function (t) {
                    !e &&
                        $(this).find('span[dir="auto"]').length > 0 &&
                        checkArrayInString($(this).find('span[dir="auto"]').text()) &&
                        (e = !0);
                }),
            e ||
                !(
                    !(
                        skip_like_emotion ||
                        skip_angry_emotion ||
                        skip_haha_emotion ||
                        skip_sad_emotion ||
                        skip_love_emotion ||
                        skip_wow_emotion
                    ) ||
                    isThisNewFbDesign2020() ||
                    !allOldEmoClassesAreNotPresent()
                )
        );
    }
    return !1;
}
function checkArrayInString(e) {
    for (var t = 0; t < bigPostArray.length; t++) if (e.indexOf(bigPostArray[t]) > -1) return !0;
    return !1;
}
function StartInvitePeopleOLD(e) {
    1 == scriptIsRunning &&
        ((totalLikedCheck = -1),
        e <= 0 && (clickedForMore = 0),
        (loadsWithNoInvite = 0),
        (loadsWithNoWorkOnShares = 0),
        e > -1
            ? (bigPostTabs.length > e && $(bigPostTabs[e]).length > 0 && $(bigPostTabs[e])[0].click(),
              (canSKIPButton = 0),
              (hadInvitedButton = 0),
              (hadClickedMoreButton = 0),
              (likeButtonsProcessed = 0),
              setTimeout(function () {
                  InvitePeople(e);
              }, 1e3))
            : InvitePeople(e));
}
function InvitePeople2(e) {
    (clickedForMore = 0),
        fast_scan && loadsWithNoInvite > fast_scan_loads && !weAreScanningOnlyInvites
            ? weAreScanningOnlyInvites
                ? ((weAreScanningOnlyInvites = !1), stopScript())
                : (debug && console.log("GO TO NEXT Here 10"),
                  setTimeout(function () {
                      ClosePostAndOpenNext(e);
                  }, 20))
            : loop_PostsListArray.length > 0 &&
                notloadtoomuch &&
                skip_if_no_buttons_after_first_loop &&
                canSKIPButton > 5 &&
                0 == hadInvitedButton
              ? (debug && console.log("GO TO NEXT Here 11"),
                setTimeout(function () {
                    ClosePostAndOpenNext(e);
                }, 20))
              : (getElem(
                      ".uiScrollableAreaContent .uiMorePagerPrimary",
                      ".uiScrollableAreaContent .hidden_elem .uiMorePagerPrimary"
                  ).length > 0 &&
                      getElem(
                          ".uiScrollableAreaContent .uiMorePagerPrimary",
                          ".uiScrollableAreaContent .hidden_elem .uiMorePagerPrimary"
                      ).length > 0 &&
                      (uiMorePagerPrimary < fb_limit_show_more_btn || 0 == fb_limit_show_more_btn)) ||
                  newFBinviteDesign
                ? ((inputsInvMore2 = getElem(
                      "._4t2a .uiScrollableArea .uiMorePager a.uiMorePagerPrimary",
                      ".hidden_elem a.uiMorePagerPrimary"
                  )),
                  (_tempTimeoutLoc3 = 1e4),
                  uiMorePagerPrimary > 180
                      ? (_tempTimeoutLoc3 = 4e4)
                      : uiMorePagerPrimary > 120
                        ? (_tempTimeoutLoc3 = 35e3)
                        : uiMorePagerPrimary > 80
                          ? (_tempTimeoutLoc3 = 2e4)
                          : uiMorePagerPrimary > 60
                            ? (_tempTimeoutLoc3 = 17e3)
                            : uiMorePagerPrimary > 30 && (_tempTimeoutLoc3 = 13e3),
                  newFBinviteDesign && (_tempTimeoutLoc3 /= 2),
                  (_tempTimeoutLoc2 = randTwoNumbers(
                      0.9 *
                          (_tempTimeoutLoc2 =
                              (_tempTimeoutLoc2 = Math.floor(Date.now()) - _tempTimeoutLoc1) >= _tempTimeoutLoc3
                                  ? 100
                                  : _tempTimeoutLoc3 - _tempTimeoutLoc2),
                      1.1 * _tempTimeoutLoc2
                  )) < 0 && (_tempTimeoutLoc2 = 100),
                  (_tempTimeoutLoc2 += (totalShowModeClickedForRun / 300) * 1e3),
                  debug &&
                      console.log(
                          "timeout:" + _tempTimeoutLoc2 + ". Increased by:" + (totalShowModeClickedForRun / 300) * 1e3
                      ),
                  _tempTimeoutLoc2 > 6e4 &&
                      (_tempTimeoutLoc2 = randTwoNumbers(0.9 * (_tempTimeoutLoc2 = 6e4), 1.1 * _tempTimeoutLoc2)),
                  (_tempTimeoutLoc2 = Math.round(_tempTimeoutLoc2 + 1e3 * fb_limit_show_more_btn_add_sec)),
                  loopmaxtry > 1 && _tempTimeoutLoc2 > 2e3 && (_tempTimeoutLoc2 = 100),
                  (TimerDelayVar1 = setTimeout(function () {
                      for (locali = 0; locali < inputsInvMore2.length; locali++)
                          0 == clickedForMore && hadClickedMoreButton++,
                              (clickedForMore = 1),
                              uiMorePagerPrimary++,
                              updatePopup(),
                              inputsInvMore2[locali].click(),
                              totalShowModeClickedForRun++,
                              (_tempTimeoutLoc1 = Math.floor(Date.now()));
                      newFBinviteDesign &&
                          (getElem(scrollingNewFBDesignClassDef).length > 0 ||
                              getElem(scrollingNewFBDesignClass).length > 0) &&
                          (uiMorePagerPrimary++,
                          updatePopup(),
                          (clickedForMore = 1),
                          (_tempTimeoutLoc1 = Math.floor(Date.now())),
                          getElem(scrollingNewFBDesignClassDef).length > 0 &&
                              getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(5199948),
                          getElem(scrollingNewFBDesignClass).length > 0 &&
                              getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(5199948)),
                          (TimerDelayVar1 = setTimeout(
                              function () {
                                  if (checkLimitationPopup2())
                                      if (
                                          (fb_limit_show_more_btn_add_sec < 15 && (fb_limit_show_more_btn_add_sec = 15),
                                          additional_script_pause || (additional_script_pause = !0),
                                          api.storage.sync.set(
                                              {
                                                  fb_limit_show_more_btn_add_sec: fb_limit_show_more_btn_add_sec,
                                                  additional_script_pause: additional_script_pause,
                                              },
                                              function () {
                                                  p1_1 < 1e4 &&
                                                      p1_2 < 1e4 &&
                                                      ((p1_1 = 13e3),
                                                      (p1_2 = 15e3),
                                                      api.storage.sync.set({ p1_1: 13, p1_2: 15 }, function () {}));
                                              }
                                          ),
                                          3 == scrollingLimitsInARow)
                                      )
                                          stopScript(
                                              "Error: Facebook popup message shown. <b>Click 'let us know' and report to Facebook</b>, wait 24h and try again. This is a normal limitation, it happens even if you click manually.<br>",
                                              !0
                                          );
                                      else {
                                          getElem(
                                              "._4t2a .uiOverlayFooter .layerCancel,.uiLayer .uiOverlayFooter .layerCancel"
                                          ).length > 0 &&
                                              getElem(
                                                  "._4t2a .uiOverlayFooter .layerCancel,.uiLayer .uiOverlayFooter .layerCancel"
                                              )[0].click();
                                          var t = 1320;
                                          (t = addRandomToTheTimer(t)) <= 0 && (t = 30);
                                          var n = new Date();
                                          n.setSeconds(n.getSeconds() + t),
                                              (t *= 1e3),
                                              2 == scrollingLimitsInARow && (t *= 2),
                                              (totalShowModeClickedForRun = 0),
                                              updatePopup(
                                                  '.<br><span style="color:red">Scrolling is temporary limited.</span> We pause the script for ~' +
                                                      (2 == scrollingLimitsInARow ? "44" : "22") +
                                                      " minutes. Will resume at " +
                                                      ("0" + n.getHours()).slice(-2) +
                                                      ":" +
                                                      ("0" + n.getMinutes()).slice(-2) +
                                                      ":" +
                                                      ("0" + n.getSeconds()).slice(-2),
                                                  1
                                              ),
                                              2 == ++scrollingLimitsInARow || totalPostsProcessed > 1
                                                  ? ((TimerDelayVar1 = setTimeout(
                                                        function () {
                                                            getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length >
                                                                0 &&
                                                                getElem(
                                                                    "._2pi9 .layerCancel, ._21ab .layerCancel"
                                                                )[0].click(),
                                                                closeInviteWindowInNewUI();
                                                        },
                                                        randTwoNumbers(2e3, 5e3)
                                                    )),
                                                    (loopTimerDelay = setTimeout(function () {
                                                        debug && console.log("GO TO NEXT Here 12"),
                                                            ClosePostAndOpenNext(e);
                                                    }, t)))
                                                  : (loopTimerDelay = setTimeout(function () {
                                                        InvitePeople(e);
                                                    }, t));
                                      }
                                  else (scrollingLimitsInARow = 0), InvitePeople(e);
                              },
                              Math.floor(Math.random() * (fb_timeout_2 + 700 - fb_timeout_2 + 1)) + fb_timeout_2
                          ));
                  }, _tempTimeoutLoc2)))
                : ((uiMorePagerPrimary = 0),
                  (likeButtonsProcessed = 0),
                  debug && console.log("GO TO NEXT Here 13"),
                  setTimeout(function () {
                      ClosePostAndOpenNext(e);
                  }, 20)),
        updatePopup();
}
function InvitePeople(e) {
    1 == scriptIsRunning &&
        (hadInvitedButton > 0 && (hadInvitedButton = 2 * hadInvitedButton + 2),
        (canSKIPButton -= hadInvitedButton) < 3 && (canSKIPButton = 0),
        0 ==
            (inputsInvites = getElem(".uiScrollableAreaWrap ._5i_p .uiList._4kg", ".hidden_elem .uiList._4kg")
                .find("._5i_q ._6a._6b button._51sy,._5i_q ._6a._6b a._51sy")
                .not("._5i_q ._6a._6b a._59pe,._5i_q ._6a._6b button._51sy.hidden_elem,.uiPopover>a._51sy")).length &&
            getNewInviteButtonsByText().length > 0 &&
            getElem(
                getElemWithAddFriendButtons('div[role="dialog"] span:contains("Add Friend")'),
                getElemWithAddFriendButtons('div[role="article"] span:contains("Add Friend")')
            ).length <= 7 &&
            isThisNewFbDesign2020() &&
            ((newFBinviteDesign = !0), (inputsInvites = getNewInviteButtonsByText()), (scanByNameNewUI = !0)),
        inputsInvites.length > 0
            ? ((tryToLoad = 0),
              (3 == runMode ||
                  4 == runMode ||
                  ((1 == runMode || 2 == runMode) &&
                      (inviteDuringShareCheck ||
                          inviteDuringShareCheck2 ||
                          likeSharedComments ||
                          share_put_likes ||
                          (share_put_comments && text_comm_shares.length > 1)))) &&
                  (inputsInvites2 = getElem(
                      "#reaction_profile_browser .FriendRequestAdd._51sy, #reaction_profile_browser1 .FriendRequestAdd._51sy, #reaction_profile_browser2 .FriendRequestAdd._51sy, #reaction_profile_browser3 .FriendRequestAdd._51sy, #reaction_profile_browser4 .FriendRequestAdd._51sy, #reaction_profile_browser5 .FriendRequestAdd._51sy, #reaction_profile_browser6 .FriendRequestAdd._51sy, #reaction_profile_browser7 .FriendRequestAdd._51sy, #reaction_profile_browser8 .FriendRequestAdd._51sy, #reaction_profile_browser9 .FriendRequestAdd._51sy",
                      ".hidden_elem #reaction_profile_browser .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser1 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser2 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser3 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser4 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser5 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser6 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser7 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser8 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser9 .FriendRequestAdd._51sy"
                  )).length > 4 &&
                  inputsInvites2.length > inputsInvites.length / 3 &&
                  (inviteDuringShareCheck ||
                  inviteDuringShareCheck2 ||
                  likeSharedComments ||
                  share_put_likes ||
                  (share_put_comments && text_comm_shares.length > 1) ||
                  weAreInvitingFromShared > 0 ||
                  weAreScanningOnlyShared
                      ? ((localuse = 1), debug && console.log("GO TO NEXT Here 14"), ClosePostAndOpenNext(e))
                      : (debug && console.log("next page 14"), open_next_page())),
              0 == localuse &&
                  (totalLikedCheck == inputsInvites.length &&
                  (0 == clickedForMore || (newFBinviteDesign && loopmaxtry > 1))
                      ? weAreScanningOnlyInvites
                          ? ((weAreScanningOnlyInvites = !1), stopScript())
                          : (debug && console.log("GO TO NEXT Here 15"), ClosePostAndOpenNext(e))
                      : totalLikedCheck == inputsInvites.length
                        ? 5 == ++loopmaxtry || (hadClickedMoreButton > 200 && !newFBinviteDesign)
                            ? weAreScanningOnlyInvites
                                ? ((weAreScanningOnlyInvites = !1), stopScript())
                                : (debug && console.log("GO TO NEXT Here 16"), ClosePostAndOpenNext(e))
                            : setTimeout(function () {
                                  InvitePeople2(e);
                              }, 1500)
                        : ((loopmaxtry = 0),
                          (totalLikedCheck = inputsInvites.length),
                          loadsWithNoInvite++,
                          setTimeout(function () {
                              inviteNext(canSKIPButton, inputsInvites, e);
                          }, 20))),
              (localuse = 0))
            : ((inputsInvites2 = getElem(
                    "#reaction_profile_browser .FriendRequestAdd._51sy, #reaction_profile_browser1 .FriendRequestAdd._51sy, #reaction_profile_browser2 .FriendRequestAdd._51sy, #reaction_profile_browser3 .FriendRequestAdd._51sy, #reaction_profile_browser4 .FriendRequestAdd._51sy, #reaction_profile_browser5 .FriendRequestAdd._51sy, #reaction_profile_browser6 .FriendRequestAdd._51sy, #reaction_profile_browser7 .FriendRequestAdd._51sy, #reaction_profile_browser8 .FriendRequestAdd._51sy, #reaction_profile_browser9 .FriendRequestAdd._51sy",
                    ".hidden_elem #reaction_profile_browser .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser1 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser2 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser3 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser4 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser5 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser6 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser7 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser8 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser9 .FriendRequestAdd._51sy"
                )).length > 4 ||
                    (getElem(
                        getElemWithAddFriendButtons('div[role="dialog"] span:contains("Add Friend")'),
                        getElemWithAddFriendButtons('div[role="article"] span:contains("Add Friend")')
                    ).length > 7 &&
                        (getElem(scrollingNewFBDesignClassDef).length > 0 ||
                            getElem(scrollingNewFBDesignClass).length > 0))) &&
                (3 == runMode ||
                    4 == runMode ||
                    ((1 == runMode || 2 == runMode) &&
                        (inviteDuringShareCheck ||
                            inviteDuringShareCheck2 ||
                            likeSharedComments ||
                            share_put_likes ||
                            (share_put_comments && text_comm_shares.length > 1))))
              ? inviteDuringShareCheck ||
                inviteDuringShareCheck2 ||
                likeSharedComments ||
                share_put_likes ||
                (share_put_comments && text_comm_shares.length > 1) ||
                weAreInvitingFromShared > 0 ||
                weAreScanningOnlyShared
                  ? (debug && console.log("GO TO NEXT Here 17"), ClosePostAndOpenNext(e))
                  : (debug && console.log("next page 15"), open_next_page())
              : tryToLoad < 3
                ? (tryToLoad++,
                  (TimerDelayVar1 = setTimeout(function () {
                      InvitePeople(e);
                  }, fb_timeout_2)))
                : (debug && console.log("GO TO NEXT Here 18"), ClosePostAndOpenNext(e)),
        (hadInvitedButton = 0));
}
function getElemWithAddFriendButtons(e) {
    return (
        (_txtreturn1 = ""),
        fbInviteBtnArray[getCurrentFbLang()] &&
        fbInviteBtnArray[getCurrentFbLang()].addFriend &&
        fbInviteBtnArray[getCurrentFbLang()].addFriend[0]
            ? ((_txtreturn1 = e.replace("Add Friend", fbInviteBtnArray[getCurrentFbLang()].addFriend[0])),
              fbInviteBtnArray[getCurrentFbLang()].addFriend[1] &&
                  (_txtreturn1 =
                      _txtreturn1 + "," + e.replace("Add Friend", fbInviteBtnArray[getCurrentFbLang()].addFriend[1])))
            : (_txtreturn1 = e),
        _txtreturn1
    );
}
function addRandomToTheTimer(e) {
    return Math.floor(Math.random() * (e + 0.01 * e - (e - 0.01 * e) + 1)) + (e - 0.01 * e);
}
function inviteNext(e, t, n) {
    scanByNameNewUI ? inviteNextNewUI(e, t, n) : inviteNext3(e, t, n);
}
function inviteNext3(e, t, n) {
    if (1 == scriptIsRunning)
        if (
            (t.length > 10 &&
                (fmob
                    ? window.scrollTo(0, 61 * e + 90)
                    : Math.floor(101 * Math.random() + 0) > 80 &&
                      (newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0
                          ? (uiMorePagerPrimary++,
                            getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(52 * e - 250))
                          : newFBinviteDesign &&
                            getElem(scrollingNewFBDesignClassDef).length > 0 &&
                            (uiMorePagerPrimary++,
                            getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(52 * e - 250)),
                      updatePopup(),
                      getElem(
                          ".uiScrollableArea .uiScrollableAreaWrap",
                          ".hidden_elem .uiScrollableAreaWrap,._3wpv .uiScrollableAreaWrap"
                      ).scrollTop(65 * e))),
            (clickedForMore = 0),
            e < t.length)
        )
            if ((e > canSKIPButton && (canSKIPButton = e), mtotalInvited + c_c1 >= fb_limit || psInvTot > 299))
                (3 != runMode && 4 != runMode) ||
                !try_after_limit ||
                0 != weAreInvitingFromShared ||
                weAreScanningOnlyShared
                    ? (console.log("Stop, debug: 7"), stopScript())
                    : (debug && console.log("next page 16"), open_next_page());
            else if ((3 == runMode || 4 == runMode) && fb_lim_this_page_counter >= fb_limit_multi)
                0 == fb_limit_multi &&
                    alert(
                        "Check settings -> Daily limit -> Limit for single page. Cause you set it to 0, so we cannot invite no one for this page."
                    ),
                    debug && console.log("next page 17"),
                    open_next_page();
            else if (
                pauseAfterLimit &&
                0 != pauseAfterLimit2 &&
                0 != pauseAfterLimit3 &&
                mtotalInvited % pauseAfterLimit3 == 0 &&
                mtotalInvited != pauseLastNumber
            ) {
                (pauseLastNumber = mtotalInvited), (uiMorePagerPrimary = 0), (likeButtonsProcessed = 0);
                var o = 60 * pauseAfterLimit2;
                (o = addRandomToTheTimer(o)) <= 0 && (o = 30);
                var i = new Date();
                i.setSeconds(i.getSeconds() + o),
                    (o *= 1e3),
                    updatePopup(
                        ".<br>We take a pause (you set in settings) every " +
                            pauseAfterLimit3 +
                            " invites for " +
                            pauseAfterLimit2 +
                            " minutes (+- 1%). Continue at " +
                            ("0" + i.getHours()).slice(-2) +
                            ":" +
                            ("0" + i.getMinutes()).slice(-2) +
                            ":" +
                            ("0" + i.getSeconds()).slice(-2),
                        1
                    ),
                    pauseAfterLimit2 > 30
                        ? (debug && console.log("GO TO NEXT Here 19"),
                          (TimerDelayVar1 = setTimeout(function () {
                              ClosePostAndOpenNext(n);
                          }, o)))
                        : (TimerDelayVar1 = setTimeout(function () {
                              inviteNext3(e, t, n);
                          }, o));
            } else if (
                (!newFBinviteDesign ||
                    (newFBinviteDesign &&
                        $(t[e]).text().length > 0 &&
                        fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text()) &&
                        !fbInviteBtnArray[usedFbLang].inv2.includes($(t[e]).text()) &&
                        !fbInviteBtnArray[usedFbLang].oth.includes($(t[e]).text()))) &&
                (((-1 == t[e].className.indexOf("PageLikeButton") ||
                    (like_other_pages && -1 == t[e].className.indexOf("PageLikedButton"))) &&
                    -1 == t[e].className.indexOf("FriendRequestFriends") &&
                    -1 == t[e].className.indexOf("FriendRequestAdd") &&
                    -1 == t[e].className.indexOf("_59pe") &&
                    (null == t[e].disabled ||
                        (like_other_pages && !t[e].disabled && -1 == t[e].className.indexOf("PageLikedButton"))) &&
                    -1 == t[e].className.indexOf("layerCancel") &&
                    -1 == t[e].className.indexOf("_2347")) ||
                    (fmob && -1 == t[e].className.indexOf("_2347")))
            )
                if (
                    document.documentElement.innerHTML.indexOf(
                        "no more invitations to like this Page can be sent today"
                    ) > -1
                )
                    (limitreached = 1),
                        (3 != runMode && 4 != runMode) ||
                        !try_after_limit ||
                        0 != weAreInvitingFromShared ||
                        weAreScanningOnlyShared
                            ? stopScript(api.i18n.getMessage("facebook_limit_block") + "<br>")
                            : (debug && console.log("next page 18"), open_next_page());
                else if (getElem("._pig").length > 0) {
                    for (found = 0, elsHelpCont = getElem("._pig"), locali = 0; locali < elsHelpCont.length; locali++)
                        elsHelpCont[locali].innerHTML.indexOf("/help/contact/") > -1 &&
                            ((found = 2),
                            (limitreached = 1),
                            (3 != runMode && 4 != runMode) ||
                            !try_after_limit ||
                            0 != weAreInvitingFromShared ||
                            weAreScanningOnlyShared
                                ? stopScript(api.i18n.getMessage("facebook_limit_block") + "<br>")
                                : (debug && console.log("next page 19"), open_next_page()));
                    t[e].getAttribute("ajaxify") &&
                        t[e].getAttribute("ajaxify").indexOf("/follow/follow_profile") > -1 &&
                        (found = 1),
                        0 == found &&
                            skip_angry_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.angry) &&
                            (found = 1),
                        0 == found &&
                            skip_haha_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.haha) &&
                            (found = 1),
                        0 == found &&
                            skip_sad_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.sad) &&
                            (found = 1),
                        0 == found &&
                            skip_like_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.like) &&
                            (found = 1),
                        0 == found &&
                            skip_love_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.love) &&
                            (found = 1),
                        0 == found &&
                            skip_wow_emotion &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.wow) &&
                            (found = 1),
                        0 == found &&
                            accept_ashii_names_only &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            $(t[e]).closest("._5i_q").find("._42ef ._5j0e a") &&
                            $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").length > 0 &&
                            !ascii.test($(t[e]).closest("._5i_q").find("._42ef ._5j0e a").text()) &&
                            ((found = 1), console.log("User ignored due to ascii chars settings!")),
                        0 == found &&
                            namesFilter.length > 0 &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            $(t[e]).closest("._5i_q").find("._42ef ._5j0e a") &&
                            $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").length > 0 &&
                            arrayInStringFound(namesFilter, $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").text()) &&
                            ((found = 1), console.log("User ignored due to settings (names list)!")),
                        0 == found &&
                            skip_no_profile_image &&
                            $(t[e]).closest("._5i_q").length > 0 &&
                            $(t[e]).closest("._5i_q").find("._2ar2 img.img") &&
                            $(t[e]).closest("._5i_q").find("._2ar2 img.img").length > 0 &&
                            $(t[e]).closest("._5i_q").find("._2ar2 img.img").attr("src").length > 0 &&
                            ($(t[e]).closest("._5i_q").find("._2ar2 img.img").attr("src").indexOf("605120512_n.jpg") >
                                -1 ||
                                $(t[e]).closest("._5i_q").find("._2ar2 img.img").attr("src").indexOf("2059008_n.jpg") >
                                    -1) &&
                            ((found = 1), console.log("User ignored because he doesn't have profile image 1!")),
                        0 == found
                            ? (mtotalInvited++,
                              fb_lim_this_page_counter++,
                              t[e].click(),
                              (normal_run_limitNoInvitePosts = -1),
                              clearTimeout(_timeCheckLimit),
                              (_timeCheckLimit = setTimeout(function () {
                                  checkLimitationPopup();
                              }, 2e3)),
                              hadInvitedButton++,
                              (loadsWithNoInvite = 0),
                              e++,
                              (addText = ""),
                              (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                              mtotalInvited % 2 == 0 &&
                                  (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                              mtotalInvited % 40 == 0 &&
                                  mtotalInvited + c_c1 != fb_limit &&
                                  additional_script_pause &&
                                  ((timeout = 3e4), (addText = "\r" + api.i18n.getMessage("paused"))),
                              updatePopup(addText),
                              (TimerDelayVar1 = loopTimerDelay =
                                  setTimeout(function () {
                                      inviteNext3(e, t, n);
                                  }, timeout)))
                            : 1 == found &&
                              (e++,
                              setTimeout(
                                  function () {
                                      inviteNext3(e, t, n);
                                  },
                                  randTwoNumbers(20, 150)
                              ));
                } else
                    t[e].getAttribute("ajaxify") && t[e].getAttribute("ajaxify").indexOf("/follow/follow_profile") > -1
                        ? (e++,
                          setTimeout(
                              function () {
                                  inviteNext3(e, t, n);
                              },
                              randTwoNumbers(20, 150)
                          ))
                        : (0 == (found = 0) &&
                              skip_angry_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.angry) &&
                              (found = 1),
                          0 == found &&
                              skip_haha_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.haha) &&
                              (found = 1),
                          0 == found &&
                              skip_sad_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.sad) &&
                              (found = 1),
                          0 == found &&
                              skip_like_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.like) &&
                              (found = 1),
                          0 == found &&
                              skip_love_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.love) &&
                              (found = 1),
                          0 == found &&
                              skip_wow_emotion &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              checkInArrayIconOldFB($(t[e]).closest("._5i_q"), fbEmotionsBtnArray.oldEmoClass.wow) &&
                              (found = 1),
                          0 == found &&
                              accept_ashii_names_only &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              $(t[e]).closest("._5i_q").find("._42ef ._5j0e a") &&
                              $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").length > 0 &&
                              !ascii.test($(t[e]).closest("._5i_q").find("._42ef ._5j0e a").text()) &&
                              ((found = 1), console.log("User ignored due to ascii chars settings!")),
                          0 == found &&
                              namesFilter.length > 0 &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              $(t[e]).closest("._5i_q").find("._42ef ._5j0e a") &&
                              $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").length > 0 &&
                              arrayInStringFound(
                                  namesFilter,
                                  $(t[e]).closest("._5i_q").find("._42ef ._5j0e a").text()
                              ) &&
                              ((found = 1), console.log("User ignored due to settings (names list)!")),
                          0 == found &&
                              skip_no_profile_image &&
                              $(t[e]).closest("._5i_q").length > 0 &&
                              $(t[e]).closest("._5i_q").find("._2ar2 img.img") &&
                              $(t[e]).closest("._5i_q").find("._2ar2 img.img").length > 0 &&
                              $(t[e]).closest("._5i_q").find("._2ar2 img.img").attr("src").length > 0 &&
                              ($(t[e]).closest("._5i_q").find("._2ar2 img.img").attr("src").indexOf("605120512_n.jpg") >
                                  -1 ||
                                  $(t[e])
                                      .closest("._5i_q")
                                      .find("._2ar2 img.img")
                                      .attr("src")
                                      .indexOf("2059008_n.jpg") > -1) &&
                              ((found = 1), console.log("User ignored because he doesn't have profile image 2!")),
                          0 == found &&
                              (mtotalInvited++,
                              fb_lim_this_page_counter++,
                              t[e].click(),
                              (normal_run_limitNoInvitePosts = -1),
                              clearTimeout(_timeCheckLimit),
                              (_timeCheckLimit = setTimeout(function () {
                                  checkLimitationPopup();
                              }, 2e3)),
                              hadInvitedButton++,
                              (loadsWithNoInvite = 0),
                              (addText = ""),
                              (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                              mtotalInvited % 2 == 0 &&
                                  (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                              mtotalInvited % 40 == 0 &&
                                  mtotalInvited + c_c1 != fb_limit &&
                                  additional_script_pause &&
                                  ((timeout = 3e4), (addText = "\r" + api.i18n.getMessage("paused"))),
                              updatePopup(addText)),
                          e++,
                          (loopTimerDelay = setTimeout(function () {
                              inviteNext3(e, t, n);
                          }, timeout)));
            else
                e++,
                    setTimeout(
                        function () {
                            inviteNext3(e, t, n);
                        },
                        randTwoNumbers(20, 150)
                    );
        else
            getElem(
                ".uiScrollableArea .uiScrollableAreaWrap",
                ".hidden_elem .uiScrollableAreaWrap,._3wpv .uiScrollableAreaWrap"
            ).scrollTop(65 * e),
                setTimeout(
                    function () {
                        InvitePeople2(n);
                    },
                    Math.floor(501 * Math.random()) + 200
                );
}
function noCaptchaOrLimitNewDesign() {
    return !0;
}
function inviteNextNewUI(e, t, n) {
    if (1 == scriptIsRunning)
        if (
            (t.length > 10 &&
                (Math.floor(101 * Math.random() + 0) > 60 ||
                    fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text())) &&
                (newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0
                    ? (uiMorePagerPrimary++, getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(52 * e - 220))
                    : newFBinviteDesign &&
                      getElem(scrollingNewFBDesignClassDef).length > 0 &&
                      (uiMorePagerPrimary++, getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(52 * e - 220)),
                updatePopup()),
            (clickedForMore = 0),
            e < t.length)
        )
            if (
                (e > likeButtonsProcessed && (likeButtonsProcessed = e + 1),
                e > canSKIPButton && (canSKIPButton = e),
                mtotalInvited + c_c1 >= fb_limit || psInvTot > 299)
            )
                (3 != runMode && 4 != runMode) ||
                !try_after_limit ||
                0 != weAreInvitingFromShared ||
                weAreScanningOnlyShared
                    ? (console.log("Stop, debug: 7"), stopScript())
                    : (debug && console.log("next page 20"), open_next_page());
            else if ((3 == runMode || 4 == runMode) && fb_lim_this_page_counter >= fb_limit_multi)
                0 == fb_limit_multi &&
                    alert(
                        "Check settings -> Daily limit -> Limit for single page. Cause you set it to 0, so we cannot invite no one for this page."
                    ),
                    debug && console.log("next page 21"),
                    open_next_page();
            else if (
                pauseAfterLimit &&
                0 != pauseAfterLimit2 &&
                0 != pauseAfterLimit3 &&
                mtotalInvited % pauseAfterLimit3 == 0 &&
                mtotalInvited != pauseLastNumber
            ) {
                (pauseLastNumber = mtotalInvited), (uiMorePagerPrimary = 0), (likeButtonsProcessed = 0);
                var o = 60 * pauseAfterLimit2;
                (o = addRandomToTheTimer(o)) <= 0 && (o = 30);
                var i = new Date();
                i.setSeconds(i.getSeconds() + o),
                    (o *= 1e3),
                    updatePopup(
                        ".<br>We take a pause (you set in settings) every " +
                            pauseAfterLimit3 +
                            " invites for " +
                            pauseAfterLimit2 +
                            " minutes (+- 1%). Continue at " +
                            ("0" + i.getHours()).slice(-2) +
                            ":" +
                            ("0" + i.getMinutes()).slice(-2) +
                            ":" +
                            ("0" + i.getSeconds()).slice(-2),
                        1
                    ),
                    pauseAfterLimit2 > 30
                        ? (debug && console.log("GO TO NEXT Here 20"),
                          (TimerDelayVar1 = setTimeout(function () {
                              ClosePostAndOpenNext(n);
                          }, o)))
                        : (TimerDelayVar1 = setTimeout(function () {
                              inviteNextNewUI(e, t, n);
                          }, o));
            } else
                newFBinviteDesign &&
                $(t[e]).text().length > 0 &&
                fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text()) &&
                !fbInviteBtnArray[usedFbLang].inv2.includes($(t[e]).text()) &&
                !fbInviteBtnArray[usedFbLang].oth.includes($(t[e]).text()) &&
                null == t[e].disabled &&
                (!$(t[e]).attr("aria-disabled") ||
                    ($(t[e]).attr("aria-disabled") && "true" != $(t[e]).attr("aria-disabled")))
                    ? document.documentElement.innerHTML.indexOf(
                          "no more invitations to like this Page can be sent today"
                      ) > -1
                        ? ((limitreached = 1),
                          (3 != runMode && 4 != runMode) ||
                          !try_after_limit ||
                          0 != weAreInvitingFromShared ||
                          weAreScanningOnlyShared
                              ? stopScript(api.i18n.getMessage("facebook_limit_block") + "<br>")
                              : (debug && console.log("next page 22"), open_next_page()))
                        : noCaptchaOrLimitNewDesign() &&
                          (0 == (found = 0) &&
                              skip_angry_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.angry
                              ) &&
                              (found = 1),
                          0 == found &&
                              skip_haha_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.haha
                              ) &&
                              (found = 1),
                          0 == found &&
                              skip_sad_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.sad
                              ) &&
                              (found = 1),
                          0 == found &&
                              skip_like_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.like
                              ) &&
                              (found = 1),
                          0 == found &&
                              skip_love_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.love
                              ) &&
                              (found = 1),
                          0 == found &&
                              skip_wow_emotion &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("img").attr("src")
                                  .length > 0 &&
                              checkInArrayIconNewFB(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("img")
                                      .attr("src"),
                                  fbEmotionsBtnArray.newEmoLink.wow
                              ) &&
                              (found = 1),
                          0 == found &&
                              accept_ashii_names_only &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e])
                                  .closest('div[data-visualcompletion="ignore-dynamic"]')
                                  .find("a")
                                  .filter(function () {
                                      return $(this).attr("aria-label");
                                  }).length > 0 &&
                              !ascii.test(
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("a")
                                      .filter(function () {
                                          return $(this).attr("aria-label");
                                      })
                                      .attr("aria-label")
                              ) &&
                              ((found = 1), console.log("User ignored due to ascii chars settings!")),
                          0 == found &&
                              namesFilter.length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e])
                                  .closest('div[data-visualcompletion="ignore-dynamic"]')
                                  .find("a")
                                  .filter(function () {
                                      return $(this).attr("aria-label");
                                  }).length > 0 &&
                              arrayInStringFound(
                                  namesFilter,
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("a")
                                      .filter(function () {
                                          return $(this).attr("aria-label");
                                      })
                                      .attr("aria-label")
                              ) &&
                              ((found = 1), console.log("User ignored due to settings (names list)!")),
                          0 == found &&
                              skip_no_profile_image &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("a image") &&
                              $(t[e]).closest('div[data-visualcompletion="ignore-dynamic"]').find("a image").length >
                                  0 &&
                              $(t[e])
                                  .closest('div[data-visualcompletion="ignore-dynamic"]')
                                  .find("a image")
                                  .attr("xlink:href").length > 0 &&
                              ($(t[e])
                                  .closest('div[data-visualcompletion="ignore-dynamic"]')
                                  .find("a image")
                                  .attr("xlink:href")
                                  .indexOf("605120512_n.jpg") > -1 ||
                                  $(t[e])
                                      .closest('div[data-visualcompletion="ignore-dynamic"]')
                                      .find("a image")
                                      .attr("xlink:href")
                                      .indexOf("2059008_n.jpg") > -1) &&
                              ((found = 1), console.log("User ignored because he doesn't have profile image 3!")),
                          0 == found
                              ? (t[e].click(),
                                clearTimeout(_timeCheckLimit),
                                (_timeCheckLimit = setTimeout(function () {
                                    checkLimitationPopup();
                                }, 2e3)),
                                (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                                (loopTimerDelay = setTimeout(function () {
                                    !fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text()) &&
                                    (fbInviteBtnArray[usedFbLang].inv2.includes($(t[e]).text()) ||
                                        ($(t[e]).attr("aria-disabled") && "true" != $(t[e]).attr("aria-disabled")))
                                        ? (mtotalInvited++,
                                          fb_lim_this_page_counter++,
                                          (normal_run_limitNoInvitePosts = -1),
                                          hadInvitedButton++,
                                          (loadsWithNoInvite = 0),
                                          e++,
                                          (timeout -= 2e3),
                                          (addText = ""),
                                          mtotalInvited % 40 == 0 &&
                                              mtotalInvited + c_c1 != fb_limit &&
                                              additional_script_pause &&
                                              ((timeout = 3e4), (addText = "\r" + api.i18n.getMessage("paused"))),
                                          (loopTimerDelay =
                                              timeout < 10
                                                  ? setTimeout(
                                                        function () {
                                                            inviteNextNewUI(e, t, n);
                                                        },
                                                        randTwoNumbers(10, 120)
                                                    )
                                                  : setTimeout(function () {
                                                        inviteNextNewUI(e, t, n);
                                                    }, timeout)),
                                          updatePopup(addText))
                                        : 1 == ++inviteFailed
                                          ? (loopTimerDelay = setTimeout(function () {
                                                inviteNextNewUI(e, t, n);
                                            }, 1e4))
                                          : 2 == inviteFailed
                                            ? (e++,
                                              (loopTimerDelay = setTimeout(function () {
                                                  inviteNextNewUI(e, t, n);
                                              }, 5e3)))
                                            : $(t[e]).is(":visible")
                                              ? stopScript(
                                                    "After 3 attempts to press 'INVITE' button it wasn't accepted by the server. Maybe you reach the daily limit or has a temporary limitation or there is some lag. Try to click manually or wait 24h. If you can invite manually - contact us via email (take a full screen of this page and copy the version of the script.<br>"
                                                )
                                              : (debug && console.log("GO TO NEXT Here 21"),
                                                setTimeout(function () {
                                                    ClosePostAndOpenNext(n);
                                                }, 20));
                                }, 2e3)))
                              : 1 == found &&
                                (e++,
                                setTimeout(
                                    function () {
                                        inviteNextNewUI(e, t, n);
                                    },
                                    randTwoNumbers(20, 150)
                                )))
                    : (e++,
                      setTimeout(
                          function () {
                              inviteNextNewUI(e, t, n);
                          },
                          randTwoNumbers(20, 150)
                      ));
        else
            newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0
                ? (uiMorePagerPrimary++,
                  updatePopup(),
                  getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(52 * e - 220))
                : newFBinviteDesign &&
                  getElem(scrollingNewFBDesignClassDef).length > 0 &&
                  (uiMorePagerPrimary++,
                  updatePopup(),
                  getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(52 * e - 220)),
                setTimeout(
                    function () {
                        InvitePeople2(n);
                    },
                    Math.floor(501 * Math.random()) + 200
                );
}
function updatePopup(e, t) {
    1 == scriptIsRunning &&
        (void 0 === e && (e = ""),
        uiMorePagerPrimary > 0 &&
            (e = newFBinviteDesign
                ? scanByNameNewUI
                    ? scan_reactions_tabs
                        ? ". Reactions scanned (separate list): " + likeButtonsProcessed + e
                        : ". Reactions scanned: " + likeButtonsProcessed + e
                    : ". List was scrolled: " + uiMorePagerPrimary + e
                : ". ’See more’ button clicked: " + uiMorePagerPrimary + e),
        antiSpamCommentSkipped > 0 && (e = ". NOT commented (antispam): " + antiSpamCommentSkipped + e),
        (total_shared_posts_liked > 0 || total_shared_posts_commented > 0) &&
            (e =
                ". Shared posts/comments liked: " +
                total_shared_posts_liked +
                ". Shared posts commented: " +
                total_shared_posts_commented +
                e),
        (PagesCheckedText = ""),
        (3 == runMode || 4 == runMode) &&
            nextPage > 0 &&
            (multi_random_order
                ? (PagesCheckedText = ". Page: " + nextPage + " (random order)")
                : ((PagesCheckedText = ". " + api.i18n.getMessage("pages_checked") + " " + nextPage + " / "),
                  (PagesCheckedText += 3 == runMode ? urllist1.length : urllist2.length))),
        (loop_PostsListArray.length > 0 && totalPostsProcessed > loop_PostsListArray.length && t) ||
        !publishingToolInv ||
        photosTabRunAll ||
        InsightsTabInv ||
        isNotificationTab
            ? (document.getElementById("invite-all-count-sw").innerHTML = mtotalInvited + PagesCheckedText + e)
            : window.location.href.indexOf("/creatorstudio") > 0
              ? (document.getElementById("invite-all-count-sw").innerHTML =
                    (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                        ? mtotalInvited
                        : '<span style="color:red">DISABLED in options</span>') +
                    ". Scrolls in Creator Studio: " +
                    (publishingTabNumber - 1) +
                    PagesCheckedText +
                    e)
              : window.location.href.indexOf("/content_management") > 0
                ? (document.getElementById("invite-all-count-sw").innerHTML =
                      (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                          ? mtotalInvited
                          : '<span style="color:red">DISABLED in options</span>') +
                      ". Scrolls in Content Management: " +
                      (publishingTabNumber - 1) +
                      PagesCheckedText +
                      e)
                : window.location.href.indexOf("/latest/posts") > 0
                  ? (document.getElementById("invite-all-count-sw").innerHTML =
                        (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                            ? mtotalInvited
                            : '<span style="color:red">DISABLED in options</span>') +
                        ". Scrolls in Business Suite: " +
                        (publishingTabNumber - 1) +
                        PagesCheckedText +
                        e)
                  : window.location.href.indexOf("/publishing_tools") > 0 &&
                      getElem(
                          "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                          ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                      ).length > 0
                    ? (document.getElementById("invite-all-count-sw").innerHTML =
                          (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                              ? mtotalInvited
                              : '<span style="color:red">DISABLED in options</span>') +
                          ". Scrolls in new Publishing Tools tab: " +
                          (publishingTabNumber - 1) +
                          PagesCheckedText +
                          e)
                    : (document.getElementById("invite-all-count-sw").innerHTML =
                          publishingToolTotPost > 0
                              ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                    ? mtotalInvited
                                    : '<span style="color:red">DISABLED in options</span>') +
                                " (" +
                                publishingToolTotPost +
                                "). " +
                                api.i18n.getMessage("publ_check_tab") +
                                " " +
                                publishingTabNumber +
                                PagesCheckedText +
                                e
                              : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                    ? mtotalInvited
                                    : '<span style="color:red">DISABLED in options</span>') +
                                ". " +
                                api.i18n.getMessage("publ_check_tab") +
                                " " +
                                publishingTabNumber +
                                PagesCheckedText +
                                e));
}
function createPopup() {
    var e = "";
    "fp" != psscr && Math.floor(101 * Math.random() + 0);
    var t = "";
    (t =
        "fp" == psscr || Math.floor(101 * Math.random() + 0) > 40
            ? '<span style="font-size:0.7em!important;">' + api.i18n.getMessage("switch_tab_info") + "</span><br>"
            : '<div id="running-info"><br>' +
              e +
              '</div><span style="font-size:0.7em!important;">' +
              api.i18n.getMessage("switch_tab_info") +
              "</span><br>"),
        TotalInvited > 100 && (t += '<div id="fbe-showlessingo" class="btn-div"></div>'),
        showLessInfoDate > 0 &&
            Math.floor(Date.now() / 1e3) - showLessInfoDate < 604800 &&
            (t = '<span style="font-size:0.7em!important;">' + api.i18n.getMessage("switch_tab_info") + "</span><br>"),
        (elementUpd = document.getElementsByTagName("head")[0]);
    var n = document.getElementsByTagName("body")[0],
        o = document.createElement("div");
    if (
        (o.setAttribute("id", "add-all-div-sw"),
        o.setAttribute(
            "style",
            'text-align:center;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;padding:10px;width:80%;border:2px solid #ccc;background-color:#fff;position:fixed;margin:0 auto;z-index:999;top: 5px;left:10%;font-size:2em;'
        ),
        (o.innerHTML =
            "<link rel='stylesheet' type='text/css' href='" +
            api.runtime.getURL("content.css") +
            "' charset='utf-8'><span style='color:blue'>" +
            runModetext +
            '</span><br>Invited (this post): <span id="invite-all-count-sw">' +
            mtotalInvited +
            "</span>.<br>" +
            t +
            '<div id="fbe-stopit" class="btn-div"></div><div id="fbe-next-post"></div>'),
        n.appendChild(o),
        (popup = o),
        $("#fbe-showlessingo").length > 0)
    ) {
        var i = $('<div class="fbe-btn"><span class="fbe-btn-text">Show only main info</span></div>').click(
            showLessInfoRunning
        );
        jQuery("#fbe-showlessingo").html(i);
    }
    i = $('<div class="fbe-btn"><span class="fbe-btn-text">STOP IT</span></div>').click(stopScript);
    if ((jQuery("#fbe-stopit").html(i), 0 == getElem("#invite-shared-elem-comment").length)) {
        var r = document.createElement("div");
        r.setAttribute("id", "invite-shared-elem-comment"), r.setAttribute("style", "display:none;"), n.appendChild(r);
    }
    elementUpdCommentText = document.getElementById("invite-shared-elem-comment");
}
function showLessInfoRunning() {
    api.storage.sync.set({ showLessInfoDate: Math.floor(Date.now() / 1e3).toString() }, function () {
        $("#fbe-showlessingo").hide(), $("#running-info").hide();
    });
}
function destroyPopup() {
    popup && popup.parentElement && popup.parentElement.removeChild(popup), (scriptIsRunning = 0);
}
function stopScript(e) {
    goBackToMainTab(1);
}
function goToNextPost() {
    (sharedPostIsCheckingNow = 1), debug && console.log("GO TO NEXT Here 22"), ClosePostAndOpenNext(-1);
}
function checkLimitationPopup() {
    if (1 == scriptIsRunning) {
        if (getElem("._pig").length > 0 && getElem("._4t2a,.uiLayer").is(":visible")) {
            _elsHelpCont = getElem("._pig");
            for (var e = 0; e < _elsHelpCont.length; e++)
                _elsHelpCont[e].innerHTML.indexOf("/help/contact/") > -1 &&
                    ((3 != runMode && 4 != runMode) || !try_after_limit
                        ? ((scriptIsRunning = 0),
                          console.log("LIMIT REACHED error shown!"),
                          stopScript(api.i18n.getMessage("facebook_limit_block") + "<br>", !0))
                        : ((scriptIsRunning = 0), debug && console.log("next page 23"), open_next_page()));
        } else
            getElem('div[role="dialog"]').length > 0 &&
                getElem('div[role="dialog"]').text() &&
                getElem('div[role="dialog"]').text().length > 1 &&
                (getElem('div[role="dialog"]').text().indexOf("misusing this feature by going too fast") > 0 ||
                    getElem('div[role="dialog"]').text().indexOf("misbruikt omdat je de functie te vaak gebruikt") >
                        0) &&
                ((3 != runMode && 4 != runMode) || !try_after_limit
                    ? ((scriptIsRunning = 0),
                      console.log("LIMIT REACHED error shown!"),
                      stopScript(api.i18n.getMessage("inv_limit_error"), !0))
                    : ((scriptIsRunning = 0), debug && console.log("next page 23"), open_next_page()));
        checkNewLimitPopupInClassicDesign() &&
            1 == scriptIsRunning &&
            ((3 != runMode && 4 != runMode) || !try_after_limit
                ? ((scriptIsRunning = 0),
                  console.log("LIMIT REACHED error shown!"),
                  stopScript(api.i18n.getMessage("facebook_limit_block") + "<br>", !0))
                : ((scriptIsRunning = 0), debug && console.log("next page 24"), open_next_page()));
    }
}
function checkLimitationPopup2() {
    if (1 == scriptIsRunning) {
        if (getElem("._pig").length > 0 && getElem("._4t2a,.uiLayer").is(":visible")) {
            _elsHelpCont = getElem("._pig");
            for (var e = 0; e < _elsHelpCont.length; e++)
                if (_elsHelpCont[e].innerHTML.indexOf("/help/contact/") > -1) return !0;
        }
        if (checkNewLimitPopupInClassicDesign()) return !0;
    }
    return !1;
}
function checkNewLimitPopupInClassicDesign() {
    return !!(
        getElem("._4t2a ._61mx .cqf1kptm").length > 0 &&
        getElem("._4t2a ._61mx ._4iyi button").length > 1 &&
        getElem("._4t2a ._61mx .cqf1kptm").is(":visible")
    );
}
function randTwoNumbers(e, t) {
    return e == t
        ? e
        : e > t
          ? Math.floor(Math.random() * (e - t + 1)) + t
          : Math.floor(Math.random() * (t - e + 1)) + e;
}
function inviteWindowInNewUIOpen() {
    if (isThisNewFbDesign2020()) {
        if (getElem(".cypi58rs .oajrlxb2", ".poy2od1o .cypi58rs .oajrlxb2").length > 0) return !0;
        if (
            getElem("div").filter(function () {
                return "Reactions" == $(this).attr("aria-label");
            }).length > 0 &&
            getElem("div")
                .filter(function () {
                    return "Reactions" == $(this).attr("aria-label");
                })
                .find("div")
                .filter(function () {
                    return "Close" == $(this).attr("aria-label");
                }).length > 0
        )
            return !0;
    }
    return !1;
}
function closeInviteWindowInNewUI() {
    isThisNewFbDesign2020() &&
        (1 ==
        getNewUIMainScrollOnly('div[role="dialog"] .cypi58rs .thwo4zme').not(
            'div.fbNubFlyout[role="dialog"] div,.uiLayer._31e div[role="dialog"] div'
        ).length
            ? getNewUIMainScrollOnly('div[role="dialog"] .cypi58rs .thwo4zme')
                  .not('div.fbNubFlyout[role="dialog"] div,.uiLayer._31e div[role="dialog"] div')[0]
                  .click()
            : getElem(".cypi58rs .oajrlxb2", ".poy2od1o .cypi58rs .oajrlxb2").length > 0
              ? getElem(".cypi58rs .oajrlxb2", ".poy2od1o .cypi58rs .oajrlxb2")[0].click()
              : getElem("div").filter(function () {
                    return "Reactions" == $(this).attr("aria-label");
                }).length > 0 &&
                getElem("div")
                    .filter(function () {
                        return "Reactions" == $(this).attr("aria-label");
                    })
                    .find("div")
                    .filter(function () {
                        return "Close" == $(this).attr("aria-label");
                    }).length > 0 &&
                getElem("div")
                    .filter(function () {
                        return "Reactions" == $(this).attr("aria-label");
                    })
                    .find("div")
                    .filter(function () {
                        return "Close" == $(this).attr("aria-label");
                    })[0]
                    .click());
}
function getNewUIMainScrollOnly(e) {
    return getElem(e)
        .not('div.fbNubFlyout[role="dialog"] div,.uiLayer._31e div[role="dialog"] div')
        .filter(function () {
            var e = !0;
            return (
                $(this)
                    .parents("div")
                    .each(function () {
                        $(this).attr("aria-hidden") && "true" == $(this).attr("aria-hidden") && (e = !1);
                    }),
                e
            );
        });
}
function getScrollElemNewFb(e) {
    return getNewUIMainScrollOnly(e).length > 0 ? getNewUIMainScrollOnly(e) : getElem(e);
}
function goBackToMainTab(e) {
    api.runtime.sendMessage(
        {
            type: "separateScanFinished",
            inv: mtotalInvited,
            lik: total_shared_posts_liked,
            com: total_shared_posts_commented,
            stop: e,
        },
        function (e) {}
    );
}
listenerInit && FileAlreadyLoadedThisIsNOTerror(),
    (listenerInit = !0),
    api.runtime.onMessage.addListener(function (e, t) {
        "weNeedToStop" == e.type && goBackToMainTab(1);
    });