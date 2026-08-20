// Open-source build: license validation, trial checks and all phone-home to
// the vendor server have been removed. Tab orchestration and content-script
// injection logic are unchanged.
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
						? 	api.scripting.executeScript({
								target: {tabId: i.id},
								files: ['jquery-3.5.1.min.js','sendkeys.js','contentscript.js']
							})
						: console.log("double trigger ignored 2!"),
					(scriptLastCall = parseInt(Math.floor(Date.now()))));
		});
});




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
				});
			
			api.tabs.sendMessage(_maintab, {type: 'WeAreScanningInSeparateTabNOW', _tab: _secondtab});
		}
	}
});



// When installed or updated, point the user to the options page (open-source build)
api.runtime.onInstalled.addListener(function(){
	api.tabs.create({url: api.runtime.getURL("options.html")});
});
