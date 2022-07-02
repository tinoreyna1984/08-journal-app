export const fileUpload = async (file) => {
    if(!file) throw new Error('No existe el archivo');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/tinoreyna1984/upload';
    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });
        if(!resp.ok) throw new Error('Error al subir el archivo');
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message)
    }
}