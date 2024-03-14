'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [certificado, setCertificado] = useState(false);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const router = useRouter();

    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await fetch('/api/techs');
                const data = await response.json();
                setTechnologies(data);
            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        };

        fetchTechnologies();
    }, []);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);
    const handleUrlChange = (event) => setUrl(event.target.value);
    const handleImageChange = (event) => setImage(event.target.value);
    const handleCertificadoChange = (event) => setCertificado(event.target.checked);
    const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

    const handleTechnologiesChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedTechnologies(selectedOptions);
    };

    const handleRemoveTechnology = (technology) => {
        setSelectedTechnologies((prevTechnologies) =>
            prevTechnologies.filter((tech) => tech !== technology)
        );
    };

    const filteredTechnologies = technologies.filter((tech) =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        && !selectedTechnologies.includes(tech.name) // Filtrar las tecnologías ya seleccionadas
    ).slice(0, 5); // Limitar a 5 resultados

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                title,
                content,
                url,
                image,
                certificado,
                userId,
                technologies: selectedTechnologies
            };

            await fetch('/api/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            router.refresh(); // Actualizar la página después de enviar el formulario

            // Limpiar los campos después de enviar el formulario
            setTitle('');
            setContent('');
            setUrl('');
            setImage('');
            setCertificado(false);
            setSelectedTechnologies([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <h1>Agrega un nuevo curso</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Nombre del curso</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                        className='bg-gray-500'
                    />
                </div>
                <div>
                    <label htmlFor="content">Descripción</label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                        className='bg-gray-500'
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                        required
                        className='bg-gray-500'
                    />
                </div>
                <div>
                    <label htmlFor="image">Imagen</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={handleImageChange}
                        required
                        className='bg-gray-500'
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={certificado}
                            onChange={handleCertificadoChange}
                        />
                        Certificado
                    </label>
                </div>
                <div>
                    <label htmlFor="searchTerm">Buscar tecnologías</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className='bg-gray-500'
                    />
                </div>
                {searchTerm && (
                    <div>
                        <h2>Tecnologías</h2>
                        <div>
                            {filteredTechnologies.map((technology) => (
                                <div
                                    key={technology.id}
                                    onClick={() => {
                                        setSelectedTechnologies([...selectedTechnologies, technology.name]);
                                        setSearchTerm(""); // Limpiar el término de búsqueda
                                    }}
                                    className="bg-cyan-700 cursor-pointer rounded-md p-2 m-1"
                                >
                                    {technology.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <h2>Tecnologías seleccionadas:</h2>
                    <ul className=''>
                        {selectedTechnologies.map((technology, index) => (
                            <li key={index}>
                                {technology}
                                <button type="button" onClick={() => handleRemoveTechnology(technology)}>
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Crear</button>
            </form>
        </main>
    );
}