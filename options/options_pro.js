var api = typeof chrome!="undefined" ? chrome : browser;
// Saves options to api.storage
function showHideImgInfo1(){
	if(document.getElementById('img-select').style.display=='block'){
		document.getElementById('img-select').style.display='none';}
	else{
		document.getElementById('img-select').style.display = 'block';
	}
}

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
var skip_haha_emotion = document.getElementById('skip_haha_emotion').checked;
var skip_sad_emotion = document.getElementById('skip_sad_emotion').checked;
var skip_like_emotion = document.getElementById('skip_like_emotion').checked;
var skip_love_emotion = document.getElementById('skip_love_emotion').checked;
var skip_wow_emotion = document.getElementById('skip_wow_emotion').checked;
var scan_reactions_tabs = document.getElementById('scan_reactions_tabs').checked;
var scan_reactions_tabs_more1 = document.getElementById('scan_reactions_tabs_more1').checked;
var scan_current_tab_business_suite = document.getElementById('scan_current_tab_business_suite').checked;
var fb_limit = document.getElementsByName("fb_limit")[0].value;
var fb_limit_show_more_btn = document.getElementsByName("fb_limit_show_more_btn")[0].value;
var fb_limit_show_more_btn_add_sec = document.getElementsByName("fb_limit_show_more_btn_add_sec")[0].value;
if (fb_limit_show_more_btn_add_sec>300)
	fb_limit_show_more_btn_add_sec=15;
var skip_post_setting = document.getElementsByName("skip_post_setting")[0].value;
var share_put_likes = document.getElementById('share_put_likes').checked;
var skip_Invite = document.getElementById('skip_Invite').checked;
var notif_other_tab = document.getElementById('notif_other_tab').checked;
var share_likes_limit = document.getElementsByName("share_likes_limit")[0].value;
var friends_skip_nr = document.getElementsByName("friends_skip_nr")[0].value;
var scroll_before_inv_nr = document.getElementsByName("scroll_before_inv_nr")[0].value;
var stop_on_captcha_shown = document.getElementById('stop_on_captcha_shown').checked;

var slow_internet = document.getElementById('slow_internet').checked;
var debug_option = document.getElementById('debug_option').checked;

var ok=1;
var status1 = document.getElementById('status1');
status1.textContent = '';




