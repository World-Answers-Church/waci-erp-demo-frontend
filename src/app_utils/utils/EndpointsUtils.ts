
let resolveBackendEndpoint = 'http://localhost:5294';
if (window.location.hostname.includes('.dev.') || window.location.hostname === 'localhost') {
    resolveBackendEndpoint = "https://ms.dev.ijayo.gotugende.com";
} else if(window.location.hostname.includes('.staging.')) {
    resolveBackendEndpoint = "https://ms.staging.ijayo.gotugende.com";
} else {
    resolveBackendEndpoint = "https://ms.prod.ijayo.gotugende.com";
}

export const BASE_URL_ENDPOINT_PATH = resolveBackendEndpoint;