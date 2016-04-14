(function() {
  if (window.MutationObserver || window.WebKitMutationObserver) {

    var listeners = [],
      doc = window.document,
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      observer;

    var last_activated_url = '';

    function check() {

      // If your site shows a spinner or loading icon of some sort, make sure to only trigger if the currently added elements don't contain the waiting spinner. This will avoid that your experiment activates too early (before the elements you want to change are added).

      if (last_activated_url !== window.location.href) {

        // Trigger Manual Activation
        window.optimizely.push(["activate"]);

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
})();