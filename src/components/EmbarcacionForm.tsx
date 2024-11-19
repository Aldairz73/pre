import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Embarcacion } from '../types';

interface EmbarcacionFormProps {
    onSubmit: (embarcacion: Embarcacion) => void;
    initialData?: Embarcacion;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({ onSubmit, initialData }) => {
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [capacidad, setCapacidad] = useState(initialData?.capacidad || 0);
    const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setCapacidad(initialData.capacidad);
            setDescripcion(initialData.descripcion || '');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const embarcacionData = { nombre, capacidad, descripcion };
        try {
            if (initialData) {
                // Actualizar embarcación existente
                await axios.put(`/api/embarcaciones/${initialData.id}`, embarcacionData);
                onSubmit({ ...initialData, nombre, capacidad, descripcion });
            } else {
                // Agregar nueva embarcación
                const response = await axios.post('/api/embarcaciones', embarcacionData);
                onSubmit({ ...embarcacionData, id: response.data.id });
            }
            setNombre('');
            setCapacidad(0);
            setDescripcion('');
        } catch (error) {
            console.error('Error al registrar la embarcación:', error);
        }
    };

    return (
        <div>
            <h2>{initialData ? 'Actualizar Embarcación' : 'Registrar Embarcación'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Capacidad (kg):</label>
                    <input type="number" name="capacidad" value={capacidad} onChange={(e) => setCapacidad(Number(e.target.value))} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input type="text" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <button type="submit">{initialData ? 'Actualizar' : 'Registrar'}</button>
            </form>
        </div>
    );
};

export default EmbarcacionForm;
