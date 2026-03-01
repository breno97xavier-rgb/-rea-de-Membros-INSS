import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  BookOpen, 
  Map, 
  HelpCircle, 
  Download, 
  Eye, 
  ChevronRight, 
  ArrowLeft, 
  LogOut, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Types ---
interface Subject {
  id: string;
  title: string;
  bgImage: string;
  teoria: string;
  mapas: string;
  questoes: string;
}

interface ComplementaryMaterial {
  id: string;
  title: string;
  bgImage: string;
  code: string;
  link: string;
  checkout: string;
}

// --- Constants & Data ---
const LOGO_URL = "https://i.ibb.co/mFbSYv6j/1000112350.webp";
const WHATSAPP_LINK = "https://w.app/editoraeditalconcursos";

const SUBJECTS: Subject[] = [
  {
    id: 'portugues',
    title: 'PORTUGUÊS',
    bgImage: 'https://i.ibb.co/qFjPbFP2/Design-sem-nome-8.png',
    teoria: 'https://drive.google.com/file/d/1dhTw-fo7iUtxpLPptXLOmvIQbxU29Nhi/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/1pGtNs4cCePMExcM29-oiLN0akS1ghHLM/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/13MlJdpZsERIbxD46b9pGbaFP2jcM8UkC/view?usp=drive_link'
  },
  {
    id: 'raciocinio-logico',
    title: 'RACIOCÍNIO LÓGICO',
    bgImage: 'https://i.ibb.co/Lh80qVny/Design-sem-nome-10.png',
    teoria: 'https://drive.google.com/file/d/1MWOCe-VS-2ZGu0FYVN8iAsSMUIppAGbf/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/1T6-cyYSgv8GhcVHMQ1wCU7nUZsvksRbw/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1SFkTr_JGV4GgQMocjtnaX8yvARCsgcrF/view?usp=drive_link'
  },
  {
    id: 'informatica-basica',
    title: 'INFORMÁTICA BÁSICA',
    bgImage: 'https://i.ibb.co/sdQLnnS3/Design-sem-nome-16.png',
    teoria: 'https://drive.google.com/file/d/1ZYT--MCXQKHYv9OGPYflS-AEt_4XMeTF/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/12tZWSLkSusqulszAOGmCo9R0dkPRs1Df/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1B6mbu1lvLNzQF0Se7JNb0U0Y74gj-N68/view?usp=drive_link'
  },
  {
    id: 'libre-office',
    title: 'LIBRE OFFICE',
    bgImage: 'https://i.ibb.co/4Z1SKsnV/Design-sem-nome-17.png',
    teoria: 'https://drive.google.com/file/d/1JlRhOgXOlAT3HmTh_t-3sgIe6tGhREn_/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/12tZWSLkSusqulszAOGmCo9R0dkPRs1Df/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1B6mbu1lvLNzQF0Se7JNb0U0Y74gj-N68/view?usp=drive_link'
  },
  {
    id: 'etica',
    title: 'ÉTICA NO SERVIÇO PÚBLICO',
    bgImage: 'https://i.ibb.co/sJdgnwy0/Design-sem-nome-14.png',
    teoria: 'https://drive.google.com/file/d/1jCtVYBGC-D0j9ENEFTrQGR4tSk0OQ6_e/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/11BwBdgqLW3Ye5JUiCELQc4IL8VtM49Lf/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1xcpAjLbnFiFNUExKWGM55ihdaRXrEapc/view?usp=drive_link'
  },
  {
    id: 'constitucional',
    title: 'DIREITO CONSTITUCIONAL',
    bgImage: 'https://i.ibb.co/Z1TQdjkN/Design-sem-nome-12.png',
    teoria: 'https://drive.google.com/file/d/1IuWsENxmrqQaSkDOGta0upbh_RnPQnFr/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/1_jIlf957WZXBBTF-iiHZIOjjrsyGcMkw/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1HzI593801K60gDeqLDlMU1U46uKzQpJn/view?usp=drive_link'
  },
  {
    id: 'administrativo',
    title: 'DIREITO ADMINISTRATIVO',
    bgImage: 'https://i.ibb.co/wryfhd17/Design-sem-nome-11.png',
    teoria: 'https://drive.google.com/file/d/1PqAiBH-D4uiX8Toy4Aenx4KhkU560olI/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/1NZPD5ZhdHRTsCQ0gtIeYP_2d3LEwKGny/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1T85rwABJnMaob2cu4d51ZFy6bMH1qrD6/view?usp=drive_link'
  },
  {
    id: 'seguridade',
    title: 'SEGURIDADE SOCIAL',
    bgImage: 'https://i.ibb.co/93CfnVKR/Design-sem-nome-9.png',
    teoria: 'https://drive.google.com/file/d/1wmnnJEKGexS2Jr0XS58mpBSzkNrXuzIx/view?usp=drive_link',
    mapas: 'https://drive.google.com/file/d/1SJqwWcBtyI9iac3KjUmDC6rcXbOZQ2hV/view?usp=drive_link',
    questoes: 'https://drive.google.com/file/d/1eUgROo6SxgUAuPzE2UtJ05cJsR21nyGN/view?usp=drive_link'
  }
];

