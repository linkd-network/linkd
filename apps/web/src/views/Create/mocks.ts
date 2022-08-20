interface FormField {
    type: string;
    name: string;
    label: string;
}

const formFields: FormField[] = [
    {
        name: 'id',
        label: 'Data Resource ID',
        type: 'text',
    }
];

const trackingScript = `<script src="https://www.cnss.net/track/js?id=1051s3934x"></script>
<script>
    window.CLayer = window.CLayer || []; 
    function cTag(){CLayer.push(args);} 
    cTag('js', new Date()); 
    cTag('conf', '1051s3934x');
</script>`;

export {
    trackingScript,
    formFields,
}