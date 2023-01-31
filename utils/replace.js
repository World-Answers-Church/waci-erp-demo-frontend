import Router from 'next/router';

export default function Replace(path) {
    // return Router.replace(`/${thisRoute}`, `/${withThatRoute}`, { shallow: true });
    return  window.history.replaceState({}, '', path);
}
