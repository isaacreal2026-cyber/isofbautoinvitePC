var scriptLastCall,
    _tab_ID,
    _realt,
    _runMode,
    api = "undefined" != typeof chrome ? chrome : browser;
function showAlert(){
    alert('Extension works only on facebook.com website!');
}
	
var _maintab=0;
var _secondtab=0;
var c1=0;
var c2=0;
var c3=0;

var _waitTabsOpening=0;
var _waitTabsOpening2=0;
var _waitTabsOpening3=0;
_tempTabId = new Array();

api.action.onClicked.addListener(function (e) {
    if (e && e.url && void 0 !== e.url && -1 != e.url.indexOf("facebook.com")){
		if (_secondtab==0 && _maintab==0){
			api.storage.local.get({
				_secondtab:0,
				_maintab:0
			}, function(items) {
			if (items){
				_secondtab = Number(items._secondtab);
				_maintab = Number(items._maintab);

				if (_secondtab>0 && _maintab>0){
					api.tabs.sendMessage(_secondtab, {type: 'weNeedToStop'});
				}else{
					api.scripting.executeScript({
						target: { tabId: e.id },
						func: (arg) => { window.iconClicked = arg },
						args: [true],
					});
					api.scripting.executeScript({
					  target: {tabId: e.id},
					  files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
					});
				}
			}
			});
		}else{
			if (_secondtab>0 && _maintab>0){
				api.tabs.sendMessage(_secondtab, {type: 'weNeedToStop'});
			}else{
				api.scripting.executeScript({
					target: { tabId: e.id },
					func: (arg) => { window.iconClicked = arg },
					args: [true],
				});
				api.scripting.executeScript({
				  target: {tabId: e.id},
				  files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
				});
			}
		}
	}else{
		api.scripting.executeScript({
		  target: {tabId: e.id},
		  function: showAlert,
		});
	}
});
void 0 === scriptLastCall && (scriptLastCall = 0);
api.tabs.onUpdated.addListener(function (e, t, i) {
	"complete" === t.status && i.url &&
		i.url.indexOf("facebook.com") > 0 &&
		(-1 == i.url.indexOf("current_page=") || i.url.indexOf("current_page=0") > 0) &&
		api.storage.local.get({ _tab_ID: 0, _realt: 0, _runMode: 0, _time: 0 }, function (e) {
			e._tab_ID == i.id &&
				1 == e._realt &&
				void 0 === t.url &&
				e._time > 0 &&
				parseInt(Math.floor(Date.now() / 1e3)) < parseInt(e._time) + 300 &&
				(parseInt(Math.floor(Date.now())) > scriptLastCall + 3e3
					? setTimeout(function () {
						api.scripting.executeScript({
						  target: {tabId: i.id},
						  files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
						});
					  }, 500)
					: console.log("double trigger ignored 1!"),
				(scriptLastCall = parseInt(Math.floor(Date.now())))),
				(i.url.indexOf("pages?fb-auto-invite=1") > 0 || (e._tab_ID == i.id && e._runMode > 0 && 1 != e._realt && e._time > 0 && parseInt(Math.floor(Date.now() / 1e3)) < parseInt(e._time) + 30)) &&
					(parseInt(Math.floor(Date.now())) > scriptLastCall + 3e3
						? 			api.scripting.executeScript({
									  target: {tabId: i.id},
									  files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
									})
						: console.log("double trigger ignored 2!"),
					(scriptLastCall = parseInt(Math.floor(Date.now()))));
		});
});










// classes from server!
var server_version;
var server_warning_text;
var server_warning_version;

// ADD, before each class!
var server_main_invite_scroll;
var server_main_like_to_click;
var server_new_like_block;
var server_new_like_total_number;
var server_new_like_total_numberIgnor;
var server_new_like_reaction;
var server_main_like_to_clickIgnor;
var server_main_close_invite_window;
var server_pd_posts;
var server_bs_posts;
var server_photos_listNOT;
var server_bs_close_post;
var server_bs_close_postF1;
var server_bs_close_postF2;
var server_bs_scroll_post;
var server_bs_scroll_list;
var server_bs_page_name;
var server_bs_second_posts;
var server_bs_second_posts_filter;
var server_bs_shared_posts_btn;
var server_bs_view_on_fb_item;

var server_home_posts;

var server_photos_list;
var server_photos_close_post;
var server_load_more_photos_posts;

var server_inv_friends_list;
var server_inv_friends_scoll;

var server_inbox_elements;
var server_inbox_addit_click;
var server_inbox_close_addit_elem;
var server_inbox_scroll_list;

var server_notif_scroll;
var server_notif_list;
var server_notif_ignore_list;

var server_shared_items;
var server_shared_show_attachment;
var server_shared_author;
var server_shared_comments;
var server_shared_comment_author;



