all:
	./build.sh
cas: all
	cp ./build/math.js ./cas/math.js