import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function patchLangSwitch(html, active) {
  return html.replace(
    /<nav class="lang-switch en" aria-label="Language">[\s\S]*?<\/nav>/,
    `<nav class="lang-switch en" aria-label="Language">
                <a href="index.html"${active === 'ko' ? ' class="is--on"' : ''}>KO</a>
                <span>|</span>
                <a href="index-en.html"${active === 'en' ? ' class="is--on"' : ''}>EN</a>
                <span>|</span>
                <a href="index-es.html"${active === 'es' ? ' class="is--on"' : ''}>ES</a>
            </nav>`
  );
}

function ensureSiteMapOpen(html) {
  return html.replace('<div class="site-map">', '<div class="site-map is--on">')
    .replace('<motion.div class="site-map">', '<div class="site-map is--on">')
    .replace('<motion.div class="site-map is--on">', '<motion.div class="site-map is--on">'.replace('motion.', ''));
}

// KO
let ko = readFileSync(path.join(root, 'index.html'), 'utf8');
ko = ensureSiteMapOpen(ko);
ko = patchLangSwitch(ko, 'ko');
writeFileSync(path.join(root, 'index.html'), ko, 'utf8');

// EN
let en = readFileSync(path.join(root, 'index-en.html'), 'utf8');
en = ensureSiteMapOpen(en);
en = patchLangSwitch(en, 'en');
writeFileSync(path.join(root, 'index-en.html'), en, 'utf8');

// ES from EN
let es = en;
es = es.replace('<html lang="en">', '<html lang="es">');
es = es.replace('<title>2026 Portfolio | Hye-Young Kim</title>', '<title>2026 Portfolio | Hye-Young Kim</title>');
es = patchLangSwitch(es, 'es');

