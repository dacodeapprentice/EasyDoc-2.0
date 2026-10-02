import {
  ColorTheme,
  CvData,
  LetterData,
  CensusData,
  ReceiptData,
  CertificateData,
  DocumentStyle,
  LanguageCode,
} from '../types/document';

export const COLOR_THEMES: Record<string, ColorTheme> = {
  'slate-emerald': {
    id: 'slate-emerald',
    name: 'Slate & Emerald',
    primary: '#059669',
    primaryDark: '#064e3b',
    primaryLight: '#ecfdf5',
    secondary: '#0284c7',
    accent: '#0f766e',
    border: '#cbd5e1',
    textHeader: '#0f172a',
    tagColor: '#047857',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
  },
  'navy-cerulean': {
    id: 'navy-cerulean',
    name: 'Navy & Cerulean',
    primary: '#0284c7',
    primaryDark: '#0c4a6e',
    primaryLight: '#f0f9ff',
    secondary: '#059669',
    accent: '#0369a1',
    border: '#cbd5e1',
    textHeader: '#0f172a',
    tagColor: '#0284c7',
    badgeBg: '#e0f2fe',
    badgeText: '#0369a1',
  },
  'nordic-forest': {
    id: 'nordic-forest',
    name: 'Nordic Forest & Moss',
    primary: '#15803d',
    primaryDark: '#14532d',
    primaryLight: '#f0fdf4',
    secondary: '#0d9488',
    accent: '#166534',
    border: '#cbd5e1',
    textHeader: '#052e16',
    tagColor: '#15803d',
    badgeBg: '#dcfce7',
    badgeText: '#14532d',
  },
  'teal-aegean': {
    id: 'teal-aegean',
    name: 'Teal & Aegean Sea',
    primary: '#0d9488',
    primaryDark: '#134e4a',
    primaryLight: '#f0fdfa',
    secondary: '#0284c7',
    accent: '#0f766e',
    border: '#cbd5e1',
    textHeader: '#111827',
    tagColor: '#0d9488',
    badgeBg: '#ccfbf1',
    badgeText: '#115e59',
  },
  'cobalt-seafoam': {
    id: 'cobalt-seafoam',
    name: 'Cobalt & Seafoam',
    primary: '#1d4ed8',
    primaryDark: '#1e3a8a',
    primaryLight: '#eff6ff',
    secondary: '#10b981',
    accent: '#2563eb',
    border: '#cbd5e1',
    textHeader: '#0f172a',
    tagColor: '#1d4ed8',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
  },
};

export const DEFAULT_STYLE: DocumentStyle = {
  themeId: 'slate-emerald',
  fontFamily: 'source-serif',
  density: 'standard',
  headerStyle: 'left-bar',
  showWatermarkOrSeal: true,
};

