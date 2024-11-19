import { useState, useEffect } from 'react';
import './App.css';
import EmbarcacionForm from './components/EmbarcacionForm';
import EmbarcacionTable from './components/EmbarcacionTable';
import { Embarcacion } from './types';
import axios from 'axios';

function App() {
  const [currentEmbarcacion, setCurrentEmbarcacion] = useState<Embarcacion | null>(null);
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);

  useEffect(() => {
    // Fetch initial list of embarcaciones from the backend
    const fetchEmbarcaciones = async () => {
      try {
        const response = await axios.get('/api/embarcaciones');
        setEmbarcaciones(response.data);
      } catch (error) {
        console.error('Error fetching embarcaciones:', error);
      }
    };

    fetchEmbarcaciones();
  }, []);

  const handleAddEmbarcacion = (embarcacion: Embarcacion) => {
    setEmbarcaciones([...embarcaciones, embarcacion]);
  };

  const handleUpdateEmbarcacion = (embarcacion: Embarcacion) => {
    setEmbarcaciones(embarcaciones.map(e => (e.id === embarcacion.id ? embarcacion : e)));
    setCurrentEmbarcacion(null);
  };

  const handleEditEmbarcacion = (embarcacion: Embarcacion) => {
    setCurrentEmbarcacion(embarcacion);
  };

  const handleDeleteEmbarcacion = async (id: number) => {
    try {
      await axios.delete(`/api/embarcaciones/${id}`);
      setEmbarcaciones(embarcaciones.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting embarcacion:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <EmbarcacionForm
          onSubmit={currentEmbarcacion ? handleUpdateEmbarcacion : handleAddEmbarcacion}
          initialData={currentEmbarcacion || undefined}
        />
      </div>
      <div className="card">
        <EmbarcacionTable
          embarcaciones={embarcaciones}
          onEdit={handleEditEmbarcacion}
          onDelete={handleDeleteEmbarcacion}
        />
      </div>
    </div>
  );
}

export default App;