api.runtime.onMessage.addListener(function (e, t, i) {
	"getTabId" == e.type && i({ tabId: t.tab.id }),
	"getWindowId" == e.type && i({ windowId: t.tab.windowId });
	
	if ("openTabAndScan" == e.type){
		_waitTabsOpening=0;
		c1=e.c1;
		c2=e.c2;
		c3=e.c3;

		_maintab=t.tab.id;
		_waitTabsOpening=parseInt(Math.floor(Date.now()))+60000;
		i({return: true});
		api.storage.local.set({
			c1: c1,
			c2: c2,
			c3: c3,
			_maintab: _maintab,
			_waitTabsOpening: _waitTabsOpening
			}, function() {
				openTabAndScan(Number(e.tabID),e.linkURL,Number(e.windowID));
		});
	}
	if ("KillSecondTab" == e.type){
		if (e.tabID)
			_secondtab=e.tabID;
		_maintab=t.tab.id;
		closeTabAndSaveStoriesCount(0,0,0,0);
	}
	if ("LoadClassesFromServer" == e.type){
		checkClassesOnly(1);
		i({return: true});
	}
	if ("VerifyTabStillOpen" == e.type){
		if (e.tabID)
			_secondtab=e.tabID;
		_maintab=t.tab.id;
		verifyTabExists();
	}
	
	if ("separateScanFinished" == e.type){ //api.runtime.sendMessage({ type: 'separateScanFinished', inv: mtotalInvited, lik: total_shared_posts_liked, com: total_shared_posts_commented }, function(response) {});
		i({return: true});
		_secondtab=t.tab.id;
		if (_maintab==0){
			api.storage.local.get({
				_maintab:0
			}, function(items) {
			if (items){
				_maintab = Number(items._maintab);
				
				closeTabAndSaveStoriesCount(e.inv,e.lik,e.com,e.stop);
			}
			});
		}else
			closeTabAndSaveStoriesCount(e.inv,e.lik,e.com,e.stop);
	}
	if ("maybeTabWillBeOpened" == e.type){
		i({return: true});
		_waitTabsOpening2=parseInt(Math.floor(Date.now()))+3500;
		_maintab=e.tab_ID
		_tempTabId.length=0;
		api.storage.local.set({
			_waitTabsOpening2: _waitTabsOpening2,
			_maintab: _maintab,
			_tempTabId: _tempTabId
			}, function() {
				// we saved those variables!
		});
	}
	
});
function openTabAndScan(maintab,_url,winID){
	//console.log("maintab="+maintab);
	//console.log("_url="+_url);
	//console.log("WE ARE OPENING TABS NOW!");
	api.tabs.create({
		'url': _url,
		active: true,
		windowId: winID
	}, function(tab) {
		_secondtab=tab.id;
		api.storage.local.set({
			_secondtab: _secondtab
			}, function() {
		});
		
		// send the tab ID to check to contentscript
		api.tabs.sendMessage(_maintab, {type: 'verifyThisTabExsists', _tab: _secondtab});
		
		//tabExistsCheck2=0;
		//tabExistsCheck=setTimeout(function(){verifyTabExists();},5000);
		// run in background
	});
}
api.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	api.storage.local.get({
		_secondtab:0,
		_waitTabsOpening:0,
		c1:0,
		c2:0,
		c3:0,
		_waitTabsOpening2:0,
		_maintab:0,
		_waitTabsOpening3:0
	}, function(items) {
	if (items){
		if (_secondtab==0)
			_secondtab = items._secondtab;
		if (_waitTabsOpening==0)
			_waitTabsOpening = items._waitTabsOpening;
		if (c1==0)
			c1 = items.c1;
		if (c2==0)
			c2 = items.c2;
		if (c3==0)
			c3 = items.c3;
		if (_waitTabsOpening2==0)
			_waitTabsOpening2 = items._waitTabsOpening2;
		if (_maintab==0)
			_maintab = items._maintab;
		if (_waitTabsOpening3==0)
			_waitTabsOpening3 = items._waitTabsOpening3;
		
		

		// make sure the status is 'complete' and it's the right tab
		if (tab.id==_secondtab && changeInfo.status == 'complete' && parseInt(Math.floor(Date.now()))<_waitTabsOpening) {
			_waitTabsOpening=0;
			api.storage.local.set({
				_waitTabsOpening: _waitTabsOpening
				}, function() {
			//setTimeout(function(){
				api.scripting.executeScript({
					target: { tabId: tab.id },
					func: (arg,arg2,arg3) => { window._c1 = arg, window._c2 = arg2, window._c3 = arg3 },
					args: [c1,c2,c3],
				});
				//console.log("HERE WE HAVE MANY VARIABLES TO ADD!");
				api.scripting.executeScript({
				  target: {tabId: tab.id},
				  files: ['jquery-3.5.1.min.js','sendkeys.js','content_newtab.js']
				});
			//},1000);
			});
		}
		
		
		// the same tab changed in 3 seconds, we are missing important settings!
		if (parseInt(Math.floor(Date.now()))<_waitTabsOpening2 && _maintab==tab.id && tab.url && tab.url.indexOf('facebook.com')>-1 && tab.url.indexOf('/watch')>-1){
			if (_waitTabsOpening3==0 || _waitTabsOpening3<parseInt(Math.floor(Date.now()))){
				//console.log("Waiting 60 sec to load it!");
				_waitTabsOpening3=parseInt(Math.floor(Date.now()))+60000; // wait 60 sec to get watch page in our MAIN tab
				api.storage.local.set({
					_waitTabsOpening3: _waitTabsOpening3
					}, function() {
				});
			}
		}
		// the same tab changed waiting to load in 60 sec:
		if (parseInt(Math.floor(Date.now()))<_waitTabsOpening3 && _maintab==tab.id && tab.url && tab.url.indexOf('facebook.com')>-1 && tab.url.indexOf('/watch')>-1 && changeInfo.status == 'complete'){
			_waitTabsOpening3=0;
			api.storage.local.set({
				_waitTabsOpening3: _waitTabsOpening3
			}, function() {
				api.scripting.executeScript({
				  target: {tabId: tab.id},
				  files: ['jquery-3.5.1.min.js','error_redirect.js']
				});
			});
			//console.log("Run the script!");
			//setTimeout(function(){

			//},300);
		}
	}
	});
});


function verifyTabExists(){
	if (_secondtab && _secondtab>0)
		api.tabs.get(_secondtab,verifyTabExists2);
}
function verifyTabExists2() {
    if (api.runtime.lastError) {
        // tab error
		if (_secondtab && _secondtab>0 && _maintab && _maintab>0){
			// если номер таба еще есть тогда репортим
			_secondtab=0;
			
			api.storage.local.set({
				_secondtab: _secondtab
				}, function() {
			});
			
			api.tabs.update(_maintab, {highlighted: true});
			// tell contentscript that we can continue!
			api.tabs.sendMessage(_maintab, {type: 'continueScript', inv: 0, lik: 0, com: 0, stop:false});
		}
    } else {
        // Tab exists, do nothing
    }
}
function closeTabAndSaveStoriesCount(_inv,_lik,_com,_stop){
// close tab
if (_secondtab>0)
	api.tabs.remove(_secondtab);
_secondtab=0;

api.storage.local.set({
	_secondtab: _secondtab
	}, function() {
});

// set focus on main tab
api.tabs.update(_maintab, {highlighted: true});
api.tabs.sendMessage(_maintab, {type: 'continueScript', inv: _inv, lik: _lik, com: _com, stop:_stop});
}
	

// for creator studio and new tabs where we cannot open old layout:
//_waitTabsOpening2=parseInt(Math.floor(Date.now()))+3000;
api.tabs.onCreated.addListener(function (tab){
	if (parseInt(Math.floor(Date.now()))<_waitTabsOpening2){
        //console.log("Tab opened");
		//console.log(tab);
		//console.log(tab.id);
		if (_tempTabId.length==0){
			api.storage.local.get({
				_tempTabId:new Array()
			}, function(items) {
			if (items){
				_tempTabId = items._tempTabId;
				_tempTabId.push(tab.id);
				api.storage.local.set({
					_tempTabId: _tempTabId
					}, function() {
				});
			}
			});
		}else{
			_tempTabId.push(tab.id);
			api.storage.local.set({
				_tempTabId: _tempTabId
				}, function() {
			});
		}
	}
});
api.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //if (changeInfo.status != 'complete')
    //    return;
	if (_tempTabId.length==0){
		api.storage.local.get({
			_tempTabId:new Array()
		}, function(items) {
		if (items){
			_tempTabId = items._tempTabId;
			
			if (_tempTabId.includes(tab.id) && tab.url.indexOf('facebook.com') != -1 && (tab.url.indexOf('/watch') != -1 || tab.url.indexOf('/videos') != -1 || tab.url.indexOf('/reel/') != -1)) {
				_secondtab=tab.id;
				_waitTabsOpening=parseInt(Math.floor(Date.now()))+60000;
				
				api.storage.local.set({
					_secondtab: _secondtab,
					_waitTabsOpening: _waitTabsOpening
					}, function() {
				});
				
				api.tabs.sendMessage(_maintab, {type: 'WeAreScanningInSeparateTabNOW', _tab: _secondtab});
			}
		}
		});
	}else{
		if (_tempTabId.includes(tab.id) && tab.url.indexOf('facebook.com') != -1 && (tab.url.indexOf('/watch') != -1 || tab.url.indexOf('/videos') != -1 || tab.url.indexOf('/reel/') != -1)) {
			_secondtab=tab.id;
			_waitTabsOpening=parseInt(Math.floor(Date.now()))+60000;
			
			api.storage.local.set({
				_secondtab: _secondtab,
				_waitTabsOpening: _waitTabsOpening
				}, function() {
			});
			
			api.tabs.sendMessage(_maintab, {type: 'WeAreScanningInSeparateTabNOW', _tab: _secondtab});
		}
	}
});


































