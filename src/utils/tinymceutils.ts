const init : any = {
    license_key: 'gpl',
    skin: false,
    plugins: 'lists link image table code wordcount autoresize advlist',
    content_css: false,
    external_plugins: {
        'tiny_mce_wiris': '@wiris/mathtype-tinymce6/plugin.min.js',
    },
    toolbar: 'undo redo | formatselect | bold italic underline backcolor | subscript superscript | alignleft aligncenter alignright alignjustify | image table | numlist bullist | code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry |',
    menubar: 'file edit view insert format tools table ',
    menu: {
        insert: { title: 'Insert', items: 'image table | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry' },
        // format: { title: 'Format', items: 'bold italic underline  |  forecolor backcolor | subscript superscript | codeformat ' },
    },
    // style_formats: [
    //     { title: 'Blocks', items: [
    //         { title: 'Span', format: 'span' },
    //     ]},
    // ],
    // block_formats: 'span=span '
    forced_root_block : 'div',
    // newline_behavior: 'linebreak',
    // forced_root_block_attrs: {
    //     'class': '',
    //     // 'data-something': 'my data'
    //   }
    // max_width: 500,
    min_height: 200,
    // inline: true,
    // language: 'vi',
};


export default () => { return { ...init}};