var api = typeof chrome!="undefined" ? chrome : browser;
var maxPages=200;



// code and decode links to use less space
var _ret="";
function urlCode(_l){
_ret=_l.trim();
if (_ret.indexOf('https://business.facebook.com/')>-1)
	_ret=_ret.replace('https://business.facebook.com/','|bf|');
if (_ret.indexOf('http://business.facebook.com/')>-1)
	_ret=_ret.replace('http://business.facebook.com/','|bf|');
if (_ret.indexOf('https://www.facebook.com/')>-1)
	_ret=_ret.replace('https://www.facebook.com/','|f|');
if (_ret.indexOf('http://www.facebook.com/')>-1)
	_ret=_ret.replace('http://www.facebook.com/','|f|');
return _ret;
}
function urlDeCode(_l){
_ret=_l;
if (_ret.indexOf('|bf|')>-1)
	_ret=_ret.replace('|bf|','https://business.facebook.com/');
if (_ret.indexOf('|f|')>-1)
	_ret=_ret.replace('|f|','https://www.facebook.com/');
return _ret;
}

function checkSpintaxFormatOk(){
// check every text
var ret=1;


return ret;
}


function showHideImgInfo1(){
	if(document.getElementById('img-select').style.display=='block'){
		document.getElementById('img-select').style.display='none';}
	else{
		document.getElementById('img-select').style.display = 'block';
	}
}

