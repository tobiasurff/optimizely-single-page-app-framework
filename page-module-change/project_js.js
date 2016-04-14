window.optimizelyPageModules = {
  elementsToDecorate: [],
  escapeStringForVariableName: function(string) {
    return 'elem' + string.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0);
      //if (c == 32) return '-';
      //if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
      return ('000' + c.toString(16))
        .slice(-4);
    });
  },
  waitForElement: function(selector, fn) {
    // If Mutation Observers are available
    if (window.MutationObserver || window.WebKitMutationObserver) {
      var listeners = [],
        doc = window.document,
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        observer;
      // Store the selector and callback to be monitored
      listeners.push({
        selector: selector,
        fn: fn
      });

      function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
          listener = listeners[i];
          // Query for elements matching the specified selector
          elements = optimizely.$(listener.selector);

          for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
            element = elements[j];
            // Make sure the callback isn't invoked with the 
            // same element more than once
            if (!element.__optimizelyTreated) {
              element.__optimizelyTreated = true;

              var identifier = window.optimizelyPageModules.escapeStringForVariableName(listener.selector);

              // Add element to array so that it can be picked up from within variation code
              window.optimizelyPageModules.elementsToDecorate[identifier] = window.optimizelyPageModules.elementsToDecorate[
                identifier] || [];
              window.optimizelyPageModules.elementsToDecorate[identifier].push(element);

              // Invoke the callback with the element
              listener.fn.call(element, element);
            }
          }
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
      // Check if the element is currently in the DOM
      check();
    }

  },
  itemOnPage: function(selector, callback) {
    window.optimizelyPageModules.waitForElement(selector,
      function() {
        callback.call();
      });
  },
  getElementForTreatment: function(selector) {

    var identifier = window.optimizelyPageModules.escapeStringForVariableName(selector);
    if (typeof window.optimizelyPageModules.elementsToDecorate[identifier] !== "undefined" && window.optimizelyPageModules
      .elementsToDecorate[identifier].length > 0) {
      return window.optimizelyPageModules.elementsToDecorate[identifier].pop();
    } else {
      return false;
    }
  }
};