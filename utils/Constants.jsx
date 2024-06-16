// Vizer
export const VIZER_DOMAIN = "vizerhd.mov";
export const VIZER_HOST = `https://${VIZER_DOMAIN}/`;
export const VIZER_SEARCH = `${VIZER_HOST}pesquisar/?p=`;

// User Agent
export const USER_AGENT_WINDOWS = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36';
export const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36';
export const USER_AGENT_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1';

export const GENRES_MOVIES = [
    { key: 'recente', url: VIZER_HOST + 'assistir/filmes-online-2/', title: 'adicionados' },
    { key: 'animacao', url: VIZER_HOST + 'genero/filmes-de-animacao-1/', title: 'animação' },
    { key: 'aventura', url: VIZER_HOST + 'genero/filmes-de-aventura-2/', title: 'aventura' },
    { key: 'acao', url: VIZER_HOST + 'genero/filmes-de-acao-3/', title: 'ação' },
    { key: 'comedia', url: VIZER_HOST + 'genero/filmes-de-comedia-4/', title: 'comédia' },
    { key: 'crime', url: VIZER_HOST + 'genero/filmes-de-crime-5/', title: 'crime' },
    { key: 'documentario', url: VIZER_HOST + 'genero/filmes-de-documentario-6/', title: 'documentário' },
    { key: 'drama', url: VIZER_HOST + 'genero/filmes-de-drama-7/', title: 'drama' },
    { key: 'familia', url: VIZER_HOST + 'genero/filmes-de-familia-8/', title: 'família' },
    { key: 'fantasia', url: VIZER_HOST + 'genero/filmes-de-fantasia-9/', title: 'fantasia' },
    { key: 'faroeste', url: VIZER_HOST + 'genero/filmes-de-faroeste-10/', title: 'faroeste' },
    { key: 'ficcao', url: VIZER_HOST + 'genero/filmes-de-ficcao-cientifica-11/', title: 'ficção' },
    { key: 'guerra', url: VIZER_HOST + 'genero/filmes-de-guerra-12/', title: 'guerra' },
    { key: 'historia', url: VIZER_HOST + 'genero/filmes-de-historia-13/', title: 'história' },
    { key: 'misterio', url: VIZER_HOST + 'genero/filmes-de-misterio-14/', title: 'mistério' },
    { key: 'musica', url: VIZER_HOST + 'genero/filmes-de-musica-15/', title: 'música' },
    { key: 'nacional', url: VIZER_HOST + 'genero/filmes-de-nacional-16/', title: 'nacional' },
    { key: 'romance', url: VIZER_HOST + 'genero/filmes-de-romance-17/', title: 'romance' },
    { key: 'suspense', url: VIZER_HOST + 'genero/filmes-de-suspense-18/', title: 'suspense' },
    { key: 'terror', url: VIZER_HOST + 'genero/filmes-de-terror-19/', title: 'terror' },
];

export const GENRES_SERIES = [
    { key: 'recente', url: VIZER_HOST + 'assistir/series-online-3/', title: 'adicionados' },
    { key: 'animacao', url: VIZER_HOST + 'genero/series-de-animacao-20/', title: 'animação' },
    { key: 'aventura', url: VIZER_HOST + 'genero/series-de-aventura-21/', title: 'aventura' },
    { key: 'acao', url: VIZER_HOST + 'genero/series-de-acao-22/', title: 'ação' },
    { key: 'comedia', url: VIZER_HOST + 'genero/series-de-comedia-23/', title: 'comédia' },
    { key: 'crime', url: VIZER_HOST + 'genero/series-de-crime-24/', title: 'crime' },
    { key: 'documentario', url: VIZER_HOST + 'genero/series-de-documentario-25/', title: 'documentário' },
    { key: 'drama', url: VIZER_HOST + 'genero/series-de-drama-26/', title: 'drama' },
    { key: 'familia', url: VIZER_HOST + 'genero/series-de-familia-27/', title: 'família' },
    { key: 'fantasia', url: VIZER_HOST + 'genero/series-de-fantasia-28/', title: 'fantasia' },
    { key: 'faroeste', url: VIZER_HOST + 'genero/series-de-faroeste-29/', title: 'faroeste' },
    { key: 'ficcao', url: VIZER_HOST + 'genero/series-de-ficcao-cientifica-30/', title: 'ficção' },
    { key: 'guerra', url: VIZER_HOST + 'genero/series-de-guerra-31/', title: 'guerra' },
    { key: 'historia', url: VIZER_HOST + 'genero/series-de-misterio-32/', title: 'história' },
    { key: 'misterio', url: VIZER_HOST + 'genero/series-de-suspense-33/', title: 'mistério' },
];

export const DOMAINS = [
    'vizer',
    'vizerhd',
    'accounts.google',
    'google',
    'disqus',
    'encontre',
    'mixdrop',
    'streamtape',
    'filemoon'
];
