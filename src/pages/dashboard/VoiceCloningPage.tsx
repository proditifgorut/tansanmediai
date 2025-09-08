import React, { useState } from 'react';
import { Voicemail, Upload, CheckCircle, Clock, Trash2, Info, PlusCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';
import NewVoiceCloneModal from '../../components/modals/NewVoiceCloneModal';

export interface ClonedVoice {
  id: string;
  name: string;
  status: 'ready' | 'training';
  date: string;
}

const VoiceCloningPage: React.FC = () => {
  const [clonedVoices, setClonedVoices] = useState<ClonedVoice[]>([
    { id: '1', name: 'My Main Voice', status: 'ready', date: '2025-07-20' },
    { id: '2', name: 'Project Narration', status: 'training', date: '2025-07-25' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartTraining = (voiceName: string) => {
    toast.loading('Starting voice training...', { id: 'cloning' });

    setTimeout(() => {
      const newVoice: ClonedVoice = {
        id: Math.random().toString(),
        name: voiceName,
        status: 'training',
        date: new Date().toLocaleDateString(),
      };
      setClonedVoices(prev => [newVoice, ...prev]);
      toast.success('Training started! It may take up to 24 hours.', { id: 'cloning', duration: 5000 });
    }, 2000);
  };

  const handleDeleteVoice = (id: string) => {
    setClonedVoices(prev => prev.filter(v => v.id !== id));
    toast.error("Cloned voice deleted.");
  }

  return (
    <>
      <div>
        <PageHeader title="Voice Cloning" subtitle="Create a digital replica of any voice from audio samples." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <GlassCard className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">How It Works</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                <li>Click "Start New Clone" to begin.</li>
                <li>Upload 10-15 minutes of clean, high-quality audio of a single speaker.</li>
                <li>Ensure there is no background noise, music, or other voices.</li>
                <li>Our AI will process the samples to create a voice model.</li>
                <li>The process can take up to 24 hours. We'll notify you when it's ready.</li>
              </ul>
            </GlassCard>
            <GlassCard className="p-6 text-center">
                <Voicemail className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Clone a Voice?</h3>
                <p className="text-gray-400 mb-6">Create a new voice model by providing audio samples.</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                >
                    <PlusCircle className="w-5 h-5" />
                    Start New Clone
                </button>
            </GlassCard>
          </div>
          <div>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">My Cloned Voices</h3>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {clonedVoices.map(voice => (
                  <div key={voice.id} className="p-4 bg-white/5 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{voice.name}</p>
                      <p className="text-xs text-gray-400">Created: {voice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {voice.status === 'ready' ? (
                        <span className="flex items-center gap-1.5 text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4" /> Ready
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                          <Clock className="w-4 h-4 animate-spin" /> Training
                        </span>
                      )}
                      <button onClick={() => handleDeleteVoice(voice.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <NewVoiceCloneModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartTraining={handleStartTraining}
      />
    </>
  );
};

export default VoiceCloningPage;
