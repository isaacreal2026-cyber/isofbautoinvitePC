var scriptIsRunning,
    iconClicked,
    iconClicked2,
    commentSenderLoaded,
    api = "undefined" != typeof chrome ? chrome : browser,
    debug = !1,
    debug_option = !1,
    userClickedOnIcon = !1,
    startTime = null;
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
var server_version = 1,
    server_warning_text = "",
    server_warning_version = 1,
    server_main_invite_scroll =
        ',.xb57i2i.xkhd6sd,.x1e4zzel.x1tbbn4q.x1y1aw1k,div[role="dialog"] .html-div>.x1tbbn4q.x1y1aw1k',
    server_main_like_to_click =
        ',div[role="button"].x1heor9g.x1o1ewxj span.x1e558r4,div[role="button"].x1heor9g span.x135b78x:not([aria-hidden="true"] span.x135b78x)',
    server_main_like_to_clickIgnor =
        ',div[aria-label^="Comment by"] div[role="button"].x1heor9g span.x1e558r4, div[aria-label^="User\'s GIF comment"] div[role="button"].x1heor9g.x1heor9g span.x1e558r4,a[aria-label="Click to view attachment"] span.x1e558r4, span:contains("Learn more"), span:contains("Shop now")',
    server_new_like_block = ',.x1n2onr6:has(span[role="toolbar"]:has(img.x16dsc37)):last',
    server_new_like_total_number =
        ',div[role="button"].x1heor9g.x1o1ewxj span.x1e558r4,div[role="button"].x1heor9g span.x135b78x:not([aria-hidden="true"] span.x135b78x)',
    server_new_like_total_numberIgnor = ',span:contains("Shop now")',
    server_new_like_reaction = ',div[role="button"][tabindex="0"]:has(img.x16dsc37)',
    server_main_close_invite_window =
        ',div[role="dialog"] .x1d52u69>div[role="button"],div[role="dialog"] .xyqm7xq>div[role="button"]',
    server_pd_posts =
        ',table[role="grid"] tr[role="row"] .x1iyjqo2>div[role="button"],table[role="grid"] tr[role="row"] .x1iyjqo2>a[role="link"]',
    server_bs_posts =
        ',table tr td[aria-colindex="2"]:not(:has(img[alt="Instagram"])) , table tr td[aria-colindex="2"]:has(img[alt="Instagram"]):has(img[alt="Facebook"])',
    server_bs_close_post =
        ',div[role="button"][aria-label="back"],div[role="button"]:has(svg path[d^="M6.84"]),div[role="button"]:has(i[style*="background-position: 0px -275px"][style*="width: 20px"][style*="height: 20px"]),div[role="button"]:has(:contains("Close")),div[role="button"]:has(:contains("Indietro"))',
    server_bs_close_postF1 =
        ',div[role="button"]:has(svg path[d^="M6.84"]),div[role="button"]:has(i[style*="background-position: 0px -275px"][style*="width: 20px"][style*="height: 20px"]),div[role="navigation"] div[role="button"][aria-label],div[role="navigation"] div[role="button"]',
    server_bs_close_postF2 =
        "back|close|indietro|chiudi|volver|cerrar|retour|fermer|zurück|schließen|voltar|fechar|terug|sluiten|tilbage|luk|powrót|zamknij|назад|закрыть|закрити|閉じる|戻る|返回|关闭|돌아가기|닫기|geri|kapat|tilbake|lukk|tillbaka|stäng|takaisin|sulje|vissza|bezár|πίσω|späť|κλείσιμο|عودة|إغلاق",
    server_bs_scroll_post = ",.x5yr21d .x1sii68,.x5yr21d .x78zum5 .x1ovqmqt>.x9f619.x1odjw0f",
    server_bs_scroll_list = ',.x5yr21d table[role="grid"],.uiScrollableAreaWrap.scrollable:first-of-type',
    server_bs_feed_grid1 =
        ",.x1q85c4o.x1kgee58.x78zum5.xdt5ytf.x6s0dn4.xyamay9.x1pi30zi.x1l90r2v.x1swvt13>div,.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z",
    server_bs_feed_grid2 = ",.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z,.x1n2onr6.x1ja2u2z",
    server_bs_page_name = ',div[data-pagelet="BizKitPresenceSelector"] .xrmyp2 .xmi5d70',
    server_bs_second_posts = ',div[role="gridcell"],div[role="cell"]',
    server_bs_second_posts_filter = ",.x1emribx",
    server_bs_shared_posts_btn =
        ',.dkzmklf5 div[role="button"] span.gvxzyvdx,.x1n2onr6 .x9f619.xykv574 div[role="button"]:last(),.x1n2onr6 .x9f619.x1icxu4v div[role="button"]:has(i[style*="width: 16px"][style*="height: 16px"]):not(ul div[role="button"]):last()',
    server_bs_view_on_fb_item = ',.x1kxxb1g ul.xavht8x .x1n2onr6 div[role="button"]',
    server_home_posts = ",div[aria-posinset]",
    server_photos_list =
        ',a.x1i10hfl>img,.x1iyjqo2 .x1bawvfr .xjkvuk6 div[role="img"],.x1iyjqo2>.x1bawvfr>div[role="list"]>div.xnpuxes[role="listitem"] div[role="none"],.x1iyjqo2>.x1bawvfr>div[role="list"]>div.xnpuxes[role="listitem"] div[role="button"],.x1y1aw1k>.x14vqqas.x1bawvfr>div[role="list"]>div.xnpuxes[role="listitem"] div[role="none"]',
    server_photos_listNOT = ',.x1s85apg .x1iyjqo2 .x1bawvfr .xjkvuk6 div[role="img"]',
    server_photos_close_post =
        ',.x9f619>.x3nfvp2.x193iq5w.xxymvpz>.x1i10hfl.xjqpnuy[role="button"],.x9f619>.x4txaam>span.xdj266r>.x1i10hfl.xjqpnuy[role="button"]',
    server_load_more_photos_posts = ",.x78zum5>.x9f619>div.xh8yej3.xw2csxc",
    server_inv_friends_list =
        ',div[role="dialog"] .x78zum5 div[role="checkbox"],div[role="dialog"] .x1n2onr6>a[role="link"]:not([aria-disabled="true"]) span.x193iq5w.xo1l8bm,.x2atdfe.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf .x1n2onr6>div[role="button"]:not([aria-disabled="true"])',
    server_inv_friends_scoll =
        ',div[role="dialog"] .x1y1aw1k>.xb57i2i,.x2atdfe.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf',
    server_inbox_elements = ",._arne._5_n1,._at41._5_n1",
    server_inbox_addit_click = ",BREAKIT.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft",
    server_inbox_close_addit_elem = ",.QQwasNotWorking",
    server_inbox_scroll_list =
        ',div[data-pagelet="BizP13NInboxCommentListView"]>div>div,div.x78zum5.xdt5ytf.x5yr21d div[style*="overflow: auto"][style*="will-change: transform"],div[data-pagelet="GenericBizInboxThreadListViewBody"] div[style*="overflow: auto"]',
    server_notif_scroll = ',div[role="navigation"]>.x2bj2ny>.xb57i2i',
    server_notif_list = ',div[role="navigation"] .x1n2onr6[role="row"]:visible',
    server_notif_ignore_list =
        "boosted_auto_open,/manage_jobs/,notif_t=scheduled_post_published,notif_t=page_individual_recommendation,notif_t=aymt_page_post_reminder,boosted_auto_open,aymt_boost_post_with_ads_intent_tip,_tip_notif,aymt_post_engagement_hot_generic_tip_notif,aymt_simplified_make_page_post,/boostpost,aymt_boost_post,notif_t=page_group_post,/settings/,redirect_biz_inbox_reminder,redirect_biz_,notif_t=page_invite_accept_admin,notif_t=group_activity,notif_t=aymt_post_engagement_hot,follower_invite_accept,public_figures_to,notif_t=page_share,notif_t=page_follow,follow_profile,/groups/,notif_t=page_tag,/follower,tab=inbox,/inbox/,tab=people_and_other_pages,/creatorstudio/,/reel/,/reels/,notif_t=comment_mention,notif_t=friend_confirmed,notif_t=nf_status_story,notif_t=close_friend_activity,notif_t=follower_invite,notif_t=fan_profile",
    server_notif_ignore_listArr = Array();
