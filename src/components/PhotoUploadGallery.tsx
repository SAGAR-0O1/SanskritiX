import { useEffect, useState } from 'react';

type Props = { placeId: string; placeName: string; existingImages: string[] };

export default function PhotoUploadGallery({ placeId, placeName, existingImages }: Props) {
  const key = `sanskritix_uploaded_photos_${placeId}`;
  const [uploads, setUploads] = useState<string[]>([]);

  useEffect(() => {
    try { setUploads(JSON.parse(localStorage.getItem(key) || '[]')); } catch { setUploads([]); }
  }, [key]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 4);
    selected.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const next = [...uploads, String(reader.result)].slice(-4);
        setUploads(next);
        localStorage.setItem(key, JSON.stringify(next));
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(index: number) {
    const next = uploads.filter((_, i) => i !== index);
    setUploads(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  const all = [...existingImages.filter(Boolean), ...uploads].slice(0, 8);

  return (
    <div className="mt-6 rounded-2xl border border-stoneline bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">📸 Personal Photo Gallery</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">Add your photos of {placeName}</h3>
          <p className="mt-1 text-xs text-inksoft">Up to 4 photos are stored in this browser for this place.</p>
        </div>
        <label className="cursor-pointer rounded-full bg-madder px-4 py-2 text-sm font-semibold text-white hover:bg-madderdark">
          + Upload Photos
          <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
        </label>
      </div>

      {all.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {all.map((src, i) => (
            <div key={`${src.slice(0, 30)}-${i}`} className="group relative overflow-hidden rounded-xl border border-stoneline">
              <img src={src} alt={`${placeName} photo ${i + 1}`} className="aspect-square w-full object-cover" />
              {i >= existingImages.filter(Boolean).length && (
                <button type="button" onClick={() => remove(i - existingImages.filter(Boolean).length)} className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100" aria-label="Remove uploaded photo">×</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
