import React, { useState } from 'react';
import Modal from '../Modal';
import { Lock, Eye, EyeOff, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast.success('Password changed successfully!');
    onClose();
  };

  const handleDeleteAccount = () => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span className="text-center">Are you sure you want to delete your account? This action is irreversible.</span>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.success('Account deletion initiated.');
              onClose();
            }}
            className="px-4 py-1 bg-red-600 text-white rounded-md text-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1 bg-gray-600 text-white rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 10000 });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account Settings" size="lg">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showCurrent ? <EyeOff/> : <Eye/>}</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showNew ? <EyeOff/> : <Eye/>}</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handlePasswordChange} disabled={isSaving} className="px-6 py-2 bg-gradient-purple rounded-lg text-white font-semibold">{isSaving ? 'Saving...' : 'Save Password'}</button>
        </div>

        <div className="border-t border-red-500/30 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
          <div className="flex justify-between items-center mt-4 p-4 border border-red-500/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data.</p>
            </div>
            <button onClick={handleDeleteAccount} className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-600/40 transition-colors">
              <Trash2 className="w-4 h-4"/>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
