const cache = {};

export async function friendlyFetch(url) {
    let cached = localStorage.getItem(url) || cache[url];

    if (!cached) {
        cached = await fetch(url).then(r => r.json());
        try {
            localStorage.setItem(url, JSON.stringify(cached));
        } catch (error) {
            // provavelmente excedeu a quota do localStorage
            // bora salvar em memória apenas (vai embora qdo atualizar a página)
            cache[url] = cached;
        }
    } else {
        cached = JSON.parse(cached);
    }
    
    return cached;
}