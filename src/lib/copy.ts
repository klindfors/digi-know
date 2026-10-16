import { m } from './paraglide/messages.js'

export type Language = 'sv' | 'en' | 'ar' | 'so' | 'ti'
export type IconName =
  | 'arrow' | 'back' | 'briefcase' | 'calendar' | 'check' | 'chevron' | 'document' | 'globe' | 'info'
  | 'lock' | 'message' | 'microphone' | 'profile' | 'refresh' | 'send' | 'shield' | 'spark' | 'tools' | 'translate' | 'voice'

export function getCopy(language: Language) {
  const o = { locale: language }
  return {
    choose: m.choose({}, o),
    chooseHint: m.choose_hint({}, o),
    voice: m.voice({}, o),
    language: m.language({}, o),
    home: m.home({}, o),
    profile: m.profile({}, o),
    tasks: [[m.tasks_0_title({}, o), m.tasks_0_desc({}, o)], [m.tasks_1_title({}, o), m.tasks_1_desc({}, o)], [m.tasks_2_title({}, o), m.tasks_2_desc({}, o)], [m.tasks_3_title({}, o), m.tasks_3_desc({}, o)], [m.tasks_4_title({}, o), m.tasks_4_desc({}, o)]],
    areas: [m.areas_0({}, o), m.areas_1({}, o), m.areas_2({}, o), m.areas_3({}, o), m.areas_4({}, o)],
    steps: [m.steps_0({}, o), m.steps_1({}, o), m.steps_2({}, o), m.steps_3({}, o), m.steps_4({}, o)],
    supports: [m.supports_0({}, o), m.supports_1({}, o), m.supports_2({}, o), m.supports_3({}, o)],
    showDesc: m.show_desc({}, o),
    quietOn: m.quiet_on({}, o),
    wrong: m.wrong({}, o),
    next: m.next({}, o),
    doneNotes: [m.done_notes_0({}, o), m.done_notes_1({}, o), m.done_notes_2({}, o), m.done_notes_3({}, o)],
    school: m.school({}, o),
    message: m.message({}, o),
    placeholder: m.placeholder({}, o),
    reply: m.reply({}, o),
    sent: m.sent({}, o),
    finalTitle: m.final_title({}, o),
    finalQuestion: m.final_question({}, o),
    again: m.again({}, o),
    finish: m.finish({}, o),
    profileTitle: m.profile_title({}, o),
    profileHint: m.profile_hint({}, o),
    newAbility: m.new_ability({}, o),
    abilities: [m.abilities_0({}, o), m.abilities_1({}, o), m.abilities_2({}, o), m.abilities_3({}, o), m.abilities_4({}, o)],
    teacher: m.teacher({}, o),
    teacherHint: m.teacher_hint({}, o),
    group: m.group({}, o),
    needs: [[m.needs_0_count({}, o), m.needs_0_text({}, o)], [m.needs_1_count({}, o), m.needs_1_text({}, o)], [m.needs_2_count({}, o), m.needs_2_text({}, o)]],
    privacy: m.privacy({}, o),
  }
}

export type Copy = ReturnType<typeof getCopy>

export function getTaskHeading(language: Language) {
  return m.task_heading({}, { locale: language })
}

export function getSpeechLabel(language: Language) {
  return m.speech_to_text_label({}, { locale: language })
}

export function getTimetable(language: Language) {
  const o = { locale: language }
  return {
    steps: [m.timetable_steps_0({}, o), m.timetable_steps_1({}, o)],
    app: m.timetable_app({}, o),
    schedules: m.timetable_schedules({}, o),
    course: m.timetable_course({}, o),
    notes: [m.timetable_notes_0({}, o), m.timetable_notes_1({}, o)],
    wrongCourse: m.timetable_wrong_course({}, o),
    wrongSchedules: m.timetable_wrong_schedules({}, o),
    title: m.timetable_title({}, o),
    text: m.timetable_text({}, o),
  }
}

export function getSafety(language: Language) {
  const o = { locale: language }
  return {
    question: m.safety_question({}, o),
    sender: m.safety_sender({}, o),
    message: m.safety_message({}, o),
    safe: m.safety_safe({}, o),
    unsafe: m.safety_unsafe({}, o),
    wrong: m.safety_wrong({}, o),
    correct: m.safety_correct({}, o),
    finish: m.safety_finish({}, o),
  }
}

export function getUpload(language: Language) {
  const o = { locale: language }
  return {
    steps: [m.upload_steps_0({}, o), m.upload_steps_1({}, o), m.upload_steps_2({}, o)],
    choose: m.upload_choose({}, o),
    cv: m.upload_cv({}, o),
    photo: m.upload_photo({}, o),
    wrong: m.upload_wrong({}, o),
    selected: m.upload_selected({}, o),
    upload: m.upload_upload({}, o),
    complete: m.upload_complete({}, o),
    back: m.upload_back({}, o),
  }
}

export function getErrorExercise(language: Language) {
  const o = { locale: language }
  return {
    question: m.error_question({}, o),
    title: m.error_title({}, o),
    message: m.error_message({}, o),
    retry: m.error_retry({}, o),
    correctChoice: m.error_correct_choice({}, o),
    wrongChoice: m.error_wrong_choice({}, o),
    wrong: m.error_wrong({}, o),
    correct: m.error_correct({}, o),
    finish: m.error_finish({}, o),
  }
}

export const taskIcons: IconName[] = ['calendar', 'message', 'document', 'shield', 'tools']
export const areaClasses = ['blue', 'green', 'purple', 'orange', 'pink']
