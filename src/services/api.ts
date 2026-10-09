import { PlantAnalysisData, User, Language, DiseaseLibraryItem, PlantCareLibraryItem } from '../types';

const API_BASE = '/api';

const LOCAL_STORAGE_HISTORY_KEY = 'plant_doctor_saved_history';

function getLocalHistory(): PlantAnalysisData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalHistory(records: PlantAnalysisData[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('Could not save history to localStorage', e);
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem('plant_doctor_token');
}

export function setStoredToken(token: string) {
  localStorage.setItem('plant_doctor_token', token);
}

export function clearStoredToken() {
  localStorage.removeItem('plant_doctor_token');
}

export function getStoredLanguage(): Language {
  const lang = localStorage.getItem('plant_doctor_lang') as Language;
  return lang === 'ta' || lang === 'tanglish' || lang === 'en' ? lang : 'en';
}

export function setStoredLanguage(lang: Language) {
  localStorage.setItem('plant_doctor_lang', lang);
}

async function authHeaders(): Promise<HeadersInit> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }

  setStoredToken(data.token);
  if (data.user?.preferred_language) {
    setStoredLanguage(data.user.preferred_language);
  }
  return data;
}

export async function registerUser(payload: {
  email: string;
  password: string;
  full_name?: string;
  user_id?: string;
  preferred_language?: Language;
}): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Registration failed');
  }
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: await authHeaders()
    });
    if (!res.ok) {
      clearStoredToken();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

export async function updateProfile(payload: {
  full_name?: string;
  preferred_language?: Language;
  avatar?: string;
}): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: await authHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update profile');
  }
  if (payload.preferred_language) {
    setStoredLanguage(payload.preferred_language);
  }
  return data.user;
}

export async function forgotPassword(email: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: email })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Password reset request failed');
  }
  return data.message;
}

export async function analyzePlantPhoto(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<{ success: boolean; data?: PlantAnalysisData; unableToIdentify?: boolean; confidence?: number; errorMessage?: string }> {
  const res = await fetch(`${API_BASE}/analyze-plant`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ imageBase64, mimeType })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.details || 'Analysis failed');
  }
  return data;
}

export async function getAnalysisHistory(): Promise<PlantAnalysisData[]> {
  const localHistory = getLocalHistory();
  try {
    const res = await fetch(`${API_BASE}/history`, {
      headers: await authHeaders()
    });

    if (!res.ok) {
      return localHistory;
    }
    const data = await res.json();
    const serverItems = (data.history || []).map((item: any) => ({
      ...item,
      plantName: item.plantName || item.plant_name || 'Plant Leaf',
      diseaseName: item.diseaseName || item.disease_name || 'Checked',
      analysis_date: item.analysis_date || item.created_at || new Date().toISOString()
    }));

    // Merge server and local without duplicates
    const idMap = new Map<string, PlantAnalysisData>();
    for (const item of [...serverItems, ...localHistory]) {
      if (item && (item.id || item.analysis_date)) {
        const key = item.id || `${item.plantName}_${item.analysis_date}`;
        if (!idMap.has(key)) {
          idMap.set(key, item);
        }
      }
    }

    const merged = Array.from(idMap.values());
    saveLocalHistory(merged);
    return merged;
  } catch {
    return localHistory;
  }
}

export async function saveAnalysisResult(record: PlantAnalysisData): Promise<PlantAnalysisData> {
  const normalized: PlantAnalysisData = {
    ...record,
    id: record.id || 'pa_' + Math.random().toString(36).substring(2, 9),
    plantName: record.plantName || (record as any).plant_name || 'Crop Leaf',
    diseaseName: record.diseaseName || (record as any).disease_name || 'Status Checked',
    analysis_date: record.analysis_date || new Date().toISOString()
  };

  // 1. Immediately persist locally
  const currentLocal = getLocalHistory();
  const updatedLocal = [normalized, ...currentLocal.filter(h => h.id !== normalized.id)];
  saveLocalHistory(updatedLocal);

  // 2. Try server save if online
  try {
    const res = await fetch(`${API_BASE}/history`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({
        image_path: normalized.image_path,
        plant_name: normalized.plantName,
        scientific_name: normalized.scientificName,
        plant_category: normalized.plantCategory,
        disease_name: normalized.diseaseName,
        confidence: normalized.confidence,
        severity: normalized.severity,
        status: normalized.status,
        symptoms: normalized.symptoms,
        causes: normalized.causes,
        treatment: normalized.treatment,
        watering: normalized.watering,
        fertilizer: normalized.fertilizer,
        sunlight: normalized.sunlight,
        prevention: normalized.prevention,
        translations: normalized.translations
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.record) {
        return {
          ...data.record,
          plantName: data.record.plant_name || normalized.plantName,
          diseaseName: data.record.disease_name || normalized.diseaseName,
          analysis_date: data.record.analysis_date || normalized.analysis_date
        };
      }
    }
  } catch (err) {
    console.warn('Server sync failed, saved locally:', err);
  }

  return normalized;
}

export async function deleteAnalysisResult(id: string): Promise<void> {
  // Delete from local storage immediately
  const currentLocal = getLocalHistory();
  const updatedLocal = currentLocal.filter(item => {
    if (!item) return false;
    const itemId = item.id || (item as any)._id || item.analysis_date;
    return itemId !== id && item.id !== id;
  });
  saveLocalHistory(updatedLocal);

  // Try server delete
  try {
    const headers = await authHeaders();
    await fetch(`${API_BASE}/history/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
  } catch (err) {
    console.warn('Server delete error (local deletion successful):', err);
  }
}

export async function clearAllHistory(): Promise<void> {
  saveLocalHistory([]);
  try {
    const headers = await authHeaders();
    await fetch(`${API_BASE}/history/all`, {
      method: 'DELETE',
      headers
    });
  } catch (err) {
    console.warn('Server clear history error:', err);
  }
}

export async function sendChatMessage(
  message: string,
  language: Language = 'en',
  history: Array<{ sender: 'user' | 'bot'; text: string }> = []
): Promise<string> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ message, language, history })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to send message');
  }
  return data.reply;
}

export async function getDiseasesLibrary(): Promise<{ diseases: DiseaseLibraryItem[]; plant_care: PlantCareLibraryItem[] }> {
  const res = await fetch(`${API_BASE}/diseases-library`);
  if (!res.ok) {
    return { diseases: [], plant_care: [] };
  }
  return res.json();
}

export async function getDatabaseSchema(): Promise<any> {
  const res = await fetch(`${API_BASE}/database/schema`);
  if (!res.ok) return null;
  return res.json();
}