export function getLocalizedCv(lang: LanguageCode): CvData {
  if (lang === 'pt') {
    return {
      fullName: 'Sofia Almeida',
      professionalTitle: 'Diretora Sénior de Projetos de Arquitetura',
      email: 's.almeida@studio-almeida.pt',
      phone: '+351 912 345 678',
      location: 'Lisboa, Portugal',
      website: 'sofiaalmeida.design',
      summary:
        'Arquiteta e diretora de projetos com mais de onze anos de experiência na liderança de empreendimentos cívicos sustentáveis e regeneração urbana. Reconhecida pelo rigor no cumprimento ambiental e pela eficiência na gestão orçamental em parcerias públicas e privadas.',
      experience: [
        {
          id: 'exp-1',
          role: 'Arquiteta Coordenadora Principal',
          company: 'Atelier Lusitano de Arquitetura e Urbanismo',
          location: 'Lisboa, Portugal',
          period: '2021 – Atual',
          highlights: [
            'Coordenação de cinco projetos municipais de habitação sustentável no valor global de 38M€.',
            'Supervisão e mentoria de uma equipa multidisciplinar de 12 arquitetos, engenheiros e especialistas BIM.',
            'Redução de 25% na pegada de carbono através do uso de madeira lamelada e materiais de baixo impacto.',
          ],
        },
        {
          id: 'exp-2',
          role: 'Arquiteta Sénior de Projetos',
          company: 'Gabinete Saraiva & Associados',
          location: 'Porto, Portugal',
          period: '2016 – 2021',
          highlights: [
            'Gestão integral de licenciamentos camarários e documentação executiva para edifícios multifamiliares.',
            'Aprovação célere de processos urbanísticos em 4 municípios sem quaisquer inconformidades.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Mestrado Integrado em Arquitetura (M.Arch), Distinção',
          institution: 'Faculdade de Arquitetura da Universidade de Lisboa (FAUL)',
          year: '2014',
          details: 'Especialização em Reabilitação Urbana Sustentável e Eficiência Energética.',
        },
      ],
      skills: [
        'Arquitetura Sustentável & Reabilitação',
        'Certificação LEED & BREEAM',
        'Modelação BIM (Revit & ArchiCAD)',
        'Licenciamento Urbanístico Municipal',
        'Gestão e Coordenação de Obras',
      ],
      languages: ['Português (Nativo)', 'Inglês (Fluente)', 'Francês (Profissional)'],
    };
  }

  if (lang === 'es') {
    return {
      fullName: 'Elena Sánchez Morales',
      professionalTitle: 'Directora Sénior de Proyectos Arquitectónicos',
      email: 'e.sanchez@estudio-sanchez.es',
      phone: '+34 912 345 678',
      location: 'Madrid, España',
      website: 'elenasanchez.design',
      summary:
        'Arquitecta con más de once años de experiencia liderando proyectos sostenibles de gran escala, equipamientos cívicos y rehabilitación urbana con altos estándares medioambientales.',
      experience: [
        {
          id: 'exp-1',
          role: 'Arquitecta Principal de Proyectos',
          company: 'Estudio de Urbanismo e Innovación',
          location: 'Madrid, España',
          period: '2021 – Actual',
          highlights: [
            'Dirección técnica de complejos residenciales bioclimáticos por valor de 40M€.',
            'Coordinación de equipos multidisciplinares de 14 especialistas e ingenieros BIM.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Máster en Arquitectura y Sostenibilidad, Matrícula de Honor',
          institution: 'Universidad Politécnica de Madrid (ETSAM)',
          year: '2014',
          details: 'Especialidad en Eficiencia Energética y Estructuras de Madera.',
        },
      ],
      skills: ['Diseño Bioclimático', 'Certificación LEED', 'Modelado BIM', 'Gestión Pública'],
      languages: ['Español (Nativo)', 'Inglés (Fluente)', 'Portugués (Competente)'],
    };
  }

  // Default English
  return {
    fullName: 'Eleanor Vance',
    professionalTitle: 'Senior Architectural Project Director',
    email: 'e.vance@studio-vance.org',
    phone: '+1 (555) 234-8910',
    location: 'Seattle, Washington',
    website: 'eleanorvance.design',
    summary:
      'Dedicated architectural project director with over eleven years of experience leading multi-disciplinary sustainable civic and commercial developments. Recognized for rigorous environmental compliance, human-centered spatial planning, and disciplined budget stewardship across public sector initiatives.',
    experience: [
      {
        id: 'exp-1',
        role: 'Principal Architectural Lead',
        company: 'Cascadia Urban Design Studio',
        location: 'Seattle, WA',
        period: '2021 – Present',
        highlights: [
          'Directed five municipal civic pavilion developments totaling $42M with net-zero carbon certification.',
          'Supervised a studio team of 14 licensed architects, BIM coordinators, and structural consultants.',
          'Reduced material waste by 28% through parametric life-cycle analysis and standardized timber fabrication.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Senior Project Architect',
        company: 'Koster & Lin Associates',
        location: 'Portland, OR',
        period: '2016 – 2021',
        highlights: [
          'Managed end-to-end design documentation and zoning entitlements for high-density mixed-use housing.',
          'Coordinated regional agency approvals with zero regulatory delays across four consecutive phases.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master of Architecture (M.Arch), Honors',
        institution: 'University of Washington, College of Built Environments',
        year: '2013',
        details: 'Focus on Sustainable Structural Systems & Adaptive Reuse. AIA Henry Adams Medal recipient.',
      },
    ],
    skills: [
      'Sustainable Civic Architecture',
      'LEED AP BD+C Certified',
      'Mass Timber & Low-Embodied Carbon',
      'BIM (Revit & Rhino/Grasshopper)',
      'Public Procurement & Contracting',
    ],
    languages: ['English (Native)', 'French (Professional Working)', 'Spanish (Conversational)'],
  };
}

export function getLocalizedLetter(lang: LanguageCode): LetterData {
  if (lang === 'pt') {
    return {
      senderName: 'Dr. Artur Mendonça',
      senderTitle: 'Diretor Clínico e Coordenador de Epidemiologia',
      senderCompany: 'Instituto de Saúde Pública e Comunitária',
      senderAddress: 'Avenida da Liberdade 450, 4.º Andar, 1250-142 Lisboa',
      senderEmail: 'a.mendonca@isp-lisboa.pt',
      senderPhone: '+351 213 456 789',
      date: '1 de Outubro de 2026',
      recipientName: 'Dra. Maria João Santos',
      recipientTitle: 'Presidente do Conselho de Administração',
      recipientCompany: 'Centro Hospitalar Universitário de Lisboa',
      recipientAddress: 'Campo de Santana 120, 1150-034 Lisboa',
      subject: 'Carta de Apresentação: Parceria Estratégica para Estudo Clínico Longitudinal (2027–2030)',
      salutation: 'Estimada Dra. Maria João Santos,',
      openingParagraph:
        'É com elevado apreço institucional que endereço a presente apresentação formal referente à proposta de colaboração em investigação clínica entre as nossas entidades. Ao longo do último ano, a nossa comissão técnica analisou os indicadores regionais de saúde e identificou uma oportunidade determinante para a otimização dos protocolos de prevenção primária.',
      bodyParagraphOne:
        'A formalização desta parceria permitirá um acompanhamento coordenado de mais de dez mil registos de doentes, alinhando a infraestrutura avançada do Centro Hospitalar com os modelos preditivos desenvolvidos no nosso Instituto.',
      bodyParagraphTwo:
        'Junto remetemos a proposta orçamental detalhada, o protocolo de conformidade com o RGPD e as garantias de confidencialidade médica aprovadas pela nossa Comissão de Ética.',
      closingParagraph:
        'Ficamos à inteira disposição para agendar uma reunião de trabalho no próximo dia 15 de Outubro para aprofundar todos os aspetos operacionais da iniciativa.',
      signoff: 'Com os melhores cumprimentos,',
      enclosureNotice: 'Anexos: (1) Protocolo de Parceria Clínica, (2) Parecer da Comissão de Ética',
    };
  }

  return {
    senderName: 'Arthur Pendelton, MD',
    senderTitle: 'Chief Medical Advisory Director',
    senderCompany: 'Institute for Community Health & Epidemiology',
    senderAddress: '450 University Boulevard, Suite 800, Boston, MA 02115',
    senderEmail: 'a.pendelton@epidemiology-boston.org',
    senderPhone: '+1 (617) 555-0142',
    date: 'October 1, 2026',
    recipientName: 'Dr. Evelyn Morales',
    recipientTitle: 'Chair of Clinical Research & Operations',
    recipientCompany: 'St. Jude Metropolitan Health System',
    recipientAddress: '1200 Healthcare Avenue, Cambridge, MA 02142',
    subject: 'Formal Letter of Presentation: Collaborative Longitudinal Healthcare Study (2027–2030)',
    salutation: 'Dear Dr. Morales,',
    openingParagraph:
      'It is with great pleasure and high professional regard that I present this introductory overview of our prospective joint clinical research initiative. Over the past six months, our clinical epidemiology steering group has reviewed institutional patient outcomes and identified key opportunities to optimize early cardiopulmonary intervention protocols across regional public clinics.',
    bodyParagraphOne:
      'Our evaluation indicates that partnering with the St. Jude clinical network will enable a structured, multi-site assessment covering an estimated twelve thousand patient records. By uniting your hospital’s advanced telemetry infrastructure with our cohort data modeling, we will establish verifiable benchmarks for patient longevity, preventative care adherence, and rapid emergency response protocols.',
    bodyParagraphTwo:
      'Enclosed with this presentation are the preliminary data privacy protocols, institutional review board (IRB) filings, and resource allocation frameworks prepared by our senior investigators. Every administrative guideline adheres strictly to the highest standards of clinical ethics, transparent data governance, and patient confidentiality.',
    closingParagraph:
      'I welcome the opportunity to convene with your senior clinical council next Tuesday, October 14th, to review the project scope in detail. Thank you for your leadership in public health excellence and for considering this meaningful partnership.',
    signoff: 'Respectfully submitted,',
    enclosureNotice: 'Enclosures: (1) Clinical Project Prospectus, (2) IRB Compliance Protocol, (3) Budget Overview',
  };
}

export function getLocalizedCensus(lang: LanguageCode): CensusData {
  if (lang === 'pt') {
    return {
      censusCode: 'CEN-2026-PT-LIS-048',
      districtRegion: 'Distrito de Lisboa, Concelho de Sintra',
      enumerationArea: 'Freguesia de Colares, Secção 14, Subseção 08',
      surveyDate: '2026-09-28',
      headOfHousehold: 'Gabriel Silveira Santos',
      residentialAddress: 'Avenida das Acácias 42, 2710-140 Sintra',
      dwellingType: 'Moradia Unifamiliar Isolada (Alvenaria e Betão)',
      tenureStatus: 'Proprietário Ocupante (Com Crédito Habitação)',
      totalRooms: 5,
      primaryWaterSource: 'Rede Pública Municipal (Água Canalizada)',
      electricityAccess: 'Rede Elétrica Nacional (Trifásica) + Painéis Solares (5 kW)',
      householdMembers: [
        {
          id: 'mem-1',
          fullName: 'Gabriel Silveira Santos',
          relationship: 'Responsável pelo Agregado',
          age: 43,
          gender: 'Masculino',
          educationLevel: 'Mestrado / Pós-Graduação',
          occupation: 'Engenheiro Civil de Estruturas',
        },
        {
          id: 'mem-2',
          fullName: 'Helena Duarte Silveira',
          relationship: 'Cônjuge',
          age: 41,
          gender: 'Feminino',
          educationLevel: 'Licenciatura em Ciências Farmacêuticas',
          occupation: 'Farmacêutica Hospitalar',
        },
        {
          id: 'mem-3',
          fullName: 'Tomás Duarte Silveira',
          relationship: 'Filho',
          age: 14,
          gender: 'Masculino',
          educationLevel: 'Ensino Básico (9.º Ano)',
          occupation: 'Estudante',
        },
      ],
      officialNotes:
        'Todos os residentes registados foram entrevistados presencialmente no domicílio. Documentação de identificação civil confirmada.',
      enumeratorName: 'Teresa Henriques (Cód. 8412-INE)',
      supervisorSignatureRef: 'Supervisor Distrital: Eng. Bernardo Castelo (VALIDADO)',
    };
  }

  return {
    censusCode: 'CEN-2026-NE-0842B',
    districtRegion: 'Northeastern Administrative District, Sector 4',
    enumerationArea: 'Ward 12, Tract 409, Block 18',
    surveyDate: '2026-09-28',
    headOfHousehold: 'Gabriel Montgomery Vance',
    residentialAddress: '742 Elmwood Meadows Way, High Valley, VT 05401',
    dwellingType: 'Single-Family Detached Residence (Wood-Frame Construction)',
    tenureStatus: 'Owner-Occupied (Mortgaged)',
    totalRooms: 6,
    primaryWaterSource: 'Municipal Piped Water (Monitored Supply)',
    electricityAccess: 'Grid Connected (3-Phase) + Roof Solar Array (6.4 kW)',
    householdMembers: [
      {
        id: 'mem-1',
        fullName: 'Gabriel Montgomery Vance',
        relationship: 'Head of Household',
        age: 44,
        gender: 'Male',
        educationLevel: 'Postgraduate / Master Degree',
        occupation: 'Civil Infrastructure Analyst',
      },
      {
        id: 'mem-2',
        fullName: 'Clara Helene Vance',
        relationship: 'Spouse',
        age: 42,
        gender: 'Female',
        educationLevel: 'Bachelor of Science (Biochemistry)',
        occupation: 'Secondary School Science Educator',
      },
      {
        id: 'mem-3',
        fullName: 'Julian Thomas Vance',
        relationship: 'Son',
        age: 15,
        gender: 'Male',
        educationLevel: 'Secondary School (Grade 10)',
        occupation: 'Student',
      },
    ],
    officialNotes:
      'All registered occupants were verified in-person. Water and sanitary connections fully compliant with municipal code.',
    enumeratorName: 'Sarah Jenkins (ID: ENUM-9021)',
    supervisorSignatureRef: 'District Supervisor: Marcus Aurelius Thorne (VERIFIED)',
  };
}

export function getLocalizedReceipt(lang: LanguageCode): ReceiptData {
  if (lang === 'pt') {
    return {
      receiptNumber: 'REC-2026-04918',
      issueDate: '2026-10-01',
      paymentMethod: 'Transferência Bancária SEPA / MB WAY',
      transactionRef: 'TRX-PT-984210385-LUS',
      businessName: 'Verdant Soluções Tecnológicas Lda.',
      businessAddress: 'Parque das Nações, Alameda dos Oceanos 41, 1990-203 Lisboa',
      businessEmail: 'contabilidade@verdantsolucoes.pt',
      businessTaxId: 'NIF: 508 192 841 / Reg. Comercial Lisboa',
      customerName: 'Dra. Inês Ferreira',
      customerCompany: 'Sistemas Sustentáveis do Atlântico S.A.',
      customerEmail: 'ines.ferreira@atlantico-sistemas.pt',
      customerAddress: 'Rua de Santa Catarina 210, 4000-442 Porto',
      items: [
        {
          id: 'item-1',
          description: 'Auditoria de Desempenho e Eficiência Energética de Edifício Comercial',
          quantity: 1,
          unitPrice: 2200.0,
          total: 2200.0,
        },
        {
          id: 'item-2',
          description: 'Sensores de Monitorização Térmica e Caudal de Ar (Pack de 4 Unidades)',
          quantity: 2,
          unitPrice: 350.0,
          total: 700.0,
        },
        {
          id: 'item-3',
          description: 'Licença Anual do Software de Calibração e Telemetria em Tempo Real',
          quantity: 1,
          unitPrice: 750.0,
          total: 750.0,
        },
      ],
      taxRatePercent: 23.0,
      discountAmount: 150.0,
      notes:
        'Pagamento liquidado na íntegra. Equipamentos com garantia legal do fabricante de 3 anos. Agradecemos a vossa preferência.',
      cashierOrAgent: 'Mariana Pires, Diretora Financeira',
    };
  }

  return {
    receiptNumber: 'RCP-2026-09418',
    issueDate: '2026-10-01',
    paymentMethod: 'Electronic Bank Wire (SEPA / Fedwire)',
    transactionRef: 'TXN-984210385-CLR',
    businessName: 'Verdant Precision Solutions LLC',
    businessAddress: '100 Meridian Commercial Boulevard, Suite 450, Denver, CO 80202',
    businessEmail: 'billing@verdantprecision.com',
    businessTaxId: 'EIN: 84-2947192',
    customerName: 'Aria Thorne',
    customerCompany: 'Highland Environmental Systems Inc.',
    customerEmail: 'athorne@highland-systems.org',
    customerAddress: '820 Aspen Crest Parkway, Boulder, CO 80301',
    items: [
      {
        id: 'item-1',
        description: 'Consulting Services: Sustainable Commercial HVAC Energy Audit',
        quantity: 1,
        unitPrice: 2450.0,
        total: 2450.0,
      },
      {
        id: 'item-2',
        description: 'Industrial Airflow Sensors (Multi-Zone Transducers, Pack of 4)',
        quantity: 3,
        unitPrice: 380.0,
        total: 1140.0,
      },
      {
        id: 'item-3',
        description: 'Telemetry Integration & Baseline Calibration Software License',
        quantity: 1,
        unitPrice: 850.0,
        total: 850.0,
      },
    ],
    taxRatePercent: 6.5,
    discountAmount: 150.0,
    notes:
      'Payment received in full. All hardware units include our comprehensive 3-year warranty. Thank you for your continued partnership.',
    cashierOrAgent: 'Elena Rostova, Chief Accounting Officer',
  };
}

export function getLocalizedCertificate(lang: LanguageCode): CertificateData {
  if (lang === 'pt') {
    return {
      certificateId: 'CERT-2026-PT-4921',
      recipientName: 'Eng.ª Genevieve Moreau',
      title: 'Certificado de Excelência Profissional',
      courseOrAchievement: 'Especialização Avançada em Infraestruturas Sustentáveis e Descarbonização',
      issuingOrganization: 'Instituto Europeu de Engenharia e Sustentabilidade',
      dateOfAward: '1 de Outubro de 2026',
      description:
        'Em formal reconhecimento pelo mérito científico e pelo sucesso demonstrado na defesa do projeto de mobilidade urbana com pegada neutra de carbono.',
      primarySignatoryName: 'Prof. Doutor Henrique Lindqvist',
      primarySignatoryTitle: 'Reitor e Diretor do Departamento de Engenharia',
      secondarySignatoryName: 'Eng.ª Margarida O’Connor',
      secondarySignatoryTitle: 'Diretora Executiva de Acreditação Profissional',
    };
  }

  return {
    certificateId: 'CERT-2026-ENV-4921',
    recipientName: 'Genevieve Moreau',
    title: 'Certificate of Professional Excellence',
    courseOrAchievement: 'Advanced Sustainable Infrastructure & Carbon Lifecycle Assessment',
    issuingOrganization: 'The Green Heritage Engineering Institute',
    dateOfAward: 'October 1, 2026',
    description:
      'In formal recognition of exceptional dedication, rigorous technical analysis, and the successful defense of the capstone project on decarbonized mass transit urban infrastructure.',
    primarySignatoryName: 'Dr. Henrik Lindqvist',
    primarySignatoryTitle: 'Dean of Engineering & Sustainable Systems',
    secondarySignatoryName: 'Margaret O’Connor, PE',
    secondarySignatoryTitle: 'Executive Director of Institutional Accreditation',
  };
}

export const DEFAULT_CV = getLocalizedCv('en');
export const DEFAULT_LETTER = getLocalizedLetter('en');
export const DEFAULT_CENSUS = getLocalizedCensus('en');
export const DEFAULT_RECEIPT = getLocalizedReceipt('en');
export const DEFAULT_CERTIFICATE = getLocalizedCertificate('en');
