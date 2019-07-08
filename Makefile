NPM=.bin/npm

.PHONY: init-packages
init-packages:
	$(NPM) i

.PHONY: build-dev
build-dev:
	$(NPM) run build
