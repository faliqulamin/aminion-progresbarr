;(function (window) {
  var angular = window.angular;

  /** TEMPLATE /template/aminion-progressbar/aminion-progressbar.html
   *  <div class="aminion-progressbar-content">
   *    <div class="aminion-progressbar-container">
   *      <div class="aminion-progressbar"></div>
   *    </div>
   *    <ng-transclude></ng-transclude>
   *  </div>
   */

  // constants
  var TEMPLATE_PATH = '/template/aminion-progressbar/aminion-progressbar.html';
  var TEMPLATE = '';
  TEMPLATE += '<div class="aminion-progressbar-content">';
  TEMPLATE +=   '<div class="aminion-progressbar-container">';
  //TEMPLATE +=     '<div class="textLoader">Please Wait</div>';
  TEMPLATE +=     '<div class="loader loader-bar is-active"><div class="textLoader">Please Wait....</div></div>';
  TEMPLATE +=     '';
  TEMPLATE +=   '</div>';
  TEMPLATE +=   '<ng-transclude></ng-transclude>';
  TEMPLATE += '</div>';

  // module
  angular.module('aminion-progressbar', ['ngAnimate']);

  // directive
  angular.module('aminion-progressbar').directive('aminionProgressbar', overlaySpinner);
  overlaySpinner.$inject = ['$animate'];
  function overlaySpinner ($animate) {
    return {
      templateUrl: TEMPLATE_PATH,
      scope: {active: '='},
      transclude: true,
      restrict: 'E',
      link: link
    };

    function link (scope, iElement) {
      scope.$watch('active', statusWatcher);
      function statusWatcher (active) {
        $animate[active ? 'addClass' : 'removeClass'](iElement, 'aminion-progressbar-active');
      }
    }
  }

  // template
  angular.module('aminion-progressbar').run(overlaySpinnerTemplate);
  overlaySpinnerTemplate.$inject = ['$templateCache'];
  function overlaySpinnerTemplate ($templateCache) {
    $templateCache.put(TEMPLATE_PATH, TEMPLATE);
  }

}.call(this, window));


