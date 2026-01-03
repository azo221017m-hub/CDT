import { useState } from 'react';
import styles from '../styles/RegistrationModal.module.css';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    contact: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate API call (we'd need to create a POST endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', description: '', category: '', contact: '' });
      }, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        
        <h2 className={styles.title}>Registrar mi Negocio</h2>
        <p className={styles.subtitle}>Únete a la Comunidad Digital de Texcoco</p>

        {status === 'success' ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <p>¡Registro exitoso! Tu negocio será revisado y publicado pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nombre del Negocio *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Ej. Café Texcoco"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Impresión">Impresión</option>
                <option value="Transporte">Transporte</option>
                <option value="Servicios">Servicios</option>
                <option value="Comercio">Comercio</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Descripción *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.textarea}
                placeholder="Describe tu negocio..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact" className={styles.label}>Contacto (Email o Teléfono) *</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="correo@ejemplo.com o 555-1234"
              />
            </div>

            {status === 'error' && (
              <div className={styles.error}>
                Error al registrar. Por favor intenta de nuevo.
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Registrando...' : 'Registrar Negocio'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
