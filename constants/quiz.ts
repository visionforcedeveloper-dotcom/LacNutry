export type QuizQuestionType = 'text' | 'single' | 'multiple';

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  placeholder?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é o seu nome?',
    type: 'text',
    placeholder: 'Digite seu nome',
  },
  {
    id: 2,
    question: 'Você tem intolerância à lactose?',
    type: 'single',
    options: [
      'Sim, tenho diagnóstico',
      'Não tenho',
      'Não tenho certeza',
    ],
  },
  {
    id: 3,
    question: 'Há quanto tempo você foi diagnosticado?',
    type: 'single',
    options: [
      'Menos de 6 meses',
      '6 meses a 1 ano',
      '1 a 3 anos',
      'Mais de 3 anos',
    ],
  },
  {
    id: 4,
    question: 'Quais sintomas você costuma sentir após consumir lactose?',
    type: 'multiple',
    options: [
      'Inchaço abdominal',
      'Gases',
      'Diarreia',
      'Náusea',
      'Cólicas',
      'Dor de cabeça',
    ],
  },
  {
    id: 5,
    question: 'Com que frequência você sente esses sintomas?',
    type: 'single',
    options: [
      'Diariamente',
      'Semanalmente',
      'Mensalmente',
      'Raramente',
    ],
  },
  {
    id: 6,
    question: 'Qual a intensidade dos seus sintomas?',
    type: 'single',
    options: [
      'Leve - Desconforto mínimo',
      'Moderado - Afeta minhas atividades',
      'Severo - Muito debilitante',
    ],
  },
  {
    id: 7,
    question: 'Você consome produtos com lactose atualmente?',
    type: 'single',
    options: [
      'Sim, regularmente',
      'Sim, ocasionalmente',
      'Não, evito completamente',
      'Apenas produtos sem lactose',
    ],
  },
  {
    id: 8,
    question: 'Quais são seus principais objetivos com o app?',
    type: 'multiple',
    options: [
      'Encontrar receitas sem lactose',
      'Identificar produtos seguros',
      'Aprender sobre nutrição',
      'Controlar sintomas',
      'Planejar refeições',
    ],
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
    question: 'Quais tipos de receitas você mais gosta?',
    type: 'multiple',
    options: [
      'Café da manhã',
      'Almoço/Jantar',
      'Lanches',
      'Sobremesas',
      'Bebidas',
      'Saladas',
    ],
  },
  {
    id: 14,
    question: 'Você prefere receitas:',
    type: 'single',
    options: [
      'Simples e rápidas',
      'Elaboradas e sofisticadas',
      'Tradicionais',
      'Inovadoras e criativas',
    ],
  },
  {
    id: 15,
    question: 'Quantas pessoas você costuma cozinhar?',
    type: 'single',
    options: [
      'Apenas para mim',
      '2 pessoas',
      '3-4 pessoas',
      '5 ou mais pessoas',
    ],
  },
  {
    id: 16,
    question: 'Você tem preferência por alguma culinária?',
    type: 'multiple',
    options: [
      'Brasileira',
      'Italiana',
      'Asiática',
      'Mexicana',
      'Mediterrânea',
      'Sem preferência',
    ],
  },
  {
    id: 17,
    question: 'Você costuma ler rótulos de produtos?',
    type: 'single',
    options: [
      'Sempre',
      'Frequentemente',
      'Às vezes',
      'Raramente',
      'Nunca',
    ],
  },
  {
    id: 18,
    question: 'Você já usa algum app de receitas ou nutrição?',
    type: 'single',
    options: [
      'Sim, uso regularmente',
      'Sim, mas raramente',
      'Não, este é o primeiro',
    ],
  },
  {
    id: 19,
    question: 'Como você prefere receber notificações?',
    type: 'multiple',
    options: [
      'Novas receitas',
      'Dicas nutricionais',
      'Lembretes de refeições',
      'Alertas de produtos',
      'Prefiro não receber',
    ],
  },
];
