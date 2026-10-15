export type Language = 'sv' | 'en' | 'ar' | 'so'
export type Copy = (typeof copy)[Language]
export type IconName =
  | 'arrow' | 'back' | 'briefcase' | 'calendar' | 'check' | 'chevron' | 'document' | 'globe' | 'info'
  | 'message' | 'profile' | 'refresh' | 'send' | 'shield' | 'spark' | 'tools' | 'translate' | 'voice'

export const copy = {
  sv: {
    choose: 'Vad vill du göra?',
    chooseHint: 'Välj en uppgift. Vi tar ett steg i taget.',
    voice: 'Röst',
    language: 'Språk',
    home: 'Uppgifter',
    profile: 'Min profil',
    tasks: [
      ['Hitta schemat', 'Se tid och plats för nästa lektion.'],
      ['Svara på meddelande från skolan', 'Läs och svara med några enkla steg.'],
      ['Ladda upp CV', 'Välj och skicka en fil.'],
      ['Känna igen falskt SMS', 'Se tecken på att ett SMS inte är äkta.'],
      ['Lösa felmeddelande', 'Ta reda på vad du kan göra när något blir fel.'],
    ],
    areas: ['Informationshantering', 'Kommunikation', 'Skapa innehåll', 'Säkerhet', 'Problemlösning'],
    steps: [
      'Tryck på meddelandet från skolan',
      'Tryck i textrutan',
      'Skriv ditt svar',
      'Tryck på skicka',
      'Klart!',
    ],
    supports: ['Visa mig', 'Läs upp', 'Översätt', 'Jag kör själv'],
    showDesc: 'Animationen visar vad du ska trycka på.',
    quietOn: 'Du kör själv. Guiden väntar på dig.',
    wrong: 'Inte där – prova knappen pilen pekar på.',
    next: 'Nästa steg',
    doneNotes: [
      'Klart! Du öppnade meddelandet.',
      'Klart! Nu vet du var du skriver.',
      'Bra! Ditt svar är färdigt.',
      'Klart! Ditt svar är skickat.',
    ],
    school: 'Södergårdsskolan',
    message: 'Hej! Kan du komma på mötet på torsdag klockan 15?',
    placeholder: 'Skriv ett svar',
    reply: 'Ja, jag kommer. Tack!',
    sent: 'Skickat',
    finalTitle: 'Du klarade det själv.',
    finalQuestion: 'Vill du öva en gång till?',
    again: 'Öva igen',
    finish: 'Klar',
    profileTitle: 'Det här kan du',
    profileHint: 'Din profil växer när du gör riktiga uppgifter.',
    newAbility: 'Ny förmåga tillagd',
    abilities: [
      'Du kan hitta information i ett schema',
      'Du kan kommunicera digitalt',
      'Nästa steg: öva att skapa en fil',
      'Nästa steg: öva att känna igen falska SMS',
      'Nästa steg: öva att lösa ett fel',
    ],
    teacher: 'Gruppöversikt',
    teacherHint: 'Visar gruppens behov – aldrig enskilda elevers aktivitet.',
    group: 'SFI grupp C · 24 elever',
    needs: [
      ['8 av 24 elever', 'behöver öva på bifogade filer'],
      ['6 av 24 elever', 'behöver öva på säkra lösenord'],
      ['5 av 24 elever', 'behöver öva på att söka information'],
    ],
    privacy: 'Ingen individuell övervakning, inga tidsloggar och inga jämförelser.',
  },
  en: {
    choose: 'What would you like to do?', chooseHint: 'Choose a task. We take one step at a time.', voice: 'Voice', language: 'Language', home: 'Tasks', profile: 'My profile',
    tasks: [['Find the timetable', 'See the time and place for your next lesson.'], ['Reply to a message from school', 'Read and reply in a few simple steps.'], ['Upload a CV', 'Choose and send a file.'], ['Recognise a fake text message', 'Spot signs that a text is not genuine.'], ['Solve an error message', 'Find out what to do when something goes wrong.']],
    areas: ['Information', 'Communication', 'Create content', 'Safety', 'Problem solving'], steps: ['Tap the message from school', 'Tap the text box', 'Write your reply', 'Tap send', 'Done!'], supports: ['Show me', 'Read aloud', 'Translate', 'I will do it myself'], showDesc: 'The animation shows what to tap.', quietOn: 'You are doing it yourself. The guide will wait.', wrong: 'Not there – try the button the arrow points to.', next: 'Next step', doneNotes: ['Done! You opened the message.', 'Done! Now you know where to write.', 'Great! Your reply is ready.', 'Done! Your reply was sent.'], school: 'Södergård School', message: 'Hello! Can you come to the meeting on Thursday at 3 pm?', placeholder: 'Write a reply', reply: 'Yes, I will come. Thank you!', sent: 'Sent', finalTitle: 'You did it yourself.', finalQuestion: 'Would you like to practise once more?', again: 'Practise again', finish: 'Finish', profileTitle: 'What you can do', profileHint: 'Your profile grows when you complete real tasks.', newAbility: 'New ability added', abilities: ['You can find information in a timetable', 'You can communicate digitally', 'Next step: practise creating a file', 'Next step: practise recognising fake texts', 'Next step: practise solving an error'], teacher: 'Group overview', teacherHint: 'Shows the group’s needs – never individual student activity.', group: 'SFI group C · 24 learners', needs: [['8 of 24 learners', 'need to practise attached files'], ['6 of 24 learners', 'need to practise safe passwords'], ['5 of 24 learners', 'need to practise searching for information']], privacy: 'No individual monitoring, time logs or comparisons.',
  },
  ar: {
    choose: 'ماذا تريد أن تفعل؟', chooseHint: 'اختر مهمة. سنتقدم خطوة خطوة.', voice: 'الصوت', language: 'اللغة', home: 'المهام', profile: 'ملفي',
    tasks: [['العثور على الجدول', 'اعرف وقت ومكان الدرس القادم.'], ['الرد على رسالة من المدرسة', 'اقرأ ورد بخطوات بسيطة.'], ['رفع السيرة الذاتية', 'اختر ملفًا وأرسله.'], ['تمييز رسالة نصية مزيفة', 'تعرف على علامات الرسالة غير الحقيقية.'], ['حل رسالة خطأ', 'اعرف ماذا تفعل عندما يحدث خطأ.']],
    areas: ['المعلومات', 'التواصل', 'إنشاء المحتوى', 'الأمان', 'حل المشكلات'], steps: ['اضغط على رسالة المدرسة', 'اضغط داخل مربع النص', 'اكتب ردك', 'اضغط على إرسال', 'تم!'], supports: ['أرني', 'اقرأ بصوت عالٍ', 'ترجمة', 'سأفعل ذلك بنفسي'], showDesc: 'توضح الحركة أين تضغط.', quietOn: 'أنت تعمل بنفسك. الدليل سينتظر.', wrong: 'ليس هناك – جرّب الزر الذي يشير إليه السهم.', next: 'الخطوة التالية', doneNotes: ['تم! فتحت الرسالة.', 'تم! عرفت أين تكتب.', 'رائع! ردك جاهز.', 'تم! أُرسل ردك.'], school: 'مدرسة سودرغورد', message: 'مرحبًا! هل يمكنك حضور الاجتماع يوم الخميس الساعة 3؟', placeholder: 'اكتب ردًا', reply: 'نعم، سأحضر. شكرًا!', sent: 'تم الإرسال', finalTitle: 'لقد فعلتها بنفسك.', finalQuestion: 'هل تريد التدرب مرة أخرى؟', again: 'تدرب مرة أخرى', finish: 'إنهاء', profileTitle: 'ما يمكنك فعله', profileHint: 'ينمو ملفك عند إكمال مهام حقيقية.', newAbility: 'تمت إضافة مهارة جديدة', abilities: ['يمكنك العثور على معلومات في الجدول', 'يمكنك التواصل رقميًا', 'الخطوة التالية: تدرب على إنشاء ملف', 'الخطوة التالية: تدرب على تمييز الرسائل المزيفة', 'الخطوة التالية: تدرب على حل خطأ'], teacher: 'نظرة عامة على المجموعة', teacherHint: 'تعرض احتياجات المجموعة فقط، وليس نشاط الأفراد.', group: 'مجموعة SFI C · 24 متعلمًا', needs: [['8 من 24 متعلمًا', 'يحتاجون للتدرب على الملفات المرفقة'], ['6 من 24 متعلمًا', 'يحتاجون للتدرب على كلمات المرور الآمنة'], ['5 من 24 متعلمًا', 'يحتاجون للتدرب على البحث عن المعلومات']], privacy: 'لا مراقبة فردية، ولا سجلات زمنية، ولا مقارنات.',
  },
  so: {
    choose: 'Maxaad rabtaa inaad samayso?', chooseHint: 'Dooro hawl. Tallaabo tallaabo ayaan u soconaynaa.', voice: 'Cod', language: 'Luqad', home: 'Hawlaha', profile: 'Kaydkayga',
    tasks: [['Hel jadwalka', 'Arag waqtiga iyo goobta casharka xiga.'], ['Ka jawaab farriinta dugsiga', 'Akhri oo uga jawaab tallaabooyin fudud.'], ['Soo geli CV', 'Dooro oo dir fayl.'], ['Garo SMS been ah', 'Arag calaamadaha farriin aan sax ahayn.'], ['Xalli farriin qalad', 'Ogow waxaad samayn karto marka wax qaldamaan.']],
    areas: ['Macluumaad', 'Isgaarsiin', 'Abuur nuxur', 'Ammaan', 'Xallinta dhibaatada'], steps: ['Taabo farriinta dugsiga', 'Taabo sanduuqa qoraalka', 'Qor jawaabtaada', 'Taabo dir', 'Waa diyaar!'], supports: ['I tus', 'Kor u akhri', 'Turjun', 'Anigaa samaynaya'], showDesc: 'Dhaqdhaqaaqu wuxuu tusayaa meesha la taabto.', quietOn: 'Adigaa samaynaya. Haguhu wuu ku sugayaa.', wrong: 'Halkaas ma aha – tijaabi badhanka fallaartu tilmaamayso.', next: 'Tallaabada xigta', doneNotes: ['Waa diyaar! Farriinta waad furtay.', 'Waa diyaar! Hadda waad taqaan meesha lagu qoro.', 'Fiican! Jawaabtaadu waa diyaar.', 'Waa diyaar! Jawaabta waa la diray.'], school: 'Dugsiga Södergård', message: 'Salaan! Ma iman kartaa kulanka Khamiista saacadda 3?', placeholder: 'Qor jawaab', reply: 'Haa, waan imanayaa. Mahadsanid!', sent: 'La diray', finalTitle: 'Adigaa sameeyay.', finalQuestion: 'Ma rabtaa inaad mar kale ku celceliso?', again: 'Mar kale ku celceli', finish: 'Dhammaystir', profileTitle: 'Waxaad awooddo', profileHint: 'Kaydkaagu wuu koraa markaad hawlo dhab ah qabato.', newAbility: 'Awood cusub ayaa lagu daray', abilities: ['Waxaad macluumaad ka heli kartaa jadwal', 'Waxaad ku xiriiri kartaa dijitaal', 'Tallaabada xigta: ku celceli abuurista fayl', 'Tallaabada xigta: ku celceli garashada SMS been ah', 'Tallaabada xigta: ku celceli xallinta qalad'], teacher: 'Guudmarka kooxda', teacherHint: 'Wuxuu tusayaa baahida kooxda, ma aha qof qof.', group: 'Kooxda SFI C · 24 arday', needs: [['8 ka mid ah 24 arday', 'waxay u baahan yihiin faylasha lifaaqan'], ['6 ka mid ah 24 arday', 'waxay u baahan yihiin furaha sirta ammaan ah'], ['5 ka mid ah 24 arday', 'waxay u baahan yihiin raadinta macluumaad']], privacy: 'Ma jiro dabagal qofeed, diiwaan waqti ama isbarbardhig.',
  },
} as const

export const taskIcons: IconName[] = ['calendar', 'message', 'document', 'shield', 'tools']
export const areaClasses = ['blue', 'green', 'purple', 'orange', 'pink']

export function getCopy(language: Language) {
  return copy[language]
}