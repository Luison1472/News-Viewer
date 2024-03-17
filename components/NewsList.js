/* eslint-disable max-len */
import axios from 'axios';

const NewsList = async (data) => {
    const newsListContainer = document.createElement('div');
    newsListContainer.className = 'news-list-container';

    const newsListArticle = document.createElement('article');
    newsListArticle.className = 'news-list';
    newsListArticle.dataset.category = data.category;
    newsListContainer.appendChild(newsListArticle);

    const newsList = await getNewsList(data);
    newsList.forEach((item) => {
        newsListArticle.appendChild(item);
    });

    const scrollObserverElement = observerElement();

    newsListContainer.appendChild(scrollObserverElement);

    scrollObserver(newsListArticle, scrollObserverElement);


    return newsListContainer;
};


const getNewsList = async () => {
    const newsArr = [];
    const url = `https://newsapi.org/v2/top-headlines?country=kr&pageSize=5&category=all&apiKey=80e20f1b909046dba405ced7334ef6f9&_=${new Date().getTime()}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;

        articles.forEach((data) => {
            const imageUrl = data.urlToImage ? data.urlToImage : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
            const description = data.description ? data.description : '';

            const newsItem = document.createElement('section');
            newsItem.className = 'news-item';
            newsItem.insertAdjacentHTML('beforeend', `
                <div class="thumbnail">
                    <a href=${data.url} target="_blank" rel="noopener noreferrer">
                        <img src=${imageUrl} alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                        <a href=${data.url} target="_blank" rel="noopener noreferrer">
                            ${data.title}
                        </a>
                    </h2>
                    <p>
                        ${description}
                    </p>
                </div>
            `);
            newsArr.push(newsItem);
        });

        return newsArr;
    } catch (error) {
        // console.log(error);
    }
};


const observerElement = () => {
    const observerElement = document.createElement('div');
    observerElement.className = 'scroll-observer';
    observerElement.dataset.page = '1';

    const observerImg = document.createElement('img');
    observerImg.src = './img/ball-triangle.svg';
    observerImg.alt = 'Loading...';

    observerElement.appendChild(observerImg);

    return observerElement;
};


const scrollObserver = (newsListArticle, scrollObserverElement) => {
    const callback = async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const nextPage = parseInt(entry.target.dataset['page']);
                const category = newsListArticle.dataset.category;

                if (nextPage === 1) { // nextPage가 1일 때만 호출
                    const newsList = await getNewsList(nextPage, category);
                    entry.target.dataset['page'] = nextPage + 1;

                    if (newsList.length > 0) {
                        newsList.forEach((data) => {
                            newsListArticle.appendChild(data);
                        });

                        // 페이지당 5개의 아이템을 모두 로드한 후에 다음 페이지 호출
                        if (newsList.length === 5) {
                            continue;
                        }
                    } else {
                        observer.unobserve(entry.target);
                        entry.target.remove();
                    }
                }
            }
        }
    };
    const observer = new IntersectionObserver(callback, {threshold: 0.5});
    observer.observe(scrollObserverElement);
};
export default NewsList;
