export type Language = 'en' | 'ta' | 'tanglish';

export interface User {
  id: string;
  full_name: string;
  user_id: string;
  email: string;
  preferred_language: Language;
  created_at: string;
  avatar?: string;
  plants_analyzed?: number;
}

export interface PlantTreatment {
  recommendedProduct: string;
  howToUse: string;
  frequency: string;
  whenToRepeat: string;
  safetyPrecautions: string;
  organicAlternative: string;
  labelWarning: string;
}

export interface PlantWatering {
  requirement: string;
  frequency: string;
  bestTime: string;
  soilMoisture: string;
  overwateringWarning: string;
  underwateringWarning: string;
}

export interface PlantFertilizer {
  recommendedType: string;
  npk: string;
  whenToApply: string;
  howToApply: string;
  precautions: string;
}

export interface PlantSunlight {
  requirement: string;
  duration: string;
  exposure: string;
  indoorOutdoor: string;
  lackOfSunlightSigns: string;
}

export interface LocalizedTranslation {
  plantName: string;
  diseaseName: string;
  status: string;
  summary: string;
  symptoms: string[];
  treatmentGuide: string;
  wateringGuide: string;
  fertilizerGuide: string;
  sunlightGuide: string;
  preventionGuide: string;
}

export interface PlantAnalysisData {
  id?: string;
  user_id?: string;
  image_path?: string;
  isPlant: boolean;
  unableToIdentify: boolean;
  errorMessage?: string;
  plantName: string;
  scientificName?: string;
  plantCategory?: string;
  diseaseName: string;
  status: 'Healthy' | 'Diseased' | 'Unknown';
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'None';
  analysis_date?: string;
  symptoms: string[];
  causes: string[];
  treatment: PlantTreatment;
  watering: PlantWatering;
  fertilizer: PlantFertilizer;
  sunlight: PlantSunlight;
  prevention: string[];
  translations: {
    ta: LocalizedTranslation;
    tanglish: LocalizedTranslation;
  };
}

export interface DiseaseLibraryItem {
  id: string;
  plant_name: string;
  disease_name: string;
  symptoms: string[];
  causes: string[];
  treatment: string;
  prevention: string;
}

export interface PlantCareLibraryItem {
  id: string;
  plant_name: string;
  watering: string;
  fertilizer: string;
  sunlight: string;
}
