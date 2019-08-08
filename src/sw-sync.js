(function () {
    'use strict';

    console.log('parfois', self);

    self.addEventListener('sync', function (event) {
        console.log('jamais', event);
    });
}());