const COMPLEMENTARY: ComplementaryMaterial[] = [
  {
    id: 'simulados',
    title: 'Simulados Esquematizados',
    bgImage: 'https://i.ibb.co/sJdgnwy0/Design-sem-nome-14.png',
    code: 'SIESQ',
    link: 'https://drive.google.com/file/d/14IS5WDYdHX9mU3v4S1K8diFkVfYmbI-m/view?usp=drive_link',
    checkout: 'https://pay.wiapy.com/OvX_lDQacs'
  },
  {
    id: 'revisao',
    title: 'Revisão Esquematizada',
    bgImage: 'https://i.ibb.co/wryfhd17/Design-sem-nome-11.png',
    code: 'REVESQ',
    link: 'https://drive.google.com/file/d/1bYid0LX3CEu--EqPGttA4SbAgx718GIt/view?usp=drive_link',
    checkout: 'https://pay.wiapy.com/l0ISZ64Cwy'
  },
  {
    id: 'redacao',
    title: 'Redação Discursiva para Concursos',
    bgImage: 'https://i.ibb.co/sdQLnnS3/Design-sem-nome-16.png',
    code: 'REDCON',
    link: 'https://drive.google.com/file/d/1NXhBdWnb7jkfDOxta4XUkIwaagxKxTtl/view?usp=drive_link',
    checkout: 'https://pay.wiapy.com/lRFSmwYQYg'
  },
  {
    id: 'controle-emocional',
    title: 'Disciplina de Ferro - Controle Emocional',
    bgImage: 'https://i.ibb.co/Z1TQdjkN/Design-sem-nome-12.png',
    code: 'DIFECOE',
    link: 'https://drive.google.com/file/d/1BIQVlJMNV58C-9EbxdA9prE0PpygEZlo/view?usp=drive_link',
    checkout: 'https://pay.wiapy.com/Hn-9DRvIDW'
  },
  {
    id: 'como-estudar',
    title: 'Como Estudar com PDFs',
    bgImage: 'https://i.ibb.co/PsqSMM2m/Design-sem-nome-15.png',
    code: 'COESPS',
    link: 'https://drive.google.com/file/d/1gJ0d-5JIdXitUp0IDZo_IbOLBL8V9_Lw/view?usp=drive_link',
    checkout: 'https://pay.wiapy.com/7cALG9VMpK'
  }
];

// --- Helper Functions ---
const convertDriveLink = (url: string) => {
  if (!url) return '';
  return url.replace(/\/view\?usp=drive_link|\/view/g, '/preview');
};

const getDownloadLink = (url: string) => {
  if (!url) return '';
  return url.replace(/\/view\?usp=drive_link|\/view/g, '/view');
};

// --- Components ---

