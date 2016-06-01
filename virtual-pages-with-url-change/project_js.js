// Debug mode
// Conditional statement

(function(debug =) {
  if (window.MutationObserver || window.WebKitMutationObserver) {

    var listeners = [],
      doc = window.document,
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      observer;

    var last_activated_url = '';

    function check(elems) {
      
      console.log(elems);
        
          if (last_activated_url !== window.location.href && optimizely.$('body.loading').length < 1) {
            
            // Test change (would be activation call)
            optimizely.$("head").append('<style>*{background:yellow;}</style>');
            optimizely.$("*").css({"background":'#'+Math.floor(Math.random()*16777215).toString(16) });
            
            //window.optimizely.push(["activate", 6047861351]);
            last_activated_url = window.location.href;
          }
      
    }

    if (!observer) {
      // Watch for changes in the document
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }

    // Tracking script usage
    window.optimizely = window.optimizely || [];
  window.optimizely.push({
    'type': 'integration',
    'OAuthClientId': '6078211160'
  });

  }
})(); 