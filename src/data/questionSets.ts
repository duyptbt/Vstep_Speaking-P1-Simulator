import { QuestionSet } from "../types";

export const QUESTION_SETS: QuestionSet[] = [
  {
    id: "set-1",
    title: "Set 1: Cities & Hairstyles",
    level: "Target Band B1 & B2 Benchmarks",
    topics: [
      {
        id: "cities",
        title: "Cities",
        description: "Questions about capital cities, living in urban areas, and pros/cons of city life.",
        iconName: "Building2",
        questions: [
          {
            id: "cities-1",
            topicId: "cities",
            topicTitle: "Cities",
            text: "How well do you know the capital city of your country?",
            keywordsB1: [
              "know quite well (biết khá rõ)",
              "visited several times (đến thăm vài lần)",
              "busy city (thành phố nhộn nhịp)",
              "famous places (địa điểm nổi tiếng)",
              "delicious street food (món ăn đường phố ngon)"
            ],
            keywords: [
              "sprawling metropolis (đô thị lớn hiện đại)",
              "bustling atmosphere (không khí nhộn nhịp sôi động)",
              "historical landmarks (danh lam thắng cảnh lịch sử)",
              "intimately familiar with (vô cùng quen thuộc với)",
              "cultural heart (trung tâm văn hóa cốt lõi)"
            ],
            tips: [
              "State your familiarity level immediately (e.g., 'quite well' for B1 or 'intimately familiar' for B2).",
              "Give specific examples of landmark places (Hoan Kiem Lake, Old Quarter, West Lake).",
              "Provide a clear reason (studied there, visited with family, hometown)."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/haʊ wɛl duː juː nəʊ ðə ˈkæpɪtl ˈsɪti əv jɔː ˈkʌntri/",
                intonation: "Rising-falling intonation. Stress key words: 'well', 'know', 'capital city', 'country'.",
                stressAndLinking: "Link 'well do' /wɛldu/, link 'capital_city' with clear tap /t/ in 'capital'."
              },
              vietnamese: {
                huongDanPhatAm: "Từ 'capital' phát âm là /ˈkæp.ɪ.təl/, lưu ý âm /p/ bật hơi nhẹ và âm /l/ ở cuối uốn lưỡi. Từ 'city' là /ˈsɪt.i/.",
                nguDieuVaNhanGiong: "Nhấn mạnh vào câu trả lời chính ở đầu (e.g., 'fairly well', 'extremely familiar'). Xuống giọng ở cuối câu khẳng định.",
                meoTraLoi: "Áp dụng công thức: Trực tiếp -> Lý do/Ví dụ -> Cảm nhận. Dùng từ nối như 'To be honest', 'As a matter of fact'."
              }
            },
            modelAnswerB1: "I know Hanoi quite well because I have visited it several times with my family. It is a big and busy city with many famous places like Hoan Kiem Lake and the Old Quarter. I really like the street food there, especially hot bowls of Pho.",
            modelAnswerB2: "To be completely honest, I know Hanoi, the capital of Vietnam, intimately well because I lived there throughout my four university years. It is a vibrant, sprawling metropolis famous for its historic Old Quarter and bustling street food culture. Whenever my foreign friends visit, I enjoy guiding them around iconic cultural landmarks.",
            modelAnswer: "To be completely honest, I know Hanoi, the capital of Vietnam, intimately well because I lived there throughout my four university years. It is a vibrant, sprawling metropolis famous for its historic Old Quarter and bustling street food culture. Whenever my foreign friends visit, I enjoy guiding them around iconic cultural landmarks.",
            modelAnswerPhonetics: "/tuː biː kəmˈpliːtli ˈɒnɪst, aɪ nəʊ hæˈnɔɪ... ˈɪntɪmɪtli wɛl/",
            b1FocusNotes: "Clear, natural intermediate language using Present Simple & Present Perfect, everyday words, and clear coordinate connectors (and, because).",
            b2FocusNotes: "Advanced collocations (sprawling metropolis, iconic cultural landmarks), complex sentence structures (Whenever my foreign friends visit...), and precise adverbs (intimately well)."
          },
          {
            id: "cities-2",
            topicId: "cities",
            topicTitle: "Cities",
            text: "Do you think cities are exciting places to live?",
            keywordsB1: [
              "very exciting (rất thú vị)",
              "shopping malls (trung tâm mua sắm)",
              "hang out with friends (đi chơi với bạn bè)",
              "find good jobs (tìm việc làm tốt)",
              "convenient life (cuộc sống tiện lợi)"
            ],
            keywords: [
              "vibrant nightlife (cuộc sống về đêm sôi động)",
              "endless entertainment options (lựa chọn giải trí vô tận)",
              "lucrative job opportunities (cơ hội nghề nghiệp hấp dẫn)",
              "dynamic atmosphere (bầu không khí năng động)",
              "superior public infrastructure (hạ tầng công cộng vượt trội)"
            ],
            tips: [
              "Agree directly: 'Yes, I think...' (B1) or 'Without a shadow of a doubt...' (B2).",
              "Provide 2 reasons: entertainment variety (cinemas, cafes) and career prospects.",
              "Add a brief concluding thought on city energy."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː θɪŋk ˈsɪtiz ɑːr ɪkˈsaɪtɪŋ ˈpleɪsɪz tuː lɪv/",
                intonation: "Yes/No question contour: Rising intonation at the end on 'live↗'.",
                stressAndLinking: "Stress 'cities', 'exciting', 'live'. Link 'places to' smoothly."
              },
              vietnamese: {
                huongDanPhatAm: "Từ 'exciting' đọc là /ɪkˈsaɪ.tɪŋ/ có trọng âm rơi vào âm tiết thứ 2 'sai'. Nhớ âm /s/ trong 'places'.",
                nguDieuVaNhanGiong: "Với câu hỏi Yes/No, nên dùng ngữ điệu đi lên ↗ ở cuối câu khi tự hỏi, nhưng câu trả lời của bạn phải xuống giọng ↘ ở cuối câu.",
                meoTraLoi: "Dùng từ như 'Without a shadow of a doubt', 'From my perspective', kèm ví dụ cụ thể."
              }
            },
            modelAnswerB1: "Yes, I think cities are very exciting places to live. There are always many things to do, such as going to shopping malls, watching movies at the cinema, and hanging out with friends at coffee shops. Also, it is much easier to find good jobs in big cities.",
            modelAnswerB2: "Without a shadow of a doubt, yes! Urban centers offer an incredibly dynamic atmosphere with endless recreational options, ranging from modern multiplex cinemas to vibrant night markets. Furthermore, cities provide superior career opportunities and public infrastructure compared to rural areas.",
            modelAnswer: "Without a shadow of a doubt, yes! Urban centers offer an incredibly dynamic atmosphere with endless recreational options, ranging from modern multiplex cinemas to vibrant night markets. Furthermore, cities provide superior career opportunities and public infrastructure compared to rural areas.",
            modelAnswerPhonetics: "/wɪˈðaʊt ə ˈʃædəʊ əv daʊt, jɛs! ˈɜːbən ˈsɛntəz ˈɒfər/",
            b1FocusNotes: "Structured listing of activities using 'such as' and practical benefits using 'Also, it is much easier to...'.",
            b2FocusNotes: "Sophisticated discourse marker ('Without a shadow of a doubt'), participle phrases ('ranging from... to...'), and comparative contrast."
          },
          {
            id: "cities-3",
            topicId: "cities",
            topicTitle: "Cities",
            text: "Why do some people dislike living in a city?",
            keywordsB1: [
              "traffic jams (ùn tắc giao thông)",
              "air pollution (ô nhiễm không khí)",
              "crowded and noisy (đông đúc và ồn ào)",
              "high living cost (chi phí sinh hoạt cao)",
              "prefer quiet places (thích nơi yên tĩnh hơn)"
            ],
            keywords: [
              "exorbitant cost of living (chi phí sinh hoạt đắt đỏ)",
              "chronic traffic congestion (ùn tắc giao thông triền miên)",
              "alarming level of pollution (mức độ ô nhiễm đáng báo động)",
              "draining for urbanites (gây kiệt sức cho cư dân thành thị)",
              "seek tranquility (tìm kiếm sự thanh bình)"
            ],
            tips: [
              "Introduce 2 distinct drawbacks using transitional phrases.",
              "Mention traffic/noise and living expenses.",
              "Conclude with why people move to the suburbs or countryside."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/waɪ duː sʌm ˈpiːpl dɪsˈlaɪk ˈlɪvɪŋ ɪn ə ˈsɪti/",
                intonation: "Falling intonation on 'city↘'. Stress 'why', 'dislike', 'living', 'city'.",
                stressAndLinking: "Link 'dislike_living' /dɪsˈlaɪk ˈlɪvɪŋ/."
              },
              vietnamese: {
                huongDanPhatAm: "'Dislike' /dɪsˈlaɪk/ có âm đuôi /k/. 'Pollution' /pəˈluː.ʃən/ nhấn âm 2.",
                nguDieuVaNhanGiong: "Nhấn giọng vào các danh từ chỉ nhược điểm: 'traffic jams', 'pollution', 'cost of living'.",
                meoTraLoi: "Cung cấp ít nhất 2 lý do với cấu trúc: 'Firstly, ... Secondly, ... Consequently, ...'"
              }
            },
            modelAnswerB1: "In my opinion, some people dislike city life because of heavy traffic jams and air pollution. During rush hours, the streets are always crowded and noisy. In addition, living in a big city is quite expensive, especially renting an apartment and buying daily groceries.",
            modelAnswerB2: "First and foremost, the alarming level of environmental pollution combined with chronic traffic congestion can be extremely draining for urbanites. Additionally, the exorbitant cost of living makes decent housing and daily expenses unaffordable for many, prompting them to seek tranquility in smaller towns.",
            modelAnswer: "First and foremost, the alarming level of environmental pollution combined with chronic traffic congestion can be extremely draining for urbanites. Additionally, the exorbitant cost of living makes decent housing and daily expenses unaffordable for many, prompting them to seek tranquility in smaller towns.",
            modelAnswerPhonetics: "/fɜːst ænd ˈfɔːməʊst, ðɪ əˈlɑːmɪŋ ˈlɛvl əv ɪnˌvaɪrənˈmɛntl pəˈluːʃən/",
            b1FocusNotes: "Natural expressions for daily problems ('heavy traffic jams', 'crowded and noisy', 'renting an apartment').",
            b2FocusNotes: "High-level adjectives and participle clauses ('chronic traffic congestion', 'prompting them to seek tranquility')."
          }
        ]
      },
      {
        id: "hairstyles",
        title: "Hairstyles",
        description: "Questions about haircuts, personal grooming, changing hairstyles, and hair coloring.",
        iconName: "Scissors",
        questions: [
          {
            id: "hairstyles-1",
            topicId: "hairstyles",
            topicTitle: "Hairstyles",
            text: "Where do you go to get a haircut?",
            keywordsB1: [
              "small hair salon (tiệm làm tóc nhỏ)",
              "near my house (gần nhà tôi)",
              "friendly barber (thợ cắt tóc thân thiện)",
              "reasonable price (giá cả hợp lý)",
              "once a month (mỗi tháng một lần)"
            ],
            keywords: [
              "boutique barber shop (tiệm cắt tóc phong cách)",
              "regular hair stylist (thợ làm tóc quen thuộc)",
              "hair texture (chất tóc)",
              "tailored haircut (kiểu tóc thiết kế riêng)",
              "loyal customer (khách hàng trung thành)"
            ],
            tips: [
              "Specify the location clearly (near home, favorite salon).",
              "Mention your barber's skill or attitude.",
              "State frequency (every month, every 6 weeks)."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/weər duː juː ɡəʊ tuː ɡɛt ə ˈheəkʌt/",
                intonation: "Wh-question: Falling intonation on 'haircut↘'.",
                stressAndLinking: "Stress 'where', 'go', 'get', 'haircut'. Link 'get a' /ɡɛtə/."
              },
              vietnamese: {
                huongDanPhatAm: "'Haircut' /ˈheə.kʌt/ có 2 âm tiết, âm đầu 'hair' kéo dài vừa phải, âm 'cut' ngắn gọn có bật âm /t/.",
                nguDieuVaNhanGiong: "Đi xuống ở cuối câu hỏi. Trả lời dứt khoát tên địa điểm ngay từ câu đầu.",
                meoTraLoi: "Mở đầu bằng 'Usually...', 'I generally head to...', sau đó giải thích lý do thích nơi đó."
              }
            },
            modelAnswerB1: "I usually go to a small hair salon near my house. I always get my hair cut by the same barber because he is very friendly and knows what hairstyle suits me. The price is also very reasonable, so I go there once a month.",
            modelAnswerB2: "I regularly frequent a boutique barber shop located just a five-minute walk from my apartment. I have remained loyal to the same stylist for over two years because he understands my hair texture perfectly and consistently delivers a sharp, professional cut tailored to my preferences.",
            modelAnswer: "I regularly frequent a boutique barber shop located just a five-minute walk from my apartment. I have remained loyal to the same stylist for over two years because he understands my hair texture perfectly and consistently delivers a sharp, professional cut tailored to my preferences.",
            modelAnswerPhonetics: "/aɪ ˈrɛɡjʊlərli frɪˈkwɛnt ə buːˈtiːk ˈbɑːbə ʃɒp/",
            b1FocusNotes: "Fluent use of Present Simple and basic relative conjunction 'because he is friendly and knows...'.",
            b2FocusNotes: "Advanced vocabulary choices ('frequent' as verb, 'remained loyal to', 'tailored to my preferences')."
          },
          {
            id: "hairstyles-2",
            topicId: "hairstyles",
            topicTitle: "Hairstyles",
            text: "Have you changed your hairstyle recently?",
            keywordsB1: [
              "two weeks ago (hai tuần trước)",
              "cut much shorter (cắt ngắn hơn nhiều)",
              "hot weather (thời tiết nóng)",
              "look fresh and youthful (trông tươi tắn trẻ trung)",
              "easy to wash (dễ gội đầu)"
            ],
            keywords: [
              "drastic change (thay đổi ngoạn mục)",
              "textured bob (kiểu tóc bob cá tính)",
              "freshen up my appearance (làm mới diện mạo)",
              "morning styling routine (thói quen tạo kiểu buổi sáng)",
              "received numerous compliments (nhận nhiều lời khen)"
            ],
            tips: [
              "Answer Yes/No clearly using Past Simple or Present Perfect.",
              "Explain the reason (hot weather, new style).",
              "Mention friends' reactions or practical benefits."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/hæv juː ʧeɪnʤd jɔː ˈheəstaɪl ˈriːsntli/",
                intonation: "Yes/No question: Rising intonation on 'recently↗'.",
                stressAndLinking: "Stress 'changed', 'hairstyle', 'recently'. Link 'changed your' /ʧeɪnʤdjɔː/."
              },
              vietnamese: {
                huongDanPhatAm: "'Recently' /ˈriː.sənt.li/ nhấn âm tiết thứ nhất. 'Hairstyle' /ˈheə.staɪl/.",
                nguDieuVaNhanGiong: "Lên giọng cuối câu hỏi 'recently↗'. Trả lời dùng thì Hiện tại hoàn thành (Have + V3/ed).",
                meoTraLoi: "Sử dụng từ miêu tả: 'drastic change' (thay đổi lớn), 'minor trim' (tỉa nhẹ)."
              }
            },
            modelAnswerB1: "Yes, I changed my hairstyle about two weeks ago. I decided to cut my hair much shorter because the weather was getting very hot. My friends said my new haircut looks fresh and youthful, and it is also much easier to wash every day.",
            modelAnswerB2: "Actually, yes! Just last month I opted for a drastic change by chopping off my long hair into a textured bob. I wanted to freshen up my appearance for the summer and drastically reduce my morning styling routine. It was a bold leap, but I have received numerous compliments.",
            modelAnswer: "Actually, yes! Just last month I opted for a drastic change by chopping off my long hair into a textured bob. I wanted to freshen up my appearance for the summer and drastically reduce my morning styling routine. It was a bold leap, but I have received numerous compliments.",
            modelAnswerPhonetics: "/ˈækʧʊəli, jɛs! ʤʌst lɑːst mʌnθ aɪ ˈɒptɪd fɔːr ə ˈdræstɪk ʧeɪnʤ/",
            b1FocusNotes: "Accurate Past Simple sequence ('changed', 'decided', 'said') and accessible adjectives ('fresh and youthful').",
            b2FocusNotes: "Colloquial flair and precise terminology ('opted for a drastic change', 'textured bob', 'morning styling routine')."
          },
          {
            id: "hairstyles-3",
            topicId: "hairstyles",
            topicTitle: "Hairstyles",
            text: "Would you ever change the colour of your hair?",
            keywordsB1: [
              "like to try (muốn thử)",
              "gentle color (màu nhẹ nhàng)",
              "dark brown (nâu sẫm)",
              "suitable for work (phù hợp công việc)",
              "not damage hair (không làm hỏng tóc)"
            ],
            keywords: [
              "consider under the right circumstances (cân nhắc trong điều kiện phù hợp)",
              "subtle shade (tông màu nhẹ nhàng)",
              "warm chestnut or ash brown (màu hạt dẻ ấm hoặc nâu khói)",
              "creative medium for self-expression (cách thức sáng tạo thể hiện bản thân)",
              "high-end hair treatments (liệu trình dưỡng tóc cao cấp)"
            ],
            tips: [
              "Use conditional structure (Second Conditional / would).",
              "Specify the ideal hair color (dark brown, chestnut).",
              "Mention consideration for workplace etiquette or hair health."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wʊd juː ˈɛvə ʧeɪnʤ ðə ˈkʌlər əv jɔː heər/",
                intonation: "Hypothetical question: Gentle rise on 'hair↗'.",
                stressAndLinking: "Stress 'ever', 'change', 'colour', 'hair'. Link 'colour_of' /ˈkʌlərəv/."
              },
              vietnamese: {
                huongDanPhatAm: "'Colour' /ˈkʌl.ər/, 'Change' /ʧeɪndʒ/ lưu ý âm /ʧ/ và âm đuôi /dʒ/.",
                nguDieuVaNhanGiong: "Sử dụng câu điều kiện loại 2 (Would + V-bare) để diễn tả ý định giả định.",
                meoTraLoi: "Dù đồng ý hay không, hãy mở rộng thêm lý do (lo ngại hóa chất hoặc muốn thử phong cách mới)."
              }
            },
            modelAnswerB1: "I think I would like to try it in the future. If I dye my hair, I will probably choose a gentle color like dark brown because it looks natural and suitable for my work environment. However, I will make sure not to damage my hair with too much bleach.",
            modelAnswerB2: "I would certainly consider it under the right circumstances. If I were to experiment with hair coloring, I would opt for a subtle shade such as warm chestnut or ash brown to maintain a professional aesthetic. While it is a creative medium for self-expression, I would invest in high-end treatments to avoid chemical damage.",
            modelAnswer: "I would certainly consider it under the right circumstances. If I were to experiment with hair coloring, I would opt for a subtle shade such as warm chestnut or ash brown to maintain a professional aesthetic. While it is a creative medium for self-expression, I would invest in high-end treatments to avoid chemical damage.",
            modelAnswerPhonetics: "/aɪ wʊd ˈsɜːtnli kənˈsɪdər ɪt ˈʌndə ðə raɪt ˈsɜːkəmstɑːnsɪz/",
            b1FocusNotes: "Condition clause with 'If I dye my hair, I will choose...' and practical reasoning.",
            b2FocusNotes: "Second conditional subjunctive ('If I were to experiment...'), sophisticated lexicon ('subtle shade', 'professional aesthetic', 'self-expression')."
          }
        ]
      }
    ]
  },
  {
    id: "set-2",
    title: "Set 2: Hobbies & Transportation",
    level: "Target Band B1 & B2 Benchmarks",
    topics: [
      {
        id: "hobbies",
        title: "Hobbies & Free Time",
        description: "Questions about leisure activities, childhood hobbies, and the importance of having hobbies.",
        iconName: "Palette",
        questions: [
          {
            id: "hobbies-1",
            topicId: "hobbies",
            topicTitle: "Hobbies & Free Time",
            text: "What do you usually do in your spare time?",
            keywordsB1: [
              "listen to music (nghe nhạc)",
              "read books (đọc sách)",
              "go jogging in the park (chạy bộ trong công viên)",
              "relax after studying (thư giãn sau khi học)",
              "spend time outdoors (dành thời gian ngoài trời)"
            ],
            keywords: [
              "unwind and recharge (thư giãn và nạp năng lượng)",
              "immerse in fiction novels (đắm chìm vào tiểu thuyết)",
              "therapeutic creative outlet (kênh sáng tạo giúp giải tỏa)",
              "nutritious home-cooked meals (bữa cơm nhà dinh dưỡng)",
              "intellectual escape (sự giải tỏa trí tuệ)"
            ],
            tips: [
              "Name 1 or 2 specific leisure activities.",
              "Explain how they help you destress.",
              "Give practical details (indoors vs outdoors)."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wɒt duː juː ˈjuːʒʊəli duː ɪn jɔː speər taɪm/",
                intonation: "Falling intonation on 'time↘'.",
                stressAndLinking: "Stress 'usually', 'do', 'spare time'. Link 'do in' /duːɪn/."
              },
              vietnamese: {
                huongDanPhatAm: "'Spare time' /speər taɪm/, 'Usually' /ˈjuː.ʒu.ə.li/.",
                nguDieuVaNhanGiong: "Đi xuống cuối câu hỏi Wh-. Trả lời câu mở đầu với giọng nói tự tin.",
                meoTraLoi: "Tránh chỉ nói 'I play games'. Hãy dùng cụm B2: 'I tend to unwind by immersing myself in...'"
              }
            },
            modelAnswerB1: "In my spare time, I usually listen to pop music and read comic books in my bedroom. When the weather is nice, I also go jogging in the nearby park with my friend. It really helps me relax and forget about my daily study pressure.",
            modelAnswerB2: "Whenever I have a free slot in my busy schedule, I tend to unwind by immersing myself in fiction novels or preparing nutritious home-cooked meals. Reading provides an intellectual escape from work pressures, whereas cooking serves as a therapeutic, creative outlet.",
            modelAnswer: "Whenever I have a free slot in my busy schedule, I tend to unwind by immersing myself in fiction novels or preparing nutritious home-cooked meals. Reading provides an intellectual escape from work pressures, whereas cooking serves as a therapeutic, creative outlet.",
            modelAnswerPhonetics: "/wɛnˈɛvər aɪ hæv ə friː slɒt ɪn maɪ ˈbɪzi ˈʃɛdjuːl/",
            b1FocusNotes: "Everyday hobby vocabulary ('pop music', 'comic books', 'jogging in the nearby park') with natural cause-and-effect.",
            b2FocusNotes: "Contrastive compound sentence using 'whereas', rich academic adjectives ('therapeutic', 'intellectual escape')."
          },
          {
            id: "hobbies-2",
            topicId: "hobbies",
            topicTitle: "Hobbies & Free Time",
            text: "Did you have any hobbies when you were a child?",
            keywordsB1: [
              "drawing pictures (vẽ tranh)",
              "playing soccer (chơi bóng đá)",
              "neighborhood friends (bạn bè hàng xóm)",
              "after finishing homework (sau khi làm xong bài tập)",
              "happy memories (kỷ niệm vui vẻ)"
            ],
            keywords: [
              "utterly fascinated by (vô cùng say mê)",
              "assembling intricate LEGO models (lắp ráp mô hình LEGO tinh xảo)",
              "trading collectible cards (trao đổi thẻ sưu tầm)",
              "instilled a long-standing passion (truyền cảm hứng đam mê lâu dài)",
              "hands-on creativity (tính sáng tạo thực hành)"
            ],
            tips: [
              "Use Past Simple or 'used to' cleanly.",
              "Name a childhood pastime (drawing, LEGO, sports).",
              "Reflect on how it made you feel."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/dɪd juː hæv ˈɛni ˈhɒbiz wɛn juː wɜːr ə ʧaɪld/",
                intonation: "Rising intonation on 'child↗'.",
                stressAndLinking: "Stress 'hobbies', 'were', 'child'. Link 'were a' /wɜːrə/."
              },
              vietnamese: {
                huongDanPhatAm: "'Hobbies' /ˈhɒb.iz/ số nhiều, 'Child' /ʧaɪld/ chú ý âm /ld/ ở cuối.",
                nguDieuVaNhanGiong: "Sử dụng cấu trúc 'used to + V' hoặc 'would + V' để diễn tả thói quen quá khứ.",
                meoTraLoi: "Kể một kỉ niệm nhỏ (sưu tầm đồ, chơi đá bóng xóm) để phát triển ý tự nhiên."
              }
            },
            modelAnswerB1: "Yes, when I was a child, I loved drawing pictures and playing soccer with other kids in my neighborhood. We often played outside after finishing our homework until dinner time. Those were very happy and memorable days for me.",
            modelAnswerB2: "Certainly! Back in my childhood years, I was utterly fascinated by assembling intricate LEGO models and trading collectible cards with classmates. My peers and I would spend hours strategizing and exchanging pieces, which instilled in me a long-standing passion for hands-on creativity.",
            modelAnswer: "Certainly! Back in my childhood years, I was utterly fascinated by assembling intricate LEGO models and trading collectible cards with classmates. My peers and I would spend hours strategizing and exchanging pieces, which instilled in me a long-standing passion for hands-on creativity.",
            modelAnswerPhonetics: "/ˈsɜːtnli! bæk ɪn maɪ ˈʧaɪldhʊd jɪəz, aɪ wɒz ˈʌtəli ˈfæsɪneɪtɪd/",
            b1FocusNotes: "Accurate Past Simple storytelling ('loved', 'played', 'were') with warm personal touch.",
            b2FocusNotes: "Habitual past with 'would spend hours...', descriptive adjectives ('intricate', 'long-standing passion')."
          },
          {
            id: "hobbies-3",
            topicId: "hobbies",
            topicTitle: "Hobbies & Free Time",
            text: "Is it important to have a hobby? Why or why not?",
            keywordsB1: [
              "very important (rất quan trọng)",
              "great way to relax (cách tuyệt vời để thư giãn)",
              "after long working hours (sau giờ làm việc dài)",
              "learn new skills (học kỹ năng mới)",
              "make new friends (kết bạn mới)"
            ],
            keywords: [
              "indispensable for work-life balance (không thể thiếu cho cân bằng cuộc sống)",
              "effective buffer against psychological burnout (bức đệm hiệu quả chống kiệt sức tâm lý)",
              "chronic stress (căng thẳng mãn tính)",
              "fosters personal growth (thúc đẩy sự phát triển bản thân)",
              "like-minded communities (cộng đồng cùng sở thích)"
            ],
            tips: [
              "Emphasize the importance with a strong adjective ('essential', 'indispensable').",
              "Mention mental health / relaxation.",
              "Mention skill acquisition or social networking."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/ɪz ɪt ɪmˈpɔːtənt tuː hæv ə ˈhɒbi/",
                intonation: "Yes/No question: Rising tone on 'hobby↗'.",
                stressAndLinking: "Stress 'important', 'have', 'hobby'. Link 'is it' /ɪzɪt/."
              },
              vietnamese: {
                huongDanPhatAm: "'Important' /ɪmˈpɔː.tənt/, 'Alleviate' /əˈliː.vi.eɪt/.",
                nguDieuVaNhanGiong: "Nhấn giọng mạnh ở các tính từ khẳng định tầm quan trọng: 'essential', 'vital'.",
                meoTraLoi: "Nêu tác dụng đối với tinh thần (mental health) và thể chất (physical health)."
              }
            },
            modelAnswerB1: "Yes, I believe having a hobby is very important for everyone. It gives us a great way to relax after long working or studying hours. Moreover, through hobbies, we can learn interesting skills and make new friends who share the same interests.",
            modelAnswerB2: "Without question, pursuing a dedicated pastime is indispensable for maintaining a healthy work-life balance. It acts as an effective buffer against psychological burnout and chronic stress. Furthermore, engaging in hobbies fosters personal growth and connects individuals with like-minded communities.",
            modelAnswer: "Without question, pursuing a dedicated pastime is indispensable for maintaining a healthy work-life balance. It acts as an effective buffer against psychological burnout and chronic stress. Furthermore, engaging in hobbies fosters personal growth and connects individuals with like-minded communities.",
            modelAnswerPhonetics: "/wɪˈðaʊt ˈkwɛsʧən, pəˈsjuːɪŋ ə ˈdɛdɪkeɪtɪd ˈpɑːstaɪm ɪz ˌɪndɪsˈpɛnsəbl/",
            b1FocusNotes: "Clear transitional device 'Moreover, through hobbies...' and accessible vocabulary.",
            b2FocusNotes: "Abstract vocabulary ('indispensable', 'psychological burnout', 'fosters personal growth')."
          }
        ]
      },
      {
        id: "transportation",
        title: "Public Transportation",
        description: "Questions about commuting, modes of transport, and future public transport trends.",
        iconName: "Bus",
        questions: [
          {
            id: "transportation-1",
            topicId: "transportation",
            topicTitle: "Public Transportation",
            text: "How do you usually travel around your town or city?",
            keywordsB1: [
              "travel by motorbike (đi lại bằng xe máy)",
              "fast and convenient (nhanh và tiện lợi)",
              "small streets (đường phố nhỏ hẹp)",
              "avoid traffic jams (tránh kẹt xe)",
              "take a bus on rainy days (đi xe buýt khi trời mưa)"
            ],
            keywords: [
              "primary mode of daily commuting (phương tiện đi lại chính hàng ngày)",
              "lightweight electric scooter (xe máy điện nhỏ gọn)",
              "maneuver effortlessly through dense traffic (di chuyển dễ dàng qua giao thông đông đúc)",
              "minimal carbon footprint (dấu chân carbon tối thiểu)",
              "on-demand ride-hailing services (dịch vụ đặt xe công nghệ)"
            ],
            tips: [
              "State your primary vehicle (motorbike, bus, bicycle).",
              "Explain why it fits your city's traffic.",
              "Mention an alternative for bad weather."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/haʊ duː juː ˈjuːʒʊəli ˈtrævl əˈraʊnd jɔː taʊn ɔː ˈsɪti/",
                intonation: "Falling intonation at end 'city↘'.",
                stressAndLinking: "Stress 'usually', 'travel', 'town', 'city'."
              },
              vietnamese: {
                huongDanPhatAm: "'Travel' /ˈtræv.əl/, 'Commute' /kəˈmjuːt/.",
                nguDieuVaNhanGiong: "Đi xuống giọng ở cuối câu Wh-. Giữ nhịp nói thong thả.",
                meoTraLoi: "Trả lời phương tiện trước, sau đó nêu ưu điểm (linh hoạt, nhanh chóng)."
              }
            },
            modelAnswerB1: "I usually travel around my city by motorbike because it is fast and very convenient. My city has many small streets, so riding a motorbike helps me avoid getting stuck in traffic. When it rains heavily, I prefer taking a bus or booking a Grab car.",
            modelAnswerB2: "My primary mode of daily commuting is a lightweight electric scooter. It enables me to maneuver effortlessly through dense urban traffic during rush hours while keeping my carbon footprint minimal. On rainy days, however, I rely on on-demand ride-hailing services.",
            modelAnswer: "My primary mode of daily commuting is a lightweight electric scooter. It enables me to maneuver effortlessly through dense urban traffic during rush hours while keeping my carbon footprint minimal. On rainy days, however, I rely on on-demand ride-hailing services.",
            modelAnswerPhonetics: "/maɪ ˈpraɪməri məʊd əv ˈdeɪli kəˈmjuːtɪŋ ɪz ə ˈlaɪtweɪt ɪˈlɛktrɪk ˈskuːtə/",
            b1FocusNotes: "Practical rationale ('fast and convenient', 'avoid getting stuck in traffic') with everyday examples.",
            b2FocusNotes: "Advanced collocations ('maneuver effortlessly', 'dense urban traffic', 'carbon footprint minimal')."
          },
          {
            id: "transportation-2",
            topicId: "transportation",
            topicTitle: "Public Transportation",
            text: "What is the most popular mode of transport in your country?",
            keywordsB1: [
              "motorbikes (xe máy)",
              "most popular vehicle (phương tiện phổ biến nhất)",
              "every family owns one (mỗi gia đình đều sở hữu)",
              "affordable and easy to park (giá cả phải chăng và dễ đỗ xe)",
              "convenient for daily shopping (tiện lợi cho mua sắm hàng ngày)"
            ],
            keywords: [
              "overwhelmingly the predominant mode (áp đảo là phương tiện chủ đạo)",
              "sheer ubiquity (sự phổ biến ở khắp nơi)",
              "agility on narrow streets (tính cơ động trên đường hẹp)",
              "newly constructed urban metro (tàu điện đô thị mới xây)",
              "gaining traction among commuters (ngày càng thu hút người đi làm)"
            ],
            tips: [
              "Name the motorbike as Vietnam's #1 vehicle.",
              "Give reasons: price, size, agility on alleyways.",
              "Mention recent new options like metro trains."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wɒt ɪz ðə məʊst ˈpɒpjʊlər məʊd əv ˈtrænspɔːt ɪn jɔː ˈkʌntri/",
                intonation: "Falling intonation on 'country↘'.",
                stressAndLinking: "Stress 'most', 'popular', 'mode', 'transport', 'country'."
              },
              vietnamese: {
                huongDanPhatAm: "'Popular' /ˈpɒp.jə.lər/, 'Ubiquitous' /juːˈbɪk.wɪ.təs/.",
                nguDieuVaNhanGiong: "Nhấn mạnh từ chỉ số lượng hoặc tính phổ biến: 'overwhelmingly', 'without doubt'.",
                meoTraLoi: "Dẫn chứng thực tế tại Việt Nam: xe máy linh hoạt trên ngõ nhỏ."
              }
            },
            modelAnswerB1: "In Vietnam, the motorbike is definitely the most popular vehicle. Almost every family owns at least one or two motorbikes because they are affordable, easy to park, and very convenient for daily travel and shopping in narrow streets.",
            modelAnswerB2: "Motorbikes are overwhelmingly the predominant mode of transport throughout Vietnam. Their sheer ubiquity stems from their affordability and agility on narrow streets, although newly constructed urban metro systems are steadily gaining traction among younger commuters.",
            modelAnswer: "Motorbikes are overwhelmingly the predominant mode of transport throughout Vietnam. Their sheer ubiquity stems from their affordability and agility on narrow streets, although newly constructed urban metro systems are steadily gaining traction among younger commuters.",
            modelAnswerPhonetics: "/ˈməʊtəˌbaɪks ɑːr ˌəʊvəˈwɛlmɪŋli ðə prɪˈdɒmɪnənt məʊd əv ˈtrænspɔːt/",
            b1FocusNotes: "Direct, realistic description suitable for B1 test takers, using 'definitely the most popular' and clear reasons.",
            b2FocusNotes: "High-level vocabulary ('predominant mode', 'sheer ubiquity', 'gaining traction') and complex concession clause."
          },
          {
            id: "transportation-3",
            topicId: "transportation",
            topicTitle: "Public Transportation",
            text: "Do you think public transport will replace private cars in the future?",
            keywordsB1: [
              "more popular (phổ biến hơn)",
              "not completely replace (không thay thế hoàn toàn)",
              "cleaner and cheaper (sạch sẽ và rẻ hơn)",
              "privacy and freedom (sự riêng tư và tự do)",
              "family road trips (chuyến đi chơi cùng gia đình)"
            ],
            keywords: [
              "dominate major metropolitan centers (thống trị các trung tâm đại đô thị)",
              "pressing environmental mandates (yêu cầu cấp bách về môi trường)",
              "high-speed rail networks (mạng lưới đường sắt tốc độ cao)",
              "render private vehicles obsolete (khiến xe cá nhân trở nên lỗi thời)",
              "personal autonomy and privacy (sự chủ động cá nhân và riêng tư)"
            ],
            tips: [
              "Give a balanced answer ('Partially, but not totally').",
              "Pro-public transit: eco-friendly, fast metro.",
              "Pro-private cars: family convenience, flexible schedule."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː θɪŋk ˈpʌblɪk ˈtrænspɔːt wɪl rɪˈpleɪs ˈpraɪvɪt kɑːz ɪn ðə ˈfjuːʧər/",
                intonation: "Rising-falling tone. Rise on 'future↗/↘'.",
                stressAndLinking: "Stress 'public transport', 'replace', 'private cars', 'future'."
              },
              vietnamese: {
                huongDanPhatAm: "'Public' /ˈpʌb.lɪk/, 'Replace' /rɪˈpleɪs/, 'Future' /ˈfjuː.ʧər/.",
                nguDieuVaNhanGiong: "Thể hiện góc nhìn hai chiều: 'While public transit will dominate, private cars will still exist'.",
                meoTraLoi: "Dùng từ nối đối lập: 'While...', 'However...', 'On balance...'"
              }
            },
            modelAnswerB1: "I think public transport will become much more popular, but it might not completely replace private cars. Electric buses and trains are cheaper and greener, but private cars still give people more privacy and freedom when traveling with their families.",
            modelAnswerB2: "I anticipate that high-speed rail and electric bus networks will dominate major metropolitan centers due to pressing environmental mandates. Nevertheless, I doubt private vehicles will become obsolete entirely, as personal autonomy, family travel, and privacy remain deeply valued.",
            modelAnswer: "I anticipate that high-speed rail and electric bus networks will dominate major metropolitan centers due to pressing environmental mandates. Nevertheless, I doubt private vehicles will become obsolete entirely, as personal autonomy, family travel, and privacy remain deeply valued.",
            modelAnswerPhonetics: "/aɪ ænˈtɪsɪpeɪt ðæt haɪ-spiːd reɪl ænd ɪˈlɛktrɪk bʌs ˈnɛtwɜːks/",
            b1FocusNotes: "Clear balance using 'but it might not completely replace' and comparative adjectives ('cheaper and greener').",
            b2FocusNotes: "Advanced future forecasting ('I anticipate that...'), strong transition ('Nevertheless'), and formal lexical choices ('obsolete', 'mandates')."
          }
        ]
      }
    ]
  },
  {
    id: "set-3",
    title: "Set 3: Food & Accommodation",
    level: "Target Band B1 & B2 Benchmarks",
    topics: [
      {
        id: "food",
        title: "Food & Cooking",
        description: "Questions about culinary preferences, family cooking roles, and culinary skills for youth.",
        iconName: "Utensils",
        questions: [
          {
            id: "food-1",
            topicId: "food",
            topicTitle: "Food & Cooking",
            text: "What kind of food do you like to eat?",
            keywordsB1: [
              "traditional Vietnamese food (món ăn truyền thống Việt Nam)",
              "beef noodle soup - Pho (phở bò)",
              "fresh vegetables and herbs (rau sống và rau thơm)",
              "delicious and light (ngon và thanh nhẹ)",
              "good for health (tốt cho sức khỏe)"
            ],
            keywords: [
              "profound appreciation for gastronomy (sự trân trọng sâu sắc với ẩm thực)",
              "authentic Vietnamese cuisine (ẩm thực Việt Nam đích thực)",
              "aromatic broths (nước dùng thơm lừng)",
              "caramelized clay-pot dishes (món kho tộ đậm đà)",
              "subtle harmony of fresh herbs (sự hòa quyện tinh tế của rau thơm)"
            ],
            tips: [
              "Name specific favorite dishes (Pho, spring rolls, Bun Cha).",
              "Describe the flavors and health aspects.",
              "Explain why you enjoy home-style cooking."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wɒt kaɪnd əv fuːd duː juː laɪk tuː iːt/",
                intonation: "Wh-question: Falling intonation on 'eat↘'.",
                stressAndLinking: "Stress 'kind', 'food', 'like', 'eat'. Link 'kind of' /kaɪndəv/."
              },
              vietnamese: {
                huongDanPhatAm: "'Food' /fuːd/ chú ý âm /uː/ dài và /d/ cuối. 'Cuisine' /kwɪˈziːn/ nhấn âm 2.",
                nguDieuVaNhanGiong: "Lên giọng nhẹ ở các danh từ liệt kê, hạ giọng khi kết thúc.",
                meoTraLoi: "Cấu trúc: 'I have a sweet tooth / a strong preference for...' + ví dụ món ăn."
              }
            },
            modelAnswerB1: "I really love traditional Vietnamese food, especially beef noodle soup (Pho) and fresh spring rolls. I like this food because it uses lots of fresh vegetables and herbs, so it is delicious, light, and very good for my health.",
            modelAnswerB2: "I have a profound appreciation for authentic Vietnamese gastronomy, particularly aromatic broths like Pho and caramelized clay-pot dishes. I am drawn to the subtle harmony of fresh herbs, zesty lime, and savory fish sauce, which achieves a delightful balance of flavor and wholesome nutrition.",
            modelAnswer: "I have a profound appreciation for authentic Vietnamese gastronomy, particularly aromatic broths like Pho and caramelized clay-pot dishes. I am drawn to the subtle harmony of fresh herbs, zesty lime, and savory fish sauce, which achieves a delightful balance of flavor and wholesome nutrition.",
            modelAnswerPhonetics: "/aɪ hæv ə prəˈfaʊnd əˌpriːʃɪˈeɪʃən fɔːr ɔːˈθɛntɪk ˌvjɛtnəˈmiːz ɡæsˈtrɒnəmi/",
            b1FocusNotes: "Clear, fluent intermediate delivery highlighting fresh ingredients and health benefits.",
            b2FocusNotes: "Rich sensory culinary vocabulary ('aromatic broths', 'subtle harmony', 'wholesome nutrition')."
          },
          {
            id: "food-2",
            topicId: "food",
            topicTitle: "Food & Cooking",
            text: "Who does the cooking in your family?",
            keywordsB1: [
              "my mother (mẹ tôi)",
              "great cook (nấu ăn rất ngon)",
              "everyone's favorite dishes (món ăn yêu thích của mọi người)",
              "help on the weekend (giúp đỡ vào cuối tuần)",
              "wash the dishes (rửa bát đĩa)"
            ],
            keywords: [
              "undisputedly the culinary mastermind (không thể bàn cãi là đầu bếp chính)",
              "effortlessly whipping up meals (dễ dàng nấu những bữa ăn ngon)",
              "wholesome family meals (bữa cơm gia đình ấm cúng bổ dưỡng)",
              "pitch in to assist (cùng nhau xắn tay vào giúp đỡ)",
              "well-deserved respite (khoảng nghỉ ngơi xứng đáng)"
            ],
            tips: [
              "Identify the main cook (Mother, Father, oneself).",
              "Compliment their cooking abilities.",
              "Mention how family members share kitchen chores."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/huː dʌz ðə ˈkʊkɪŋ ɪn jɔː ˈfæmɪli/",
                intonation: "Falling intonation on 'family↘'.",
                stressAndLinking: "Stress 'who', 'cooking', 'family'. Link 'in your' /ɪnjɔː/."
              },
              vietnamese: {
                huongDanPhatAm: "'Cooking' /ˈkʊk.ɪŋ/ âm /ʊ/ ngắn, 'Household' /ˈhaʊs.həʊld/.",
                nguDieuVaNhanGiong: "Nhấn mạnh tên thành viên trong gia đình và vai trò của họ.",
                meoTraLoi: "Khen ngợi tay nghề nấu nướng: 'My mom is an exceptional cook who...'"
              }
            },
            modelAnswerB1: "My mother does most of the cooking in my family because she is a great cook and knows everyone's favorite dishes. However, on the weekend, my sister and I often help her chop vegetables and wash the dishes after dinner.",
            modelAnswerB2: "My mother is undisputedly the culinary mastermind in our household, effortlessly whipping up wholesome family meals each evening. That being said, my siblings and I frequently pitch in over the weekend to experiment with Western recipes, giving our mother a well-deserved respite.",
            modelAnswer: "My mother is undisputedly the culinary mastermind in our household, effortlessly whipping up wholesome family meals each evening. That being said, my siblings and I frequently pitch in over the weekend to experiment with Western recipes, giving our mother a well-deserved respite.",
            modelAnswerPhonetics: "/maɪ ˈmʌðər ɪz ˌʌndɪsˈpjuːtɪdli ðə ˈkʌlɪnəri ˈmɑːstəˌmaɪnd/",
            b1FocusNotes: "Everyday family vocabulary ('does most of the cooking', 'chop vegetables and wash the dishes').",
            b2FocusNotes: "Idiomatic phrasing ('culinary mastermind', 'whipping up', 'pitch in', 'well-deserved respite')."
          },
          {
            id: "food-3",
            topicId: "food",
            topicTitle: "Food & Cooking",
            text: "Do you think young people should learn how to cook?",
            keywordsB1: [
              "definitely learn to cook (chắc chắn nên học nấu ăn)",
              "prepare simple meals (nấu các bữa ăn đơn giản)",
              "take care of themselves (tự chăm sóc bản thân)",
              "cleaner and cheaper (sạch sẽ và tiết kiệm hơn)",
              "eating out every day (ăn ngoài hàng ngày)"
            ],
            keywords: [
              "essential life skill (kỹ năng sống thiết yếu)",
              "nurtures self-reliance (rèn luyện tính tự lập)",
              "financial prudence (sự tính toán tài chính khôn ngoan)",
              "superior dietary habits (thói quen ăn uống vượt trội)",
              "avoid sodium-heavy fast food (tránh thức ăn nhanh nhiều muối/dầu mỡ)"
            ],
            tips: [
              "Strong affirmative answer ('Yes, definitely' or 'Absolutely').",
              "Reason 1: Independence when living away from parents.",
              "Reason 2: Financial savings and healthier nutrition."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː θɪŋk jʌŋ ˈpiːpl ʃʊd lɜːn haʊ tuː kʊk/",
                intonation: "Yes/No question: Rise on 'cook↗'.",
                stressAndLinking: "Stress 'think', 'young people', 'learn', 'cook'."
              },
              vietnamese: {
                huongDanPhatAm: "'Young people' /jʌŋ ˈpiː.pəl/, 'Independence' /ˌɪn.dɪˈpen.dəns/.",
                nguDieuVaNhanGiong: "Dùng ngữ điệu khẳng định mạnh mẽ khi bắt đầu.",
                meoTraLoi: "Nhấn mạnh tác dụng đối với cuộc sống tự lập của sinh viên và người trẻ."
              }
            },
            modelAnswerB1: "Yes, I definitely think young people should learn to cook. When they know how to prepare simple meals, they can take care of themselves when living away from home. Also, cooking at home is much cleaner and cheaper than eating out every day.",
            modelAnswerB2: "Absolutely. Culinary competence is an essential life skill that nurtures self-reliance and financial prudence. Young adults who cook independently tend to maintain superior dietary habits by avoiding sodium-heavy fast food while saving substantial amounts of money.",
            modelAnswer: "Absolutely. Culinary competence is an essential life skill that nurtures self-reliance and financial prudence. Young adults who cook independently tend to maintain superior dietary habits by avoiding sodium-heavy fast food while saving substantial amounts of money.",
            modelAnswerPhonetics: "/ˌæbsəˈluːtli. ˈkʌlɪnəri ˈkɒmpɪtəns ɪz ən ɪˈsɛnʃəl laɪf skɪl/",
            b1FocusNotes: "Time clauses with 'When they know how to...' and practical comparisons ('cleaner and cheaper than eating out').",
            b2FocusNotes: "Advanced nominalization ('culinary competence', 'self-reliance', 'financial prudence') and relative clauses."
          }
        ]
      },
      {
        id: "neighborhood",
        title: "Accommodation & Neighborhood",
        description: "Questions about housing types, neighborhood features, and future relocation plans.",
        iconName: "Home",
        questions: [
          {
            id: "neighborhood-1",
            topicId: "neighborhood",
            topicTitle: "Accommodation & Neighborhood",
            text: "Do you live in a house or an apartment?",
            keywordsB1: [
              "small apartment (căn hộ nhỏ)",
              "fifth floor of a building (tầng 5 của tòa nhà)",
              "two bedrooms (hai phòng ngủ)",
              "small balcony (ban công nhỏ)",
              "clean, safe, and quiet (sạch sẽ, an toàn và yên tĩnh)"
            ],
            keywords: [
              "modern condominium (căn hộ chung cư hiện đại)",
              "twelfth floor of a high-rise (tầng 12 chung cư cao tầng)",
              "abundant natural sunlight (ngập tràn ánh sáng tự nhiên)",
              "24/7 security surveillance (hệ thống an ninh giám sát 24/7)",
              "panoramic skyline view (tầm nhìn bao quát đường chân trời thành phố)"
            ],
            tips: [
              "State your housing type (house or apartment) directly.",
              "Describe layout and floor level.",
              "Mention 1 key feature you appreciate (view, balcony, security)."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː lɪv ɪn ə haʊs ɔːr ən əˈpɑːtmənt/",
                intonation: "Choice question: Rise on 'house↗', fall on 'apartment↘'.",
                stressAndLinking: "Stress 'live', 'house', 'apartment'. Link 'live in a' /lɪvɪnə/."
              },
              vietnamese: {
                huongDanPhatAm: "'Apartment' /əˈpɑːt.mənt/ nhấn âm 2. 'House' /haʊs/ chú ý âm /s/ cuối.",
                nguDieuVaNhanGiong: "Câu hỏi lựa chọn 'or': Lên giọng ở vế đầu (house↗), xuống giọng ở vế sau (apartment↘).",
                meoTraLoi: "Miêu tả vị trí và đặc điểm nổi bật nhất của căn nhà."
              }
            },
            modelAnswerB1: "I live in a small apartment on the fifth floor of a building with my family. It has two bedrooms, a cozy living room, and a small balcony. I feel very comfortable living there because the building is clean, safe, and quiet.",
            modelAnswerB2: "Currently, I reside in a modern condominium on the twelfth floor of a high-rise residential complex. What I appreciate most is the abundant natural sunlight, 24/7 security surveillance, and the peaceful panoramic view overlooking the city skyline from my private balcony.",
            modelAnswer: "Currently, I reside in a modern condominium on the twelfth floor of a high-rise residential complex. What I appreciate most is the abundant natural sunlight, 24/7 security surveillance, and the peaceful panoramic view overlooking the city skyline from my private balcony.",
            modelAnswerPhonetics: "/ˈkʌrəntli, aɪ rɪˈzaɪd ɪn ə ˈmɒdən ˌkɒndəˈmɪnɪəm ɒn ðə/",
            b1FocusNotes: "Clear descriptive adjectives ('cozy living room', 'clean, safe, and quiet') and accurate room prepositions.",
            b2FocusNotes: "Cleft sentence structure ('What I appreciate most is...') and rich housing vocabulary ('condominium', 'surveillance', 'panoramic view')."
          },
          {
            id: "neighborhood-2",
            topicId: "neighborhood",
            topicTitle: "Accommodation & Neighborhood",
            text: "What do you like most about your neighborhood?",
            keywordsB1: [
              "friendly atmosphere (không khí thân thiện)",
              "convenient location (vị trí tiện lợi)",
              "supermarkets and cafes (siêu thị và quán cà phê)",
              "few minutes on foot (vài phút đi bộ)",
              "kind neighbors (hàng xóm tốt bụng)"
            ],
            keywords: [
              "standout attribute (điểm nổi bật nhất)",
              "outstanding proximity to amenities (vị trí gần các tiện ích xuất sắc)",
              "artisanal cafes and organic grocers (quán cà phê phong cách và cửa hàng hữu cơ)",
              "tree-lined public park (công viên công cộng rợp bóng cây)",
              "exceptionally welcoming community (cộng đồng dân cư vô cùng mến khách)"
            ],
            tips: [
              "Highlight the #1 feature (convenience, friendly neighbors, green parks).",
              "Give concrete examples of nearby places.",
              "Summarize the positive feeling it gives you."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wɒt duː juː laɪk məʊst əˈbaʊt jɔː ˈneɪbəhʊd/",
                intonation: "Falling intonation on 'neighborhood↘'.",
                stressAndLinking: "Stress 'like most', 'neighborhood'."
              },
              vietnamese: {
                huongDanPhatAm: "'Neighborhood' /ˈneɪ.bə.hʊd/ nhấn âm 1. 'Proximity' /prɒkˈsɪm.ə.ti/.",
                nguDieuVaNhanGiong: "Nhấn giọng ở cụm từ chỉ điểm cộng tốt nhất.",
                meoTraLoi: "Dùng cụm: 'What appeals to me most is...', 'The standout feature is...'"
              }
            },
            modelAnswerB1: "What I like most is the friendly atmosphere and the convenient location. There are supermarkets, coffee shops, and a pharmacy just a few minutes away on foot. My neighbors are also very kind and always willing to help.",
            modelAnswerB2: "The standout attribute of my neighborhood is its outstanding proximity to essential public amenities. Within a brief stroll, I have access to artisanal cafes, organic grocers, and a tree-lined public park where I jog daily. Furthermore, the local community is exceptionally welcoming.",
            modelAnswer: "The standout attribute of my neighborhood is its outstanding proximity to essential public amenities. Within a brief stroll, I have access to artisanal cafes, organic grocers, and a tree-lined public park where I jog daily. Furthermore, the local community is exceptionally welcoming.",
            modelAnswerPhonetics: "/ðə ˈstændaʊt ˈætrɪbjuːt əv maɪ ˈneɪbəhʊd ɪz ɪts aʊtˈstændɪŋ/",
            b1FocusNotes: "Practical amenities listed clearly with distance descriptor ('just a few minutes away on foot').",
            b2FocusNotes: "Precise collocations ('standout attribute', 'outstanding proximity', 'tree-lined public park')."
          },
          {
            id: "neighborhood-3",
            topicId: "neighborhood",
            topicTitle: "Accommodation & Neighborhood",
            text: "Would you like to move to a different area in the future?",
            keywordsB1: [
              "move to a coastal city (chuyển đến thành phố biển)",
              "Da Nang city (thành phố Đà Nẵng)",
              "live near the beach (sống gần bãi biển)",
              "fresh sea air (không khí biển trong lành)",
              "peaceful lifestyle (lối sống yên bình)"
            ],
            keywords: [
              "should the opportunity present itself (nếu cơ hội đến)",
              "relish the chance to relocate (rất mong muốn có cơ hội chuyển đến)",
              "laid-back coastal tempo (nhịp sống ven biển thư thái)",
              "unpolluted air quality (chất lượng không khí trong lành)",
              "rejuvenating contrast (sự tương phản giúp hồi phục năng lượng)"
            ],
            tips: [
              "Answer Yes/No with conditional phrasing.",
              "If Yes: Name an attractive destination (coastal city, suburb).",
              "Contrast it with your current daily routine."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/wʊd juː laɪk tuː muːv tuː ə ˈdɪfrənt ˈeərɪə ɪn ðə ˈfjuːʧər/",
                intonation: "Rising tone on 'future↗'.",
                stressAndLinking: "Stress 'like', 'move', 'different area', 'future'."
              },
              vietnamese: {
                huongDanPhatAm: "'Relocate' /ˌriː.ləʊˈkeɪt/, 'Coastal' /ˈkəʊ.stəl/.",
                nguDieuVaNhanGiong: "Sử dụng ngữ điệu giả định tự nhiên: 'If the opportunity arises, I would...'",
                meoTraLoi: "Nêu lý do liên quan đến công việc hoặc chất lượng sống."
              }
            },
            modelAnswerB1: "Yes, in the future, I would like to move to a coastal city like Da Nang. I want to live near the beach so that I can enjoy the fresh sea air and go swimming on weekends. It would be a very peaceful and healthy lifestyle.",
            modelAnswerB2: "Should the opportunity present itself, I would relish the chance to relocate to a coastal hub such as Da Nang or Nha Trang. I am strongly attracted to the laid-back coastal tempo, cleaner air quality, and access to outdoor water sports, offering a rejuvenating contrast to dense city living.",
            modelAnswer: "Should the opportunity present itself, I would relish the chance to relocate to a coastal hub such as Da Nang or Nha Trang. I am strongly attracted to the laid-back coastal tempo, cleaner air quality, and access to outdoor water sports, offering a rejuvenating contrast to dense city living.",
            modelAnswerPhonetics: "/ʃʊd ðɪ ˌɒpəˈtjuːnɪti prɪˈzɛnt ɪtˈsɛlf, aɪ wʊd ˈrɛlɪʃ ðə ʧɑːns/",
            b1FocusNotes: "Purpose clause with 'so that I can enjoy...' and optimistic future expectation.",
            b2FocusNotes: "Inversion conditional ('Should the opportunity present itself...'), expressive verbs ('relish the chance to relocate'), participle modifiers."
          }
        ]
      }
    ]
  },
  {
    id: "set-4",
    title: "Set 4: Travel & Technology",
    level: "Target Band B1 & B2 Benchmarks",
    topics: [
      {
        id: "travel",
        title: "Travel & Holidays",
        description: "Questions about vacation experiences, travel preferences, and group vs solo journeys.",
        iconName: "Plane",
        questions: [
          {
            id: "travel-1",
            topicId: "travel",
            topicTitle: "Travel & Holidays",
            text: "Do you enjoy traveling to new places?",
            keywordsB1: [
              "really enjoy traveling (rất thích đi du lịch)",
              "discover new cultures (khám phá nền văn hóa mới)",
              "delicious local specialties (đặc sản địa phương ngon)",
              "beautiful landscapes (phong cảnh đẹp)",
              "feel refreshed (cảm thấy sảng khoái)"
            ],
            keywords: [
              "avid globetrotter (người đam mê du lịch vòng quanh thế giới)",
              "stepping outside my comfort zone (bước ra khỏi vùng an toàn)",
              "broadens my worldview (mở rộng thế giới quan)",
              "rich cultural customs (phong tục văn hóa phong phú)",
              "cherished memories (những kỷ niệm quý giá)"
            ],
            tips: [
              "Open with enthusiasm ('Yes, I really enjoy...' or 'Without hesitation, yes!').",
              "State 2 motivations (culture, scenery, relaxation).",
              "Mention how travel revitalizes you."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː ɪnˈʤɔɪ ˈtrævlɪŋ tuː njuː ˈpleɪsɪz/",
                intonation: "Yes/No rise on 'places↗'.",
                stressAndLinking: "Stress 'enjoy', 'traveling', 'new places'."
              },
              vietnamese: {
                huongDanPhatAm: "'Travel' /ˈtræv.əl/, 'Broaden' /ˈbrɔː.dən/.",
                nguDieuVaNhanGiong: "Thể hiện niềm vui và sự hào hứng qua tông giọng ấm áp.",
                meoTraLoi: "Mở đầu bằng 'I am an avid traveler', 'It allows me to broaden my horizons'."
              }
            },
            modelAnswerB1: "Yes, I really enjoy traveling to new places whenever I have vacation time. Traveling helps me discover new cultures, try delicious local specialties, and see beautiful landscapes. It always makes me feel happy and refreshed.",
            modelAnswerB2: "Without hesitation, yes! I consider myself an avid globetrotter who thrives on stepping outside my comfort zone. Exploring unfamiliar destinations broadens my worldview, exposes me to rich cultural customs, and creates cherished memories that endure long after returning home.",
            modelAnswer: "Without hesitation, yes! I consider myself an avid globetrotter who thrives on stepping outside my comfort zone. Exploring unfamiliar destinations broadens my worldview, exposes me to rich cultural customs, and creates cherished memories that endure long after returning home.",
            modelAnswerPhonetics: "/wɪˈðaʊt ˌhɛzɪˈteɪʃən, jɛs! aɪ kənˈsɪdər maɪˈsɛlf ən ˈævɪd ˈɡləʊbˌtrɒtər/",
            b1FocusNotes: "Clean parallel verbs ('discover new cultures, try delicious specialties, and see landscapes') and natural closing.",
            b2FocusNotes: "Metaphorical phrasing ('stepping outside my comfort zone', 'broadens my worldview', 'memories that endure')."
          },
          {
            id: "travel-2",
            topicId: "travel",
            topicTitle: "Travel & Holidays",
            text: "Where did you go on your last holiday?",
            keywordsB1: [
              "Da Lat city (thành phố Đà Lạt)",
              "two close friends (hai người bạn thân)",
              "pleasantly cool weather (thời tiết se lạnh dễ chịu)",
              "flower gardens and coffee (vườn hoa và quán cà phê)",
              "grilled rice paper at night market (bánh tráng nướng ở chợ đêm)"
            ],
            keywords: [
              "four-day retreat (kỳ nghỉ dưỡng 4 ngày)",
              "pine-covered hills (đồi thông bạt ngàn)",
              "savoring locally brewed coffee (thưởng thức cà phê pha tại chỗ)",
              "bustling night market (chợ đêm nhộn nhịp)",
              "regional street delicacies (đặc sản đường phố vùng miền)"
            ],
            tips: [
              "Specify destination, companions, and trip duration.",
              "Mention the weather and atmosphere.",
              "List 2 memorable activities."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/weər dɪd juː ɡəʊ ɒn jɔː lɑːst ˈhɒlɪdeɪ/",
                intonation: "Wh-question: Falling intonation on 'holiday↘'.",
                stressAndLinking: "Stress 'where', 'go', 'last holiday'."
              },
              vietnamese: {
                huongDanPhatAm: "'Holiday' /ˈhɒl.ə.deɪ/, 'Picturesque' /ˌpɪk.ʧərˈesk/.",
                nguDieuVaNhanGiong: "Sử dụng thì Quá khứ đơn (Past Simple) chuẩn xác.",
                meoTraLoi: "Nêu địa điểm + người đi cùng + hoạt động chính."
              }
            },
            modelAnswerB1: "On my last holiday, I went to Da Lat city with two close friends for three days. The weather there was pleasantly cool and chilly. We visited famous flower gardens, drank warm coffee by Xuan Huong Lake, and enjoyed delicious grilled rice paper at the night market.",
            modelAnswerB2: "For my most recent getaway, I embarked on a four-day retreat to Da Lat with my close companions. We spent our days trekking through pine-covered hills, savoring locally brewed drip coffee by Xuan Huong Lake, and exploring bustling night markets brimming with regional street delicacies.",
            modelAnswer: "For my most recent getaway, I embarked on a four-day retreat to Da Lat with my close companions. We spent our days trekking through pine-covered hills, savoring locally brewed drip coffee by Xuan Huong Lake, and exploring bustling night markets brimming with regional street delicacies.",
            modelAnswerPhonetics: "/fɔː maɪ məʊst ˈriːsnt ˈɡɛtəweɪ, aɪ ɪmˈbɑːkt ɒn ə fɔː-deɪ rɪˈtriːt/",
            b1FocusNotes: "Accurate Past Simple sequence ('went', 'was', 'visited', 'drank', 'enjoyed') with authentic local details.",
            b2FocusNotes: "Vivid descriptive imagery ('embarked on a four-day retreat', 'pine-covered hills', 'brimming with regional delicacies')."
          },
          {
            id: "travel-3",
            topicId: "travel",
            topicTitle: "Travel & Holidays",
            text: "Do you prefer traveling alone or with friends/family?",
            keywordsB1: [
              "travel with friends or family (đi du lịch với bạn bè hoặc gia đình)",
              "share funny moments (chia sẻ khoảnh khắc vui vẻ)",
              "take pictures for each other (chụp ảnh cho nhau)",
              "split travel costs (chia sẻ chi phí du lịch)",
              "much more fun and safer (vui hơn và an toàn hơn nhiều)"
            ],
            keywords: [
              "unequivocally prefer traveling in company (chắc chắn thích đi du lịch có bạn đồng hành)",
              "shared laughter (tiếng cười chung)",
              "collective problem-solving (cùng nhau giải quyết vấn đề)",
              "mutual companionship (sự đồng hành lẫn nhau)",
              "shared milestones (những cột mốc đáng nhớ cùng nhau)"
            ],
            tips: [
              "Pick one preference clearly.",
              "If with friends/family: mention shared bonding, safety, cost splitting.",
              "Conclude why shared memories are special."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː prɪˈfɜː ˈtrævlɪŋ əˈləʊn ɔː wɪð frɛndz ɔː ˈfæmɪli/",
                intonation: "Choice question: Rise on 'alone↗', fall on 'family↘'.",
                stressAndLinking: "Stress 'prefer', 'traveling', 'alone', 'friends', 'family'."
              },
              vietnamese: {
                huongDanPhatAm: "'Prefer' /prɪˈfɜː/ nhấn âm 2. 'Alone' /əˈləʊn/.",
                nguDieuVaNhanGiong: "Lên giọng vế đầu (alone↗), hạ giọng vế sau (family↘).",
                meoTraLoi: "Nêu lý do thích đi cùng bạn bè/gia đình (vui hơn, an toàn hơn, tiết kiệm chi phí)."
              }
            },
            modelAnswerB1: "I prefer traveling with my friends or family rather than going alone. When we travel together, we can share funny moments, take pictures for each other, and split travel costs like hotel rooms and meals. It is much more fun and safer.",
            modelAnswerB2: "I unequivocally prefer traveling in the company of close friends or family. The shared laughter, collective problem-solving during unexpected travel delays, and mutual companionship enrich the entire itinerary. While solo travel builds independence, shared milestones hold far greater emotional value for me.",
            modelAnswer: "I unequivocally prefer traveling in the company of close friends or family. The shared laughter, collective problem-solving during unexpected travel delays, and mutual companionship enrich the entire itinerary. While solo travel builds independence, shared milestones hold far greater emotional value for me.",
            modelAnswerPhonetics: "/aɪ ˌʌnɪˈkwɪvəkəli prɪˈfɜː ˈtrævlɪŋ ɪn ðə ˈkʌmpəni əv kləʊs frɛndz/",
            b1FocusNotes: "Direct comparison using 'rather than going alone' and practical reasons ('split travel costs', 'take pictures').",
            b2FocusNotes: "Advanced stance adverb ('unequivocally prefer'), nuanced concession ('While solo travel builds independence...')."
          }
        ]
      },
      {
        id: "technology",
        title: "Technology & Social Media",
        description: "Questions about mobile apps, technological conveniences, and digital balance.",
        iconName: "Smartphone",
        questions: [
          {
            id: "technology-1",
            topicId: "technology",
            topicTitle: "Technology & Social Media",
            text: "How often do you use social media apps?",
            keywordsB1: [
              "use every day (dùng hàng ngày)",
              "one or two hours (một hoặc hai tiếng)",
              "chat with classmates (trò chuyện với bạn học)",
              "watch funny short videos (xem video ngắn hài hước)",
              "check news updates (xem cập nhật tin tức)"
            ],
            keywords: [
              "daily digital routine (thói quen kỹ thuật số hàng ngày)",
              "accumulating screen time (tổng thời lượng dùng màn hình)",
              "maintain long-distance connections (duy trì kết nối từ xa)",
              "track industry trends (theo dõi xu hướng ngành nghề)",
              "curate educational content (tuyển chọn nội dung học tập)"
            ],
            tips: [
              "State your frequency and approximate daily time.",
              "List key apps (Facebook, Instagram, Zalo, TikTok).",
              "Mention main purposes: socializing, learning, entertaining."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/haʊ ˈɒfn duː juː juːz ˈsəʊʃəl ˈmiːdiə æps/",
                intonation: "Falling intonation on 'apps↘'.",
                stressAndLinking: "Stress 'often', 'use', 'social media', 'apps'."
              },
              vietnamese: {
                huongDanPhatAm: "'Social media' /ˈsəʊ.ʃəl ˈmiː.di.ə/, 'Routine' /ruːˈtiːn/.",
                nguDieuVaNhanGiong: "Hạ giọng ở cuối câu. Nêu rõ tần suất và tên các ứng dụng.",
                meoTraLoi: "Cấu trúc: 'I check my phone multiple times a day, primarily for...'"
              }
            },
            modelAnswerB1: "I use social media apps like Facebook and Instagram every day for about one or two hours. I use them mainly to chat with my classmates, watch funny short videos, and check news updates from my favorite study pages.",
            modelAnswerB2: "I interact with social platforms like Instagram, LinkedIn, and Zalo on a daily basis, typically accumulating around ninety minutes of screen time. I utilize these tools primarily to maintain connections with long-distance acquaintances, follow industry trends, and curate educational content.",
            modelAnswer: "I interact with social platforms like Instagram, LinkedIn, and Zalo on a daily basis, typically accumulating around ninety minutes of screen time. I utilize these tools primarily to maintain connections with long-distance acquaintances, follow industry trends, and curate educational content.",
            modelAnswerPhonetics: "/aɪ ˌɪntərˈækt wɪð ˈsəʊʃəl ˈplætfɔːmz laɪk ˈɪnstəˌɡræm/",
            b1FocusNotes: "Simple, accurate frequency expression ('every day for about one or two hours') with everyday infinitive purposes.",
            b2FocusNotes: "Professional vocabulary ('interact with social platforms', 'accumulating screen time', 'curate educational content')."
          },
          {
            id: "technology-2",
            topicId: "technology",
            topicTitle: "Technology & Social Media",
            text: "In what ways has technology made your daily life easier?",
            keywordsB1: [
              "transfer money in seconds (chuyển tiền trong vài giây)",
              "banking apps (ứng dụng ngân hàng)",
              "order food online (đặt đồ ăn trực tuyến)",
              "Google Maps directions (chỉ đường Google Maps)",
              "without getting lost (không bị lạc đường)"
            ],
            keywords: [
              "revolutionized daily productivity (cách mạng hóa hiệu suất hàng ngày)",
              "seamless contactless payments (thanh toán không tiếp xúc liền mạch)",
              "cloud-based collaboration tools (công cụ làm việc nhóm trên đám mây)",
              "remote productivity (làm việc hiệu quả từ xa)",
              "algorithmic navigation (hệ thống dẫn đường thuật toán)"
            ],
            tips: [
              "State 2 everyday conveniences (online banking, food delivery, GPS).",
              "Explain how they save you time and hassle.",
              "Summarize the positive impact on daily life."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/ɪn wɒt weɪz hæz tɛkˈnɒləʤi meɪd jɔː ˈdeɪli laɪf ˈiːzɪər/",
                intonation: "Falling intonation on 'easier↘'.",
                stressAndLinking: "Stress 'ways', 'technology', 'made', 'daily life', 'easier'."
              },
              vietnamese: {
                huongDanPhatAm: "'Technology' /tekˈnɒl.ə.dʒi/ nhấn âm 2. 'Convenience' /kənˈviː.ni.əns/.",
                nguDieuVaNhanGiong: "Nhấn mạnh các động từ chỉ sự tiện lợi: 'streamlines', 'facilitates'.",
                meoTraLoi: "Nêu 2 tác dụng rõ ràng: ví dụ chuyển khoản nhanh và xem bản đồ Google Maps."
              }
            },
            modelAnswerB1: "Technology has made my life much easier in many ways. For example, with a smartphone, I can transfer money in just a few seconds using banking apps, order food online, and easily find directions on Google Maps without getting lost.",
            modelAnswerB2: "Technology has revolutionized my daily productivity across virtually every facet. Seamless contactless payments eliminate the need to carry physical cash, cloud-based collaboration software enables productive remote work, and algorithmic navigation optimizes my daily travel routes.",
            modelAnswer: "Technology has revolutionized my daily productivity across virtually every facet. Seamless contactless payments eliminate the need to carry physical cash, cloud-based collaboration software enables productive remote work, and algorithmic navigation optimizes my daily travel routes.",
            modelAnswerPhonetics: "/tɛkˈnɒləʤi hæz ˌrɛvəˈluːʃənaɪzd maɪ ˈdeɪli ˌprɒdʌkˈtɪvɪti/",
            b1FocusNotes: "Practical real-world examples that any B1 student can relate to and deliver fluently without hesitation.",
            b2FocusNotes: "Advanced verbs and terminology ('revolutionized', 'seamless contactless payments', 'algorithmic navigation optimizes')."
          },
          {
            id: "technology-3",
            topicId: "technology",
            topicTitle: "Technology & Social Media",
            text: "Do you think people spend too much time on their smartphones nowadays?",
            keywordsB1: [
              "spend too much time (dành quá nhiều thời gian)",
              "look at screens during meals (nhìn vào màn hình trong bữa ăn)",
              "hanging out with friends (đi chơi với bạn bè)",
              "instead of talking (thay vì trò chuyện)",
              "bad for eyes and health (có hại cho mắt và sức khỏe)"
            ],
            keywords: [
              "epidemic proportions (mức độ phổ biến đáng báo động)",
              "excessive smartphone dependency (sự phụ thuộc điện thoại quá mức)",
              "substituting authentic face-to-face interaction (thay thế giao tiếp trực tiếp chân thực)",
              "superficial digital browsing (lướt web hời hợt)",
              "continuous sensory overload (quá tải cảm giác liên tục)"
            ],
            tips: [
              "Strong affirmative position ('Yes, I definitely agree').",
              "Describe observable situations (checking phones at meals/parties).",
              "Mention impact on eyesight and real-life human connection."
            ],
            pronunciationGuide: {
              english: {
                phonetic: "/duː juː θɪŋk ˈpiːpl spɛnd tuː mʌʧ taɪm ɒn ðeər ˈsmɑːtfəʊnz ˈnaʊədeɪz/",
                intonation: "Yes/No rise on 'nowadays↗'.",
                stressAndLinking: "Stress 'think', 'too much time', 'smartphones', 'nowadays'."
              },
              vietnamese: {
                huongDanPhatAm: "'Smartphones' /ˈsmɑːt.fəʊnz/, 'Nowadays' /ˈnaʊ.ə.deɪz/.",
                nguDieuVaNhanGiong: "Thể hiện quan điểm báo động nhẹ: 'Regrettably, excessive screen time is becoming a concern'.",
                meoTraLoi: "Dùng từ B2: 'detrimental to real-life connections', 'shortened attention span'."
              }
            },
            modelAnswerB1: "Yes, I think many people, especially teenagers, spend too much time on their smartphones. They often look at their screens during meals or when hanging out with friends instead of talking to each other. This is bad for their eyes and real-life relationships.",
            modelAnswerB2: "Undoubtedly so. Excessive smartphone dependency has reached epidemic proportions, frequently substituting authentic face-to-face interaction with superficial digital browsing. This continuous sensory overload not only impairs attention spans and sleep hygiene but also detracts from meaningful interpersonal relationships.",
            modelAnswer: "Undoubtedly so. Excessive smartphone dependency has reached epidemic proportions, frequently substituting authentic face-to-face interaction with superficial digital browsing. This continuous sensory overload not only impairs attention spans and sleep hygiene but also detracts from meaningful interpersonal relationships.",
            modelAnswerPhonetics: "/ʌnˈdaʊtɪdli səʊ. ɪkˈsɛsɪv ˈsmɑːtfəʊn dɪˈpɛndənsi hæz riːʧt/",
            b1FocusNotes: "Real-world observation ('during meals or when hanging out') and 'instead of + V-ing' structure.",
            b2FocusNotes: "Correlative conjunction ('not only impairs... but also detracts from...'), academic terminology ('sensory overload', 'sleep hygiene', 'interpersonal relationships')."
          }
        ]
      }
    ]
  }
];
