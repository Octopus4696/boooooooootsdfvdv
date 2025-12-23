import React, { useEffect, useState } from 'react';
import { Github, Linkedin, ExternalLink, Code2, Cloud, Database, Layout, Server, Award, MapPin, Mail, Download, Phone, Sun, Moon, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Change favicon based on theme
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = darkMode ? '/favicon-light.svg' : '/favicon-dark.svg';
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message envoyé !",
        description: response.data.message,
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const frontendProjects = [
    {
      title: "Contact Form with Validation",
      description: "Formulaire de contact responsive avec validation côté client et feedback utilisateur en temps réel.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      frontendMentorLink: "https://www.frontendmentor.io/solutions/release-form-main-w-validation-bootstrap-HZjXqEjm6e",
      githubLink: "https://github.com/Isaac1h/contact-form"
    },
    {
      title: "Calculator App",
      description: "Application calculatrice avec thème personnalisable et gestion complète des opérations mathématiques.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      frontendMentorLink: "https://www.frontendmentor.io/solutions/calculator-app-release-w-boostrap-lmvhug_8h1",
      githubLink: "https://github.com/Isaac1h/Calculator-app"
    },
    {
      title: "Pricing Component with Toggle",
      description: "Composant de tarification interactif avec switch annuel/mensuel et animations fluides.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      frontendMentorLink: "https://www.frontendmentor.io/solutions/release-challenge-pricing-component-TLdcro1VST",
      githubLink: "https://github.com/Isaac1h/Pricing-component-with-toggle"
    }
  ];

  const skills = {
    frontend: [
      { name: "React", icon: Layout },
      { name: "Next.js", icon: Code2 },
      { name: "HTML5/CSS3", icon: Layout },
      { name: "JavaScript", icon: Code2 },
      { name: "Responsive Design", icon: Layout }
    ],
    backend: [
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Server },
      { name: "MongoDB", icon: Database },
      { name: "JWT Auth", icon: Server },
      { name: "REST APIs", icon: Server }
    ],
    tools: [
      { name: "Docker", icon: Cloud },
      { name: "Git/GitLab", icon: Code2 },
      { name: "CI/CD", icon: Cloud },
      { name: "Agile Scrum", icon: Layout },
      { name: "AWS (en cours)", icon: Cloud }
    ]
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-[#0a0e27] via-[#0f1419] to-[#0a0e27] text-gray-100' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? darkMode 
            ? 'bg-[#0a0e27]/95 backdrop-blur-md shadow-lg shadow-cyan-500/5' 
            : 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#hero" className={`text-2xl font-bold ${darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'} transition-colors`}>
              IH
            </a>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('hero')} className={`${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'} transition-colors`}>
                Accueil
              </button>
              <button onClick={() => scrollToSection('projects')} className={`${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'} transition-colors`}>
                Projets
              </button>
              <button onClick={() => scrollToSection('cloud')} className={`${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'} transition-colors`}>
                Cloud & DevOps
              </button>
              <button onClick={() => scrollToSection('skills')} className={`${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'} transition-colors`}>
                Compétences
              </button>
              <button onClick={() => scrollToSection('contact')} className={`${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'} transition-colors`}>
                Contact
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="https://github.com/Isaac1h" target="_blank" rel="noopener noreferrer" 
                 className={`${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-700'} transition-colors`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/isaac-hassani/" target="_blank" rel="noopener noreferrer"
                 className={`${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-700'} transition-colors`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <img 
                  src="https://customer-assets.emergentagent.com/job_cloud-ready-dev/artifacts/ebjplf1s_image.png" 
                  alt="Isaac Hassani"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left max-w-2xl">
              <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-cyan-400 text-sm font-medium">Disponible dès Octobre 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Isaac Hassani
              </h1>
              <h2 className={`text-2xl md:text-4xl font-semibold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Développeur Full Stack
              </h2>
              <p className={`text-xl mb-8 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Développeur Full Stack avec une vision Cloud/DevOps. 
                Actuellement en Bachelor Systèmes d'Information, je conçois des architectures robustes et scalables.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <Button 
                  onClick={() => scrollToSection('projects')} 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                >
                  Voir mes projets
                </Button>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg rounded-lg transition-all"
                >
                  Me contacter
                </Button>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Toulouse, France</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Star Project - H Propreté */}
      <section id="projects" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-4">Projet Principal</Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Projet Phare</h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              La preuve de ma compétence niveau confirmé
            </p>
          </div>

          <Card className={`${darkMode ? 'bg-gradient-to-br from-[#1a1f35] to-[#161b22] border-cyan-500/20' : 'bg-white border-gray-200'} shadow-2xl overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-64 h-64 ${darkMode ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-3xl`}></div>
            <CardHeader className="relative">
              <div className="flex items-start justify-between mb-4">
                <CardTitle className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Application Métier H Propreté
                </CardTitle>
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">En cours</Badge>
              </div>
              <CardDescription className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Digitalisation complète de la gestion d'une entreprise de nettoyage
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="prose prose-invert max-w-none">
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>Contexte & Enjeux</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Je conçois et développe de A à Z une application métier complète qui permettra la gestion 
                  intégrale d'une entreprise de nettoyage : planning en temps réel, gestion RH, suivi des 
                  interventions, et tableau de bord analytique pour la direction.
                </p>

                <h3 className={`text-xl font-semibold mb-3 mt-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>Architecture & Responsabilités</h3>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Conception architecture complète :</strong> Design de l'architecture système, modélisation de la base de données, et choix des technologies</li>
                  <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Authentification complexe :</strong> Implémentation JWT avec gestion de rôles avancée (Admin/User) et sécurisation des routes</li>
                  <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Fonctionnalités critiques :</strong> Planning temps réel avec drag-and-drop, gestion RH complète (contrats, absences, congés), suivi des interventions</li>
                  <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Méthodologie Agile :</strong> Sprints Scrum, CI/CD sur GitLab, déploiement containerisé avec Docker</li>
                </ul>

                <div className="mt-6">
                  <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Stack Technique</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'GitLab CI/CD', 'JWT'].map((tech) => (
                      <Badge key={tech} className={`px-3 py-1 ${darkMode ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' : 'bg-cyan-100 text-cyan-800 border-cyan-300'}`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 p-4 border rounded-lg ${darkMode ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-cyan-50 border-cyan-300'}`}>
                  <p className={`text-sm ${darkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>
                    💡 <strong>Impact :</strong> Cette expérience en alternance me permettra d'acquérir une expertise niveau Bac+5, 
                    en développant une solution complète de la conception à la mise en production.
                  </p>
                </div>

                <div className="mt-6">
                  <a 
                    href="https://customer-assets.emergentagent.com/job_cloud-ready-dev/artifacts/a7mnc1l1_Fiche%20de%20Poste%20%E2%80%93%20Apprenti%20D%C3%A9veloppeur%20Web.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Fiche_de_Poste_Apprenti_Developpeur_Web.pdf"
                  >
                    <Button 
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger la fiche de poste
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Frontend Mentor Section */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-[#0f1419]/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 mb-4">Intégration & UI</Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Maîtrise Frontend Mentor</h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Capable de transformer n'importe quelle maquette en code propre et maintenable
            </p>
          </div>

          <div className={`mb-8 p-6 border rounded-lg ${darkMode ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300'}`}>
            <div className="flex items-start gap-4">
              <Code2 className={`w-8 h-8 flex-shrink-0 mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} />
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Développement de compétences Frontend</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Frontend Mentor me permet d'affiner mes compétences en responsive design et architecture modulaire. 
                  Chaque projet démontre ma capacité à respecter fidèlement les maquettes avec un code maintenable et performant. 
                  Je compte poursuivre ces défis pour rester aligné avec les standards du développement frontend moderne.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {frontendProjects.map((project, index) => (
              <Card key={index} className={`${darkMode ? 'bg-[#1a1f35] border-gray-800 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-500'} transition-all duration-300 hover:shadow-lg group flex flex-col`}>
                <CardHeader className="flex-grow">
                  <CardTitle className={`text-xl transition-colors ${darkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-700'}`}>
                    {project.title}
                  </CardTitle>
                  <CardDescription className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a 
                      href={project.frontendMentorLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`w-full justify-center ${darkMode ? 'border-blue-500/50 text-blue-400 hover:bg-blue-500/10' : 'border-blue-500 text-blue-700 hover:bg-blue-50'}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Solution
                      </Button>
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`w-full justify-center ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'}`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="https://www.frontendmentor.io/profile/Isaac1h" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all hover:scale-105">
                Voir mon profil Frontend Mentor
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Cloud & DevOps Section */}
      <section id="cloud" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">Évolution</Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Objectif Cloud & DevOps</h2>
          </div>

          <Card className={`shadow-2xl ${darkMode ? 'bg-gradient-to-br from-[#1a1f35] to-[#161b22] border-green-500/20' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Cloud className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    La double compétence Dev & Ops
                  </h3>
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Je ne suis pas seulement un développeur d'application, je me forme activement à l'infrastructure 
                    qui les héberge. Ma vision : maîtriser l'ensemble du cycle de vie d'une application, du développement 
                    au déploiement en production.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}><strong className={darkMode ? 'text-white' : 'text-gray-900'}>En cours :</strong> Préparation active de la certification AWS Cloud Practitioner</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Objectif :</strong> Déployer des architectures cloud scalables et sécurisées</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Vision :</strong> DevOps Engineer avec expertise Full Stack</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2 text-base">
                      <Award className="w-4 h-4 mr-2 inline" />
                      AWS Cloud Practitioner (en révision)
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-16 px-6 ${darkMode ? 'bg-[#0f1419]/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Compétences Techniques</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stack complète pour développer des applications modernes et performantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`${darkMode ? 'bg-[#1a1f35] border-cyan-500/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  <Layout className="w-6 h-6" />
                  Front-End
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skills.frontend.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className={`flex items-center gap-3 transition-colors ${darkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-700'}`}>
                        <Icon className="w-5 h-5" />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-[#1a1f35] border-blue-500/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  <Server className="w-6 h-6" />
                  Back-End
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skills.backend.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className={`flex items-center gap-3 transition-colors ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}`}>
                        <Icon className="w-5 h-5" />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-[#1a1f35] border-green-500/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  <Cloud className="w-6 h-6" />
                  Cloud & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skills.tools.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className={`flex items-center gap-3 transition-colors ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-700'}`}>
                        <Icon className="w-5 h-5" />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className={`inline-block ${darkMode ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300'}`}>
              <CardContent className="p-6">
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={darkMode ? 'text-white' : 'text-gray-900'}>Profil :</strong> En cours de Bachelor SI, 
                  <strong className={darkMode ? 'text-cyan-400' : 'text-cyan-700'}> Confirmé par la pratique</strong> grâce à un projet d'envergure en alternance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Restons en Contact</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Disponible pour discuter de vos projets et opportunités
            </p>
          </div>

          <Card className={`${darkMode ? 'bg-[#1a1f35] border-cyan-500/20' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${darkMode ? 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10' : 'bg-cyan-50 border-cyan-300 hover:bg-cyan-100'}`}>
                  <Mail className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <a href="mailto:isaac.hassani@limayrac.fr" className={`text-lg transition-colors ${darkMode ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-cyan-700'}`}>
                      isaac.hassani@limayrac.fr
                    </a>
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${darkMode ? 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10' : 'bg-cyan-50 border-cyan-300 hover:bg-cyan-100'}`}>
                  <Phone className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Téléphone</p>
                    <a href="tel:+33764540460" className={`text-lg transition-colors ${darkMode ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-cyan-700'}`}>
                      07 64 54 04 60
                    </a>
                  </div>
                </div>

                <div className={`pt-6 ${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
                  <p className={`mb-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Retrouvez-moi également sur</p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="https://github.com/Isaac1h" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      <Github className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} />
                      <span className={`transition-colors ${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/isaac-hassani/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all group"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                      <span className="text-white">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className={`mt-8 ${darkMode ? 'bg-[#1a1f35] border-cyan-500/20' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`text-2xl flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Send className="w-6 h-6" />
                Envoyez-moi un message
              </CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Nom complet <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message ici..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-lg rounded-lg shadow-lg shadow-cyan-600/20 transition-all hover:shadow-cyan-600/40"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Toaster />

      {/* Footer */}
      <footer className={`py-8 px-6 ${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
        <div className="container mx-auto text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 Isaac Hassani. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;