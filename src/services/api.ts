import { PlantAnalysisData, User, Language, DiseaseLibraryItem, PlantCareLibraryItem } from '../types';

const API_BASE = '/api';

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

export async function loginUser(identifier: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
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
  full_name: string;
  user_id: string;
  email: string;
  password: string;
  preferred_language: Language;
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

export async function forgotPassword(identifier: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier })
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
  const res = await fetch(`${API_BASE}/history`, {
    headers: await authHeaders()
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return (data.history || []).map((item: any) => ({
    ...item,
    plantName: item.plant_name,
    diseaseName: item.disease_name,
    analysis_date: item.analysis_date
  }));
}

export async function saveAnalysisResult(record: PlantAnalysisData): Promise<PlantAnalysisData> {
  const res = await fetch(`${API_BASE}/history`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({
      image_path: record.image_path,
      plant_name: record.plantName,
      scientific_name: record.scientificName,
      plant_category: record.plantCategory,
      disease_name: record.diseaseName,
      confidence: record.confidence,
      severity: record.severity,
      status: record.status,
      symptoms: record.symptoms,
      causes: record.causes,
      treatment: record.treatment,
      watering: record.watering,
      fertilizer: record.fertilizer,
      sunlight: record.sunlight,
      prevention: record.prevention,
      translations: record.translations
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to save analysis');
  }
  return data.record;
}

export async function deleteAnalysisResult(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/history/${id}`, {
    method: 'DELETE',
    headers: await authHeaders()
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete record');
  }
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
