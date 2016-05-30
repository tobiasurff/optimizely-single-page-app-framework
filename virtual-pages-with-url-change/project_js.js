String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

(function() {
  if (window.MutationObserver || window.WebKitMutationObserver) {

    var listeners = [],
      doc = window.document,
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      observer;

    var last_activated_url = '';
    
    var timer = [];

    function check(elems) {
      
      console.log(elems);
        
        //window.clearTimeout(timer['aaaa']);
        //timer['aaaa'] = window.setTimeout(function(){
          if (last_activated_url !== window.location.href /*&& optimizely.$('body.loading').length < 1) {
            
            // Test change (would be activation call)
            optimizely.$("head").append('<style>*{background:yellow;}</style>');
            optimizely.$("*").css({
          "background":'#'+Math.floor(Math.random()*16777215).toString(16) });
            
            //window.optimizely.push(["activate", 6047861351]);
            console.log('ACTIVATED');
            last_activated_url = window.location.href;
          }
        //}, 1);
        
        

      
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