// Saves options to api.storage
function save_options() {
var p1_1 = Number(document.getElementById('p1_1').value);
var p1_2 = Number(document.getElementById('p1_2').value);
var p2_1 = Number(document.getElementById('p1_1').value);
var p2_2 = Number(document.getElementById('p1_2').value);
var fb_timeout_1 = document.getElementsByName("fb_timeout_1")[0].value;
var fb_timeout_2 = document.getElementsByName("fb_timeout_2")[0].value;
var fb_timeout_3 = document.getElementsByName("fb_timeout_3")[0].value;
var fb_timeout_4 = document.getElementsByName("fb_timeout_4")[0].value;
var fb_timeout_5 = document.getElementsByName("fb_timeout_5")[0].value;
var fb_timeout_6 = document.getElementsByName("fb_timeout_6")[0].value;
var additional_script_pause = document.getElementById('additional_script_pause').checked;
var check_post_first = true; //document.getElementById('check_post_first').checked;
var skip_angry_emotion = document.getElementById('skip_angry_emotion').checked;
var like_other_pages = document.getElementById('like_other_pages').checked;
var skip_haha_emotion = document.getElementById('skip_haha_emotion').checked;
var skip_sad_emotion = document.getElementById('skip_sad_emotion').checked;
var skip_like_emotion = document.getElementById('skip_like_emotion').checked;
var skip_love_emotion = document.getElementById('skip_love_emotion').checked;
var skip_wow_emotion = document.getElementById('skip_wow_emotion').checked;
var scan_reactions_tabs = document.getElementById('scan_reactions_tabs').checked;
var scan_reactions_tabs_more1 = document.getElementById('scan_reactions_tabs_more1').checked;
var scan_current_tab_business_suite = document.getElementById('scan_current_tab_business_suite').checked;
var fb_limit = document.getElementsByName("fb_limit")[0].value;
var fb_limit_multi = document.getElementsByName("fb_limit_multi")[0].value;
var fb_limit_show_more_btn = document.getElementsByName("fb_limit_show_more_btn")[0].value;
var fb_limit_show_more_btn_add_sec = document.getElementsByName("fb_limit_show_more_btn_add_sec")[0].value;
if (fb_limit_show_more_btn_add_sec>300)
	fb_limit_show_more_btn_add_sec=15;
var skip_post_setting = document.getElementsByName("skip_post_setting")[0].value;
var share_put_likes = document.getElementById('share_put_likes').checked;
var skip_Invite = document.getElementById('skip_Invite').checked;
var share_likes_limit = document.getElementsByName("share_likes_limit")[0].value;
var friends_skip_nr = document.getElementsByName("friends_skip_nr")[0].value;
var scroll_before_inv_nr = document.getElementsByName("scroll_before_inv_nr")[0].value;
var stop_on_captcha_shown = document.getElementById('stop_on_captcha_shown').checked;
var loop_PostsList = document.getElementsByName("loop_PostsList")[0].value;
var loop_Pause = document.getElementsByName("loop_Pause")[0].value;
var normal_run_limitposts = document.getElementsByName("normal_run_limitposts")[0].value;
var normal_run_limitNoInvGoNextPage = document.getElementsByName("normal_run_limitNoInvGoNextPage")[0].value;
var notloadtoomuch = true; //document.getElementById('notloadtoomuch').checked;
var try_after_limit = document.getElementById('try_after_limit').checked;
var pauseAfterLimit = document.getElementById('pauseAfterLimit').checked;
var pauseAfterLimit2 = document.getElementsByName("pauseAfterLimit2")[0].value;
var pauseAfterLimit3 = document.getElementsByName("pauseAfterLimit3")[0].value;
var multi_notif_page = document.getElementById('multi_notif_page').checked;
var multi_random_order = document.getElementById('multi_random_order').checked;


var accept_ashii_names_only = document.getElementById('accept_ashii_names_only').checked;
var skip_no_profile_image = document.getElementById('skip_no_profile_image').checked;
var slow_internet = document.getElementById('slow_internet').checked;
var debug_option = document.getElementById('debug_option').checked;
var notif_other_tab = document.getElementById('notif_other_tab').checked;

var name_comm_filter1 = document.getElementsByName("name_comm_filter1")[0].value;

var ok=checkSpintaxFormatOk();
var status1 = document.getElementById('status1');
status1.textContent = '';


var status = document.getElementById('status');


// save url
var lines1 = document.getElementById('urllist1').value.split(/\n/);
var urllist1 = Array();
for (var i=0; i < lines1.length; i++) {
	// only push this line if it contains a non whitespace character.
	if (lines1[i].length>5) {
		if (lines1[i].indexOf("publishing_tools")>-1 && lines1[i].indexOf("ref=page_publishing_tools")==-1){
			lines1[i]=lines1[i].substring(0, lines1[i].indexOf("publishing_tools"));
		}else if (lines1[i].indexOf('?')>0 && lines1[i].indexOf('powereditor/pages?section')==-1 && lines1[i].indexOf('/creatorstudio')==-1 && lines1[i].indexOf('/events/')==-1 && lines1[i].indexOf('/watch/')==-1 && lines1[i].indexOf('album_id=')==-1 && lines1[i].indexOf('adsmanager/pages')==-1 && lines1[i].indexOf('/content_management')==-1 && lines1[i].indexOf('dco_ad_id=')==-1 && lines1[i].indexOf('/latest/posts')==-1 && lines1[i].indexOf('/latest/inbox')==-1 && lines1[i].indexOf('/latest/insights')==-1 && lines1[i].indexOf('/photo/')==-1 && lines1[i].indexOf('/latest/ad_center')==-1 && lines1[i].indexOf('permalink')==-1) // && lines1[i].indexOf('/events/')==-1 && lines1[i].indexOf('/watch/')==-1 -> было бы круто, НО, фб обрезает все параметры с ссылки
			lines1[i]=lines1[i].substring(0, lines1[i].indexOf("?"));
		if (lines1[i].indexOf("facebook.com")>-1 || lines1[i].indexOf("f|")>-1)
			urllist1.push(urlCode(lines1[i]));
		else
			alert('Error in line: ' + lines1[i] + '. It works only with facebook.com links');
	}
}
var lines2 = document.getElementById('urllist2').value.split(/\n/);
var urllist2 = Array();
for (var i=0; i < lines2.length; i++) {
	// only push this line if it contains a non whitespace character.
	if (lines2[i].length>5) {
		if (lines2[i].indexOf("publishing_tools")>-1 && lines2[i].indexOf("ref=page_publishing_tools")==-1){
			lines2[i]=lines2[i].substring(0, lines2[i].indexOf("publishing_tools"));
		}else if (lines2[i].indexOf('?')>0 && lines2[i].indexOf('powereditor/pages?section')==-1 && lines2[i].indexOf('/creatorstudio')==-1 && lines2[i].indexOf('/events/')==-1 && lines2[i].indexOf('album_id=')==-1 && lines2[i].indexOf('/watch/')==-1 && lines2[i].indexOf('adsmanager/pages')==-1 && lines2[i].indexOf('/content_management')==-1 && lines2[i].indexOf('dco_ad_id=')==-1 && lines2[i].indexOf('/latest/posts')==-1 && lines2[i].indexOf('/latest/inbox')==-1 && lines2[i].indexOf('/latest/insights')==-1 && lines2[i].indexOf('/photo/')==-1 && lines2[i].indexOf('/latest/ad_center')==-1 && lines2[i].indexOf('permalink')==-1)
			lines2[i]=lines2[i].substring(0, lines2[i].indexOf("?"));
		if (lines2[i].indexOf("facebook.com")>-1 || lines2[i].indexOf("f|")>-1)
			urllist2.push(urlCode(lines2[i]));
		else
			alert('Error in line: ' + lines2[i] + '. It works only with facebook.com links');
	}
}
if (urllist1.length>maxPages)
	urllist1.length=maxPages;
if (urllist2.length>maxPages)
	urllist2.length=maxPages;
//console.log(urllist1.length);

if (ok==1){

if (p1_1<1.5)
	alert("Advice: set the minimum timeout to 2 sec (or higher), otherwise fb can disable this feature for a day.");

  api.storage.sync.set({
    p1_1: p1_1,
    p1_2: p1_2,
    p2_1: p2_1,
    p2_2: p2_2,
	fb_timeout_1: fb_timeout_1,
	fb_timeout_2: fb_timeout_2,
	fb_timeout_3: fb_timeout_3,
	fb_timeout_4: fb_timeout_4,
	fb_timeout_5: fb_timeout_5,
	fb_timeout_6: fb_timeout_6,
	additional_script_pause: additional_script_pause,
	check_post_first: check_post_first,
	skip_angry_emotion: skip_angry_emotion,
	like_other_pages: like_other_pages,
	skip_haha_emotion: skip_haha_emotion,
	skip_sad_emotion: skip_sad_emotion,
	skip_like_emotion: skip_like_emotion,
	skip_love_emotion: skip_love_emotion,
	skip_wow_emotion: skip_wow_emotion,
	scan_reactions_tabs: scan_reactions_tabs,
	scan_reactions_tabs_more1: scan_reactions_tabs_more1,
	scan_current_tab_business_suite: scan_current_tab_business_suite,
	fb_limit : fb_limit,
	fb_limit_multi : fb_limit_multi,
	fb_limit_show_more_btn : fb_limit_show_more_btn,
	fb_limit_show_more_btn_add_sec : fb_limit_show_more_btn_add_sec,
	skip_post_setting : skip_post_setting,
	share_put_likes : share_put_likes,
	skip_Invite : skip_Invite,
	share_likes_limit : share_likes_limit,
	friends_skip_nr : friends_skip_nr,
	scroll_before_inv_nr : scroll_before_inv_nr,
	stop_on_captcha_shown : stop_on_captcha_shown,
	loop_PostsList : loop_PostsList,
	loop_Pause : loop_Pause,
	normal_run_limitposts : normal_run_limitposts,
	normal_run_limitNoInvGoNextPage : normal_run_limitNoInvGoNextPage,
	notloadtoomuch : notloadtoomuch,
	urllist1 : urllist1,
	urllist2 : urllist2,
	try_after_limit: try_after_limit,
	pauseAfterLimit: pauseAfterLimit,
	pauseAfterLimit2: pauseAfterLimit2,
	pauseAfterLimit3: pauseAfterLimit3,
	multi_notif_page: multi_notif_page,
	multi_random_order: multi_random_order,
	name_comm_filter1: name_comm_filter1,
	accept_ashii_names_only: accept_ashii_names_only,
	skip_no_profile_image: skip_no_profile_image,
	slow_internet: slow_internet,
	debug_option: debug_option,
	notif_other_tab: notif_other_tab
  }, function() {
    // Update status to let user know options were saved.
	var error = api.runtime.lastError;
	//console.log(error);
	//console.log(urllist1.length);
	if (error && error.message && maxPages>20 && (urllist1.length>20 || urllist2.length>20)){
		if (maxPages==200)
			alert(error.message+". You have too many pages, we will trim the list a little. We can save 8192 symbols due to browser limitation.");
		maxPages=maxPages-5;
		save_options();
	}else{
		var status = document.getElementById('status');
		status.style.display = 'block';
		setTimeout(function() {
		  status.style.display = 'none';
		}, 4750);
	}
  });

// restore url to show what happens
if (urllist1.length>0){
	document.getElementsByName('urllist1')[0].value="";
	urllist1.forEach(function (item) {
	  document.getElementsByName('urllist1')[0].value=document.getElementsByName('urllist1')[0].value + urlDeCode(item) + "\n"
	})
}
if (urllist2.length>0){
	document.getElementsByName('urllist2')[0].value="";
	urllist2.forEach(function (item) {
	  document.getElementsByName('urllist2')[0].value=document.getElementsByName('urllist2')[0].value + urlDeCode(item) + "\n"
	})
}

}

}

