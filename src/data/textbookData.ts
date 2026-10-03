import { Lesson, BasicStroke, ToneMark, QuizQuestion } from '../types';

export const BASIC_STROKES: BasicStroke[] = [
  {
    id: 'net-ngang',
    name: 'Nét ngang',
    symbol: '—',
    description: 'Nét thẳng nằm ngang từ trái sang phải.',
    instruction: 'Đặt bút từ bên trái, rê bút đều tay thẳng sang bên phải, dừng bút.',
    svgPath: 'M 30 70 L 170 70',
  },
  {
    id: 'net-so',
    name: 'Nét sổ',
    symbol: '|',
    description: 'Nét thẳng đứng kéo từ trên xuống dưới.',
    instruction: 'Đặt bút ở đường kẻ ngang trên, kéo thẳng đứng xuống dưới theo đường kẻ dọc, dừng bút.',
    svgPath: 'M 100 20 L 100 160',
  },
  {
    id: 'net-xien-phai',
    name: 'Nét xiên phải',
    symbol: '/',
    description: 'Nét nghiêng kéo từ góc trên bên phải chéo xuống trái.',
    instruction: 'Đặt bút ở phía trên bên phải, kéo một nét xiên đều tay xuống góc dưới bên trái.',
    svgPath: 'M 150 30 L 50 160',
  },
  {
    id: 'net-xien-trai',
    name: 'Nét xiên trái',
    symbol: '\\',
    description: 'Nét nghiêng kéo từ góc trên bên trái chéo xuống phải.',
    instruction: 'Đặt bút ở phía trên bên trái, kéo một nét xiên đều tay xuống góc dưới bên phải.',
    svgPath: 'M 50 30 L 150 160',
  },
  {
    id: 'net-moc-xuoi',
    name: 'Nét móc xuôi',
    symbol: '╭|',
    description: 'Uốn cong tròn ở trên rồi kéo thẳng đứng xuống.',
    instruction: 'Đặt bút hơi uốn cong lên trên sang phải, sau đó kéo thẳng đứng xuống dòng kẻ đáy.',
    svgPath: 'M 60 70 C 60 30, 110 30, 110 70 L 110 160',
  },
  {
    id: 'net-moc-nguoc',
    name: 'Nét móc ngược',
    symbol: '|╯',
    description: 'Kéo thẳng từ trên xuống rồi uốn cong móc lên bên phải.',
    instruction: 'Kéo nét thẳng từ trên xuống gần dòng kẻ đáy thì lượn cong tròn móc lên sang phải.',
    svgPath: 'M 70 30 L 70 130 C 70 160, 120 160, 120 120',
  },
  {
    id: 'net-moc-hai-dau',
    name: 'Nét móc hai đầu',
    symbol: '╭|╯',
    description: 'Kết hợp nét móc xuôi ở trên và nét móc ngược ở dưới.',
    instruction: 'Uốn cong móc xuôi ở đỉnh, kéo thẳng giữa rồi uốn cong móc ngược lên bên phải.',
    svgPath: 'M 60 60 C 60 30, 95 30, 95 65 L 95 125 C 95 160, 130 160, 130 125',
  },
  {
    id: 'net-cong-ho-phai',
    name: 'Nét cong hở phải',
    symbol: 'C',
    description: 'Lượn cong như chữ C, hở về phía bên phải.',
    instruction: 'Đặt bút dưới dòng kẻ trên, lượn cong sang trái, chạm dòng kẻ dưới rồi cong hếch lên.',
    svgPath: 'M 130 45 C 80 40, 50 70, 50 100 C 50 130, 80 160, 130 155',
  },
  {
    id: 'net-cong-ho-trai',
    name: 'Nét cong hở trái',
    symbol: 'Ɔ',
    description: 'Lượn cong ngược chữ C, hở về phía bên trái.',
    instruction: 'Đặt bút dưới dòng kẻ trên, lượn cong sang phải, chạm dòng kẻ dưới rồi uốn nhẹ lên.',
    svgPath: 'M 70 45 C 120 40, 150 70, 150 100 C 150 130, 120 160, 70 155',
  },
  {
    id: 'net-cong-kin',
    name: 'Nét cong kín',
    symbol: 'O',
    description: 'Lượn tròn khép kín như quả trứng hay chữ O.',
    instruction: 'Đặt bút dưới dòng kẻ trên, lượn tròn sang trái, xuống đáy rồi lượn lên khép kín điểm bắt đầu.',
    svgPath: 'M 100 35 C 60 35, 50 80, 50 100 C 50 120, 60 165, 100 165 C 140 165, 150 120, 150 100 C 150 80, 140 35, 100 35 Z',
  },
  {
    id: 'net-khuyet-tren',
    name: 'Nét khuyết trên',
    symbol: 'ʃ',
    description: 'Nét đưa lên cao 5 ô ly (dùng trong chữ l, b, h, k).',
    instruction: 'Đặt bút từ giữa dòng, đưa chéo lên cao, lượn cong tròn đỉnh rồi kéo thẳng đứng xuống.',
    svgPath: 'M 70 130 L 105 50 C 115 25, 125 35, 125 55 L 125 160',
  },
  {
    id: 'net-khuyet-duoi',
    name: 'Nét khuyết dưới',
    symbol: 'ʅ',
    description: 'Kéo sâu xuống dưới dòng kẻ 3 ô ly rồi vòng lên (g, y).',
    instruction: 'Kéo thẳng từ trên xuống sâu dưới dòng kẻ, lượn tròn đáy rồi hất chéo lên cắt nét thẳng.',
    svgPath: 'M 90 30 L 90 140 C 90 170, 65 170, 65 150 L 125 100',
  },
];

export const TONE_MARKS: ToneMark[] = [
  {
    id: 'thanh-huyen',
    name: 'Dấu huyền',
    symbol: '`',
    sample: 'bà',
    explanation: 'Giọng trầm và êm dịu, đánh từ trái trên xuôi xuống phải: ba + huyền = bà.',
  },
  {
    id: 'thanh-sac',
    name: 'Dấu sắc',
    symbol: '´',
    sample: 'cá',
    explanation: 'Giọng vút lên cao, nét xiên từ dưới chếch lên trên: ca + sắc = cá.',
  },
  {
    id: 'thanh-hoi',
    name: 'Dấu hỏi',
    symbol: '?',
    sample: 'cỏ',
    explanation: 'Giọng lượn xuống rồi hơi nhấc lên: co + hỏi = cỏ.',
  },
  {
    id: 'thanh-nga',
    name: 'Dấu ngã',
    symbol: '~',
    sample: 'đỡ',
    explanation: 'Giọng gợn sóng ngân vang, hơi gãy ở giữa: đơ + ngã = đỡ.',
  },
  {
    id: 'thanh-nang',
    name: 'Dấu nặng',
    symbol: '.',
    sample: 'bộ',
    explanation: 'Giọng ngắn và dứt khoát, đặt một chấm tròn dưới âm chính: bô + nặng = bộ.',
  },
];