var debugB=false;
if (debugB)
	console.log("change this one in all extensions!");
var psThisScr="mul"; // TODO CHANGE IT

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
var scriptName="mul"; // TODO CHANGE THE NAME HERE FOR ALL SCRIPTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var dateObj = new Date();
var month = dateObj.getUTCMonth(); //months from 0-11
var day = dateObj.getUTCDate();
var installID=month+makeid(8)+day;


var _si1='https://www.invitelikecomment.com/license/';


// ALWAYS load them before doing something with them!!!
var psnextcheck=0;
var psfTr=0;
var psexp=0;
var psrenewCanc=0;
var pslicID="";
var psemailID="";
var old_psemailID="";
var psNotif1=0;
var psNotif2=0;
var psmessagelast="";
var pserrorsQ=0;
var pserrorsConn=0;
var psscr="";
var pstype="";
var psdura="";
var psactive=0;

var psCurTimeStamp=parseInt(Math.floor(Date.now() / 1000)); // in seconds

var _timeout1;
// When installed or updated, point the user to info/instructions
api.runtime.onInstalled.addListener(function(details){
	var version = "unknown";
	try {
		version = api.runtime.getManifest().version;
	}
	catch (e) { }
	if ("install"===details.reason) {
		checkClassesOnly(0);
		api.storage.sync.set({
			installID: installID
			}, function() {
				_timeout1=setTimeout(function(){checkTrial();},10000);
				api.tabs.create({url: "https://www.invitelikecomment.com/en/new-install?version="+version+"&s="+scriptName+"&g="+installID});
		});
	}
});
// trial check
function checkTrial(){
	if (debugB)
		console.log("test tri");
	var firstRun=0;
	api.storage.sync.get({
		firstRun:0
	}, function(items) {
if (items){
		firstRun = Number(items.firstRun);
		if (firstRun==0){
			// first run! We need to check trial if available
			fetch(_si1+"v_tri?g=" + installID)
			.then(function (response) {
				return response.json();
			})
			.then(function (n) {
				if (debugB)
					console.log(n);
				psCurTimeStamp=parseInt(Math.floor(Date.now() / 1000)); // in seconds
				if (null != n){
					if (debugB)
						console.log("ANS:"+n.result);
					if (n.result == "OK"){

					}else if (n.result == "NO"){
						api.storage.sync.set({
							psfTr: -1
							}, function() {
						});
					}
				}
			});
		}
		api.storage.sync.set({
			firstRun: 1
			}, function() {
		});
}
	});
}