const Header = ({ onLogout, showLogout = false }: { onLogout?: () => void, showLogout?: boolean }) => (
  <header className="fixed top-0 left-0 right-0 h-20 bg-slate-50/90 backdrop-blur-md border-b border-slate-200 shadow-sm z-50 flex items-center justify-between px-6 md:px-12">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#0056b3] bg-white flex items-center justify-center shadow-sm">
        <img src={LOGO_URL} alt="Logo Edital Concursos" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <span className="text-xl font-bold text-[#0056b3] uppercase tracking-wider hidden sm:block">Edital Concursos</span>
    </div>
    {showLogout && (
      <button 
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-medium"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline">Sair</span>
      </button>
    )}
  </header>
);

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-white py-12 px-6 md:px-12 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-[#00a8ff]">Edital Concursos</h3>
        <p className="text-gray-400 text-sm">© 2026 – Todos os direitos reservados</p>
      </div>
      <div>
        <h4 className="font-semibold mb-4 uppercase tracking-widest text-xs text-gray-500">Suporte</h4>
        <div className="flex flex-col gap-3">
          <a href="mailto:editoraeditalconcursos@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Mail size={18} />
            <span>editoraeditalconcursos@gmail.com</span>
          </a>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full w-fit hover:bg-[#128C7E] transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={18} />
            <span className="font-bold">(41) 98842-0201</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[#00a8ff] bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <img src={LOGO_URL} alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'login' | 'dashboard' | 'subject'>('login');
  const [userName, setUserName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | ComplementaryMaterial | null>(null);
  const [unlockedMaterials, setUnlockedMaterials] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState<'teoria' | 'mapas' | 'questoes' | 'material'>('teoria');
  const [showContent, setShowContent] = useState(false);

  // Initialize
  useEffect(() => {
    const savedName = localStorage.getItem('aluno_nome');
    const savedUnlocked = localStorage.getItem('unlocked_materials');
    
    if (savedName) {
      setUserName(savedName);
      setView('dashboard');
    }
    
    if (savedUnlocked) {
      setUnlockedMaterials(JSON.parse(savedUnlocked));
    }
  }, []);

  const handleLogin = (name: string) => {
    if (!name.trim()) {
      alert('Digite seu nome.');
      return;
    }
    localStorage.setItem('aluno_nome', name);
    setUserName(name);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('aluno_nome');
    setUserName('');
    setView('login');
  };

  const handleUnlock = (id: string, code: string, correctCode: string) => {
    if (code.toUpperCase() === correctCode) {
      const newUnlocked = [...unlockedMaterials, id];
      setUnlockedMaterials(newUnlocked);
      localStorage.setItem('unlocked_materials', JSON.stringify(newUnlocked));
      return true;
    }
    return false;
  };

  const openSubject = (subject: Subject | ComplementaryMaterial) => {
    setSelectedSubject(subject);
    setActiveModule('teoria' in subject ? 'teoria' : 'material');
    setShowContent(false);
    setView('subject');
    window.scrollTo(0, 0);
  };

  // --- Views ---

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full border border-slate-200"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-[#0056b3] mb-2 tracking-tight">Área de Membros</h1>
              <h2 className="text-xl font-medium text-gray-500">INSS 2026</h2>
            </div>
            
            <p className="text-gray-600 text-center mb-8">
              Digite seu nome para acessar sua área de estudos.
            </p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Aluno</label>
                <input 
                  type="text" 
                  placeholder="Ex: Eduarda"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00a8ff] focus:outline-none transition-all text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin((e.target as HTMLInputElement).value)}
                  id="login-input"
                />
              </div>
              
              <button 
                onClick={() => {
                  const input = document.getElementById('login-input') as HTMLInputElement;
                  handleLogin(input.value);
                }}
                className="w-full bg-[#0056b3] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#004494] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
              >
                Entrar na área de estudos
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header onLogout={handleLogout} showLogout />
        
        <main className="flex-1 mt-20 pb-20">
          {/* Welcome Banner */}
          <section className="bg-gradient-to-r from-[#0056b3] to-[#00a8ff] py-16 px-6 shadow-inner">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight"
              >
                BEM-VINDO, {userName}, À SUA ÁREA DE ESTUDOS.
              </motion.h1>
              <p className="text-white/80 mt-4 text-lg font-medium">Sua jornada rumo à aprovação no INSS 2026 começa aqui.</p>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 mt-12">
            {/* Subjects Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-[#0056b3] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">Disciplinas do Curso</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SUBJECTS.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => openSubject(subject)}
                    className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                  >
                    <img 
                      src={subject.bgImage} 
                      alt={subject.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#00a8ff] transition-colors">{subject.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                        <span>Acessar Conteúdo</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Complementary Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-[#ff7f50] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">Materiais Complementares</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {COMPLEMENTARY.map((material, index) => {
                  const isUnlocked = unlockedMaterials.includes(material.id);
                  return (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col"
                    >
                      <div className="h-40 relative">
                        <img 
                          src={material.bgImage} 
                          alt={material.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          {isUnlocked ? (
                            <Unlock size={48} className="text-white opacity-80" />
                          ) : (
                            <Lock size={48} className="text-white opacity-80" />
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 h-14 line-clamp-2">{material.title}</h3>
                        
                        {isUnlocked ? (
                          <button 
                            onClick={() => openSubject(material)}
                            className="w-full bg-[#28a745] text-white py-3 rounded-xl font-bold hover:bg-[#218838] transition-all flex items-center justify-center gap-2 mt-auto"
                          >
                            <CheckCircle2 size={18} />
                            Acessar Material
                          </button>
                        ) : (
                          <div className="space-y-4 mt-auto">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Código de Acesso</p>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Digite o código"
                                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00a8ff]"
                                  id={`code-${material.id}`}
                                />
                                <button 
                                  onClick={() => {
                                    const input = document.getElementById(`code-${material.id}`) as HTMLInputElement;
                                    const success = handleUnlock(material.id, input.value, material.code);
                                    if (!success) alert('Código incorreto. Tente novamente.');
                                  }}
                                  className="bg-[#0056b3] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#004494] transition-colors"
                                >
                                  Validar
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <button 
                                onClick={() => {
                                  const input = document.getElementById(`code-${material.id}`) as HTMLInputElement;
                                  const success = handleUnlock(material.id, input.value, material.code);
                                  if (!success) alert('Código incorreto. Tente novamente.');
                                }}
                                className="w-full flex items-center justify-center gap-2 text-[#0056b3] font-bold py-2 border-2 border-[#0056b3] rounded-xl hover:bg-[#0056b3] hover:text-white transition-all"
                              >
                                <ShieldCheck size={18} />
                                Desbloquear Agora
                              </button>
                              <a 
                                href={material.checkout}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#ff7f50] text-white font-bold py-3 rounded-xl hover:bg-[#e66e40] transition-all shadow-md"
                              >
                                <ExternalLink size={18} />
                                Adquirir Agora
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (view === 'subject' && selectedSubject) {
    const isSubject = 'teoria' in selectedSubject;
    const subject = selectedSubject as Subject;
    const material = selectedSubject as ComplementaryMaterial;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header onLogout={handleLogout} showLogout />
        
        <main className="flex-1 mt-20 pb-20">
          {/* Subject Header */}
          <div className="bg-[#f1f5f9] border-b border-gray-200 py-8 px-6">
            <div className="max-w-5xl mx-auto">
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-gray-500 hover:text-[#0056b3] transition-colors mb-6 font-bold uppercase text-xs tracking-widest"
              >
                <ArrowLeft size={16} />
                Voltar para o Início
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                  {selectedSubject.title}
                </h1>
                
                {isSubject && (
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => { setActiveModule('teoria'); setShowContent(false); }}
                      className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeModule === 'teoria' ? 'bg-[#0056b3] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <BookOpen size={18} />
                      Teoria
                    </button>
                    <button 
                      onClick={() => { setActiveModule('mapas'); setShowContent(false); }}
                      className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeModule === 'mapas' ? 'bg-[#0056b3] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Map size={18} />
                      Mapas Mentais
                    </button>
                    <button 
                      onClick={() => { setActiveModule('questoes'); setShowContent(false); }}
                      className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeModule === 'questoes' ? 'bg-[#0056b3] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <HelpCircle size={18} />
                      Questões
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                    {activeModule === 'teoria' ? 'Conteúdo Teórico' : 
                     activeModule === 'mapas' ? 'Mapas Mentais' : 
                     activeModule === 'questoes' ? 'Questões Gabaritadas' : 
                     'Material Complementar'}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Acesse o material completo abaixo.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowContent(true)}
                    className="flex items-center gap-2 bg-[#0056b3] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#004494] transition-all shadow-md"
                  >
                    <Eye size={20} />
                    Visualizar
                  </button>
                  <a 
                    href={getDownloadLink(isSubject ? (activeModule === 'teoria' ? subject.teoria : activeModule === 'mapas' ? subject.mapas : subject.questoes) : material.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    <Download size={20} />
                    Baixar PDF
                  </a>
                </div>
              </div>

              <div className="p-4 md:p-8 min-h-[400px] flex items-center justify-center bg-gray-50">
                <AnimatePresence mode="wait">
                  {showContent ? (
                    <motion.div 
                      key="viewer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <iframe 
                        src={convertDriveLink(isSubject ? (activeModule === 'teoria' ? subject.teoria : activeModule === 'mapas' ? subject.mapas : subject.questoes) : material.link)}
                        className="w-full h-[600px] rounded-xl border-0 shadow-inner bg-white"
                        allow="autoplay"
                      ></iframe>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="placeholder"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center max-w-sm"
                    >
                      <div className="w-20 h-20 bg-[#0056b3]/10 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Eye size={40} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Pronto para estudar?</h4>
                      <p className="text-gray-500 mb-8">Clique no botão "Visualizar" acima para carregar o material interativo.</p>
                      <button 
                        onClick={() => setShowContent(true)}
                        className="text-[#0056b3] font-bold underline underline-offset-4 hover:text-[#00a8ff] transition-colors"
                      >
                        Carregar visualizador agora
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Support Box */}
            <div className="mt-12 bg-[#fff4e5] p-8 rounded-3xl border border-[#ffe0b2] flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-[#ff7f50] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <AlertCircle size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-bold text-[#e65100] mb-1 uppercase tracking-tight">Dúvidas sobre o conteúdo?</h4>
                <p className="text-[#bf360c]">Nossa equipe pedagógica está pronta para te ajudar via WhatsApp.</p>
              </div>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-[#128C7E] transition-all shadow-xl flex items-center gap-3"
              >
                <MessageCircle size={24} />
                FALAR COM SUPORTE
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return null;
}
