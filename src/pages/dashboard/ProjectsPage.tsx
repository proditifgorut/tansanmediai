import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Folder, Search, Mic, Music, Headphones, Play, Download, Trash2, PlusCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/ui/Pagination';
import Skeleton from '../../components/ui/Skeleton';
import { generateMockProjects, Project } from '../../lib/mockData';

const PROJECTS_PER_PAGE = 9;

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<Project['type'] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProjects(generateMockProjects(50));
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'all' || project.type === filter;
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, searchTerm, filter]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const filterButtons: { label: string; value: Project['type'] | 'all'; icon: React.ElementType }[] = [
    { label: 'All', value: 'all', icon: Folder },
    { label: 'TTS', value: 'tts', icon: Mic },
    { label: 'Music', value: 'music', icon: Music },
    { label: 'Covers', value: 'cover', icon: Headphones },
  ];

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
        <GlassCard key={index} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div>
                <Skeleton className="w-32 h-5 mb-1" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="flex-1 h-9 rounded-lg" />
            <Skeleton className="w-9 h-9 rounded-lg" />
            <Skeleton className="w-9 h-9 rounded-lg" />
          </div>
        </GlassCard>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <PageHeader title="My Projects" subtitle="Manage all your generated audio content in one place." />
        <Link to="/dashboard/creation-hub" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
          <PlusCircle className="w-5 h-5" />
          Create New Project
        </Link>
      </div>
      
      <GlassCard className="p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
            {filterButtons.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => { setFilter(value); setCurrentPage(1); }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {isLoading ? renderSkeletons() : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <GlassCard className="p-5 hover:border-purple-400/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700`}>
                          <Icon className={`w-5 h-5 ${project.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white capitalize">{project.name}</h3>
                          <p className="text-xs text-gray-400 capitalize">{project.type} Project</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>Date: {project.date}</span>
                      <span>Duration: {project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                      <button className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-2 bg-slate-700 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
          {filteredProjects.length === 0 ? (
            <GlassCard className="p-8 text-center mt-8">
              <Folder className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Projects Found</h2>
              <p className="text-gray-400">
                Try adjusting your search or filter, or create a new project.
              </p>
            </GlassCard>
          ) : (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
