import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        ref={modalRef}
        className="relative bg-surface-800 rounded-xl shadow-2xl w-full max-w-md mx-4 
                   border border-surface-700 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-700">
          <h2 id="modal-title" className="text-lg font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-surface-400 hover:text-white transition-colors rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
  mode?: 'create' | 'rename';
}

export function CreatePlaylistModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialName = '', 
  mode = 'create' 
}: CreatePlaylistModalProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(initialName);
    setError('');
  }, [initialName, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Playlist name is required');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('Playlist name must be 50 characters or less');
      return;
    }

    onSubmit(trimmedName);
    setName('');
    setError('');
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'create' ? 'Create Playlist' : 'Rename Playlist'}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="playlist-name" className="block text-sm font-medium text-surface-300 mb-2">
            Playlist Name
          </label>
          <input
            ref={inputRef}
            type="text"
            id="playlist-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="My Awesome Playlist"
            className={`w-full px-4 py-2.5 bg-surface-700 border rounded-lg text-white 
                       placeholder-surface-400 focus:outline-none focus:ring-2 
                       focus:ring-primary-500 transition-all
                       ${error ? 'border-red-500' : 'border-surface-600'}`}
            maxLength={50}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white 
                       bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 
                       hover:bg-primary-500 rounded-lg transition-colors"
          >
            {mode === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'danger' | 'primary';
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  confirmVariant = 'primary'
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-surface-300 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white 
                     bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors
                      ${confirmVariant === 'danger' 
                        ? 'bg-red-600 hover:bg-red-500' 
                        : 'bg-primary-600 hover:bg-primary-500'}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
