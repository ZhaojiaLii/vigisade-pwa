NPM=.bin/npm

.PHONY: init-packages
init-packages:
	$(NPM) install

.PHONY: build-dev
build-dev:
	$(NPM) run build

.PHONY: build-prod
build-prod:
	$(NPM) run build-prod
