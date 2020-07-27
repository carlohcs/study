'use strict';

function click(callback = function() {}) {
    callback();
}

click();
click(undefined);
// Throw error
click(null);