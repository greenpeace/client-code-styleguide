/**!
 * Main application javascript
 * Initialise all necessary plugins here
 *
 * @param {object} $ jQuery
 * @param {object} M Modernizr
 * @param {object} w window
 * @returns {undefined}
 */
/* globals jQuery, Modernizr */
(function($, M, w, undef) {
    'use strict';

    // GET parameters to send with each request
    var parameters = {
            action: 685
//            page: 300507, // ID of the current page
//            key: '78d245e17c455859b4863ad34674f2b8', // API access key - tied to the referring domain
//            expire: '2013-11-02'
        },
        // API URL Demonstration showing parameters passed in the URL
        pledgeURL = 'http://greenpeace.relephant.nl/international/en/api/v2/pledges/',
        pledgeTesting = 'json/pledges.json?fish=salmon',
        pledgeLive = 'https://secured.greenpeace.org/international/en/api/v2/pledges/',
        pledgeLiveLocal = 'json/pledges_live_685.json',
        // API URL to test if user can submit form using only email
        signerCheckURL = 'http://greenpeace.relephant.nl/international/en/api/v2/pledges/signercheck/',
        signerCheckTesting = 'json/signer_error_fields.json',
        signerCheckLive = 'https://secured.greenpeace.org/international/en/api/v2/pledges/signercheck/',
        // API URL for form validation rules
        validationURL = 'http://greenpeace.relephant.nl/international/en/api/v2/pledges/validation/',
        validationTesting = 'json/rules_revised.json',
        validationLive = 'https://secured.greenpeace.org/international/en/api/v2/pledges/validation/';

    $.ajaxSetup({cache: false});


    $(document).ready(function() {

        // Track form abandonment
        $.p3.form_tracking('.js-track-abandonment');

        // Focus the email field for easier form entry
        $('input[name=email]').focus();

        // Fill input fields from GET parameters
        $.p3.autofill('#action-form');

        // Animate pledge counter
        $.p3.pledge_counter('#action-counter', {
            jsonURL: pledgeLive,
            params: parameters
        });

        // Only call validation plugin if you aren't using pledge_with_email,
        // or you've set pledge_with_email to not use validation
        $.p3.validation('#action-form', {
            jsonURL: validationLive,
            params: parameters
        });

        // Recent signers widget
        $.p3.recent_signers('#action-recent-signers', {
            jsonURL: pledgeLive,
            params: parameters
        });

    });

}(jQuery, Modernizr, this));
