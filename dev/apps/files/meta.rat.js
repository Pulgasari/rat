// only parked here for noe

export const CATEGORIES = [
  { icon: 'lucide:image',        id: 'images',    label: 'Images'    },
  { icon: 'lucide:music',        id: 'audio',     label: 'Audio'     },
  { icon: 'lucide:film',         id: 'video',     label: 'Videos'    },
  { icon: 'lucide:file-text',    id: 'documents', label: 'Documents' },
  { icon: 'lucide:file-archive', id: 'archives',  label: 'Archives'  },
  { icon: 'lucide:file',         id: 'other',     label: 'Other'     },
];

const DOCUMENTS = /^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/;
const ARCHIVES  = /^(zip|rar|7z|tar|gz|bz2|xz|zst)$/;

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

