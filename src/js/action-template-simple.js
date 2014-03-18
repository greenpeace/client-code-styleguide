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
(function($, global) {
    'use strict';

    // GET parameters to send with each request
    var petition = {
            test: {
                parameters: {
                    page: 404454,
                    action: 912
//                    expire: '2013-11-02'
                },
                actions: {
                    pledges: 'http://www.greenpeace.org/international/en/Testing/gpi-api-test/',
                    signerCheck: 'http://www.greenpeace.org/international/en/Testing/gpi-api-test/signercheck/',
                    validation: 'http://www.greenpeace.org/international/en/Testing/gpi-api-test/validation/'
                }
            },
            relephant: {
                url: 'http://greenpeace.relephant.nl/international/en/api/v2/pledges/',
                parameters: {
                    page: 300507,
                    key: '78d245e17c455859b4863ad34674f2b8' // API access key - tied to the referring domain
                }
            },
            live: {
                parameters: {
                    action: 685
                },
                actions: {
                    pledges: 'https://secured.greenpeace.org/international/en/api/v2/pledges/',
                    signerCheck: 'https://secured.greenpeace.org/international/en/api/v2/pledges/signercheck/',
                    validation: 'https://secured.greenpeace.org/international/en/api/v2/pledges/validation/'
                }
            },
            localPledge: {
                url: 'json/pledges.json?fish=salmon'
            },
            localValidation: {
                url: 'json/rules_revised.json'
            },
            localSigner: {
                url: {
                    success: 'signer_success.json',
                    errorFields: 'json/signer_error_fields.json',
                    errorPledge: 'json/signer_error_pledge.json'
                }
            },
            localSocial: {
                url: {
                    simple: 'json/social_simple.json',
                    full: 'json/social_full_response.json'
                }
            }
        };

    $.ajaxSetup({cache: false});


    $(global.document).ready(function() {

        // Track form abandonment
        $.p3.form_tracking('.js-track-abandonment');

        // Focus the email field for easier form entry
        $('input[name=email]').focus();

        // Fill input fields from GET parameters
        $.p3.autofill('#action-form');

        // Animate pledge counter
        // Note that no parameters are required if you intend to trigger updates
        // from events in a different fetch, eg p3.recent_signers
        $.p3.pledge_counter('#action-counter');

        // Only call the validation plugin if you aren't using pledge_with_email,
        // or you've set pledge_with_email to not use validation
        $.p3.validation('#action-form', {
            jsonURL: petition.live.actions.validation,
            params: petition.live.parameters
        });

        // Recent signers widget
        $.p3.recent_signers('#action-recent-signers',{
            jsonURL: petition.live.actions.pledges,
            params: petition.live.parameters
        });

    });

}(jQuery, this));
