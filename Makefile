.PHONY: build

build:
	@npx --yes esbuild static/js/site.js --minify --outfile=static/js/site.min.js
	@npx --yes esbuild static/css/site.css --minify --outfile=static/css/site.min.css
