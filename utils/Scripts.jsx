export const SCRIPT_NEW_MOVIES = `
setTimeout(() => {
    const cards = document.querySelectorAll('div.ipsGrid > div#collview');
    const extractedData = Array.from(cards).map(card => {
        const languageElement = card.querySelector('div.vbItemImage > div.TopLeft > span.capa-info.capa-audio');
        const titleElement = card.querySelector('div.vbItemImage > div.caption > a[title]');
        const urlElement = card.querySelector('div.vbItemImage > div.caption > a[href]');
        const dateElement = card.querySelector('div.vbItemImage > div.caption > span.y');
        const timeElement = card.querySelector('div.vbItemImage > div.caption > span.t');
        const imgElement = card.querySelector('div.vbItemImage > a > div[data-background-src]');
        
        const language = languageElement.textContent.trim();
        const title = titleElement.textContent.trim();
        const date = dateElement.textContent.trim();
        const time = timeElement.textContent.trim();
        const url = urlElement.getAttribute('href').trim();
        const img = imgElement.getAttribute('data-background-src').trim();
        
        return { language, title, date, time, url, img };
    });
    window.ReactNativeWebView.postMessage(JSON.stringify(extractedData));
}, 1000);
true;
`;

export const SCRIPT_DETAILS_MOVIES = `
setTimeout(() => {
    const card = document.querySelector('main#ipsLayout_body');

    if (card) {
        const titleElement = card.querySelector('h1 > span.titulo > small');
        const sinopseElement = card.querySelector('div.esquerda > div.sinopse');
        const commentsElement = card.querySelector('div#disqus_thread > iframe');
        const spans = card.querySelectorAll('div.extrainfo > span');

        const title = titleElement ? titleElement.textContent.trim() : '';
        const sinopse = sinopseElement ? sinopseElement.textContent.trim() : '';
        const comments = commentsElement ? commentsElement.getAttribute('src').trim() : '';
        const diretor = spans[0] ? spans[0].innerHTML.trim() : '';
        const elenco = spans[1] ? spans[1].innerHTML.trim() : '';
        const produtor = spans[2] ? spans[2].innerHTML.trim() : '';

        const genres = [];
        const gernesElement = document.querySelectorAll('span.gen a');
        if (gernesElement) {
            gernesElement.forEach((element) => {
                genres.push({
                    link: element.href,
                    title: element.textContent.trim()
                });
            });
        }

        const season = [];
        const dropdownToggle = document.querySelector('.dropdown-toggle'); // Corrigido a seleção do elemento
        if (dropdownToggle) {
            const observer = new MutationObserver((mutations, obs) => {
                const seasonElement = document.querySelectorAll('div#combobox > div#box > ul.lista > li > div');
                if (seasonElement.length > 0) { // Certifique-se de que elementos foram encontrados
                    seasonElement.forEach((element) => {
                        season.push({
                            title: element.textContent.trim()
                        });
                    });
                    obs.disconnect(); // Para o observer assim que os elementos forem encontrados
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        title: title,
                        sinopse: sinopse,
                        diretor: diretor,
                        elenco: elenco,
                        produtor: produtor,
                        comments: comments,
                        genres: genres,
                        season: season,
                    }));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            dropdownToggle.click(); // Mova o clique para depois da configuração do observer
        }

        if (!dropdownToggle) {
            // Se o dropdownToggle não existir, envia a mensagem imediatamente
            window.ReactNativeWebView.postMessage(JSON.stringify({
                title: title,
                sinopse: sinopse,
                diretor: diretor,
                elenco: elenco,
                produtor: produtor,
                comments: comments,
                genres: genres,
                season: season,
            }));
        }
    }
}, 1000);
true;
`;

export const SCRIPT_EPISODES = `
setTimeout(() => {
    const episodes = [];
    const episodesElement = document.querySelectorAll('div.listagem > ul#listagem > li > a[href]');
    if (episodesElement) {
        episodesElement.forEach((element) => {
            episodes.push({
                link: element.href,
                title: element.textContent.trim()
            });
        });
    }
    window.ReactNativeWebView.postMessage(JSON.stringify({
        episodes: episodes,
    }));
}, 1000);
true;
`;

export const SCRIPT_BLOCK_MIXDROP = `
setTimeout(() => {
    setInterval(() => {
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.remove();
        });
    }, 1000);
}, 1000);
true;
`;

export const SCRIPT_BLOCK_FILEMOON = `
setTimeout(() => {
}, 1000);
true;
`;

export const SCRIPT_BLOCK_STREAMTAPE = `
setTimeout(() => {
    setInterval(() => {
        document.querySelectorAll('html > div').forEach(div => {
            div.remove();
        });
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.remove();
        });
    }, 1000);
}, 1000);
true;
`;

const CSS_DISQUS = `
div#form,
li.tab-user ul,
.disqus-footer__list {
    display: none;
}
`;

export const SCRIPT_DISQUS = `
setTimeout(() => {
    const style = document.createElement('style');
    style.innerHTML = \`${CSS_DISQUS}\`;
    document.head.appendChild(style);
}, 0);
true;
`;

export const SCRIPT_EXTRACT_MIXDROP = `
setTimeout(() => {
    setInterval(() => {
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.remove();
        });
        const element = document.querySelector('video#videojs_html5_api[src]');
        if (element) {
            const urlVideo = element.getAttribute('src').trim();
            if (urlVideo.startsWith("https:")) {
                window.ReactNativeWebView.postMessage(urlVideo);
            } else {
                window.ReactNativeWebView.postMessage('https:' + urlVideo);
            }
        }
    }, 1000);
}, 1000);
true;
`;

export const SCRIPT_EXTRACT_FILEMOON = `
setTimeout(() => {
    setInterval(() => {
        const element = document.querySelector('video.jw-video[src]');
        if (element) {
            const urlVideo = element.getAttribute('src').trim();
            if (urlVideo.startsWith("https:")) {
                window.ReactNativeWebView.postMessage(urlVideo);
            } else {
                window.ReactNativeWebView.postMessage('https:' + urlVideo);
            }
        }
    }, 1000);
}, 1000);
true;
`;

export const SCRIPT_EXTRACT_STREAMTAPE = `
setTimeout(() => {
    setInterval(() => {
        document.querySelectorAll('html > div').forEach(div => {
            div.remove();
        });
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.remove();
        });
        const element = document.querySelector('video#mainvideo[src]');
        if (element) {
            const urlVideo = element.getAttribute('src').trim();
            if (urlVideo.startsWith("https:")) {
                window.ReactNativeWebView.postMessage(urlVideo);
            } else {
                window.ReactNativeWebView.postMessage('https:' + urlVideo);
            }
        }
    }, 1000);
}, 1000);
true;
`;

export const SCRIPT_PAGES = `
setTimeout(() => {
    const element = document.querySelector('ul.ipsPagination');
    if (element) {
        const urlVideo = element.getAttribute('data-pages').trim();
        window.ReactNativeWebView.postMessage(urlVideo);
    } else {
        window.ReactNativeWebView.postMessage(0);
    }
}, 1000);
true;
`;
