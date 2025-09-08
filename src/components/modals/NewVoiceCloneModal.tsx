import React, { useState } from 'react';
import Modal from '../Modal';
import { Upload, Voicemail } from 'lucide-react';
import toast from 'react-hot-toast';

interface NewVoiceCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTraining: (voiceName: string) => void;
}

const NewVoiceCloneModal: React.FC<NewVoiceCloneModalProps> = ({ isOpen, onClose, onStartTraining }) => {
  const [voiceName, setVoiceName] = useState('');
  const [samples, setSamples] = useState<File[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSamples(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!voiceName.trim()) {
      toast.error('Please provide a name for your voice model.');
      return;
    }
    if (samples.length === 0) {
      toast.error('Please upload at least one voice sample.');
      return;
    }
    
    setIsTraining(true);
    onStartTraining(voiceName);
    
    // Reset state after a delay to allow for animations
    setTimeout(() => {
        setIsTraining(false);
        setVoiceName('');
        setSamples([]);
        onClose();
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start New Voice Clone">
      <div className="space-y-6">
        <div>
          <label htmlFor="voiceName" className="block text-sm font-medium text-gray-300 mb-2">
            Voice Name
          </label>
          <input
            id="voiceName"
            type="text"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            placeholder="e.g., My Podcast Voice"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Samples
          </label>
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <input type="file" id="voice-samples-modal" className="hidden" multiple accept="audio/*" onChange={handleFileChange} />
            <label htmlFor="voice-samples-modal" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300 mb-2">Drop files or click to upload</p>
              <p className="text-xs text-gray-400">MP3, WAV. Min 10 mins total.</p>
            </label>
          </div>
          {samples.length > 0 && (
            <div className="mt-3 text-sm text-gray-300">
              {samples.length} file(s) selected.
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isTraining}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isTraining ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Starting...</span>
                </>
            ) : (
                <>
                    <Voicemail className="w-4 h-4" />
                    <span>Start Training</span>
                </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewVoiceCloneModal;
