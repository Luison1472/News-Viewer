import NewsList from './components/NewsList.js';
import Nav from './components/Nav';


window.onload = async function() {
    const rootElement = document.getElementById('root');

    const proxyData = new Proxy({
        category: 'all',
    },
    {
        set: async function(target, prop, value) {
            Reflect.set(target, prop, value);
            const newsListElement = await NewsList(proxyData);
            const container = rootElement.querySelector('.news-list-container');

            if (container === null) {
                rootElement.appendChild(newsListElement);
            } else {
                container.replaceWith(newsListElement);
                return;
            }
        },
    });


    const navElement = Nav(proxyData);
    rootElement.appendChild(navElement);

    const newsListElement = await NewsList(proxyData);
    rootElement.appendChild(newsListElement);
};