var status = document.getElementById('status');

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
	skip_haha_emotion: skip_haha_emotion,
	skip_sad_emotion: skip_sad_emotion,
	skip_like_emotion: skip_like_emotion,
	skip_love_emotion: skip_love_emotion,
	skip_wow_emotion: skip_wow_emotion,
	scan_reactions_tabs: scan_reactions_tabs,
	scan_reactions_tabs_more1: scan_reactions_tabs_more1,
	scan_current_tab_business_suite: scan_current_tab_business_suite,
	fb_limit : fb_limit,
	fb_limit_show_more_btn : fb_limit_show_more_btn,
	fb_limit_show_more_btn_add_sec : fb_limit_show_more_btn_add_sec,
	skip_post_setting : skip_post_setting,
	share_put_likes : share_put_likes,
	skip_Invite : skip_Invite,
	notif_other_tab: notif_other_tab,
	share_likes_limit : share_likes_limit,
	friends_skip_nr : friends_skip_nr,
	scroll_before_inv_nr : scroll_before_inv_nr,
	stop_on_captcha_shown : stop_on_captcha_shown,
	slow_internet: slow_internet,
	debug_option: debug_option
  }, function() {
    // Update status to let user know options were saved.
	var status = document.getElementById('status');
	status.style.display = 'block';
	setTimeout(function() {
	  status.style.display = 'none';
	}, 4750);

  });
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
	skip_haha_emotion: false,
	skip_like_emotion: false,
	skip_love_emotion: false,
	skip_wow_emotion: false,
	scan_reactions_tabs: false,
	scan_reactions_tabs_more1: true,
	scan_current_tab_business_suite: true,
	skip_sad_emotion: false,
	fb_limit : 490,
	fb_limit_show_more_btn : 199,
	fb_limit_show_more_btn_add_sec : 0,
	skip_post_setting : 0,
	share_put_likes : false,
	skip_Invite : false,
	notif_other_tab: false,
	share_likes_limit: 150,
	friends_skip_nr: 0,
	scroll_before_inv_nr: 0,
	stop_on_captcha_shown : true,
	slow_internet: false,
	debug_option: false
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
	document.getElementById('skip_haha_emotion').checked = items.skip_haha_emotion;
	document.getElementById('skip_sad_emotion').checked = items.skip_sad_emotion;
	document.getElementById('skip_like_emotion').checked = items.skip_like_emotion;
	document.getElementById('skip_love_emotion').checked = items.skip_love_emotion;
	document.getElementById('skip_wow_emotion').checked = items.skip_wow_emotion;
	document.getElementById('scan_reactions_tabs').checked = items.scan_reactions_tabs;
	document.getElementById('scan_reactions_tabs_more1').checked = items.scan_reactions_tabs_more1;
	document.getElementById('scan_current_tab_business_suite').checked = items.scan_current_tab_business_suite;
	document.getElementsByName('fb_limit')[0].value = items.fb_limit;
	document.getElementsByName('fb_limit_show_more_btn')[0].value = items.fb_limit_show_more_btn;
	document.getElementsByName('fb_limit_show_more_btn_add_sec')[0].value = items.fb_limit_show_more_btn_add_sec;
	document.getElementsByName('skip_post_setting')[0].value = items.skip_post_setting;
	document.getElementById('share_put_likes').checked = items.share_put_likes;
	document.getElementById('skip_Invite').checked = items.skip_Invite;
	document.getElementById('notif_other_tab').checked = items.notif_other_tab;
	document.getElementById('slow_internet').checked = items.slow_internet;
	document.getElementById('debug_option').checked = items.debug_option;
	document.getElementsByName('share_likes_limit')[0].value = items.share_likes_limit;
	document.getElementsByName('friends_skip_nr')[0].value = items.friends_skip_nr;
	document.getElementsByName('scroll_before_inv_nr')[0].value = items.scroll_before_inv_nr;
	document.getElementById('stop_on_captcha_shown').checked = items.stop_on_captcha_shown;
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
	document.getElementById('skip_haha_emotion').checked = false;
	document.getElementById('skip_like_emotion').checked = false;
	document.getElementById('skip_love_emotion').checked = false;
	document.getElementById('skip_wow_emotion').checked = false;
	document.getElementById('scan_reactions_tabs').checked = false;
	document.getElementById('scan_reactions_tabs_more1').checked = true;
	document.getElementById('scan_current_tab_business_suite').checked = true;
	document.getElementById('skip_sad_emotion').checked = false;
    document.getElementsByName('fb_limit')[0].value = 490;
    document.getElementsByName('fb_limit_show_more_btn')[0].value = 199;
    document.getElementsByName('fb_limit_show_more_btn_add_sec')[0].value = 0;
    document.getElementsByName('skip_post_setting')[0].value = 0;
	document.getElementById('share_put_likes').checked = false;
	document.getElementById('skip_Invite').checked = false;
	document.getElementById('notif_other_tab').checked = false;
    document.getElementsByName('share_likes_limit')[0].value = 150;
    document.getElementsByName('friends_skip_nr')[0].value = 0;
    document.getElementsByName('scroll_before_inv_nr')[0].value = 0;
	document.getElementById('stop_on_captcha_shown').checked = true;
	document.getElementById('slow_internet').checked = false;
	document.getElementById('debug_option').checked = false;
	
save_options();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('reset').addEventListener('click',
    reset_options);
document.getElementById('imgInfoShow1').addEventListener('click',
    showHideImgInfo1);