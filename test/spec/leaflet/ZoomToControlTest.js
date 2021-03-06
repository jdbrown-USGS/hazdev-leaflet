/* global chai, describe, it, beforeEach, sinon, L*/
'use strict';


var ZoomToControl = require('leaflet/control/ZoomToControl');

var expect = chai.expect;

var control = null;

var map = L.map(L.DomUtil.create('div', 'map'), {
  center: [40.0, -105.0],
  zoom: 3
});


describe('control/ZoomToControl', function () {

  beforeEach(function () {
    var locations;

    locations = [
      {
        title:'California',
        id: 'california',
        bounds: [[42,-125], [32,-113]]
      },
      {
        title:'Alaska',
        id: 'alaska',
        bounds: [[72,-175], [50,-129]]
      },
    ];

    control = ZoomToControl({locations:locations});

    map.addControl(control);
  });

  describe('Class Definition', function () {
    it('Can be required', function () {
      /* jshint -W030 */
      expect(ZoomToControl).to.not.be.null;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      /* jshint -W030 */
      expect(control).to.not.be.null;
      expect(control.options).to.not.be.null;
      expect(control._map).to.not.be.undefined;
      /* jshint +W030 */
    });
  });

  describe('ZoomTo Control', function () {
    it('Can be added', function () {
      /* jshint -W030 */
      expect(control._map).to.not.be.null;
      /* jshint +W030 */
    });

    it('Can be removed', function () {
      //map.removeControl(control);
      control.onRemove();
      /* jshint -W030 */
      expect(control._map).to.be.null;
      /* jshint +W030 */
    });

    it('Can be selected', function () {
      var element,
          evt,
          save;

      element = control._container.querySelector(
          '.zoomto-control-list');
      element.selectedIndex = 1;
      element.value = 'alaska';
      save = sinon.spy(control._map, 'fitBounds');

      evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      element.dispatchEvent(evt);
      expect(save.callCount).to.equal(1);

      save.restore();
      expect(element.selectedIndex).to.equal(0);
    });
  });
});
