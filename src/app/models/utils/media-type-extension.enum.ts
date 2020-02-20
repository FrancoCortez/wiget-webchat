export enum MediaTypeExtension {
  PDF = 'pdf'
  ,
  WORD = 'msword' +
    '|vnd.openxmlformats-officedocument.wordprocessingml.document' +
    '|vnd.openxmlformats-officedocument.wordprocessingml.template' +
    '|vnd.ms-word.document.macroEnabled.12'
  ,
  TEXT = 'plain' +
    '|richtext'
  ,
  EXCEL = 'vnd.ms-excel' +
    '|vnd.openxmlformats-officedocument.spreadsheetml.sheet' +
    '|vnd.openxmlformats-officedocument.spreadsheetml.template' +
    '|vnd.ms-excel.sheet.macroEnabled.12' +
    '|vnd.ms-excel.template.macroEnabled.12' +
    '|vnd.ms-excel.addin.macroEnabled.12' +
    '|vnd.ms-excel.sheet.binary.macroEnabled.12'
  ,
  PPT = 'vnd.ms-powerpoint' +
    '|vnd.openxmlformats-officedocument.presentationml.presentation' +
    '|vnd.openxmlformats-officedocument.presentationml.template' +
    '|vnd.ms-powerpoint.addin.macroEnabled.12' +
    '|vnd.ms-powerpoint.presentation.macroEnabled.12' +
    '|vnd.ms-powerpoint.template.macroEnabled.12' +
    '|vnd.ms-powerpoint.slideshow.macroEnabled.12' +
    '|vnd.openxmlformats-officedocument.presentationml.slide' +
    '|vnd.ms-powerpoint.slide.macroEnabled.12' +
    '|vnd.openxmlformats-officedocument.presentationml.slideshow'
  ,
  ONE = 'application/msonenote'
  ,
  IMAGE = 'bmp' +
    '|cis-cod' +
    '|gif' +
    '|ief' +
    '|jpeg' +
    '|png' +
    '|pipeg' +
    '|svg+xml' +
    '|tiff' +
    '|x-cmu-raster' +
    '|x-cmx' +
    '|x-icon' +
    '|x-portable-anymap' +
    '|x-portable-bitmap' +
    '|x-portable-graymap' +
    '|x-portable-pixmap' +
    '|x-rgb' +
    '|x-xbitmap' +
    '|x-xpixmap' +
    '|x-xwindowdump'
  ,
  AUDIO = 'basic' +
    '|mid' +
    '|mp3' +
    '|mp4' +
    '|mpeg' +
    '|x-aiff' +
    '|x-mpegurl' +
    '|x-pn-realaudio' +
    '|x-pn-realaudio' +
    '|x-wav'
  ,
}