export const TEXTBOOK_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Bài 1: A a',
    letters: ['A', 'a'],
    pageNumber: 14,
    theme: 'Chào hỏi & Ca hát',
    recognition: {
      sentence: 'Nam và Hà ca hát.',
      targetWords: ['Nam', 'Hà', 'ca', 'hát'],
      description: 'Hai bạn Nam và Hà cùng nhau múa hát vui vẻ dưới ánh mặt trời rực rỡ.',
      characterScene: 'nam-ha-singing',
    },
    phonics: [
      {
        initial: 'a',
        rhyme: '',
        result: 'a',
        spellingStep: 'Chữ a: phát âm miệng mở rộng "a".',
      }
    ],
    sampleWords: [
      { id: 'ca', word: 'ca', highlightPart: 'a', icon: '🎤', meaning: 'Hát ca, bài ca' },
      { id: 'ha', word: 'Hà', highlightPart: 'a', icon: '👧', meaning: 'Bạn Hà nhỏ nhắn đáng yêu' },
      { id: 'nam', word: 'Nam', highlightPart: 'a', icon: '👦', meaning: 'Bạn Nam chăm chỉ' },
      { id: 'la', word: 'lá', highlightPart: 'a', icon: '🍃', meaning: 'Chiếc lá xanh' },
    ],
    readingPassage: {
      sentences: [
        'A, a.',
        'Nam và Hà ca hát rộn ràng.',
      ]
    },
    speakingTopic: {
      topic: 'Chào hỏi lễ phép',
      prompt: 'Khi gặp thầy cô, bố mẹ và bạn bè, bé chào như thế nào?',
    },
    writingTargets: ['a', 'A', 'ca hát'],
  },
  {
    id: 2,
    title: 'Bài 2: B b, Dấu huyền ( ` )',
    letters: ['B', 'b', '`'],
    pageNumber: 16,
    theme: 'Gia đình ấm áp',
    recognition: {
      sentence: 'Bà cho bé búp bê.',
      targetWords: ['Bà', 'bé', 'búp', 'bê'],
      description: 'Bà yêu quý tặng cho bé một con búp bê rất đẹp.',
      characterScene: 'grandma-doll',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'a',
        result: 'ba',
        spellingStep: 'bờ - a - ba',
      },
      {
        initial: 'b',
        rhyme: 'a',
        tone: 'huyền',
        result: 'bà',
        spellingStep: 'bờ - a - ba - huyền - bà',
      }
    ],
    sampleWords: [
      { id: 'ba', word: 'ba', highlightPart: 'b', icon: '👨', meaning: 'Bố, ba kính yêu hoặc số 3' },
      { id: 'ba-grandma', word: 'bà', highlightPart: 'b', icon: '👵', meaning: 'Bà hiền từ của em' },
      { id: 'ba-ba', word: 'ba ba', highlightPart: 'b', icon: '🐢', meaning: 'Con ba ba bơi dưới nước' },
      { id: 'bup-be', word: 'búp bê', highlightPart: 'b', icon: '🪆', meaning: 'Món đồ chơi em thích' },
    ],
    readingPassage: {
      sentences: [
        'A, bà.',
        'Bà cho bé búp bê.',
        'Bé yêu bà lắm.',
      ]
    },
    speakingTopic: {
      topic: 'Gia đình em',
      prompt: 'Gia đình bé gồm có những ai? Bé yêu ai nhất trong nhà?',
    },
    writingTargets: ['b', 'ba', 'bà', 'ba ba'],
  },
  {
    id: 3,
    title: 'Bài 3: C c, Dấu sắc ( ´ )',
    letters: ['C', 'c', '´'],
    pageNumber: 18,
    theme: 'Đi câu cá cùng bố',
    recognition: {
      sentence: 'Nam và bố câu cá.',
      targetWords: ['câu', 'cá'],
      description: 'Nam cùng bố ngồi bên bờ sông lộng gió đi câu cá.',
      characterScene: 'fishing-dad',
    },
    phonics: [
      {
        initial: 'c',
        rhyme: 'a',
        result: 'ca',
        spellingStep: 'cờ - a - ca',
      },
      {
        initial: 'c',
        rhyme: 'a',
        tone: 'sắc',
        result: 'cá',
        spellingStep: 'cờ - a - ca - sắc - cá',
      },
      {
        initial: 'c',
        rhyme: 'a',
        tone: 'huyền',
        result: 'cà',
        spellingStep: 'cờ - a - ca - huyền - cà',
      }
    ],
    sampleWords: [
      { id: 'ca-cup', word: 'ca', highlightPart: 'c', icon: '🥤', meaning: 'Cái ca múc nước' },
      { id: 'ca-eggplant', word: 'cà', highlightPart: 'c', icon: '🍆', meaning: 'Quả cà tím, quả cà pháo' },
      { id: 'ca-fish', word: 'cá', highlightPart: 'c', icon: '🐟', meaning: 'Chú cá bơi lội tung tăng' },
    ],
    readingPassage: {
      sentences: [
        'A, cá.',
        'Bố và Nam câu cá.',
        'Hồ có cá to.',
      ]
    },
    speakingTopic: {
      topic: 'Chào hỏi ở trường',
      prompt: 'Khi đến trường và ra về, bé chào bác bảo vệ và cô giáo thế nào?',
    },
    writingTargets: ['c', 'ca', 'cà', 'cá'],
  },
  {
    id: 4,
    title: 'Bài 4: E e, Ê ê',
    letters: ['E', 'e', 'Ê', 'ê'],
    pageNumber: 20,
    theme: 'Mẹ và bé',
    recognition: {
      sentence: 'Bé kể mẹ nghe về bạn bè.',
      targetWords: ['kể', 'mẹ', 'bạn', 'bè'],
      description: 'Bé đi học về tíu tít kể cho mẹ nghe chuyện ở lớp cùng các bạn.',
      characterScene: 'kid-mom-talking',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'e',
        tone: 'sắc',
        result: 'bé',
        spellingStep: 'bờ - e - be - sắc - bé',
      },
      {
        initial: 'b',
        rhyme: 'ê',
        tone: 'sắc',
        result: 'bế',
        spellingStep: 'bờ - ê - bê - sắc - bế',
      },
      {
        initial: 'b',
        rhyme: 'e',
        tone: 'huyền',
        result: 'bè',
        spellingStep: 'bờ - e - be - huyền - bè',
      }
    ],
    sampleWords: [
      { id: 'be-raft', word: 'bè', highlightPart: 'e', icon: '🪵', meaning: 'Chiếc bè gỗ nổi trên sông' },
      { id: 'be-baby', word: 'bé', highlightPart: 'e', icon: '👶', meaning: 'Em bé bụ bẫm dễ thương' },
      { id: 'be-hold', word: 'bế', highlightPart: 'ê', icon: '🤱', meaning: 'Mẹ âu yếm bế em bé' },
    ],
    readingPassage: {
      sentences: [
        'Bà bế bé.',
        'Bé ngoan trong tay bà.',
      ]
    },
    speakingTopic: {
      topic: 'Trên sân trường',
      prompt: 'Giờ ra chơi trên sân trường, các bạn thường chơi những trò chơi gì?',
    },
    writingTargets: ['e', 'ê', 'bé', 'bế'],
  },
  {
    id: 5,
    title: 'Bài 5: Ôn tập và kể chuyện',
    letters: ['a', 'b', 'c', 'e', 'ê', 'A', 'B', 'C', 'E', 'Ê'],
    pageNumber: 22,
    theme: 'Ôn tập và kể chuyện',
    recognition: {
      sentence: 'Bà bế bé.',
      targetWords: ['ba bà', 'be bé', 'cá bé', 'bè cá', 'bế bé'],
      description: 'Đoàn tàu chữ cái, bảng ghép âm và câu chuyện Búp bê và dế mèn.',
      characterScene: 'train-story',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'a',
        result: 'ba',
        spellingStep: 'bờ - a - ba',
      },
      {
        initial: 'b',
        rhyme: 'e',
        result: 'be',
        spellingStep: 'bờ - e - be',
      },
      {
        initial: 'b',
        rhyme: 'ê',
        result: 'bê',
        spellingStep: 'bờ - ê - bê',
      },
      {
        initial: 'c',
        rhyme: 'a',
        result: 'ca',
        spellingStep: 'cờ - a - ca',
      }
    ],
    sampleWords: [
      { id: 'w-baba', word: 'ba bà', highlightPart: 'ba bà', icon: '👵', meaning: 'Ba người bà kính yêu' },
      { id: 'w-bebe', word: 'be bé', highlightPart: 'be bé', icon: '🐥', meaning: 'Nhỏ nhắn, xinh xắn' },
      { id: 'w-cabe', word: 'cá bé', highlightPart: 'cá bé', icon: '🐟', meaning: 'Chú cá nhỏ bơi lội' },
      { id: 'w-beca', word: 'bè cá', highlightPart: 'bè cá', icon: '🛶', meaning: 'Bè tre nuôi cá trên sông' },
      { id: 'w-bebe2', word: 'bế bé', highlightPart: 'bế bé', icon: '🤱', meaning: 'Bà âu yếm bế em bé' },
    ],
    readingPassage: {
      sentences: [
        'Bà bế bé.',
      ]
    },
    speakingTopic: {
      topic: 'Búp bê và dế mèn',
      prompt: 'Kể lại câu chuyện Búp bê và dế mèn qua 3 bức tranh sinh động.',
    },
    writingTargets: ['6', '7', '8', '9', '0', 'bế bé'],
  },
  {
    id: 6,
    title: 'Bài 6: O o, Dấu hỏi ( ? )',
    letters: ['O', 'o', '?'],
    pageNumber: 24,
    theme: 'Đồng quê thanh bình',
    recognition: {
      sentence: 'Đàn bò gặm cỏ.',
      targetWords: ['bò', 'cỏ'],
      description: 'Trên bãi cỏ xanh mát, những chú bò chăm chỉ gặm cỏ non.',
      characterScene: 'cow-grass',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'o',
        tone: 'huyền',
        result: 'bò',
        spellingStep: 'bờ - o - bo - huyền - bò',
      },
      {
        initial: 'c',
        rhyme: 'o',
        tone: 'hỏi',
        result: 'cỏ',
        spellingStep: 'cờ - o - co - hỏi - cỏ',
      },
      {
        initial: 'c',
        rhyme: 'o',
        tone: 'sắc',
        result: 'có',
        spellingStep: 'cờ - o - co - sắc - có',
      }
    ],
    sampleWords: [
      { id: 'bo-cow', word: 'bò', highlightPart: 'o', icon: '🐂', meaning: 'Con bò mẹ và chú bê con' },
      { id: 'co-heron', word: 'cò', highlightPart: 'o', icon: '🦩', meaning: 'Con cò trắng bay lả bay la' },
      { id: 'co-grass', word: 'cỏ', highlightPart: 'o', icon: '🌱', meaning: 'Bãi cỏ xanh mướt' },
    ],
    readingPassage: {
      sentences: [
        'Bê có cỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Chào hỏi',
      prompt: 'Chào mẹ khi tới cổng trường và chào ông bà khi đi học về.',
    },
    writingTargets: ['o', 'bò', 'cỏ'],
  },
  {
    id: 7,
    title: 'Bài 7: Ô ô, Dấu nặng ( . )',
    letters: ['Ô', 'ô', '.'],
    pageNumber: 26,
    theme: 'Phố phường vui tươi',
    recognition: {
      sentence: 'Bố và Hà đi bộ trên hè phố.',
      targetWords: ['Bố', 'bộ'],
      description: 'Bố nắm tay bạn Hà đi dạo trên vỉa hè phố phường đông vui.',
      characterScene: 'dad-walk-street',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'ô',
        tone: 'sắc',
        result: 'bố',
        spellingStep: 'bờ - ô - bô - sắc - bố',
      },
      {
        initial: 'b',
        rhyme: 'ô',
        tone: 'nặng',
        result: 'bộ',
        spellingStep: 'bờ - ô - bô - nặng - bộ',
      },
      {
        initial: 'c',
        rhyme: 'ô',
        result: 'cô',
        spellingStep: 'cờ - ô - cô',
      }
    ],
    sampleWords: [
      { id: 'bo-father', word: 'bố', highlightPart: 'ô', icon: '👨‍💼', meaning: 'Người cha thân yêu' },
      { id: 'co-be', word: 'cô bé', highlightPart: 'ô', icon: '👧', meaning: 'Cô bé xinh xắn' },
      { id: 'co-co', word: 'cổ cò', highlightPart: 'ô', icon: '🦢', meaning: 'Cổ của chú chim cò vươn cao' },
      { id: 'o-to', word: 'ô tô', highlightPart: 'ô', icon: '🚗', meaning: 'Chiếc ô tô bốn bánh' },
    ],
    readingPassage: {
      sentences: [
        'Bố bê bể cá.',
      ]
    },
    speakingTopic: {
      topic: 'Xe cộ',
      prompt: 'Kể tên các loại xe cộ: xe đạp, xe máy, ô tô và quy tắc an toàn khi đi trên đường.',
    },
    writingTargets: ['ô', 'cổ cò'],
  },
  {
    id: 8,
    title: 'Bài 8: D d, Đ đ',
    letters: ['D', 'd', 'Đ', 'đ'],
    pageNumber: 28,
    theme: 'Trò chơi dân gian',
    recognition: {
      sentence: 'Dưới gốc đa, các bạn chơi dung dăng dung dẻ.',
      targetWords: ['Dưới', 'đa', 'dung dăng dung dẻ'],
      description: 'Các bạn nhỏ cùng nắm tay nhau chơi trò chơi dân gian rộn vang tiếng cười dưới bóng cây đa.',
      characterScene: 'folk-games-tree',
    },
    phonics: [
      {
        initial: 'd',
        rhyme: 'e',
        tone: 'hỏi',
        result: 'dẻ',
        spellingStep: 'dờ - e - de - hỏi - dẻ',
      },
      {
        initial: 'đ',
        rhyme: 'a',
        result: 'đa',
        spellingStep: 'đờ - a - đa',
      },
      {
        initial: 'đ',
        rhyme: 'o',
        tone: 'hỏi',
        result: 'đỏ',
        spellingStep: 'đờ - o - đo - hỏi - đỏ',
      }
    ],
    sampleWords: [
      { id: 'da-de', word: 'đá dế', highlightPart: 'd', icon: '🦗', meaning: 'Trò chơi dân gian chọi dế' },
      { id: 'da-da', word: 'đa đa', highlightPart: 'đ', icon: '🐦', meaning: 'Loài chim đa đa trong rừng' },
      { id: 'o-do', word: 'ô đỏ', highlightPart: 'đ', icon: '☂️', meaning: 'Chiếc ô che mưa nắng màu đỏ' },
    ],
    readingPassage: {
      sentences: [
        'Bé có ô đỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Chào hỏi',
      prompt: 'Chào bác khi đến nhà chơi và chào bố khi đi học về.',
    },
    writingTargets: ['d', 'đ', 'đá dế'],
  },
  {
    id: 9,
    title: 'Bài 9: Ơ ơ, Dấu ngã ( ~ )',
    letters: ['Ơ', 'ơ', '~'],
    pageNumber: 30,
    theme: 'Bến cảng rộn ràng',
    recognition: {
      sentence: 'Tàu dỡ hàng ở cảng.',
      targetWords: ['dỡ', 'ở'],
      description: 'Những con tàu to lớn cập bến cảng, cần cẩu đang dỡ từng thùng hàng hóa.',
      characterScene: 'harbor-ship',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'ơ',
        tone: 'huyền',
        result: 'bờ',
        spellingStep: 'bờ - ơ - bơ - huyền - bờ',
      },
      {
        initial: 'd',
        rhyme: 'ơ',
        tone: 'ngã',
        result: 'dỡ',
        spellingStep: 'dờ - ơ - dơ - ngã - dỡ',
      },
      {
        initial: 'c',
        rhyme: 'ơ',
        tone: 'huyền',
        result: 'cờ',
        spellingStep: 'cờ - ơ - cơ - huyền - cờ',
      }
    ],
    sampleWords: [
      { id: 'bo-de', word: 'bờ đê', highlightPart: 'ơ', icon: '🌾', meaning: 'Con đường bờ đê cỏ xanh' },
      { id: 'ca-co', word: 'cá cờ', highlightPart: 'ơ', icon: '🐠', meaning: 'Chú cá cờ nhiều màu sắc' },
      { id: 'do-be', word: 'đỡ bé', highlightPart: 'ơ', icon: '👶', meaning: 'Bố mẹ yêu thương đỡ bé tập đi' },
    ],
    readingPassage: {
      sentences: [
        'Bố đỡ bé.',
      ]
    },
    speakingTopic: {
      topic: 'Phương tiện giao thông',
      prompt: 'Kể tên các loại phương tiện giao thông: ô tô trên đường bộ, tàu thuyền trên biển và máy bay trên bầu trời.',
    },
    writingTargets: ['ơ', 'đỡ bé'],
  },
  {
    id: 10,
    title: 'Bài 10: Ôn tập và kể chuyện',
    letters: ['o', 'ô', 'ơ', 'd', 'đ'],
    pageNumber: 32,
    theme: 'Đàn kiến con ngoan ngoãn',
    recognition: {
      sentence: 'Bờ đê có dế. Bà có đỗ đỏ.',
      targetWords: ['Bờ đê', 'đỗ đỏ'],
      description: 'Ôn tập các âm d, đ ghép với o, ô, ơ và nghe câu chuyện Đàn kiến con ngoan ngoãn.',
      characterScene: 'ants-story',
    },
    phonics: [
      {
        initial: 'd',
        rhyme: 'o',
        result: 'do',
        spellingStep: 'dờ - o - do',
      },
      {
        initial: 'd',
        rhyme: 'ô',
        result: 'dô',
        spellingStep: 'dờ - ô - dô',
      },
      {
        initial: 'd',
        rhyme: 'ơ',
        result: 'dơ',
        spellingStep: 'dờ - ơ - dơ',
      },
      {
        initial: 'đ',
        rhyme: 'o',
        result: 'đo',
        spellingStep: 'đờ - o - đo',
      },
      {
        initial: 'đ',
        rhyme: 'ô',
        result: 'đô',
        spellingStep: 'đờ - ô - đô',
      },
      {
        initial: 'đ',
        rhyme: 'ơ',
        result: 'đơ',
        spellingStep: 'đờ - ơ - đơ',
      },
    ],
    sampleWords: [
      { id: 'bo-co', word: 'bó cỏ', highlightPart: 'o', icon: '🌾', meaning: 'Bó cỏ non tươi' },
      { id: 'ca-co', word: 'cá cờ', highlightPart: 'ơ', icon: '🐠', meaning: 'Chú cá cờ sặc sỡ' },
      { id: 'do-ba', word: 'đỡ bà', highlightPart: 'đ', icon: '👵', meaning: 'Bé đỡ bà bước đi' },
      { id: 'bo-de', word: 'bờ đê', highlightPart: 'ơ', icon: '🏞️', meaning: 'Con đường bờ đê làng quê' },
      { id: 'co-do', word: 'cờ đỏ', highlightPart: 'đ', icon: '🚩', meaning: 'Lá cờ đỏ thắm' },
      { id: 'do-do', word: 'đỗ đỏ', highlightPart: 'đ', icon: '🫘', meaning: 'Hạt đỗ đỏ thơm ngon' },
      { id: 'do-be', word: 'dỗ bé', highlightPart: 'd', icon: '👶', meaning: 'Mẹ âu yếm dỗ dành em bé' },
    ],
    readingPassage: {
      sentences: [
        'Bờ đê có dế.',
        'Bà có đỗ đỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Đàn kiến con ngoan ngoãn',
      prompt: 'Kể lại câu chuyện Đàn kiến con ngoan ngoãn qua 4 bức tranh sinh động.',
    },
    writingTargets: ['đỗ đỏ'],
  },
  {
    id: 11,
    title: 'Bài 11: I i, K k',
    letters: ['I', 'i', 'K', 'k'],
    pageNumber: 34,
    theme: 'Vẽ tranh & Học tập',
    recognition: {
      sentence: 'Nam vẽ kì đà.',
      targetWords: ['kì', 'đà'],
      description: 'Nam ngồi vào bàn học dùng bút màu vẽ một chú kì đà rất khéo tay.',
      characterScene: 'nam-drawing',
    },
    phonics: [
      {
        initial: 'k',
        rhyme: 'i',
        result: 'ki',
        spellingStep: 'ca - i - ki',
      },
      {
        initial: 'k',
        rhyme: 'i',
        tone: 'huyền',
        result: 'kì',
        spellingStep: 'ca - i - ki - huyền - kì',
      },
      {
        initial: 'k',
        rhyme: 'ê',
        tone: 'hỏi',
        result: 'kể',
        spellingStep: 'ca - ê - kê - hỏi - kể',
      }
    ],
    sampleWords: [
      { id: 'bi-do', word: 'bí đỏ', highlightPart: 'i', icon: '🎃', meaning: 'Quả bí đỏ nấu canh ngọt mát' },
      { id: 'ke-o', word: 'kẻ ô', highlightPart: 'k', icon: '📐', meaning: 'Dùng thước kẻ ô ly ngay ngắn' },
      { id: 'di-do', word: 'đi đò', highlightPart: 'i', icon: '🚣', meaning: 'Đi đò sang ngang dòng sông' },
      { id: 'ki-da', word: 'kì đà', highlightPart: 'k', icon: '🦎', meaning: 'Chú kì đà bò trên đá' },
    ],
    readingPassage: {
      sentences: [
        'Kì đà bò ở kẽ đá.',
      ]
    },
    speakingTopic: {
      topic: 'Giới thiệu',
      prompt: 'Giới thiệu bản thân: tên, học lớp nào (Lớp 1A, Lớp 1B) và làm quen với các bạn cùng trường.',
    },
    writingTargets: ['i', 'k', 'kì đà'],
  },
  {
    id: 12,
    title: 'Bài 12: H h, L l',
    letters: ['H', 'h', 'L', 'l'],
    pageNumber: 36,
    theme: 'Hồ nước & Cây cối',
    recognition: {
      sentence: 'Le le bơi trên hồ.',
      targetWords: ['Le le', 'hồ'],
      description: 'Đàn chim le le lông nâu bơi lội tung tăng trên mặt hồ trong xanh mát rượi.',
      characterScene: 'lake-birds',
    },
    phonics: [
      {
        initial: 'h',
        rhyme: 'ô',
        tone: 'huyền',
        result: 'hồ',
        spellingStep: 'hờ - ô - hô - huyền - hồ',
      },
      {
        initial: 'l',
        rhyme: 'e',
        result: 'le',
        spellingStep: 'lờ - e - le',
      },
    ],
    sampleWords: [
      { id: 'la-do', word: 'lá đỏ', highlightPart: 'l', icon: '🍁', meaning: 'Chiếc lá chuyển sang màu đỏ cam rực rỡ' },
      { id: 'bo-ho', word: 'bờ hồ', highlightPart: 'h', icon: '🏞️', meaning: 'Đường dạo bộ mát rượi quanh hồ nước' },
      { id: 'ca-ho', word: 'cá hố', highlightPart: 'h', icon: '🐟', meaning: 'Loài cá biển thân dài ánh bạc' },
      { id: 'le-le', word: 'le le', highlightPart: 'l', icon: '🦆', meaning: 'Loài chim nước bơi lội giỏi' },
    ],
    readingPassage: {
      sentences: [
        'Bé bị ho. Bà đã có lá hẹ.',
      ]
    },
    speakingTopic: {
      topic: 'Cây cối',
      prompt: 'Kể tên các loại cây trong vườn: cây ăn quả (bưởi), cây gia vị (ớt), giàn bầu mướp và công dụng của chúng.',
    },
    writingTargets: ['h', 'l', 'hồ', 'le le'],
  },
  {
    id: 13,
    title: 'Bài 13: U u, Ư ư',
    letters: ['U', 'u', 'Ư', 'ư'],
    pageNumber: 38,
    theme: 'Đu đủ & Muôn loài',
    recognition: {
      sentence: 'Đu đủ chín ngọt lừ.',
      targetWords: ['Đu', 'đủ', 'lừ'],
      description: 'Bé ngồi ở bàn ăn thưởng thức đĩa đu đủ chín vàng ươm ngọt lịm.',
      characterScene: 'papaya-eating',
    },
    phonics: [
      {
        initial: 'đ',
        rhyme: 'u',
        tone: 'hỏi',
        result: 'đủ',
        spellingStep: 'đờ - u - đu - hỏi - đủ',
      },
      {
        initial: 'l',
        rhyme: 'ư',
        tone: 'huyền',
        result: 'lừ',
        spellingStep: 'lờ - ư - lư - huyền - lừ',
      },
    ],
    sampleWords: [
      { id: 'du', word: 'dù', highlightPart: 'u', icon: '🪂', meaning: 'Chiếc dù bay lượn trên bầu trời' },
      { id: 'du-du', word: 'đu đủ', highlightPart: 'u', icon: '🍈', meaning: 'Quả đu đủ chín vàng thơm ngon' },
      { id: 'ho-du', word: 'hổ dữ', highlightPart: 'ư', icon: '🐯', meaning: 'Loài hổ dữ săn mồi trong rừng' },
    ],
    readingPassage: {
      sentences: [
        'Cá hổ là cá dữ.',
      ]
    },
    speakingTopic: {
      topic: 'Giới thiệu',
      prompt: 'Giới thiệu bản thân trước nhóm bạn: tên, tuổi, lớp học và sở thích cá nhân.',
    },
    writingTargets: ['u', 'ư', 'dù', 'hổ dữ'],
  },
  {
    id: 14,
    title: 'Bài 14: Ch ch, Kh kh',
    letters: ['Ch', 'ch', 'Kh', 'kh'],
    pageNumber: 40,
    theme: 'Động vật trong rừng',
    recognition: {
      sentence: 'Mấy chú khỉ ăn chuối.',
      targetWords: ['chú', 'khỉ', 'chuối'],
      description: 'Trên mỏm đá bên bìa rừng râm mát, những chú khỉ con đang ăn chuối ngon lành.',
      characterScene: 'monkey-banana',
    },
    phonics: [
      {
        initial: 'ch',
        rhyme: 'u',
        tone: 'sắc',
        result: 'chú',
        spellingStep: 'chờ - u - chu - sắc - chú',
      },
      {
        initial: 'kh',
        rhyme: 'i',
        tone: 'hỏi',
        result: 'khỉ',
        spellingStep: 'khờ - i - khi - hỏi - khỉ',
      }
    ],
    sampleWords: [
      { id: 'la-kho', word: 'lá khô', highlightPart: 'kh', icon: '🍂', meaning: 'Những chiếc lá vàng rơi rụng' },
      { id: 'chu-khi', word: 'chú khỉ', highlightPart: 'ch', icon: '🐒', meaning: 'Chú khỉ leo trèo tinh nghịch' },
      { id: 'cho-ca', word: 'chợ cá', highlightPart: 'ch', icon: '🏪', meaning: 'Khu chợ bán các loại cá tươi' },
    ],
    readingPassage: {
      sentences: [
        'Chị có cá kho khế.',
      ]
    },
    speakingTopic: {
      topic: 'Cá cảnh',
      prompt: 'Bể cá cảnh nuôi những loại cá nào? Em quan sát thấy chúng bơi lội và được chăm sóc ra sao?',
    },
    writingTargets: ['ch', 'kh', 'chú khỉ'],
  },
  {
    id: 15,
    title: 'Bài 15: Ôn tập và kể chuyện',
    letters: ['k', 'h', 'l', 'ch', 'kh'],
    pageNumber: 42,
    theme: 'Đàn ong chăm chỉ & Chú quạ thông minh',
    recognition: {
      sentence: 'Chị cho bé cá cờ. Dì Kha cho Hà đi chợ.',
      targetWords: ['cá cờ', 'đi chợ'],
      description: 'Đàn ong chăm chỉ mang mật ngọt qua các từ ngữ; câu chuyện chú quạ thông minh thả sỏi uống nước.',
      characterScene: 'bee-honey',
    },
    phonics: [
      { initial: 'k', rhyme: 'e', result: 'ke', spellingStep: 'ca - e - ke' },
      { initial: 'ch', rhyme: 'u', tone: 'sắc', result: 'chú', spellingStep: 'chờ - u - chu - sắc - chú' },
      { initial: 'kh', rhyme: 'i', tone: 'hỏi', result: 'khỉ', spellingStep: 'khờ - i - khi - hỏi - khỉ' },
    ],
    sampleWords: [
      { id: 'chu-he', word: 'chú hề', highlightPart: 'ch', icon: '🤡', meaning: 'Chú hề xiếc vui nhộn' },
      { id: 'la-kho', word: 'lá khô', highlightPart: 'kh', icon: '🍂', meaning: 'Lá cây khô mùa thu' },
      { id: 'bo-ho', word: 'bờ hồ', highlightPart: 'h', icon: '🏞️', meaning: 'Bờ hồ thoáng mát' },
      { id: 'cho-ca', word: 'chợ cá', highlightPart: 'ch', icon: '🐟', meaning: 'Khu chợ bán các loại cá' },
      { id: 'ca-du', word: 'cá dữ', highlightPart: 'd', icon: '🦈', meaning: 'Loài cá săn mồi hung dữ' },
      { id: 'che-o', word: 'che ô', highlightPart: 'ch', icon: '☂️', meaning: 'Che chiếc ô che mưa che nắng' },
      { id: 'la-he', word: 'lá hẹ', highlightPart: 'h', icon: '🌿', meaning: 'Cây lá hẹ làm thuốc chữa ho' },
    ],
    readingPassage: {
      sentences: [
        'Chị cho bé cá cờ.',
        'Dì Kha cho Hà đi chợ.',
      ]
    },
    speakingTopic: {
      topic: 'Kể chuyện: Con quạ thông minh',
      prompt: 'Kể lại câu chuyện Con quạ thông minh biết dùng mỏ gắp từng viên sỏi thả vào bình để nước dâng lên uống.',
    },
    writingTargets: ['cá kho khế'],
  },
  {
    id: 16,
    title: 'Bài 16: M m, N n',
    letters: ['M', 'm', 'N', 'n'],
    pageNumber: 44,
    theme: 'Mẹ mua nơ cho Hà & Đi ca nô',
    recognition: {
      sentence: 'Mẹ mua nơ cho Hà.',
      targetWords: ['Mẹ', 'mua', 'nơ'],
      description: 'Mẹ cài chiếc nơ đỏ xinh xắn lên mái tóc cho bé Hà tại cửa hàng phụ kiện thời trang.',
      characterScene: 'mother-ribbon',
    },
    phonics: [
      {
        initial: 'm',
        rhyme: 'e',
        tone: 'nặng',
        result: 'mẹ',
        spellingStep: 'mờ - e - me - nặng - mẹ',
      },
      {
        initial: 'n',
        rhyme: 'ơ',
        result: 'nơ',
        spellingStep: 'nờ - ơ - nơ',
      },
    ],
    sampleWords: [
      { id: 'ca-me', word: 'cá mè', highlightPart: 'm', icon: '🐟', meaning: 'Loài cá mè nước ngọt vảy ánh bạc' },
      { id: 'la-me', word: 'lá me', highlightPart: 'm', icon: '🌿', meaning: 'Cành lá me nhỏ li ti chua thanh' },
      { id: 'no-do', word: 'nơ đỏ', highlightPart: 'n', icon: '🎀', meaning: 'Chiếc nơ đỏ rực rỡ cài tóc' },
      { id: 'ca-no', word: 'ca nô', highlightPart: 'n', icon: '🚤', meaning: 'Chiếc ca nô lướt sóng trắng xóa' },
    ],
    readingPassage: {
      sentences: [
        'Bố mẹ cho Hà đi ca nô.',
      ]
    },
    speakingTopic: {
      topic: 'Giới thiệu',
      prompt: 'Giới thiệu bản thân khi bị lạc với chú công an: họ tên, tuổi, địa chỉ nhà, tên và số điện thoại của bố mẹ.',
    },
    writingTargets: ['m', 'n', 'cá mè', 'nơ đỏ'],
  },
  {
    id: 17,
    title: 'Bài 17: G g, Gi gi',
    letters: ['G', 'g', 'Gi', 'gi'],
    pageNumber: 46,
    theme: 'Căn bếp gia đình',
    recognition: {
      sentence: 'Hà có giỏ trứng gà.',
      targetWords: ['giỏ', 'gà'],
      description: 'Trong gian bếp sạch sẽ, bạn Hà ngoan ngoãn xách giỏ trứng gà tươi giúp mẹ.',
      characterScene: 'ha-egg-basket',
    },
    phonics: [
      {
        initial: 'g',
        rhyme: 'a',
        tone: 'huyền',
        result: 'gà',
        spellingStep: 'gờ - a - ga - huyền - gà',
      },
      {
        initial: 'gi',
        rhyme: 'o',
        tone: 'hỏi',
        result: 'giỏ',
        spellingStep: 'giờ - o - gio - hỏi - giỏ',
      }
    ],
    sampleWords: [
      { id: 'ga-go', word: 'gà gô', highlightPart: 'g', icon: '🦃', meaning: 'Loài gà gô sống ở vùng cao' },
      { id: 'do-go', word: 'đồ gỗ', highlightPart: 'g', icon: '🪵', meaning: 'Bàn ghế bằng gỗ thơm' },
      { id: 'gia-do', word: 'giá đỗ', highlightPart: 'gi', icon: '🌱', meaning: 'Rau mầm giá đỗ thanh mát' },
      { id: 'cu-gia', word: 'cụ già', highlightPart: 'gi', icon: '👴', meaning: 'Cụ già phúc hậu tóc bạc phơ' },
    ],
    readingPassage: {
      sentences: [
        'Bà che gió cho ba chú gà.',
      ]
    },
    speakingTopic: {
      topic: 'Vật nuôi',
      prompt: 'Kể tên các con vật nuôi trong gia đình: gà, vịt, bò, lợn, chó, mèo và cách em cùng gia đình chăm sóc chúng.',
    },
    writingTargets: ['g', 'gi', 'gà gô', 'giá đỗ'],
  },
  {
    id: 18,
    title: 'Bài 18: Gh gh, Nh nh',
    letters: ['Gh', 'gh', 'Nh', 'nh'],
    pageNumber: 48,
    theme: 'Hà ghé nhà bà & Mẹ nhờ Hà bê ghế nhỏ',
    recognition: {
      sentence: 'Hà ghé nhà bà. Nhà bà ở ngõ nhỏ.',
      targetWords: ['ghé', 'nhà', 'Nhà', 'nhỏ'],
      description: 'Mẹ chở bé Hà về thăm nhà bà ở con ngõ nhỏ; Hà vui sướng chạy ùa vào ôm bà.',
      characterScene: 'visit-grandma',
    },
    phonics: [
      {
        initial: 'gh',
        rhyme: 'e',
        tone: 'sắc',
        result: 'ghé',
        spellingStep: 'gờ - e - ghe - sắc - ghé',
      },
      {
        initial: 'nh',
        rhyme: 'a',
        tone: 'huyền',
        result: 'nhà',
        spellingStep: 'nhờ - a - nha - huyền - nhà',
      },
    ],
    sampleWords: [
      { id: 'ghe-da', word: 'ghế đá', highlightPart: 'gh', icon: '🪑', meaning: 'Chiếc ghế đá công viên thoáng mát' },
      { id: 'ghe-do', word: 'ghẹ đỏ', highlightPart: 'gh', icon: '🦀', meaning: 'Con ghẹ biển đỏ au tươi ngon' },
      { id: 'nha-go', word: 'nhà gỗ', highlightPart: 'nh', icon: '🏡', meaning: 'Ngôi nhà bằng gỗ ấm cúng' },
      { id: 'la-nho', word: 'lá nho', highlightPart: 'nh', icon: '🍇', meaning: 'Chiếc lá nho xanh mướt trên giàn' },
    ],
    readingPassage: {
      sentences: [
        'Mẹ nhờ Hà bê ghế nhỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Giới thiệu',
      prompt: 'Giới thiệu bản thân lễ phép khi cùng bố mẹ đến thăm nhà người quen hoặc thầy cô giáo.',
    },
    writingTargets: ['gh', 'nh', 'ghẹ', 'lá nho'],
  },
  {
    id: 19,
    title: 'Bài 19: Ng ng, Ngh ngh',
    letters: ['Ng', 'ng', 'Ngh', 'ngh'],
    pageNumber: 50,
    theme: 'Đường làng ngõ xóm',
    recognition: {
      sentence: 'Nghé theo mẹ ra ngõ.',
      targetWords: ['Nghé', 'ngõ'],
      description: 'Chú trâu con nghé ngoan ngoãn nối gót mẹ bước thong dong ra ngõ làng.',
      characterScene: 'buffalo-calf',
    },
    phonics: [
      {
        initial: 'ng',
        rhyme: 'o',
        tone: 'ngã',
        result: 'ngõ',
        spellingStep: 'ngờ - o - ngo - ngã - ngõ',
      },
      {
        initial: 'ngh',
        rhyme: 'e',
        tone: 'sắc',
        result: 'nghé',
        spellingStep: 'ngờ - e - nghe - sắc - nghé',
      }
    ],
    sampleWords: [
      { id: 'nga-ba', word: 'ngã ba', highlightPart: 'ng', icon: '🛣️', meaning: 'Giao lộ ba con đường' },
      { id: 'ngo-nho', word: 'ngõ nhỏ', highlightPart: 'ng', icon: '🏡', meaning: 'Con ngõ làng quê yên ả' },
      { id: 'cu-nghe', word: 'củ nghệ', highlightPart: 'ngh', icon: '🫚', meaning: 'Củ nghệ màu vàng tươi' },
      { id: 'nghi-he', word: 'nghỉ hè', highlightPart: 'ngh', icon: '🏖️', meaning: 'Kỳ nghỉ hè bổ ích và vui vẻ' },
    ],
    readingPassage: {
      sentences: [
        'Nghé đã no cỏ.',
        'Nghé ngủ ở bờ đê.',
      ]
    },
    speakingTopic: {
      topic: 'Thăm vườn bách thú',
      prompt: 'Kể về chuyến đi thăm vườn bách thú: em được nhìn thấy những loài động vật nào (voi, hươu cao cổ, hươu sao) và cảm xúc của em ra sao?',
    },
    writingTargets: ['ng', 'ngh', 'ngõ', 'củ nghệ'],
  },
  {
    id: 20,
    title: 'Bài 20: Ôn tập và kể chuyện',
    letters: ['m', 'n', 'g', 'gi', 'gh', 'nh', 'ng', 'ngh'],
    pageNumber: 52,
    theme: 'Cây táo từ ngữ & Truyện Cô chủ không biết quý tình bạn',
    recognition: {
      sentence: 'Mẹ ghé nhà bà. Nhà bà ở ngõ nhỏ.',
      targetWords: ['Mẹ ghé', 'ngõ nhỏ'],
      description: 'Cây táo sum suê quả ngọt mang theo các từ ngữ; câu chuyện cô chủ không biết quý tình bạn.',
      characterScene: 'apple-tree',
    },
    phonics: [
      { initial: 'm', rhyme: 'e', result: 'me', spellingStep: 'mờ - e - me' },
      { initial: 'ng', rhyme: 'o', tone: 'ngã', result: 'ngõ', spellingStep: 'ngờ - o - ngo - ngã - ngõ' },
      { initial: 'nh', rhyme: 'o', tone: 'hỏi', result: 'nhỏ', spellingStep: 'nhờ - o - nho - hỏi - nhỏ' },
    ],
    sampleWords: [
      { id: 'nu-ca', word: 'nụ cà', highlightPart: 'n', icon: '🍆', meaning: 'Búp nụ hoa cà tim tím' },
      { id: 'nha-ga', word: 'nhà ga', highlightPart: 'nh', icon: '🚉', meaning: 'Nơi đón tàu hỏa đón khách' },
      { id: 'nghi-he', word: 'nghỉ hè', highlightPart: 'ngh', icon: '🏖️', meaning: 'Kỳ nghỉ hè nhiều niềm vui' },
      { id: 'ngu-mo', word: 'ngủ mơ', highlightPart: 'ng', icon: '😴', meaning: 'Giấc ngủ say mơ mộng' },
      { id: 'bo-ngo', word: 'bỡ ngỡ', highlightPart: 'ng', icon: '😯', meaning: 'Cảm giác mới lạ ngày đầu' },
      { id: 'gia-do', word: 'giá đỗ', highlightPart: 'gi', icon: '🌱', meaning: 'Rau mầm giá đỗ thanh mát' },
      { id: 'ghe-go', word: 'ghế gỗ', highlightPart: 'gh', icon: '🪑', meaning: 'Chiếc ghế bằng gỗ tự nhiên' },
      { id: 'nho-nho', word: 'nho nhỏ', highlightPart: 'nh', icon: '🍇', meaning: 'Bé nhỏ xinh xắn đáng yêu' },
    ],
    readingPassage: {
      sentences: [
        'Mẹ ghé nhà bà.',
        'Nhà bà ở ngõ nhỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Kể chuyện: Cô chủ không biết quý tình bạn',
      prompt: 'Kể lại câu chuyện Cô chủ không biết quý tình bạn và bài học về lòng chung thủy, yêu thương bạn bè.',
    },
    writingTargets: ['ngõ nhỏ nhà bà'],
  },
  {
    id: 21,
    title: 'Bài 21: R r, S s',
    letters: ['R', 'r', 'S', 's'],
    pageNumber: 54,
    theme: 'Tổ chim rộn rã',
    recognition: {
      sentence: 'Bầy sẻ non ríu ra ríu rít bên mẹ.',
      targetWords: ['sẻ', 'ríu ra ríu rít'],
      description: 'Những chú chim sẻ non hót líu lo, quấn quýt bên mẹ trên cành cây mát rượi.',
      characterScene: 'sparrow-nest',
    },
    phonics: [
      {
        initial: 'r',
        rhyme: 'a',
        result: 'ra',
        spellingStep: 'rờ - a - ra',
      },
      {
        initial: 's',
        rhyme: 'e',
        tone: 'hỏi',
        result: 'sẻ',
        spellingStep: 'sờ - e - se - hỏi - sẻ',
      }
    ],
    sampleWords: [
      { id: 'ro-ra', word: 'rổ rá', highlightPart: 'r', icon: '🧺', meaning: 'Dụng cụ đan bằng tre dùng đựng rau quả' },
      { id: 'ca-ro', word: 'cá rô', highlightPart: 'r', icon: '🐟', meaning: 'Chú cá rô đồng bơi khỏe' },
      { id: 'su-su', word: 'su su', highlightPart: 's', icon: '🍈', meaning: 'Quả su su luộc chấm muối vừng' },
      { id: 'chu-so', word: 'chữ số', highlightPart: 's', icon: '🔢', meaning: 'Các con số từ 0 đến 9' },
    ],
    readingPassage: {
      sentences: [
        'Chợ có gà ri, cá rô, su su.',
        'Chợ có cả rổ rá.',
      ]
    },
    speakingTopic: {
      topic: 'Cảm ơn',
      prompt: 'Nói lời cảm ơn chân thành, lễ phép khi được ông bà, cha mẹ hoặc người thân tặng quà, giúp đỡ.',
    },
    writingTargets: ['r', 's', 'rổ rá', 'su su'],
  },
  {
    id: 22,
    title: 'Bài 22: T t, Tr tr',
    letters: ['T', 't', 'Tr', 'tr'],
    pageNumber: 56,
    theme: 'Nam tô bức tranh cây tre & Hồ cá của Hà',
    recognition: {
      sentence: 'Nam tô bức tranh cây tre.',
      targetWords: ['tô', 'tranh', 'tre'],
      description: 'Bên bàn học sáng sủa, bạn Nam chăm chú tô bức tranh vẽ bụi tre và mặt trời.',
      characterScene: 'nam-drawing',
    },
    phonics: [
      {
        initial: 't',
        rhyme: 'ô',
        result: 'tô',
        spellingStep: 'tờ - ô - tô',
      },
      {
        initial: 'tr',
        rhyme: 'e',
        result: 'tre',
        spellingStep: 'trờ - e - tre',
      },
    ],
    sampleWords: [
      { id: 'o-to', word: 'ô tô', highlightPart: 't', icon: '🚗', meaning: 'Chiếc xe ô tô màu đỏ' },
      { id: 'su-tu', word: 'sư tử', highlightPart: 't', icon: '🦁', meaning: 'Chú sư tử dũng mãnh' },
      { id: 'ca-tre', word: 'cá trê', highlightPart: 'tr', icon: '🐟', meaning: 'Chú cá trê da trơn râu dài' },
      { id: 'tre-nga', word: 'tre ngà', highlightPart: 'tr', icon: '🎋', meaning: 'Bụi tre ngà thân vàng tươi' },
    ],
    readingPassage: {
      sentences: [
        'Hà tả hồ cá.',
        'Hồ to, có cá mè, cá trê, cá rô.',
      ]
    },
    speakingTopic: {
      topic: 'Bảo vệ môi trường',
      prompt: 'Ý thức giữ gìn vệ sinh, không vứt rác thải nhựa xuống biển để bảo vệ cá heo và các loài sinh vật biển.',
    },
    writingTargets: ['t', 'tr', 'ô tô', 'cá trê'],
  },
  {
    id: 23,
    title: 'Bài 23: Th th, ia',
    letters: ['Th', 'th', 'ia'],
    pageNumber: 58,
    theme: 'Đêm hội Trung thu & Bé chia thìa đĩa',
    recognition: {
      sentence: 'Trung thu, bé được chia quà.',
      targetWords: ['thu', 'chia'],
      description: 'Đêm rằm Trung thu rước đèn múa lân náo nức, các bạn nhỏ vui sướng được chia kẹo bánh.',
      characterScene: 'mid-autumn-festival',
    },
    phonics: [
      {
        initial: 'th',
        rhyme: 'u',
        result: 'thu',
        spellingStep: 'thờ - u - thu',
      },
      {
        initial: 'ch',
        rhyme: 'ia',
        result: 'chia',
        spellingStep: 'chờ - ia - chia',
      },
    ],
    sampleWords: [
      { id: 'thu-do', word: 'thủ đô', highlightPart: 'th', icon: '🏛️', meaning: 'Thủ đô Hà Nội thân yêu' },
      { id: 'la-thu', word: 'lá thư', highlightPart: 'th', icon: '✉️', meaning: 'Bức thư gửi người thân' },
      { id: 'thia-dia', word: 'thìa đĩa', highlightPart: 'ia', icon: '🍽️', meaning: 'Bộ thìa đĩa trên bàn ăn' },
      { id: 'la-tia-to', word: 'lá tía tô', highlightPart: 'ia', icon: '🍃', meaning: 'Lá tía tô thơm ngát' },
    ],
    readingPassage: {
      sentences: [
        'Bé chia thìa, chia đĩa cho cả nhà.',
        'Thìa đĩa to cho bố mẹ.',
        'Thìa đĩa nhỏ cho bé.',
      ]
    },
    speakingTopic: {
      topic: 'Cảm ơn',
      prompt: 'Nói lời cảm ơn lễ phép khi được thầy cô giáo phát sách vở hoặc được bạn bè giúp đỡ, cho mượn đồ dùng học tập.',
    },
    writingTargets: ['th', 'ia', 'thủ đô', 'thìa'],
  },
  {
    id: 24,
    title: 'Bài 24: ua, ưa',
    letters: ['ua', 'ưa'],
    pageNumber: 60,
    theme: 'Mẹ đưa Hà đi học múa & Bé giúp mẹ',
    recognition: {
      sentence: 'Mẹ đưa Hà đến lớp học múa.',
      targetWords: ['đưa', 'múa'],
      description: 'Mẹ dịu dàng dắt bé Hà mặc váy ba-lê trắng xinh xắn đến lớp học múa.',
      characterScene: 'dance-class',
    },
    phonics: [
      {
        initial: 'm',
        rhyme: 'ua',
        tone: 'sắc',
        result: 'múa',
        spellingStep: 'mờ - ua - mua - sắc - múa',
      },
      {
        initial: 'đ',
        rhyme: 'ưa',
        result: 'đưa',
        spellingStep: 'đờ - ưa - đưa',
      },
    ],
    sampleWords: [
      { id: 'ca-chua', word: 'cà chua', highlightPart: 'ua', icon: '🍅', meaning: 'Quả cà chua chín đỏ mọng' },
      { id: 'mua-o', word: 'múa ô', highlightPart: 'ua', icon: '☂️', meaning: 'Điệu múa xòe ô duyên dáng' },
      { id: 'dua-le', word: 'dưa lê', highlightPart: 'ưa', icon: '🍈', meaning: 'Quả dưa lê ngọt mát' },
      { id: 'cua-so', word: 'cửa sổ', highlightPart: 'ưa', icon: '🪟', meaning: 'Khung cửa sổ đón gió' },
    ],
    readingPassage: {
      sentences: [
        'Mẹ đi chợ mua cá, mua cua.',
        'Mẹ mua cả sữa chua, dưa lê.',
      ]
    },
    speakingTopic: {
      topic: 'Giúp mẹ',
      prompt: 'Kể về những việc em thường làm để giúp đỡ mẹ ở nhà (nhặt rau, dọn bàn ăn, quét nhà, rót nước).',
    },
    writingTargets: ['ua', 'ưa', 'cà chua', 'dưa lê'],
  },
  {
    id: 29,
    title: 'Bài 29: Quy tắc chính tả vàng',
    letters: ['c/k', 'g/gh', 'ng/ngh'],
    pageNumber: 70,
    theme: 'Bí kíp chính tả lớp 1',
    recognition: {
      sentence: 'Quy tắc vàng: k, gh, ngh ĐỨNG TRƯỚC i, e, ê.',
      targetWords: ['ki', 'ke', 'kê', 'ghi', 'ghe', 'ghê', 'nghi', 'nghe', 'nghê'],
      description: 'Ghi nhớ bí quyết này, bé sẽ không bao giờ viết sai chính tả Tiếng Việt!',
      characterScene: 'magic-spelling-rule',
    },
    phonics: [
      {
        initial: 'k',
        rhyme: 'i',
        result: 'ki',
        spellingStep: 'k chỉ đi với i, e, ê: ki, ke, kê',
      },
      {
        initial: 'gh',
        rhyme: 'e',
        result: 'ghe',
        spellingStep: 'gh chỉ đi với i, e, ê: ghi, ghe, ghê',
      },
      {
        initial: 'ngh',
        rhyme: 'ê',
        result: 'nghê',
        spellingStep: 'ngh chỉ đi với i, e, ê: nghi, nghe, nghê',
      }
    ],
    sampleWords: [
      { id: 'ca-co', word: 'cá cờ (c đi với a, o, u)', highlightPart: 'c', icon: '🐟', meaning: 'c đi với a, o, ô, ơ, u, ư' },
      { id: 'chu-ki', word: 'chữ kí (k đi với i)', highlightPart: 'k', icon: '✍️', meaning: 'k đi với i, e, ê' },
      { id: 'ghe-go', word: 'ghế gỗ (gh đi với ê, g đi với ô)', highlightPart: 'gh', icon: '🪑', meaning: 'gh đi với ê; g đi với ô' },
    ],
    readingPassage: {
      sentences: [
        'Kẻ ô li, viết chữ kĩ càng.',
        'Ghé thăm bà, ghi nhớ lời cô dạy.',
        'Nghe tiếng nghé kêu rộn rã ngõ nhỏ.',
      ]
    },
    speakingTopic: {
      topic: 'Mẹo nhớ chính tả',
      prompt: 'Hãy đọc thuộc câu thần chú: "i, e, ê gặp k, gh, ngh; các chữ còn lại đi với c, g, ng!"',
    },
    writingTargets: ['k', 'gh', 'ngh', 'kẻ ô', 'ghế gỗ'],
  },
  {
    id: 31,
    title: 'Bài 31: an - ăn - ân',
    letters: ['an', 'ăn', 'ân'],
    pageNumber: 74,
    theme: 'Đôi bạn thân',
    recognition: {
      sentence: 'Ngựa vằn và hươu cao cổ là đôi bạn thân.',
      targetWords: ['vằn', 'bạn', 'thân'],
      description: 'Trong cánh rừng ngập tràn cỏ hoa, bạn ngựa vằn và hươu cao cổ luôn luôn giúp đỡ nhau.',
      characterScene: 'zebra-giraffe',
    },
    phonics: [
      {
        initial: 'b',
        rhyme: 'an',
        tone: 'nặng',
        result: 'bạn',
        spellingStep: 'bờ - an - ban - nặng - bạn',
      },
      {
        initial: 'kh',
        rhyme: 'ăn',
        result: 'khăn',
        spellingStep: 'khờ - ăn - khăn',
      },
      {
        initial: 'th',
        rhyme: 'ân',
        result: 'thân',
        spellingStep: 'thờ - ân - thân',
      }
    ],
    sampleWords: [
      { id: 'ban-than', word: 'bạn thân', highlightPart: 'an', icon: '🤝', meaning: 'Người bạn tốt luôn sẻ chia' },
      { id: 'khan-ran', word: 'khăn rằn', highlightPart: 'ăn', icon: '🧣', meaning: 'Chiếc khăn quàng truyền thống' },
      { id: 'qua-man', word: 'quả mận', highlightPart: 'ân', icon: '🍑', meaning: 'Quả mận giòn ngọt' },
    ],
    readingPassage: {
      sentences: [
        'Đàn gà con tha thẩn gần chân mẹ.',
        'Đã có mẹ che chắn, cả đàn chả sợ gì lũ quạ dữ.',
      ]
    },
    speakingTopic: {
      topic: 'Nói lời xin lỗi',
      prompt: 'Khi chẳng may va vào bạn làm rơi hộp bút, em sẽ nói gì với bạn?',
    },
    writingTargets: ['an', 'ăn', 'ân', 'bạn thân'],
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    lessonId: 1,
    type: 'listen-letter',
    questionText: 'Nghe âm thanh và chọn đúng chữ cái:',
    audioPrompt: 'Hãy tìm chữ A!',
    options: [
      { id: 'opt1', text: 'a', isCorrect: true, explanation: 'Chính xác! Đây là chữ a thường.' },
      { id: 'opt2', text: 'c', isCorrect: false, explanation: 'Đây là chữ c, bé hãy chọn lại nhé.' },
      { id: 'opt3', text: 'o', isCorrect: false, explanation: 'Đây là chữ o giống quả trứng.' },
      { id: 'opt4', text: 'e', isCorrect: false, explanation: 'Đây là chữ e.' },
    ],
    hint: 'Chữ cái đầu tiên trong bảng chữ cái tiếng Việt!',
  },
  {
    id: 'q2',
    lessonId: 2,
    type: 'picture-word',
    questionText: 'Bức tranh vẽ con gì đây bé ơi?',
    imageIcon: '🐢',
    audioPrompt: 'Bức tranh vẽ con gì?',
    options: [
      { id: 'opt1', text: 'ba ba', isCorrect: true, explanation: 'Giỏi quá! Con ba ba có mai mềm bơi trong nước.' },
      { id: 'opt2', text: 'cá rô', isCorrect: false, explanation: 'Chưa đúng rồi, đây không phải cá rô.' },
      { id: 'opt3', text: 'chú khỉ', isCorrect: false, explanation: 'Đây không phải chú khỉ.' },
      { id: 'opt4', text: 'bò', isCorrect: false, explanation: 'Bò là con vật to có sừng.' },
    ],
    hint: 'Con vật có họ hàng với chú rùa nhưng mai mềm.',
  },
  {
    id: 'q3',
    lessonId: 29,
    type: 'spelling-rule',
    questionText: 'Điền c hay k vào chỗ trống: "...ẻ ô ly"',
    audioPrompt: 'Chọn c hay k để điền vào từ kẻ ô ly?',
    options: [
      { id: 'opt1', text: 'k', isCorrect: true, explanation: 'Rất chuẩn! Đứng trước "e" phải viết là chữ "k" (kẻ ô).' },
      { id: 'opt2', text: 'c', isCorrect: false, explanation: 'Sai rồi bé ơi! Chữ "c" không bao giờ đứng trước e, ê, i.' },
    ],
    hint: 'Ghi nhớ: k, gh, ngh chỉ đi với i, e, ê!',
  },
  {
    id: 'q4',
    lessonId: 29,
    type: 'spelling-rule',
    questionText: 'Chọn từ viết ĐÚNG chính tả:',
    audioPrompt: 'Từ nào viết đúng chính tả?',
    options: [
      { id: 'opt1', text: 'ghế gỗ', isCorrect: true, explanation: 'Đúng quy tắc: "gh" đi với ê, và "g" đi với ô!' },
      { id: 'opt2', text: 'gế gỗ', isCorrect: false, explanation: 'Sai: trước âm "ê" phải là "gh" chứ không phải "g".' },
      { id: 'opt3', text: 'ghế ghỗ', isCorrect: false, explanation: 'Sai: trước âm "ô" không dùng "gh".' },
    ],
    hint: 'Nhớ quy tắc: gh chỉ đi với i, e, ê.',
  },
  {
    id: 'q5',
    lessonId: 6,
    type: 'fill-blank',
    questionText: 'Thêm dấu thanh thích hợp vào chữ "co" để được con vật chân dài màu trắng:',
    imageIcon: '🦩',
    audioPrompt: 'Thêm dấu thanh gì để tạo thành con cò?',
    options: [
      { id: 'opt1', text: 'Dấu huyền ( ` ) thành "cò"', isCorrect: true, explanation: 'Chính xác! Con cò bay lả bay la.' },
      { id: 'opt2', text: 'Dấu sắc ( ´ ) thành "có"', isCorrect: false, explanation: 'Dấu sắc tạo thành từ "có".' },
      { id: 'opt3', text: 'Dấu hỏi ( ? ) thành "cỏ"', isCorrect: false, explanation: 'Dấu hỏi tạo thành bãi "cỏ".' },
    ],
    hint: 'C... huyền CÒ!',
  },
  {
    id: 'q6',
    lessonId: 8,
    type: 'picture-word',
    questionText: 'Bức tranh chiếc ô màu đỏ này tương ứng với từ nào?',
    imageIcon: '☂️',
    audioPrompt: 'Chọn từ tương ứng với bức tranh chiếc ô màu đỏ!',
    options: [
      { id: 'opt1', text: 'ô đỏ', isCorrect: true, explanation: 'Tuyệt vời! Chiếc ô đỏ che mưa che nắng.' },
      { id: 'opt2', text: 'bờ đê', isCorrect: false, explanation: 'Chưa đúng, đây là chiếc ô.' },
      { id: 'opt3', text: 'đá dế', isCorrect: false, explanation: 'Chưa đúng rồi bé yêu.' },
    ],
    hint: 'Chữ "ô" và chữ "đỏ" có dấu hỏi.',
  },
  {
    id: 'q7',
    lessonId: 31,
    type: 'fill-blank',
    questionText: 'Điền vần thích hợp: "đôi b___ thân"',
    audioPrompt: 'Điền vần an, ăn hay ân vào chỗ trống?',
    options: [
      { id: 'opt1', text: 'an (bạn thân)', isCorrect: true, explanation: 'Hoan hô! Bờ - an - ban - nặng - bạn thân.' },
      { id: 'opt2', text: 'ăn (bặn thân)', isCorrect: false, explanation: 'Không có từ bặn thân đâu bé.' },
      { id: 'opt3', text: 'ân (bận thân)', isCorrect: false, explanation: 'Chưa chính xác.' },
    ],
    hint: 'Từ chỉ những người bạn tốt luôn đồng hành cùng nhau.',
  }
];

// 29 Vietnamese letters + compound consonants for writing and flashcards
export const ALL_VIETNAMESE_LETTERS = [
  { char: 'a', upper: 'A', name: 'Chữ a', example: 'ca hát', sound: 'a' },
  { char: 'ă', upper: 'Ă', name: 'Chữ á', example: 'mặt trăng', sound: 'á' },
  { char: 'â', upper: 'Â', name: 'Chữ ớ', example: 'quả mận', sound: 'ớ' },
  { char: 'b', upper: 'B', name: 'Chữ bờ', example: 'con bò', sound: 'bờ' },
  { char: 'c', upper: 'C', name: 'Chữ cờ', example: 'con cá', sound: 'cờ' },
  { char: 'd', upper: 'D', name: 'Chữ dờ', example: 'con dê', sound: 'dờ' },
  { char: 'đ', upper: 'Đ', name: 'Chữ đờ', example: 'đu đủ', sound: 'đờ' },
  { char: 'e', upper: 'E', name: 'Chữ e', example: 'em bé', sound: 'e' },
  { char: 'ê', upper: 'Ê', name: 'Chữ ê', example: 'búp bê', sound: 'ê' },
  { char: 'g', upper: 'G', name: 'Chữ gờ', example: 'con gà', sound: 'gờ' },
  { char: 'h', upper: 'H', name: 'Chữ hờ', example: 'hoa hồng', sound: 'hờ' },
  { char: 'i', upper: 'I', name: 'Chữ i ngắn', example: 'viên bi', sound: 'i' },
  { char: 'k', upper: 'K', name: 'Chữ ca', example: 'kì đà', sound: 'ca' },
  { char: 'l', upper: 'L', name: 'Chữ lờ', example: 'lá cây', sound: 'lờ' },
  { char: 'm', upper: 'M', name: 'Chữ mờ', example: 'quả me', sound: 'mờ' },
  { char: 'n', upper: 'N', name: 'Chữ nờ', example: 'nơ đỏ', sound: 'nờ' },
  { char: 'o', upper: 'O', name: 'Chữ o', example: 'con ong', sound: 'o' },
  { char: 'ô', upper: 'Ô', name: 'Chữ ô', example: 'ô tô', sound: 'ô' },
  { char: 'ơ', upper: 'Ơ', name: 'Chữ ơ', example: 'bờ đê', sound: 'ơ' },
  { char: 'p', upper: 'P', name: 'Chữ pờ', example: 'đèn pin', sound: 'pờ' },
  { char: 'q', upper: 'Q', name: 'Chữ cu', example: 'quê hương', sound: 'cu' },
  { char: 'r', upper: 'R', name: 'Chữ rờ', example: 'cá rô', sound: 'rờ' },
  { char: 's', upper: 'S', name: 'Chữ sờ', example: 'su su', sound: 'sờ' },
  { char: 't', upper: 'T', name: 'Chữ tờ', example: 'cây tre', sound: 'tờ' },
  { char: 'u', upper: 'U', name: 'Chữ u', example: 'đu đủ', sound: 'u' },
  { char: 'ư', upper: 'Ư', name: 'Chữ ư', example: 'hạt lựu', sound: 'ư' },
  { char: 'v', upper: 'V', name: 'Chữ vờ', example: 'vở vẽ', sound: 'vờ' },
  { char: 'x', upper: 'X', name: 'Chữ xờ nhẹ', example: 'xe đạp', sound: 'xờ' },
  { char: 'y', upper: 'Y', name: 'Chữ i dài', example: 'y tá', sound: 'i dài' },
  // Chữ ghép
  { char: 'ch', upper: 'Ch', name: 'Chữ chờ', example: 'chú khỉ', sound: 'chờ' },
  { char: 'kh', upper: 'Kh', name: 'Chữ khờ', example: 'quả khế', sound: 'khờ' },
  { char: 'nh', upper: 'Nh', name: 'Chữ nhờ', example: 'ngôi nhà', sound: 'nhờ' },
  { char: 'ng', upper: 'Ng', name: 'Chữ ngờ đơn', example: 'ngã ba', sound: 'ngờ' },
  { char: 'ngh', upper: 'Ngh', name: 'Chữ ngờ kép', example: 'củ nghệ', sound: 'ngờ kép' },
  { char: 'gh', upper: 'Gh', name: 'Chữ gờ kép', example: 'ghế đá', sound: 'gờ kép' },
  { char: 'th', upper: 'Th', name: 'Chữ thờ', example: 'thủ đô', sound: 'thờ' },
  { char: 'tr', upper: 'Tr', name: 'Chữ trờ', example: 'cây tre', sound: 'trờ' },
  { char: 'ph', upper: 'Ph', name: 'Chữ phờ', example: 'phố cổ', sound: 'phờ' },
  { char: 'qu', upper: 'Qu', name: 'Chữ quờ', example: 'quê nhà', sound: 'quờ' },
  { char: 'gi', upper: 'Gi', name: 'Chữ giờ', example: 'giỏ trứng', sound: 'giờ' },
];

export const SCHOOL_SUPPLIES = [
  { name: 'Bút chì', icon: '✏️', purpose: 'Dùng để tập viết chữ, kẻ ô và vẽ tranh' },
  { name: 'Thước kẻ', icon: '📏', purpose: 'Giúp kẻ những đường thẳng tắp và đo đạc' },
  { name: 'Tẩy / Gôm', icon: '🧼', purpose: 'Tẩy sạch những nét chì vẽ chưa ưng ý' },
  { name: 'Bảng con', icon: '⬛', purpose: 'Viết phấn trắng trên lớp cùng cô và bạn' },
  { name: 'Vở 4 ô ly', icon: '📓', purpose: 'Nơi bé rèn từng nét chữ nết người thật đẹp' },
  { name: 'Gọt bút chì', icon: '🪚', purpose: 'Chuốt đầu ngòi bút chì sắc nhọn, dễ viết' },
];
