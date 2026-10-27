// only parked here for noe

const ICON = {
  copy : 'lucide:copy',
  move : 'lucide:scissors',

  archive  : 'lucide:file-archive',
  audio    : 'lucide:music',
  document : 'lucide:file-text',
  image    : 'lucide:image',
  video    : 'lucide:film',
  file     : 'lucide:file',
};


export const FILETYPES = [
  { icon: ICON.image,    id: 'images',    label: 'Images'    },
  { icon: ICON.audio,    id: 'audio',     label: 'Audio'     },
  { icon: ICON.video,    id: 'video',     label: 'Videos'    },
  { icon: ICON.document, id: 'documents', label: 'Documents' },
  { icon: ICON.archive,  id: 'archives',  label: 'Archives'  },
  { icon: ICON.file,     id: 'other',     label: 'Other'     },
];

export const FOLDERTYPES = {
  audio     : { icon: ICON.audio,    label: 'Audio'     },
  documents : { icon: ICON.document, label: 'Documents' },
  images    : { icon: ICON.image',   label: 'Images'    },
  video     : { icon: ICON.video,    label: 'Videos'    },
};

const EXT = {};
EXT.DOCUMENTS = /^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/;
EXT.ARCHIVES  = /^(zip|rar|7z|tar|gz|bz2|xz|zst)$/;

const extOf = name => { const dot = name.lastIndexOf('.'); return dot > 0 ? name.slice(dot + 1).toLowerCase() : ''; };

// by its mime type and, where that is empty, its extension
export function categoryOf ({ name, type = '' }) {
  const ext = extOf(name);
  if (type.startsWith('image/')) return 'images';
  if (type.startsWith('audio/')) return 'audio';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('text/') || DOCUMENTS.test(ext)) return 'documents';
  if (ARCHIVES.test(ext)) return 'archives';
  return 'other';
}


export { categoryOf };
export default meta;

