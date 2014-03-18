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

    // Detect form input placeholder support
    $('html').addClass((M.input.placeholder ? '' : 'no-') + 'placeholder');

    // If media queries are not supported, add classes to html
    // See http://modernizr.com/docs/#prefixeddom
    if (!M.mq('only all')) {
        $.p3.narrow();
    }

    $(document).ready(function() {

        // Track form abandonment
        $.p3.form_tracking('.js-track-abandonment');

        // Focus the email field for easier form entry
        $('input[name=email]').focus();

        /** Note the order of the next two plugins
         Both p3.remember_me_cookie() and p3.autofill() plugins may
         potentially fill the email field automatically, overwriting contents
         Adjust the load order as required */

        // Fill email field if cookie is set
        $.p3.remember_me_cookie('#action-form');

        // Fill input fields from GET parameters
        $.p3.autofill('#action-form');

        // Animate pledge counter
        $.p3.pledge_counter('#action-counter', {
            jsonURL: petition.live.actions.pledges,
            params: petition.live.parameters
        });

        // Check if we can sign this pledge using email field only
        // Includes form validation via $.p3.validation by default
        $.p3.pledge_with_email_only('#action-form', {
            signerCheckURL: petition.test.actions.signerCheck,
            validationRulesURL: petition.test.actions.validation,
            params: petition.live.parameters
        });

        // Only call validation plugin if you aren't using pledge_with_email,
        // or you've set pledge_with_email to not use validation
//        $.p3.validation('#action-form', {
//            jsonURL: validationTesting,
//            params: parameters
//        });

        // Update social share counts
        $.p3.social_sharing('#action-social-share', {
            jsonURL: petition.localSocial.url.simple,
            networks: {
                twitter: {
                    title: w.document.title
                },
                pinterest: {
                    image: 'http://www.greenpeace.org/international/Global/international/artwork/other/2010/openspace/bigspace-photo.jpg',
                    description: w.document.title
                }
            }
        });

        // Recent signers widget
        $.p3.recent_signers('#action-recent-signers', {
            jsonURL: petition.live.actions.pledges,
            params: petition.live.parameters
        });

    });

}(jQuery, Modernizr, this));