api.alarms.onAlarm.addListener(function(alarm) {
	if (alarm && alarm.name=="VerifyL")
		loadVarsAndCheckLic1();
});
// license check
//_timeout2=setTimeout(function(){loadVarsAndCheckLic1();},60000); // 60000 - in 1 minute do a check!
api.alarms.create("VerifyL", { delayInMinutes: 1 });
// send json to verify license if we need to do that!
function loadVarsAndCheckLic1(){
	//console.log("checking now");
	api.storage.sync.get({
		psnextcheck:0,
		psfTr:0,
		psexp:0,
		psrenewCanc:0,
		pslicID:"",
		psemailID:"",
		psNotif1:0,
		psNotif2:0,
		psmessagelast:"",
		pserrorsQ:0,
		pserrorsConn:0,
		psscr:"",
		pstype:"",
		psdura:"",
		psactive:0,
	}, function(items) {
if (items){
		psnextcheck = Number(items.psnextcheck);
		psfTr = Number(items.psfTr);
		psexp = Number(items.psexp);
		psrenewCanc = Number(items.psrenewCanc);
		pslicID = items.pslicID;
		psemailID = items.psemailID;
		old_psemailID=psemailID;
		psNotif1 = Number(items.psNotif1);
		psNotif2 = Number(items.psNotif2);
		psmessagelast = items.psmessagelast;
		pserrorsQ = Number(items.pserrorsQ);
		pserrorsConn = Number(items.pserrorsConn);
		psscr = items.psscr;
		pstype = items.pstype;
		psdura = items.psdura;
		psactive = Number(items.psactive);
		
		// check them!
		psCurTimeStamp=parseInt(Math.floor(Date.now() / 1000)); // in seconds
		if (debugB){
			//console.log("Next check at: "+psnextcheck);
			//console.log("In: "+(psnextcheck-psCurTimeStamp));
		}
		if (pslicID.length==20 && (psexp!=0 && psCurTimeStamp>psexp || (psnextcheck!=0 && psCurTimeStamp>psnextcheck) || psnextcheck-psCurTimeStamp>7.884e+6))
			checkLicns(0);
}
	});
	
}
var replyResult="";
var licVerifTabId=0;
// contentScript asks us to verify this license:
api.runtime.onMessage.addListener(function(message,sender,sendResponse){
	// if there is a starting timeout - clear it!
	if (message.mode && message.mode=="vLic"){
		licVerifTabId=0;
		//clearTimeout(_timeout2);
		api.alarms.clear("VerifyL");
		if (debugB)
			console.log("here:"+message.pslicID);
		if (message.pslicID)
			pslicID=message.pslicID;
		if (typeof(message.psemailID) != "undefined" && message.psemailID !== null){
			old_psemailID=psemailID;
			psemailID=message.psemailID;
		}
		if (typeof(message.psNotif1) != "undefined" && message.psNotif1 !== null)
			psNotif1=Number(message.psNotif1);
		if (typeof(message.psNotif2) != "undefined" && message.psNotif2 !== null)
			psNotif2=Number(message.psNotif2);
		if (debugB)
			console.log("psNotif2="+psNotif2);
		
		// try to check the license for them:
		if (debugB)
			console.log("QQ1");
		replyResult="";
		if (message.pslicID.indexOf('@')>0)
			checkLicns(1); // email restore
		else
			checkLicns(2); // verify license
		licVerifTabId=sender.tab.id;
		sendResponse({ result: "Wait"});
		
		if (1==2){ // OLD
			if (debugB){
				console.log("QQ2");
				console.log(replyResult);
				console.log(psmessagelast);
			}
			if (message.pslicID.indexOf('@')>0)
				sendResponse({ result: replyResult, message: psmessagelast});
			else
				sendResponse({ psexp: psexp, psrenewCanc: psrenewCanc, pslicID: pslicID, psemailID: psemailID, psNotif1: psNotif1, psNotif2: psNotif2, psmessagelast: psmessagelast, psscr: psscr, pstype: pstype, psdura: psdura, psactive: psactive });
			if (debugB)
				console.log("QQ3");
		}
	}
	if (message.mode && message.mode=="resLic"){
		
		resLicB();
		
		// save them
		saveLicSettings();
		sendResponse({ result: true});
	}
});
function resLicB(){
psnextcheck=0;
psexp=0;
psrenewCanc=0;
pslicID="";
psemailID="";
psNotif1=1;
psNotif2=0;
psmessagelast="";
pserrorsQ=0;
pserrorsConn=0;
psscr="";
pstype="";
psdura="";
psactive=0;
}
function readServerClasses(n){
	if (n.server_version)
		server_version=parseInt(n.server_version);
	if (n.server_warning_text)
		server_warning_text=n.server_warning_text;
	if (n.server_warning_version)
		server_warning_version=parseInt(n.server_warning_version);
	
	if (n.server_main_invite_scroll)
		server_main_invite_scroll=n.server_main_invite_scroll;
	if (n.server_main_like_to_click)
		server_main_like_to_click=n.server_main_like_to_click;
	if (n.server_new_like_block)
		server_new_like_block=n.server_new_like_block;
	if (n.server_new_like_total_number)
		server_new_like_total_number=n.server_new_like_total_number;
	if (n.server_new_like_total_numberIgnor)
		server_new_like_total_numberIgnor=n.server_new_like_total_numberIgnor;
	if (n.server_new_like_reaction)
		server_new_like_reaction=n.server_new_like_reaction;
	if (n.server_main_like_to_clickIgnor)
		server_main_like_to_clickIgnor=n.server_main_like_to_clickIgnor;
	if (n.server_main_close_invite_window)
		server_main_close_invite_window=n.server_main_close_invite_window;
	if (n.server_pd_posts)
		server_pd_posts=n.server_pd_posts;
	if (n.server_bs_posts)
		server_bs_posts=n.server_bs_posts;
	if (n.server_photos_listNOT)
		server_photos_listNOT=n.server_photos_listNOT;
	if (n.server_bs_close_post)
		server_bs_close_post=n.server_bs_close_post;
	if (n.server_bs_close_postF1)
		server_bs_close_postF1=n.server_bs_close_postF1;
	if (n.server_bs_close_postF2)
		server_bs_close_postF2=n.server_bs_close_postF2;
	if (n.server_bs_scroll_post)
		server_bs_scroll_post=n.server_bs_scroll_post;
	if (n.server_bs_scroll_list)
		server_bs_scroll_list=n.server_bs_scroll_list;
	if (n.server_bs_page_name)
		server_bs_page_name=n.server_bs_page_name;
	if (n.server_bs_second_posts)
		server_bs_second_posts=n.server_bs_second_posts;
	if (n.server_bs_second_posts_filter)
		server_bs_second_posts_filter=n.server_bs_second_posts_filter;
	if (n.server_bs_shared_posts_btn)
		server_bs_shared_posts_btn=n.server_bs_shared_posts_btn;
	if (n.server_bs_view_on_fb_item)
		server_bs_view_on_fb_item=n.server_bs_view_on_fb_item;
	if (n.server_home_posts)
		server_home_posts=n.server_home_posts;
	if (n.server_photos_list)
		server_photos_list=n.server_photos_list;
	if (n.server_photos_close_post)
		server_photos_close_post=n.server_photos_close_post;
	if (n.server_load_more_photos_posts)
		server_load_more_photos_posts=n.server_load_more_photos_posts;
	if (n.server_inv_friends_list)
		server_inv_friends_list=n.server_inv_friends_list;
	if (n.server_inv_friends_scoll)
		server_inv_friends_scoll=n.server_inv_friends_scoll;
	if (n.server_inbox_elements)
		server_inbox_elements=n.server_inbox_elements;
	if (n.server_inbox_addit_click)
		server_inbox_addit_click=n.server_inbox_addit_click;
	if (n.server_inbox_close_addit_elem)
		server_inbox_close_addit_elem=n.server_inbox_close_addit_elem;
	if (n.server_inbox_scroll_list)
		server_inbox_scroll_list=n.server_inbox_scroll_list;
	if (n.server_notif_scroll)
		server_notif_scroll=n.server_notif_scroll;
	if (n.server_notif_list)
		server_notif_list=n.server_notif_list;
	if (n.server_notif_ignore_list)
		server_notif_ignore_list=n.server_notif_ignore_list;
	if (n.server_shared_items)
		server_shared_items=n.server_shared_items;
	if (n.server_shared_show_attachment)
		server_shared_show_attachment=n.server_shared_show_attachment;
	if (n.server_shared_author)
		server_shared_author=n.server_shared_author;
	if (n.server_shared_comments)
		server_shared_comments=n.server_shared_comments;
	if (n.server_shared_comment_author)
		server_shared_comment_author=n.server_shared_comment_author;
	
	// save classes if they are ok!
	if (server_main_invite_scroll!="" && server_main_invite_scroll.length>1){
		api.storage.sync.set({
			server_version: server_version,
			server_warning_text: server_warning_text,
			server_warning_version: server_warning_version,
			server_main_invite_scroll: server_main_invite_scroll,
			server_main_like_to_click: server_main_like_to_click,
			server_new_like_block: server_new_like_block,
			server_new_like_total_number: server_new_like_total_number,
			server_new_like_total_numberIgnor: server_new_like_total_numberIgnor,
			server_new_like_reaction: server_new_like_reaction,
			server_main_like_to_clickIgnor: server_main_like_to_clickIgnor,
			server_main_close_invite_window: server_main_close_invite_window,
			server_pd_posts: server_pd_posts,
			server_bs_posts: server_bs_posts,
			server_photos_listNOT: server_photos_listNOT,
			server_bs_close_post: server_bs_close_post,
			server_bs_close_postF1: server_bs_close_postF1,
			server_bs_close_postF2: server_bs_close_postF2,
			server_bs_scroll_post: server_bs_scroll_post,
			server_bs_scroll_list: server_bs_scroll_list,
			server_bs_page_name: server_bs_page_name,
			server_bs_second_posts: server_bs_second_posts,
			server_bs_second_posts_filter: server_bs_second_posts_filter,
			server_bs_shared_posts_btn: server_bs_shared_posts_btn,
			server_bs_view_on_fb_item: server_bs_view_on_fb_item,
			server_home_posts: server_home_posts,
			server_photos_list:server_photos_list,
			server_photos_close_post:server_photos_close_post,
			server_load_more_photos_posts:server_load_more_photos_posts,
			server_inv_friends_list:server_inv_friends_list,
			server_inv_friends_scoll:server_inv_friends_scoll,
			server_inbox_elements:server_inbox_elements,
			server_inbox_addit_click:server_inbox_addit_click,
			server_inbox_close_addit_elem: server_inbox_close_addit_elem,
			server_inbox_scroll_list:server_inbox_scroll_list,
			server_notif_scroll:server_notif_scroll,
			server_notif_list:server_notif_list,
			server_notif_ignore_list:server_notif_ignore_list,
			server_shared_items:server_shared_items,
			server_shared_show_attachment:server_shared_show_attachment,
			server_shared_author:server_shared_author,
			server_shared_comments:server_shared_comments,
			server_shared_comment_author:server_shared_comment_author
			}, function() {
				// do nothing, just save.
				//console.log("SAVED errors:"+pserrorsQ);
		});
	}
	
}
function checkClassesOnly(sendReply){
	if (1==1){
		//console.log("we will fetch now 2!");
		fetch(_si1+"v_class?id=" + api.runtime.id)
		.then(function (response) {
			return response.json();
		})
		.then(function (n) {
			// here everything!
			if (debugB){
				console.log("CLASSES HERE:");
				console.log(n);
			}
			if (null != n){
				// this is default min pause to the next check:

				// read and save classes here!
				readServerClasses(n);
				
			// send replies HERE to main script!
			if (sendReply==1 && licVerifTabId!=0)
				api.tabs.sendMessage(licVerifTabId, {code:"newClassReceivedFromServer", server_version: server_version, server_warning_text: server_warning_text, server_warning_version: server_warning_version});
			}
		})
		.catch(function () {
			console.log("Error connecting to web server. Please check your Internet connection and try again. (F1)")
		});
	}
	//return true;
}
function checkLicns(sendReply){
	psCurTimeStamp=parseInt(Math.floor(Date.now() / 1000)); // in seconds
	if (1==1){
		// if we have additional information:
		var addToCheck="";
		if (psemailID!="" || old_psemailID!=psemailID){
			addToCheck="&em="+psemailID+"&psNotif1="+psNotif1+"&psNotif2="+psNotif2;
		}
		if (debugB){
			console.log(pserrorsConn);
		}
		fetch(_si1+"v_lic2?l=" + pslicID +"&id=" + api.runtime.id + "&curSc=" + psThisScr + addToCheck)
		.then(function (response) {
			return response.json();
		})
		.then(function (n) {
			// here everything!
			if (debugB){
				console.log("LICENSE HERE:");
				console.log(n);
			}
			if (null != n){
				// this is default min pause to the next check:
				psnextcheck=psCurTimeStamp+57600;
				
				
				// read classes here!
				readServerClasses(n);
				
				
				if (n.result)
					replyResult=n.result;
				// с ответом все ок, считываем ответ
				if (n.result == "DB problems")
					psErrorRetrivingInfo(n.message);
				else if (n.result == "ERROR")
					psErrorRetrivingInfo(n.message);
				else if (n.result == "Invalid Code")
					psErrorRetrivingInfo(n.message);
				else if (n.result == "SENT")
					psErrorRetrivingInfo(n.message);
				else if ("OK" == n.result){ // ok! echo '{"result":"OK","message":"License verified.","exp":"'.strtotime($row['expire']).'","rCanc":"'.$row['renewCanceled'].'","typ":"'.$row['type'].'","dur":"'.$row['duration'].'","scr":"'.$row['script'].'"}';
					if (n.exp)
						psexp=parseInt(n.exp);
					if (n.message)
						psmessagelast=n.message;
					pserrorsQ=0;
					pserrorsConn=0;
					if (n.scr)
						psscr=n.scr;
					if (n.rCanc)
						psrenewCanc=parseInt(n.rCanc);
					if (n.typ)
						pstype=n.typ;
					if (n.dur)
						psdura=n.dur;
					psactive=1;
						
					
					if (n.em){
						psemailID=n.em;
						old_psemailID=psemailID;
					}
					if (n.psNotif1)
						psNotif1=parseInt(n.psNotif1);
					if (n.psNotif2)
						psNotif2=parseInt(n.psNotif2);
					
					// next validation in:
					if (psexp-psCurTimeStamp>1.21e+6){ // license expire in more than 2 weeks, so let's check in 2 weeks again! Cause he may request the refund!! So always at least once in 2 weeks!
						psnextcheck=psCurTimeStamp+86400; // changed to 1 day
					// if it already expired, check in 3h?!
					}else if (psCurTimeStamp>psexp){
						psnextcheck=psCurTimeStamp+10800;
					// if less than 2 weeks, then check 16h after the expire date
					}else{
						if (psrenewCanc==1)
							psnextcheck=psexp+600; // if user cancelled the expire, check 10 minutes after!
						else
							psnextcheck=psexp+57600;
					}
					//console.log("Current time="+psCurTimeStamp);
					//console.log("NEW2 psnextcheck="+psnextcheck);
					// save
					saveLicSettings();
					
					//console.log("next check will be in milisec = "+(psnextcheck-psCurTimeStamp+1)*1000);
					//_timeout2=setTimeout(function(){loadVarsAndCheckLic1();},(psnextcheck-psCurTimeStamp+1)*1000);
					if ((psnextcheck-psCurTimeStamp+1)/60>1 && (psnextcheck-psCurTimeStamp+1)/60<10000)
						api.alarms.create("VerifyL", { delayInMinutes: Math.ceil((psnextcheck-psCurTimeStamp+1)/60) });
					
				}else if ("NO" == n.result){ // expired echo '{"result":"NO","message":"License expired. You cancelled the subscription, you can purchase a new one on our site: <a href=\"https://www.invitelikecomment.com/en/\" target=\"_blank\">https://www.invitelikecomment.com/en/</a> OR contact us via email if you had any problem!","exp":"'.strtotime($row['expire']).'","typ":"'.$row['type'].'","dur":"'.$row['duration'].'","scr":"'.$row['script'].'","em":"'.$row['emailChrome'].'","psNotif1":"'.$row['sendEmailsRenew'].'","psNotif2":"'.$row['sendNews'].'","rCanc":"'.$row['renewCanceled'].'"}';
					if (pserrorsQ>22)
						psnextcheck=psCurTimeStamp+2.592e+6; // do not check for the next 1 month - DO NOT SET BIGGER NUMBER (big number so less probability this check happens at all.
					else
						psnextcheck=psCurTimeStamp+43200; // check again in 12h
					//console.log("NEW1 psnextcheck="+psnextcheck);
					pserrorsQ++;
					pserrorsConn=0;
					if (n.exp)
						psexp=parseInt(n.exp);
					if (n.message)
						psmessagelast=n.message;
					if (n.scr)
						psscr=n.scr;
					if (n.rCanc)
						psrenewCanc=parseInt(n.rCanc);
					if (n.typ)
						pstype=n.typ;
					if (n.dur)
						psdura=n.dur;
					psactive=0;
						
					if (n.em){
						psemailID=n.em;
						old_psemailID=psemailID;
					}
					if (n.psNotif1)
						psNotif1=parseInt(n.psNotif1);
					if (n.psNotif2)
						psNotif2=parseInt(n.psNotif2);
						
					// save
					saveLicSettings();
					
					//_timeout2=setTimeout(function(){loadVarsAndCheckLic1();},(psnextcheck-psCurTimeStamp+1)*1000);
					if ((psnextcheck-psCurTimeStamp+1)/60>1 && (psnextcheck-psCurTimeStamp+1)/60<10000)
						api.alarms.create("VerifyL", { delayInMinutes: Math.ceil((psnextcheck-psCurTimeStamp+1)/60) });
					
				}else if ("CNP" == n.result){ // Code not present echo '{"result":"CNP","message":"The code you have entered is not present on our DB. Please be sure you typed it correctly or contact us for help."}';
					psnextcheck=psCurTimeStamp+172800; // 2 days pause
					//console.log("NEW3 psnextcheck="+psnextcheck);
					pserrorsQ++;
					if (n.message)
						psmessagelast=n.message;
					if (pserrorsQ % 10 === 0)
						resLicB(); // reset license if it doesn't work anymore
					psactive=0;
					if (debugB)
						console.log("TTT1");
					// save
					saveLicSettings();
					
					//_timeout2=setTimeout(function(){loadVarsAndCheckLic1();},(psnextcheck-psCurTimeStamp+1)*1000);
					if ((psnextcheck-psCurTimeStamp+1)/60>1 && (psnextcheck-psCurTimeStamp+1)/60<10000)
						api.alarms.create("VerifyL", { delayInMinutes: Math.ceil((psnextcheck-psCurTimeStamp+1)/60) });
				}
				
				//if (show){
					// update the script window
					//psupdateFrameWithNewLicenseInfo();
				//}
			}else{
				psErrorRetrivingInfo("We were not able to connect to the server");
			}
			// send replies HERE to main script!
			//console.log("WE SENT REPLY");
			if (sendReply==1 && licVerifTabId!=0)
				api.tabs.sendMessage(licVerifTabId, {code:"getLicVarFromBackgroundEMAILrestoreOLD", result: replyResult, message: psmessagelast});
			else if (sendReply==2 && licVerifTabId!=0)
				api.tabs.sendMessage(licVerifTabId, {code:"getLicVarFromBackgroundOLD", psexp: psexp, psrenewCanc: psrenewCanc, pslicID: pslicID, psemailID: psemailID, psNotif1: psNotif1, psNotif2: psNotif2, psmessagelast: psmessagelast, psscr: psscr, pstype: pstype, psdura: psdura, psactive: psactive});
		})
		.catch(function () {
			console.log("Error connecting to web server. Please check your Internet connection and try again. (F1)")
		});
	}
	//return true;
}
function psErrorRetrivingInfo(_msg){
	// После 3 попыток, пауза сутки
	if (pserrorsQ==3)
		psnextcheck=parseInt(Math.floor(Date.now() / 1000))+86400;
	else{
		psnextcheck=parseInt(Math.floor(Date.now() / 1000))+1800;
	}
	psmessagelast=_msg;
	pserrorsConn++;
	pserrorsQ++;
	
	saveLicSettings();
}
function saveLicSettings(){
if (pslicID.indexOf('@')>0)
	pslicID="";
// save settings.
api.storage.sync.set({
	psnextcheck: psnextcheck,
	psexp: psexp,
	psrenewCanc: psrenewCanc,
	pslicID: pslicID,
	psemailID: psemailID,
	psNotif1: psNotif1,
	psNotif2: psNotif2,
	psmessagelast: psmessagelast,
	pserrorsQ: pserrorsQ,
	pserrorsConn: pserrorsConn,
	psscr: psscr,
	pstype: pstype,
	psdura: psdura,
	psactive: psactive
	}, function() {
		// do nothing, just save.
		//console.log("SAVED errors:"+pserrorsQ);
});
}