(function() {
  var doc = window.document,
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
    observer,
    last_activated_url = '';

  function check(elems) {
    if (last_activated_url !== window.location.href && optimizely.$('.content-loading-indicator').css('display') != 'block' &&
      optimizely.$('.content').length > 0 && optimizely.$('.logo-wrapper').length > 0) {
      // Test change (would be activation call)
      requestAnimationFrame(function() {
        // Activate experiments via Manual Activation
        window.optimizely.push(["activate"]);
        // Color change for debugging (yellow elements are inserted after activation, randomly colored elements are inserted before the activation)
        optimizely.$("head").append('<style>*{background:yellow;}</style>');
        optimizely.$("*").css({
          "background": '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
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