server_notif_ignore_listArr = server_notif_ignore_list.split(",");
var server_shared_items = ',div[role="dialog"] .x1yztbdb:not([class*=" "]),div[role="dialog"] .x1yztbdb.xyamay9',
    server_shared_show_attachment =
        ',.x1larqbn.xurb0ha.x1sxyh0 div[role="button"],.x1larqbn.xf159sx.xmzvs34 div[role="button"]',
    server_shared_author = ",h3 .xt0psk2 a",
    server_shared_comments = ',.x1jx94hy>ul>li,.xdj266r>ul>li,.x1gslohp .x169t7cy.x19f6ikt>div[role="article"]',
    server_shared_comment_author = ',a[role="link"] .x3nfvp2',
    firstRunOnlyTemp = !1,
    scanOnlyOnePostPerPage2025 = !1,
    specialElabForFeedAndGrid = !1,
    specialElabForHomePage2026 = !1,
    scanByNameNewUI = !1,
    inviteFailed = 0,
    likeButtonsProcessed = 0,
    stringForjQuerySearch = "",
    stringForjQuerySearch2 = "",
    currentFbLang = "",
    usedFbLang = "",
    newFBinviteDesign = !1,
    scrollingNewFBDesignClassDef = ".QQQQTest" + server_main_invite_scroll,
    scrollingNewFBDesignClass = ".QQQQTest" + server_main_invite_scroll,
    checkInsideScrolledWindow = "",
    searchInAllLangArray1 = Array(),
    searchInAllLangArray2 = Array(),
    tempreturnNumber = 0,
    tempreturnNumber2 = 0,
    newFBinviteDesignFromSourceCode = !1,
    weScanPhotosTab = !1,
    multiPagesAct = !0,
    heighOfLikesDivBtn = 56;
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
var onceAlertLangNotSupp = !0;
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
                1 == getElem("body.Locale_zh_HK").length && (currentFbLang = "zh-Hanh")),
            currentFbLang.length > 2 && currentFbLang.startsWith("en") && (currentFbLang = "en"),
            ("" != currentFbLang && -1 != fbInviteBtnArrayLang.indexOf(currentFbLang)) ||
                (console.log(
                    "We didn't find the way to detect language correctly, the current lang passed by Fb is: " +
                        currentFbLang
                ),
                "" != currentFbLang &&
                    -1 == fbInviteBtnArrayLang.indexOf(currentFbLang) &&
                    onceAlertLangNotSupp &&
                    ((onceAlertLangNotSupp = !1),
                    alert(
                        api.i18n
                            .getMessage("unsupported_language_alert")
                            .replace(/%s/g, ((e = [currentFbLang]), () => e.shift()))
                    )),
                (currentFbLang = "en"))),
        currentFbLang
    );
    var e;
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
        "sk",
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
        "ca",
        "bs"
    ),
    fbInviteBtnArray = {
        en: {
            lan: "en",
            inv: ["Invite", "Invitar"],
            inv2: ["Invited", "Invitado", "Invitado(a)"],
            oth: [
                "Like",
                "Liked",
                "Follow",
                "Unfollow",
                "Me gusta",
                "Te gusta",
                "Seguir",
                "Add friend",
                "Add Friend",
                "Message",
            ],
            comment: ["Comment"],
            likeButton: ["Like", "Me gusta"],
            addFriend: ["Add Friend", "Agregar", "Añadir"],
            leaveAComment: ["Leave a comment"],
        },
        it: {
            lan: "it",
            inv: ["Invita"],
            inv2: ["Invitato/a", "Utente invitato"],
            oth: ["Mi piace", "Ti piace", "Segui", "Gli/le piace", "Segui già", "Messaggio"],
            comment: ["Commenta"],
            likeButton: ["Mi piace"],
            addFriend: ["Aggiungi", "Aggiungi agli amici"],
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
            oth: ["Like", "Gefällt dir", "Abonnieren", "Nachricht", "Gefolgt"],
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
            oth: ["Me gusta", "Te gusta", "Seguir", "Siguiendo"],
            comment: ["Comentar"],
            likeButton: ["Me gusta"],
            addFriend: ["Agregar", "Añadir", "Agregar a amigos"],
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
            oth: ["J’aime", "J’aime déjà", "S’abonner", "Message", "Suivi(e)"],
            comment: ["Commenter"],
            likeButton: ["J’aime"],
            addFriend: ["Ajouter", "Ajouter ami(e)"],
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
            inv: ["Ajánlás", "Meghívás"],
            inv2: ["Meghívva", "Ajánlás elküldve", "Követed"],
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
            oth: ["Lubię to!", "Polubiono", "Wiadomość", "Obserwowanie"],
            comment: ["Komentarz"],
            likeButton: ["Like"],
            addFriend: ["Dodaj", "Dodaj znajomego"],
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
            inv2: ["Invited", "Má pozvanie"],
            oth: ["Páči sa mi to", "Páčilo sa mi to", "Všeč mi je", "Sledované"],
            comment: ["Komentovať"],
            likeButton: ["Páči sa mi to"],
            addFriend: ["Pridať priateľa", "Dodaj prijatelja"],
            leaveAComment: ["Pridať komentár"],
        },
        sl: {
            lan: "sl",
            inv: ["Pozvať", "Povabi"],
            inv2: ["Invited", "Má pozvanie"],
            oth: ["Páči sa mi to", "Páčilo sa mi to", "Všeč mi je", "Sledované"],
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
            oth: ["Beğen", "Beğendi", "Takiptesin"],
            comment: ["Yorum Yap"],
            likeButton: ["Beğen"],
            addFriend: ["Arkadaşı Ekle"],
            leaveAComment: ["Yorum bırak"],
        },
        cs: {
            lan: "cs",
            inv: ["Pozvat"],
            inv2: ["Pozván(a)"],
            oth: ["To se mi líbí", "Tohle se mi líbí", "Sleduji"],
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
            inv: ["Поканете", "Invite"],
            inv2: ["Поканен/а", "Invited"],
            oth: ["Liked", "Харесва ми", "Харесване", "Последвано"],
            comment: ["Коментар"],
            likeButton: ["Харесване"],
            addFriend: ["Добавяне"],
            leaveAComment: ["Оставете коментар", "Напишете коментар"],
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
            oth: ["Нравится", "Подписаться", "Вы подписаны"],
            comment: ["Комментировать"],
            likeButton: ["Нравится"],
            addFriend: ["Добавить", "Добавить в друзья"],
            leaveAComment: ["Оставьте комментарий"],
        },
        uk: {
            lan: "uk",
            inv: ["Запросити"],
            inv2: ["Invited", "Запрошено", "Запрошення надіслано"],
            oth: ["Liked", "Подобається", "Відстежується", "Вы подписаны"],
            comment: ["Коментувати"],
            likeButton: ["Подобається"],
            addFriend: ["Додати друга", "Add friend", "Добавить в друзья"],
            leaveAComment: ["Залишити коментар"],
        },
        he: {
            lan: "he",
            inv: ["הזמן", "הזמיני"],
            inv2: ["הוזמן"],
            oth: ["לייק", "סימנת בלייק", "עוקבת"],
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
        bs: {
            lan: "bs",
            inv: ["Pozovi"],
            inv2: ["Invited", "Pozvani"],
            oth: ["Liked", "Prati se"],
            comment: ["Komentar"],
            likeButton: ["Sviđa mi se"],
            addFriend: ["Dodaj u prijatelje"],
            leaveAComment: ["Napišite komentar..."],
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
                "6gazZZUYm_Q",
                "dOJFaVZihS_",
                "yBFftXKeKzJM",
                "fqb8rfFxpfX",
                "tc5IAx58Ipa",
                "L3l7S5zaUNIcxYJ4uUPCNDlXP",
                "lKwYrzcNLupv27",
                "1635855486666999",
                "GFDh8UtV4G0",
                "ErkDga6gazZZUYm_Q",
                "2BH99EvwFs",
            ],
            love: [
                "Y-MJn5E",
                "emi3_1IpGVz",
                "dsA9IgAg",
                "r4h1SXzlm0B",
                "MB1XWOdQjV0",
                "hCqkOc3spA_jeOHZBc-iWlwewzM",
                "jmJufFtJoVJCUklu",
                "1678524932434102",
                "t-WER1u_o",
                "E-K5dxR8Y-MJn5E",
                "XK4mDUQ8",
            ],
            haha: [
                "eVRf40MOA",
                "yzxDz4ZUD49",
                "BQNu75NwcYw",
                "yMAXL0cdq9q",
                "bkP6GqAFgZ_",
                "qaYFNgTSXlvM4nCbmBfRzzGxNu8",
                "ZXzVvFJ_KvvB4",
                "115940658764963",
                "RAJ-TZJVy3KA",
                "uXmYDseOeVRf40MOA",
                "gJNpYtw",
            ],
            wow: [
                "KClEYB7Msj7Q",
                "qZOYbiV8BHS",
                "wGvv8eQXPc",
                "7-3YmWpFyGJ",
                "tHO3j6Ngeyx",
                "FqjvZsZw6gGAhzX1fLhIoNydmCt",
                "4BTtfpxJ2KfylUgpq",
                "478547315650144",
                "eyN33CKJn2OaNBc",
                "62LKClEYB7Msj7Q",
                "UeO9aZTY",
            ],
            sad: [
                "hOlUSetdVjU",
                "dhZwLwMz9U7",
                "8et5Qp0cJP0",
                "bltK5gY9gdu",
                "1eqxxZX7fYp",
                "bdRgKREz_QwfdpBYw58UhnXQ",
                "y8lxxQ9edz-6r6_o9YroQ",
                "908563459236466",
                "JMln55AxeDVj2E",
                "hOlUSetdVjU",
                "nr_88BTE",
            ],
            care: ["wsB53peUgOw", "p_-PTXnrxIv", "s20xbjQ", "ipdhQiyAA", "BK9wsB53peUgOw", "wYkojhVjg"],
            angry: [
                "111p7Pu_qihMMCw",
                "i6eZvvUMZW5",
                "S3LKuJSG-Qh",
                "3uLTUTwjP7O",
                "PByJ079GWfl",
                "Vvist1cde3YJ3mCMK0A6yjn-D-",
                "4Bm3UKlJBnXJyqwKsR",
                "444813342392137",
                "oyx0fwXyEYafhA9",
                "Pu_qihMMCw",
                "1m4DOUAn",
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
    pauseScriptDueToSeparateTabScanning = !1,
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
    timer_CheckSecondTabExsist,
    _regEx = new RegExp(/{([^{}]+?)}/),
    weAreTrackingLikeContainer = !1,
    _timerToCloseInsights = 0,
    _profInsights_spec_close = !1,
    waitingForReply = !1,
    tab_Exists_CheckID = 0,
    howManyTimesWeCheckedTab = 0,
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
var inboxTabArrayProcessedIds = new Array();
inboxTabArrayProcessedIds.length = 0;
var lastItemsInArray = 0,
    inboxUselessScannedPosts = 0,
    ignoreScannedPosts = !1,
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
        window_ID,
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
        psInvTotDay,
        psInvDay,
        psels,
        notifTimerRelease,
        scrollQ = 0,
        invitedToEvent = 0,
        itemProcessed = 0,
        docHeight = 0,
        localtimeout = 10,
        temp_block_help = !1,
        multi_notif_page = !0,
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
            "9 K",
            "1.1K",
            "1.2K",
            "1.3K",
            "1.4K",
            "1.5K",
            "1.6K",
            "1.7K",
            "1.8K",
            "1.9K"
        ),
        bigPostTabs = Array(),
        newNotificationScanInProgress = !1,
        dateObj = new Date(),
        month = dateObj.getUTCMonth() + 1,
        day = dateObj.getUTCDate(),
        year = dateObj.getUTCFullYear(),
        currentTimeInSec = parseInt(Math.floor(Date.now() / 1e3)),
        ButtonClass = "_51sy",
        inputsComments = getElem("._2x4v", ".hidden_elem ._2x4v"),
        ID = "reaction_profile_browser1",
        bsScrollNoReset = !1,
        timeout = 1e3,
        addText = "",
        canSKIPButton = 0,
        hadInvitedButton = 0,
        hadClickedMoreButton = 0,
        loopmaxtry = 0,
        uiMorePagerPrimary = 0,
        skip_post_setting = 0,
        share_put_likes = !1,
        deleteInvitersLocal = !1,
        deleteInvitersLocalVar = 0,
        likeSharedComments = !1,
        share_put_comments = !1,
        skip_Invite = !1,
        share_likes_limit = 300,
        share_comments_limit = 300,
        friends_skip_nr = 0,
        scroll_before_inv_nr = 0,
        _temp_ScanBeforeInvFilterActive = 0,
        _temp_btnQuantityLastTime = 0,
        _temp_btnQuantitySameInRow = 0,
        _temp_scrollsQuantityDone = 0,
        scroll_before_inv_delay = 0,
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
        scan_current_tab_business_suite = !0,
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
        psThisScr2 = "pro",
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
            (_ret = e) && _ret.indexOf("|bf|") > -1 && (_ret = _ret.replace("|bf|", "https://business.facebook.com/")),
            _ret && _ret.indexOf("|f|") > -1 && (_ret = _ret.replace("|f|", "https://www.facebook.com/")),
            _ret
        );
    }
    function javascript_abort() {
        throw new Error("This is NOT an error. This is just to abort javascript during other tasks.");
    }
    var maxPages = 0;
    function scanOurPagesAndImport(e) {
        getElem(
            "#contentArea #pagelet_seeall_filter #bookmarksSeeAllEntSection li.sideNavItem>a, #contentArea #pagelet_seeall_filter_pages li.sideNavItem>a, #contentArea #pagelet_seeall_filter_business_with_accessible_pages li.sideNavItem>a"
        ).length > 0
            ? getElem(
                  "#contentArea #pagelet_seeall_filter #bookmarksSeeAllEntSection li.sideNavItem>a, #contentArea #pagelet_seeall_filter_pages li.sideNavItem>a, #contentArea #pagelet_seeall_filter_business_with_accessible_pages li.sideNavItem>a"
              ).each(function (e) {
                  var t = $(this).attr("href");
                  $(this).attr("href").indexOf("?ref=bookmarks") > 5 &&
                      (t = t.substring(0, t.indexOf("?ref=bookmarks"))),
                      t.indexOf("?business_id=") > 5 && (t = t.substring(0, t.indexOf("?business_id="))),
                      "https://business.facebook.com/" == t ||
                          linksArray.includes(t) ||
                          -1 != t.indexOf("https://www.facebook.com/profile.php") ||
                          (console.log("1:" + t), linksArray.push(urlCode(t)));
              })
            : getElem("div[role='main'] a[role='link'],.p9ctufpz a[role='link']").length > 0 &&
              getElem("div[role='main'] a[role='link'],.p9ctufpz a[role='link']").each(function (e) {
                  var t = $(this).attr("href");
                  -1 == t.indexOf("/notifications") &&
                      -1 == t.indexOf("/inbox") &&
                      -1 == t.indexOf("?modal=composer") &&
                      ($(this).attr("href").indexOf("?ref=bookmarks") > 5 &&
                          (t = t.substring(0, t.indexOf("?ref=bookmarks"))),
                      t.indexOf("?business_id=") > 5 && (t = t.substring(0, t.indexOf("?business_id="))),
                      t.indexOf("&nav_ref=") > 5 && (t = t.substring(0, t.indexOf("&nav_ref="))),
                      t.indexOf("/home?") > -1 && (t = t.replace("/home?", "/posts?")),
                      t.indexOf("/home/?") > -1 && (t = t.replace("/home/?", "/posts/?")),
                      t.indexOf("?") > 0 &&
                          -1 == t.indexOf("powereditor/pages?section") &&
                          -1 == t.indexOf("/creatorstudio") &&
                          -1 == t.indexOf("/events/") &&
                          -1 == t.indexOf("album_id=") &&
                          -1 == t.indexOf("/watch/") &&
                          -1 == t.indexOf("adsmanager/pages") &&
                          -1 == t.indexOf("/content_management") &&
                          -1 == t.indexOf("dco_ad_id=") &&
                          -1 == t.indexOf("/latest/posts") &&
                          -1 == t.indexOf("/insights") &&
                          -1 == t.indexOf("/photo/") &&
                          -1 == t.indexOf("/latest/ad_center") &&
                          -1 == t.indexOf("permalink") &&
                          (t = t.substring(0, t.indexOf("?"))),
                      -1 == t.indexOf("facebook.com") &&
                          -1 == t.indexOf("fb.com") &&
                          ("/" != t.charAt(0) && (t = "/" + t), (t = "https://www.facebook.com" + t)),
                      "https://business.facebook.com/" == t ||
                          "https://www.facebook.com/" == t ||
                          linksArray.includes(t) ||
                          linksArray.includes(urlCode(t)) ||
                          "https://www.facebook.com/ad_center/create/ad/" == t ||
                          "https://business.facebook.com/ad_center/create/ad/" == t ||
                          "https://www.facebook.com/pages/creation/" == t ||
                          -1 != t.indexOf("https://www.facebook.com/profile.php") ||
                          (console.log("2:" + t),
                          linksArray.push(urlCode(t)),
                          debug && console.log("AAAAAAAAAAAa=" + t)));
              }),
            linksArray.length > 0 || e > 9
                ? savePagesAndImport()
                : setTimeout(function () {
                      scanOurPagesAndImport(e + 1);
                  }, 5e3);
    }
    function savePagesAndImport() {
        linksArray.length > maxPages && (linksArray.length = maxPages),
            linksArray.length > 0
                ? api.storage.sync.set({ urllist1: linksArray, urllist2: linksArray }, function () {
                      var e,
                          t = api.runtime.lastError;
                      t && t.message && maxPages > 80 && linksArray.length > 100
                          ? (200 == maxPages &&
                                alert(
                                    api.i18n
                                        .getMessage("too_many_pages_alert")
                                        .replace(/%s/g, ((e = [t.message]), () => e.shift()))
                                ),
                            (maxPages -= 10),
                            savePagesAndImport())
                          : (window.location.replace(api.runtime.getURL("options.html") + "?save=1"),
                            javascript_abort());
                  })
                : (window.location.replace(api.runtime.getURL("options.html") + "?save=1"), javascript_abort());
    }
    function stopBreakIt() {
        (scriptIsRunning = 0),
            clearTimeout(loopTimerDelay),
            clearTimeout(TimerDelayVar1),
            clearTimeout(TimerDelayVar2),
            clearTimeout(timer_CheckSecondTabExsist),
            console.log("You stopped the script"),
            stopScript(api.i18n.getMessage("you_stop") + "\r");
    }
    if (
        (window.location.href.indexOf("pages?fb-auto-invite=1") > 0 &&
            ((maxPages = 200), (linksArray = new Array()), scanOurPagesAndImport(0)),
        1 == scriptIsRunning && -1 == window.location.href.indexOf("pages?fb-auto-invite=1"))
    )
        stopBreakIt();
    else if (-1 == window.location.href.indexOf("pages?fb-auto-invite=1")) {
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
            (psInvTotDay = 0),
            (psInvDay = ""),
            (weAreInvitingFromShared = 0),
            (weAreScanningOnlyShared = !1),
            (weAreScanningOnlyInvites = !1),
            api.runtime.sendMessage({ type: "getTabId" }, function (e) {
                tab_ID = e.tabId;
            }),
            api.runtime.sendMessage({ type: "getWindowId" }, function (e) {
                window_ID = e.windowId;
            });
        var p1_1 = 3,
            p1_2 = 5,
            p2_1 = 3,
            p2_2 = 5,
            pc_1 = 10,
            pc_2 = 15,
            stopWhen = "run",
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
            normal_run_limitNoInvitePosts = 0,
            invitesLogArray = [];
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
        function checkLanguageNotEn() {
            const e = document.documentElement.getAttribute("lang") || "";
            return 0 !== e.toLowerCase().indexOf("en") && "" !== e ? api.i18n.getMessage("facebook_not_english") : "";
        }
        function checkLanguageNotEn2() {
            const e = document.documentElement.getAttribute("lang") || "";
            return 0 !== e.toLowerCase().indexOf("en") && "" !== e
                ? api.i18n.getMessage("facebook_not_english_html")
                : "";
        }
        function createPopupInfo() {
            scriptIsRunning = 0;
            document.getElementsByTagName("head")[0];
            var e = document.getElementsByTagName("body")[0],
                t = document.createElement("div"),
                n = 0,
                o = "Text not set at the moment.";
            text_comm_shares.length > 1 && n++,
                text_comm_shares2.length > 1 && n++,
                text_comm_shares3.length > 1 && n++,
                text_comm_shares4.length > 1 && n++,
                text_comm_shares5.length > 1 && n++,
                1 == n && (o = "You set " + n + " phrase."),
                n > 1 && (o = "You set " + n + " phrases.");
            var i = "";
            TotalInvited > -1 &&
                (i =
                    '<br><input type="checkbox" id="fast_scan"><label title="' +
                    api.i18n.getMessage("fast_scan_title") +
                    '">' +
                    api.i18n.getMessage("fast_scan_label") +
                    " " +
                    api.i18n.getMessage("fast_scan_before") +
                    ' <input name="fast_scan_loads" value="" type="number" style="width:30px"> ' +
                    api.i18n.getMessage("fast_scan_after") +
                    "</label>"),
                t.setAttribute("id", "fbe-container"),
                $(window).scrollTop(0);
            var s =
                '<link rel="stylesheet" type="text/css" href="' +
                api.runtime.getURL("content.css") +
                '" charset="utf-8"><div class="fbt"' +
                ($(window).height() < 1e3 ? ' style="position:absolute!important;"' : "") +
                '><div class="fbe-header"><h3>' +
                api.runtime.getManifest().name +
                " (" +
                api.i18n.getMessage("phrase_version") +
                " " +
                api.runtime.getManifest().version +
                ') - <a href="#" id="whatsNewLink">' +
                api.i18n.getMessage("whats_new") +
                '</a></h3><div id="fbe-close-container"></div></div><div class="fbe-content"><div class="warning-notification" style="display:none;"></div><div class="licDiv" style="display:none;"></div><p style="margin-top: 0;text-align: left;margin-bottom:0;"><span style="color:green"><b><span class="red">' +
                checkLanguageNotEn() +
                api.i18n.getMessage("before_running_script") +
                '</span> <a href="https://business.facebook.com/latest/posts/published_posts">' +
                api.i18n.getMessage("business_suite") +
                '</a>, <a href="https://business.facebook.com/latest/insights/content/">' +
                api.i18n.getMessage("insights_new") +
                '</a>, <a href="https://business.facebook.com/latest/posts/photos">' +
                api.i18n.getMessage("photos_album") +
                "</a>, " +
                api.i18n.getMessage("home_tab") +
                ', <a href="https://business.facebook.com/latest/inbox/facebook">' +
                api.i18n.getMessage("inbox_tab") +
                "</a>, " +
                api.i18n.getMessage("creator_studio") +
                ", " +
                api.i18n.getMessage("notifications_tab") +
                ". " +
                api.i18n.getMessage("run_script_there") +
                '</span></b> <a href="https://www.youtube.com/watch?v=FUU_-N2Adec" target="_blank">' +
                api.i18n.getMessage("check_old_video") +
                "</a>.<br>" +
                api.i18n.getMessage("contact_us_problems") +
                '<br><br><input type="checkbox" id="skip_Invite2"><label><span style="color:green"><b><span style="color:red">' +
                api.i18n.getMessage("main_option_invite") +
                "</span> " +
                api.i18n.getMessage("to_like_page") +
                "</b></span>.</label><br>" +
                api.i18n.getMessage("pause_between_invites") +
                ' <select id="p1_1"><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="8">8</option><option value="13">13</option><option value="18">18</option><option value="30">30</option><option value="50">50</option><option value="80">80</option><option value="150">150</option><option value="180">180</option></select> - <select id="p1_2"><option value="2.5">2.5</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="7">7</option><option value="8">8</option><option value="10">10</option><option value="15">15</option><option value="22">22</option><option value="35">35</option><option value="55">55</option><option value="75">75</option><option value="90">90</option><option value="150">150</option><option value="180">180</option></select> ' +
                api.i18n.getMessage("seconds") +
                ". " +
                api.i18n.getMessage("stop_after") +
                ' <input name="fb_limit" value="490" type="number" style="width:40px"> ' +
                api.i18n.getMessage("invites_word") +
                ' <select id="stopWhen"><option value="run">' +
                api.i18n.getMessage("per_run") +
                '</option><option value="day">' +
                api.i18n.getMessage("per_day") +
                "</option></select>." +
                i +
                '<br><input type="checkbox" id="ignoreScannedPosts"><label><span style="color:green"><b>' +
                api.i18n.getMessage("save_processed_posts") +
                "</b></span> " +
                api.i18n.getMessage("ignore_next_runs") +
                " " +
                api.i18n.getMessage("saved_posts") +
                ' <span id="elPosts">' +
                creatorStudioPostOpenedForScrollArray[0].length +
                '</span>.</label> <a href="#" id="reset_posts_elabList">' +
                api.i18n.getMessage("reset") +
                '</a><br><input type="checkbox" id="deleteInvitersLocal"><label><span style="color:red"><b>' +
                api.i18n.getMessage("new_for_big_posts") +
                '</b></span> <span style="color:green"><b>' +
                api.i18n.getMessage("save_ram") +
                "</b></span>.</label><br><br>";
            (10 !== psCurRunType && 11 !== psCurRunType) ||
                (s += "<span>" + api.i18n.getMessage("trial_next_options_only_mpv") + "<br></span>"),
                (s +=
                    '<input type="checkbox" id="share_put_likes"><label><span style="color:green"><b>' +
                    api.i18n.getMessage("like_shared_posts") +
                    "</b></span>.</label>"),
                (s =
                    (s = multiPagesAct
                        ? s +
                          '<br><input type="checkbox" id="likeSharedComments"><label><span style="color:green"><b>' +
                          api.i18n.getMessage("like_comments_shared_posts") +
                          '</b></span>.</label><br><input type="checkbox" id="inviteDuringShareCheck"><label><span style="color:green"><b>' +
                          api.i18n.getMessage("invite_likers_shared_posts") +
                          "</b></span> (" +
                          api.i18n.getMessage("only_shared_by_your_page") +
                          ').</label><br><input type="checkbox" id="inviteDuringShareCheck2"><label><span style="color:green"><b>' +
                          api.i18n.getMessage("invite_who_liked_your_comments") +
                          "</b></span>.</label>"
                        : s +
                          '<div style="display:none;"><br><input type="checkbox" id="likeSharedComments"><label><span style="color:green"><b>' +
                          api.i18n.getMessage("like_comments_shared_posts") +
                          '</b></span>.</label><br><input type="checkbox" id="inviteDuringShareCheck"><label><span style="color:green"><b>' +
                          api.i18n.getMessage("invite_likers_shared_posts") +
                          "</b></span> (" +
                          api.i18n.getMessage("only_shared_by_your_page") +
                          ').</label><br><input type="checkbox" id="inviteDuringShareCheck2"><label><span style="color:red"><b>' +
                          api.i18n.getMessage("new") +
                          '</b></span> <span style="color:green"><b>' +
                          api.i18n.getMessage("invite_who_liked_your_comments") +
                          "</b></span>.</label></div>") +
                    '<div style="display:none;"><br><input type="checkbox" id="share_put_comments"><b>' +
                    api.i18n.getMessage("comment_all_shared_posts") +
                    "</b> (" +
                    api.i18n.getMessage("set_text_at_least_5_chars") +
                    '):<div id="settext">' +
                    o +
                    ' <a href="#" id="setTextLink">' +
                    api.i18n.getMessage("set_text_link") +
                    '<br><br></a></div><div id="settext2" style="display:none;"><span title="' +
                    api.i18n.getMessage("example_user_name_title") +
                    '">' +
                    api.i18n.getMessage("use_user_name_in_text") +
                    ' &#9432; (hover for more info)</span>. <span style="color:red"><b>' +
                    api.i18n.getMessage("spintax") +
                    "</b></span> " +
                    api.i18n.getMessage("spintax_supported") +
                    "<br>" +
                    api.i18n.getMessage("one_phrase_random") +
                    '<br>1: <input name="text_comm_shares" value="" type="text" style="width: 400px;"><br>2: <input name="text_comm_shares2" value="" type="text" style="width: 400px;"><br>3: <input name="text_comm_shares3" value="" type="text" style="width: 400px;"><br>4: <input name="text_comm_shares4" value="" type="text" style="width: 400px;"><br>5: <input name="text_comm_shares5" value="" type="text" style="width: 400px;"><br><span style="color:red"><b>' +
                    api.i18n.getMessage("example") +
                    "</b></span> " +
                    api.i18n.getMessage("example_comment_text") +
                    "<br><b>" +
                    api.i18n.getMessage("pause") +
                    "</b> " +
                    api.i18n.getMessage("after_each_comment") +
                    " " +
                    api.i18n.getMessage("from") +
                    ' <select id="pc_1"><option value="5">5</option><option value="10" selected>10</option><option value="15">15</option><option value="30">30</option><option value="60">60</option><option value="90">90</option><option value="120">120</option><option value="300">300</option></select> ' +
                    api.i18n.getMessage("to") +
                    ' <select id="pc_2"><option value="10">10</option><option value="15" selected>15</option><option value="30">30</option><option value="60">60</option><option value="90">90</option><option value="120">120</option><option value="300">300</option><option value="600">600</option><option value="900">900</option></select> ' +
                    api.i18n.getMessage("seconds") +
                    ".</p></div></div>"),
                $("#setTextLink").length > 0 &&
                    $("#setTextLink").click(function (e) {
                        e.preventDefault(),
                            $("#settext2").css("display", "block"),
                            $("#settext").css("display", "none");
                    }),
                (s =
                    s +
                    '<br><div class="red-title">' +
                    api.i18n.getMessage("UI_1") +
                    '</div><div class="fbe-intro imgdisp">' +
                    api.i18n.getMessage("UI_2") +
                    '<br><a href="#" id="toggleImgSelect"><span style="display:none;">(' +
                    api.i18n.getMessage("how_to_select_few_posts") +
                    ')</span><img id="img-select" src="' +
                    api.runtime.getURL("how-to-select-posts.png") +
                    '"></a></div><div class="fbe-actions fbe-button1"></div>'),
                $("#toggleImgSelect").length > 0 &&
                    $("#toggleImgSelect").click(function (e) {
                        e.preventDefault();
                        var t = $("#img-select");
                        "block" === t.css("display") ? t.css("display", "none") : t.css("display", "block");
                    }),
                multiPagesAct &&
                    (s =
                        s +
                        '<div class="fbe-actions fbe-button2"></div><a href="#" id="toggleDiffRead">(<span style="color:red">' +
                        api.i18n.getMessage("what_is_difference") +
                        '</span>)</a><div id="diff_read" style="display:none;text-align:left;"><b>' +
                        api.i18n.getMessage("full_scan") +
                        "</b> = " +
                        api.i18n.getMessage("full_scan_desc") +
                        "<br><b>" +
                        api.i18n.getMessage("real_time") +
                        "</b> = " +
                        api.i18n.getMessage("real_time_desc") +
                        ".</div><br>"),
                multiPagesAct &&
                    $("#toggleDiffRead").click(function (e) {
                        e.preventDefault(), console.log("Click event triggered");
                        var t = $("#diff_read");
                        "block" === t.css("display") ? t.css("display", "none") : t.css("display", "block");
                    }),
                multiPagesAct &&
                    (s =
                        s +
                        '<div class="red-title margin-top">' +
                        api.i18n.getMessage("UI_3") +
                        '</div><div class="fbe-intro"><b>' +
                        api.i18n.getMessage("UI_4") +
                        ' <a href="' +
                        api.runtime.getURL("options.html") +
                        '" target="_blank">' +
                        api.i18n.getMessage("UI_5") +
                        "</a></b> " +
                        api.i18n.getMessage("UI_6") +
                        '</div><div class="fbe-actions fbe-button3"></div><div class="fbe-actions fbe-button4"></div>'),
                (s =
                    s +
                    '<div class="fbe-intro">' +
                    api.i18n.getMessage("UI_7") +
                    ' <a href="' +
                    api.runtime.getURL("options.html") +
                    '" target="_blank">' +
                    api.i18n.getMessage("UI_8") +
                    '</a>. <a href="https://www.youtube.com/watch?v=FUU_-N2Adec" target="_blank">' +
                    api.i18n.getMessage("check_video_example") +
                    "</a>.<br>" +
                    api.i18n.getMessage("invites_sent_last_24h") +
                    " " +
                    getInvitesLast24h() +
                    ".<br>" +
                    (invitesLogArray.length > 0
                        ? api.i18n.getMessage("invites_sent_last_30d") + " " + getInvitesLast30d() + "."
                        : "") +
                    "</div></div></div>"),
                (t.innerHTML = s),
                e.appendChild(t),
                (popupInfo = t);
            var r = $('<div class="fbe-btn-close" id="fbe-close"></div>').click(destroyPopupInfo);
            jQuery("#fbe-close-container").html(r), psupdateFrameWithNewLicenseInfo(!1);
            var l = "Run";
            multiPagesAct && (l = api.i18n.getMessage("UI_9"));
            r = $('<div class="fbe-btn" id="fbe-ready"><span class="fbe-btn-text">' + l + "</span></div>").click(mode1);
            jQuery(".fbe-button1").html(r);
            r = $(
                '<div class="fbe-btn" id="fbe-ready"><span class="fbe-btn-text">' +
                    api.i18n.getMessage("UI_10") +
                    "</span></div>"
            ).click(mode2);
            jQuery(".fbe-button2").html(r);
            r = $(
                '<div class="fbe-btn' +
                    (0 == urllist1.length ? " disabled" : "") +
                    '" id="fbe-ready"><span class="fbe-btn-text">' +
                    api.i18n.getMessage("UI_11") +
                    "</span></div>"
            ).click(start_mode3);
            jQuery(".fbe-button3").html(r);
            r = $(
                '<div class="fbe-btn' +
                    (0 == urllist2.length ? " disabled" : "") +
                    '" id="fbe-ready"><span class="fbe-btn-text">' +
                    api.i18n.getMessage("UI_12") +
                    "</span></div>"
            ).click(start_mode4);
            jQuery(".fbe-button4").html(r),
                $("#reset_posts_elabList").on("click", reset_posts_elabList),
                $("#whatsNewLink")
                    .off("click")
                    .on("click", function () {
                        alert(
                            "If you have mixed Add Friends and Invite buttons script will scan the post now; all known bug fixed."
                        );
                    }),
                multiPagesAct &&
                    $("#toggleDiffRead").click(function (e) {
                        e.preventDefault();
                        var t = $("#diff_read");
                        "block" === t.css("display") ? t.css("display", "none") : t.css("display", "block");
                    }),
                (document.getElementById("p1_1").value = p1_1 / 1e3),
                (document.getElementById("p1_2").value = p1_2 / 1e3),
                (document.getElementById("stopWhen").value = stopWhen),
                (document.getElementById("share_put_likes").checked = share_put_likes),
                (document.getElementById("deleteInvitersLocal").checked = deleteInvitersLocal),
                (document.getElementById("likeSharedComments").checked = likeSharedComments),
                (document.getElementById("share_put_comments").checked = share_put_comments),
                (document.getElementById("skip_Invite2").checked = !skip_Invite),
                (document.getElementById("inviteDuringShareCheck").checked = inviteDuringShareCheck),
                (document.getElementById("inviteDuringShareCheck2").checked = inviteDuringShareCheck2),
                (document.getElementById("ignoreScannedPosts").checked = ignoreScannedPosts),
                (document.getElementById("pc_1").value = pc_1 / 1e3),
                (document.getElementById("pc_2").value = pc_2 / 1e3),
                (document.getElementsByName("text_comm_shares")[0].value = text_comm_shares),
                (document.getElementsByName("text_comm_shares2")[0].value = text_comm_shares2),
                (document.getElementsByName("text_comm_shares3")[0].value = text_comm_shares3),
                (document.getElementsByName("text_comm_shares4")[0].value = text_comm_shares4),
                (document.getElementsByName("text_comm_shares5")[0].value = text_comm_shares5),
                document.getElementsByName("fast_scan_loads") &&
                    document.getElementsByName("fast_scan_loads")[0] &&
                    (document.getElementsByName("fast_scan_loads")[0].value = fast_scan_loads),
                document.getElementById("fast_scan") && (document.getElementById("fast_scan").checked = fast_scan),
                document.getElementsByName("fb_limit") &&
                    document.getElementsByName("fb_limit")[0] &&
                    (document.getElementsByName("fb_limit")[0].value = fb_limit);
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
            if (((startTime = new Date()), checkSpintaxFormatOk(), document.getElementById("p1_1"))) {
                if (
                    ((p1_1 = Number(document.getElementById("p1_1").value)),
                    (p1_2 = Number(document.getElementById("p1_2").value)),
                    p1_1 > p1_2)
                ) {
                    var e = p1_1;
                    (p1_1 = p1_2), (p1_2 = e);
                }
                if (
                    ((stopWhen = document.getElementById("stopWhen").value),
                    (share_put_likes = document.getElementById("share_put_likes").checked),
                    (deleteInvitersLocal = document.getElementById("deleteInvitersLocal").checked),
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
                    document.getElementsByName("fb_limit") &&
                        document.getElementsByName("fb_limit")[0] &&
                        (fb_limit = document.getElementsByName("fb_limit")[0].value),
                    api.storage.sync.set(
                        {
                            p1_1: p1_1,
                            p1_2: p1_2,
                            pc_1: pc_1,
                            pc_2: pc_2,
                            stopWhen: stopWhen,
                            text_comm_shares: text_comm_shares,
                            text_comm_shares2: text_comm_shares2,
                            text_comm_shares3: text_comm_shares3,
                            text_comm_shares4: text_comm_shares4,
                            text_comm_shares5: text_comm_shares5,
                            share_put_likes: share_put_likes,
                            deleteInvitersLocal: deleteInvitersLocal,
                            likeSharedComments: likeSharedComments,
                            share_put_comments: share_put_comments,
                            skip_Invite: skip_Invite,
                            inviteDuringShareCheck: inviteDuringShareCheck,
                            inviteDuringShareCheck2: inviteDuringShareCheck2,
                            fast_scan_loads: fast_scan_loads,
                            fast_scan: fast_scan,
                            fb_limit: fb_limit,
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
        function multiPageUniqueFunc(e, t, n, o, i, s, r, l) {
            api.storage.local.set(
                {
                    _tab_ID: tab_ID,
                    _realt: r,
                    _time: Math.floor(Date.now() / 1e3),
                    _runMode: n,
                    _fbe_number: t,
                    _shared_p_liked: o,
                    _shared_p_comm: i,
                    _totalInvited: s,
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
                (specialElabForFeedAndGrid = !1),
                (specialElabForHomePage2026 = !1),
                (bsScrollNoReset = !1),
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
                (specialElabForFeedAndGrid = !1),
                (specialElabForHomePage2026 = !1),
                (bsScrollNoReset = !1),
                setTimeout(function () {
                    startDowithDelay(0);
                }, 1500));
        }
        function start_mode3() {
            if (licWorking())
                if ((saveQuickVars(), 0 == urllist1.length)) alert(api.i18n.getMessage("UI_13"));
                else {
                    var e = urlDeCode(urllist1[0]);
                    e && "/" == e.slice(-1) && (e = e.slice(0, -1)),
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
                            e.indexOf("/insights") > 0 ||
                            e.indexOf("/photo/") > 0 ||
                            e.indexOf("/photos/") > 0 ||
                            e.indexOf("/latest/ad_center") > 0 ||
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
                    e && "/" == e.slice(-1) && (e = e.slice(0, -1)),
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
                            e.indexOf("/insights") > 0 ||
                            e.indexOf("/photo/") > 0 ||
                            e.indexOf("/photos/") > 0 ||
                            e.indexOf("/latest/ad_center") > 0 ||
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
            var e = document.createElement("script");
            e.setAttribute("src", api.runtime.getURL("forceReload.js")),
                (document.head || document.documentElement).appendChild(e),
                e.parentNode.removeChild(e);
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
            fb_lim_this_page_counter = 0;
            var e = "";
            3 == runMode &&
                (multi_random_order && (nextPage = myrand(0, urllist1.length, nextPage - 1)),
                (e = urlDeCode(urllist1[nextPage]))),
                4 == runMode &&
                    (multi_random_order && (nextPage = myrand(0, urllist2.length, nextPage - 1)),
                    (e = urlDeCode(urllist2[nextPage]))),
                e && e.length > 0 && "/" == e.slice(-1) && (e = e.slice(0, -1)),
                (e &&
                    (e.indexOf("/posts/") > 0 ||
                        e.indexOf("/videos/") > 0 ||
                        e.indexOf("/watch/") > 0 ||
                        e.indexOf("/photos/") > 0 ||
                        e.indexOf("/events/") > 0 ||
                        e.indexOf("/ads/manage/") > 0 ||
                        e.indexOf("acebook.com/adsmanager/") > 0 ||
                        e.indexOf("/content_management") > 0 ||
                        e.indexOf("/latest/posts") > 0 ||
                        e.indexOf("/insights") > 0 ||
                        e.indexOf("/photo/") > 0 ||
                        e.indexOf("/photos/") > 0 ||
                        e.indexOf("/latest/ad_center") > 0 ||
                        e.indexOf("album_id=") > 0)) ||
                    (e += "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending"),
                e.indexOf("/ads/manage/") > 0 && (e = e.replace("?fbe-number=", "&fbe-number=")),
                e.indexOf("/groups/") > 0 &&
                    (e = e.replace("/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending", "")),
                multi_notif_page &&
                    (e = e.replace(
                        "/publishing_tools/?section=PUBLISHED_POSTS&sort[0]=published_time_descending",
                        "/notifications"
                    )),
                multiPageUniqueFunc(
                    e,
                    nextPage,
                    runMode,
                    total_shared_posts_liked,
                    total_shared_posts_commented,
                    mtotalInvited,
                    0,
                    !0
                ),
                setTimeout(function () {
                    3 == runMode && urllist1.length > nextPage
                        ? window.location.replace(e)
                        : 3 == runMode && (console.log("We've checked all pages"), stopScript()),
                        4 == runMode && urllist2.length > nextPage
                            ? window.location.replace(e)
                            : 4 == runMode && prepareforReloadPage2();
                }, 800);
        }
        api.storage.local.get({ invitesLogArray: [] }, (e) => {
            invitesLogArray = e.invitesLogArray;
        }),
            api.storage.sync.get(
                {
                    p1_1: 3,
                    p1_2: 5,
                    p2_1: 3,
                    p2_2: 5,
                    pc_1: 10,
                    pc_2: 15,
                    stopWhen: "run",
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
                    psInvTotDay: 0,
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
                    scan_current_tab_business_suite: !0,
                    skip_sad_emotion: !1,
                    name_comm_filter1: "",
                    accept_ashii_names_only: !1,
                    skip_no_profile_image: !1,
                    slow_internet: !1,
                    debug_option: !1,
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
                    deleteInvitersLocal: !1,
                    likeSharedComments: !1,
                    share_put_comments: !1,
                    skip_Invite: !1,
                    inviteDuringShareCheck: !1,
                    inviteDuringShareCheck2: !1,
                    share_likes_limit: 300,
                    share_comments_limit: 300,
                    friends_skip_nr: 0,
                    scroll_before_inv_nr: 0,
                    scroll_before_inv_delay: 0,
                    stop_on_captcha_shown: !0,
                    postMoreUnderSameAccount: !1,
                    do_not_check_who_comments2: "postPageOrCurrent",
                    do_not_check_shared_my_name_skip: "",
                    shares_list_delete_days: 14,
                    multi_notif_page: !0,
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
                    server_version: server_version,
                    server_warning_text: server_warning_text,
                    server_warning_version: server_warning_version,
                    server_main_invite_scroll: server_main_invite_scroll,
                    server_main_like_to_click: server_main_like_to_click,
                    server_main_like_to_clickIgnor: server_main_like_to_clickIgnor,
                    server_new_like_block: server_new_like_block,
                    server_new_like_total_number: server_new_like_total_number,
                    server_new_like_total_numberIgnor: server_new_like_total_numberIgnor,
                    server_new_like_reaction: server_new_like_reaction,
                    server_main_close_invite_window: server_main_close_invite_window,
                    server_pd_posts: server_pd_posts,
                    server_bs_posts: server_bs_posts,
                    server_photos_listNOT: server_photos_listNOT,
                    server_bs_close_post: server_bs_close_post,
                    server_bs_close_postF1: server_bs_close_postF1,
                    server_bs_close_postF2: server_bs_close_postF2,
                    server_bs_scroll_post: server_bs_scroll_post,
                    server_bs_scroll_list: server_bs_scroll_list,
                    server_bs_feed_grid1: server_bs_feed_grid1,
                    server_bs_feed_grid2: server_bs_feed_grid2,
                    server_bs_page_name: server_bs_page_name,
                    server_bs_second_posts: server_bs_second_posts,
                    server_bs_second_posts_filter: server_bs_second_posts_filter,
                    server_bs_shared_posts_btn: server_bs_shared_posts_btn,
                    server_bs_view_on_fb_item: server_bs_view_on_fb_item,
                    server_home_posts: server_home_posts,
                    server_photos_list: server_photos_list,
                    server_photos_close_post: server_photos_close_post,
                    server_load_more_photos_posts: server_load_more_photos_posts,
                    server_inv_friends_list: server_inv_friends_list,
                    server_inv_friends_scoll: server_inv_friends_scoll,
                    server_inbox_scroll_list: server_inbox_scroll_list,
                    server_inbox_elements: server_inbox_elements,
                    server_inbox_addit_click: server_inbox_addit_click,
                    server_inbox_close_addit_elem: server_inbox_close_addit_elem,
                    server_notif_scroll: server_notif_scroll,
                    server_notif_list: server_notif_list,
                    server_notif_ignore_list: server_notif_ignore_list,
                    server_shared_items: server_shared_items,
                    server_shared_show_attachment: server_shared_show_attachment,
                    server_shared_author: server_shared_author,
                    server_shared_comments: server_shared_comments,
                    server_shared_comment_author: server_shared_comment_author,
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
                          "day" != (stopWhen = e.stopWhen) && "run" != stopWhen && (stopWhen = "run"),
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
                          (psscr = e.psscr) && "pro" == psscr && (multiPagesAct = !1),
                          (pstype = e.pstype),
                          (psdura = e.psdura),
                          (psactive = Number(e.psactive)),
                          (installID = e.installID),
                          (psInvTot = Number(e.psInvTot)),
                          (psInvTotDay = Number(e.psInvTotDay)),
                          (psInvDay = e.psInvDay) != month + "-" + day &&
                              ((psInvDay = month + "-" + day), (psInvTot = 0), (psInvTotDay = 0)),
                          calcLicVars(),
                          (skip_post_setting = Number(e.skip_post_setting)),
                          (share_put_likes = e.share_put_likes),
                          (deleteInvitersLocal = e.deleteInvitersLocal),
                          (likeSharedComments = e.likeSharedComments),
                          (share_put_comments = e.share_put_comments),
                          (skip_Invite = e.skip_Invite),
                          (inviteDuringShareCheck = e.inviteDuringShareCheck),
                          (inviteDuringShareCheck2 = e.inviteDuringShareCheck2),
                          0 == (share_likes_limit = Number(e.share_likes_limit)) && (share_likes_limit = 500),
                          0 == (share_comments_limit = Number(e.share_comments_limit)) && (share_comments_limit = 500),
                          (friends_skip_nr = Number(e.friends_skip_nr)),
                          (scroll_before_inv_nr = Number(e.scroll_before_inv_nr)),
                          (scroll_before_inv_delay = Number(e.scroll_before_inv_delay)),
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
                          (scan_current_tab_business_suite = e.scan_current_tab_business_suite),
                          "," == (name_comm_filter1 = e.name_comm_filter1.toString().trim()).slice(-1) &&
                              (name_comm_filter1 = name_comm_filter1.slice(0, -1)),
                          name_comm_filter1.length > 0 &&
                              (namesFilter = name_comm_filter1.split(",").map(function (e) {
                                  return e.trim();
                              })),
                          do_not_check_who_comments2.length < 2 && (do_not_check_who_comments2 = "postPageOrCurrent"),
                          (accept_ashii_names_only = e.accept_ashii_names_only),
                          (skip_no_profile_image = e.skip_no_profile_image),
                          (slow_internet = e.slow_internet),
                          (debug_option = e.debug_option) && (debug = debug_option),
                          (notif_other_tab = e.notif_other_tab),
                          (scrollingNewFBDesignClass = e.scrollingNewFBDesignClass),
                          (fb_limit = Number(e.fb_limit)),
                          (fb_limit_multi = Number(e.fb_limit_multi)),
                          (fb_limit_show_more_btn = Number(e.fb_limit_show_more_btn)) < 10 &&
                              (fb_limit_show_more_btn = 10),
                          (fb_limit_show_more_btn_add_sec = Number(e.fb_limit_show_more_btn_add_sec)) > 1e3 &&
                              (fb_limit_show_more_btn_add_sec = 10),
                          fb_limit_show_more_btn_add_sec > 300 && (fb_limit_show_more_btn_add_sec = 120),
                          (TotalInvited = Number(e.TotalInvited)) > 2e5 && (TotalInvited = 5e3),
                          (FirstInstalled = e.FirstInstalled.toString()),
                          (showLessInfoDate = e.showLessInfoDate.toString()),
                          (urllist1 = e.urllist1),
                          (urllist2 = e.urllist2),
                          (void 0 !== (normal_run_limitposts = e.normal_run_limitposts) &&
                              "" != normal_run_limitposts) ||
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
                          "," ==
                              (shares_reply_ignore_string = e.shares_reply_ignore_string.toString().trim()).slice(-1) &&
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
                          (server_version = e.server_version),
                          (server_warning_text = e.server_warning_text),
                          (server_warning_version = e.server_warning_version),
                          (server_main_invite_scroll = e.server_main_invite_scroll),
                          (server_main_like_to_click = e.server_main_like_to_click),
                          (server_new_like_block = e.server_new_like_block),
                          (server_new_like_total_number = e.server_new_like_total_number),
                          (server_new_like_total_numberIgnor = e.server_new_like_total_numberIgnor),
                          (server_new_like_reaction = e.server_new_like_reaction),
                          (scrollingNewFBDesignClassDef = ".SFAWeFw3" + server_main_invite_scroll),
                          (scrollingNewFBDesignClass = ".SFAWeFw3" + server_main_invite_scroll),
                          (server_main_like_to_clickIgnor = e.server_main_like_to_clickIgnor),
                          (server_main_close_invite_window = e.server_main_close_invite_window),
                          (server_pd_posts = e.server_pd_posts),
                          (server_bs_posts = e.server_bs_posts),
                          (server_photos_listNOT = e.server_photos_listNOT),
                          (server_bs_close_post = e.server_bs_close_post),
                          (server_bs_close_postF1 = e.server_bs_close_postF1),
                          (server_bs_close_postF2 = e.server_bs_close_postF2),
                          (server_bs_scroll_post = e.server_bs_scroll_post),
                          (server_bs_scroll_list = e.server_bs_scroll_list),
                          (server_bs_feed_grid1 = e.server_bs_feed_grid1),
                          (server_bs_feed_grid2 = e.server_bs_feed_grid2),
                          (server_bs_page_name = e.server_bs_page_name),
                          (server_bs_second_posts = e.server_bs_second_posts),
                          (server_bs_second_posts_filter = e.server_bs_second_posts_filter),
                          (server_bs_shared_posts_btn = e.server_bs_shared_posts_btn),
                          (server_bs_view_on_fb_item = e.server_bs_view_on_fb_item),
                          (server_home_posts = e.server_home_posts),
                          (server_photos_list = e.server_photos_list),
                          (server_photos_close_post = e.server_photos_close_post),
                          (server_load_more_photos_posts = e.server_load_more_photos_posts),
                          (server_inv_friends_list = e.server_inv_friends_list),
                          (server_inv_friends_scoll = e.server_inv_friends_scoll),
                          (server_inbox_scroll_list = e.server_inbox_scroll_list),
                          (server_inbox_elements = e.server_inbox_elements),
                          (server_inbox_addit_click = e.server_inbox_addit_click),
                          (server_inbox_close_addit_elem = e.server_inbox_close_addit_elem),
                          (server_notif_scroll = e.server_notif_scroll),
                          (server_notif_list = e.server_notif_list),
                          (server_notif_ignore_list = e.server_notif_ignore_list),
                          (server_shared_items = e.server_shared_items),
                          (server_shared_show_attachment = e.server_shared_show_attachment),
                          (server_shared_author = e.server_shared_author),
                          (server_shared_comments = e.server_shared_comments),
                          (server_shared_comment_author = e.server_shared_comment_author),
                          (ignoreScannedPosts = e.ignoreScannedPosts))
                        : (calcLicVars(),
                          (temp_random_array.length = 0),
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
function just_start() {
    void 0 !== fb_timeout_2 && 59234 == fb_timeout_2 && doElabThisProcessT1(),
        "undefined" != typeof popupInfo && popupInfo
            ? setTimeout(function () {
                  destroyPopupInfo();
              }, 10)
            : setTimeout(function () {
                  createPopupInfo();
              }, 30);
}
function doPHOTO() {
    if (
        (debug && console.log("doPhoto"),
        getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l').length > 0 &&
        -1 == window.location.href.indexOf("tab=inbox_plus") &&
        (window.location.href.indexOf("latest/posts") > -1 || window.location.href.indexOf("insights") > -1)
            ? (debug && console.log("~~ CLICK 1"),
              getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l')[0].click())
            : getElem(".QQQtest" + server_bs_close_postF1).filter((e, t) =>
                  new RegExp(server_bs_close_postF2, "i").test((t.getAttribute("aria-label") || "") + t.textContent)
              ).length > 0 &&
              -1 == window.location.href.indexOf("tab=inbox_plus") &&
              (window.location.href.indexOf("latest/posts") > -1 || window.location.href.indexOf("insights") > -1) &&
              (debug && console.log("~~ CLICK new1"),
              getElem(".QQQtest" + server_bs_close_postF1)
                  .filter((e, t) =>
                      new RegExp(server_bs_close_postF2, "i").test((t.getAttribute("aria-label") || "") + t.textContent)
                  )[0]
                  .click()),
        (doNotCloseFirstRunSelectPostsVerif = !1),
        debug && console.log("current length00:" + inputsPhoto.length),
        1 == scriptIsRunning)
    ) {
        if (
            (!(0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed) ||
                publishingToolInv ||
                isNotificationTab ||
                -1 != window.location.href.indexOf("/photos/") ||
                (inputsPhoto = getElem("#content_container ._2eec ._3x2f .rfloat ._4crj", ".hidden_elem ._4crj")),
            debug && console.log("current length01:" + inputsPhoto.length),
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
            debug && console.log("current length02:" + inputsPhoto.length),
            (window.location.href.indexOf("/creatorstudio") > 0 ||
                ((window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/insights") > 0 ||
                    window.location.href.indexOf("/latest/ad_center") > 0 ||
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
            (debug && console.log("current length:" + inputsPhoto.length),
            (window.location.href.indexOf("/content_management") > 0 ||
                window.location.href.indexOf("/latest/posts") > 0 ||
                window.location.href.indexOf("/insights") > 0 ||
                window.location.href.indexOf("/latest/ad_center") > 0 ||
                window.location.href.indexOf("/publishing_tools") > 0) &&
                (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
                publishingToolInv &&
                !isNotificationTab &&
                getElem(
                    "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                    ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                ).filter(function () {
                    return $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").length > 0;
                }).length > 0)
        )
            debug && console.log("current length2:" + inputsPhoto.length),
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
                              $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").length >
                                  0 &&
                              (0 == $(this).find("i").length ||
                                  ($(this).find("i").length > 0 &&
                                      (!$(this).find("i").text() ||
                                          ($(this).find("i").text() &&
                                              -1 == $(this).find("i").text().toLowerCase().indexOf("instagram"))) &&
                                      (!$(this).find("img") ||
                                          !$(this).find("img").attr("alt") ||
                                          ($(this).find("img") &&
                                              $(this).find("img").attr("alt") &&
                                              -1 ==
                                                  $(this).find("img").attr("alt").toLowerCase().indexOf("instagram")))))
                          );
                      })),
                (publishingResetArray = !1);
        if (
            (debug && console.log("current length3:" + inputsPhoto.length),
            (window.location.href.indexOf("/inbox") > 0 || window.location.href.indexOf("tab=inbox_plus") > 0) &&
                getElem("._4k8w" + server_inbox_elements).length > 1 &&
                (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
                ((fb_timeout_new1 = 1e4),
                (notSelectedRun = !0),
                (inputsPhoto = getElem("._4k8w" + server_inbox_elements)),
                debug && console.log("current length from INBOX PLUS::" + inputsPhoto.length),
                (publishingResetArray = !1)),
            debug && console.log("current length311:" + inputsPhoto.length),
            (window.location.href.indexOf("/content_management") > 0 ||
                window.location.href.indexOf("/latest/posts") > 0 ||
                window.location.href.indexOf("/insights") > 0 ||
                window.location.href.indexOf("/latest/ad_center") > 0 ||
                window.location.href.indexOf("/publishing_tools") > 0) &&
                (0 == inputsPhoto.length || inputsPhoto.length <= totalPostsProcessed || publishingResetArray) &&
                publishingToolInv &&
                !isNotificationTab &&
                (getElem('table td[aria-colindex="2"],div[role="cell"]').filter(function () {
                    return $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.h07fizzr").length > 0;
                }).length > 0 ||
                    getElem(".QQQQFFeerefef" + server_bs_posts).length > 0 ||
                    getElem('table td[aria-colindex="2"]' + server_bs_second_posts).filter(function () {
                        return (
                            $(this).find(
                                ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60" +
                                    server_bs_second_posts_filter
                            ).length > 0
                        );
                    }).length > 0))
        ) {
            if (
                (debug && console.log("current length2022:" + inputsPhoto.length),
                (fb_timeout_1 = 1e4),
                0 ==
                    (inputsPhoto = getElem('table td[aria-colindex="2"],div[role="cell"]').filter(function () {
                        return (
                            $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.h07fizzr").length > 0 &&
                            (0 == $(this).find("i").length ||
                                ($(this).find("i").length > 0 &&
                                    (!$(this).find("i").text() ||
                                        ($(this).find("i").text() &&
                                            -1 == $(this).find("i").text().toLowerCase().indexOf("instagram"))) &&
                                    (!$(this).find("img") ||
                                        !$(this).find("img").attr("alt") ||
                                        ($(this).find("img") &&
                                            $(this).find("img").attr("alt") &&
                                            -1 == $(this).find("img").attr("alt").toLowerCase().indexOf("instagram")))))
                        );
                    })).length &&
                    (inputsPhoto = getElem('table td[aria-colindex="2"]' + server_bs_second_posts).filter(function () {
                        return (
                            $(this).find(
                                ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60" +
                                    server_bs_second_posts_filter
                            ).length > 0 &&
                            (0 == $(this).find("i").length ||
                                ($(this).find("i").length > 0 &&
                                    (!$(this).find("i").text() ||
                                        ($(this).find("i").text() &&
                                            -1 == $(this).find("i").text().toLowerCase().indexOf("instagram"))) &&
                                    (!$(this).find("img") ||
                                        !$(this).find("img").attr("alt") ||
                                        ($(this).find("img") &&
                                            $(this).find("img").attr("alt") &&
                                            -1 == $(this).find("img").attr("alt").toLowerCase().indexOf("instagram")))))
                        );
                    })),
                0 == inputsPhoto.length && (inputsPhoto = getElem(".QQQQFFeerefef" + server_bs_posts)),
                (publishingResetArray = !1),
                0 == totalPostsProcessed && !firstRunOnlyTemp && -1 == window.location.href.indexOf("/insights"))
            ) {
                firstRunOnlyTemp = !0;
                var e = !1;
                setTimeout(function () {
                    getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l').length > 0 &&
                    -1 == window.location.href.indexOf("tab=inbox_plus") &&
                    (window.location.href.indexOf("latest/posts") > -1 ||
                        window.location.href.indexOf("/insights") > -1)
                        ? (debug && console.log("~~ CLICK 3"),
                          getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l')[0].click(),
                          (e = !0))
                        : getElem(".QQQtest" + server_bs_close_postF1).filter((e, t) =>
                              new RegExp(server_bs_close_postF2, "i").test(
                                  (t.getAttribute("aria-label") || "") + t.textContent
                              )
                          ).length > 0 &&
                          -1 == window.location.href.indexOf("tab=inbox_plus") &&
                          (window.location.href.indexOf("latest/posts") > -1 ||
                              window.location.href.indexOf("insights") > -1) &&
                          (debug && console.log("~~ CLICK new3"),
                          getElem(".QQQtest" + server_bs_close_postF1)
                              .filter((e, t) =>
                                  new RegExp(server_bs_close_postF2, "i").test(
                                      (t.getAttribute("aria-label") || "") + t.textContent
                                  )
                              )[0]
                              .click(),
                          (e = !0));
                }, 3e3),
                    setTimeout(function () {
                        e && (debug && console.log("~~ CLICK 4"), $(inputsPhoto)[0].click(), (e = !1));
                    }, 5e3),
                    setTimeout(function () {
                        inputsPhoto.length > 0 &&
                            getElem(
                                ".i8xnqrtw .lmtvg2su>.dzz0lifr.puibpoiz,.ba4ynyj4>.cf24wg6s,.htkyxbr9" +
                                    server_bs_scroll_post
                            ).scrollTop(999999);
                    }, 9e3);
            }
            setTimeout(function () {
                inputsPhoto.length > 0 &&
                    getElem(
                        ".i8xnqrtw .lmtvg2su>.dzz0lifr.puibpoiz,.ba4ynyj4>.cf24wg6s,.htkyxbr9" + server_bs_scroll_post
                    ).scrollTop(999999);
            }, 9e3);
        }
        debug && console.log("current length3a:" + inputsPhoto.length),
            (window.location.href.indexOf("/photos") > 0 ||
                window.location.href.indexOf("/photos_albums") > 0 ||
                window.location.href.indexOf("/latest/posts/photos") > 0 ||
                window.location.href.indexOf("/media/set") > 0) &&
                (0 == inputsPhoto.length ||
                    inputsPhoto.length <= totalPostsProcessed ||
                    publishingResetArray ||
                    weScanPhotosTab) &&
                publishingToolInv &&
                !isNotificationTab &&
                getElem("a.oajrlxb2>img,a.qi72231t>img" + server_photos_list, ".rqwfedt553" + server_photos_listNOT)
                    .length > 0 &&
                ((fb_timeout_1 = 1e4),
                (inputsPhoto = getElem(
                    "a.oajrlxb2>img,a.qi72231t>img" + server_photos_list,
                    ".rqwfedt553" + server_photos_listNOT
                )),
                debug && console.log("this is photos tab, we see images:" + inputsPhoto.length),
                (publishingResetArray = !1)),
            debug && console.log("CHECK NOTIF TAB???"),
            0 == inputsPhoto.length &&
                isThisNewFbDesign2020() &&
                getElem(
                    'div[role="navigation"] .l9j0dhe7:visible,div[role="navigation"] .x1emribx[role="row"]:visible' +
                        server_notif_list
                )
                    .not(".y3zKF.sqdOP.yWX7d._8A5w5,.btwxx1t3.pfnyh3mw.lhclo0ds")
                    .filter(function () {
                        return (
                            "row" == $(this).attr("role") &&
                            0 == $(this).find(".sx_e9b3e2,.sx_848308").length &&
                            $(this).find("a").length > 0 &&
                            $(this).find("a").attr("href") &&
                            $(this).find("a").attr("href").length > 30 &&
                            checkIgnoreArrayNotifications($(this).find("a").attr("href"))
                        );
                    }).length > 0 &&
                (document.location.href.indexOf("/notifications") || document.location.href.indexOf("&notif_t=")) &&
                (debug && console.log("NNNNNNNNN1 HERE we are, this is a NOTIFICATION tab!"),
                (newNotificationScanInProgress = !0),
                (inputsPhoto = getElem(
                    'div[role="navigation"] .l9j0dhe7:visible,div[role="navigation"] .x1emribx[role="row"]:visible' +
                        server_notif_list
                )
                    .not(".y3zKF.sqdOP.yWX7d._8A5w5,.btwxx1t3.pfnyh3mw.lhclo0ds")
                    .filter(function () {
                        return (
                            "row" == $(this).attr("role") &&
                            0 == $(this).find(".sx_e9b3e2,.sx_848308").length &&
                            $(this).find("a").length > 0 &&
                            $(this).find("a").attr("href") &&
                            $(this).find("a").attr("href").length > 30 &&
                            checkIgnoreArrayNotifications($(this).find("a").attr("href"))
                        );
                    })),
                (inputsPhoto = $(inputsPhoto).find("a"))),
            window.location.href.indexOf("/professional_dashboard") > 0 &&
                getElem("QQQQQtestPROFDASH" + server_pd_posts).length > 0 &&
                publishingToolInv &&
                ((fb_timeout_1 = 4e3),
                (_profInsights_spec_close = !0),
                (inputsPhoto = getElem("QQQQQtestPROFDASH" + server_pd_posts)),
                (publishingResetArray = !1)),
            window.location.href.indexOf("/my_posted_content") > 0 &&
                getElem(".x14vqqas a").length > 0 &&
                publishingToolInv &&
                ((fb_timeout_1 = 4e3), (inputsPhoto = getElem(".x14vqqas a")), (publishingResetArray = !1)),
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
                                  ? (debug && console.log("~~ CLICK 5"), inputsPhoto[totalPostsProcessed - 1].click())
                                  : (debug && console.log("~~ CLICK 6"),
                                    $(inputsPhoto[totalPostsProcessed - 1])
                                        .children("a")[0]
                                        .click()),
                              updatePopup(),
                              (TimerDelayVar1 = setTimeout(function () {
                                  PausedoPHOTO2();
                              }, fb_timeout_1)))
                            : loop_PostsListArray.indexOf(totalPostsProcessed) > -1 && publishingToolInv
                              ? (loop_currentPostJustForCounter++,
                                debug && console.log("~~ CLICK 7"),
                                inputsPhoto[totalPostsProcessed - 1].click(),
                                updatePopup(),
                                (TimerDelayVar1 = setTimeout(function () {
                                    PausedoPHOTO2();
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
                : (debug && console.log("old scanning"),
                  inputsPhoto.length > 0 && inputsPhoto.length > totalPostsProcessed
                      ? $(inputsPhoto[totalPostsProcessed]).children("a") &&
                        $(inputsPhoto[totalPostsProcessed]).children("a")[0] &&
                        !publishingToolInv
                          ? (debug && console.log("~~ CLICK AAA01"),
                            photosTabRunAll
                                ? (debug && console.log("~~ CLICK 8"), inputsPhoto[totalPostsProcessed].click())
                                : (debug && console.log("~~ CLICK 9"),
                                  $(inputsPhoto[totalPostsProcessed]).children("a")[0].click()),
                            totalPostsProcessed++,
                            normal_run_limitNoInvitePosts >= 0
                                ? normal_run_limitNoInvitePosts++
                                : (normal_run_limitNoInvitePosts = 0),
                            updatePopup(),
                            (checkTwice = 0),
                            (TimerDelayVar1 = setTimeout(function () {
                                PausedoPHOTO2();
                            }, fb_timeout_1)))
                          : publishingToolInv
                            ? (debug && console.log("~~ CLICK AAA1"),
                              postsIgnoredInArrowToStopScript > 1499
                                  ? (3 != runMode && 4 != runMode) || !try_after_limit
                                      ? (console.log("Stop, debug: all posts were already checked by images"),
                                        stopScript())
                                      : (debug && console.log("next page 1"), open_next_page())
                                  : 0 == verifyThisPostAlreadyScanned(inputsPhoto[totalPostsProcessed])
                                    ? (debug && console.log("~~ CLICK AAA2"),
                                      (postsIgnoredInArrowToStopScript = 0),
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
                                          window.location.href.indexOf("/insights") > 0 ||
                                          window.location.href.indexOf("/latest/ad_center") > 0 ||
                                          window.location.href.indexOf("/publishing_tools") > 0) &&
                                          (debug && console.log("~~ CLICK AAA3"),
                                          debug &&
                                              $(inputsPhoto[totalPostsProcessed]).find("img").length > 0 &&
                                              console.log(
                                                  "ADD 1:" +
                                                      getFbImageName(
                                                          $(inputsPhoto[totalPostsProcessed])
                                                              .find("img")[0]
                                                              .getAttribute("src")
                                                      )
                                              ),
                                          $(inputsPhoto[totalPostsProcessed]).find("img._8u9x,img._8u9w,img._8oii")
                                              .length > 0 &&
                                          $(inputsPhoto[totalPostsProcessed])
                                              .find("img._8u9x,img._8u9w,img._8oii")[0]
                                              .getAttribute("src").length > 3
                                              ? (debug &&
                                                    console.log(
                                                        "ADD 1:" +
                                                            $(inputsPhoto[totalPostsProcessed])
                                                                .find("img._8u9x,img._8u9w,img._8oii")[0]
                                                                .getAttribute("src")
                                                    ),
                                                creatorStudioPostOpenedForScrollArray[0].push(
                                                    getFbImageName(
                                                        $(inputsPhoto[totalPostsProcessed])
                                                            .find("img._8u9x,img._8u9w,img._8oii")[0]
                                                            .getAttribute("src")
                                                    )
                                                ))
                                              : $(inputsPhoto[totalPostsProcessed]).find("img").length > 0
                                                ? creatorStudioPostOpenedForScrollArray[0].push(
                                                      getFbImageName(
                                                          $(inputsPhoto[totalPostsProcessed])
                                                              .find("img")[0]
                                                              .getAttribute("src")
                                                      )
                                                  )
                                                : creatorStudioPostOpenedForScrollArray[0].push(""),
                                          debug &&
                                              console.log(
                                                  "ADD 2:" +
                                                      $(inputsPhoto[totalPostsProcessed])
                                                          .find(
                                                              ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60"
                                                          )
                                                          .first()
                                                          .text()
                                              ),
                                          $(inputsPhoto[totalPostsProcessed]).find(
                                              ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60"
                                          ).length > 0
                                              ? (debug &&
                                                    console.log(
                                                        "ADD 2:" +
                                                            $(inputsPhoto[totalPostsProcessed])
                                                                .find(
                                                                    ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60"
                                                                )
                                                                .first()
                                                                .text()
                                                    ),
                                                creatorStudioPostOpenedForScrollArray[1].push(
                                                    $(inputsPhoto[totalPostsProcessed])
                                                        .find(
                                                            ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60"
                                                        )
                                                        .first()
                                                        .text()
                                                ))
                                              : creatorStudioPostOpenedForScrollArray[1].push(""),
                                          window.location.href.indexOf("/creatorstudio") > 0 &&
                                              ($(inputsPhoto[totalPostsProcessed]).find("._1mxi ._4ik4._4ik5").length >
                                              0
                                                  ? (debug &&
                                                        console.log(
                                                            "ADD 4:" +
                                                                $(inputsPhoto[totalPostsProcessed])
                                                                    .find("._1mxi ._4ik4._4ik5")
                                                                    .first()
                                                                    .text()
                                                        ),
                                                    creatorStudioPostOpenedForScrollArray[3].push(
                                                        $(inputsPhoto[totalPostsProcessed])
                                                            .find("._1mxi ._4ik4._4ik5")
                                                            .first()
                                                            .text()
                                                    ))
                                                  : creatorStudioPostOpenedForScrollArray[3].push("")),
                                          debug &&
                                              console.log(
                                                  "ADD 3:" +
                                                      $(inputsPhoto[totalPostsProcessed])
                                                          .closest("._2e42")
                                                          .next()
                                                          .find("._8oim>span,._8oim ._8oij>span")
                                                          .first()
                                                          .text()
                                              ),
                                          (window.location.href.indexOf("/content_management") > 0 ||
                                              window.location.href.indexOf("/latest/posts") > 0 ||
                                              window.location.href.indexOf("/insights") > 0 ||
                                              window.location.href.indexOf("/latest/ad_center") > 0 ||
                                              window.location.href.indexOf("/publishing_tools") > 0) &&
                                          $(inputsPhoto[totalPostsProcessed]).closest("._2e42").length &&
                                          $(inputsPhoto[totalPostsProcessed]).closest("._2e42").next().length > 0 &&
                                          $(inputsPhoto[totalPostsProcessed])
                                              .closest("._2e42")
                                              .next()
                                              .find("._8oim>span,._8oim ._8oij>span").length > 0
                                              ? (debug &&
                                                    console.log(
                                                        "ADD 3:" +
                                                            $(inputsPhoto[totalPostsProcessed])
                                                                .closest("._2e42")
                                                                .next()
                                                                .find("._8oim>span,._8oim ._8oij>span")
                                                                .first()
                                                                .text()
                                                    ),
                                                creatorStudioPostOpenedForScrollArray[2].push(
                                                    $(inputsPhoto[totalPostsProcessed])
                                                        .closest("._2e42")
                                                        .next()
                                                        .find("._8oim>span,._8oim ._8oij>span")
                                                        .first()
                                                        .text()
                                                ))
                                              : creatorStudioPostOpenedForScrollArray[2].push("")),
                                      debug && console.log("AAAA:" + inputsPhoto.length),
                                      debug && console.log("~~ CLICK 10"),
                                      inputsPhoto[totalPostsProcessed].click(),
                                      debug && console.log("Click on the POST in the list"),
                                      totalPostsProcessed++,
                                      publishingToolTotPost++,
                                      normal_run_limitNoInvitePosts >= 0
                                          ? normal_run_limitNoInvitePosts++
                                          : (normal_run_limitNoInvitePosts = 0),
                                      updatePopup(),
                                      (checkTwice = 0),
                                      (TimerDelayVar1 = setTimeout(function () {
                                          PausedoPHOTO2();
                                      }, fb_timeout_1)))
                                    : (debug && console.log("~~ CLICK AAA9"),
                                      debug &&
                                          console.log(
                                              "WE SKIP THIS POST:" +
                                                  getFbImageName(
                                                      $(inputsPhoto[totalPostsProcessed])
                                                          .find("img")[0]
                                                          .getAttribute("src")
                                                  )
                                          ),
                                      debug &&
                                          $(inputsPhoto[totalPostsProcessed]).find("img._8u9x,img._8u9w,img._8oii,img")
                                              .length > 0 &&
                                          console.log(
                                              "We have already this img" +
                                                  $(inputsPhoto[totalPostsProcessed])
                                                      .find("img._8u9x,img._8u9w,img._8oii,img")[0]
                                                      .getAttribute("src")
                                          ),
                                      postsIgnoredInArrowToStopScript++,
                                      totalPostsProcessed++,
                                      normal_run_limitNoInvitePosts >= 0
                                          ? normal_run_limitNoInvitePosts++
                                          : (normal_run_limitNoInvitePosts = 0),
                                      doPHOTO()))
                            : (debug && console.log("No likes for current photo, go to next one"),
                              totalPostsProcessed++,
                              publishingToolTotPost++,
                              normal_run_limitNoInvitePosts >= 0
                                  ? normal_run_limitNoInvitePosts++
                                  : (normal_run_limitNoInvitePosts = 0),
                              doPHOTO())
                      : window.location.href.indexOf("/latest/inbox/facebook") > -1 &&
                          ((checkTwice < 5 && publishingTabNumber < 7) ||
                              (lastItemsInArray != inboxTabArrayProcessedIds.length && checkTwice < 2))
                        ? (checkTwice++,
                          (lastItemsInArray = inboxTabArrayProcessedIds.length),
                          getElem(".QQQQQQQQQQfdfdfd" + server_inbox_scroll_list).length > 0 &&
                              (publishingTabNumber < 5
                                  ? inboxUselessScannedPosts > 5
                                      ? getElem(".QQQQQQQQQQfdfdfd" + server_inbox_scroll_list).scrollTop(
                                            getElem(
                                                'div[data-pagelet="BizP13NInboxCommentListView"]>div>div,._4bl7' +
                                                    server_inbox_scroll_list
                                            )
                                                .eq(0)
                                                .height() *
                                                (0.3 * publishingTabNumber)
                                        )
                                      : getElem(".QQQQQQQQQQfdfdfd" + server_inbox_scroll_list).scrollTop(
                                            getElem(
                                                'div[data-pagelet="BizP13NInboxCommentListView"]>div>div,._4bl7' +
                                                    server_inbox_scroll_list
                                            )
                                                .eq(0)
                                                .height() *
                                                (0.2 * publishingTabNumber)
                                        )
                                  : getElem(".QQQQQQQQQQfdfdfd" + server_inbox_scroll_list).scrollTop(99999999)),
                          (inboxUselessScannedPosts = 0),
                          (totalPostsProcessed = 0),
                          (publishingResetArray = !0),
                          publishingTabNumber++,
                          updatePopup(),
                          (timeout = 4e3),
                          9 == checkTwice && (timeout = 1e4),
                          (TimerDelayVar1 = setTimeout(function () {
                              doPHOTO();
                          }, timeout)))
                        : (debug && console.log("Try to scroll here old way?"),
                          MaxPostFound == totalPostsProcessed &&
                          ((window.location.href.indexOf("creatorstudio") > -1 && checkTwice >= 11) ||
                              (checkTwice >= 1 &&
                                  !isNotificationTab &&
                                  -1 == window.location.href.indexOf("/content_management") &&
                                  -1 == window.location.href.indexOf("/latest/posts") &&
                                  -1 == window.location.href.indexOf("/insights") &&
                                  -1 == window.location.href.indexOf("creatorstudio") &&
                                  -1 == window.location.href.indexOf("/latest/ad_center") &&
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
                                                      getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid").length -
                                                          1
                                                  ].scrollHeight > 2500 &&
                                                  publishingToolTotPost < 25)
                                                  ? (additionalCoefToScrollLess = 2)
                                                  : ((getElem(".ReactVirtualized__Grid._1zmk").length > 0 &&
                                                        getElem(".ReactVirtualized__Grid._1zmk")[0].scrollHeight >
                                                            8e3 &&
                                                        publishingToolTotPost < 50) ||
                                                        (getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")
                                                            .length > 0 &&
                                                            getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")[
                                                                getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")
                                                                    .length - 1
                                                            ].scrollHeight > 8e3 &&
                                                            publishingToolTotPost < 50)) &&
                                                    (additionalCoefToScrollLess = 3),
                                              8 == checkTwice &&
                                                  window.location.href.indexOf("creatorstudio") > -1 &&
                                                  $(window).scrollTop(9999999),
                                              getElem(
                                                  ".x78zum5>.x9f619>div.xh8yej3.xw2csxc" + server_load_more_photos_posts
                                              ).length > 0 &&
                                                  getElem(
                                                      ".x78zum5>.x9f619>div.xh8yej3.xw2csxc" +
                                                          server_load_more_photos_posts
                                                  ).scrollTop(99999999),
                                              checkTwice > 6 && window.location.href.indexOf("creatorstudio") > -1
                                                  ? ((getElem(".uiScrollableAreaWrap").length > 2 ||
                                                        getElem(".uiScrollableAreaWrap").length > 1 ||
                                                        getElem(".uiScrollableAreaWrap").length > 0) &&
                                                        getElem(".uiScrollableAreaWrap").scrollTop(9999999),
                                                    getElem(".ReactVirtualized__Grid._1zmk").length > 0
                                                        ? getElem(".ReactVirtualized__Grid._1zmk").scrollTop(9999999)
                                                        : getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")
                                                                .length > 0
                                                          ? getElem(
                                                                ".uiScrollableAreaWrap .ReactVirtualized__Grid"
                                                            ).scrollTop(9999999)
                                                          : getElem(
                                                                "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                            ).length > 0 &&
                                                            getElem(
                                                                "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                            ).scrollTop(9999999))
                                                  : ((getElem("._24tx").length > 0 &&
                                                        getElem("._24tx")[0].scrollHeight > 2500 &&
                                                        publishingToolTotPost < 25) ||
                                                    (getElem("._24tx").length > 0 &&
                                                        getElem("._24tx")[getElem("._24tx").length - 1].scrollHeight >
                                                            2500 &&
                                                        publishingToolTotPost < 25)
                                                        ? (additionalCoefToScrollLess = 2)
                                                        : ((getElem("._24tx").length > 0 &&
                                                              getElem("._24tx")[0].scrollHeight > 8e3 &&
                                                              publishingToolTotPost < 50) ||
                                                              (getElem("._24tx").length > 0 &&
                                                                  getElem("._24tx")[getElem("._24tx").length - 1]
                                                                      .scrollHeight > 8e3 &&
                                                                  publishingToolTotPost < 50)) &&
                                                          (additionalCoefToScrollLess = 3),
                                                    getElem(".uiScrollableAreaWrap").length > 2
                                                        ? getElem(".uiScrollableAreaWrap").scrollTop(
                                                              getElem(".uiScrollableAreaWrap")[2].scrollHeight *
                                                                  ((adsNewManagerScrollPartially /
                                                                      additionalCoefToScrollLess) *
                                                                      0.19)
                                                          )
                                                        : getElem(".uiScrollableAreaWrap").length > 1
                                                          ? getElem(".uiScrollableAreaWrap").scrollTop(
                                                                getElem(".uiScrollableAreaWrap")[1].scrollHeight *
                                                                    ((adsNewManagerScrollPartially /
                                                                        additionalCoefToScrollLess) *
                                                                        0.19)
                                                            )
                                                          : getElem(".uiScrollableAreaWrap").length > 0 &&
                                                            getElem(".uiScrollableAreaWrap").scrollTop(
                                                                getElem(".uiScrollableAreaWrap")[0].scrollHeight *
                                                                    ((adsNewManagerScrollPartially /
                                                                        additionalCoefToScrollLess) *
                                                                        0.19)
                                                            ),
                                                    getElem("._24tx").length > 0 &&
                                                        getElem("._24tx").scrollTop(
                                                            getElem("._24tx")[0].scrollHeight *
                                                                ((adsNewManagerScrollPartially /
                                                                    additionalCoefToScrollLess) *
                                                                    0.19)
                                                        ),
                                                    getElem(".ReactVirtualized__Grid._1zmk").length > 0
                                                        ? getElem(".ReactVirtualized__Grid._1zmk").scrollTop(
                                                              getElem(".ReactVirtualized__Grid._1zmk")[0].scrollHeight *
                                                                  ((adsNewManagerScrollPartially /
                                                                      additionalCoefToScrollLess) *
                                                                      0.19)
                                                          )
                                                        : getElem(".uiScrollableAreaWrap .ReactVirtualized__Grid")
                                                                .length > 0
                                                          ? getElem(
                                                                ".uiScrollableAreaWrap .ReactVirtualized__Grid"
                                                            ).scrollTop(
                                                                getElem(
                                                                    ".uiScrollableAreaWrap .ReactVirtualized__Grid"
                                                                )[
                                                                    getElem(
                                                                        ".uiScrollableAreaWrap .ReactVirtualized__Grid"
                                                                    ).length - 1
                                                                ].scrollHeight *
                                                                    ((adsNewManagerScrollPartially /
                                                                        additionalCoefToScrollLess) *
                                                                        0.19)
                                                            )
                                                          : getElem(
                                                                "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                            ).length > 0 &&
                                                            getElem(
                                                                "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                            ).scrollTop(
                                                                getElem(
                                                                    "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                                )[
                                                                    getElem(
                                                                        "#mediaManagerContentTable table,._9oa2 ._25b6 table"
                                                                    ).length - 1
                                                                ].scrollHeight *
                                                                    ((adsNewManagerScrollPartially /
                                                                        additionalCoefToScrollLess) *
                                                                        0.19)
                                                            )),
                                              debug && console.log("Scroll Creator Studio here"),
                                              (totalPostsProcessed = 0),
                                              (publishingResetArray = !0),
                                              publishingTabNumber++)
                                            : window.location.href.indexOf("/content_management") > 0 ||
                                                window.location.href.indexOf("/latest/posts") > 0 ||
                                                window.location.href.indexOf("/insights") > 0 ||
                                                window.location.href.indexOf("/latest/ad_center") > 0 ||
                                                getElem(
                                                    "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                                    ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                                ).length > 0
                                              ? (debug && console.log("Scroll BS here"),
                                                getElem(".i8xnqrtw table").length > 0 &&
                                                    getElem(".i8xnqrtw table").scrollTop(99999999),
                                                getElem(
                                                    ".x78zum5>.x9f619>div.xh8yej3.xw2csxc" +
                                                        server_load_more_photos_posts
                                                ).length > 0 &&
                                                    getElem(
                                                        ".x78zum5>.x9f619>div.xh8yej3.xw2csxc" +
                                                            server_load_more_photos_posts
                                                    ).scrollTop(99999999),
                                                adsNewManagerScrollPartially < 12 &&
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
                                                              getElem("._3vo_ .ReactVirtualized__Grid")[1]
                                                                  .scrollHeight *
                                                                  (0.2 * adsNewManagerScrollPartially)
                                                          ))
                                                    : (getElem("._3vo_ .ReactVirtualized__Grid").length > 0 &&
                                                          getElem("._3vo_ .ReactVirtualized__Grid").scrollTop(99999999),
                                                      getElem(
                                                          ".i8xnqrtw .b6ax4al1.mfclru0v.pytsy3co.ba4ynyj4.mm05nxu8.l4uc2m3f,.pytsy3co .b6ax4al1.mfclru0v.pytsy3co.ba4ynyj4.mm05nxu8.l4uc2m3f" +
                                                              server_bs_scroll_list
                                                      ).length > 0 &&
                                                          getElem(
                                                              ".i8xnqrtw .b6ax4al1.mfclru0v.pytsy3co.ba4ynyj4.mm05nxu8.l4uc2m3f,.pytsy3co .b6ax4al1.mfclru0v.pytsy3co.ba4ynyj4.mm05nxu8.l4uc2m3f" +
                                                                  server_bs_scroll_list
                                                          ).scrollTop(99999999)),
                                                bsScrollNoReset ||
                                                    (-1 ==
                                                        window.location.href.indexOf("/latest/posts/published_posts") &&
                                                        (totalPostsProcessed = 0),
                                                    (publishingResetArray = !0),
                                                    publishingTabNumber++))
                                              : (debug && console.log("Scroll else here"),
                                                (publishingToolElem = getElem("._4sol ._4-u3 .rfloat ._51xa ._42ft"))
                                                    .length > 0
                                                    ? $(publishingToolElem[publishingToolElem.length - 1]).is(
                                                          "[disabled]"
                                                      )
                                                        ? setTimeout(function () {
                                                              tryClickToLoadMorePosts();
                                                          }, 900)
                                                        : (debug && console.log("~~ CLICK 11"),
                                                          publishingToolElem[publishingToolElem.length - 1].click(),
                                                          (totalPostsProcessed = 0),
                                                          (publishingResetArray = !0),
                                                          publishingTabNumber++)
                                                    : setTimeout(function () {
                                                          tryClickToLoadMorePosts();
                                                      }, 900))
                                        : (3 != runMode && 4 != runMode) || !try_after_limit
                                          ? (console.log("Stop, debug: 2"), stopScript())
                                          : (debug && console.log("next page 3"), open_next_page())
                                    : (debug && console.log("Scroll Else2 here"),
                                      (window.location.href.indexOf("&notif_t=") > 0 ||
                                          window.location.href.indexOf("?notif_t=") > 0) &&
                                      (getElem(scrollingNewFBDesignClassDef).length > 0 ||
                                          getElem(scrollingNewFBDesignClass).length > 0)
                                          ? (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                                                getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(55999944),
                                            getElem(scrollingNewFBDesignClass).length > 0 &&
                                                getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(55999944))
                                          : (window.location.href.indexOf("&notif_t=") > 0 ||
                                                  window.location.href.indexOf("?notif_t=") > 0 ||
                                                  window.location.href.indexOf("/notifications") > 0 ||
                                                  window.location.href.indexOf("/videos/") > 0) &&
                                              (getElem(
                                                  'div[role="navigation"]>.hybvsw6c>.q5bimw55,div[role="navigation"]>.oab4agdp>.r7ybg2qv' +
                                                      server_notif_scroll
                                              ).length > 0 ||
                                                  getElem('div[role="navigation"]>THISisWHENtheyCHANGEitALITTLE'))
                                            ? (getScrollElemNewFb(
                                                  'div[role="navigation"]>.hybvsw6c>.q5bimw55,div[role="navigation"]>.oab4agdp>.r7ybg2qv' +
                                                      server_notif_scroll
                                              ).scrollTop(200),
                                              setTimeout(function () {
                                                  getScrollElemNewFb(
                                                      'div[role="navigation"]>.hybvsw6c>.q5bimw55,div[role="navigation"]>.oab4agdp>.r7ybg2qv' +
                                                          server_notif_scroll
                                                  ).scrollTop(2e3);
                                              }, 1e3),
                                              setTimeout(function () {
                                                  getScrollElemNewFb(
                                                      'div[role="navigation"]>.hybvsw6c>.q5bimw55,div[role="navigation"]>.oab4agdp>.r7ybg2qv' +
                                                          server_notif_scroll
                                                  ).scrollTop(55999944);
                                              }, 1500))
                                            : 0 == selectedpostsRun
                                              ? (debug && console.log("Scroll try 1"),
                                                window.scrollTo(0, document.body.scrollHeight),
                                                setTimeout(function () {
                                                    tryClickToLoadMorePosts();
                                                }, 900))
                                              : (3 != runMode && 4 != runMode) || !try_after_limit
                                                ? (console.log("Stop, debug: 3"), stopScript())
                                                : (debug && console.log("next page 4"), open_next_page())),
                                updatePopup(),
                                (timeout = 4e3),
                                9 == checkTwice && (timeout = 1e4),
                                (TimerDelayVar1 = setTimeout(function () {
                                    doPHOTO();
                                }, timeout)))));
    }
}
function getFbImageName(e) {
    try {
        const t = new URL(e).pathname;
        return t.substring(t.lastIndexOf("/") + 1);
    } catch (t) {
        const n = e.split("?")[0];
        return n.substring(n.lastIndexOf("/") + 1);
    }
}
function checkIgnoreArrayNotifications(e) {
    for (i = 0; i < server_notif_ignore_listArr.length; i++)
        if (e.indexOf(server_notif_ignore_listArr[i]) > -1) return !1;
    return !0;
}
function verifyThisPostAlreadyScanned(e) {
    if (
        (debug && console.log("verify post scanned 0"),
        (($(e).find("img._8u9x,img._8u9w,img._8oii").length > 0 &&
            $(e).find("img._8u9x,img._8u9w,img._8oii")[0].getAttribute("src") &&
            $(e).find("img._8u9x,img._8u9w,img._8oii")[0].getAttribute("src").length > 3) ||
            (0 == $(e).find("img._8u9x,img._8u9w,img._8oii").length &&
                $(e).find("img").length > 0 &&
                $(e).find("img")[0].getAttribute("src") &&
                $(e).find("img")[0].getAttribute("src").length > 3)) &&
            (debug && console.log("verify post scanned 1"),
            (window.location.href.indexOf("/creatorstudio") > 0 ||
                window.location.href.indexOf("/content_management") > 0 ||
                window.location.href.indexOf("/latest/posts") > 0 ||
                window.location.href.indexOf("/insights") > 0 ||
                window.location.href.indexOf("/latest/ad_center") > 0 ||
                getElem("._68tl ._2eqm._3qn7._61-1._2fyi._3qng", ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng")
                    .length > 0) &&
                (debug && console.log("verify post scanned 2"),
                creatorStudioPostOpenedForScrollArray.length > 0 &&
                    creatorStudioPostOpenedForScrollArray[0].length > 0)))
    )
        for (
            debug && console.log("verify post scanned 3"), i = 0;
            i < creatorStudioPostOpenedForScrollArray[0].length;
            i++
        )
            if (
                (console.log(creatorStudioPostOpenedForScrollArray[0][i]),
                ($(e).find("img._8u9x,img._8u9w,img._8oii,img").length > 0 &&
                    creatorStudioPostOpenedForScrollArray[0][i] ==
                        getFbImageName($(e).find("img._8u9x,img._8u9w,img._8oii,img")[0].getAttribute("src"))) ||
                    (0 == $(e).find("img._8u9x,img._8u9w,img._8oii,img").length &&
                        $(e).find("img").length > 0 &&
                        creatorStudioPostOpenedForScrollArray[0][i] ==
                            getFbImageName($(e).find("img")[0].getAttribute("src"))))
            )
                if (
                    (debug && console.log("we have same image!"),
                    debug && console.log("verify post scanned 4: we have same image!"),
                    $(e).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").length > 0)
                ) {
                    if (
                        (debug && console.log("verify post scanned 5: we have a name"),
                        creatorStudioPostOpenedForScrollArray[1][i] ==
                            $(e).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").first().text())
                    )
                        if (window.location.href.indexOf("/creatorstudio") > 0) {
                            if (!($(e).find("._1mxi ._4ik4._4ik5").length > 0))
                                return debug && console.log("verify post scanned true 3"), !0;
                            if (
                                creatorStudioPostOpenedForScrollArray[3][i] ==
                                $(e).find("._1mxi ._4ik4._4ik5").first().text()
                            )
                                return debug && console.log("verify post scanned true 2"), !0;
                        } else if (
                            window.location.href.indexOf("/content_management") > 0 ||
                            window.location.href.indexOf("/latest/posts") > 0 ||
                            window.location.href.indexOf("/insights") > 0 ||
                            window.location.href.indexOf("/latest/ad_center") > 0 ||
                            (window.location.href.indexOf("/publishing_tools") > 0 &&
                                getElem(
                                    "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                    ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                ).length > 0)
                        ) {
                            if (
                                (debug && console.log("verify post scanned 10 check id"),
                                !(
                                    $(e).closest("._2e42").length &&
                                    $(e).closest("._2e42").next().length > 0 &&
                                    $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").length > 0
                                ))
                            )
                                return debug && console.log("verify post scanned true at the end!!!"), !0;
                            if (
                                creatorStudioPostOpenedForScrollArray[2][i] ==
                                $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").first().text()
                            )
                                return debug && console.log("id the same! so true!"), !0;
                        }
                } else if (window.location.href.indexOf("/creatorstudio") > 0) {
                    if (!($(e).find("._1mxi ._4ik4._4ik5").length > 0))
                        return debug && console.log("verify post scanned true 5"), !0;
                    if (creatorStudioPostOpenedForScrollArray[3][i] == $(e).find("._1mxi ._4ik4._4ik5").first().text())
                        return debug && console.log("verify post scanned true 4"), !0;
                } else if (
                    window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/insights") > 0 ||
                    window.location.href.indexOf("/latest/ad_center") > 0 ||
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
                        return window.location.href.indexOf("/latest/posts") > 0 ||
                            window.location.href.indexOf("/insights") > 0
                            ? ((bsScrollNoReset = !0), !1)
                            : (debug && console.log("verify post scanned true 7"), !0);
                    if (
                        creatorStudioPostOpenedForScrollArray[2][i] ==
                        $(e).closest("._2e42").next().find("._8oim>span,._8oim ._8oij>span").first().text()
                    )
                        return debug && console.log("verify post scanned true 6"), !0;
                }
    return !1;
}
function PausedoPHOTO2() {
    newNotificationScanInProgress
        ? setTimeout(function () {
              getElem('div[role="dialog"] div[role="button"]').filter(function () {
                  return 1 == $(this).find("div.s1i5eluu,div.akwz6i9j.pedkr2u6").length;
              }).length > 0
                  ? (debug && console.log("~~ CLICK 12"),
                    getElem('div[role="dialog"] div[role="button"]')
                        .filter(function () {
                            return 1 == $(this).find("div.s1i5eluu,div.akwz6i9j.pedkr2u6").length;
                        })[0]
                        .click(),
                    setTimeout(function () {
                        doPHOTO2();
                    }, 2e3))
                  : doPHOTO2();
          }, 500)
        : window.location.href.indexOf("latest/inbox/facebook") > 0
          ? (getElem(".qwewdsdeeewwww3" + server_inbox_addit_click).length > 0 &&
                getElem(".qwewdsdeeewwww3" + server_inbox_addit_click)[0].click(),
            setTimeout(function () {
                doPHOTO2();
            }, 2500))
          : doPHOTO2();
}
function inboxIdWasNotScannedAlready(e) {
    var t = 0;
    if (e.indexOf("selected_item_id=") > 0) {
        if (
            ((t = parseInt(new URLSearchParams(new URL(e).search).get("selected_item_id"))),
            !inboxTabArrayProcessedIds.includes(t))
        )
            return debug && console.log("Add ID=" + t), inboxTabArrayProcessedIds.push(t), !0;
        inboxUselessScannedPosts++,
            inboxTabArrayProcessedIds.length - inboxTabArrayProcessedIds.indexOf(t) > 1 &&
                ((totalPostsProcessed =
                    totalPostsProcessed +
                    (inboxTabArrayProcessedIds.length - inboxTabArrayProcessedIds.indexOf(t)) -
                    1),
                (inboxUselessScannedPosts =
                    inboxUselessScannedPosts +
                    (inboxTabArrayProcessedIds.length - inboxTabArrayProcessedIds.indexOf(t)) -
                    1),
                debug &&
                    console.log(
                        "We skip some feature posts already in the list:" +
                            (inboxTabArrayProcessedIds.length - inboxTabArrayProcessedIds.indexOf(t) - 1)
                    )),
            debug && console.log("ID already in the list=" + t);
    }
    return !1;
}
var weCanDoIt = !0;
function doPHOTO2() {
    if (
        1 == scriptIsRunning &&
        (debug && console.log("doPHOTO2"),
        (weCanDoIt = !0),
        debug && console.log("Length elab array:" + inboxTabArrayProcessedIds.length),
        window.location.href.indexOf("/latest/inbox/facebook") > 0 &&
            (inboxIdWasNotScannedAlready(window.location.href)
                ? (debug && console.log("~~ CLICK Inbox1"), (weCanDoIt = !0))
                : (debug && console.log("GO TO NEXT Here Inbox1"),
                  (weCanDoIt = !1),
                  setTimeout(function () {
                      ClosePostAndOpenNext(-1);
                  }, 10))),
        weCanDoIt)
    )
        if (
            (debug && console.log("we can do it! SCAN!"),
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
                window.location.href.indexOf("/insights") > 0 ||
                window.location.href.indexOf("/latest/ad_center") > 0 ||
                (window.location.href.indexOf("/publishing_tools") > 0 &&
                    getElem(
                        "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                        ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                    ).length > 0)) &&
                1 == getElem("._7fc8").length &&
                (pageNameAdditionalCheck = getElem("._7fc8").text()),
            debug && console.log("likes btnh here 1: " + inputsPhoto2.length),
            publishingToolInv &&
                ((inputsPhoto2 = getElem(
                    "QQQQtest" + server_new_like_block,
                    ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor
                )),
                debug && console.log("likes btnh here 2: " + inputsPhoto2.length),
                0 == inputsPhoto2.length &&
                    (inputsPhoto2 = getElem(
                        "QQQQtest" + server_new_like_block,
                        ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor
                    )),
                debug && console.log("likes btnh here 3: " + inputsPhoto2.length),
                0 == inputsPhoto2.length && (inputsPhoto2 = getElem("._3dlg ._3dlh")),
                debug && console.log("likes btnh here 4: " + inputsPhoto2.length),
                0 == inputsPhoto2.length &&
                    getElem(".fbPhotoSnowliftContainer ._6iib ._3dlh", ".hidden_elem ._3dlh,._3dli._3dlh").length > 0 &&
                    (inputsPhoto2 = getElem(
                        ".fbPhotoSnowliftContainer ._6iib ._3dlh",
                        ".hidden_elem ._3dlh,._3dli._3dlh"
                    ))),
            debug && console.log("likes btnh here 5: " + inputsPhoto2.length),
            isNotificationTab &&
                ((inputsPhoto2 = getElem(".UFILikeSentence ._3t53 ._1g5v,._4t2a ._3t53 ._1g5v", ".hidden_elem ._1g5v")),
                debug && console.log("likes btnh here 6: " + inputsPhoto2.length),
                0 == inputsPhoto2.length &&
                    (inputsPhoto2 = getElem(
                        "._66lg ._3dlf ._3dlh._3dli" + server_new_like_block,
                        ".hidden_elem ._3dlh" + server_main_like_to_clickIgnor
                    )),
                debug && console.log("likes btnh here 7: " + inputsPhoto2.length),
                0 == inputsPhoto2.length &&
                    (inputsPhoto2 = getElem(
                        "._66lg ._3dlf ._3dlh._3dli" + server_new_like_block,
                        ".hidden_elem ._3dlh" + server_main_like_to_clickIgnor
                    )),
                debug && console.log("likes btnh here 8: " + inputsPhoto2.length)),
            debug && console.log("likes btnh here 9: " + inputsPhoto2.length),
            inputsPhoto2 &&
                inputsPhoto2[0] &&
                (publishingToolInv || (!publishingToolInv && lastphotoOpen != inputsPhoto2.length)))
        ) {
            if (
                ((lastphotoOpen = inputsPhoto2.length),
                getElem(
                    '._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]' +
                        server_bs_view_on_fb_item
                ).length > 0)
            )
                api.runtime.sendMessage({ type: "maybeTabWillBeOpened", tab_ID: tab_ID }, function (e) {}),
                    setTimeout(function () {
                        debug && console.log("~~ CLICK 15"),
                            getElem(
                                '._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]' +
                                    server_bs_view_on_fb_item
                            )
                                .last()[0]
                                .click();
                    }, 500),
                    (TimerDelayVar1 = setTimeout(function () {
                        pauseScriptDueToSeparateTabScanning || newStatsDesignCreatorStudio(0);
                    }, 5e3));
            else if (
                !skip_Invite &&
                (window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/insights") > 0 ||
                    window.location.href.indexOf("/latest/ad_center") > 0) &&
                getElem('.i8xnqrtw a[role="link"][target="_blank"],.dhycqfdu a[role="link"][target="_blank"]').filter(
                    function () {
                        return $(this).find(".if5qj5rh").length > 0;
                    }
                ).length > 0 &&
                getElem('.i8xnqrtw a[role="link"][target="_blank"],.dhycqfdu a[role="link"][target="_blank"]')
                    .filter(function () {
                        return $(this).find(".if5qj5rh").length > 0;
                    })
                    .attr("href").length > 1 &&
                0 ==
                    getElem(
                        ".qqqqTestQ" + server_new_like_block,
                        ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor
                    ).length &&
                !scan_current_tab_business_suite
            )
                doINeedInviteOrJustSharedPosts() &&
                    scanInvitesInNewTab(
                        getElem('.i8xnqrtw a[role="link"][target="_blank"],.dhycqfdu a[role="link"][target="_blank"]')
                            .filter(function () {
                                return $(this).find(".if5qj5rh").length > 0;
                            })
                            .attr("href")
                    );
            else if (doINeedInviteOrJustSharedPosts()) {
                getElem(".qqqqTestQ" + server_new_like_block, ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor)
                    .length > 0 &&
                    (inputsPhoto2 = getElem(
                        ".qqqqTestQ" + server_new_like_block,
                        ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor
                    ));
                var e = fb_timeout_1;
                newNotificationScanInProgress
                    ? (debug && console.log("~~ CLICK 13"), (e += clickLikeButtonsInsideContainer(inputsPhoto2[0])))
                    : (debug && console.log("~~ CLICK 14"),
                      (e += clickLikeButtonsInsideContainer(inputsPhoto2[inputsPhoto2.length - 1]))),
                    (TimerDelayVar1 = setTimeout(function () {
                        StartInvitePeople();
                    }, e));
            }
        } else
            publishingToolInv && !isNotificationTab
                ? getElem(
                      '._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]' +
                          server_bs_view_on_fb_item
                  ).length > 0
                    ? (api.runtime.sendMessage({ type: "maybeTabWillBeOpened", tab_ID: tab_ID }, function (e) {}),
                      setTimeout(function () {
                          debug && console.log("~~ CLICK 15"),
                              getElem(
                                  '._98ry ._738z ._6np5,.nbrxg16q ul.gvyo0ga7 .s7wjoji2 div[role="button"]' +
                                      server_bs_view_on_fb_item
                              )
                                  .last()[0]
                                  .click();
                      }, 500),
                      (TimerDelayVar1 = setTimeout(function () {
                          pauseScriptDueToSeparateTabScanning || newStatsDesignCreatorStudio(0);
                      }, 5e3)))
                    : getElem('._98ry ._738z ._6np5,.xavht8x div[role="listitem"].x1n2onr6').filter(function () {
                            return (
                                $(this).find("div.x8t9es0").length > 0 &&
                                "View on Facebook" == $(this).find("div.x8t9es0").text()
                            );
                        }).length > 0
                      ? (api.runtime.sendMessage({ type: "maybeTabWillBeOpened", tab_ID: tab_ID }, function (e) {}),
                        setTimeout(function () {
                            debug && console.log("~~ CLICK 15b"),
                                getElem('._98ry ._738z ._6np5,.xavht8x div[role="listitem"].x1n2onr6')
                                    .filter(function () {
                                        return (
                                            $(this).find("div.x8t9es0").length > 0 &&
                                            "View on Facebook" == $(this).find("div.x8t9es0").text()
                                        );
                                    })
                                    .find('div[role="button"]')[0]
                                    .click();
                        }, 500))
                      : (inputsPhoto2 = getElem(
                              "._fjd ._5vx2 ._43o4 ._45hc",
                              "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                          )) &&
                          inputsPhoto2[0] &&
                          checkOnceVideoPost
                        ? (debug && console.log("~~ CLICK 16"),
                          $(inputsPhoto2[0]).find("._fjc")[0].click(),
                          setTimeout(function () {
                              $(inputsPhoto2[0]).find("._fjc")[0].click();
                          }, 1e3),
                          (checkOnceVideoPost = !1),
                          (TimerDelayVar1 = setTimeout(function () {
                              PausedoPHOTO2();
                          }, 7e3)))
                        : (inputsPhoto2 = getElem(
                                "._u0y ._1gd5 ._4h2x ._5194",
                                ".hidden_elem ._u0y ._1gd5 ._4h2x ._5194"
                            )) &&
                            inputsPhoto2[0] &&
                            checkOnceVideoPost
                          ? (debug && console.log("~~ CLICK 17"),
                            inputsPhoto2[0].click(),
                            (TimerDelayVar1 = setTimeout(function () {
                                (inputsPhoto2 = getElem(
                                    "._fjd ._5vx2 ._43o4 ._45hc",
                                    "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                                )) &&
                                inputsPhoto2[0] &&
                                checkOnceVideoPost
                                    ? (debug && console.log("~~ CLICK 18"),
                                      $(inputsPhoto2[0]).find("._fjc")[0].click(),
                                      setTimeout(function () {
                                          $(inputsPhoto2[0]).find("._fjc")[0].click();
                                      }, 1e3),
                                      (checkOnceVideoPost = !1),
                                      (TimerDelayVar1 = setTimeout(function () {
                                          PausedoPHOTO2();
                                      }, 7e3)))
                                    : (debug && console.log("GO TO NEXT Here 1"), ClosePostAndOpenNext(-1));
                            }, 7e3)))
                          : (debug && console.log("GO TO NEXT Here 2"), ClosePostAndOpenNext(-1))
                : isNotificationTab
                  ? (debug && console.log("GO TO NEXT Here 3"), ClosePostAndOpenNext(-1))
                  : doPHOTO();
}
function clickLikeButtonsInsideContainer(e, t) {
    if (!e) return 0;
    var n,
        o = t ? 2e3 : 5e3,
        i = t ? 3e3 : 9e3;
    try {
        n = $(e)
            .find(".QQQQtest" + server_new_like_total_number)
            .not(".QQQtestnot" + server_new_like_total_numberIgnor)
            .first();
    } catch (e) {}
    if (n.length > 0) return n.click(), 0;
    var s = $(e)
        .find(".QQQQtest" + server_new_like_reaction)
        .first();
    return (
        s.length && s[0].click(),
        setTimeout(() => {
            var e = $(
                'div[role="dialog"] div[aria-orientation="horizontal"][role="tablist"] div[role="tab"][aria-hidden="false"]'
            ).first();
            e.length && e[0].click();
        }, o),
        i
    );
}
function doINeedInviteOrJustSharedPosts() {
    return (
        !skip_Invite ||
        (((document.location.href.indexOf("/videos/") > 0 ||
            document.location.href.indexOf("/events/") > 0 ||
            document.location.href.indexOf("/adsmanager/pages") > 0 ||
            document.location.href.indexOf("/content_management") > 0 ||
            document.location.href.indexOf("/latest/posts") > 0 ||
            document.location.href.indexOf("/insights") > 0 ||
            document.location.href.indexOf("/latest/ad_center") > 0 ||
            3 == runMode ||
            4 == runMode ||
            (document.location.href.indexOf("/posts/") > 0 &&
                document.location.href.indexOf("/business.facebook.com/") > 0 &&
                "postPage" != do_not_check_who_comments2) ||
            (1 == isPhotoInviting && publishingToolInv)) &&
            ((share_put_likes && share_likes_limit > total_shared_posts_liked && 0 == sharedPostIsCheckingNow) ||
                (share_put_comments &&
                    text_comm_shares.length > 1 &&
                    total_shared_posts_commented < share_comments_limit &&
                    0 == sharedPostIsCheckingNow) ||
                (((inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr)) &&
                    mtotalInvited < fb_limit &&
                    0 == sharedPostIsCheckingNow))) ||
        ((3 == runMode || 4 == runMode) &&
            ((inviteDuringShareCheck && "pro" != psscr) ||
                (inviteDuringShareCheck2 && "pro" != psscr) ||
                (likeSharedComments && "pro" != psscr) ||
                share_put_likes ||
                (share_put_comments && text_comm_shares.length > 1)) &&
            (getElem(
                'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                    server_bs_shared_posts_btn
            ).length > 0 ||
                (0 ==
                    getElem(
                        'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                            server_bs_shared_posts_btn
                    ).length &&
                    getElem("._355t._4vn2 ._3rwx").length > 0) ||
                getElem('div[role="button"]').filter(function () {
                    return (
                        ($(this).find("span").text().indexOf("shares") > 0 &&
                            $(this).find("span").text().indexOf("shares") < 6) ||
                        ($(this).find("span").text().indexOf("Shares") > 0 &&
                            $(this).find("span").text().indexOf("Shares") < 6)
                    );
                }).length > 0) &&
            ((share_put_likes && share_likes_limit > total_shared_posts_liked && 0 == sharedPostIsCheckingNow) ||
                (share_put_comments &&
                    text_comm_shares.length > 1 &&
                    total_shared_posts_commented < share_comments_limit &&
                    0 == sharedPostIsCheckingNow) ||
                (((inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr)) &&
                    mtotalInvited < fb_limit &&
                    0 == sharedPostIsCheckingNow)))
            ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
                  (debug && console.log("~~ CLICK 19"),
                  getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
                      getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
                  ].click()),
              getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                  (debug && console.log("~~ CLICK 20"), getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click()),
              closeInviteWindowInNewUI(),
              (loadsWithNoWorkOnShares = 0),
              ((inviteDuringShareCheck && "pro" != psscr) ||
                  (inviteDuringShareCheck2 && "pro" != psscr) ||
                  (likeSharedComments && "pro" != psscr)) &&
                  ((clickedForMore = 0),
                  (canSKIPButton = 0),
                  (hadInvitedButton = 0),
                  (hadClickedMoreButton = 0),
                  (loopmaxtry = 0),
                  (uiMorePagerPrimary = 0),
                  (likeButtonsProcessed = 0)),
              console.log("click doSHAREDposts 1"),
              (TimerDelayVar1 = setTimeout(function () {
                  doSHAREDposts();
              }, 4e3)))
            : setTimeout(function () {
                  closeAnyErrorAndGoToNextPost(-1, !1);
              }, 500),
        !1)
    );
}
function newStatsDesignCreatorStudio(e) {
    1 != scriptIsRunning ||
        pauseScriptDueToSeparateTabScanning ||
        ((inputsPhoto2 = getElem("._fjd ._5vx2 ._43o4 ._45hc", "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc")) &&
        inputsPhoto2[0] &&
        checkOnceVideoPost
            ? (debug && console.log("~~ CLICK 21"),
              $(inputsPhoto2[0]).find("._fjc")[0].click(),
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
              ? (debug && console.log("~~ CLICK 22"),
                inputsPhoto2[0].click(),
                (TimerDelayVar1 = setTimeout(function () {
                    (inputsPhoto2 = getElem(
                        "._fjd ._5vx2 ._43o4 ._45hc",
                        "._fjd ._5vx2 ._43o4 ._5vwy,.hidden_elem ._45hc"
                    )) &&
                    inputsPhoto2[0] &&
                    checkOnceVideoPost
                        ? (debug && console.log("~~ CLICK 23"),
                          $(inputsPhoto2[0]).find("._fjc")[0].click(),
                          setTimeout(function () {
                              $(inputsPhoto2[0]).find("._fjc")[0].click();
                          }, 1e3),
                          (checkOnceVideoPost = !1),
                          (TimerDelayVar1 = setTimeout(function () {
                              doPHOTO2();
                          }, 7e3)))
                        : (debug && console.log("GO TO NEXT Here 4"), ClosePostAndOpenNext(-1));
                }, 7e3)))
              : e > 8
                ? (debug && console.log("GO TO NEXT Here 5"), ClosePostAndOpenNext(-1))
                : (TimerDelayVar1 = setTimeout(function () {
                      newStatsDesignCreatorStudio(e + 1);
                  }, 5e3)));
}
function doPHOTO3s() {
    (totalPostsProcessed = 0),
        publishingToolInv &&
            (getElem(".layerCancel").length > 1 &&
                (debug && console.log("~~ CLICK 24"), getElem(".layerCancel")[1].click()),
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
              ? (debug && console.log("~~ CLICK 25"),
                inputsPhoto2[totalPostsProcessed].click(),
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
function getAddFriendSelectors(e) {
    var t = getCurrentFbLang();
    return (fbInviteBtnArray[t] && fbInviteBtnArray[t].addFriend ? fbInviteBtnArray[t].addFriend : ["Add Friend"])
        .map(function (t) {
            return (e ? e + " " : "") + 'span:contains("' + t + '")';
        })
        .join(",");
}
function do1() {
    if ((debug && console.log("do1"), (weScanPhotosTab = !1), destroyPopupInfo(), 1 == (scriptIsRunning = 1))) {
        weAreScanningOnlyShared = !1;
        var e = 0,
            t = !1;
        if (
            (0 == e &&
                window.location.href.indexOf("m.facebook.com") > 0 &&
                (getElem("._1uja").length > 0 || getElem('div[aria-label="Invite"]').length > 0) &&
                (debug && console.log("We are on mobile version!"),
                (e = 1),
                document.getElementById("add-all-div-sw") && n && destroyPopup(),
                createPopup(),
                (weAreScanningOnlyInvites = !0),
                (fmob = !0),
                StartInvitePeople()),
            0 == e &&
                (window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                    window.location.href.indexOf("/creatorstudio?tab=home") > 0) &&
                ((e = 1), stopScript(api.i18n.getMessage("creator_studio_home_error"))),
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
                    0 ==
                        getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(
                            function () {
                                return "false" == $(this).attr("aria-checked");
                            }
                        ).length &&
                    0 ==
                        getElem(
                            '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0,div[role="dialog"] .p8bdhjjv',
                            "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
                        ).length &&
                    confirm(api.i18n.getMessage("confirm_likers_list")) &&
                    ((e = 1),
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    (weAreScanningOnlyInvites = !0),
                    StartInvitePeople())),
            0 == e &&
                getElem(
                    '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0,div[role="dialog"] .p8bdhjjv' +
                        server_shared_items,
                    "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
                ).length > 0 &&
                0 ==
                    getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(
                        function () {
                            return "false" == $(this).attr("aria-checked");
                        }
                    ).length &&
                0 == getElem(".qwerrfefee" + server_inv_friends_list).length &&
                3 != runMode &&
                4 != runMode &&
                ((inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr) ||
                    share_put_likes ||
                    (share_put_comments && text_comm_shares.length > 1)))
        )
            if (
                confirm(
                    api.i18n
                        .getMessage("confirm_shared_posts_scan")
                        .replace(/%s/g, ((r = [getCurrentPageTitle()]), () => r.shift()))
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
        if (0 == e)
            if (
                0 == share_put_likes &&
                0 == inviteDuringShareCheck &&
                0 == inviteDuringShareCheck2 &&
                0 == likeSharedComments &&
                (text_comm_shares.length < 2 || !share_put_comments) &&
                1 == skip_Invite
            )
                alert(api.i18n.getMessage("invite_like_disabled")), destroyPopup(), (scriptIsRunning = 0);
            else if (
                (1 == share_put_likes ||
                    (share_put_comments && text_comm_shares.length > 1) ||
                    (inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr)) &&
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
                -1 == window.location.href.indexOf("/insights") &&
                -1 == window.location.href.indexOf("/latest/ad_center") &&
                -1 == window.location.href.indexOf("/videos/") &&
                -1 == window.location.href.indexOf("/photo/") &&
                -1 == window.location.href.indexOf("/creatorstudio") &&
                -1 == window.location.href.indexOf("/latest/posts") &&
                -1 == window.location.href.indexOf("/insights") &&
                -1 == window.location.href.indexOf("/latest/ad_center")
            )
                alert(api.i18n.getMessage("only_shared_posts_enabled")), destroyPopup(), (scriptIsRunning = 0);
            else if (
                ((document.location.href.indexOf("/posts/?") > 0 ||
                    (getElem("._2yaa._2yap").length > 0 &&
                        ("tab_posts" == getElem("._2yaa._2yap").attr("data-key") ||
                            "tab_home" == getElem("._2yaa._2yap").attr("data-key") ||
                            "Discussion" == getElem("._2yaa._2yap").attr("title")))) &&
                    3 != runMode &&
                    4 != runMode &&
                    alert(api.i18n.getMessage("run_in_supported_tabs")),
                loop_PostsList.length > 0 &&
                    (loop_PostsListArray = loop_PostsList.split(",").map(function (e) {
                        return Number(e.trim());
                    })),
                getElem(".fbProfileBrowser .fbProfileBrowserListContainer .fbProfileBrowserListItem").length > 0)
            ) {
                debug && console.log("We have friends list here!");
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
                debug && console.log("new friends list here!");
                n = null;
                setTimeout(function () {
                    inviteFriendsNEW();
                }, 100);
            } else if (
                getElem(
                    'div[role="dialog"] .x78zum5 div[role="checkbox"]' +
                        server_inv_friends_list.replace(':not([aria-disabled="true"])', "")
                ).filter(function () {
                    return "false" == $(this).attr("aria-checked");
                }).length > 0
            ) {
                debug && console.log("Invite friends new 2020!");
                n = null;
                setTimeout(function () {
                    inviteFriendsNew2020(0);
                }, 100);
            } else if (
                getElem(".ffdfsdfsfsdf" + server_inv_friends_list.replace(':not([aria-disabled="true"])', "")).length >
                    10 &&
                document.location.href.indexOf("/events") > -1
            ) {
                debug && console.log("Invite EVENTS new 2024!");
                n = null;
                setTimeout(function () {
                    (friends_skip_nr = 0), inviteFriendsNew2024(0);
                }, 100);
            } else if (getElem('.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]').length > 5) {
                debug && console.log("Invite from INVITE button in Business Studio, 2026");
                n = null;
                setTimeout(function () {
                    (friends_skip_nr = 1), inviteInviteButton2026(0);
                }, 100);
            } else if (
                (debug && console.log("More checks in do1"),
                getElem("#content_container ._2eec ._3x2f .rfloat ._4crj").length > 0)
            )
                debug && console.log("Foto page!!!!!"),
                    (isPhotoInviting = 1),
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    (totalPostsProcessed = skip_post_setting) > 1 && totalPostsProcessed--,
                    tryToCloseIfSomethingOpen2(),
                    setTimeout(function () {
                        doPHOTO();
                    }, 500);
            else if (getElem("._3h1j ._1gda ._3pzj ._4h2m ._4h2x._4lge ._2pir", ".hidden_elem ._2pir").length > 0)
                debug && console.log("Page manager tool is here!"),
                    debug && console.log("page manager tool"),
                    (publishingToolInv = !0),
                    (isPhotoInviting = 1),
                    skip_post_setting < 25 && (totalPostsProcessed = skip_post_setting),
                    totalPostsProcessed > 1 && totalPostsProcessed--,
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    tryToCloseIfSomethingOpen2(),
                    setTimeout(function () {
                        doPHOTO();
                    }, 500);
            else if (
                (window.location.href.indexOf("/creatorstudio") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/insights") > 0 ||
                    window.location.href.indexOf("/latest/ad_center") > 0 ||
                    window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/publishing_tools") > 0) &&
                (getElem("table tr._2zxd._2zyc,._1ug5", ".hidden_elem tr._2zxd._2zyc,.hidden_elem ._1ug5").length > 0 ||
                    getElem(
                        "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                        ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                    ).filter(function () {
                        return $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").length > 0;
                    }).length > 0)
            )
                debug && console.log("Creator studio here?"),
                    debug && console.log("crator studio scan"),
                    (publishingToolInv = !0),
                    (isPhotoInviting = 1),
                    skip_post_setting < 10 && (totalPostsProcessed = skip_post_setting),
                    totalPostsProcessed > 1 && totalPostsProcessed--,
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    tryToCloseIfSomethingOpen2(),
                    setTimeout(function () {
                        doPHOTO();
                    }, 500);
            else if (
                (window.location.href.indexOf("/creatorstudio") > 0 ||
                    window.location.href.indexOf("/latest/posts") > 0 ||
                    window.location.href.indexOf("/insights") > 0 ||
                    window.location.href.indexOf("/latest/ad_center") > 0 ||
                    window.location.href.indexOf("/content_management") > 0 ||
                    window.location.href.indexOf("/publishing_tools") > 0) &&
                (getElem('table td[aria-colindex="2"],div[role="cell"]').filter(function () {
                    return $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.h07fizzr").length > 0;
                }).length > 0 ||
                    getElem(".QQQQFFeerefef" + server_bs_posts).length > 0 ||
                    getElem('table td[aria-colindex="2"]' + server_bs_second_posts).filter(function () {
                        return (
                            $(this).find(
                                ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60" +
                                    server_bs_second_posts_filter
                            ).length > 0
                        );
                    }).length > 0 ||
                    getElem(
                        "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                        ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                    ).filter(function () {
                        return $(this).find(".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60").length > 0;
                    }).length > 0)
            )
                debug && console.log("2022 business suite"),
                    (publishingToolInv = !0),
                    (isPhotoInviting = 1),
                    getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l').length > 0 &&
                    -1 == window.location.href.indexOf("tab=inbox_plus") &&
                    (window.location.href.indexOf("latest/posts") > -1 || window.location.href.indexOf("insights") > -1)
                        ? (debug && console.log("~~ CLICK 26"),
                          getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l')[0].click())
                        : getElem(".QQQtest" + server_bs_close_postF1).filter((e, t) =>
                              new RegExp(server_bs_close_postF2, "i").test(
                                  (t.getAttribute("aria-label") || "") + t.textContent
                              )
                          ).length > 0 &&
                          -1 == window.location.href.indexOf("tab=inbox_plus") &&
                          (window.location.href.indexOf("latest/posts") > -1 ||
                              window.location.href.indexOf("insights") > -1) &&
                          (debug && console.log("~~ CLICK new26"),
                          getElem(".QQQtest" + server_bs_close_postF1)
                              .filter((e, t) =>
                                  new RegExp(server_bs_close_postF2, "i").test(
                                      (t.getAttribute("aria-label") || "") + t.textContent
                                  )
                              )[0]
                              .click()),
                    skip_post_setting > 0 && (totalPostsProcessed = skip_post_setting),
                    totalPostsProcessed > 1 && totalPostsProcessed--,
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    tryToCloseIfSomethingOpen2(),
                    setTimeout(function () {
                        doPHOTO();
                    }, 500);
            else if (
                (window.location.href.indexOf("/notifications") > 0 &&
                    getElem("._5tdr ._1t7p ._2v5c", ".hidden_elem ._2v5c").length > 0) ||
                (isThisNewFbDesign2020() &&
                    getElem(
                        'div[role="navigation"] .l9j0dhe7:visible,div[role="navigation"] .x1emribx[role="row"]:visible' +
                            server_notif_list
                    )
                        .not(".y3zKF.sqdOP.yWX7d._8A5w5")
                        .filter(function () {
                            return "row" == $(this).attr("role") && 0 == $(this).find(".sx_160564").length;
                        }).length > 0 &&
                    (document.location.href.indexOf("/notifications") ||
                        document.location.href.indexOf("&notif_t=") ||
                        document.location.href.indexOf("?notif_t=")))
            )
                document.location.href.indexOf("business.facebook.com") > -1 &&
                    alert(api.i18n.getMessage("facebook_notifications_url_warning")),
                    debug && console.log("notifications tab"),
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
                    }, 500);
            else if (
                ((window.location.href.indexOf("/inbox") > 0 || window.location.href.indexOf("tab=inbox_plus") > 0) &&
                    getElem("._4k8w" + server_inbox_elements).length > 1) ||
                ((window.location.href.indexOf("/photos") > 0 ||
                    window.location.href.indexOf("/photos_albums") > 0 ||
                    window.location.href.indexOf("/latest/posts/photos") > 0 ||
                    window.location.href.indexOf("/media/set") > 0) &&
                    getElem("a.oajrlxb2>img,a.qi72231t>img" + server_photos_list, ".rqwfedt553" + server_photos_listNOT)
                        .length > 0)
            )
                debug && console.log("Inbox plus or photos tab"),
                    (window.location.href.indexOf("/photos") > 0 ||
                        window.location.href.indexOf("/photos_albums") > 0 ||
                        window.location.href.indexOf("/latest/posts/photos") > 0 ||
                        window.location.href.indexOf("/media/set") > 0) &&
                        getElem(
                            "a.oajrlxb2>img,a.qi72231t>img" + server_photos_list,
                            ".rqwfedt553" + server_photos_listNOT
                        ).length > 0 &&
                        (weScanPhotosTab = !0),
                    (publishingToolInv = !0),
                    (isPhotoInviting = 1),
                    skip_post_setting < 10 && (totalPostsProcessed = skip_post_setting),
                    totalPostsProcessed > 1 && totalPostsProcessed--,
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    tryToCloseIfSomethingOpen2(),
                    setTimeout(function () {
                        doPHOTO();
                    }, 500);
            else if (
                (window.location.href.indexOf("/videos/") > 0 || window.location.href.indexOf("/photo/") > 0) &&
                getElem("._2x4v", ".hidden_elem ._2x4v").length > 0
            )
                setTimeout(function () {
                    do2();
                }, 2e3);
            else if (window.location.href.indexOf("/watch/") > 0 && getElem("._1c_u ._53j5 ._ox1").length > 0)
                debug && console.log("~~ CLICK 27"),
                    getElem("._1c_u ._53j5 ._ox1")[0].click(),
                    setTimeout(function () {
                        getElem("._437j ._3l-q ._6dic a._371y").length > 0 &&
                            (pageNameAdditionalCheck = getElem("._437j ._3l-q ._6dic a._371y").text()),
                            do2();
                    }, 4e3);
            else if (window.location.href.indexOf("/watch/") > 0 && getElem("._wyj._20nr ._7gpd a._7gm_").length > 0)
                debug && console.log("Watch detected! scan here."),
                    getElem("._wyj._20nr ._7gsh a").length > 0 &&
                        (pageNameAdditionalCheck = getElem("._wyj._20nr ._7gsh a").text()),
                    do2();
            else if (
                (3 == runMode || 4 == runMode) &&
                (window.location.href.indexOf("/posts/") > 0 || window.location.href.indexOf("story_fbid") > 0) &&
                -1 == window.location.href.indexOf("published_posts") &&
                -1 == window.location.href.indexOf("active_stories") &&
                -1 == window.location.href.indexOf("feed_and_grid") &&
                -1 == window.location.href.indexOf("latest") &&
                getElem("QQQQtest" + server_new_like_block, ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor)
                    .length > 0
            ) {
                debug && console.log("We are scaning just one post in multipages mode!"),
                    document.getElementById("add-all-div-sw") && n && destroyPopup(),
                    createPopup(),
                    (scanOnlyOnePostPerPage2025 = !0);
                var s = fb_timeout_1;
                (s += clickLikeButtonsInsideContainer(
                    getElem("QQQQtest" + server_new_like_block, ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor)[
                        getElem(
                            "QQQQtest" + server_new_like_block,
                            ".hidden_elem ._1g5v" + server_main_like_to_clickIgnor
                        ).length - 1
                    ]
                )),
                    (TimerDelayVar1 = setTimeout(function () {
                        StartInvitePeople();
                    }, s));
            } else
                (3 == runMode || 4 == runMode) &&
                window.location.href.indexOf("/watch/?v=") > 0 &&
                getElem(".x78zum5 span.x6ikm8r.x10wlt62.xlyipyv>span.html-span").length > 0
                    ? (debug && console.log("We are scaning just one post (video) in multipages mode!"),
                      document.getElementById("add-all-div-sw") && n && destroyPopup(),
                      createPopup(),
                      (scanOnlyOnePostPerPage2025 = !0),
                      getElem(".x78zum5 span.x6ikm8r.x10wlt62.xlyipyv>span.html-span")[0].click(),
                      (TimerDelayVar1 = setTimeout(function () {
                          StartInvitePeople();
                      }, fb_timeout_1)))
                    : window.location.href.indexOf("/professional_dashboard") > 0 &&
                        getElem("QQQQQtestPROFDASH" + server_pd_posts).length > 0
                      ? (debug && console.log("professional_dashboard here?"),
                        debug && console.log("professional_dashboard scan"),
                        (_profInsights_spec_close = !0),
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
                      : window.location.href.indexOf("/my_posted_content") > 0 && getElem(".x14vqqas a").length > 0
                        ? (debug && console.log("my_posted_content here?"),
                          debug && console.log("my_posted_content scan"),
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
                        : (debug && console.log("Nothing was detected???"),
                          (2 == runMode || 3 == runMode || 4 == runMode) &&
                          tryAgainForFullScan < 10 &&
                          window.location.href.indexOf("runMode=") > 0
                              ? (tryAgainForFullScan++,
                                debug && console.log("go to do1"),
                                setTimeout(function () {
                                    do1();
                                }, 1500))
                              : (debug && console.log("go to do2"),
                                (getElem(".layerCancel").length > 0 || inviteWindowInNewUIOpen()) && !check_post_first
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
                                      }, 200)));
    }
    var r;
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
    var n;
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
                  api.i18n
                      .getMessage("friends_invite_result")
                      .replace(/%s/g, ((n = [total, t.length]), () => n.shift()))
              )));
}
function updateCount(e) {
    document.getElementById("invite-all-count-sw").innerText = total + "/" + e;
}
function createPopup2() {
    document.getElementsByTagName("head")[0];
    var e,
        t = document.getElementsByTagName("body")[0],
        n = document.createElement("div");
    n.setAttribute("id", "add-all-div-sw"),
        n.setAttribute(
            "style",
            'text-align:center;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;padding:20px;width:60%;border:2px solid #ccc;background-color:#fff;position:fixed;margin:0 auto;z-index:999;top: 5px;left:20%;font-size:1.5em;'
        ),
        (n.innerHTML = api.i18n
            .getMessage("inviting_everyone_in_list_full")
            .replace(/%s/g, ((e = [fb_limit, 0]), () => e.shift()))),
        t.appendChild(n),
        (popup = n);
}
function inviteFriendsNEW() {
    var e = getElem(".uiList._4kg ._2gdu ._42o8._42oc");
    (invitedToEvent = 0),
        e.length > 0 && invitedToEvent < fb_limit ? inviteNextForFRIENDSNEW(0, e) : (scriptIsRunning = 0);
}
function inviteNextForFRIENDSNEW(e, t) {
    var n;
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < fb_limit
                ? (invitedToEvent++,
                  t[e].click(),
                  setTimeout(function () {
                      (t = getElem(".uiList._4kg ._2gdu ._42o8._42oc")), inviteNextForFRIENDSNEW(e, t);
                  }, 150))
                : (alert(
                      api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((n = [2]), () => n.shift()))
                  ),
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
            var e;
            (inputs = getElem(".uiList._4kg ._2gdu ._42o8._42oc")),
                inputs.length > 0
                    ? inviteNextForFRIENDSNEW(0, inputs)
                    : (alert(
                          api.i18n
                              .getMessage("all_friends_selected_button")
                              .replace(/%s/g, ((e = [3]), () => e.shift()))
                      ),
                      (scriptIsRunning = 0));
        }, 2e3);
}
function inviteFriendsNew2020(e) {
    var t,
        n = getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(function () {
            return (
                "false" == $(this).attr("aria-checked") &&
                (!$(this).attr("tabindex") || "-1" != $(this).attr("tabindex"))
            );
        });
    (invitedToEvent = 0),
        (n.length > 0 ||
            getElem(
                'div[role="dialog"] .x78zum5 div[role="checkbox"]' +
                    server_inv_friends_list.replace(':not([aria-disabled="true"])', "")
            ).filter(function () {
                return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
            }).length > 0) &&
        invitedToEvent < fb_limit
            ? friends_skip_nr > 0
                ? friends_skip_nr >
                  getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(
                      function () {
                          return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
                      }
                  ).length
                    ? e < 50
                        ? inviteFRIENDSNEWScrollMore2(0, e)
                        : stopScript(
                              api.i18n
                                  .getMessage("friends_list_scroll_limit")
                                  .replace(/%s/g, ((t = [50]), () => t.shift()))
                          )
                    : inviteNextForFRIENDSNEW2020(friends_skip_nr, n)
                : inviteNextForFRIENDSNEW2020(1, n)
            : (scriptIsRunning = 0);
}
function inviteNextForFRIENDSNEW2020(e, t) {
    var n;
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < fb_limit
                ? (invitedToEvent++,
                  t[e].click(),
                  e++,
                  setTimeout(function () {
                      inviteNextForFRIENDSNEW2020(e, t);
                  }, 150))
                : (alert(
                      api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((n = [4]), () => n.shift()))
                  ),
                  (scriptIsRunning = 0))
            : setTimeout(function () {
                  inviteFRIENDSNEWScrollMore(0);
              }, 300));
}
var maxScrolledElements = 0;
function inviteFRIENDSNEWScrollMore(e) {
    1 == scriptIsRunning &&
        (5 != e
            ? (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(9999999);
                  }, 50))
            : (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(1);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(1);
                  }, 50)),
        setTimeout(function () {
            var t,
                n = getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(
                    function () {
                        return (
                            "false" == $(this).attr("aria-checked") &&
                            (!$(this).attr("tabindex") || "-1" != $(this).attr("tabindex"))
                        );
                    }
                );
            n.length > 1
                ? inviteNextForFRIENDSNEW2020(friends_skip_nr > 0 ? friends_skip_nr : 1, n)
                : n.length < 2 &&
                    (e < 5e4 ||
                        getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list).filter(
                            function () {
                                return (
                                    "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked")
                                );
                            }
                        ).length > maxScrolledElements)
                  ? ((maxScrolledElements = getElem(
                        'div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list
                    ).filter(function () {
                        return "false" == $(this).attr("aria-checked") || "true" == $(this).attr("aria-checked");
                    }).length),
                    inviteFRIENDSNEWScrollMore(e + 1))
                  : (alert(
                        api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((t = [1]), () => t.shift()))
                    ),
                    (scriptIsRunning = 0));
        }, 1500));
}
function inviteFRIENDSNEWScrollMore2(e, t) {
    1 == scriptIsRunning &&
        (5 != e
            ? (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(9999999);
                  }, 50))
            : (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(1);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(1);
                  }, 50)),
        setTimeout(function () {
            inviteFriendsNew2020(t + 1);
        }, 3e3));
}
function inviteFriendsNew2024(e) {
    var t,
        n = getNewUIMainScrollOnly('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list);
    (invitedToEvent = 0),
        n.length > 0 && invitedToEvent < fb_limit
            ? friends_skip_nr > 0
                ? friends_skip_nr >
                  getNewUIMainScrollOnly('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list)
                      .length >
                  0
                    ? e < 50
                        ? inviteFRIENDSNEWScrollMore24(0, e)
                        : stopScript(
                              api.i18n
                                  .getMessage("friends_list_scroll_limit")
                                  .replace(/%s/g, ((t = [50]), () => t.shift()))
                          )
                    : inviteNextForFRIENDSNEW2024(friends_skip_nr, n)
                : inviteNextForFRIENDSNEW2024(0, n)
            : (scriptIsRunning = 0);
}
function inviteNextForFRIENDSNEW2024(e, t) {
    var n;
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < fb_limit
                ? (invitedToEvent++,
                  t[e].click(),
                  e++,
                  setTimeout(function () {
                      inviteNextForFRIENDSNEW2024(e, t);
                  }, 150))
                : (alert(
                      api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((n = [41]), () => n.shift()))
                  ),
                  (scriptIsRunning = 0))
            : setTimeout(function () {
                  inviteFRIENDSNEWScrollMoreM2(0, e);
              }, 300));
}
maxScrolledElements = 0;
function inviteFRIENDSNEWScrollMoreM2(e, t) {
    5 != e
        ? (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
              ? setTimeout(function () {
                    getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
                }, 5)
              : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                setTimeout(function () {
                    getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
                }, 5),
          getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
              setTimeout(function () {
                  getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(9999999);
              }, 50))
        : (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
              ? setTimeout(function () {
                    getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(1);
                }, 5)
              : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                setTimeout(function () {
                    getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
                }, 5),
          getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
              setTimeout(function () {
                  getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(1);
              }, 50)),
        setTimeout(function () {
            var n,
                o = getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list);
            o.length > 1
                ? inviteNextForFRIENDSNEW2024((friends_skip_nr = t + 1) > 0 ? friends_skip_nr : 1, o)
                : o.length < 2 &&
                    (e < 10 || getElem('div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list))
                  ? ((maxScrolledElements = getElem(
                        'div[role="dialog"] .x78zum5 div[role="checkbox"]' + server_inv_friends_list
                    ).length),
                    inviteFRIENDSNEWScrollMoreM2(e + 1, t))
                  : (alert(
                        api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((n = [11]), () => n.shift()))
                    ),
                    (scriptIsRunning = 0));
        }, 1500);
}
function inviteFRIENDSNEWScrollMore24(e, t) {
    1 == scriptIsRunning &&
        (25 != e
            ? (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(9999999);
                  }, 50))
            : (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(1);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
                    }, 5),
              getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).length > 0 &&
                  setTimeout(function () {
                      getElem('div[role="dialog"] .r7ybg2qv' + server_inv_friends_scoll).scrollTop(1);
                  }, 50)),
        setTimeout(function () {
            inviteFriendsNew2024(t + 1);
        }, 3e3));
}
function inviteInviteButton2026(e) {
    var t,
        n = getElem('.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]');
    (invitedToEvent = 0),
        n.length > 0 && invitedToEvent < fb_limit
            ? friends_skip_nr > 0
                ? friends_skip_nr >
                  getElem('.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]').length >
                  0
                    ? e < 50
                        ? inviteInviteButtonScrollMore24(0, e)
                        : stopScript(
                              api.i18n
                                  .getMessage("friends_list_scroll_limit")
                                  .replace(/%s/g, ((t = [50]), () => t.shift()))
                          )
                    : inviteNextForInviteButton2026(friends_skip_nr, n)
                : inviteNextForInviteButton2026(0, n)
            : (scriptIsRunning = 0);
}
function inviteNextForInviteButton2026(e, t) {
    var n;
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < fb_limit
                ? (invitedToEvent++,
                  t[e].click(),
                  e++,
                  setTimeout(function () {
                      inviteNextForInviteButton2026(e, t);
                  }, 150))
                : (alert(
                      api.i18n.getMessage("all_friends_selected_button").replace(/%s/g, ((n = [41]), () => n.shift()))
                  ),
                  (scriptIsRunning = 0))
            : setTimeout(function () {
                  inviteInviteButtonScrollMoreM2(0, e);
              }, 300));
}
maxScrolledElements = 0;
function inviteInviteButtonScrollMoreM2(e, t) {
    5 != e
        ? getScrollElemNewFb(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").length > 0
            ? setTimeout(function () {
                  getScrollElemNewFb(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").scrollTop(9999999);
              }, 5)
            : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
              setTimeout(function () {
                  getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
              }, 5)
        : getScrollElemNewFb(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").length > 0
          ? setTimeout(function () {
                getScrollElemNewFb(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").scrollTop(1);
            }, 5)
          : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
            setTimeout(function () {
                getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
            }, 5),
        setTimeout(function () {
            var n,
                o = getElem('.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]');
            o.length > 1
                ? inviteNextForInviteButton2026((friends_skip_nr = t + 1) > 0 ? friends_skip_nr : 1, o)
                : o.length < 2 &&
                    (e < 10 || getElem('.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]'))
                  ? ((maxScrolledElements = getElem(
                        '.xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy input[type="checkbox"]'
                    ).length),
                    inviteInviteButtonScrollMoreM2(e + 1, t))
                  : (alert("We selected %s people from the list!".replace(/%s/g, ((n = [11]), () => n.shift()))),
                    (scriptIsRunning = 0));
        }, 1500);
}
function inviteInviteButtonScrollMore24(e, t) {
    1 == scriptIsRunning &&
        (25 != e
            ? (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(9999999);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(9999999);
                    }, 5),
              getElem(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").length > 0 &&
                  setTimeout(function () {
                      getElem(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").scrollTop(9999999);
                  }, 50))
            : (getScrollElemNewFb(scrollingNewFBDesignClassDef).length > 0
                  ? setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(1);
                    }, 5)
                  : getScrollElemNewFb(scrollingNewFBDesignClass).length > 0 &&
                    setTimeout(function () {
                        getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(1);
                    }, 5),
              getElem(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").length > 0 &&
                  setTimeout(function () {
                      getElem(".xb57i2i.x1q594ok.x5lxg6s.x1ja2u2z.x64bnmy").scrollTop(1);
                  }, 50)),
        setTimeout(function () {
            inviteInviteButton2026(t + 1);
        }, 3e3));
}
function inviteNextForEvent(e, t) {
    1 == scriptIsRunning &&
        (e < t.length
            ? invitedToEvent < fb_limit
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
        inviteEvent.length > 0 && invitedToEvent < fb_limit
            ? inviteNextForEvent(0, inviteEvent)
            : (scriptIsRunning = 0);
}
function do2() {
    if (1 == scriptIsRunning)
        if (
            (0 == (inviteEvent = getElem(".uiScrollableAreaContent ._1pt_ ._2aks ._51mw ._1pu4")).length &&
                (debug && console.log("inv Event 1"),
                (inviteEvent = getElem("._6ht6 ._6i6z._3qn7 button._1gcq").filter(function () {
                    return "false" == $(this).attr("aria-checked");
                }))),
            inviteEvent.length > 0)
        )
            debug && console.log("Inv event 2"), destroyPopup(), (scriptIsRunning = 1), inviteEventF();
        else {
            debug && console.log("no inv event");
            var e = document.getElementsByClassName("_3f-h");
            e && e.length,
                setTimeout(function () {
                    do3();
                }, 1e3);
        }
}
function do3() {
    if ((debug && console.log("do3"), 1 == scriptIsRunning))
        if (
            ((totalPostsProcessed = skip_post_setting) > 1 && totalPostsProcessed--,
            document.getElementById("add-all-div-sw") && popup && destroyPopup(),
            createPopup(),
            skip_post_setting > 7 && 0 == loop_PostsList.length)
        ) {
            debug && console.log("do3-1"),
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
            if ((debug && console.log("do3-2"), (timeout = 1e3), loop_PostsListArray.length > 0)) {
                var t = Math.max.apply(Math, loop_PostsListArray);
                if (t > 0)
                    for (e = 0; e < Math.ceil(t / 5); e++)
                        (TimerDelayVar1 = setTimeout(
                            function () {
                                tryClickToLoadMorePosts();
                            },
                            1e3 + 3500 * e
                        )),
                            debug && console.log("do3-3"),
                            (timeout = 3500 * e + 5e3);
            }
            debug && console.log("do3-4:" + timeout),
                (TimerDelayVar1 = setTimeout(function () {
                    do4();
                }, timeout));
        } else
            debug && console.log("do3-5"),
                check_post_first && (getElem(".layerCancel").length > 0 || inviteWindowInNewUIOpen())
                    ? (debug && console.log("do3-6"), StartInvitePeople())
                    : (debug && console.log("do3-7"),
                      0 == inputsComments.length || inputsComments.length <= totalPostsProcessed
                          ? (debug && console.log("do3-8"),
                            tryClickToLoadMorePosts(),
                            setTimeout(function () {
                                do4();
                            }, 4e3))
                          : (debug && console.log("go to do4"), do4()));
}
function tryToLoadNewClassesFromServer() {
    api.runtime.sendMessage({ type: "LoadClassesFromServer" }, function (e) {});
}
var previousIncrease1 = 800,
    previousIncrease2 = 0;
function do4() {
    if (
        ((weAreTrackingLikeContainer = !1),
        debug && console.log("inputsComments1:" + inputsComments.length),
        1 == scriptIsRunning)
    )
        if (
            (debug && console.log("inputsComments2:" + inputsComments.length),
            debug && console.log("I HAVE THE LIST ALREADY" + inputsComments.length),
            0 == inputsComments.length &&
                document.location.href.indexOf("/latest/posts/feed_and_grid") > 1 &&
                getElem(".GRIDELEMENT" + server_bs_feed_grid1).has(".GRIDhasELEMENT" + server_bs_feed_grid2).length >
                    0 &&
                ((inputsComments = getElem(".GRIDELEMENT" + server_bs_feed_grid1).has(
                    ".GRIDhasELEMENT" + server_bs_feed_grid2
                )),
                debug && console.log("I AM GETTING HERE THE LIST:" + inputsComments.length),
                (specialElabForFeedAndGrid = !0)),
            (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                !specialElabForFeedAndGrid &&
                getElem(
                    ".qqqqTestQ" + server_new_like_block,
                    "._66lg .hidden_elem a._3dlf" + server_main_like_to_clickIgnor
                ).length > 0 &&
                (document.location.href.indexOf("/posts/") > 0 ||
                    document.location.href.indexOf("/photos/") > 0 ||
                    document.location.href.indexOf("/photo/") > 0) &&
                ((inputsComments = getElem(
                    ".qqqqTestQ" + server_new_like_block,
                    "._66lg .hidden_elem a._3dlf" + server_main_like_to_clickIgnor
                )),
                (weAreTrackingLikeContainer = !0),
                (3 == runMode || 4 == runMode) && inputsComments.length > 1 && (inputsComments.length = 1)),
            debug && console.log("inputsComments21:" + inputsComments.length),
            (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                !specialElabForFeedAndGrid &&
                getElem(".qqqqTestQ" + server_home_posts).length > 0 &&
                -1 == document.location.href.indexOf("/latest/") &&
                -1 == document.location.href.indexOf("/posts/") &&
                -1 == document.location.href.indexOf("/content/") &&
                ((inputsComments = getElem(".qqqqTestQ" + server_home_posts)),
                (specialElabForHomePage2026 = !0),
                debug && console.log("We are scanning NEW homepage, where we need to scroll to each element")),
            debug && console.log("inputsComments215:" + inputsComments.length),
            (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                !specialElabForFeedAndGrid &&
                !specialElabForHomePage2026 &&
                getElem(
                    ".qqqqTestQ" + server_new_like_block,
                    "._66lg .hidden_elem a._3dlf" + server_main_like_to_clickIgnor
                ).length > 0 &&
                ((inputsComments = getElem(
                    ".qqqqTestQ" + server_new_like_block,
                    "._66lg .hidden_elem a._3dlf" + server_main_like_to_clickIgnor
                )),
                (weAreTrackingLikeContainer = !0)),
            debug && console.log("inputsComments22:" + inputsComments.length),
            (0 == inputsComments.length || inputsComments.length <= totalPostsProcessed) &&
                !specialElabForFeedAndGrid &&
                !specialElabForHomePage2026 &&
                getElem("._2x4v", ".hidden_elem ._2x4v").length > 0 &&
                (inputsComments = getElem("._2x4v", ".hidden_elem ._2x4v")),
            debug && console.log("inputsComments22-1:" + inputsComments.length),
            0 == inputsComments.length &&
                getElem("._wyj._20nr ._7gpd a._7gm_").length > 0 &&
                document.location.href.indexOf("/watch/") &&
                (inputsComments = getElem("._wyj._20nr ._7gpd a._7gm_")),
            debug && console.log("inputsComments23:" + inputsComments.length),
            0 == inputsComments.length &&
                getElem("._4bl7 ._7rb8 ._1n9k>a").length > 0 &&
                document.location.href.indexOf("/videos/") &&
                ((inputsComments = getElem("._4bl7 ._7rb8 ._1n9k>a")),
                setTimeout(function () {
                    getElem("._4t2a ._21ab li._45hc>a", "._4t2a ._21ab li._45hc._1hqh ._21af._9zc").length > 0 &&
                        (debug && console.log("~~ CLICK 29"),
                        getElem("._4t2a ._21ab li._45hc>a", "._4t2a ._21ab li._45hc._1hqh ._21af._9zc")[0].click());
                }, 2e3)),
            debug && console.log("inputsComments3:" + inputsComments.length),
            loop_PostsListArray.length > 0)
        )
            if ((debug && console.log("here1 - loop1"), 0 == inputsComments.length))
                3 == tryMoreToScroll
                    ? (debug && console.log("here2. runMode=" + runMode),
                      3 == runMode || 4 == runMode
                          ? (debug && console.log("next page gooooo"),
                            debug && console.log("next page 6"),
                            open_next_page())
                          : (debug && console.log("here3-loop"),
                            2 == _runMode
                                ? (console.log(
                                      "Error: didn't find posts after reload, will try to reload the page again in 1 minute. Wait."
                                  ),
                                  updatePopup(api.i18n.getMessage("didnt_find_posts_reload")),
                                  (TimerDelayVar1 = setTimeout(function () {
                                      window.location.replace(window.location.href);
                                  }, 6e4)))
                                : (window.location.href.indexOf("/creatorstudio") > 0
                                      ? window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                                        window.location.href.indexOf("/creatorstudio?tab=home") > 0
                                          ? alert(api.i18n.getMessage("home_tab_no_posts"))
                                          : alert(api.i18n.getMessage("no_posts_in_content_library"))
                                      : isThisNewFbDesign2020() || newFBinviteDesign
                                        ? (tryToLoadNewClassesFromServer(),
                                          0 == getElem(".QQQQFFeerefef" + server_bs_posts).length &&
                                          getElem('table tr td[aria-colindex="2"]').length > 5
                                              ? alert(
                                                    "ERROR! No posts found. If you see Instagram posts on the page, disable Instagram posts using Facebook filter, then run the script on Facebook posts only."
                                                )
                                              : alert(
                                                    api.i18n
                                                        .getMessage("no_posts_found_err2")
                                                        .replace(/%s/g, ((t = [_email]), () => t.shift()))
                                                ))
                                        : alert(api.i18n.getMessage("error1")),
                                  destroyPopup(),
                                  (scriptIsRunning = 0))))
                    : (tryMoreToScroll++,
                      debug && console.log("Scroll try 2"),
                      window.scrollTo(0, document.body.scrollHeight),
                      (TimerDelayVar1 = setTimeout(function () {
                          do4();
                      }, 5e3)));
            else if (totalPostsProcessed < inputsComments.length)
                if (
                    (totalPostsProcessed++,
                    normal_run_limitNoInvitePosts >= 0
                        ? normal_run_limitNoInvitePosts++
                        : (normal_run_limitNoInvitePosts = 0),
                    loop_PostsListArray.indexOf(totalPostsProcessed) > -1)
                )
                    if (inputsComments[totalPostsProcessed - 1]) {
                        var e = fb_timeout_1;
                        document.location.href.indexOf("/videos/") > 0 ||
                        document.location.href.indexOf("/events/") > 0 ||
                        document.location.href.indexOf("/adsmanager/pages") > 0 ||
                        document.location.href.indexOf("/content_management") > 0 ||
                        document.location.href.indexOf("/latest/posts") > 0 ||
                        document.location.href.indexOf("/insights") > 0 ||
                        document.location.href.indexOf("/latest/ad_center") > 0 ||
                        window.location.href.indexOf("/publishing_tools") > 0
                            ? (debug && console.log("~~ CLICK 30"),
                              weAreTrackingLikeContainer
                                  ? (e += clickLikeButtonsInsideContainer(inputsComments[totalPostsProcessed - 1]))
                                  : inputsComments[totalPostsProcessed - 1].click(),
                              updatePopup())
                            : (debug && console.log("~~ CLICK 31"),
                              weAreTrackingLikeContainer
                                  ? (e += clickLikeButtonsInsideContainer(inputsComments[totalPostsProcessed - 1]))
                                  : inputsComments[totalPostsProcessed - 1].click(),
                              updatePopup()),
                            (TimerDelayVar1 = setTimeout(function () {
                                StartInvitePeople();
                            }, e));
                    } else
                        debug && console.log("Scroll try 3"),
                            window.scrollTo(0, document.body.scrollHeight),
                            (TimerDelayVar1 = setTimeout(function () {
                                do4();
                            }, fb_timeout_4));
                else do4();
            else
                reloadloop
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
                      }, loop_Pause)));
        else
            0 == inputsComments.length
                ? 3 == tryMoreToScroll
                    ? 3 == runMode || 4 == runMode
                        ? (debug && console.log("next page 7"), open_next_page())
                        : (window.location.href.indexOf("/creatorstudio") > 0
                              ? window.location.href.indexOf("/creatorstudio/?tab=home") > 0 ||
                                window.location.href.indexOf("/creatorstudio?tab=home") > 0
                                  ? alert(api.i18n.getMessage("home_tab_no_posts"))
                                  : alert(api.i18n.getMessage("no_posts_in_content_library"))
                              : isThisNewFbDesign2020() || newFBinviteDesign
                                ? (tryToLoadNewClassesFromServer(),
                                  0 == getElem(".QQQQFFeerefef" + server_bs_posts).length &&
                                  getElem('table tr td[aria-colindex="2"]').length > 5
                                      ? alert(
                                            "ERROR! No posts found. If you see Instagram posts on the page, disable Instagram posts using Facebook filter, then run the script on Facebook posts only."
                                        )
                                      : alert(
                                            "(2) " +
                                                api.i18n.getMessage("no_posts_found_err2").replace(
                                                    /%s/g,
                                                    (
                                                        (e) => () =>
                                                            e.shift()
                                                    )([_email])
                                                )
                                        ))
                                : alert(api.i18n.getMessage("error1")),
                          destroyPopup(),
                          (scriptIsRunning = 0))
                    : (tryMoreToScroll++,
                      debug && console.log("Scroll try 4"),
                      window.scrollTo(0, document.body.scrollHeight),
                      getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).length > 0 &&
                          getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).scrollTop(99999999),
                      (TimerDelayVar1 = setTimeout(function () {
                          do4();
                      }, 5e3)))
                : window.location.href.indexOf("/watch/") > 0 && totalPostsProcessed >= 1
                  ? 3 == runMode || 4 == runMode
                      ? (debug && console.log("next page 8"), open_next_page())
                      : (console.log("Stop, debug: watch"), stopScript())
                  : inputsComments.length > 0 && (specialElabForFeedAndGrid || specialElabForHomePage2026)
                    ? scrollAndClickToThisElement2(0)
                    : inputsComments.length > 0 && inputsComments.length > totalPostsProcessed
                      ? document.location.href.indexOf("/videos/") > 0 ||
                        document.location.href.indexOf("/events/") > 0 ||
                        document.location.href.indexOf("/adsmanager/pages") > 0 ||
                        document.location.href.indexOf("/content_management") > 0 ||
                        document.location.href.indexOf("/latest/posts") > 0 ||
                        document.location.href.indexOf("/insights") > 0 ||
                        document.location.href.indexOf("/latest/ad_center") > 0 ||
                        window.location.href.indexOf("/publishing_tools") > 0
                          ? scrollAndClickToThisElement()
                          : (0 == $(inputsComments[totalPostsProcessed]).offset().top
                                ? (0 == $(document).height()
                                      ? window.scrollTo(0, 999999999)
                                      : window.scrollTo(0, $(document).height()),
                                  setTimeout(function () {
                                      0 != $(inputsComments[totalPostsProcessed]).offset().top &&
                                          window.scrollTo(
                                              0,
                                              Math.round($(inputsComments[totalPostsProcessed]).offset().top - 400)
                                          );
                                  }, 500))
                                : 0 != $(inputsComments[totalPostsProcessed]).offset().top &&
                                  window.scrollTo(
                                      0,
                                      Math.round($(inputsComments[totalPostsProcessed]).offset().top - 400)
                                  ),
                            setTimeout(function () {
                                var e = fb_timeout_1;
                                debug && console.log("~~ CLICK 33"),
                                    weAreTrackingLikeContainer
                                        ? (e += clickLikeButtonsInsideContainer(inputsComments[totalPostsProcessed]))
                                        : inputsComments[totalPostsProcessed].click(),
                                    totalPostsProcessed++,
                                    normal_run_limitNoInvitePosts >= 0
                                        ? normal_run_limitNoInvitePosts++
                                        : (normal_run_limitNoInvitePosts = 0),
                                    updatePopup(),
                                    (checkTwice = 0),
                                    (TimerDelayVar1 = setTimeout(function () {
                                        StartInvitePeople();
                                    }, e));
                            }, 1500))
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
                                : do4());
    var t;
}
function scrollAndClickToThisElement() {
    var e = inputsComments[totalPostsProcessed],
        t = document.querySelector(".SCROLLEXTRAHERE" + server_bs_scroll_list);
    if (e && t) {
        for (var n = 0, o = e; o && o !== t; ) (n += o.offsetTop), (o = o.offsetParent);
        let i = !1;
        n > 0 && 0 == previousIncrease1 && (previousIncrease1 = n),
            ((0 == n && totalPostsProcessed > 0) || (previousIncrease2 == n && n > 0)) && (i = !0),
            n > 0 && previousIncrease2 != n && (previousIncrease2 = n),
            i
                ? ((previousIncrease = 1443),
                  (n = previousIncrease1 > 0 ? previousIncrease1 + previousIncrease2 : 1443 + previousIncrease2) > 0 &&
                      previousIncrease2 != n &&
                      (previousIncrease2 = n),
                  (t.scrollTop = n - t.clientHeight / 2),
                  setTimeout(function () {
                      for (
                          e = inputsComments[totalPostsProcessed],
                              t = document.querySelector(".SCROLLEXTRAHERE" + server_bs_scroll_list),
                              n = 0,
                              o = e;
                          o && o !== t;

                      )
                          (n += o.offsetTop), (o = o.offsetParent);
                      n > 0 && 0 == previousIncrease1 && (previousIncrease1 = n),
                          ((0 == n && totalPostsProcessed > 0) || (previousIncrease2 == n && n > 0)) &&
                              (previousIncrease2 = n =
                                  previousIncrease1 > 0
                                      ? previousIncrease1 + previousIncrease2
                                      : 1443 + previousIncrease2),
                          n > 0 && previousIncrease2 != n && (previousIncrease2 = n),
                          0 == n && previousIncrease2 > 0 && (n = previousIncrease2),
                          (t.scrollTop = n - t.clientHeight / 2);
                  }, 1600))
                : (t.scrollTop = n - t.clientHeight / 2);
    }
    setTimeout(function () {
        debug && console.log("~~ CLICK 32-1, " + totalPostsProcessed + " of " + inputsComments.length),
            e.length > 0 && (weAreTrackingLikeContainer ? clickLikeButtonsInsideContainer(e, !0) : e.click()),
            totalPostsProcessed++,
            normal_run_limitNoInvitePosts >= 0 ? normal_run_limitNoInvitePosts++ : (normal_run_limitNoInvitePosts = 0),
            updatePopup(),
            (checkTwice = 0);
    }, 3e3),
        (TimerDelayVar1 = setTimeout(function () {
            StartInvitePeople();
        }, fb_timeout_1 + 4e3));
}
function scrollAndClickToThisElement2(e) {
    if (1 == scriptIsRunning)
        if (
            (console.log("CHECKING " + totalPostsProcessed + " of " + inputsComments.length),
            inputsComments.length <= totalPostsProcessed)
        )
            e > 15
                ? 3 == runMode || 4 == runMode
                    ? (debug && console.log("next page new scan 1"), open_next_page())
                    : (console.log("We tried 15 times to scroll, but no more posts were loaded!"), stopScript())
                : specialElabForFeedAndGrid
                  ? (10 == e
                        ? getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).scrollTop(0)
                        : getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).length > 0 &&
                          getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).scrollTop(99999999),
                    setTimeout(function () {
                        getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).scrollTop(previousIncrease1 + 800),
                            (inputsComments = getElem(".GRIDELEMENT" + server_bs_feed_grid1).has(
                                ".GRIDhasELEMENT" + server_bs_feed_grid2
                            )),
                            setTimeout(function () {
                                scrollAndClickToThisElement2(e + 1);
                            }, 1500);
                    }, 5500))
                  : specialElabForHomePage2026 &&
                    (10 == e
                        ? (debug && console.log("(1) Scroll to 0"), $(window).scrollTop(0))
                        : (debug && console.log("(1) Scroll to END"), $(window).scrollTop(99999999)),
                    setTimeout(function () {
                        debug && console.log("(2) Scroll to " + (previousIncrease1 + 800)),
                            $(window).scrollTop(previousIncrease1 + 800),
                            (inputsComments = getElem(".qqqqTestQ" + server_home_posts)),
                            setTimeout(function () {
                                scrollAndClickToThisElement2(e + 1);
                            }, 1500);
                    }, 5500));
        else {
            var t = inputsComments[totalPostsProcessed];
            if (specialElabForFeedAndGrid) {
                var n = document.querySelector(".SCROLLEXTRAHERE" + server_bs_scroll_list);
                if (t && n) {
                    let e = t.offsetTop,
                        o = n.offsetTop;
                    e > 0 ? (previousIncrease1 = e) : 0 == totalPostsProcessed && (previousIncrease1 = 0),
                        debug && console.log("POS=" + previousIncrease1 + ". containerTop=" + o),
                        (n.scrollTop = previousIncrease1 - o + 250);
                }
                setTimeout(function () {
                    if (
                        (debug && console.log("~~ CLICK 32-2, " + totalPostsProcessed + " of " + inputsComments.length),
                        totalPostsProcessed++,
                        normal_run_limitNoInvitePosts >= 0
                            ? normal_run_limitNoInvitePosts++
                            : (normal_run_limitNoInvitePosts = 0),
                        updatePopup(),
                        (checkTwice = 0),
                        $(t)
                            .find(".qqqqTestQ" + server_new_like_block)
                            .not(function () {
                                return $(this).closest('span[aria-hidden="true"]').length > 0;
                            }).length > 0)
                    ) {
                        var e = fb_timeout_1;
                        (e += clickLikeButtonsInsideContainer(
                            $(t)
                                .find(".qqqqTestQ" + server_new_like_block)
                                .not(function () {
                                    return $(this).closest('span[aria-hidden="true"]').length > 0;
                                })[0]
                        )),
                            (TimerDelayVar1 = setTimeout(function () {
                                StartInvitePeople();
                            }, e + 1600));
                    } else
                        setTimeout(function () {
                            ClosePostAndOpenNext(-1);
                        }, 20);
                }, 1500);
            } else if (specialElabForHomePage2026) {
                if (t) {
                    let e = window.scrollY + t.getBoundingClientRect().top,
                        n = 0;
                    e > 0 ? (previousIncrease1 = e) : 0 === totalPostsProcessed && (previousIncrease1 = 0),
                        debug && console.log("POS=" + previousIncrease1 + ". containerTop=" + n),
                        $(window).scrollTop(previousIncrease1 + 250),
                        setTimeout(function () {
                            window.scrollTo({ top: previousIncrease1 + 250, behavior: "instant" });
                        }, 220);
                }
                setTimeout(function () {
                    if (
                        (debug &&
                            console.log("~~ CLICK 32-12, " + totalPostsProcessed + " of " + inputsComments.length),
                        totalPostsProcessed++,
                        normal_run_limitNoInvitePosts >= 0
                            ? normal_run_limitNoInvitePosts++
                            : (normal_run_limitNoInvitePosts = 0),
                        updatePopup(),
                        (checkTwice = 0),
                        $(t)
                            .find(".qqqqTestQ" + server_new_like_block)
                            .not(function () {
                                return $(this).closest('span[aria-hidden="true"]').length > 0;
                            }).length > 0)
                    ) {
                        document.location.href.indexOf("/shares/") > 0 &&
                            share_put_likes &&
                            "Like" ===
                                t
                                    ?.querySelector('[data-ad-rendering-role="like_button"]')
                                    ?.closest('[role="button"]')
                                    ?.getAttribute("aria-label") &&
                            (t
                                ?.querySelector('[data-ad-rendering-role="like_button"]')
                                ?.closest('[role="button"]')
                                ?.click(),
                            total_shared_posts_liked++,
                            updatePopup());
                        var e = fb_timeout_1;
                        (e += clickLikeButtonsInsideContainer(
                            $(t)
                                .find(".qqqqTestQ" + server_new_like_block)
                                .not(function () {
                                    return $(this).closest('span[aria-hidden="true"]').length > 0;
                                })[0]
                        )),
                            (TimerDelayVar1 = setTimeout(function () {
                                StartInvitePeople();
                            }, e + 1600));
                    } else
                        document.location.href.indexOf("/shares/") > 0 &&
                            share_put_likes &&
                            "Like" ===
                                t
                                    ?.querySelector('[data-ad-rendering-role="like_button"]')
                                    ?.closest('[role="button"]')
                                    ?.getAttribute("aria-label") &&
                            (t
                                ?.querySelector('[data-ad-rendering-role="like_button"]')
                                ?.closest('[role="button"]')
                                ?.click(),
                            total_shared_posts_liked++,
                            updatePopup()),
                            setTimeout(function () {
                                ClosePostAndOpenNext(-1);
                            }, 20);
                }, 1500);
            }
        }
}
function tryClickToLoadMorePosts() {
    -1 == window.location.href.indexOf("/watch/") &&
        (document.getElementsByClassName("uiMorePagerPrimary") &&
            document.getElementsByClassName("uiMorePagerPrimary")[0] &&
            (debug && console.log("~~ CLICK 34"), document.getElementsByClassName("uiMorePagerPrimary")[0].click()),
        getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click(),
        closeInviteWindowInNewUI(),
        debug && console.log("Scroll try 7"),
        getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).length > 0 &&
            getElem(".SCROLLEXTRAHERE" + server_bs_scroll_list).scrollTop(99999999),
        (document.location.href.indexOf("/posts/") > 0 && (3 == runMode || 4 == runMode)) ||
            setTimeout(function () {
                window.scrollTo(0, 80 * document.body.scrollHeight);
            }, 100));
}
function ClosePostAndOpenNext(e, t) {
    (_temp_ScanBeforeInvFilterActive = 0),
        (_temp_btnQuantityLastTime = 0),
        (_temp_btnQuantitySameInRow = 0),
        (_temp_scrollsQuantityDone = 0);
    var n = !1;
    debug && console.log("ClosePostAndOpenNext"),
        (inviteFailed = 0),
        scanOnlyOnePostPerPage2025
            ? open_next_page()
            : weAreInvitingFromShared > 0
              ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                    (debug && console.log("~~ CLICK 36"),
                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click()),
                closeInviteWindowInNewUI(),
                ((inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr)) &&
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
                  stopScript(api.i18n.getMessage("extension_stopped_shared_posts")))
                : weAreScanningOnlyInvites
                  ? stopScript(api.i18n.getMessage("extension_stopped_visible_likers"))
                  : e > -1 && bigPostTabs.length > 0 && bigPostTabs.length > e + 1 && bigPostTabs[e + 1].length > 0
                    ? StartInvitePeopleOLD(e + 1)
                    : ((fixedStartOfI = 0),
                      (fixedMaxTries = 0),
                      1 == scriptIsRunning &&
                          (((document.location.href.indexOf("/videos/") > 0 ||
                              document.location.href.indexOf("/events/") > 0 ||
                              document.location.href.indexOf("/adsmanager/pages") > 0 ||
                              document.location.href.indexOf("/content_management") > 0 ||
                              document.location.href.indexOf("/latest/posts") > 0 ||
                              document.location.href.indexOf("/insights") > 0 ||
                              document.location.href.indexOf("/latest/ad_center") > 0 ||
                              3 == runMode ||
                              4 == runMode ||
                              (document.location.href.indexOf("/posts/") > 0 &&
                                  document.location.href.indexOf("/business.facebook.com/") > 0 &&
                                  "postPage" != do_not_check_who_comments2) ||
                              (1 == isPhotoInviting && publishingToolInv)) &&
                              ((share_put_likes &&
                                  share_likes_limit > total_shared_posts_liked &&
                                  0 == sharedPostIsCheckingNow) ||
                                  (share_put_comments &&
                                      text_comm_shares.length > 1 &&
                                      total_shared_posts_commented < share_comments_limit &&
                                      0 == sharedPostIsCheckingNow) ||
                                  (((inviteDuringShareCheck && "pro" != psscr) ||
                                      (inviteDuringShareCheck2 && "pro" != psscr) ||
                                      (likeSharedComments && "pro" != psscr)) &&
                                      mtotalInvited < fb_limit &&
                                      0 == sharedPostIsCheckingNow))) ||
                          ((3 == runMode || 4 == runMode) &&
                              ((inviteDuringShareCheck && "pro" != psscr) ||
                                  (inviteDuringShareCheck2 && "pro" != psscr) ||
                                  (likeSharedComments && "pro" != psscr) ||
                                  share_put_likes ||
                                  (share_put_comments && text_comm_shares.length > 1)) &&
                              (getElem(
                                  'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                                      server_bs_shared_posts_btn
                              ).length > 0 ||
                                  (0 ==
                                      getElem(
                                          'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                                              server_bs_shared_posts_btn
                                      ).length &&
                                      getElem("._355t._4vn2 ._3rwx").length > 0) ||
                                  getElem('div[role="button"]').filter(function () {
                                      return (
                                          ($(this).find("span").text().indexOf("shares") > 0 &&
                                              $(this).find("span").text().indexOf("shares") < 6) ||
                                          ($(this).find("span").text().indexOf("Shares") > 0 &&
                                              $(this).find("span").text().indexOf("Shares") < 6)
                                      );
                                  }).length > 0) &&
                              ((share_put_likes &&
                                  share_likes_limit > total_shared_posts_liked &&
                                  0 == sharedPostIsCheckingNow) ||
                                  (share_put_comments &&
                                      text_comm_shares.length > 1 &&
                                      total_shared_posts_commented < share_comments_limit &&
                                      0 == sharedPostIsCheckingNow) ||
                                  (((inviteDuringShareCheck && "pro" != psscr) ||
                                      (inviteDuringShareCheck2 && "pro" != psscr) ||
                                      (likeSharedComments && "pro" != psscr)) &&
                                      mtotalInvited < fb_limit &&
                                      0 == sharedPostIsCheckingNow)))
                              ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
                                    (debug && console.log("~~ CLICK 37"),
                                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
                                        getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
                                    ].click()),
                                getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                                    (debug && console.log("~~ CLICK 38"),
                                    getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click()),
                                closeInviteWindowInNewUI(),
                                (loadsWithNoWorkOnShares = 0),
                                ((inviteDuringShareCheck && "pro" != psscr) ||
                                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                                    (likeSharedComments && "pro" != psscr)) &&
                                    ((clickedForMore = 0),
                                    (canSKIPButton = 0),
                                    (hadInvitedButton = 0),
                                    (hadClickedMoreButton = 0),
                                    (loopmaxtry = 0),
                                    (uiMorePagerPrimary = 0),
                                    (likeButtonsProcessed = 0)),
                                debug && console.log("click doSHAREDposts 2"),
                                (n = !0),
                                (TimerDelayVar1 = setTimeout(function () {
                                    doSHAREDposts();
                                }, 4e3)))
                              : (weScanPhotosTab &&
                                    getElem(
                                        'div[role="banner"] div[role="button"] i.x1b0d499' + server_photos_close_post
                                    ).length > 0 &&
                                    (debug && console.log("~~ CLICK 35"),
                                    getElem(
                                        'div[role="banner"] div[role="button"] i.x1b0d499' + server_photos_close_post
                                    )[0].click()),
                                getElem("._98ry ._738z ._6np5,#vde_close_tray_button").length > 0 && void 0 === t
                                    ? (getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 0 &&
                                          (debug && console.log("~~ CLICK 39"),
                                          getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[0].click()),
                                      setTimeout(function () {
                                          getElem(".layerCancel").length > 0 &&
                                              (debug && console.log("~~ CLICK 40"),
                                              getElem(".layerCancel").last()[0].click());
                                      }, 500),
                                      setTimeout(function () {
                                          getElem("#vde_close_tray_button span").length > 0
                                              ? (debug && console.log("~~ CLICK 41"),
                                                getElem("#vde_close_tray_button span")[0].click())
                                              : getElem("._95vc ._3-8_ .rwb8dzxj .if5qj5rh").length > 0
                                                ? (debug && console.log("~~ CLICK 42"),
                                                  getElem("._95vc ._3-8_ .rwb8dzxj .if5qj5rh")[0].click())
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
                                              closeSharedWindowinNewUI(),
                                              getElem(".layerCancel").length > 0 && getElem(".layerCancel")[0].click();
                                      }, 650),
                                      document.location.href.indexOf("/creatorstudio") > 0 && clickCloseButton(),
                                      (document.location.href.indexOf("/content_management") > 0 ||
                                          document.location.href.indexOf("/latest/posts") > 0 ||
                                          document.location.href.indexOf("/insights") > 0 ||
                                          document.location.href.indexOf("/latest/ad_center") > 0 ||
                                          (window.location.href.indexOf("/publishing_tools") > 0 &&
                                              getElem(
                                                  "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                                  ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                              ).length > 0)) &&
                                          (getElem("._8pxk button._271k._271l._1o4e").length > 0 &&
                                              (debug && console.log("~~ CLICK 43"),
                                              getElem("._8pxk button._271k._271l._1o4e")[0].click()),
                                          setTimeout(function () {
                                              0 == selectedpostsRun &&
                                                  (inputsPhoto = getElem(
                                                      "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                                                      ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                                                  ).filter(function () {
                                                      return (
                                                          $(this).find(
                                                              ".ellipsis,.kiex77na,.l6kht628>div,.xdt5ytf>.x1vvvo52.x1fvot60"
                                                          ).length > 0 &&
                                                          (0 == $(this).find("i").length ||
                                                              ($(this).find("i").length > 0 &&
                                                                  (!$(this).find("i").text() ||
                                                                      ($(this).find("i").text() &&
                                                                          -1 ==
                                                                              $(this)
                                                                                  .find("i")
                                                                                  .text()
                                                                                  .toLowerCase()
                                                                                  .indexOf("instagram"))) &&
                                                                  (!$(this).find("img") ||
                                                                      !$(this).find("img").attr("alt") ||
                                                                      ($(this).find("img") &&
                                                                          $(this).find("img").attr("alt") &&
                                                                          -1 ==
                                                                              $(this)
                                                                                  .find("img")
                                                                                  .attr("alt")
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
                                                    getElem(".layerCancel").length > 1 &&
                                                        getElem(".layerCancel")[1].click();
                                                }, 70)),
                                      publishingToolInv &&
                                          getElem(".layerCancel").length > 2 &&
                                          (isNotificationTab
                                              ? setTimeout(function () {
                                                    clickCloseButton();
                                                }, 570)
                                              : setTimeout(function () {
                                                    getElem(".layerCancel").length > 2 &&
                                                        getElem(".layerCancel")[2].click();
                                                }, 140)),
                                      photosTabRunAll &&
                                          getElem("._n9 ._n3>a._xlt._418x").length > 0 &&
                                          (debug && console.log("~~ CLICK 44"),
                                          getElem("._n9 ._n3>a._xlt._418x")[
                                              getElem("._n9 ._n3>a._xlt._418x").length - 1
                                          ].click()),
                                      3 == runMode &&
                                      (totalPostsProcessed >= normal_run_limitposts ||
                                          publishingToolTotPost >= normal_run_limitposts ||
                                          normal_run_limitNoInvitePosts > normal_run_limitNoInvGoNextPage ||
                                          (window.location.href.indexOf("/creatorstudio") > 0 &&
                                              (totalPostsProcessed >= 50 || publishingToolTotPost >= 50)))
                                          ? (debug && console.log("next page 11"), open_next_page())
                                          : (3 != runMode && 4 != runMode) ||
                                              0 != weAreElaboratingAlbums ||
                                              newNotificationScanInProgress ||
                                              !(
                                                  window.location.href.indexOf("/photo/") > 0 ||
                                                  window.location.href.indexOf("/photos/") > 0 ||
                                                  window.location.href.indexOf("/videos/") > 0 ||
                                                  window.location.href.indexOf("/posts/") > 0 ||
                                                  window.location.href.indexOf("/video/") > 0 ||
                                                  window.location.href.indexOf("/post/") > 0
                                              ) ||
                                              -1 != window.location.href.indexOf("latest/posts") ||
                                              -1 != window.location.href.indexOf("/insights") ||
                                              -1 != window.location.href.indexOf("latest/ad_center")
                                            ? ((clickedForMore = 0),
                                              (canSKIPButton = 0),
                                              (hadInvitedButton = 0),
                                              (hadClickedMoreButton = 0),
                                              (loopmaxtry = 0),
                                              (uiMorePagerPrimary = 0),
                                              (likeButtonsProcessed = 0),
                                              window.location.href.indexOf("/content/insights") > 0 &&
                                              _profInsights_spec_close &&
                                              getElem(
                                                  ".QQQtest" + server_bs_close_post,
                                                  'div[aria-hidden="true"] .n7mw1l6l'
                                              ).length > 0 &&
                                              -1 == window.location.href.indexOf("tab=inbox_plus")
                                                  ? ((_timerToCloseInsights = 5e3), specialClosePostBackTry(0))
                                                  : window.location.href.indexOf("/content/insights") > 0 &&
                                                      _profInsights_spec_close &&
                                                      getElem(".QQQtest" + server_bs_close_postF1).filter((e, t) =>
                                                          new RegExp(server_bs_close_postF2, "i").test(
                                                              (t.getAttribute("aria-label") || "") + t.textContent
                                                          )
                                                      ).length > 0 &&
                                                      -1 == window.location.href.indexOf("tab=inbox_plus")
                                                    ? ((_timerToCloseInsights = 5e3), specialClosePostBackTry2(0))
                                                    : (getElem(
                                                          ".QQQtest" + server_bs_close_post,
                                                          'div[aria-hidden="true"] .n7mw1l6l'
                                                      ).length > 0 &&
                                                      -1 == window.location.href.indexOf("tab=inbox_plus")
                                                          ? (debug && console.log("~~ CLICK 45"),
                                                            getElem(
                                                                ".QQQtest" + server_bs_close_post,
                                                                'div[aria-hidden="true"] .n7mw1l6l'
                                                            )[0].click())
                                                          : getElem(".QQQtest" + server_bs_close_postF1).filter(
                                                                (e, t) =>
                                                                    new RegExp(server_bs_close_postF2, "i").test(
                                                                        (t.getAttribute("aria-label") || "") +
                                                                            t.textContent
                                                                    )
                                                            ).length > 0 &&
                                                            -1 == window.location.href.indexOf("tab=inbox_plus") &&
                                                            (debug && console.log("~~ CLICK new45"),
                                                            getElem(".QQQtest" + server_bs_close_postF1)
                                                                .filter((e, t) =>
                                                                    new RegExp(server_bs_close_postF2, "i").test(
                                                                        (t.getAttribute("aria-label") || "") +
                                                                            t.textContent
                                                                    )
                                                                )[0]
                                                                .click()),
                                                      (TimerDelayVar1 =
                                                          1 == isPhotoInviting
                                                              ? loop_skip_secondtime
                                                                  ? setTimeout(function () {
                                                                        doPHOTO3();
                                                                    }, 4300 + _timerToCloseInsights)
                                                                  : setTimeout(function () {
                                                                        doPHOTO();
                                                                    }, 4300 + _timerToCloseInsights)
                                                              : setTimeout(function () {
                                                                    do4();
                                                                }, 4300 + _timerToCloseInsights))))
                                            : (debug && console.log("next page 12"), open_next_page()))))),
        n ||
            (getElem(".erefsdfdfds4q29" + server_inbox_close_addit_elem).length > 0 &&
                debug &&
                console.log("CLICKED here doNotCloseSpecialTab"));
}
function specialClosePostBackTry(e) {
    getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l').length > 0 &&
        -1 == window.location.href.indexOf("tab=inbox_plus") &&
        (debug && console.log("~~ CLICK 45, nr:" + e),
        getElem(".QQQtest" + server_bs_close_post, 'div[aria-hidden="true"] .n7mw1l6l')
            [4 == e ? "last" : "eq"](4 == e ? void 0 : 0)
            .click()),
        (TimerDelayVar1 = setTimeout(function () {
            0 == getElem("QQQQQtestPROFDASH" + server_pd_posts).length && e < 5
                ? (e++,
                  setTimeout(function () {
                      specialClosePostBackTry(e);
                  }, 4e3),
                  console.log("ERROR = We were not able to close the post in Insisghts, we try again"))
                : 1 == isPhotoInviting
                  ? loop_skip_secondtime
                      ? doPHOTO3()
                      : doPHOTO()
                  : do4();
        }, 4e3));
}
function specialClosePostBackTry2(e) {
    getElem(".QQQtest" + server_bs_close_postF1).filter((e, t) =>
        new RegExp(server_bs_close_postF2, "i").test((t.getAttribute("aria-label") || "") + t.textContent)
    ).length > 0 &&
        -1 == window.location.href.indexOf("tab=inbox_plus") &&
        getElem(".QQQtest" + server_bs_close_postF1)
            .filter((e, t) =>
                new RegExp(server_bs_close_postF2, "i").test((t.getAttribute("aria-label") || "") + t.textContent)
            )
            [4 == e ? "last" : "eq"](4 == e ? void 0 : 0)
            .click(),
        (TimerDelayVar1 = setTimeout(function () {
            0 == getElem("QQQQQtestPROFDASH" + server_pd_posts).length && e < 5
                ? (e++,
                  setTimeout(function () {
                      specialClosePostBackTry(e);
                  }, 4e3),
                  console.log("ERROR = We were not able to close the post in Insisghts, we try again"))
                : 1 == isPhotoInviting
                  ? loop_skip_secondtime
                      ? doPHOTO3()
                      : doPHOTO()
                  : do4();
        }, 4e3));
}
function clickCloseButton() {
    for (locali = 0; locali < getElem("._4t2a ._4-i0 ._51-u .layerCancel").length; locali++)
        getElem("._4t2a ._4-i0 ._51-u .layerCancel")[locali].click();
    getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length > 1 &&
        (debug && console.log("~~ CLICK 46"),
        getElem("._2pi9 .layerCancel, ._21ab .layerCancel")[
            getElem("._2pi9 .layerCancel, ._21ab .layerCancel").length - 1
        ].click()),
        getElem("._4t2a ._4-i0 ._51-u ._42ft,._4t2a ._pig ._8dwn ._8dvy", ".layerCancel._42ft", ".layerCancel._42ft")
            .length &&
            (debug && console.log("~~ CLICK 47"),
            getElem(
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
    if ((debug && console.log("open shared list"), 1 == scriptIsRunning))
        if (
            ((uiMorePagerPrimary = 0),
            (likeButtonsProcessed = 0),
            updatePopup(),
            debug && console.log("doSHAREDposts 1"),
            (window.location.href.indexOf("/adsmanager/") > 0 ||
                window.location.href.indexOf("/content_management") > 0 ||
                document.location.href.indexOf("/latest/posts") > 0 ||
                document.location.href.indexOf("/insights") > 0 ||
                document.location.href.indexOf("/latest/ad_center") > 0 ||
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
            0 ==
                (inputsPhoto2 = newNotificationScanInProgress
                    ? getElem(
                          '._37uu ._3399 ._524d ._36_q a._2x0m,.gtad4xkn .oi732d6d,.gtad4xkn div[role="button"] span',
                          ".hidden_elem a._2x0m"
                      )
                    : getElem(
                          '._37uu ._3399 ._524d ._36_q a._2x0m,.gtad4xkn .oi732d6d,.gtad4xkn div[role="button"] span',
                          ".hidden_elem a._2x0m"
                      ).last()).length &&
                getElem('.dkzmklf5 div[role="button"] span.gvxzyvdx' + server_bs_shared_posts_btn).length > 0 &&
                (debug && console.log("WE CLICK ON SHARED POSTS BUTTON NEW! 1"),
                document.location.href.indexOf("feed_and_grid") > 0 &&
                inputsComments &&
                inputsComments[totalPostsProcessed - 1]
                    ? ((inputsPhoto2 = $(inputsComments[totalPostsProcessed - 1]).find(
                          ".QQQNOT" + server_bs_shared_posts_btn
                      )),
                      debug && console.log("WE DETECT THE ELEMENT ONLY INSIDE THIS DIV:" + inputsPhoto2.length))
                    : (inputsPhoto2 = getElem(
                          '.dkzmklf5 div[role="button"] span.gvxzyvdx' + server_bs_shared_posts_btn
                      ))),
            0 == inputsPhoto2.length &&
                getElem('div[role="button"]').filter(function () {
                    return (
                        ($(this).find("span").text().indexOf("shares") > 0 &&
                            $(this).find("span").text().indexOf("shares") < 6) ||
                        ($(this).find("span").text().indexOf("Shares") > 0 &&
                            $(this).find("span").text().indexOf("Shares") < 6)
                    );
                }).length > 0 &&
                (inputsPhoto2 = getElem('div[role="button"]').filter(function () {
                    return (
                        ($(this).find("span").text().indexOf("shares") > 0 &&
                            $(this).find("span").text().indexOf("shares") < 6) ||
                        ($(this).find("span").text().indexOf("Shares") > 0 &&
                            $(this).find("span").text().indexOf("Shares") < 6)
                    );
                })),
            debug && console.log("AAAA=" + $(inputsPhoto2[0]).text()),
            1 == inputsPhoto2.length && $(inputsPhoto2[0]).text().indexOf("Comment") > -1 && (inputsPhoto2.length = 0),
            isNotificationTab &&
                !newNotificationScanInProgress &&
                ((inputsPhoto2.length = 0),
                getElem(".UFIList .UFIShareRow .UFIShareLink", ".hidden_elem .UFIShareLink").length > 0 &&
                    (inputsPhoto2 = getElem(".UFIList .UFIShareRow .UFIShareLink", ".hidden_elem .UFIShareLink")),
                0 == inputsPhoto2.length &&
                    getElem(".userContentWrapper ._4vn1 ._3rwx._42ft", ".hidden_elem ._3rwx._42ft").length > 0 &&
                    (inputsPhoto2 = getElem(".userContentWrapper ._4vn1 ._3rwx._42ft", ".hidden_elem ._3rwx._42ft"))),
            document.location.href.indexOf("/events/") > 0 && inputsPhoto2 && inputsPhoto2[scanManySharedOnPage + 1])
        )
            (lastphotoOpen = inputsPhoto2.length),
                debug && console.log("~~ CLICK 48"),
                inputsPhoto2[scanManySharedOnPage + 1].click(),
                (TimerDelayVar1 = setTimeout(function () {
                    StartLIKEPosts(0);
                }, fb_timeout_1)),
                scanManySharedOnPage++;
        else if (inputsPhoto2.length > 0 && -1 == document.location.href.indexOf("/events/"))
            (lastphotoOpen = inputsPhoto2.length),
                inputsPhoto2.length > 1 && !newNotificationScanInProgress
                    ? (debug && console.log("~~ CLICK 49"), inputsPhoto2[inputsPhoto2.length - 1].click())
                    : newNotificationScanInProgress && inputsPhoto2.length > 1
                      ? (debug && console.log("~~ CLICK 50"), inputsPhoto2[1].click())
                      : (debug && console.log("~~ CLICK 50a"), inputsPhoto2[0].click()),
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
                        (debug && console.log("~~ CLICK 51"),
                        $(this)[0].click(),
                        (e = !0),
                        (TimerDelayVar1 = setTimeout(function () {
                            StartLIKEPosts(0);
                        }, fb_timeout_1)));
                }),
                0 == inputsPhoto2.length &&
                    window.location.href.indexOf("/photos/") > 0 &&
                    getElem("._6iij ._355t._6iik ._3rwx").length > 0 &&
                    (debug && console.log("~~ CLICK 52"),
                    getElem("._6iij ._355t._6iik ._3rwx")[0].click(),
                    (e = !0),
                    (TimerDelayVar1 = setTimeout(function () {
                        StartLIKEPosts(0);
                    }, fb_timeout_1))),
                0 != inputsPhoto2.length ||
                    (3 != runMode && 4 != runMode) ||
                    (getElem(
                        'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                            server_bs_shared_posts_btn
                    ).length > 0
                        ? (console.log("WE CLICK ON SHARED POSTS BUTTON NEW! 2"),
                          debug && console.log("~~ CLICK 53"),
                          getElem(
                              'div[role="navigation"]>.oab4agdp>.r7ybg2qv,.dkzmklf5 div[role="button"] span.gvxzyvdx' +
                                  server_bs_shared_posts_btn
                          )[0].click(),
                          (e = !0),
                          (TimerDelayVar1 = setTimeout(function () {
                              StartLIKEPosts(0);
                          }, fb_timeout_1)))
                        : getElem("._355t._4vn2 ._3rwx").length > 0 &&
                          (debug && console.log("~~ CLICK 54"),
                          getElem("._355t._4vn2 ._3rwx")[0].click(),
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
            '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0,div[role="dialog"] .p8bdhjjv' +
                server_shared_items,
            "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
        )),
        debug && console.log("Shared posts here: " + inputsPhoto2.length),
        inputsPhoto2.length > 0 && itemProcessed != inputsPhoto2.length
            ? (debug && console.log("SCAN IT"), itemProcess(itemProcessed, inputsPhoto2))
            : e < 2
              ? (1 == ++e || 2 == e
                    ? (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(
                              2 * getScrollElemNewFb(scrollingNewFBDesignClassDef).height() * e
                          ),
                      getElem(scrollingNewFBDesignClass).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(
                              2 * getScrollElemNewFb(scrollingNewFBDesignClass).height() * e
                          ))
                    : (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(999999),
                      getElem(scrollingNewFBDesignClass).length > 0 &&
                          getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(999999)),
                (TimerDelayVar1 = setTimeout(function () {
                    StartLIKEPosts(e);
                }, 2500)))
              : (debug && console.log("GO TO NEXT Here 7"), ClosePostAndOpenNext(-1)));
}
function itemProcess(e, t, n, o) {
    (weAreInvitingFromShared = 0),
        1 == scriptIsRunning &&
            ($(t[e]).find(
                '.mfxi4zlt.scb9dxdr.dflh9lhu div[role="button"],.gf4momas.fwlpnqze.b0eko5f3 div[role="button"]' +
                    server_shared_show_attachment
            ).length > 0 &&
            (void 0 === o || !o)
                ? (debug && console.log("~~ CLICK 55"),
                  $(t[e])
                      .find(
                          '.mfxi4zlt.scb9dxdr.dflh9lhu div[role="button"],.gf4momas.fwlpnqze.b0eko5f3 div[role="button"]' +
                              server_shared_show_attachment
                      )[0]
                      .click(),
                  (TimerDelayVar1 = setTimeout(function () {
                      itemProcess(e, t, n, !0);
                  }, 3500)),
                  setTimeout(function () {
                      $(t[e])
                          .find('div[role="button"] span')
                          .filter(function () {
                              return (
                                  $(this).find("span").text().match("View [0-9]+ previous comments") ||
                                  $(this).find("span").text().match("View [0-9]+ more reply") ||
                                  $(this).find("span").text().match("View [0-9]+ more replies") ||
                                  $(this).find("span").text().match("View more replies") ||
                                  $(this).find("span").text().match("[0-9]+ Replies") ||
                                  $(this).find("span").text().match("[0-9]+ Reply") ||
                                  $(this).find("span").text().match("View [0-9]+ more comment") ||
                                  $(this).find("span").text().match("View [0-9]+ more comments")
                              );
                          }).length > 0 &&
                          $(t[e])
                              .find('div[role="button"] span')
                              .filter(function () {
                                  return (
                                      $(this).find("span").text().match("View [0-9]+ previous comments") ||
                                      $(this).find("span").text().match("View [0-9]+ more reply") ||
                                      $(this).find("span").text().match("View [0-9]+ more replies") ||
                                      $(this).find("span").text().match("View more replies") ||
                                      $(this).find("span").text().match("[0-9]+ Replies") ||
                                      $(this).find("span").text().match("[0-9]+ Reply") ||
                                      $(this).find("span").text().match("View [0-9]+ more comment") ||
                                      $(this).find("span").text().match("View [0-9]+ more comments")
                                  );
                              })[0]
                              .click();
                  }, 1e3))
                : $(t[e])
                        .find('div[role="button"] span')
                        .filter(function () {
                            return (
                                $(this).find("span").text().match("View [0-9]+ previous comments") ||
                                $(this).find("span").text().match("View [0-9]+ more reply") ||
                                $(this).find("span").text().match("View [0-9]+ more replies") ||
                                $(this).find("span").text().match("View more replies") ||
                                $(this).find("span").text().match("[0-9]+ Replies") ||
                                $(this).find("span").text().match("[0-9]+ Reply") ||
                                $(this).find("span").text().match("View [0-9]+ more comment") ||
                                $(this).find("span").text().match("View [0-9]+ more comments")
                            );
                        }).length > 0
                  ? ($(t[e])
                        .find('div[role="button"] span')
                        .filter(function () {
                            return (
                                $(this).find("span").text().match("View [0-9]+ previous comments") ||
                                $(this).find("span").text().match("View [0-9]+ more reply") ||
                                $(this).find("span").text().match("View [0-9]+ more replies") ||
                                $(this).find("span").text().match("View more replies") ||
                                $(this).find("span").text().match("[0-9]+ Replies") ||
                                $(this).find("span").text().match("[0-9]+ Reply") ||
                                $(this).find("span").text().match("View [0-9]+ more comment") ||
                                $(this).find("span").text().match("View [0-9]+ more comments")
                            );
                        })[0]
                        .click(),
                    (TimerDelayVar1 = setTimeout(function () {
                        itemProcess(e, t, n, !0);
                    }, 2e3)))
                  : (debug && console.log("stop_on_captcha_shown:" + stop_on_captcha_shown),
                    (!stop_on_captcha_shown || (stop_on_captcha_shown && noFbLimitTriggered())) &&
                    !checkLimitationPopup2()
                        ? ((temp_block_help = !1),
                          void 0 === n && (tryToChangePoster = !1),
                          console.log("we processe item=" + e),
                          e > 2 &&
                              $(t[e - 3]) &&
                              ((itemRemovedSharedScroll = !0),
                              $(t[e - 3]).remove(),
                              e--,
                              console.log("we are removing element, now we check:" + e),
                              (t = getElem(
                                  '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0,div[role="dialog"] .p8bdhjjv' +
                                      server_shared_items,
                                  "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
                              ))),
                          e < t.length
                              ? ((sharedPostsStuckCheck = 0),
                                $(t[e]).find("._5vsi._192z ._5ybo._5yhh").length &&
                                    $(t[e]).find("._5vsi._192z ._5ybo._5yhh").length,
                                (localtimeout = 10),
                                0 == (commentLink = $(t[e]).find("._37uu .comment_link,._18vi ._666h")).length &&
                                    $(t[e]).find(
                                        'div[aria-label="' + getTextForCurrentLanguage("leaveAComment") + '"]'
                                    ) &&
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
                                (total_shared_posts_liked < share_likes_limit ||
                                    (share_put_comments &&
                                        text_comm_shares.length > 1 &&
                                        total_shared_posts_commented < share_comments_limit))
                                    ? (sharedPostsStuckCheck++, itemsLoadMore(0, 4))
                                    : (debug && console.log("GO TO NEXT Here 8"),
                                      setTimeout(function () {
                                          ClosePostAndOpenNext(-1);
                                      }, 500))))
                        : stopScript(api.i18n.getMessage("extension_stopped_fb_popup"))));
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
            : (debug &&
                  (console.log("HHHHHHHHHHHHHHHH 0"), console.log("ERROR: Comment button not found 1 (SECOND CHECK)")),
              share_put_likes &&
                  total_shared_posts_liked < share_likes_limit &&
                  ($(t[e]).find("._37uu ._3m9g,button.bp9cbjyn").length > 0 ||
                      "postPage" != do_not_check_who_comments2) &&
                  $(t[e])
                      .find(
                          '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"],div[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"],._18vi a._6a-y,.ozuftl9m div[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"]'
                      )
                      .not(
                          ".commentable_item ._37uu ._42nr ._1mto ._khz .UFILinkBright, ._55ij .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink, ._4-u2.aero .commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi a._3_16"
                      ).length > 0 &&
                  ((temp_block_help = !0), console.log("HHHHHHHHHHHHHHHH 1"), tryToLikeOnlyNoCommentAvailable(e, t))),
        temp_block_help ||
            (e++,
            (itemProcessed = e),
            (TimerDelayVar1 = setTimeout(function () {
                itemProcess(e, t);
            }, localtimeout)));
}
function checkInvitesOnShares(e, t) {
    if (1 == scriptIsRunning)
        if (
            (debug &&
                (console.log("======================== CHECK HERE"),
                console.log("======================== CHECK HERE:" + getCurrentPageTitle()),
                console.log(inviteDuringShareCheck),
                console.log(
                    inviteDuringShareCheck &&
                        $(t[e])
                            .find(".qqqqTestQ" + server_new_like_block)
                            .not('span[aria-hidden="true"] .nnzkd6d7' + server_main_like_to_clickIgnor).length > 0 &&
                        (0 ==
                            $(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv").length ||
                            $(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                            getCurrentPageTitle().startsWith(
                                $(t[e])
                                    .find(
                                        "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                            server_shared_author
                                    )
                                    .not("._5u5j .fcg .fwb>a._wpv")[0].text
                            ) ||
                            (shares_reply_ignore_array.length > 0 &&
                                arrayInStringFound(
                                    shares_reply_ignore_array,
                                    $(t[e])
                                        .find(
                                            "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                server_shared_author
                                        )
                                        .not("._5u5j .fcg .fwb>a._wpv")[0].text
                                )))
                )),
            inviteDuringShareCheck &&
                "pro" != psscr &&
                $(t[e])
                    .find(".qqqqTestQ" + server_new_like_block)
                    .not('span[aria-hidden="true"] .nnzkd6d7' + server_main_like_to_clickIgnor).length > 0 &&
                (0 ==
                    $(t[e])
                        .find(
                            "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                server_shared_author
                        )
                        .not("._5u5j .fcg .fwb>a._wpv").length ||
                    $(t[e])
                        .find(
                            "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                server_shared_author
                        )
                        .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                    getCurrentPageTitle().startsWith(
                        $(t[e])
                            .find(
                                "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                    server_shared_author
                            )
                            .not("._5u5j .fcg .fwb>a._wpv")[0].text
                    ) ||
                    (shares_reply_ignore_array.length > 0 &&
                        arrayInStringFound(
                            shares_reply_ignore_array,
                            $(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0].text
                        ))))
        ) {
            debug && console.log("Check likes here!");
            var n = 5e3;
            (n += clickLikeButtonsInsideContainer(
                $(t[e])
                    .find(".qqqqTestQ" + server_new_like_block)
                    .not('span[aria-hidden="true"] .nnzkd6d7' + server_main_like_to_clickIgnor)[0]
            )),
                (weAreInvitingFromShared = 1),
                (sharedI = e),
                (sharedInputs = t),
                (TimerDelayVar1 = setTimeout(function () {
                    StartInvitePeople();
                }, n));
        } else debug && console.log("no invites, go to next shared post"), checkInvitesOnShares2(e, t);
}
function checkInvitesOnShares2(e, t) {
    1 == scriptIsRunning &&
        (debug && console.log("TTTTT check we need to like comments 1"),
        (inviteDuringShareCheck2 && "pro" != psscr) || (likeSharedComments && "pro" != psscr)
            ? (debug && console.log("TTTTT check we need to like comments 2"),
              (0 == $(t[e]).find('.UFIContainer a[href*="' + getCurrentPage() + '"]').length &&
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
                          document.location.href.indexOf("/latest/posts") > 0 ||
                          document.location.href.indexOf("/insights") > 0 ||
                          document.location.href.indexOf("/latest/ad_center") > 0) &&
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
                  $(t[e]).find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .length > 0 &&
                  $(t[e])
                      .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .text() &&
                  ($(t[e])
                      .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .text()
                      .indexOf(getCurrentPageTitle()) >= 0 ||
                      $(t[e])
                          .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                          .text()
                          .indexOf(getCurrentPageTitle2(e, t)) >= 0) &&
                  !arrayInStringFound(
                      do_not_check_shared_my_name_s_Array,
                      $(t[e]).find('._1p1t ._1p1v,div[data-visualcompletion="ignore"] .l9j0dhe7 .m9osqain').text()
                  ))
                  ? (debug && console.log("TTTTT check we need to like comments 3 NOOO"),
                    debug && console.log("no our comment here 1"),
                    likeSharedComments &&
                    "pro" != psscr &&
                    $(t[e]).find(
                        ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li" +
                            server_shared_comments
                    ).length > 0
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
                                      ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li" +
                                          server_shared_comments
                                  )
                              );
                          }, 1e3))
                        : futureAdditionalOptionForSharesPostHere(e, t))
                  : (debug && console.log("TTTTT check we need to like comments 4 YES"),
                    debug && console.log("WE HAVE OUR COMMENT HERE! Let's scan it if we find it!"),
                    $(t[e]).find(
                        ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li" +
                            server_shared_comments
                    ).length > 0
                        ? (debug &&
                              console.log(
                                  "We have comments here:" +
                                      $(t[e]).find(
                                          ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li" +
                                              server_shared_comments
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
                                      ".commentable_item .UFIRow.UFIComment,.commentable_item ul._7791>li,.cwj9ozl2>ul>li" +
                                          server_shared_comments
                                  )
                              );
                          }, 1e3))
                        : setTimeout(function () {
                              futureAdditionalOptionForSharesPostHere(e, t);
                          }, 500)))
            : (debug && console.log("TTTTT check we need to like comments WTF"),
              futureAdditionalOptionForSharesPostHere(e, t)));
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
                          $(o[n])
                              .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                              .text()
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
              ($(o[n]).find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author).length >
                  0 &&
                  $(o[n])
                      .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .text() &&
                  $(o[n])
                      .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .text()
                      .indexOf(getCurrentPageTitle()) >= 0) ||
              arrayInStringFound(
                  do_not_check_shared_my_name_s_Array,
                  $(o[n])
                      .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                      .text()
              )
                  ? inviteDuringShareCheck2 && "pro" != psscr
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
                    getCurrentPageTitle() != getCurrentPageTitle2(e, t) &&
                        likeSharedComments &&
                        "pro" != psscr &&
                        $(o[n])
                            .find(
                                '._khz .UFILikeLink,div[role="button"] .bdca9zbp,._6coj a._6a-y,a[aria-label="' +
                                    getTextForCurrentLanguage("likeButton") +
                                    '"],div[aria-label="' +
                                    getTextForCurrentLanguage("likeButton") +
                                    '"]'
                            )
                            .not("._khz .UFILinkBright,a._3_16").length > 0 &&
                        ($(o[n])
                            .find(
                                '._khz .UFILikeLink,div[role="button"] .bdca9zbp,._6coj a._6a-y,a[aria-label="' +
                                    getTextForCurrentLanguage("likeButton") +
                                    '"],div[aria-label="' +
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
                ? (stopScript(api.i18n.getMessage("extension_stopped_fb_popup")), !1)
                : (debug && console.log("next page 13"), open_next_page(), !1)))
    );
}
function checkIfWeCanCommentByPage(e, t) {
    getCurrentPageTitle() != getCurrentPageTitle2(e, t)
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
        !0
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
function posterToBusinessPageChange(e, t, n, o, i, s) {
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
                            s == $(this).text()
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
                          posterToBusinessPageChange(e + 1, t, n, o, i, s);
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
          getCurrentPageTitle() != getCurrentPageTitle2(e, t) &&
              share_put_likes &&
              total_shared_posts_liked < share_likes_limit &&
              $(t[e])
                  .find(
                      '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                          getTextForCurrentLanguage("likeButton") +
                          '"],div[aria-label="' +
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
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv").length ||
                  $(t[e])
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                  (shares_reply_ignore_array.length > 0 &&
                      arrayInStringFound(
                          shares_reply_ignore_array,
                          $(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text
                      )) ||
                  ($(t[e])
                      .find(
                          '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                              getTextForCurrentLanguage("likeButton") +
                              '"],div[aria-label="' +
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
        getCurrentPageTitle() != getCurrentPageTitle2(e, t) &&
            share_put_likes &&
            total_shared_posts_liked < share_likes_limit &&
            $(t[e])
                .find(
                    '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                        getTextForCurrentLanguage("likeButton") +
                        '"],div[aria-label="' +
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
                    .find(
                        "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                            server_shared_author
                    )
                    .not("._5u5j .fcg .fwb>a._wpv").length ||
                $(t[e])
                    .find(
                        "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                            server_shared_author
                    )
                    .not("._5u5j .fcg .fwb>a._wpv")[0].text == getCurrentPageTitle() ||
                (shares_reply_ignore_array.length > 0 &&
                    arrayInStringFound(
                        shares_reply_ignore_array,
                        $(t[e])
                            .find(
                                "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                    server_shared_author
                            )
                            .not("._5u5j .fcg .fwb>a._wpv")[0].text
                    )) ||
                ($(t[e])
                    .find(
                        '.commentable_item ._37uu ._42nr ._1mto ._khz .UFILikeLink,._18vi .e71nayrh._18vj .bdca9zbp,._1dnh a[aria-label="' +
                            getTextForCurrentLanguage("likeButton") +
                            '"],div[aria-label="' +
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
        getCurrentPageTitle() != getCurrentPageTitle2(e, t) &&
        share_put_comments &&
        text_comm_shares.length > 1 &&
        total_shared_posts_commented < share_comments_limit
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
                  '._5ki2 ._4-u2._4mrt._5jmm,div[role="dialog"] .buofh1pr>.sjgh65i0,div[role="dialog"] .p8bdhjjv' +
                      server_shared_items,
                  "#pagelet_timeline_main_column ._4-u2._4mrt._5jmm,.hidden_elem ._4-u2._4mrt._5jmm"
              ).length > 0 &&
              getElem("a.profileLink,.fcg .fwb a").length > 0 &&
              (e = getElem("a.profileLink,.fcg .fwb a").first().text()),
          (window.location.href.indexOf("/creatorstudio") > 0 ||
              window.location.href.indexOf("/watch/") > 0 ||
              window.location.href.indexOf("/videos/") > 0) &&
          "" != pageNameAdditionalCheck
              ? (e = pageNameAdditionalCheck)
              : getElem(
                      "#mediaManagerPagesSelector .qku1pbnj,#mediaManagerPagesSelector .l5k26z4s,#mediaManagerPagesSelector .j1p9ls3c"
                  ).length > 0 && window.location.href.indexOf("tab=inbox_plus") > 0
                ? (e = getElem(
                      "#mediaManagerPagesSelector .qku1pbnj,#mediaManagerPagesSelector .l5k26z4s,#mediaManagerPagesSelector .j1p9ls3c"
                  ).text())
                : window.location.href.indexOf("/videos/") > 0 && getElem("._437j ._6dic a._371y").length > 0
                  ? (e = getElem("._437j ._6dic a._371y").first().text())
                  : window.location.href.indexOf("facebook.com/ads/") > 0 ||
                      window.location.href.indexOf("facebook.com/adsmanager/") > 0 ||
                      window.location.href.indexOf("/content_management") > 0 ||
                      document.location.href.indexOf("/latest/posts") > 0 ||
                      document.location.href.indexOf("/insights") > 0 ||
                      document.location.href.indexOf("/latest/") > 0
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
                                      ).length > 0 &&
                                      (document.location.href.indexOf("/latest/posts") > 0 ||
                                          document.location.href.indexOf("/insights") > 0)
                                    ? getElem(
                                          'div[data-pagelet="BizKitLocalScopeSelector"] .yukb02kx .rwb8dzxj .a53abz89>.qku1pbnj'
                                      )
                                          .first()
                                          .text()
                                    : getElem('div[role="article"] .buofh1pr .nc684nl6').length > 0
                                      ? getElem('div[role="article"] .buofh1pr .nc684nl6').first().text()
                                      : getElem(".m5trb1xt>.qrxcjm7n" + server_bs_page_name).length > 0
                                        ? getElem(".m5trb1xt>.qrxcjm7n" + server_bs_page_name)
                                              .first()
                                              .text()
                                        : "skip")
                    : window.location.href.indexOf("/photos/") > 0 &&
                        getElem(".fbPhotoContributorName ._hli").length > 0
                      ? (e = getElem(".fbPhotoContributorName ._hli").text())
                      : getElem(".fbPhotoContributorName a._hli").length > 0
                        ? (e = getElem(".fbPhotoContributorName a._hli").text())
                        : "Facebook" == e && getElem('div[role="main"] .x1e56ztr.x1xmf6yo h1.x1heor9g').length > 0
                          ? (e = getElem('div[role="main"] .x1e56ztr.x1xmf6yo h1.x1heor9g').first().text())
                          : "" == e &&
                            (e = (e =
                                getElem('div[role="main"] .x1e56ztr.x1xmf6yo h1.x1heor9g').length > 0
                                    ? getElem('div[role="main"] .x1e56ztr.x1xmf6yo h1.x1heor9g').first().text()
                                    : "(" == document.getElementsByTagName("title")[0].innerHTML.substring(0, 1)
                                      ? document
                                            .getElementsByTagName("title")[0]
                                            .innerHTML.substring(
                                                document.getElementsByTagName("title")[0].innerHTML.indexOf(" ") + 1
                                            )
                                      : document.getElementsByTagName("title")[0].innerHTML).replace(
                                " | Facebook",
                                ""
                            )),
          document.location.href.indexOf("/events/") > 0 &&
              getElem("._5gnb ._b9- a").length > 0 &&
              (e = getElem("._5gnb ._b9- a").text()),
          "" != pageNameAdditionalCheck && "" == e && (e = pageNameAdditionalCheck)),
    (e = (e = (e = (e = (e = e.replace("‬", "")).replace("‫", "")).replace("​", "")).replace(
        " | Facebook",
        ""
    )).replace(" - Posts", "")).indexOf("&") > -1) &&
        (e = new DOMParser().parseFromString(e, "text/html").body.textContent);
    return oneReportOnly || ((oneReportOnly = !0), console.log("Page Name=" + e)), e;
}
function getCurrentPageTitle2(e, t) {
    return $(t[e]).find(".fcg>a.profileLink,h3 .nc684nl6 a,h3 .rse6dlih a" + server_shared_author).length > 0
        ? $(t[e]).find(".fcg>a.profileLink,h3 .nc684nl6 a,h3 .rse6dlih a" + server_shared_author)[0].text
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
            return e.toString().toLowerCase().length > 1 && t.toLowerCase().indexOf(e.toString().toLowerCase()) >= 0;
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
            $(t[e]).find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author).length >
                0 &&
            $(t[e])
                .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                .text() &&
            ($(t[e])
                .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                .text()
                .indexOf(getCurrentPageTitle()) >= 0 ||
                $(t[e])
                    .find('a[role="link"] .d2edcug0,a[role="link"] .fxk3tzhb' + server_shared_comment_author)
                    .text()
                    .indexOf(getCurrentPageTitle2(e, t)) >= 0)
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
                document.location.href.indexOf("/latest/posts") > 0 ||
                document.location.href.indexOf("/insights") > 0 ||
                document.location.href.indexOf("/latest/ad_center") > 0) &&
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
                      '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x,.x1n2onr6 div[role="textbox"] p'
                  ).length > 0 &&
                      (0 == shares_reply_ignore_array.length ||
                          0 == getSharedPostAuthorName($(t[e])).length ||
                          (shares_reply_ignore_array.length > 0 &&
                              !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
                      (0 == getSharedPostAuthorName($(t[e])).length ||
                          $(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
                      (0 == shares_list_delete_days ||
                          !$(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                          ($(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                              "" ==
                                  getIdFromThisLink(
                                      $(t[e])
                                          .find(
                                              "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                  server_shared_author
                                          )
                                          .not("._5u5j .fcg .fwb>a._wpv")[0]
                                          .getAttribute("href")
                                  )) ||
                          ($(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                              0 ==
                                  obj.msgListSentID.hasOwnProperty(
                                      getIdFromThisLink(
                                          $(t[e])
                                              .find(
                                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                      server_shared_author
                                              )
                                              .not("._5u5j .fcg .fwb>a._wpv")[0]
                                              .getAttribute("href")
                                      )
                                  )))) ||
                      (console.log(
                          $(t[e]).find(
                              '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x,.x1n2onr6 div[role="textbox"] p'
                          ).length
                      ),
                      console.log(shares_reply_ignore_array.length),
                      console.log(
                          $(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0].text
                      ),
                      console.log(getCurrentPageTitle()),
                      console.log(
                          $(t[e])
                              .find(
                                  "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                      server_shared_author
                              )
                              .not("._5u5j .fcg .fwb>a._wpv")[0]
                      ),
                      console.log(
                          obj.msgListSentID.hasOwnProperty(
                              getIdFromThisLink(
                                  $(t[e])
                                      .find(
                                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                              server_shared_author
                                      )
                                      .not("._5u5j .fcg .fwb>a._wpv")[0]
                                      .getAttribute("href")
                              )
                          )
                      ),
                      console.log("======================!!"))),
              $(t[e]).find(
                  '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x,.x1n2onr6 div[role="textbox"] p'
              ).length > 0 &&
              (0 == shares_reply_ignore_array.length ||
                  0 == getSharedPostAuthorName($(t[e])).length ||
                  (shares_reply_ignore_array.length > 0 &&
                      !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
              (0 == getSharedPostAuthorName($(t[e])).length ||
                  $(t[e])
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
              (0 == shares_list_delete_days ||
                  !$(t[e])
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                  ($(t[e])
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                      "" ==
                          getIdFromThisLink(
                              $(t[e])
                                  .find(
                                      "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                          server_shared_author
                                  )
                                  .not("._5u5j .fcg .fwb>a._wpv")[0]
                                  .getAttribute("href")
                          )) ||
                  ($(t[e])
                      .find(
                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                              server_shared_author
                      )
                      .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                      0 ==
                          obj.msgListSentID.hasOwnProperty(
                              getIdFromThisLink(
                                  $(t[e])
                                      .find(
                                          "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                              server_shared_author
                                      )
                                      .not("._5u5j .fcg .fwb>a._wpv")[0]
                                      .getAttribute("href")
                              )
                          )))
                  ? (debug && console.log("WE are find and will comment right now!"),
                    $(t[e])
                        .find(
                            '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x,.x1n2onr6 div[role="textbox"]'
                        )[0]
                        .click(),
                    setTimeout(function () {}, 200),
                    setTimeout(function () {
                        if (
                            ((temp_text = getCommSharesRandomText()).search("%name") >= 0 &&
                            $(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv").length > 0
                                ? (temp_text = addUserNameToComment(
                                      temp_text,
                                      $(t[e])
                                          .find(
                                              "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                  server_shared_author
                                          )
                                          .not("._5u5j .fcg .fwb>a._wpv")[0].text,
                                      $(t[e])
                                          .find(
                                              "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                  server_shared_author
                                          )
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
                            try {
                                $(t[e]).find(".x1n2onr6").last().sendkeys("try to insert"),
                                    console.log("try to add comment");
                            } catch (e) {
                                console.log("Error during posting a comment:" + e);
                            }
                            debug && console.log("submit"),
                                (elementUpdCommentText.innerHTML = temp_text),
                                $(t[e])
                                    .find(
                                        '.UFIAddCommentInput ._1mf span,div[role="textbox"] ._1mf span,.l9j0dhe7 div[role="textbox"] .hcukyx3x span,.x1n2onr6 div[role="textbox"]'
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
                        '.UFIAddCommentInput ._1mf,div[role="textbox"] ._1mf,.l9j0dhe7 div[role="textbox"] .hcukyx3x,.x1n2onr6 div[role="textbox"] p'
                    ).length > 0 &&
                        (0 == shares_reply_ignore_array.length ||
                            0 == getSharedPostAuthorName($(t[e])).length ||
                            (shares_reply_ignore_array.length > 0 &&
                                !arrayInStringFound(shares_reply_ignore_array, getSharedPostAuthorName($(t[e]))))) &&
                        (0 == getSharedPostAuthorName($(t[e])).length ||
                            $(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0].text != getCurrentPageTitle()) &&
                        (0 == shares_list_delete_days ||
                            !$(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0] ||
                            ($(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                                "" ==
                                    getIdFromThisLink(
                                        $(t[e])
                                            .find(
                                                "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                    server_shared_author
                                            )
                                            .not("._5u5j .fcg .fwb>a._wpv")[0]
                                            .getAttribute("href")
                                    )) ||
                            ($(t[e])
                                .find(
                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                        server_shared_author
                                )
                                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
                                1 ==
                                    obj.msgListSentID.hasOwnProperty(
                                        getIdFromThisLink(
                                            $(t[e])
                                                .find(
                                                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                                        server_shared_author
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
                .find(
                    "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                        server_shared_author
                )
                .not("._5u5j .fcg .fwb>a._wpv")[0] &&
            "" !=
                getIdFromThisLink(
                    $(t[e])
                        .find(
                            "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                server_shared_author
                        )
                        .not("._5u5j .fcg .fwb>a._wpv")[0]
                        .getAttribute("href")
                ) &&
            ((obj.msgListSentID[
                getIdFromThisLink(
                    $(t[e])
                        .find(
                            "._5u5j .fcg .fwb a.profileLink,._5u5j .fcg .fwb>a,h3 .nc684nl6 a,h3 .rse6dlih a" +
                                server_shared_author
                        )
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
                            console.log("click doSHAREDposts 3"),
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
    (_temp_ScanBeforeInvFilterActive = 0),
        (_temp_btnQuantityLastTime = 0),
        (_temp_btnQuantitySameInRow = 0),
        (_temp_scrollsQuantityDone = 0),
        (checkTwice = 0),
        1 == scriptIsRunning &&
            (1 == skip_Invite && 0 == weAreInvitingFromShared
                ? setTimeout(function () {
                      ClosePostAndOpenNext(-1);
                  }, 20)
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
                    0 == bigPostTabs.length &&
                        getNewUIMainScrollOnly(
                            '.x1ey2m1c.x13vifvy .x1i10hfl[role="tab"]',
                            '.qi72231t[aria-disabled="true"]'
                        ).length > 0 &&
                        getNewUIMainScrollOnly(
                            '.x1ey2m1c.x13vifvy .x1i10hfl[role="tab"]',
                            '.qi72231t[aria-disabled="true"]'
                        ).each(function (e) {
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
                    ) || isThisNewFbDesign2020()
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
    debug && console.log("StartInvitePeopleOLD"),
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
        (inviteFailed = 0),
        fast_scan && loadsWithNoInvite > fast_scan_loads && !weAreScanningOnlyInvites
            ? weAreScanningOnlyInvites
                ? ((weAreScanningOnlyInvites = !1), console.log("Stop, debug: A1"), stopScript())
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
                              getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(55999944),
                          getElem(scrollingNewFBDesignClass).length > 0 &&
                              getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(55999944)),
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
                                          stopScript(api.i18n.getMessage("fb_popup_report"), !0);
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
                : fmob &&
                    getElem("a.touchable.primary").filter(function () {
                        return (
                            $(this).find("strong").length > 0 &&
                            ($(this).find("strong").text().toLowerCase().startsWith("see more") ||
                                $(this).find("strong").text().toLowerCase().startsWith("vedi altri"))
                        );
                    }).length > 0
                  ? setTimeout(function () {
                        uiMorePagerPrimary++,
                            updatePopup(),
                            totalShowModeClickedForRun++,
                            getElem("a.touchable.primary")
                                .filter(function () {
                                    return (
                                        $(this).find("strong").length > 0 &&
                                        ($(this).find("strong").text().toLowerCase().startsWith("see more") ||
                                            $(this).find("strong").text().toLowerCase().startsWith("vedi altri"))
                                    );
                                })[0]
                                .click(),
                            setTimeout(function () {
                                InvitePeople(e);
                            }, 1500);
                    }, 200)
                  : fmob
                    ? setTimeout(function () {
                          uiMorePagerPrimary++,
                              updatePopup(),
                              totalShowModeClickedForRun++,
                              $("html, body").scrollTop(999999),
                              setTimeout(function () {
                                  InvitePeople(e);
                              }, 1500);
                      }, 200)
                    : ((uiMorePagerPrimary = 0),
                      (likeButtonsProcessed = 0),
                      debug && console.log("GO TO NEXT Here 13"),
                      setTimeout(function () {
                          ClosePostAndOpenNext(e);
                      }, 20)),
        updatePopup();
}
function InvitePeople(e) {
    debug && console.log("InvitePeople"),
        1 == scriptIsRunning &&
            (hadInvitedButton > 0 && (hadInvitedButton = 2 * hadInvitedButton + 2),
            (canSKIPButton -= hadInvitedButton) < 3 && (canSKIPButton = 0),
            0 ==
                (inputsInvites = getElem(".uiScrollableAreaWrap ._5i_p .uiList._4kg", ".hidden_elem .uiList._4kg")
                    .find("._5i_q ._6a._6b button._51sy,._5i_q ._6a._6b a._51sy")
                    .not("._5i_q ._6a._6b a._59pe,._5i_q ._6a._6b button._51sy.hidden_elem,.uiPopover>a._51sy"))
                    .length &&
                getNewInviteButtonsByText().length > 0 &&
                isThisNewFbDesign2020() &&
                ((newFBinviteDesign = !0), (inputsInvites = getNewInviteButtonsByText()), (scanByNameNewUI = !0)),
            debug && console.log("Inv t nr1:" + inputsInvites.length),
            0 == inputsInvites.length &&
                weAreScanningOnlyInvites &&
                (getElem("._1uja").length > 0 || getElem('div[aria-label="Invite"]').length > 0) &&
                (inputsInvites = getElem('._1uja,div[aria-label="Invite"]')),
            debug && console.log("Inv t nr2:" + inputsInvites.length),
            inputsInvites.length > 0
                ? ((tryToLoad = 0),
                  (3 == runMode ||
                      4 == runMode ||
                      ((1 == runMode || 2 == runMode) &&
                          ((inviteDuringShareCheck && "pro" != psscr) ||
                              (inviteDuringShareCheck2 && "pro" != psscr) ||
                              (likeSharedComments && "pro" != psscr) ||
                              share_put_likes ||
                              (share_put_comments && text_comm_shares.length > 1)))) &&
                      (inputsInvites2 = getElem(
                          "#reaction_profile_browser .FriendRequestAdd._51sy, #reaction_profile_browser1 .FriendRequestAdd._51sy, #reaction_profile_browser2 .FriendRequestAdd._51sy, #reaction_profile_browser3 .FriendRequestAdd._51sy, #reaction_profile_browser4 .FriendRequestAdd._51sy, #reaction_profile_browser5 .FriendRequestAdd._51sy, #reaction_profile_browser6 .FriendRequestAdd._51sy, #reaction_profile_browser7 .FriendRequestAdd._51sy, #reaction_profile_browser8 .FriendRequestAdd._51sy, #reaction_profile_browser9 .FriendRequestAdd._51sy",
                          ".hidden_elem #reaction_profile_browser .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser1 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser2 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser3 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser4 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser5 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser6 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser7 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser8 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser9 .FriendRequestAdd._51sy"
                      )).length > 4 &&
                      inputsInvites2.length > inputsInvites.length / 3 &&
                      ((inviteDuringShareCheck && "pro" != psscr) ||
                      (inviteDuringShareCheck2 && "pro" != psscr) ||
                      (likeSharedComments && "pro" != psscr) ||
                      share_put_likes ||
                      (share_put_comments && text_comm_shares.length > 1) ||
                      weAreInvitingFromShared > 0 ||
                      weAreScanningOnlyShared
                          ? ((localuse = 1), debug && console.log("GO TO NEXT Here 14"), ClosePostAndOpenNext(e))
                          : (debug && console.log("next page 14"), open_next_page())),
                  0 == localuse &&
                      (debug &&
                          console.log(
                              "totalLikedCheck=" +
                                  totalLikedCheck +
                                  ". inputsInvites.length=" +
                                  inputsInvites.length +
                                  ". clickedForMore=" +
                                  clickedForMore +
                                  ". loopmaxtry=" +
                                  loopmaxtry
                          ),
                      (0 != scroll_before_inv_nr && 1 != _temp_ScanBeforeInvFilterActive) ||
                      totalLikedCheck != inputsInvites.length ||
                      !(0 == clickedForMore || (newFBinviteDesign && loopmaxtry > 1))
                          ? (0 != scroll_before_inv_nr && 1 != _temp_ScanBeforeInvFilterActive) ||
                            totalLikedCheck != inputsInvites.length
                              ? ((loopmaxtry = 0),
                                (totalLikedCheck = inputsInvites.length),
                                scroll_before_inv_nr > 0 &&
                                scroll_before_inv_nr > _temp_scrollsQuantityDone &&
                                _temp_btnQuantitySameInRow < 4
                                    ? (inputsInvites.length == _temp_btnQuantityLastTime &&
                                          _temp_btnQuantitySameInRow++,
                                      (_temp_btnQuantityLastTime = inputsInvites.length),
                                      _temp_btnQuantitySameInRow >= 4
                                          ? ((_temp_ScanBeforeInvFilterActive = 1), InvitePeople(e))
                                          : (getElem(scrollingNewFBDesignClassDef).length > 0 &&
                                                getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(55999944),
                                            getElem(scrollingNewFBDesignClass).length > 0 &&
                                                getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(55999944),
                                            updatePopup(". Scrolls before start: " + ++_temp_scrollsQuantityDone),
                                            setTimeout(
                                                function () {
                                                    InvitePeople(e);
                                                },
                                                Math.round(3e3 + 1e3 * fb_limit_show_more_btn_add_sec)
                                            )))
                                    : ((_temp_ScanBeforeInvFilterActive = 1),
                                      loadsWithNoInvite++,
                                      setTimeout(function () {
                                          inviteNext(canSKIPButton, inputsInvites, e);
                                      }, 20)))
                              : 5 == ++loopmaxtry || (hadClickedMoreButton > 200 && !newFBinviteDesign)
                                ? weAreScanningOnlyInvites
                                    ? ((weAreScanningOnlyInvites = !1), console.log("Stop, debug: A3"), stopScript())
                                    : (debug && console.log("GO TO NEXT Here 16"), ClosePostAndOpenNext(e))
                                : setTimeout(function () {
                                      InvitePeople2(e);
                                  }, 1500)
                          : weAreScanningOnlyInvites
                            ? ((weAreScanningOnlyInvites = !1), console.log("Stop, debug: A2"), stopScript())
                            : (debug && console.log("GO TO NEXT Here 15"), ClosePostAndOpenNext(e))),
                  (localuse = 0))
                : ((inputsInvites2 = getElem(
                        "#reaction_profile_browser .FriendRequestAdd._51sy, #reaction_profile_browser1 .FriendRequestAdd._51sy, #reaction_profile_browser2 .FriendRequestAdd._51sy, #reaction_profile_browser3 .FriendRequestAdd._51sy, #reaction_profile_browser4 .FriendRequestAdd._51sy, #reaction_profile_browser5 .FriendRequestAdd._51sy, #reaction_profile_browser6 .FriendRequestAdd._51sy, #reaction_profile_browser7 .FriendRequestAdd._51sy, #reaction_profile_browser8 .FriendRequestAdd._51sy, #reaction_profile_browser9 .FriendRequestAdd._51sy",
                        ".hidden_elem #reaction_profile_browser .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser1 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser2 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser3 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser4 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser5 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser6 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser7 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser8 .FriendRequestAdd._51sy, .hidden_elem #reaction_profile_browser9 .FriendRequestAdd._51sy"
                    )).length > 4 ||
                        (getElem(
                            getElemWithAddFriendButtons(getAddFriendSelectors('div[role="dialog"]')),
                            getElemWithAddFriendButtons(getAddFriendSelectors('div[role="article"]'))
                        ).length > 7 &&
                            (getElem(scrollingNewFBDesignClassDef).length > 0 ||
                                getElem(scrollingNewFBDesignClass).length > 0))) &&
                    (3 == runMode ||
                        4 == runMode ||
                        ((1 == runMode || 2 == runMode) &&
                            ((inviteDuringShareCheck && "pro" != psscr) ||
                                (inviteDuringShareCheck2 && "pro" != psscr) ||
                                (likeSharedComments && "pro" != psscr) ||
                                share_put_likes ||
                                (share_put_comments && text_comm_shares.length > 1))))
                  ? (inviteDuringShareCheck && "pro" != psscr) ||
                    (inviteDuringShareCheck2 && "pro" != psscr) ||
                    (likeSharedComments && "pro" != psscr) ||
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
    debug && console.log("inviteNext"),
        scanByNameNewUI ? ((deleteInvitersLocalVar = 0), inviteNextNewUI(e, t, n)) : inviteNext3(e, t, n);
}
function inviteNext3(e, t, n) {
    if (1 == scriptIsRunning)
        if (
            (t.length > 10 &&
                (fmob ||
                    (Math.floor(101 * Math.random() + 0) > 80 &&
                        (newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0 && t && t[e]
                            ? (uiMorePagerPrimary++,
                              (getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop =
                                  t[e].getBoundingClientRect().top -
                                  getScrollElemNewFb(scrollingNewFBDesignClass)[0].getBoundingClientRect().top +
                                  getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop -
                                  100))
                            : newFBinviteDesign &&
                              getElem(scrollingNewFBDesignClassDef).length > 0 &&
                              t &&
                              t[e] &&
                              (uiMorePagerPrimary++,
                              (getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop =
                                  t[e].getBoundingClientRect().top -
                                  getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].getBoundingClientRect().top +
                                  getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop -
                                  100)),
                        updatePopup(),
                        getElem(
                            ".uiScrollableArea .uiScrollableAreaWrap",
                            ".hidden_elem .uiScrollableAreaWrap,._3wpv .uiScrollableAreaWrap"
                        ).scrollTop(65 * e)))),
            (clickedForMore = 0),
            e < t.length)
        )
            if (
                (e > canSKIPButton && (canSKIPButton = e),
                mtotalInvited >= fb_limit || psInvTot > 299 || (psInvTotDay >= fb_limit && "day" == stopWhen))
            )
                (3 != runMode && 4 != runMode) ||
                !try_after_limit ||
                0 != weAreInvitingFromShared ||
                weAreScanningOnlyShared
                    ? (console.log("Stop, debug: 7"), stopScript())
                    : (debug && console.log("next page 16"), open_next_page());
            else if (
                (psInvTot > 99 && (11 == psCurRunType || 99 == psCurRunType)) ||
                (psInvTot > 49 && 9 == psCurRunType) ||
                (psInvTot > 299 && 10 == psCurRunType)
            )
                stopScript();
            else if ((3 == runMode || 4 == runMode) && fb_lim_this_page_counter >= fb_limit_multi)
                0 == fb_limit_multi && alert(api.i18n.getMessage("daily_limit_zero")),
                    debug && console.log("next page 17"),
                    open_next_page();
            else if (
                multiPagesAct &&
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
                ("" == usedFbLang && (usedFbLang = getCurrentFbLang()),
                ((!newFBinviteDesign ||
                    (newFBinviteDesign &&
                        $(t[e]).text().length > 0 &&
                        fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text()) &&
                        !fbInviteBtnArray[usedFbLang].inv2.includes($(t[e]).text()) &&
                        !fbInviteBtnArray[usedFbLang].oth.includes($(t[e]).text()))) &&
                    (((-1 == t[e].className.indexOf("PageLikeButton") ||
                        (like_other_pages && -1 == t[e].className.indexOf("PageLikedButton"))) &&
                        !fmob &&
                        -1 == t[e].className.indexOf("FriendRequestFriends") &&
                        -1 == t[e].className.indexOf("FriendRequestAdd") &&
                        -1 == t[e].className.indexOf("_59pe") &&
                        (null == t[e].disabled ||
                            (like_other_pages && !t[e].disabled && -1 == t[e].className.indexOf("PageLikedButton"))) &&
                        -1 == t[e].className.indexOf("layerCancel") &&
                        -1 == t[e].className.indexOf("_2347")) ||
                        (fmob &&
                            -1 == t[e].className.indexOf("_2347") &&
                            $(t[e]).find('button[value="' + fbInviteBtnArray[usedFbLang].inv[0] + '"]').length > 0))) ||
                    (fmob && getElem('div[aria-label="Invite"]').length > 0))
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
                              psLimitInvIncrease(),
                              fb_lim_this_page_counter++,
                              $(t[e]).find('button[value="' + fbInviteBtnArray[usedFbLang].inv[0] + '"]').length > 0
                                  ? $(t[e])
                                        .find('button[value="' + fbInviteBtnArray[usedFbLang].inv[0] + '"]')
                                        .click()
                                  : t[e].click(),
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
                                  mtotalInvited != fb_limit &&
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
                        : (console.log("HHHH3"),
                          0 == (found = 0) &&
                              skip_angry_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.angry
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.angry
                                  ) &&
                                  (found = 1)),
                          0 == found &&
                              skip_haha_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.haha
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.haha
                                  ) &&
                                  (found = 1)),
                          0 == found &&
                              skip_sad_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.sad
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.sad
                                  ) &&
                                  (found = 1)),
                          0 == found &&
                              skip_like_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.like
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.like
                                  ) &&
                                  (found = 1)),
                          0 == found &&
                              skip_love_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.love
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.love
                                  ) &&
                                  (found = 1)),
                          0 == found &&
                              skip_wow_emotion &&
                              ($(t[e]).closest("._5i_q").length > 0 &&
                                  checkInArrayIconOldFB(
                                      $(t[e]).closest("._5i_q"),
                                      fbEmotionsBtnArray.oldEmoClass.wow
                                  ) &&
                                  (found = 1),
                              $(t[e]).closest("._1uja").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").length > 0 &&
                                  $(t[e]).closest("._1uja").find("i.img._59aq").attr("style").length > 0 &&
                                  checkInArrayIconNewFB(
                                      $(t[e]).closest("._1uja").find("i.img._59aq").attr("style"),
                                      fbEmotionsBtnArray.newEmoLink.wow
                                  ) &&
                                  (found = 1)),
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
                              psLimitInvIncrease(),
                              fb_lim_this_page_counter++,
                              $(t[e]).find('button[value="' + fbInviteBtnArray[usedFbLang].inv[0] + '"]').length > 0
                                  ? $(t[e])
                                        .find('button[value="' + fbInviteBtnArray[usedFbLang].inv[0] + '"]')
                                        .click()
                                  : t[e].click(),
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
                                  mtotalInvited != fb_limit &&
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
            (deleteInvitersLocal &&
                e > 0 &&
                deleteInvitersLocalVar > 1 &&
                (e < 3 &&
                    (getScrollElemNewFb(scrollingNewFBDesignClass).scrollTop(0),
                    getScrollElemNewFb(scrollingNewFBDesignClassDef).scrollTop(0)),
                t[e - 1] &&
                    $(t[e - 1]).closest('div[data-visualcompletion="ignore-dynamic"]').length > 0 &&
                    $(t[e - 1])
                        .closest('div[data-visualcompletion="ignore-dynamic"]')
                        .remove()),
            deleteInvitersLocalVar++,
            t.length > 10 &&
                !deleteInvitersLocal &&
                (Math.floor(101 * Math.random() + 0) > 60 ||
                    fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text())) &&
                (newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0 && t && t[e]
                    ? (uiMorePagerPrimary++,
                      (getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop =
                          t[e].getBoundingClientRect().top -
                          getScrollElemNewFb(scrollingNewFBDesignClass)[0].getBoundingClientRect().top +
                          getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop -
                          100))
                    : newFBinviteDesign &&
                      getElem(scrollingNewFBDesignClassDef).length > 0 &&
                      t &&
                      t[e] &&
                      (uiMorePagerPrimary++,
                      (getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop =
                          t[e].getBoundingClientRect().top -
                          getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].getBoundingClientRect().top +
                          getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop -
                          100)),
                updatePopup()),
            (clickedForMore = 0),
            e < t.length)
        )
            if (
                (deleteInvitersLocal
                    ? (e > 0 || 0 == likeButtonsProcessed) && likeButtonsProcessed++
                    : (e > likeButtonsProcessed || e == likeButtonsProcessed) && (likeButtonsProcessed = e + 1),
                e > canSKIPButton && !deleteInvitersLocal && (canSKIPButton = e),
                mtotalInvited >= fb_limit || psInvTot > 299 || (psInvTotDay >= fb_limit && "day" == stopWhen))
            )
                (3 != runMode && 4 != runMode) ||
                !try_after_limit ||
                0 != weAreInvitingFromShared ||
                weAreScanningOnlyShared
                    ? (console.log("Stop, debug: 7"), stopScript())
                    : (debug && console.log("next page 20"), open_next_page());
            else if (
                (psInvTot > 99 && (11 == psCurRunType || 99 == psCurRunType)) ||
                (psInvTot > 49 && 9 == psCurRunType) ||
                (psInvTot > 299 && 10 == psCurRunType)
            )
                stopScript();
            else if ((3 == runMode || 4 == runMode) && fb_lim_this_page_counter >= fb_limit_multi)
                0 == fb_limit_multi && alert(api.i18n.getMessage("daily_limit_zero")),
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
                        api.i18n
                            .getMessage("pause_before_time")
                            .replace(/%s/g, ((s = [pauseAfterLimit3, pauseAfterLimit2]), () => s.shift())) +
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
                    ? !deleteInvitersLocal &&
                      document.documentElement.innerHTML.indexOf(
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
                                deleteInvitersLocal ||
                                    (_timeCheckLimit = setTimeout(function () {
                                        checkLimitationPopup();
                                    }, 2e3)),
                                (timeout = Math.floor(Math.random() * (p1_2 - p1_1 + 1)) + p1_1),
                                (loopTimerDelay = setTimeout(function () {
                                    !fbInviteBtnArray[usedFbLang].inv.includes($(t[e]).text()) &&
                                    (fbInviteBtnArray[usedFbLang].inv2.includes($(t[e]).text()) ||
                                        ($(t[e]).attr("aria-disabled") && "true" != $(t[e]).attr("aria-disabled")) ||
                                        ($(t[0])
                                            .closest('div[role="button"]')
                                            .not(
                                                'div.fbNubFlyout[role="dialog"] div[role="button"],.uiLayer._31e div[role="dialog"] div[role="button"]'
                                            ).length > 0 &&
                                            $(t[0])
                                                .closest('div[role="button"]')
                                                .not(
                                                    'div.fbNubFlyout[role="dialog"] div[role="button"],.uiLayer._31e div[role="dialog"] div[role="button"]'
                                                )
                                                .filter(function () {
                                                    return !(
                                                        !$(this).attr("aria-disabled") ||
                                                        "true" != $(this).attr("aria-disabled")
                                                    );
                                                }).length > 0))
                                        ? (mtotalInvited++,
                                          psLimitInvIncrease(),
                                          fb_lim_this_page_counter++,
                                          (normal_run_limitNoInvitePosts = -1),
                                          hadInvitedButton++,
                                          (loadsWithNoInvite = 0),
                                          e++,
                                          (timeout -= 2e3),
                                          (addText = ""),
                                          (inviteFailed = 0),
                                          mtotalInvited % 40 == 0 &&
                                              mtotalInvited != fb_limit &&
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
                                          : inviteFailed < 5
                                            ? (e++,
                                              (loopTimerDelay = setTimeout(function () {
                                                  inviteNextNewUI(e, t, n);
                                              }, 5e3)))
                                            : $(t[e]).is(":visible")
                                              ? stopScript(api.i18n.getMessage("lc_invite_failed"))
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
            newFBinviteDesign && getElem(scrollingNewFBDesignClass).length > 0 && t && t[e]
                ? (uiMorePagerPrimary++,
                  (getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop =
                      t[e].getBoundingClientRect().top -
                      getScrollElemNewFb(scrollingNewFBDesignClass)[0].getBoundingClientRect().top +
                      getScrollElemNewFb(scrollingNewFBDesignClass)[0].scrollTop -
                      100))
                : newFBinviteDesign &&
                  getElem(scrollingNewFBDesignClassDef).length > 0 &&
                  t &&
                  t[e] &&
                  (uiMorePagerPrimary++,
                  (getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop =
                      t[e].getBoundingClientRect().top -
                      getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].getBoundingClientRect().top +
                      getScrollElemNewFb(scrollingNewFBDesignClassDef)[0].scrollTop -
                      100)),
                updatePopup(),
                deleteInvitersLocal && (e = 1),
                setTimeout(
                    function () {
                        InvitePeople2(n);
                    },
                    Math.floor(501 * Math.random()) + 200
                );
    var s;
}
function updatePopup(e, t) {
    1 == scriptIsRunning &&
        (void 0 === e && (e = ""),
        uiMorePagerPrimary > 0 &&
            (e = newFBinviteDesign
                ? scanByNameNewUI
                    ? scan_reactions_tabs
                        ? api.i18n.getMessage("reactions_scanned_current") + likeButtonsProcessed + e
                        : api.i18n.getMessage("reactions_scanned") + likeButtonsProcessed + e
                    : api.i18n.getMessage("list_scrolled") + uiMorePagerPrimary + e
                : api.i18n.getMessage("see_more_clicked") + uiMorePagerPrimary + e),
        antiSpamCommentSkipped > 0 && (e = api.i18n.getMessage("not_commented_antispam") + antiSpamCommentSkipped + e),
        (total_shared_posts_liked > 0 || total_shared_posts_commented > 0) &&
            (e = api.i18n.getMessage("shared_posts_comments_liked") + total_shared_posts_liked + e),
        (PagesCheckedText = ""),
        (3 == runMode || 4 == runMode) &&
            nextPage > 0 &&
            (multi_random_order
                ? (PagesCheckedText = api.i18n.getMessage("page_checked_text", nextPage))
                : ((PagesCheckedText = ". " + api.i18n.getMessage("pages_checked") + " " + nextPage + " / "),
                  (PagesCheckedText += 3 == runMode ? urllist1.length : urllist2.length))),
        loop_PostsListArray.length > 0 && totalPostsProcessed > loop_PostsListArray.length && t
            ? (document.getElementById("invite-all-count-sw").innerHTML =
                  mtotalInvited +
                  ". " +
                  api.i18n.getMessage("posts_checked") +
                  " " +
                  loop_PostsListArray.length +
                  PagesCheckedText +
                  e)
            : !publishingToolInv || photosTabRunAll || InsightsTabInv || isNotificationTab
              ? (document.getElementById("invite-all-count-sw").innerHTML =
                    mtotalInvited +
                    ". " +
                    api.i18n.getMessage("posts_checked") +
                    " " +
                    totalPostsProcessed +
                    PagesCheckedText +
                    e)
              : window.location.href.indexOf("/creatorstudio") > 0
                ? (document.getElementById("invite-all-count-sw").innerHTML =
                      2 == runMode || 4 == runMode
                          ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                ? mtotalInvited
                                : '<span style="color:red">' + api.i18n.getMessage("disabled_in_options") + "</span>") +
                            ". " +
                            api.i18n.getMessage("posts_checked") +
                            " " +
                            loop_currentPostJustForCounter +
                            ". " +
                            api.i18n.getMessage("scrolls_in_creator_studio") +
                            " " +
                            (publishingTabNumber - 1) +
                            PagesCheckedText +
                            e
                          : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                ? mtotalInvited
                                : '<span style="color:red">' + api.i18n.getMessage("disabled_in_options") + "</span>") +
                            ". " +
                            api.i18n.getMessage("posts_checked") +
                            " " +
                            publishingToolTotPost +
                            ". " +
                            api.i18n.getMessage("scrolls_in_creator_studio") +
                            " " +
                            (publishingTabNumber - 1) +
                            PagesCheckedText +
                            e)
                : window.location.href.indexOf("/content_management") > 0
                  ? (document.getElementById("invite-all-count-sw").innerHTML =
                        2 == runMode || 4 == runMode
                            ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                  ? mtotalInvited
                                  : '<span style="color:red">' +
                                    api.i18n.getMessage("disabled_in_options") +
                                    "</span>") +
                              ". " +
                              api.i18n.getMessage("posts_checked") +
                              " " +
                              loop_currentPostJustForCounter +
                              ". " +
                              api.i18n.getMessage("scrolls_in_content_management") +
                              " " +
                              (publishingTabNumber - 1) +
                              PagesCheckedText +
                              e
                            : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                  ? mtotalInvited
                                  : '<span style="color:red">' +
                                    api.i18n.getMessage("disabled_in_options") +
                                    "</span>") +
                              ". " +
                              api.i18n.getMessage("posts_checked") +
                              " " +
                              publishingToolTotPost +
                              ". " +
                              api.i18n.getMessage("scrolls_in_content_management") +
                              " " +
                              (publishingTabNumber - 1) +
                              PagesCheckedText +
                              e)
                  : window.location.href.indexOf("/latest/posts") > 0 ||
                      window.location.href.indexOf("/insights") > 0 ||
                      window.location.href.indexOf("/latest/ad_center") > 0
                    ? (document.getElementById("invite-all-count-sw").innerHTML =
                          2 == runMode || 4 == runMode
                              ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                    ? mtotalInvited
                                    : '<span style="color:red">' +
                                      api.i18n.getMessage("disabled_in_options") +
                                      "</span>") +
                                ". " +
                                api.i18n.getMessage("posts_checked") +
                                " " +
                                loop_currentPostJustForCounter +
                                ". " +
                                api.i18n.getMessage("scrolls_in_business_suite") +
                                " " +
                                (publishingTabNumber - 1) +
                                PagesCheckedText +
                                e
                              : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                    ? mtotalInvited
                                    : '<span style="color:red">' +
                                      api.i18n.getMessage("disabled_in_options") +
                                      "</span>") +
                                ". " +
                                api.i18n.getMessage("posts_checked") +
                                " " +
                                publishingToolTotPost +
                                ". " +
                                api.i18n.getMessage("scrolls_in_business_suite") +
                                " " +
                                (publishingTabNumber - 1) +
                                PagesCheckedText +
                                e)
                    : window.location.href.indexOf("/professional_dashboard") > 0 ||
                        window.location.href.indexOf("/my_posted_content") > 0
                      ? (document.getElementById("invite-all-count-sw").innerHTML =
                            2 == runMode || 4 == runMode
                                ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                      ? mtotalInvited
                                      : '<span style="color:red">' +
                                        api.i18n.getMessage("disabled_in_options") +
                                        "</span>") +
                                  ". " +
                                  api.i18n.getMessage("posts_checked") +
                                  " " +
                                  loop_currentPostJustForCounter +
                                  PagesCheckedText +
                                  e
                                : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                      ? mtotalInvited
                                      : '<span style="color:red">' +
                                        api.i18n.getMessage("disabled_in_options") +
                                        "</span>") +
                                  ". " +
                                  api.i18n.getMessage("posts_checked") +
                                  " " +
                                  publishingToolTotPost +
                                  PagesCheckedText +
                                  e)
                      : window.location.href.indexOf("/publishing_tools") > 0 &&
                          getElem(
                              "._68tl ._2eqm._3qn7._61-1._2fyi._3qng",
                              ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng"
                          ).length > 0
                        ? (document.getElementById("invite-all-count-sw").innerHTML =
                              2 == runMode || 4 == runMode
                                  ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                        ? mtotalInvited
                                        : '<span style="color:red">' +
                                          api.i18n.getMessage("disabled_in_options") +
                                          "</span>") +
                                    ". " +
                                    api.i18n.getMessage("posts_checked") +
                                    " " +
                                    loop_currentPostJustForCounter +
                                    ". " +
                                    api.i18n.getMessage("scrolls_in_new_publishing_tools") +
                                    " " +
                                    (publishingTabNumber - 1) +
                                    PagesCheckedText +
                                    e
                                  : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                        ? mtotalInvited
                                        : '<span style="color:red">' +
                                          api.i18n.getMessage("disabled_in_options") +
                                          "</span>") +
                                    ". " +
                                    api.i18n.getMessage("posts_checked") +
                                    " " +
                                    publishingToolTotPost +
                                    ". " +
                                    api.i18n.getMessage("scrolls_in_new_publishing_tools") +
                                    " " +
                                    (publishingTabNumber - 1) +
                                    PagesCheckedText +
                                    e)
                        : window.location.href.indexOf("/latest/inbox/facebook") > 0 &&
                            inboxTabArrayProcessedIds.length > 0
                          ? (document.getElementById("invite-all-count-sw").innerHTML =
                                (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                    ? mtotalInvited
                                    : '<span style="color:red">' +
                                      api.i18n.getMessage("disabled_in_options") +
                                      "</span>") +
                                ". Unique posts checked in Inbox tab: " +
                                inboxTabArrayProcessedIds.length +
                                ". " +
                                api.i18n.getMessage("scrolls") +
                                " " +
                                (publishingTabNumber - 1) +
                                PagesCheckedText +
                                e)
                          : (document.getElementById("invite-all-count-sw").innerHTML =
                                publishingToolTotPost > 0
                                    ? (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                          ? mtotalInvited
                                          : '<span style="color:red">' +
                                            api.i18n.getMessage("disabled_in_options") +
                                            "</span>") +
                                      ". " +
                                      api.i18n.getMessage("posts_checked") +
                                      " " +
                                      totalPostsProcessed +
                                      " (" +
                                      publishingToolTotPost +
                                      ")" +
                                      PagesCheckedText +
                                      e
                                    : (1 != skip_Invite || inviteDuringShareCheck || inviteDuringShareCheck2
                                          ? mtotalInvited
                                          : '<span style="color:red">' +
                                            api.i18n.getMessage("disabled_in_options") +
                                            "</span>") +
                                      ". " +
                                      api.i18n.getMessage("posts_checked") +
                                      " " +
                                      totalPostsProcessed +
                                      PagesCheckedText +
                                      e));
}
function createPopup() {
    var e = "";
    "fp" != psscr && Math.floor(101 * Math.random() + 0), (e = "");
    var t = "";
    (t =
        "fp" == psscr || Math.floor(101 * Math.random() + 0) > 40
            ? '<span style="font-size:0.7em!important;">' + api.i18n.getMessage("switch_tab_info") + "</span><br>"
            : '<div id="running-info">' +
              e +
              '</div><span style="font-size:0.7em!important;">' +
              api.i18n.getMessage("switch_tab_info") +
              "</span><br>"),
        TotalInvited > 100 && (t += '<div id="fbe-showlessingo" class="btn-div"></div>'),
        showLessInfoDate > 0 &&
            Math.floor(Date.now() / 1e3) - showLessInfoDate < 259200 &&
            (t = '<span style="font-size:0.7em!important;">' + api.i18n.getMessage("switch_tab_info") + "</span><br>"),
        (elementUpd = document.getElementsByTagName("head")[0]);
    var n = document.getElementsByTagName("body")[0],
        o = document.createElement("div");
    o.setAttribute("id", "add-all-div-sw"),
        o.setAttribute(
            "style",
            'text-align:center;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;padding:10px;width:80%;border:2px solid #ccc;background-color:#fff;position:fixed;margin:0 auto;z-index:999;top: 5px;left:10%;font-size:2em;'
        ),
        (o.innerHTML =
            "<link rel='stylesheet' type='text/css' href='" +
            api.runtime.getURL("content.css") +
            "' charset='utf-8'><span id='runModeText' style='color:blue'>" +
            runModetext +
            "</span><br>" +
            api.i18n.getMessage("total_invited") +
            ' <span id="invite-all-count-sw">' +
            mtotalInvited +
            "</span>.<br>" +
            t +
            '<div id="fbe-stopit" class="btn-div"></div><div id="fbe-next-post"></div>'),
        n.appendChild(o),
        (popup = o),
        $("#fbe-showlessingo").length;
    var i = $('<div class="fbe-btn"><span class="fbe-btn-text">STOP IT</span></div>').click(stopScriptBtn);
    if ((jQuery("#fbe-stopit").html(i), 0 == getElem("#invite-shared-elem-comment").length)) {
        var s = document.createElement("div");
        s.setAttribute("id", "invite-shared-elem-comment"), s.setAttribute("style", "display:none;"), n.appendChild(s);
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
function stopScriptBtn() {
    waitingForReply &&
        ((waitingForReply = !1),
        api.runtime.sendMessage({ type: "KillSecondTab", tabID: tab_Exists_CheckID }, function (e) {}),
        (tab_Exists_CheckID = 0)),
        stopScript();
}
function stopScript(e) {
    (void 0 !== e && "object" != typeof e) || (e = api.i18n.getMessage("done") + "\r"),
        1 == selectedpostsRun && (e += api.i18n.getMessage("script_scanned_selected_posts")),
        mtotalInvited < 10 &&
            window.location.href.indexOf("profile.php") > 0 &&
            (e =
                e +
                '<br><span style="color:red;font-weight:bold;">' +
                api.i18n.getMessage("profile_page_warning") +
                "</span><br>"),
        (skip_post_setting = 0),
        clearTimeout(loopTimerDelay),
        clearTimeout(TimerDelayVar1),
        clearTimeout(TimerDelayVar2),
        clearTimeout(timer_CheckSecondTabExsist),
        mtotalInvited > 0
            ? ((TotalInvited += mtotalInvited),
              0 == FirstInstalled && (FirstInstalled = Math.floor(Date.now() / 1e3).toString()),
              api.storage.sync.set(
                  {
                      TotalInvited: TotalInvited,
                      FirstInstalled: FirstInstalled,
                      psInvTot: psInvTot,
                      psInvTotDay: psInvTotDay,
                      psInvDay: psInvDay,
                      skip_post_setting: skip_post_setting,
                  },
                  function () {}
              ))
            : api.storage.sync.set({ skip_post_setting: skip_post_setting }, function () {}),
        _tab_ID == tab_ID &&
            api.storage.local.set({ _tab_ID: 0, _realt: 0, _time: 0, _runMode: 0, _fbe_number: 0 }, function () {});
    var t = "";
    !publishingToolInv ||
        photosTabRunAll ||
        InsightsTabInv ||
        isNotificationTab ||
        ((t = ". " + api.i18n.getMessage("publishing_tools_tabs_checked") + " " + publishingTabNumber),
        publishingToolTotPost > totalPostsProcessed && (totalPostsProcessed = publishingToolTotPost),
        window.location.href.indexOf("/creatorstudio") > 0 &&
            ((t = t.replace(
                api.i18n.getMessage("publishing_tools_tabs_checked"),
                api.i18n.getMessage("scrolls_in_creator_studio")
            )),
            (totalPostsProcessed = publishingToolTotPost)),
        window.location.href.indexOf("/content_management") > 0 &&
            ((t = t.replace(
                api.i18n.getMessage("publishing_tools_tabs_checked"),
                api.i18n.getMessage("scrolls_in_content_management")
            )),
            (totalPostsProcessed = publishingToolTotPost)),
        (window.location.href.indexOf("/latest/posts") > 0 ||
            window.location.href.indexOf("/insights") > 0 ||
            window.location.href.indexOf("/latest/ad_center") > 0) &&
            ((t = t.replace(
                api.i18n.getMessage("publishing_tools_tabs_checked"),
                api.i18n.getMessage("scrolls_in_business_suite")
            )),
            (totalPostsProcessed = publishingToolTotPost)),
        window.location.href.indexOf("/publishing_tools") > 0 &&
            getElem("._68tl ._2eqm._3qn7._61-1._2fyi._3qng", ".hidden_elem ._68tl ._2eqm._3qn7._61-1._2fyi._3qng")
                .length > 0 &&
            ((t = t.replace(
                api.i18n.getMessage("publishing_tools_tabs_checked"),
                api.i18n.getMessage("scrolls_in_new_publishing_tools")
            )),
            (totalPostsProcessed = publishingToolTotPost)),
        window.location.href.indexOf("/latest/inbox/facebook") > 0 &&
            inboxTabArrayProcessedIds.length > 0 &&
            ((t = t.replace(
                api.i18n.getMessage("publishing_tools_tabs_checked"),
                api.i18n.getMessage("scrolls_in_inbox")
            )),
            (totalPostsProcessed = inboxTabArrayProcessedIds.length))),
        destroyPopup(),
        (scriptIsRunning = 0);
    var n = "";
    (total_shared_posts_liked > 0 || total_shared_posts_commented > 0) &&
        (n = api.i18n.getMessage("shared_posts_liked") + total_shared_posts_liked);
    var o = new Date();
    debug && (console.log("mtotalInvited:" + mtotalInvited), console.log("fb_limit:" + fb_limit), console.log("test"));
    var i,
        s = "";
    startTime &&
        (s +=
            api.i18n.getMessage("started_time") +
            " " +
            ("0" + startTime.getHours()).slice(-2) +
            ":" +
            ("0" + startTime.getMinutes()).slice(-2) +
            ":" +
            ("0" + startTime.getSeconds()).slice(-2) +
            ".<br>"),
        0 == totalPostsProcessed &&
            likeButtonsProcessed > 100 &&
            (t = t + ". " + api.i18n.getMessage("reactions_scanned_for_post") + " " + likeButtonsProcessed),
        psInvTot > 99 && (11 == psCurRunType || 99 == psCurRunType)
            ? showAlert(
                  s +
                      api.i18n.getMessage("stopped_time") +
                      " " +
                      ("0" + o.getHours()).slice(-2) +
                      ":" +
                      ("0" + o.getMinutes()).slice(-2) +
                      ":" +
                      ("0" + o.getSeconds()).slice(-2) +
                      ".<br>" +
                      e +
                      api.i18n.getMessage("total_inv_sent") +
                      " " +
                      mtotalInvited +
                      n +
                      ". " +
                      api.i18n.getMessage("posts_checked") +
                      " " +
                      totalPostsProcessed +
                      t +
                      '.<br><br><span style="color:red"><b>' +
                      api.i18n.getMessage("pLocN" + getNrLoc(1)) +
                      ".</b> " +
                      api.i18n.getMessage("pLocN2").replace(/%s/g, ((i = [100]), () => i.shift())) +
                      ".</span>"
              )
            : psInvTot > 49 && 9 == psCurRunType
              ? showAlert(
                    s +
                        api.i18n.getMessage("stopped_time") +
                        " " +
                        ("0" + o.getHours()).slice(-2) +
                        ":" +
                        ("0" + o.getMinutes()).slice(-2) +
                        ":" +
                        ("0" + o.getSeconds()).slice(-2) +
                        ".<br>" +
                        e +
                        api.i18n.getMessage("total_inv_sent") +
                        " " +
                        mtotalInvited +
                        n +
                        ". " +
                        api.i18n.getMessage("posts_checked") +
                        " " +
                        totalPostsProcessed +
                        t +
                        '.<br><br><span style="color:red"><b>' +
                        api.i18n.getMessage("pLocN" + getNrLoc(1)) +
                        ".</b> " +
                        api.i18n.getMessage("pLocN2").replace(
                            /%s/g,
                            (
                                (e) => () =>
                                    e.shift()
                            )([50])
                        ) +
                        ".</span>"
                )
              : psInvTot > 299 && 10 == psCurRunType
                ? showAlert(
                      s +
                          api.i18n.getMessage("stopped_time") +
                          " " +
                          ("0" + o.getHours()).slice(-2) +
                          ":" +
                          ("0" + o.getMinutes()).slice(-2) +
                          ":" +
                          ("0" + o.getSeconds()).slice(-2) +
                          ".<br>" +
                          e +
                          api.i18n.getMessage("total_inv_sent") +
                          " " +
                          mtotalInvited +
                          n +
                          ". " +
                          api.i18n.getMessage("posts_checked") +
                          " " +
                          totalPostsProcessed +
                          t +
                          '.<br><br><span style="color:red">' +
                          api.i18n.getMessage("pLocN2").replace(
                              /%s/g,
                              (
                                  (e) => () =>
                                      e.shift()
                              )([300])
                          ) +
                          ".</span>"
                  )
                : mtotalInvited > fb_limit - 2
                  ? showAlert(
                        (3 == runMode || 4 == runMode) && nextPage > 0 && !multi_random_order
                            ? s +
                                  api.i18n.getMessage("stopped_time") +
                                  " " +
                                  ("0" + o.getHours()).slice(-2) +
                                  ":" +
                                  ("0" + o.getMinutes()).slice(-2) +
                                  ":" +
                                  ("0" + o.getSeconds()).slice(-2) +
                                  ".<br>" +
                                  e +
                                  api.i18n.getMessage("total_inv_sent") +
                                  " " +
                                  mtotalInvited +
                                  n +
                                  ". " +
                                  api.i18n.getMessage("posts_checked") +
                                  " " +
                                  totalPostsProcessed +
                                  t +
                                  ". " +
                                  api.i18n.getMessage("pages_checked") +
                                  " " +
                                  nextPage +
                                  "."
                            : s +
                                  api.i18n.getMessage("stopped_time") +
                                  " " +
                                  ("0" + o.getHours()).slice(-2) +
                                  ":" +
                                  ("0" + o.getMinutes()).slice(-2) +
                                  ":" +
                                  ("0" + o.getSeconds()).slice(-2) +
                                  ".<br>" +
                                  e +
                                  api.i18n.getMessage("total_inv_sent") +
                                  " " +
                                  mtotalInvited +
                                  n +
                                  ". " +
                                  api.i18n.getMessage("posts_checked") +
                                  " " +
                                  totalPostsProcessed +
                                  t +
                                  "."
                    )
                  : (console.log("stop test 1, runMode=" + runMode + ". nextPage= " + nextPage),
                    showAlert(
                        (3 == runMode || 4 == runMode) && nextPage > 0
                            ? multi_random_order
                                ? s +
                                  api.i18n.getMessage("stopped_time") +
                                  " " +
                                  ("0" + o.getHours()).slice(-2) +
                                  ":" +
                                  ("0" + o.getMinutes()).slice(-2) +
                                  ":" +
                                  ("0" + o.getSeconds()).slice(-2) +
                                  ".<br>" +
                                  e +
                                  api.i18n.getMessage("total_inv_sent") +
                                  " " +
                                  mtotalInvited +
                                  n +
                                  "."
                                : s +
                                  api.i18n.getMessage("stopped_time") +
                                  " " +
                                  ("0" + o.getHours()).slice(-2) +
                                  ":" +
                                  ("0" + o.getMinutes()).slice(-2) +
                                  ":" +
                                  ("0" + o.getSeconds()).slice(-2) +
                                  ".<br>" +
                                  e +
                                  api.i18n.getMessage("total_inv_sent") +
                                  " " +
                                  mtotalInvited +
                                  n +
                                  ". " +
                                  api.i18n.getMessage("pages_checked") +
                                  " " +
                                  nextPage +
                                  "."
                            : s +
                                  api.i18n.getMessage("stopped_time") +
                                  " " +
                                  ("0" + o.getHours()).slice(-2) +
                                  ":" +
                                  ("0" + o.getMinutes()).slice(-2) +
                                  ":" +
                                  ("0" + o.getSeconds()).slice(-2) +
                                  ".<br>" +
                                  e +
                                  api.i18n.getMessage("total_inv_sent") +
                                  " " +
                                  mtotalInvited +
                                  n +
                                  ". " +
                                  api.i18n.getMessage("posts_checked") +
                                  " " +
                                  totalPostsProcessed +
                                  t +
                                  "."
                    ));
}
function goToNextPost() {
    (sharedPostIsCheckingNow = 1), debug && console.log("GO TO NEXT Here 22"), ClosePostAndOpenNext(-1);
}
function showAlert(e) {
    console.log(e),
        (e += "<br><br>" + api.i18n.getMessage("facebook_ram_tip")),
        mtotalInvited < 10 && (e = checkLanguageNotEn2() + e);
    document.getElementsByTagName("head")[0];
    var t = document.getElementsByTagName("body")[0],
        n = document.createElement("div");
    n.setAttribute("id", "add-all-div-swmulti");
    var o = "",
        i = "";
    "fp" != psscr && Math.floor(101 * Math.random() + 0);
    var s = Math.round((psCurTimeStamp - FirstInstalled) / 86400),
        r = Math.floor(s / 365);
    (TotalInvited > 100 || mtotalInvited > 100) &&
        mtotalInvited > 2 &&
        11 == psCurRunType &&
        FirstInstalled > 0 &&
        s >= 365 &&
        (o =
            "<br><br><b>You installed the script " +
            r +
            " year" +
            (1 !== r ? "s" : "") +
            ' ago.</b> <span style="color:red"><b>You have a special offer this month!</b></span> We will double your purchased time - <b>just send us an email at: <a href="mailto:' +
            _email +
            "?subject=" +
            api.runtime.getManifest().name +
            "-" +
            api.runtime.getManifest().version +
            getCurVersType() +
            '">info@invitelikecomment.com</a></b><br>'),
        TotalInvited > 20 &&
            mtotalInvited > 20 &&
            (1 == psCurRunType || 2 == psCurRunType || 10 == psCurRunType) &&
            (mtotalInvited > 40 || (TotalInvited > 100 && mtotalInvited > 10)) &&
            ((o = "<br><br>" + api.i18n.getMessage("after_text1")),
            (i =
                '<a style="background-color: rgba(0, 80, 162, 0.97);" class="_42ft _42fu _42gy _42g-" href="' +
                getReviewLink() +
                '" target="_blank">' +
                api.i18n.getMessage("please_give_5_stars") +
                "</a>")),
        (n.innerHTML =
            '<div style="margin: 0 auto 40px;z-index: 10000;position: fixed;left: -webkit-calc(50% - 250px);left:  calc(50% - 250px);top: -webkit-calc(40% - 59px);top: calc(40% - 59px);width: 500px;"><div style="border: 10px solid rgba(82, 82, 82, .7);-webkit-border-radius: 8px;">\t\t<div style="background-color: #fff;"><div><div style="padding:5px 10px;background-color: #6d84b4;border: 1px solid #3b5998;border-bottom: 0;color: #fff;font-size: 14px;font-weight: bold;">' +
            api.i18n.getMessage("after_done") +
            '</div><div style="padding:10px;border-color: #555;border-style: solid;border-width: 0 1px;">' +
            e +
            o +
            '</div><div style="border-color: #555;border-style: solid;border-width: 0 1px;border-bottom-width: 1px;"><style type="text/css">._42gy {font-size: 13px;height: 23px;line-height: 23px;}._42fu, ._42gx:focus, ._42gx:hover {text-decoration: none !important;background-repeat: no-repeat;background-size: auto;background-position: -352px -446px;background-color: #eee;border: 1px solid #999;border-bottom-color: #888;-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .1);}._42fu {-webkit-box-sizing: content-box;color: #333;font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif;font-size: 13px;font-weight: bold;height: 20px;line-height: 20px;padding: 0 6px;text-align: center;vertical-align: middle;}._42ft {cursor: pointer;display: inline-block;text-decoration: none;white-space: nowrap;}._42fu:active, ._42fu._42fs {background: #ddd;border-bottom-color: #999;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .2);}._42g- {background-repeat: no-repeat;background-size: auto;background-position: -352px -495px;background-color: #5b74a8;border-color: #29447e #29447e #1a356e;color: #fff;}._42g-:active, ._42g-._42fs {background: #4f6aa3;border-bottom-color: #29447e;}._42gy {font-size: 13px;height: 23px;line-height: 23px;}</style><div style="text-align: right;padding: 10px;background-color: #f2f2f2;border: 1px solid #ccc;border-bottom: none;border-left: none;border-right: none;" id="FBIAB">' +
            i +
            '<a style="background-color: rgba(57, 154, 50, 0.97);color: white;margin-left:5px;" class="_42ft _42fu _42gy" href="https://www.invitelikecomment.com" target="_blank">' +
            api.i18n.getMessage("view_all_scripts") +
            '</a><a style="margin-left:5px;" class="_42ft _42fu _42gy" target="_blank" href="mailto:' +
            _email +
            "?subject=" +
            api.runtime.getManifest().name +
            "-" +
            api.runtime.getManifest().version +
            getCurVersType() +
            '">' +
            api.i18n.getMessage("email_me") +
            '</a><a style="margin-left:5px;" class="_42ft _42fu _42gy" href="#" target="_blank" id="FBscriptMClose">' +
            api.i18n.getMessage("after_close") +
            "</a></div></div></div></div></div></div>"),
        t.appendChild(n),
        $("#FBscriptMClose").length > 0 &&
            $("#FBscriptMClose").click(function (e) {
                e.preventDefault();
                var t = $("#add-all-div-swmulti");
                t && t[0].parentNode && t[0].parentNode.removeChild(t[0]);
            });
}
function getBrowser() {
    return api.runtime.getURL("").startsWith("moz-extension://")
        ? "Firefox"
        : api.runtime.getURL("").startsWith("edge://extension")
          ? "Edge"
          : "Chrome";
}
function getReviewLink() {
    return "Chrome" == getBrowser()
        ? "https://chrome.google.com/webstore/detail/" + api.runtime.id + "/reviews"
        : "Firefox" == getBrowser()
          ? "https://addons.mozilla.org/en-US/firefox/addon/invite-likers-multipages/"
          : "Edge" == getBrowser()
            ? "https://microsoftedge.microsoft.com/addons/detail/" + api.runtime.id
            : void 0;
}
function saveB() {
    api.storage.sync.set({ monthSave: month }, function () {});
}
function getCurVersType() {
    return "-" + psCurRunType;
}
function checkLimitationPopup() {
    if (1 == scriptIsRunning && !deleteInvitersLocal) {
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
            !deleteInvitersLocal &&
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
    if (likeButtonsProcessed > 3e3 || deleteInvitersLocal) return !1;
    if (1 == scriptIsRunning) {
        if (getElem("._pig").length > 0 && getElem("._4t2a,.uiLayer").is(":visible")) {
            _elsHelpCont = getElem("._pig");
            for (var e = 0; e < _elsHelpCont.length; e++)
                if (_elsHelpCont[e].innerHTML.indexOf("/help/contact/") > -1) return !0;
        }
        if (
            getElem('div[role="dialog"] div').filter(function () {
                return (
                    $(this).find("span").length > 0 &&
                    $(this).find("span").text() &&
                    $(this).find("span").text().toLowerCase().indexOf("disagree with decision") > -1 &&
                    $(this).find("span").text().toLowerCase().indexOf("disagree with decision").is(":visible")
                );
            }).length > 0
        )
            return !0;
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
        if (
            getElem(
                '.cypi58rs .oajrlxb2,div[role="dialog"] .p9ctufpz.rj0o91l8>div[role="button"]',
                ".poy2od1o .cypi58rs .oajrlxb2"
            ).length > 0
        )
            return !0;
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
        getNewUIMainScrollOnly(
            'div[role="dialog"] .cypi58rs .thwo4zme,div[role="dialog"] .dhix69tm div[role="button"].thwo4zme'
        ).not('div.fbNubFlyout[role="dialog"] div,.uiLayer._31e div[role="dialog"] div').length
            ? getNewUIMainScrollOnly(
                  'div[role="dialog"] .cypi58rs .thwo4zme,div[role="dialog"] .dhix69tm div[role="button"].thwo4zme'
              )
                  .not('div.fbNubFlyout[role="dialog"] div,.uiLayer._31e div[role="dialog"] div')[0]
                  .click()
            : getElem(
                    '.cypi58rs .oajrlxb2,div[role="dialog"] .p9ctufpz.rj0o91l8>div[role="button"]',
                    ".poy2od1o .cypi58rs .oajrlxb2"
                ).length > 0
              ? getElem(
                    '.cypi58rs .oajrlxb2,div[role="dialog"] .p9ctufpz.rj0o91l8>div[role="button"]',
                    ".poy2od1o .cypi58rs .oajrlxb2"
                )[0].click()
              : getElem('div[role="dialog"] .x1d52u69>div[role="button"]' + server_main_close_invite_window).length > 0
                ? getElem('div[role="dialog"] .x1d52u69>div[role="button"]' + server_main_close_invite_window)[
                      getElem('div[role="dialog"] .x1d52u69>div[role="button"]' + server_main_close_invite_window)
                          .length - 1
                  ].click()
                : getElem('div[role="dialog"] svg path[d^="M19.884"]').closest('[role="button"]').length > 0
                  ? getElem('div[role="dialog"] svg path[d^="M19.884"]').closest('[role="button"]')[0].click()
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
function closeSharedWindowinNewUI() {
    debug && console.log("WE close shared posts now"),
        getElem(
            'div[role="dialog"] .h28iztb5>.qi72231t[role="button"],div[role="dialog"] .x92rtbv.x10l6tqk >.x1i10hfl[role="button"],div[role="dialog"] .xdg88n9>.x1i10hfl[role="button"]'
        ).length > 0 &&
            getElem(
                'div[role="dialog"] .h28iztb5>.qi72231t[role="button"],div[role="dialog"] .x92rtbv.x10l6tqk >.x1i10hfl[role="button"],div[role="dialog"] .xdg88n9>.x1i10hfl[role="button"]'
            )[0].click();
}
function getNewUIMainScrollOnly(e, t) {
    return t
        ? getElem(e, t)
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
              })
        : getElem(e)
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
function saveLicSettingsContent() {
    api.storage.sync.set(
        {
            psfTr: psfTr,
            pslicID: pslicID,
            psemailID: psemailID,
            psNotif1: psNotif1,
            psNotif2: psNotif2,
            psmessagelast: psmessagelast,
            psscr: psscr,
            pstype: pstype,
            psdura: psdura,
            psactive: psactive,
        },
        function () {}
    );
}
function calcLicVars() {
    0 == psfTr
        ? ((psfTr = psCurTimeStamp + 259200), (psCurRunType = 10), saveLicSettingsContent())
        : psCurTimeStamp > psfTr && -1 != psfTr
          ? ((psfTr = -1), (psCurRunType = 11), saveLicSettingsContent())
          : -1 == psfTr && (psCurRunType = 11),
        0 == pswork &&
            -1 != psfTr &&
            (debug && console.log("This is trial, we can work!"), (pswork = 1), (psCurRunType = 10)),
        debug && console.log("ex-pire:" + psexp),
        20 == pslicID.length &&
            psexp &&
            psexp > 0 &&
            (debug && console.log("WE ARE HERE:" + psexp),
            !(psCurTimeStamp > psexp || 1 != psactive) || (psscr != psThisScr && "fp" != psscr && psscr != psThisScr2)
                ? (psscr == psThisScr || psscr == psThisScr2
                      ? ((pswork = 1), (psCurRunType = 1))
                      : "fp" == psscr
                        ? ((pswork = 1), (psCurRunType = 2))
                        : (psCurRunType = 99),
                  "pro" == psscr && (multiPagesAct = !1))
                : psCurTimeStamp - psexp > 259200 || 1 != psactive || (psCurTimeStamp > psexp && 1 == psrenewCanc)
                  ? ((pswork = 0), (psCurRunType = 9))
                  : psscr == psThisScr || psscr == psThisScr2
                    ? ((pswork = 1), (psCurRunType = 5))
                    : "fp" == psscr
                      ? ((pswork = 1), (psCurRunType = 6))
                      : (psCurRunType = 99)),
        getBrowser(),
        1 == pswork && (psInvTot = 0),
        debug &&
            (console.log("psCurRunType=" + psCurRunType),
            console.log(
                "TODO pswork=" +
                    pswork +
                    ". TEST if license expired + trial and if trial expired and license NOT present at all"
            ));
}
function psupdateFrameWithNewLicenseInfo(e) {
    if (_psShowLicFrame && $(".licDiv").length > 0) {
        debug && console.log("WE ARE UPDATING THE SCREEN!!!!!!!!========================================="),
            (psdivtitle = api.i18n.getMessage("lc_not_active2")),
            1 == psCurRunType || 2 == psCurRunType || 5 == psCurRunType || 6 == psCurRunType
                ? (psdivtitle = api.i18n.getMessage("lc_paid_active"))
                : 9 == psCurRunType
                  ? (psdivtitle = api.i18n.getMessage("lc_paid_not_active"))
                  : -1 == psfTr
                    ? (psdivtitle = api.i18n.getMessage("lc_trial_ended"))
                    : psfTr > 0 && (psdivtitle = api.i18n.getMessage("lc_trial_active"));
        var t = "",
            n = api.i18n.getMessage("lc_try_3days");
        -1 == psfTr && "" == pslicID && (n = api.i18n.getMessage("lc_trial_over")),
            showEmailChangeSettings() && ((n = ""), (t = ""));
        var o =
                (20 == pslicID.length ? api.i18n.getMessage("lc_code_label") : api.i18n.getMessage("lc_insert_label")) +
                '<br>\n<input name="tab_license_insert" value="' +
                pslicID +
                '" type="text" style="width:170px;text-align: center;padding: 5px;">\n<button type="button" class="saveLic">' +
                api.i18n.getMessage("lc_save_button") +
                "</button><br>" +
                api.i18n.getMessage("lc_purchase_website"),
            i =
                '<b><span class="red">' +
                api.i18n.getMessage("lc_trial_over2") +
                "</span> " +
                api.i18n.getMessage("lc_purchase_needed") +
                " " +
                api.i18n.getMessage("lc_one_post_option") +
                "</b>";
        if (psfTr > 0) {
            var s = psfTr - psCurTimeStamp;
            debug && console.log(s),
                s > 259200 && ((psfTr = psCurTimeStamp + 259200), (s = 259200)),
                (s =
                    s < 86400
                        ? api.i18n.getMessage("lc_less_than_1_day")
                        : Math.round(s / 86400) + " " + api.i18n.getMessage("lc_days")),
                (i =
                    '<b><span class="red">' +
                    api.i18n.getMessage("lc_trial_active2") +
                    "</span>, " +
                    api.i18n.getMessage("lc_try_without_limitations") +
                    '<br><span class="red">' +
                    api.i18n.getMessage("lc_trial_expires") +
                    " " +
                    s +
                    "</span></b>");
        }
        if ((debug && console.log("psCurRunType=" + psCurRunType), 99 == psCurRunType))
            i = _psLicScripts[psscr]
                ? '<b><span class="red">' +
                  api.i18n.getMessage("lc_wrong_script") +
                  "</span>! " +
                  api.i18n.getMessage("lc_license_for") +
                  " " +
                  _psLicScripts[psscr] +
                  ".</b> " +
                  api.i18n.getMessage("lc_download_correct") +
                  ' <a href="https://www.invitelikecomment.com/en/" target="_blank">our website</a>. ' +
                  api.i18n.getMessage("lc_wrong_license_contact") +
                  " " +
                  _email
                : '<b><span class="red">' +
                  api.i18n.getMessage("lc_wrong_script") +
                  "</span></b> " +
                  api.i18n.getMessage("lc_check_license_or_contact") +
                  " " +
                  _email;
        else if (showEmailChangeSettings()) {
            1 == psCurRunType &&
                (i =
                    '<span class="green"><b>' +
                    api.i18n.getMessage("lc_license_status") +
                    ":</b> " +
                    _psLicScripts[psscr] +
                    " " +
                    api.i18n.getMessage("lc_active") +
                    ".</span>"),
                2 == psCurRunType &&
                    (i =
                        '<span class="green"><b>' +
                        api.i18n.getMessage("lc_license_status") +
                        ":</b> Full Pack " +
                        api.i18n.getMessage("lc_active") +
                        ".</span>"),
                5 == psCurRunType &&
                    (i =
                        '<span class="green"><b>' +
                        api.i18n.getMessage("lc_license_status") +
                        ":</b> " +
                        _psLicScripts[psscr] +
                        " " +
                        api.i18n.getMessage("lc_expiring_soon") +
                        "...</span>"),
                6 == psCurRunType &&
                    (i =
                        '<span class="green"><b>' +
                        api.i18n.getMessage("lc_license_status") +
                        ":</b> Full Pack " +
                        api.i18n.getMessage("lc_expiring_soon") +
                        "...</span>"),
                9 == psCurRunType &&
                    (i =
                        1 == psactive
                            ? '<span class="red"><b>' +
                              api.i18n.getMessage("lc_license_status") +
                              ":</b> " +
                              api.i18n.getMessage("lc_expired") +
                              "!</span>"
                            : '<span class="red"><b>' +
                              api.i18n.getMessage("lc_license_status") +
                              ":</b> " +
                              api.i18n.getMessage("lc_not_active") +
                              "!</span>");
            var r = new Date(1e3 * psexp);
            (i +=
                "<br><b>" +
                api.i18n.getMessage("lc_expire_date") +
                ":</b> " +
                r.getDate() +
                " " +
                monthNames[r.getMonth()] +
                " " +
                r.getFullYear() +
                ".<br>"),
                "i" == pstype &&
                    (i +=
                        "<b>" +
                        api.i18n.getMessage("lc_license_type") +
                        ":</b> " +
                        api.i18n.getMessage("lc_individual") +
                        ".<br>"),
                "b" == pstype &&
                    (i +=
                        "<b>" +
                        api.i18n.getMessage("lc_license_type") +
                        ":</b> " +
                        api.i18n.getMessage("lc_business") +
                        ".<br>"),
                "c" == pstype &&
                    (i +=
                        "<b>" +
                        api.i18n.getMessage("lc_license_type") +
                        ":</b> " +
                        api.i18n.getMessage("lc_corporate") +
                        ".<br>"),
                (i += "<b>" + api.i18n.getMessage("lc_license_duration") + ":</b> "),
                "1m" == psdura && (i += api.i18n.getMessage("lc_1_month") + "."),
                "1y" == psdura && (i += api.i18n.getMessage("lc_1_year") + "."),
                "2y" == psdura &&
                    (i +=
                        (2099 == r.getFullYear()
                            ? api.i18n.getMessage("lc_forever")
                            : api.i18n.getMessage("lc_2_years")) + "."),
                1 == psrenewCanc &&
                    "2y" != psdura &&
                    (i +=
                        ' <b><span class="red">' +
                        api.i18n.getMessage("lc_canceled_subscription") +
                        " " +
                        _email +
                        "</b></span>");
        }
        psmessagelast.length > 1 &&
            (psmessagelast == api.i18n.getMessage("pLocN" + getNrLoc(3))
                ? (i +=
                      "<br>" +
                      api.i18n.getMessage("lc_last_msg_error") +
                      ' <span class="green">' +
                      psmessagelast +
                      "</span>.")
                : (i +=
                      "<br>" +
                      api.i18n.getMessage("lc_last_msg_error") +
                      ' <span class="red"><b>' +
                      psmessagelast +
                      "</b></span>.")),
            "" != pslicID &&
                20 == pslicID.length &&
                ((o =
                    (20 == pslicID.length
                        ? api.i18n.getMessage("lc_your_code")
                        : api.i18n.getMessage("lc_insert_code")) + "<br>"),
                showEmailChangeSettings()
                    ? ((o +=
                          '<input name="tab_license_insert" value="' +
                          pslicID +
                          '" type="text" style="width:170px;text-align: center;padding: 5px;" disabled>\n        <button type="button" class="delLic">' +
                          api.i18n.getMessage("lc_remove_license") +
                          '</button>\n        <div class="borderLic">'),
                      ("" != psemailID && -1 != psemailID.indexOf("@")) ||
                          (o += '<span class="green"><b>' + api.i18n.getMessage("lc_add_email") + "</b></span>.<br>"),
                      (o +=
                          '<label for="email">' +
                          api.i18n.getMessage("lc_enter_email") +
                          '</label>\n        <input type="email" id="ps_email" name="email" value="' +
                          psemailID +
                          '">\n        <br>\n        <input type="checkbox" id="ps_subscription"' +
                          (1 == psNotif1 ? " checked" : "") +
                          "> " +
                          api.i18n.getMessage("lc_receive_license") +
                          '\n        <br>\n        <input type="checkbox" id="ps_news"' +
                          (1 == psNotif2 ? " checked" : "") +
                          "> " +
                          api.i18n.getMessage("lc_receive_news") +
                          "\n        <br><b>" +
                          api.i18n.getMessage("lc_never_share_email") +
                          '</b>\n        </div>\n        <button type="button" class="saveLic wide">' +
                          api.i18n.getMessage("lc_save") +
                          "</button>"))
                    : (o +=
                          '<input name="tab_license_insert" value="' +
                          pslicID +
                          '" type="text" style="width:170px;text-align: center;padding: 5px;">\n        <button type="button" class="saveLic">' +
                          api.i18n.getMessage("lc_save") +
                          "</button>"));
        var l =
            '<p style="margin:0;">\n<a href="" id="pslicA"><span id="licDivTitle">' +
            psdivtitle +
            '</span></a>\n</p>\n\n<div id="fp_att" style="text-align:left;">' +
            n +
            "\n" +
            t +
            "\n\n\n<br>\n<center>\n" +
            o +
            "\n</center>\n<br>\n\n" +
            i +
            "\n</div>";
        $(".licDiv").html(""),
            $(".licDiv").append(l),
            $(".saveLic").length > 0 &&
                $(".saveLic").click(function () {
                    saveLicense();
                }),
            $(".delLic").length > 0 &&
                $(".delLic").click(function () {
                    delLicense();
                }),
            $("#pslicA").length > 0 &&
                $("#pslicA").click(function (e) {
                    e.preventDefault(), openCloseDivLic();
                }),
            $("#togglePaidAlready").length > 0 &&
                $("#togglePaidAlready").click(function (e) {
                    e.preventDefault();
                    var t = $("#paidAlready");
                    "block" === t.css("display") ? t.css("display", "none") : t.css("display", "block");
                }),
            $("#pslicA").length > 0 && e && $("#pslicA")[0].click(),
            $("#ps_subscription,#ps_news").change(function () {
                psSaveButtonEnabled ||
                    ($(".saveLic").length > 0 &&
                        (clearTimeout(psTimerSaveButton),
                        (psSaveButtonEnabled = !0),
                        $(".saveLic").html("Save"),
                        $(".saveLic").prop("disabled", !1)));
            }),
            $('input[name="tab_license_insert"],#ps_email').on("input", function (e) {
                psSaveButtonEnabled ||
                    ($(".saveLic").length > 0 &&
                        (clearTimeout(psTimerSaveButton),
                        (psSaveButtonEnabled = !0),
                        $(".saveLic").html("Save"),
                        $(".saveLic").prop("disabled", !1)));
            }),
            $(".licDiv").show();
    }
}
function licWorking() {
    if ((debug && console.log("SO CAN WE WORK? " + pswork), 1 == pswork)) return !0;
    (weAreScanningOnlyInvites = !1),
        (psels = getElem(".uiScrollableAreaWrap ._5i_p .uiList._4kg", ".hidden_elem .uiList._4kg")
            .find("._5i_q ._6a._6b button._51sy,._5i_q ._6a._6b a._51sy")
            .not("._5i_q ._6a._6b a._59pe,._5i_q ._6a._6b button._51sy.hidden_elem,.uiPopover>a._51sy")).length > 1 ||
        (isThisNewFbDesign2020() &&
            getNewInviteButtonsByText().length > 0 &&
            3 != runMode &&
            4 != runMode &&
            0 ==
                getElem(".oajrlxb2").filter(function () {
                    return "false" == $(this).attr("aria-checked");
                }).length)
            ? ((doNotCloseFirstRunSelectPostsVerif = !0),
              saveQuickVars(),
              (loop_PostsListArray.length = 0),
              (loop_PostsList = ""),
              (runMode = 1),
              (runModetext = api.i18n.getMessage("UI_9")),
              (l_biltut = 1),
              document.getElementById("add-all-div-sw") && popup && destroyPopup(),
              "undefined" != typeof popupInfo && popupInfo && destroyPopupInfo(),
              (scriptIsRunning = 1),
              createPopup(),
              (weAreScanningOnlyInvites = !0),
              StartInvitePeople())
            : alert(api.i18n.getMessage("pLocN" + getNrLoc(4)));
}
function showEmailChangeSettings() {
    return (
        debug && console.log("psCurRunType=" + psCurRunType),
        1 == psCurRunType || 2 == psCurRunType || 5 == psCurRunType || 6 == psCurRunType || 9 == psCurRunType
    );
}
function getLicVarFromBackground(e) {
    psShowWarningNotification(10, api.i18n.getMessage("lc_validating_license"));
}
function getLicVarFromBackgroundOLD(e) {
    debug && console.log(e);
    var t = psexp;
    (psexp = e.psexp),
        (psrenewCanc = e.psrenewCanc),
        (pslicID = e.pslicID),
        (psemailID = e.psemailID),
        (psNotif1 = e.psNotif1),
        (psNotif2 = e.psNotif2),
        (psmessagelast = e.psmessagelast),
        (psscr = e.psscr),
        (pstype = e.pstype),
        (psdura = e.psdura),
        (psactive = e.psactive),
        calcLicVars(),
        psupdateFrameWithNewLicenseInfo(!0),
        cleanWarningNotification(),
        (1 == psCurRunType || 2 == psCurRunType) &&
            0 == t &&
            psexp > 0 &&
            ("" == psemailID
                ? alert(api.i18n.getMessage("pLocN" + getNrLoc(5)))
                : alert(api.i18n.getMessage("pLocN" + getNrLoc(6))));
}
function psShowWarningNotification(e, t) {
    if ((clearTimeout(notifTimerRelease), $(".warning-notification").length > 0)) {
        var n = '<p style="margin:0;">\n\t' + t + "\n\t</p>";
        $(".warning-notification").html(""), $(".warning-notification").append(n), $(".warning-notification").show();
    }
    notifTimerRelease = setTimeout(function () {
        cleanWarningNotification();
    }, 1e3 * e);
}
function cleanWarningNotification() {
    clearTimeout(notifTimerRelease),
        $(".warning-notification").length > 0 &&
            ($(".warning-notification").html(""), $(".warning-notification").hide());
}
function getLicVarFromBackgroundEMAILrestore(e) {
    psShowWarningNotification(10, api.i18n.getMessage("lc_searching_license"));
}
function getLicVarFromBackgroundEMAILrestoreOLD(e) {
    debug && console.log(e),
        (pslicID = ""),
        (psCurRunType = 0),
        (pswork = 0),
        e.result && e.result.length > 0 && e.message
            ? alert(e.result + ": " + e.message)
            : alert(api.i18n.getMessage("lc_unknown_error") + _email),
        (psmessagelast = e.message),
        calcLicVars(),
        psupdateFrameWithNewLicenseInfo(!0),
        cleanWarningNotification();
}
function cleanLicVariables() {
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
        (psCurRunType = 0);
}
function removeLicense() {
    cleanLicVariables(),
        api.runtime.sendMessage({ mode: "resLic" }, function (e) {
            updAfterRemove(e);
        });
}
function updAfterRemove(e) {
    calcLicVars(), psupdateFrameWithNewLicenseInfo(!0);
}
function saveLicense() {
    -1 == $('input[name="tab_license_insert"]').val().trim().indexOf('"') &&
    -1 == $('input[name="tab_license_insert"]').val().trim().indexOf("'") &&
    $('input[name="tab_license_insert"]').val().trim().length > 1
        ? 20 == $('input[name="tab_license_insert"]').val().trim().length ||
          $('input[name="tab_license_insert"]').val().trim().indexOf("@") > 0
            ? (pslicID != $('input[name="tab_license_insert"]').val().trim() && cleanLicVariables(),
              (pslicID = $('input[name="tab_license_insert"]').val().trim()),
              $('input[name="tab_license_insert"]').val(pslicID),
              _psmaxtries1 > 6 && parseInt(Math.floor(Date.now() / 1e3)) < _psmaxtries2 + 30
                  ? alert(api.i18n.getMessage("pLocN" + getNrLoc(7)))
                  : ($("#ps_email").length > 0 && (psemailID = $("#ps_email").val().trim()),
                    $("#ps_subscription").length > 0 && (psNotif1 = $("#ps_subscription").prop("checked") ? 1 : 0),
                    $("#ps_news").length > 0 && (psNotif2 = $("#ps_news").prop("checked") ? 1 : 0),
                    _psmaxtries1++,
                    (_psmaxtries2 = parseInt(Math.floor(Date.now() / 1e3))),
                    -1 == psemailID.indexOf("@") && (psemailID = ""),
                    pslicID.indexOf("@") > 0
                        ? api.runtime.sendMessage(
                              {
                                  mode: "vLic",
                                  pslicID: pslicID,
                                  psemailID: psemailID,
                                  psNotif1: psNotif1,
                                  psNotif2: psNotif2,
                              },
                              function (e) {
                                  getLicVarFromBackgroundEMAILrestore(e);
                              }
                          )
                        : api.runtime.sendMessage(
                              {
                                  mode: "vLic",
                                  pslicID: pslicID,
                                  psemailID: psemailID,
                                  psNotif1: psNotif1,
                                  psNotif2: psNotif2,
                              },
                              function (e) {
                                  getLicVarFromBackground(e);
                              }
                          )))
            : $('input[name="tab_license_insert"]').val().trim().length < 2
              ? alert(api.i18n.getMessage("pLocN" + getNrLoc(8)))
              : alert(api.i18n.getMessage("pLocN" + getNrLoc(9)))
        : 20 == pslicID.length && "" == $('input[name="tab_license_insert"]').val().trim()
          ? delLicense()
          : alert(api.i18n.getMessage("pLocN" + getNrLoc(10)));
}
function delLicense() {
    psexp > psCurTimeStamp && 1 == psactive
        ? confirm(api.i18n.getMessage("pLocN" + getNrLoc(11))) && removeLicense()
        : removeLicense();
}
function openCloseDivLic() {
    $("#fp_att").is(":visible")
        ? ($("#fp_att").hide(), $("#licDivTitle").text(psdivtitle))
        : ($("#fp_att").show(), $("#licDivTitle").text(api.i18n.getMessage("lc_close_menu")));
}
function changeSaveButton(e) {
    e &&
        (psTimerSaveButton = setTimeout(function () {
            $(".saveLic").length > 0
                ? ((psSaveButtonEnabled = !1), $(".saveLic").html("Saved!"), $(".saveLic").prop("disabled", !0))
                : ((psSaveButtonEnabled = !0), $(".saveLic").html("Save"), $(".saveLic").prop("disabled", !1));
        }, 400));
}
function getInvitesLast24h() {
    const e = Date.now() - 864e5;
    return invitesLogArray.filter((t) => t >= e).length;
}
function getInvitesLast30d() {
    const e = Date.now(),
        t = e - 2592e6;
    cleanupOldInvites();
    const n = invitesLogArray.filter((e) => e >= t).length;
    let o = 30,
        i = "";
    if (invitesLogArray.length > 0) {
        const t = invitesLogArray[0],
            n = Math.ceil((e - t) / 864e5);
        (o = Math.min(30, n)), o < 30 && (i = " " + api.i18n.getMessage("counting_days_only", [o]));
    }
    return n + i;
}
function cleanupOldInvites() {
    const e = Date.now() - 31536e6;
    (invitesLogArray = invitesLogArray.filter((t) => t >= e)),
        api.storage.local.set({ invitesLogArray: invitesLogArray });
}
function psLimitInvIncrease() {
    invitesLogArray.push(Date.now()),
        api.storage.local.set({ invitesLogArray: invitesLogArray }),
        11 == psCurRunType && ++psInvTot % 2 == 0 && api.storage.sync.set({ psInvTot: psInvTot }, function () {}),
        "day" == stopWhen && (psInvTotDay++, api.storage.sync.set({ psInvTotDay: psInvTotDay }, function () {}));
}
function scanInvitesInNewTab(e) {
    getElem("#runModeText").length > 0 && getElem("#runModeText").text(api.i18n.getMessage("lc_scanning_post")),
        (waitingForReply = !0),
        api.runtime.sendMessage(
            {
                type: "openTabAndScan",
                tabID: tab_ID,
                linkURL: e,
                windowID: window_ID,
                c1: mtotalInvited,
                c2: total_shared_posts_liked,
                c3: total_shared_posts_commented,
            },
            function (e) {}
        );
}
function getNrLoc(e) {
    return e;
}
function checkSecondTabExsists() {
    waitingForReply &&
        (++howManyTimesWeCheckedTab > 400
            ? (api.runtime.sendMessage({ type: "KillSecondTab", tabID: tab_Exists_CheckID }, function (e) {}),
              (tab_Exists_CheckID = 0))
            : (api.runtime.sendMessage({ type: "VerifyTabStillOpen", tabID: tab_Exists_CheckID }, function (e) {}),
              (timer_CheckSecondTabExsist = setTimeout(function () {
                  checkSecondTabExsists();
              }, 11e3))));
}
function continueAfterScanningInNewTab(e, t, n, o) {
    getElem("#runModeText").length > 0 &&
        (runModetext
            ? getElem("#runModeText").text(runModetext)
            : getElem("#runModeText").text(api.i18n.getMessage("lc_scanning_posts"))),
        e >= mtotalInvited ? (mtotalInvited = e) : (mtotalInvited += e),
        t >= total_shared_posts_liked ? (total_shared_posts_liked = t) : (total_shared_posts_liked += t),
        n >= total_shared_posts_commented ? (total_shared_posts_commented = n) : (total_shared_posts_commented += n),
        updatePopup(),
        o
            ? stopScript(api.i18n.getMessage("you_stop") + "\r")
            : ((sharedPostIsCheckingNow = 0), ClosePostAndOpenNext(-1));
}
listenerInit && FileAlreadyLoadedThisIsNOTerror(),
    (listenerInit = !0),
    api.runtime.onMessage.addListener(function (e, t) {
        1 == scriptIsRunning &&
            waitingForReply &&
            "continueScript" == e.type &&
            ((waitingForReply = !1),
            clearTimeout(timer_CheckSecondTabExsist),
            (tab_Exists_CheckID = 0),
            continueAfterScanningInNewTab(e.inv, e.lik, e.com, e.stop)),
            "verifyThisTabExsists" == e.type &&
                ((waitingForReply = !0),
                e._tab && (tab_Exists_CheckID = e._tab),
                (howManyTimesWeCheckedTab = 0),
                (timer_CheckSecondTabExsist = setTimeout(function () {
                    checkSecondTabExsists();
                }, 11e3))),
            "WeAreScanningInSeparateTabNOW" == e.type &&
                ((waitingForReply = !0),
                e._tab && (tab_Exists_CheckID = e._tab),
                (howManyTimesWeCheckedTab = 0),
                (timer_CheckSecondTabExsist = setTimeout(function () {
                    checkSecondTabExsists();
                }, 11e3)),
                getElem("#runModeText").length > 0 &&
                    getElem("#runModeText").text(api.i18n.getMessage("lc_scanning_post")),
                (pauseScriptDueToSeparateTabScanning = !0)),
            "getLicVarFromBackgroundOLD" == e.code && getLicVarFromBackgroundOLD(e),
            "getLicVarFromBackgroundEMAILrestoreOLD" == e.code && getLicVarFromBackgroundEMAILrestoreOLD(e),
            "newClassReceivedFromServer" == e.code &&
                (server_version && e.server_version && e.server_version > server_version
                    ? e.server_warning_version > server_warning_version &&
                      e.server_warning_text &&
                      e.server_warning_text.length > 1
                        ? alert(api.i18n.getMessage("lc_server_update_msg") + e.server_warning_text)
                        : alert(api.i18n.getMessage("lc_server_update"))
                    : e.server_warning_version > server_warning_version &&
                      e.server_warning_text &&
                      e.server_warning_text.length > 1 &&
                      alert(api.i18n.getMessage("lc_server_received_msg") + e.server_warning_text));
    });