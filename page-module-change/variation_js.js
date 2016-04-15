/* _optimizely_evaluate=force */
optimizelyPageModules.getElementForTreatment('a.navigation:contains(Foo)', function(elem){
  $(elem).text('Bar');
});
