export type QuizQuestionType = 'text' | 'single' | 'multiple' | 'info';

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  placeholder?: string;
  subtitle?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'O LacNutry vai te ajudar!',
    subtitle: 'Com receitas personalizadas e planejamento inteligente, você terá uma vida sem desconfortos.',
    type: 'info',
  },
  {
    id: 2,
    question: 'Qual é o seu nome?',
    type: 'text',
    placeholder: 'Digite seu nome',
  },
  {
    id: 5,
    question: 'Você tem intolerância à lactose?',
    type: 'single',
    options: [
      'Sim, tenho diagnóstico médico',
      'Suspeito que tenho',
      'Não tenho',
      'Não tenho certeza',
    ],
  },
  {
    id: 6,
    question: 'Há quanto tempo você foi diagnosticado?',
    type: 'single',
    options: [
      'Menos de 6 meses',
      '6 meses a 1 ano',
      '1 a 3 anos',
      'Mais de 3 anos',
      'Ainda não fui diagnosticado',
    ],
  },
  {
    id: 7,
    question: 'Quais sintomas você costuma sentir após consumir lactose?',
    type: 'multiple',
    options: [
      'Inchaço abdominal',
      'Gases',
      'Diarreia',
      'Náusea',
      'Cólicas',
      'Dor de cabeça',
      'Não sinto sintomas',
    ],
  },
  {
    id: 8,
    question: 'Como você descreveria sua dieta atual?',
    type: 'single',
    options: [
      'Como de tudo',
      'Evito laticínios',
      'Apenas produtos sem lactose',
      'Baseada em plantas',
    ],
  },
  {
    id: 9,
    question: 'Quais são suas maiores dificuldades com a alimentação?',
    type: 'multiple',
    options: [
      'Encontrar receitas adequadas',
      'Planejar refeições',
      'Ler rótulos',
      'Comer fora de casa',
      'Falta de variedade',
    ],
  },
  {
    id: 10,
    question: 'Transforme sua alimentação',
    subtitle: 'Descubra centenas de receitas deliciosas e aprenda a fazer escolhas inteligentes em qualquer situação.',
    type: 'info',
  },
  {
    id: 11,
    question: 'O que você espera alcançar com o LacNutry?',
    type: 'multiple',
    options: [
      'Reduzir sintomas',
      'Descobrir novas receitas',
      'Planejar refeições',
      'Aprender sobre nutrição',
      'Melhorar minha saúde',
      'Economizar tempo',
    ],
  },
  {
    id: 12,
    question: 'O que mais te motiva a cuidar da sua alimentação?',
    type: 'multiple',
    options: [
      'Saúde e bem-estar',
      'Viver sem desconfortos',
      'Ter mais energia',
      'Qualidade de vida',
      'Cuidar da família',
      'Ganhar confiança',
    ],
  },
  {
    id: 13,
    question: 'Você não está sozinho',
    subtitle: 'Milhões de pessoas vivem com intolerância à lactose. Com as ferramentas certas, você pode ter uma vida plena e saudável.',
    type: 'info',
  },
  {
    id: 14,
    question: 'Você tem outras restrições alimentares?',
    type: 'multiple',
    options: [
      'Intolerância ao glúten',
      'Alergia a nozes',
      'Vegetariano',
      'Vegano',
      'Diabetes',
      'Nenhuma outra',
    ],
  },
  {
    id: 15,
    question: 'Com que frequência você cozinha em casa?',
    type: 'single',
    options: [
      'Todos os dias',
      '3-5 vezes por semana',
      '1-2 vezes por semana',
      'Raramente',
    ],
  },
  {
    id: 16,
    question: 'Qual seu nível de experiência na cozinha?',
    type: 'single',
    options: [
      'Iniciante',
      'Intermediário',
      'Avançado',
      'Chef profissional',
    ],
  },
  {
    id: 17,
    question: 'Quanto tempo você tem disponível para cozinhar?',
    type: 'single',
    options: [
      'Menos de 15 minutos',
      '15-30 minutos',
      '30-60 minutos',
      'Mais de 1 hora',
    ],
  },
  {
    id: 20,
    question: 'Qual é a sua idade?',
    type: 'text',
    placeholder: '55',
  },
  {
    id: 21,
    question: 'Qual é o seu gênero?',
    type: 'single',
    options: [
      'Masculino',
      'Feminino',
      'Outro',
      'Prefiro não dizer',
    ],
  },
  {
    id: 22,
    question: 'Qual é a sua altura? (em cm)',
    type: 'text',
    placeholder: '52',
  },
  {
    id: 23,
    question: 'Qual é o seu peso? (em kg)',
    type: 'text',
    placeholder: '55',
  },
  {
    id: 25,
    question: 'Qual é o seu principal objetivo?',
    type: 'single',
    options: [
      'Manter peso atual',
      'Perder peso',
      'Ganhar peso',
      'Ganhar massa muscular',
      'Melhorar saúde geral',
    ],
  },
];
