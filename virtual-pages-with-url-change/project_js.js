// Request Animation Frame shim
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
(function() {
  if (window.MutationObserver || window.WebKitMutationObserver) {
    var listeners = [],
      doc = window.document,
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      observer,
      last_activated_url = '';

    function check(elems) {
      if (last_activated_url !== window.location.href && optimizely.$('.content-loading-indicator').css('display') != 'block' &&
        optimizely.$('.content').length > 0 && optimizely.$('.logo-wrapper').length > 0) {
        // Test change (would be activation call)
        requestAnimFrame(function() {
          optimizely.$(".column-75 > p:eq(2)").append("<div id=\"optimizely_366808655\"></div>");
          optimizely.$("#optimizely_366808655").replaceWith(
            "<span class=\"icon-read rs_skip rs_preserve\"><br/><img id=\"optimizely_609747990\" src=\"https://global.handelsblatt.com/wp-content/uploads/2016/04/ReadSpeaker_Button-2.png\" style=\"margin-top: 15px;\"></span>"
          );
          optimizely.$("head").append('<style>*{background:yellow;}</style>');
          optimizely.$("*").css({
            "background": '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
          optimizely.$(".no-mycompany-logo > .left-wrapper").replaceWith(
            "<div class=\"left-wrapper\" style=\"margin-top:1px;\">\n  <a href=\"http://morningbriefing.handelsblatt.com/global/sign-up/\"><img src=\"https://global.handelsblatt.com/wp-content/uploads/2016/05/Morning-Briefing_Signup_ecke_-1.png\"></a>\n\t\t\</div>"
          );
          $("#article_overview").replaceWith(
            "<div style=\"text-align:right;height:32px;\"><a href=\"https://global-auth.handelsblatt.com/register\" style=\"cursor:hand;font-size: 10px; border-color: rgb(238, 112, 0); color: rgb(238, 112, 0); text-align: right;\">SUBSCRIBE</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href=\"https://global-auth.handelsblatt.com/login\" style=\"cursor:hand;font-size: 10px; color: rgb(238, 112, 0);\">LOG IN</a></div>"
          );
          optimizely.$("#main-header > .category-navigation > div:eq(0)").replaceWith(
            "<div class=\"header-search\"><a class=\"search-icon\" href=\"#\">Search</a><form class=\"formular search\" action=\"https://global.handelsblatt.com/search\" method=\"GET\" novalidate=\"novalidate\"><div class=\"form-input\"><input class=\"search-subject replace-value ui-autocomplete-input\" type=\"search\" placeholder=\"Enter search term...\" name=\"q\" autocomplete=\"off\"></div><input type=\"submit\" value=\"Search\"></form><a class=\"search-icon\"  href=\"#\">Search</a><a href=\"/\" style=\"position:absolute;top:10px;right:30px;\" id=\"article_overview\" class=\"open-navigation\" rel=\"overlay\" data-contentoverlay=\"{\"permanent\": true, \"class\": \"black\", \"action\": \"twt_ajax_get_article_overview\", \"data\": {\"absolute_urls\": false}}\"><a class=\"search-icon\" href=\"#\"><a class=\"search-icon\" href=\"#\">Search</a></a></div>"
          );
        });
        console.log('----------------------- ACTIVATED -----------------------');
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
  }
  // Tracking script usage
  window.optimizely = window.optimizely || [];
  window.optimizely.push({
    'type': 'integration',
    'OAuthClientId': '6078211160'
  });
})();