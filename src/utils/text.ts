
import katex from 'katex';

const capitalize = (text: string) => {
    return text[0].toUpperCase() + text.slice(1);
}

const renderKatex = (text: string) => {
    return text.replace(/\$(.*?)\$/g, function(match, p1) {
        const html = katex.renderToString(p1, {throwOnError: false});
        const mathml = katex.renderToString(p1, {output: 'mathml', throwOnError: false});
        // return only the mathml
        return `<span class="katex-mathml">${mathml}</span>`;
    });
}

export { capitalize, renderKatex }