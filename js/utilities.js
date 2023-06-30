// စာများကို အကျဉ်းချုပ်လုပ်ခြင်း
export const excerpt = function(text, limit = 100) {
    if(text.length > limit) {
        return text.substring(0, limit )+ " ......";
    }
    return text;

};