const esTranslations = [
  ['From smart factory manufacturing to public-sector systems and senior-care platforms, I lead every phase from planning through operations as an execution-focused project manager.', 'Desde la manufactura de fábrica inteligente hasta los sistemas del sector público y plataformas de cuidado senior, lidero cada fase desde la planificación hasta la operación como gerente de proyectos orientada a la ejecución.'],
  ['I turn complex technology into services that fit naturally into everyday life, building solutions that connect people and data.', 'Transformo la tecnología compleja en servicios que encajan de forma natural en la vida cotidiana, creando soluciones que conectan personas y datos.'],
  ['Everything I have done so far is the launchpad for the next innovation.', 'Todo lo que he hecho hasta ahora es el punto de partida para la próxima innovación.'],
  ['A project manager who understands the field, <br>a strategist who solves problems.', 'Project manager que conoce el terreno,<br>estratega que resuelve problemas.'],
  ['Public Sector Integrated Monitoring System', 'Sistema Integrado de Monitoreo del Sector Público'],
  ['Smart Factory Advancement', 'Avance de Fábrica Inteligente'],
  ['Public Agency Website Renewal', 'Renovación de Sitio Web de Agencia Pública'],
  ['Deliverables', 'Entregables'],
  ['Hello', 'Hola'],
  ['I am Hye-Young Kim, and I genuinely enjoy working with others.', 'Soy Hye-Young Kim y disfruto genuinamente trabajar con otras personas.'],
  ['I am ambitious, persistent, and always ready to take on new challenges.', 'Soy ambiciosa, persistente y siempre dispuesta a asumir nuevos desafíos.'],
  ['When a field catches my interest, I dive in immediately and keep learning until I truly make it my own.', 'Cuando un campo despierta mi interés, me sumerjo de inmediato y sigo aprendiendo hasta hacerlo realmente mío.'],
  ['In every role, even for small tasks, I take ownership and aim to deliver accurate results without cutting corners.', 'En cada rol, incluso en tareas pequeñas, asumo la responsabilidad y busco resultados precisos sin tomar atajos.'],
  ['Outgoing and collaborative by nature, I strive to bring positive energy to teams while treating others with care and respect.', 'Extrovertida y colaborativa por naturaleza, aporto energía positiva al equipo y trato a los demás con cuidado y respeto.'],
  ['I want to be someone teammates enjoy working with and who becomes indispensable to the organization.', 'Quiero ser alguien con quien el equipo disfrute trabajar y que se vuelva indispensable para la organización.'],
  ['Strengths & Weaknesses', 'Fortalezas y Debilidades'],
  ['My strengths are attention to detail, drive, and fearlessness when learning something new.', 'Mis fortalezas son la atención al detalle, la determinación y la valentía al aprender algo nuevo.'],
  ['I seek out new challenges often, which helps me adapt quickly to unfamiliar environments.', 'Busco nuevos desafíos con frecuencia, lo que me ayuda a adaptarme rápidamente a entornos desconocidos.'],
  ['I also take detailed notes, which helps me retain information others might forget.', 'También tomo notas detalladas, lo que me ayuda a retener información que otros podrían olvidar.'],
  ['My weakness is that I can lose momentum when I do not have a clear plan or goal.', 'Mi debilidad es que puedo perder impulso cuando no tengo un plan o meta clara.'],
  ['To counter that, I set detailed plans and keep challenging myself to stay focused.', 'Para contrarrestarlo, establezco planes detallados y sigo desafiándome para mantener el enfoque.'],
  ['I will use every strength I have to keep learning deeply in whatever area the team needs.', 'Usaré todas mis fortalezas para seguir aprendiendo profundamente en el área que el equipo necesite.'],
  ['Career Goals', 'Objetivos Profesionales'],
  ['If the company needs a new capability, I want to be the kind of person who keeps studying and stepping up.', 'Si la empresa necesita una nueva capacidad, quiero ser quien siga estudiando y dando un paso adelante.'],
  ['Because I enjoy analyzing and learning, new responsibilities do not intimidate me.', 'Como disfruto analizar y aprender, las nuevas responsabilidades no me intimidan.'],
  ['I adapt well to new environments and hope to create positive synergy with colleagues.', 'Me adapto bien a nuevos entornos y espero crear sinergia positiva con mis colegas.'],
  ['I will keep learning and growing as a professional.', 'Seguiré aprendiendo y creciendo como profesional.'],
  ['Thank you.', 'Gracias.'],
  ['"Good planning starts with a flow that anyone can understand."', '"La buena planificación comienza con un flujo que cualquiera puede entender."'],
  ['Role', 'Rol'],
  ['Key Responsibilities', 'Responsabilidades Clave'],
  ['Key Achievements', 'Logros Clave'],
  ['Achievements', 'Logros'],
  ['Links', 'Enlaces'],
  ['Project Manager (PM)', 'Gerente de Proyecto (PM)'],
  ['IT Planning & Project Management PM', 'PM de Planificación IT y Gestión de Proyectos'],
  ['UX Planner', 'Planificadora UX'],
  ['Founder & CEO (GigCareer / D-GIG)', 'Fundadora y CEO (GigCareer / D-GIG)'],
  ['Defined business strategy and vision; led the D-GIG local gig platform end to end', 'Definí la estrategia y visión del negocio; lideré la plataforma D-GIG de principio a fin'],
  ['Investor relations, pitching, and business/revenue model design', 'Relaciones con inversionistas, pitching y diseño del modelo de negocio e ingresos'],
  ['Designed IA and screens; built the B2B site directly', 'Diseñé la IA y pantallas; construí directamente el sitio B2B'],
  ['Planned and built an MVP for LER verification and automated portfolios', 'Planifiqué y desarrollé un MVP para verificación LER y portafolios automatizados'],
  ['Designed role-based MVP demo flows and implemented a React demo', 'Diseñé flujos demo MVP por roles e implementé una demo en React'],
  ['Planned labor-market insight reports and deployed gigcareer.kr', 'Planifiqué informes de mercado laboral y desplegué gigcareer.kr'],
  ['Structured regional mismatch into Local Gig → LER → Global Match', 'Estructuré el desajuste regional en Local Gig → LER → Global Match'],
  ['Solo founder oversight across business, technology, and investor communication', 'Supervisión integral como fundadora sola en negocio, tecnología e inversores'],
  ['Independently completed a Local Crew MVP demo with role-based dashboards', 'Completé de forma independiente una demo MVP de Local Crew con dashboards por roles'],
  ['Built and deployed the business site, experience pages, and demo on gigcareer.kr', 'Construí y desplegué el sitio, páginas de experiencia y demo en gigcareer.kr'],
  ['Business Site', 'Sitio del Negocio'],
  ['Experience & Demo', 'Experiencia y Demo'],
  ['GigCareer main', 'GigCareer principal'],
  ['GigCareer main landing', 'Landing principal de GigCareer'],
  ['D-GIG service overview', 'Resumen del servicio D-GIG'],
  ['Local Crew experience', 'Experiencia Local Crew'],
  ['Local Crew MVP demo', 'Demo MVP Local Crew'],
  ['Planned and managed an elderly care monitoring platform for municipal welfare officers', 'Planifiqué y gestioné una plataforma de monitoreo de cuidado senior para funcionarios municipales'],
  ['Designed integration architecture for IoT sensors, AI cameras, and voice detection devices', 'Diseñé la arquitectura de integración para sensores IoT, cámaras AI y dispositivos de voz'],
  ['Planned real-time data integration APIs', 'Planifiqué APIs de integración de datos en tiempo real'],
  ['Created dashboard UI/UX proposals by user type', 'Creé propuestas de UI/UX de dashboard por tipo de usuario'],
  ['Designed senior-care risk scoring algorithms and Excel models', 'Diseñé algoritmos de riesgo en cuidado senior y modelos Excel'],
  ['Proposed and implemented admin alerts and reminder features', 'Propuse e implementé alertas administrativas y recordatorios'],
  ['Implemented real-time monitoring to detect seniors at risk early', 'Implementé monitoreo en tiempo real para detectar seniors en riesgo temprano'],
  ['Coordinated communication between internal developers and external agencies/vendors', 'Coordiné la comunicación entre desarrolladores internos y agencias/proveedores externos'],
  ['Planned MES upgrades and IoT equipment automation requirements', 'Planifiqué mejoras MES y requisitos de automatización IoT'],
  ['Designed data structures for process KPIs such as uptime and defect rate', 'Diseñé estructuras de datos para KPIs de proceso como uptime y tasa de defectos'],
  ['Prepared deliverables for government smart-factory programs (execution plans, final reports, etc.)', 'Preparé entregables para programas gubernamentales de fábrica inteligente (planes, informes finales, etc.)'],
  ['Designed process flows from data collection to visualization and admin alerts', 'Diseñé flujos desde recolección de datos hasta visualización y alertas admin'],
  ['Managed interim and final documentation for government evaluations', 'Gestioné documentación intermedia y final para evaluaciones gubernamentales'],
  ['Built and upgraded foundational Smart HACCP systems.', 'Construí y mejoré sistemas Smart HACCP fundamentales.'],
  ['Implemented automated process data capture and alarm management.', 'Implementé captura automática de datos de proceso y gestión de alarmas.'],
  ['Designed real-time productivity and quality dashboards', 'Diseñé dashboards de productividad y calidad en tiempo real'],
  ['Built real-time production quantity and weight management by process', 'Construí gestión en tiempo real de cantidad y peso de producción por proceso'],
  ['Reduced defect rates through process-based quality control', 'Reduje tasas de defectos mediante control de calidad basado en procesos'],
  ['Built AI-based predictive maintenance for packaging equipment', 'Construí mantenimiento predictivo con IA para equipos de empaque'],
  ['Designed integrated MES and ERP management systems', 'Diseñé sistemas integrados de gestión MES y ERP'],
  ['Restructured information architecture for EPIK, NIIED, and municipal websites', 'Reestructuré la arquitectura de información para EPIK, NIIED y sitios municipales'],
  ['Consolidated overly fragmented menu structures', 'Consolidé estructuras de menú excesivamente fragmentadas'],
  ['Proposed citizen-centric card layouts focused on user goals', 'Propuse diseños de tarjetas centrados en el ciudadano y sus objetivos'],
  ['Defined base page structures and screen specifications', 'Definí estructuras base de páginas y especificaciones de pantalla'],
  ['Analysis document organizing features, menu structures, and service flows of the existing system.', 'Documento de análisis que organiza funciones, menús y flujos del sistema existente.'],
  ['Structured core features by phase including login, unified alerts, activity logs, and system admin.', 'Estructuré funciones clave por fases: login, alertas unificadas, registros y administración.'],
  ['R&D Project Plan', 'Plan de Proyecto I+D'],
  ['Planned and built an MVP prototype for LER (Learning & Employment Records) verification and portfolio automation', 'Planifiqué y desarrollé un prototipo MVP para verificación LER y automatización de portafolios'],
  ['READ MORE', 'VER MÁS'],
  ['scroll-down', 'desplazar'],
  ['Profile', 'Perfil'],
];

// Sort by length descending to avoid partial replacements
esTranslations.sort((a, b) => b[0].length - a[0].length);
for (const [from, to] of esTranslations) es = es.split(from).join(to);

writeFileSync(path.join(root, 'index-es.html'), es, 'utf8');
writeFileSync(path.join(root, '2026 HY KIM PORTFOLIO V.3.0.html'), readFileSync(path.join(root, 'index.html'), 'utf8'), 'utf8');
console.log('languages ready');