// Restores select box and checkbox state using the preferences
// stored in api.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  api.storage.sync.get({
    p1_1: 2,
    p1_2: 4,
    p2_1: 1.5,
    p2_2: 3,
	fb_timeout_1: 5000,
	fb_timeout_2: 2000,
	fb_timeout_3: 1500,
	fb_timeout_4: 7000,
	fb_timeout_5: 10000,
	fb_timeout_6: 15000,
	additional_script_pause: true,
	check_post_first: true,
	skip_angry_emotion: false,
	like_other_pages: false,
	skip_haha_emotion: false,
	skip_like_emotion: false,
	skip_love_emotion: false,
	skip_wow_emotion: false,
	scan_reactions_tabs: false,
	scan_reactions_tabs_more1: true,
	scan_current_tab_business_suite: true,
	skip_sad_emotion: false,
	fb_limit : 490,
	fb_limit_multi : 490,
	fb_limit_show_more_btn : 199,
	fb_limit_show_more_btn_add_sec : 0,
	skip_post_setting : 0,
	share_put_likes : false,
	skip_Invite : false,
	share_likes_limit: 300,
	friends_skip_nr: 0,
	scroll_before_inv_nr: 0,
	stop_on_captcha_shown : true,
	loop_PostsList : "1,2,3,4,5",
	loop_Pause : 5,
	normal_run_limitposts : 100,
	normal_run_limitNoInvGoNextPage : 100,
	notloadtoomuch: true,
	urllist1: new Array(),
	urllist2: new Array(),
	try_after_limit: false,
	pauseAfterLimit: false,
	pauseAfterLimit2: 180,
	pauseAfterLimit3: 50,
	multi_notif_page: false,
	multi_random_order: false,
	name_comm_filter1: "",
	accept_ashii_names_only: false,
	skip_no_profile_image: false,
	slow_internet: false,
	debug_option: false,
	notif_other_tab: false
  }, function(items) {
    document.getElementById('p1_1').value = items.p1_1;
    document.getElementById('p1_2').value = items.p1_2;
    document.getElementsByName('fb_timeout_1')[0].value = items.fb_timeout_1;
    document.getElementsByName('fb_timeout_2')[0].value = items.fb_timeout_2;
    document.getElementsByName('fb_timeout_3')[0].value = items.fb_timeout_3;
    document.getElementsByName('fb_timeout_4')[0].value = items.fb_timeout_4;
    document.getElementsByName('fb_timeout_5')[0].value = items.fb_timeout_5;
    document.getElementsByName('fb_timeout_6')[0].value = items.fb_timeout_6;
	document.getElementById('additional_script_pause').checked = items.additional_script_pause;
	//document.getElementById('check_post_first').checked = items.check_post_first;
	document.getElementById('skip_angry_emotion').checked = items.skip_angry_emotion;
	document.getElementById('like_other_pages').checked = items.like_other_pages;
	document.getElementById('skip_haha_emotion').checked = items.skip_haha_emotion;
	document.getElementById('skip_sad_emotion').checked = items.skip_sad_emotion;
	document.getElementById('skip_like_emotion').checked = items.skip_like_emotion;
	document.getElementById('skip_love_emotion').checked = items.skip_love_emotion;
	document.getElementById('skip_wow_emotion').checked = items.skip_wow_emotion;
	document.getElementById('scan_reactions_tabs').checked = items.scan_reactions_tabs;
	document.getElementById('scan_reactions_tabs_more1').checked = items.scan_reactions_tabs_more1;
	document.getElementById('scan_current_tab_business_suite').checked = items.scan_current_tab_business_suite;
	document.getElementsByName('fb_limit')[0].value = items.fb_limit;
	document.getElementsByName('fb_limit_multi')[0].value = items.fb_limit_multi;
	document.getElementsByName('fb_limit_show_more_btn')[0].value = items.fb_limit_show_more_btn;
	document.getElementsByName('fb_limit_show_more_btn_add_sec')[0].value = items.fb_limit_show_more_btn_add_sec;
	document.getElementsByName('skip_post_setting')[0].value = items.skip_post_setting;
	document.getElementById('share_put_likes').checked = items.share_put_likes;
	document.getElementById('skip_Invite').checked = items.skip_Invite;
	document.getElementsByName('share_likes_limit')[0].value = items.share_likes_limit;
	document.getElementsByName('friends_skip_nr')[0].value = items.friends_skip_nr;
	document.getElementsByName('scroll_before_inv_nr')[0].value = items.scroll_before_inv_nr;
	document.getElementById('stop_on_captcha_shown').checked = items.stop_on_captcha_shown;
	document.getElementsByName('loop_PostsList')[0].value = items.loop_PostsList;
	document.getElementsByName('loop_Pause')[0].value = items.loop_Pause;
	document.getElementsByName('normal_run_limitposts')[0].value = items.normal_run_limitposts;
	document.getElementsByName('normal_run_limitNoInvGoNextPage')[0].value = items.normal_run_limitNoInvGoNextPage;
	//document.getElementById('notloadtoomuch').checked = items.notloadtoomuch;
	document.getElementById('try_after_limit').checked = items.try_after_limit;
	document.getElementById('pauseAfterLimit').checked = items.pauseAfterLimit;
	document.getElementsByName('pauseAfterLimit2')[0].value = items.pauseAfterLimit2;
	document.getElementsByName('pauseAfterLimit3')[0].value = items.pauseAfterLimit3;
	document.getElementById('multi_notif_page').checked = items.multi_notif_page;
	document.getElementById('multi_random_order').checked = items.multi_random_order;
	document.getElementById('skip_no_profile_image').checked = items.skip_no_profile_image;
	document.getElementById('slow_internet').checked = items.slow_internet;
	document.getElementById('debug_option').checked = items.debug_option;
	document.getElementById('notif_other_tab').checked = items.notif_other_tab;
	document.getElementById('accept_ashii_names_only').checked = items.accept_ashii_names_only;
	document.getElementsByName('name_comm_filter1')[0].value = items.name_comm_filter1;
	if (items.urllist1.length>0){
		document.getElementsByName('urllist1')[0].value="";
		items.urllist1.forEach(function (item) {
		  document.getElementsByName('urllist1')[0].value=document.getElementsByName('urllist1')[0].value + urlDeCode(item) + "\n"
		})
	}
	if (items.urllist2.length>0){
		document.getElementsByName('urllist2')[0].value="";
		items.urllist2.forEach(function (item) {
		  document.getElementsByName('urllist2')[0].value=document.getElementsByName('urllist2')[0].value + urlDeCode(item) + "\n"
		})
	}
  });
}

