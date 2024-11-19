import React, { useEffect } from 'react';
import axios from 'axios';
import { Embarcacion } from '../types';

interface EmbarcacionTableProps {
    embarcaciones: Embarcacion[];
    onEdit: (embarcacion: Embarcacion) => void;
    onDelete: (id: number) => void;
}

const EmbarcacionTable: React.FC<EmbarcacionTableProps> = ({ embarcaciones, onEdit, onDelete }) => {
    useEffect(() => {
        // Aquí podrías agregar lógica adicional si es necesario
    }, [embarcaciones]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/embarcaciones/${id}`);
            onDelete(id);
            window.location.reload(); // Actualizar la página automáticamente
        } catch (error) {
            console.error('Error al eliminar la embarcación:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Embarcaciones</h2>
            <table style={{ margin: '1em 0', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad (kg)</th>
                        <th>Descripción</th>
                        <th>Fecha Programada</th> {/* Nueva columna */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(embarcaciones) && embarcaciones.map((embarcacion) => (
                        <tr key={embarcacion.id}>
                            <td>{embarcacion.nombre}</td>
                            <td>{embarcacion.capacidad} kg</td>
                            <td>{embarcacion.descripcion}</td>
                            <td>{embarcacion.fechaProgramada}</td> {/* Nueva celda */}
                            <td style={{ display: 'flex', gap: '0.5em' }}>
                                <button onClick={() => onEdit(embarcacion)}>Editar</button>
                                <button onClick={() => handleDelete(embarcacion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmbarcacionTable;