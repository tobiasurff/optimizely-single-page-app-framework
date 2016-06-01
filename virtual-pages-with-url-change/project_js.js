// Debug mode
// Conditional statement
debug_uncaptured = [];
(function() {
    if (window.MutationObserver || window.WebKitMutationObserver) {
      var listeners = [],
        doc = window.document,
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        observer,
        last_activated_url = '',
        debug_trackuncaptured = false;
      document.onmousedown = function() {
        debug_trackuncaptured = false;
      }

      function check(elems) {
        if (last_activated_url !== window.location.href && optimizely.$(
          'body.loading').length < 1) {
          // Test change (would be activation call)
          //optimizely.$("head").append('<style>*{background:yellow;}</style>');
          //optimizely.$("*").css({"background":'#'+Math.floor(Math.random()*16777215).toString(16) });
          console.log(
            '----------------------- ACTIVATED -----------------------');
          debug_trackuncaptured = true;
          //window.optimizely.push(["activate", 6047861351]);
          last_activated_url = window.location.href;
        } else if (debug_trackuncaptured == true) {
          for (var i = 0, tot = debug_uncaptured.length; i < tot; i++) {
            for (var io = 0, toto = debug_uncaptured[i].length; io < toto; io++) {
              if (debug_uncaptured[i][io].addedNodes.length > 0) {
                debug_uncaptured.push(debug_uncaptured[i][
                  io
                ].addedNodes));
            }
          }
        }
        debug_uncaptured.push(elems);
        //console.log(debug_uncaptured);
        //console.log(elems);
        /*for (var i=0,  tot=myArray.length; i < tot; i++) {
              console.log(myArray[i]); //"aa", "bb"
            }*/
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