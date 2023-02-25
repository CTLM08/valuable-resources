const parser = new DOMParser();
export const getOgImage =async (url)=>{
    return await fetch(`https://cors-anywhere.thecodeblog.net/${url}`).then(e => e.text()).then((html) =>{
        const doc = parser.parseFromString(html, "text/html");
        const ogImage = doc.querySelector("meta[property='og:image']");
        if(ogImage){
            return ogImage.content;
        }
        return null;
    })
}