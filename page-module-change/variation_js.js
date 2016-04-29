/* _optimizely_evaluate=editor_only */
optimizelyPageModules.itemOnPage('a.navigation:contains(Foo)', function(){}); 
/* _optimizely_evaluate=end_editor_only */ 
/* _optimizely_evaluate=force */
optimizelyPageModules.getElementForTreatment('a.navigation:contains(Foo)', function(elem){
  $(elem).text('Bar');
});