function reset_options(){
    document.getElementById('p1_1').value = "2";
    document.getElementById('p1_2').value = "4";
    document.getElementsByName('fb_timeout_1')[0].value = 4000;
    document.getElementsByName('fb_timeout_2')[0].value = 2000;
    document.getElementsByName('fb_timeout_3')[0].value = 1500;
    document.getElementsByName('fb_timeout_4')[0].value = 7000;
    document.getElementsByName('fb_timeout_5')[0].value = 10000;
    document.getElementsByName('fb_timeout_6')[0].value = 15000;
	document.getElementById('additional_script_pause').checked = true;
	//document.getElementById('check_post_first').checked = true;
	document.getElementById('skip_angry_emotion').checked = false;
	document.getElementById('like_other_pages').checked = false;
	document.getElementById('skip_haha_emotion').checked = false;
	document.getElementById('skip_like_emotion').checked = false;
	document.getElementById('skip_love_emotion').checked = false;
	document.getElementById('skip_wow_emotion').checked = false;
	document.getElementById('scan_reactions_tabs').checked = false;
	document.getElementById('scan_reactions_tabs_more1').checked = true;
	document.getElementById('scan_current_tab_business_suite').checked = true;
	document.getElementById('skip_sad_emotion').checked = false;
    document.getElementsByName('fb_limit')[0].value = 490;
    document.getElementsByName('fb_limit_multi')[0].value = 490;
    document.getElementsByName('fb_limit_show_more_btn')[0].value = 199;
    document.getElementsByName('fb_limit_show_more_btn_add_sec')[0].value = 0;
    document.getElementsByName('skip_post_setting')[0].value = 0;
	document.getElementById('share_put_likes').checked = false;
	document.getElementById('skip_Invite').checked = false;
    document.getElementsByName('share_likes_limit')[0].value = 300;
    document.getElementsByName('friends_skip_nr')[0].value = 0;
    document.getElementsByName('scroll_before_inv_nr')[0].value = 0;
	document.getElementById('stop_on_captcha_shown').checked = true;
    document.getElementsByName('loop_PostsList')[0].value = "1,2,3,4,5";
    document.getElementsByName('loop_Pause')[0].value = 5;
    document.getElementsByName('normal_run_limitposts')[0].value = 100;
    document.getElementsByName('normal_run_limitNoInvGoNextPage')[0].value = 100;
    document.getElementsByName('urllist1')[0].value = "";
    document.getElementsByName('urllist2')[0].value = "";
	document.getElementById('try_after_limit').checked = false;
	document.getElementById('pauseAfterLimit').checked = false;
    document.getElementsByName('pauseAfterLimit2')[0].value = 180;
	document.getElementsByName('pauseAfterLimit3')[0].value = 50;
	document.getElementById('multi_notif_page').checked = false;
	document.getElementById('multi_random_order').checked = false;
	document.getElementById('skip_no_profile_image').checked = false;
	document.getElementById('slow_internet').checked = false;
	document.getElementById('debug_option').checked = false;
	document.getElementById('notif_other_tab').checked = false;
	document.getElementById('accept_ashii_names_only').checked = false;
    document.getElementsByName('name_comm_filter1')[0].value = "";
	//document.getElementById('notloadtoomuch').checked = true;
	
save_options();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('reset').addEventListener('click',
    reset_options);
document.getElementById('imgInfoShow1').addEventListener('click',
    showHideImgInfo1);

function codeAddress() {
if (window.location.href.indexOf('?save=1')>0){
setTimeout(save_options, 100);
var cleanUrl=window.location.href;
cleanUrl=cleanUrl.replace("?save=1","");
window.history.replaceState("", document.title, cleanUrl);
}

}
window.onload = codeAddress;