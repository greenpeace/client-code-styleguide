/**
 * @name		p3-styleguide
 * @version		v0.3.0
<<<<<<< HEAD
 * @date		2014-02-24
=======
 * @date		2014-02-27
>>>>>>> kss
 * @copyright	Copyright 2013, Greenpeace International
 * @source		https://github.com/greenpeace/p3_styleguide
 * @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later */
!function(a,b,c){"use strict";var d={page:300507,key:"78d245e17c455859b4863ad34674f2b8",expire:"2013-11-02"},e="https://secured.greenpeace.org/international/en/api/v2/pledges/";a.ajaxSetup({cache:!1}),a(document).ready(function(){a("html").addClass((b.input.placeholder?"":"no-")+"placeholder"),b.mq("only all")||a.p3.narrow(),a.p3.form_tracking(".js-track-abandonment"),a("input[name=email]").focus(),a.p3.remember_me_cookie("#action-form"),a.p3.autofill("#action-form"),a.p3.pledge_counter("#action-counter",{jsonURL:e,params:d}),a.p3.social_sharing("#action-social-share",{jsonURL:"json/social_simple.json",networks:{twitter:{title:c.document.title},pinterest:{image:"http://www.greenpeace.org/international/Global/international/artwork/other/2010/openspace/bigspace-photo.jpg",description:c.document.title}}}),a.p3.recent_signers("#action-recent-signers",{jsonURL:e,params:d})})}(jQuery,Modernizr,this);
// @license-end