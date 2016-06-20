(function() {
  var doc = window.document,
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
    observer,
    debug_mode = true || window.location.search.indexOf('optimizely_preview_activation') >= 0,
    last_activated_url = '',
    // Adapt condition to match your website (e.g. include waiting spinners and certain elements that have to be available before activation)
    condition = function(){
      return optimizely.$('.content-loading-indicator').css('display') != 'block' &&
        optimizely.$('.content').length > 0 && 
        optimizely.$('.logo-wrapper').length > 0;
    };

  function check(elems) {
    if (last_activated_url !== window.location.href && condition() ) {
      // Test change (would be activation call)
      requestAnimationFrame(function() {
        // Activate experiments via Manual Activation
        window.optimizely.push(["activate"]);
        if(debug_mode){
          // Color change for debugging (yellow elements are inserted after activation, randomly colored elements are inserted before the activation)
          optimizely.$("head").append('<style>*{background:yellow;}</style>');
          optimizely.$("*").css({
            "background": '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        // Persist URL for which activation is done (so that the activation call will only fire again after an address change)
        last_activated_url = window.location.href;
      });
    }
  }
  if (requestAnimationFrame && MutationObserver) {
    if (!observer) {
      // Watch for changes in the document
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      }); 
    }
  }
  // Tracking script usage
  window.optimizely = window.optimizely || [];
  window.optimizely.push({
    'type': 'integration',
    'OAuthClientId': '6078211160'
  });
})();