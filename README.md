# Optimizely Single-Page App Framework

This framework is a collection of strategies to work with Optimizely on highly dynamic pages (where elements are added and removed after the initial page load). Optimizely offers Conditional and Manual Activation for these use cases – and this framework is built around these funcionalities.

There are two main ways single-page apps update:

* Page-like updates that behave very similar to a traditional new page load in a browser. 

To an end user, it looks like they're moving from page to page, the address in their browser changes (through use of the Javascript History API) and the main content of the page is update. Often, some navigational elements that stay the same across all pages stay the same.

These "virtual" page changes fit in nicely with Optimizely's url-based targeting model and its visual editor.

Place the code in "virtual-page-with-url-change" in Optimizely's Project JS or on your site. This code will trigger "Manual Activation" every time elements are added to the page and the url shown in the browser address bar has changed.

In Optimizely, create your experiments as you would usually, set url targeting accordingly and pick "Manual Activation" instead of "Immediate Activation" under Options and Activation Mode for this type of experiment.

When setting this up initially, make sure you only trigger Manual Activation once the actual page content loads. You'll want to ensure this isn't called too early, e.g. when the address already changed, but only a waiting spinner is displayed.
 
* Non-stateful changes to modules on a page. 

These don't feel like a new page to your visitors and aren't reflected in the browser address bar. A list of products where new products are added once you scroll to the last product (endless scrolling) is an example of this use case.


