Expression.Matrix = function (e, r, c) {
	e.__proto__ = Expression.Matrix.prototype;
	e.rows = r;
	e.cols = c;
	return e;
};

_ = Expression.Matrix.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Matrix;
_.default = _['*'] = function (x) {
	if(x.constructor === Expression.Matrix) {
		// Broken
		// O(n^3)
		if (x.rows !== this.cols) {
			throw ('Matrix dimensions do not match.');
		}
		var result = [];
		// result[x.rows * x.cols - 1 ] = undefined;
		var i, j, k, r = 0;
		for (i = 0; i < this.rows; i++) {
			for (j = 0; j < x.cols; j++) {
				var sum = Global.Zero;
				for(k = 0; k < x.rows; k++) {
					sum = sum['+'](x[k * x.cols + j]);
				}
				result[r++] = sum;
			}
		}
		return Expression.Matrix(result);
	} else {
		throw ('Unknown type');
	}
};
_.reduce = function (app) {
	var x, y;
	for(y = 0; y < this.rows; y++) {
		for(x = 0; x < y; x++) {
			// Make this[x,y] = 0
			var ma = this[x * this.cols + x];
			// 0 = this - (this/ma) * ma
			if(ma === Global.Zero) {
				throw ('Row swap!');
			}
			var tma = this[y * this.cols + x]['/'](ma);
			var i;
			for (i = x + 1; i < this.cols; i++) {
				this[y * this.cols + i] = this[y * this.cols + i]['-'](tma['*'](this[x * this.cols + i]));
			}
		}
	}
	return this;
};
