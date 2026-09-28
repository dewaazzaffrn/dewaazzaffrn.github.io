// firestore.seed.cjs
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Ganti dengan project ID Anda
const PROJECT_ID = "portfolio-likes-84b05";

initializeApp({
  projectId: PROJECT_ID
});

const db = getFirestore();

async function seedInitialData() {
  const counterRef = db.collection('likes').doc('counter');

  // Cek apakah dokumen sudah ada; jika belum, buat dengan likes = 0
  const snap = await counterRef.get();
  if (!snap.exists) {
    await counterRef.set({ likes: 0 });
    console.log('✅ Dokumen likes/counter dibuat dengan likes = 0');
  } else {
    console.log('ℹ️ Dokumen likes/counter sudah ada (likes =', snap.data().likes, ')');
  }
}

seedInitialData().catch(err => {
  console.error('❌ Gagal membuat data awal:', err);
  process.exit(1);
});
