curl https://raw.githubusercontent.com/owncast/owncast/master/openapi.yaml > data/openapi.yaml
mkdir static/api
npx redoc-cli bundle data/openapi.yaml -o static/api/index.html --options '{"hideHostname": true, "pathInMiddlePanel": true}'