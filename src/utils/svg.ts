const createDiagramSvg = () => {
    const svgText = '<svg content="&lt;mxfile&gt;&lt;diagram&gt;&lt;/diagram&gt;&lt;/mxfile&gt;"></svg>';
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    return svg;
}


export { createDiagramSvg };